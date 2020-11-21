const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const route = require('koa-route');
const websockify = require('koa-websocket');

const KoaApp = new Koa();
const staticServer = require('koa-static')//静态资源服务插件
KoaApp.use(function(ctx,next){
    return next();
});
KoaApp.use(staticServer('./client'));

const app = websockify(KoaApp);

// Regular middleware
// Note it's app.ws.use and not app.use
app.ws.use(function(ctx, next) {
    // return `next` to pass the context (ctx) on to the next ws middleware
    return next(ctx);
});

var heartCheckTimer;
function heartCheck(socket){
    clearTimeout(heartCheckTimer);
    heartCheckTimer = setTimeout(function(){
        // console.log('heartCheck',socket.socketLive);
        if(socket.socketLive){
            socket.socketLive = false;
            socket.send('pong');
            heartCheck(socket);
        }else{
            console.log('对方挂了,准备重启');
        }
    },50000);
}
var splitBuffer;
var chunkDataList = [];
// Using routes
app.ws.use(route.all('/test/:id', function (ctx) {
    // `ctx` is the regular koa context created from the `ws` onConnection `socket.upgradeReq` object.
    // the websocket is added to the context on `ctx.websocket`.
    ctx.websocket.socketLive = true;
    heartCheck(ctx.websocket);
    //传输文件
    // let content = fs.readFileSync(path.resolve('./test.txt'));
    let content = fs.readFileSync(path.resolve('./test.png'));
    // console.log(content);
    ctx.websocket.send(content);
    ctx.websocket.send(JSON.stringify({foo:content}));
    // setInterval(function(){
    //     ctx.websocket.send('Hello World');
    // },1000)
    // console.log(ctx.websocket);
    ctx.websocket.on('message', function(message) {
        // do something with the message from client
        // console.log(message);
        ctx.websocket.socketLive = true;
        if(message == 'pong'){
            ctx.websocket.send('ping');
        }
        heartCheck(ctx.websocket);
        if(message instanceof Buffer){
            if(message.length == 3){//mock 拿到分隔符
                splitBuffer = message;
            }else if(message.length == 5){
                console.log('传输完成');
                // console.log(chunkDataList);
                fs.writeFile(path.resolve('./server_save/a.psd'),Buffer.concat(chunkDataList),function(e){
                    if(e){
                        console.log(e);
                    }
                });
            }else{
                let splitIndex = message.indexOf(splitBuffer);
                let indexNum = message.slice(0,splitIndex);
                // console.log(indexNum);
                // indexNum.toString = function(){return 0}
                let chunkData = message.slice(splitIndex + splitBuffer.length);
                chunkDataList[indexNum] = chunkData;//indexNum是Buffer类型，在这会自动调用toString方法，转成我需要的下表
                // console.log(chunkData);
                
            }
        }
        if(/^data:\w+\/\w+;base64,/.test(message.slice(0,30))){
            let base64Data = message.replace(/^data:\w+\/\w+;base64,/, "");
            let dataBuffer = Buffer.from(base64Data, 'base64');
            fs.writeFile("./server_save/a.png", dataBuffer, function(err) {
                console.log(err);
            });
        }
        // ctx.websocket.send('Hello World2');
        //   ctx.websocket.terminate();
        // ctx.websocket.send('svr:'+message);
        // setTimeout(function(){
        // // throw new Error("我错了")
        // ctx.websocket.terminate();
        // },2000)
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

app.listen(3000);