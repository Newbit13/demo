# websocket兼容性
[websocket兼容性](https://caniuse.com/?search=websocket)

# DEMO
## 基本结构
客户端：
```
//./client/index.html
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
//./server/index.js
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

## 加入心跳机制
    注意这里用的ping、pong不是一端各自使用其中一个，而是两个都需要用到。我们可以这样理解，pong：你在吗？ ping：我在啊。对方pong你时你必须马上回应ping。如果对方已经正在和你聊天，你就得把pong这事延一延，不要聊着聊着突然来一句，你在吗？[翻白眼]

客户端：
```
//./client/index.html
var socket = new WebSocket("ws://127.0.0.1:3000/test/123");
var socketLive = false;
var heartCheckTimer;
var timmer;
function heartCheck(){
    clearTimeout(heartCheckTimer);
    heartCheckTimer = setTimeout(function(){
        if(socketLive){
            socketLive = false;
            socket.send('pong');
            heartCheck();
        }else{
            console.log('对方挂了，准备重启');
        }
    },3000);
}

socket.onopen = function (evt) {
    console.log('open',evt.data);
    socketLive = true;

    var s = 0
    timmer = setInterval(function(){
        socket.send(++s);
    },1000)
    heartCheck();
};
//收到消息 触发回调
socket.onmessage = function (evt) {
    console.log('msg',evt.data);
    socketLive = true;
    heartCheck();
    if(evt.data == 'pong'){
        socket.send('ping');
    }
};

socket.onerror = function (evt) { //失败重连 
    console.log('e',evt);
    clearInterval(timmer);
};

socket.onclose = function (evt) { //失败重连 
    console.log('close',evt);
    clearInterval(timmer);
};
```
服务端：
```
//./server/index.js
var heartCheckTimer;
function heartCheck(socket){
    clearTimeout(heartCheckTimer);
    heartCheckTimer = setTimeout(function(){
        if(socket.socketLive){
            socket.socketLive = false;
            socket.send('pong');
            heartCheck(socket);
        }else{
            console.log('对方挂了,准备重启');
        }
    },3000);
}
app.ws.use(route.all('/test/:id', function (ctx) {
    ctx.websocket.socketLive = true;
    heartCheck(ctx.websocket);
    setInterval(function(){
        ctx.websocket.send('Hello World');
    },1000)
    ctx.websocket.on('message', function(message) {
        console.log(message);
        ctx.websocket.socketLive = true;
        if(message == 'pong'){
            ctx.websocket.send('ping');
        }
        heartCheck(ctx.websocket);
    });

    ctx.websocket.on('close', function(message) {
        console.log(message);
        console.log("close");
    });
    ctx.websocket.on('error', function(message) {
        console.log(message);
        console.log("error");
    });
}));
```
# 注意

    浏览器端（客户端）或者服务端中有一方突然切断网络，另一方是无法通过事件监听到的。所以心跳机制不止用于保持连接，还用于确认对方是否存活。
为什么要把注意写在这里？因为一开始我在本地实验发现，无论是浏览器端的关闭浏览器，刷新，关闭标签页，调用close函数操作，还是服务端的退出进程、抛出异常、调用close函数操作，都会使对方的close事件被触发。并且我在nodejs服务器环境下开启websocket服务，发现不管过了多久，就算没有数据发送，连接也一直存在（比如用定时器设置几小时后再发一条信息也是能成功的）。这让我产生了“我们不需要心跳机制”的错觉。

后来我用手机测试，关闭手机WIFI时发现，服务器不会触发任何事件，意味着他不知道浏览器什么时候已经断开了连接。并且引入nginx做反向代理后，如果没有数据交互，没过一会就自动断开了。

    如果你的服务所在的域是HTTPS，那么使用的WebSocket协议也必须是wss, 而不能是ws

# 正文
## websocket什么时候会断开
    再次强调：太突然的异常如断网之类，一方来不及通知对方关闭，那么对方也不会触发关闭事件。
### 客户端原因
比如断网、关闭浏览器、关闭标签页，刷新页面等。

### 服务端原因

服务端直接退出进程、抛出错误、重启等。

    服务端异常断开重启后，客户端需要重新```new websocket```才能重新连接上

- 在客户端：

第一次连接失败会提示：

```index.html:10 WebSocket connection to 'ws://xxxx' failed: Error in connection establishment: net::ERR_CONNECTION_REFUSED```

    这时候会触发WebSocket实例的onerror、onclose回调函数执行


连接成功后如果后面服务端关闭，而客户端执行```socket.send```，chrome控制台会报错(其他浏览器不会)：```WebSocket is already in CLOSING or CLOSED state.```

并且把错误栈指向我的代码：```socket.send```

控制台会提示你WebSocket正在关闭或者已经关闭。
注意！上述的连接失败、发送数据失败，用```try catch```、```window.onerror```、```window.addEventListener('error',function(){})```都无法监听、捕获该异常。

服务端意外报错或者关闭（调用websocket.terminate()）时，各浏览器表现不一：
|浏览器 | onerror | onclose |
|----  | ----  | ----  |
|chrome|×|√|
|firefox|服务端报错时√|服务端报错时、关闭时√|
|IE10|√|√|

    在chrome浏览器下,onerror函数并不会触发,而是触发onclose函数；

    而在firefox下，服务端报错时触发onerror、onclose，关闭时触发onclose；

    而在IE10下,服务端报错时onerror和onclose函数都会触发，并提示 WebSocket Error: Network Error 12030, 与服务器的连接意外终止 ；

所以在onerror和onclose中，只用onclose是个不错的选择；

### 为什么需要心跳机制？
在我的node服务上，我发现就算没有心跳，websocket也能一直连接着，收集了网上的说法后发现，nginx会主动关闭websocket

我们用ngnix开启反向代理：
```
server {
    listen 80;
    server_name  node-test.com;
    location / {
        proxy_pass http://localhost:3000;
        proxy_next_upstream error timeout invalid_header http_500 http_502 http_503;
        proxy_set_header Host $host;
        proxy_http_version 1.1; 
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
        proxy_set_header Upgrade $http_upgrade;  
        proxy_set_header Connection "upgrade"; 
        proxy_set_header Origin "";
    }
}
```
果然没一会儿就触发close事件，所以等到关闭的时候再来重新连接，不如用一个心跳机制让他保持不断开。

#### 小结
websocket除了监听自身的error，close状态，无其他手段进行异常监听

在浏览器端，使用onclose处理端口情况可有效解决浏览器兼容性问题

nginx会在规定时间内自动端口websocket连接


# websocket传输文件

服务端发送文件：

服务端使用```fs.readFileSync```读取得到Buffer类型数据，然后发送给浏览器端，浏览器端接收到的是一个Blob类型的数据：
```
let content = fs.readFileSync(path.resolve('./test.txt'));
ctx.websocket.send(content);
```
这时浏览器打印结果：```Blob {size: 10, type: ""}```

如果将Buffer类型数据放入对象并序列号：
```
ctx.websocket.send(JSON.stringify({foo:content}));
```
这时浏览器打印结果：```{"foo":{"type":"Buffer","data":[97,98,99,100,13,10,65,66,67,68]}}```,对于data里的数组，假如数据是张图片，如何转成url呢？两种方法

- 第一种方法：
```
let url = URL.createObjectURL(new Blob([new Uint8Array(fileObj.foo.data)]));
```
url不用时记得释放掉：```URL.revokeObjectURL(url)```

- 第二种方法：
```
let B = new Blob([new Uint8Array(fileObj.foo.data)]);
var reader = new FileReader();
reader.readAsDataURL(B);
reader.onload = function (e) {
    console.info(reader);
    let url = reader.result;//base64格式
}
```


浏览器端发送文件：
浏览器用：```socket.send(new File(["a".repeat(100)], "test.txt"));```;服务端接收到的是一个Buffer类型的数据：```<Buffer 61 61 ... 50 more bytes>```

当我用大文件传输时，直接报错：```close CloseEvent {isTrusted: true, wasClean: false, code: 1006, reason: "", type: "close", …}```

这就需要考虑分片上传了

## 分片
如果是简单的分片，那太简单了。那么考虑的一个问题，如何保证分片后的传输顺序正确？那就需要给分片后的数据带上序号（额外信息）
如上文所说，服务端传浏览器端时可以把添加的额外信息和Buffer数据一起放在空对象中，并序列化后发送；

而浏览器端不可以将Blob类型JSON.stringfy，但是转成base64就可以序列化了。

在服务端，接收到base64格式的数据后需要做点处理，关键代码:
```
//服务端
let base64Data = message.replace(/^data:\w+\/\w+;base64,/, "");
let dataBuffer = Buffer.from(base64Data, 'base64');
fs.writeFile("./server_save/a.png", dataBuffer, function(err) {
    console.log(err);
});
```

### 现在我们不用序列化，将附加信息直接写入Blob或者Buffer中
在浏览器端，我们将额外的信息（序号）先转成Blob，再与分片后的Blob合到一起

首先我们约定好结构：序号+分隔符+分片数据

然后我们先给服务端发送分隔符，比如我用---作为分隔符：
```
var splitB = new Blob(['---']);
socket.send(splitB);
```
然后我再发送约定好的数据结构：
```
var blobToSend = new Blob([123,splitB,sliceBlob])//sliceBlob为某个想发送的大文件，slice之后的小片段
```
后端拿到数据后是Buffer类型的数据:
```
let splitIndex = message.indexOf(splitBuffer);//message是前端传过来的数据；splitBuffer也是前端传过来的，是分隔符
let indexNum = message.slice(0,splitIndex);//得到序号（Buffer类型数据）
let chunkData = message.slice(splitIndex + splitBuffer.length)//得到分片数据
```
剩下的工作就是约定好开始、接收、及如何拼接分片：
```
var TestB = a.target.files[0];
var splitB = new Blob(['---']);
socket.send(new Blob(['00000']));//开始，这是约定的开始数据
socket.send(splitB);//传个分隔符

let chunk = 5000;//每5000字节为一个单位进行分割
let chunkNums = Math.ceil(TestB.size / 5000);//向上取整
for(var i = 0;i < chunkNums;i++){
    let chunkData;
    if(i == chunkNums - 1){
        chunkData = TestB.slice(i*chunk);//最后一个chunk
    }else{
        chunkData = TestB.slice(i*chunk,(i+1)*chunk);
    }
    let TestB2 = new Blob([i,splitB,chunkData]);
    console.log('传输',i);
    socket.send(TestB2);
}
socket.send(new Blob(['11111']));//结束,这是约定的结束数据
```
这个过程，如果数据量才大的话，会堵塞js进程、UI进程。所以我们需要：异步函数setTimeout


### 后续
再进一步可以做的功能就是发现缺失的分片，并向对方重新请求

# node的websocket库
## socket.io  github 51.6 stars
如果客户端要使用该库，服务端也要相应的配合使用该库，目前支持node.js、java、C++、Swift、Dart

特性(简单翻译下官网给的特性+解释)
- 可靠性，可以用在：代理、负载均衡、个人防火墙、反病毒软件
- 自动重连支持
- 断开连接检测
- 二进制支持（浏览器：ArrayBuffer、Blob;Node.js:ArrayBuffer、Buffer)
- 简单方便的api
- 跨浏览器
- 多路复用支持（就是以命名空间为单位，创建任意个对象，便于管理，但是底层还是用的同一个socket连接）
- 支持Room（支持以命名空间为单位，实现分组，用在群聊天等方面）

### 保持长连接的原理

他的核心是用了[Engine.IO](https://github.com/socketio/engine.io)这个库,该库先发起长连接（LongPolling），并尝试升级连接（换成websocket）
他所谓的长连接长什么样，为了看到清楚点，我在客户端一开始就```WebSocket = undefined;```，然后可以在控制台看到以下截图：

![一张控制台的截图](./socketio.png)

可以看到除了第一次会发起5个请求，之后每次会发起2个请求，其中一个会处于pending状态，持续一段时间。这段时间内如果服务器有数据要推过来，会请求成功，否则这段时间过后也会自动请求成功并又再起发起两个请求。以下贴一段引用：

    LongPolling
    Browser/UA发送Get请求到Web服务器，这时Web服务器可以做两件事情，第一，如果服务器端有新的数据需要传送，就立即把数据发回给Browser/UA，Browser/UA收到数据后，立即再发送Get请求给Web Server；第二，如果服务器端没有新的数据需要发送，这里与Polling方法不同的是，服务器不是立即发送回应给Browser/UA，而是把这个请求保持住，等待有新的数据到来时，再来响应这个请求；当然了，如果服务器的数据长期没有更新，一段时间后，这个Get请求就会超时，Browser/UA收到超时消息后，再立即发送一个新的Get请求给服务器。然后依次循环这个过程。

    这种方式虽然在某种程度上减小了网络带宽和CPU利用率等问题，但是仍然存在缺陷，例如假设服务器端的数据更新速率较快，服务器在传送一个数据包给Browser后必须等待Browser的下一个Get请求到来，才能传递第二个更新的数据包给Browser，那么这样的话，Browser显示实时数据最快的时间为2×RTT（往返时间），另外在网络拥塞的情况下，这个应该是不能让用户接受的。另外，由于http数据包的头部数据量往往很大（通常有400多个字节），但是真正被服务器需要的数据却很少（有时只有10个字节左右），这样的数据包在网络上周期性的传输，难免对网络带宽是一种浪费。

    通过上面的分析可知，要是在Browser能有一种新的网络协议，能支持客户端和服务器端的双向通信，而且协议的头部又不那么庞大就好了。WebSocket就是肩负这样一个使命登上舞台的。


## ws  github 15.2 stars
看express-ws的源码可以发现用的是ws库，koa-websocket也是

socket.io vs ws

可以先看下这个结论，理性看待，具体使用哪个看情况（主要考虑后端语言、浏览器兼容性）
[Differences between socket.io and websockets](https://stackoverflow.com/questions/10112178/differences-between-socket-io-and-websockets/38558531#38558531)

# 参考资料

[nodejs消息推送之socket.io 与 ws对比](https://blog.csdn.net/swimming_in_it_/article/details/81451491)

[ws](https://github.com/websockets/ws)

[socket.io](https://github.com/socketio/socket.io)

[转载：WebSocket 原理介绍及服务器搭建](https://blog.csdn.net/qq_39101111/article/details/78627393)

[你不知道的 Blob](https://juejin.cn/post/6844904178725158926?utm_source=gold_browser_extension%3Futm_source%3Dgold_browser_extension#heading-6)

[聊聊JS的二进制家族：Blob、ArrayBuffer和Buffer](https://zhuanlan.zhihu.com/p/97768916)


