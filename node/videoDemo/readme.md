# HTTP 206
    HTTP/1.1 206状态码表示的是：客户端通过发送范围请求头Range获取资源的部分数据。这种请求可以将服务端文件分割成多个部分传给客户端，可用于解决网络问题以及大文件下载问题。对于一个很大的视频，就可以采用这种请求将视频流分成多个部分下载。 
需要关注的HTTP Headers有：

1. Range：

    用于请求头中，指定第一个字节的位置和最后一个字节的位置，一般格式：Range:(unit=first byte pos)-[last byte pos] 。如 Range:bytes=0- 表示请求服务端第0及以后bytes的数据； Range:bytes=0-999 表示0到999 bytes的数据，注意这个区间的长度是1000bytes。

2. Accept-Ranges：

    用于响应头，表明服务器支持Range请求,以及服务器所支持的单位是字节(这也是唯一可用的单位)；Accept-Ranges: none 响应头表示服务器不支持范围请求。

    Content-Range：用于响应头，指定整个实体中的一部分的插入位置，一般格式： Content-Range: bytes (unit first byte pos) - [last byte pos]/[entity legth]。如Content-Range:bytes 1000000-1999999/3332038 表示的是服务端资源总大小3332038 bytes，此次返回的是其中第1000000到1999999 bytes 的数据。

3. Content-Length：

    用于响应头，表明了响应实体的大小，它应该等于Content-Range中的 ```last byte pos - first byte pos + 1```

后端核心代码(koa.js):
```
route.get('/stream3', function (ctx) {
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
})
```
完整代码可访问：[github]()

# 结论
- 视频播放进度控制是否有效在于服务端的实现
- 初步来看，如果服务端不支持进度控制，iphone手机无法正常播放，安卓、PC浏览器可以
- 如果Content-Type不设置的话，值为application/octet-stream,直接访问视频连接的话会弹出下载框

# 优秀库
[video.js](https://github.com/videojs/video.js/blob/main/src/js/video.js)

# 参考资料
[Node.js发送视频流](https://blog.csdn.net/qq_31967569/article/details/104123413)