# 如何稳定的实时更新数据
本次项目采用ajax轮询 + websocket的方式，在一定程度上保证了数据获取的稳定性，并兼容不支持websocket的浏览器。
## websocket
[websocket兼容性](https://caniuse.com/?search=websocket)

## 简单DEMO
客户端：
```
var socket = new WebSocket("ws://localhost:3000/test/123");
var timmer;
socket.onopen = function (evt) {
    console.log('open',evt);
    timmer = setInterval(function(){
        socket.send(new Date().getSeconds());
    },1000)
};
//收到消息 触发回调
socket.onmessage = function (evt) {
    console.log('msg',evt);
};

socket.onerror = function (evt) { //失败重连 
    console.log('e',evt);
    clearInterval(timmer);
};
```

服务端：
```
const Koa = require('koa');
const route = require('koa-route');
const websockify = require('koa-websocket');

const app = websockify(new Koa());

// Regular middleware
// Note it's app.ws.use and not app.use
app.ws.use(function(ctx, next) {
    // return `next` to pass the context (ctx) on to the next ws middleware
    return next(ctx);
});
  
// Using routes
app.ws.use(route.all('/test/:id', function (ctx) {
    // `ctx` is the regular koa context created from the `ws` onConnection `socket.upgradeReq` object.
    // the websocket is added to the context on `ctx.websocket`.
    ctx.websocket.send('Hello World');
    ctx.websocket.on('message', function(message) {
      // do something with the message from client
          console.log(message);
    });
}));

app.listen(3000);
```

## websocket什么时候会断开
1. 服务器原因

当服务端断开不做任何动作就关闭链接时（直接退出进程，或者抛出错误或者重启）， 如果客户端不向服务端发送数据或者连接请求的话，是不知道连接已经断开了的。就好像你不跟我说话，你就不知道我有没有在听。

    所以设置心跳包的作用只是为了确认双方还在不在，而不是为了保持连接不断开（服务端如果不自己写超时断开的逻辑代码的话，正常情况下websocket是会一直保持连接的）。如果不在早点断开，别占着坑...

客户端：
第一次连接失败会提示：

```index.html:10 WebSocket connection to 'ws://xxxx' failed: Error in connection establishment: net::ERR_CONNECTION_REFUSED```

这时候会触发WebSocket实例的onerror、onclose回调函数执行

注意，服务端意外报错或者关闭（调用websocket.terminate()）时，在chrome浏览器下,onerror函数并不会触发,而是触发onclose函数

而在IE10下,服务端报错时onerror和onclose函数都会触发，并提示```WebSocket Error: Network Error 12030, 与服务器的连接意外终止```而在firefox下，服务端报错时触发onerror，关闭时触发onclose

所以在onerror和onclose中，只用onclose是个不错的选择

连接成功后如果后面服务端关闭，而客户端执行```socket.send```，chrome控制台会报错(其他浏览器不会)：

```WebSocket is already in CLOSING or CLOSED state.```

并且把错误栈指向我的代码```socket.send```

控制台会提示你WebSocket正在关闭或者已经关闭。
注意！上述的连接失败、发送数据失败，都不能用```try catch```、```window.onerror```、```window.addEventListener('error',function(){})```来监听、捕获该异常

### 小结
websocket除了监听自身的error，close状态，无法使用其他手段进行异常监听


服务端异常断开重启后，客户端需要重新```new websocket```才能重新连接上


2. 客户端原因

## websocket断开重连

# 对于历史socket数据如何调试
后端导出历史数据，前端复现

两种做法：
- 将数据作为变量写进页面脚本里
- 本地使用node读取数据并建立websocket

显然第二种做法对源代码的入侵性较低，客户端只需要改一下socket地址即可

# node的websocket库
## socket.io  github 51.6 stars

## ws  github 15.2 stars
看express-ws的源码可以发现用的是ws库，koa-websocket也是

socket.io vs ws
可以先看下这个结论，理性看待，不是说socket.io不好
[Differences between socket.io and websockets](https://stackoverflow.com/questions/10112178/differences-between-socket-io-and-websockets/38558531#38558531)

总的来说，socket.io相比ws,缺点是180KB,服务端要配合使用该库（目前支持node.js、java、C++、Swift、Dart）;优点是:
- 可靠性，可以用在：代理、负载均衡、个人防火墙、反病毒软件
- 自动重连支持

# 参考资料

[nodejs消息推送之socket.io 与 ws对比](https://blog.csdn.net/swimming_in_it_/article/details/81451491)

[ws](https://github.com/websockets/ws)

[socket.io](https://github.com/socketio/socket.io)


