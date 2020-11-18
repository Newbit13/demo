const Koa = require('koa');
const route = require('koa-route');
const websockify = require('koa-websocket');

const KoaApp = new Koa();
const staticServer = require('koa-static')//静态资源服务插件
KoaApp.use(function(ctx,next){
    console.log(2333);
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
  
// Using routes
app.ws.use(route.all('/test/:id', function (ctx) {
    // `ctx` is the regular koa context created from the `ws` onConnection `socket.upgradeReq` object.
    // the websocket is added to the context on `ctx.websocket`.
    ctx.websocket.send('Hello World');
    // console.log(ctx.websocket);
    ctx.websocket.on('message', function(message) {
        // do something with the message from client
        console.log(message);
        // ctx.websocket.send('Hello World2');
        //   ctx.websocket.terminate();
        ctx.websocket.send('svr:'+message);
        setTimeout(function(){
        // throw new Error("我错了")
        ctx.websocket.terminate();
        },2000)
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