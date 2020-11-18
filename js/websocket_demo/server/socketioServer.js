const koa = require('koa');
const app = new koa();
const staticServer = require('koa-static')//静态资源服务插件
app.use(staticServer('./client'));

const server = require('http').createServer(app.callback());
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        // allowedHeaders: ["my-custom-header"],
        // credentials: true
    }
});

io.on('connection', socket => {
    // console.log(socket.constructor);
    socket.on('message',data=>{
        console.log(data);
        socket.emit('message',new Date().getSeconds())
        // let start = 0;
        // setInterval(function(){
        //     socket.emit('message',++start)
        //     socket.emit('message','----------------------------')
        // },1000)
    })
 });

server.listen(3000);