const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const route = require('koa-route');
// const onerror = require('koa-onerror');

const KoaApp = new Koa();
// onerror(KoaApp);
const staticServer = require('koa-static')//静态资源服务插件
KoaApp.use(function(ctx,next){
    return next();
});
KoaApp.use(staticServer('./client'));

KoaApp.use(route.get('/stream', function (ctx) {
    let filePath = './server/xxx.mp4';
    let res = ctx.res;
    let req = ctx.req;
    let fliepath = path.resolve(filePath);
    let stat = fs.statSync(filePath);
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
        // fs.createReadStream(fliepath).pipe(res);
        ctx.body = fs.createReadStream(fliepath);
    }
}));

KoaApp.on('error', (error) => {
    if (error.code === 'EPIPE') {
        // console.log('Koa app-level EPIPE error.', { error })
    } else {
        // console.log('Koa app-level error', { error })
    }
})

KoaApp.listen(3000);