// 1.try catch
// 不适合大范围使用，容易界面臃肿
try {
  setTimeout(function () {
    console.log(a); //这里try catch捕获不到，window.onerror可以
  }, 1000);
} catch (error) {
  console.log("try");
}

// 2.window.onerror
// 捕获不到promise的异常
// 捕获不到已经进行try catch处理的异常
// 捕获不到资源加载错误
// 捕获不到异步的XMLHttpRequest
// 如果要捕获其他域名下的js错误，需要设置跨域:
// 对script标签增加一个crossorigin=”anonymous”，并且服务器添加Access-Control-Allow-Origin。例子：
// <script src="http://cdn.xxx.com/index.js" crossorigin="anonymous"></script>

window.onerror = function (errorMessage, scriptURI, lineNo, columnNo, error) {
  console.log("errorMessage: " + errorMessage); // 异常信息
  // console.log("scriptURI: " + scriptURI); // 异常文件路径
  // console.log("lineNo: " + lineNo); // 异常行号
  // console.log("columnNo: " + columnNo); // 异常列号
  // console.log("error: " + error); // 异常堆栈信息
};

const p = new Promise((res, rej) => {
  // setTimeout(function(){
  //     res(a);
  //     // res(123);
  // },1000)
  setTimeout(function () {
    rej(456789);
  }, 1000);
});

async function T() {
  let v = await p;
  console.log(v);
  //   try {
  //     let v = await p;
  //     console.log(v);
  //   } catch (error) {
  //     console.log(error);
  //   }
}
T();

try {
  console.log(a); //这里try catch已经捕获，在window.onerror监听不到了
} catch (error) {
  console.log("try2");
}

//3. addEventListener("unhandledrejection")
// 可以捕获promise的异常
// 捕获不到已经进行promise 在await时被try catch处理的异常
window.addEventListener("unhandledrejection", function (e) {
  console.log(e.type + " " + e.reason);
});

// 4.addEventListener('error')
// 可以捕获到图片加载错误，但是不知道具体错误原因
// 捕获不到异步的XMLHttpRequest
window.addEventListener(
  "error",
  (error) => {
    console.log(error);
  },
  true //可以捕获到图片加载错误,但必须通过冒泡来捕获，所以这里设置为true
);

// 5.ajax错误监听
// 通过重写达到监听全局ajax请求的目的
;(function() {
  function ajaxEventTrigger(event) {
   var ajaxEvent = new CustomEvent(event, { detail: this });
   window.dispatchEvent(ajaxEvent);
  }
    
  var oldXHR = window.XMLHttpRequest;
   
  function newXHR() {
   var realXHR = new oldXHR();
   
   realXHR.addEventListener('abort', function () { ajaxEventTrigger.call(this, 'ajaxAbort'); }, false);
   
   realXHR.addEventListener('error', function () { ajaxEventTrigger.call(this, 'ajaxError'); }, false);
   
   realXHR.addEventListener('load', function () { ajaxEventTrigger.call(this, 'ajaxLoad'); }, false);
   
   realXHR.addEventListener('loadstart', function () { ajaxEventTrigger.call(this, 'ajaxLoadStart'); }, false);
   
   realXHR.addEventListener('progress', function () { ajaxEventTrigger.call(this, 'ajaxProgress'); }, false);
   
   realXHR.addEventListener('timeout', function () { ajaxEventTrigger.call(this, 'ajaxTimeout'); }, false);
   
   realXHR.addEventListener('loadend', function () { ajaxEventTrigger.call(this, 'ajaxLoadEnd'); }, false);
   
   realXHR.addEventListener('readystatechange', function() { ajaxEventTrigger.call(this, 'ajaxReadyStateChange'); }, false);
   
   return realXHR;
  }
   
  window.XMLHttpRequest = newXHR;
 })();

 window.addEventListener('ajaxError',function(e){
  console.log(e);
 });