const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const route = require('koa-route');

const KoaApp = new Koa();
const staticServer = require('koa-static')//静态资源服务插件
KoaApp.use(function(ctx,next){
    return next();
});
KoaApp.use(staticServer('./client'));

KoaApp.use(route.get('/stream', function (ctx) {
    ctx.body = fs.createReadStream(path.resolve('./server/WeChat_20201125204203.mp4'));
}));

KoaApp.use(route.get('/stream2', function (ctx) {
    let head = { 'Content-Type': 'video/mp4' };
    // //需要设置HTTP HEAD
    ctx.res.writeHead(200, head);
    // //使用pipe
    // fs.createReadStream(path.resolve('./server/WeChat_20201125204203.mp4')).pipe(ctx.res);
    ctx.body = fs.createReadStream(path.resolve('./server/WeChat_20201125204203.mp4'));
}));

KoaApp.use(route.get('/stream3', function (ctx) {
    let res = ctx.res;
    let req = ctx.req;
    let fliepath = path.resolve('./server/WeChat_20201125204203.mp4');
    let stat = fs.statSync('./server/WeChat_20201125204203.mp4');
    let fileSize = stat.size;
    let range = req.headers.range;

    if (range) {
        //有range头才使用206状态码

        let parts = range.replace(/bytes=/, "").split("-");
        let start = parseInt(parts[0], 10);
        let end = parts[1] ? parseInt(parts[1], 10) : start + 999999;

        // end 在最后取值为 fileSize - 1 
        end = end > fileSize - 1 ? fileSize - 1 : end;

        let chunksize = (end - start) + 1;
        let file = fs.createReadStream(fliepath, { start, end });
        let head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(206, head);
        // file.pipe(res);
        ctx.body = file;
    } else {
        let head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(200, head);
        fs.createReadStream(fliepath).pipe(res);
    }
}));

KoaApp.listen(3000);