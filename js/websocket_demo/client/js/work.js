var self = this;
var sss = 0;
try{
    // var socket = new WebSocket("ws://node-test.com/test/123");
    var socket = new WebSocket("ws://127.0.0.1:3000/test/123");
    // var socket = new WebSocket("ws://192.168.10.7:3000/test/123");

    var socketLive = false;
    var heartCheckTimer;
    var timmer;
    function heartCheck(){
        clearTimeout(heartCheckTimer);
        heartCheckTimer = setTimeout(function(){
            // console.log('heartCheck');
            if(socketLive){
                socketLive = false;
                socket.send('pong');
                heartCheck();
            }else{
                console.log('对方挂了，准备重启');
            }
        },50000);
    }
    socket.onopen = function (evt) {
        console.log('open');
        socketLive = true;
        heartCheck();
        // setInterval(()=>{
        //     socket.send(sss = sss == 0?1:0);
        // },1)
    };
    //收到消息 触发回调
    socket.onmessage = function (evt) {
        if(evt.data instanceof Blob){
            let B = evt.data;
            var reader = new FileReader();
            reader.readAsDataURL(B);
            reader.onload = function (e) {
                // console.info(reader);
                self.postMessage(JSON.stringify({
                    name:'xx1',
                    value:reader.result
                }));
            }
        }
        if(typeof evt.data === 'string' && evt.data.indexOf('{')>-1){
            try{
                var fileObj = JSON.parse(evt.data);
                let B = new Blob([new Uint8Array(fileObj.foo.data)]);//Blob构造函数的第二个参数可以指定类型：{type:'data:image/png'}
                var reader = new FileReader();
                reader.readAsDataURL(B);
                reader.onload = function (e) {
                    self.postMessage(JSON.stringify({
                        name:'xx2',
                        value:reader.result
                    }));
                }
            }catch(e){
                console.log('普通字符串');
            }
            
        }
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
}catch(e){
    // 只有不兼容websocket的浏览器才会报错到这
    console.log('改用ajax');
}


self.addEventListener('message', function (e) {
    var TestB = e.data;
    var splitB = new Blob(['---']);
    socket.send(splitB);//开始，传个分隔符
    // let chunk = 104857600;//每104857600字节（100M）为一个单位进行分割
    let chunk = 104857600*0.999;//每近100M为一个单位进行分割
    let chunkNums = Math.ceil(TestB.size / chunk);//向上取整
    console.log(chunkNums);

    self.postMessage(JSON.stringify({
        name:'total_span',
        value:chunkNums
    }));
    
    let p = new Promise((resolve,reject)=>{
        var Sign = 0;
        self.uploadData = function uploadData(i){
            let chunkData;
            if(i == chunkNums - 1){
                chunkData = TestB.slice(i*chunk);//最后一个chunk
            }else{
                chunkData = TestB.slice(i*chunk,(i+1)*chunk);
            }
            let TestB2 = new Blob([i,splitB,chunkData]);
            console.log('传输','i:',i,'Sign',Sign);
            // process_span.innerText = ++Sign;
            ++Sign;
            requestAnimationFrame(()=>{
                self.postMessage(JSON.stringify({
                    name:'process_span',
                    value:Sign
                }));
            });
            socket.send(TestB2);
            if(Sign == chunkNums){
                resolve(1);
                return;
            }
            currentIndex = i;
            cancelIdleCallBackId = setTimeout(function(){//requestIdleCallback未定义
                uploadData(++i)
            },0);
            
        }
        uploadData(0);
    })
    p.then((r)=>{
        console.log(r);
        socket.send(new Blob(['11111']));//结束
        console.log("结束");
    });
}, false);
