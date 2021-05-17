const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const route = require('koa-route');
// const bodyparser = require('koa-bodyparser')//解析请求内容
// const onerror = require('koa-onerror');

const KoaApp = new Koa();
// onerror(KoaApp);
const staticServer = require('koa-static')//静态资源服务插件
KoaApp.use(function(ctx,next){
    return next();
});
KoaApp.use(staticServer('./client'));
// app.use(bodyparser({
//     enableTypes:['json', 'form', 'text']
// }))

// KoaApp.use(route.get('/download', function (ctx) {
//     let res = ctx.res;
//     let req = ctx.req;
// }));

KoaApp.on('error', (error) => {
    
})

KoaApp.listen(3000);