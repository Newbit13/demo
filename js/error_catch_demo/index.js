// 1.try catch
// 不适合大范围使用，容易界面臃肿
try {
  setTimeout(function () {
    console.log(a);//这里try catch捕获不到，window.onerror可以
  }, 1000);
} catch (error) {
    console.log('try');
}

// 2.window.onerror
// 捕获不到promise的异常
// 捕获不到已经进行try catch处理的异常
window.onerror = function (errorMessage, scriptURI, lineNo, columnNo, error) {
  console.log("errorMessage: " + errorMessage); // 异常信息
  console.log("scriptURI: " + scriptURI); // 异常文件路径
  console.log("lineNo: " + lineNo); // 异常行号
  console.log("columnNo: " + columnNo); // 异常列号
  console.log("error: " + error); // 异常堆栈信息
};

const p = new Promise((res, rej) => {
  // setTimeout(function(){
  //     res(a);
  //     // res(123);
  // },1000)
  setTimeout(function () {
    rej(666);
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
  console.log(a);//这里try catch已经捕获，在window.onerror监听不到了
} catch (error) {
    console.log('try2');
}

//3. window.onunhandledrejection
//可以捕获promise的异常
window.onunhandledrejection = function (e){
    console.log(e);
}
