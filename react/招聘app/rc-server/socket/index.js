const {ChatModel} = require('../db/models')
module.exports = function (server){
    const io = require('socket.io')(server)
    const socketObj = {} //用来存放userid对应的socket
    io.on('connection',function(socket) {
        socket.on('firstConnect',function(data){
            console.log('第一次连接',data);
            const {userid} = data
            socketObj[userid] = socket
            //disconnect只能在浏览器刷新等操作时自动触发
            socket.on('disconnect',function(){
                console.log(userid,'已断开连接disconnect');
                socketObj[userid] = null
            })
            //在客户端手动发起disconnect无效，因此设置自定义事件disconnect2
            socket.on('disconnect2',function(){
                console.log(userid,'已断开连接disconnect2');
                socketObj[userid] = null
            })

            socket.on('sendMsg',function(data){
                console.log('有消息发来了',data);
                const {from,to,content} = data
                if(content){
                    //保存消息到数据库
                    const chat_id = [from,to].sort().join('-')
                    ChatModel.create(
                        {from,to,content,chat_id,createTime:Date.now()},
                        function(err,chat){
                            //发送给相应的人,如果在线
                            socketObj[to] && socketObj[to].emit('receiveMsg',chat)
                            socket.emit('receiveMsg',chat)
                        }
                    )
                }
            })
        })
        
    })
}