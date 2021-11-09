// 沙箱实现一 with + new Function 注意此方法可以访问原型链实现沙箱逃逸，存在缺陷

/*
    let fn = new Function("a", "console.log(a)");
    fn等价于
    let fn = (a) => {
      console.log(a);
    };

    但是！！！
    在node里
    let fn = new Function("a", "console.log(b)");
    fn却不等价于
    let fn = (a) => {
      console.log(b);
    };
    就算在fn函数外存在全局变量b，在new Function生成的匿名函数里也访问不到
 */

/*
    with({a:1}){console.log(a)} //会打印1
    with({a:1}){console.log(b)} //会往作用域链上找，如果全局也没有的话，提示b is not defined;  但是在node里，如果我调用new Function的话，即使全局存在b，也会提示未定义；在浏览器里会打印b
*/

//生成一个以exposeObj为参数变量的匿名函数
function compileCode(src) {
  src = `with(exposeObj){${src}}`;
  return new Function("exposeObj", src);
}

function proxyObj(originObj) {
  let exposeObj = new Proxy(originObj, {
    has: (target, key) => {
      // console.log(key);
      if (["console", "Math", "Date"].indexOf(key) > -1) {
        //仅暴露个别外部变量供代码访问
        return target[key];
      }
      if (!target.hasOwnProperty(key)) {
        console.log(`没有${key}`);
        throw new Error("mmmm");
      }
      return target[key];
    },
    // get: (target, key) => {
    //   return target[key];
    // },
  });

  return exposeObj;
}

function createSandBox(src, obj) {
  let proxy = proxyObj(obj);
  compileCode(src).call(proxy, proxy);
  // compileCode(src)(proxy);
}

//这样就使得全局的原型对象Number，其toString方法被篡改了
// createSandBox(`
// a.__proto__.toString = ()=>{
//   console.log(777);
// }
// a.toString();
// `, { a: 123 });

/*
沙箱实现二 iframe
在iframe标签中加入sandbox属性
<iframe sandbox src="xx"></iframe>

默认会有一些限制
1. script脚本不能执行
2. 不能发送ajax请求
3. 不能使用本地存储，即localStorage,cookie等
4. 不能创建新的弹窗和window
5. 不能发送表单
6. 不能加载额外插件比如flash等

需要对iframe标签进行配置才能解除限制


“接下里你只需要结合postMessage API，将你需要执行的代码，和需要暴露的数据传递过去，然后和你的iframe页面通信就行了”
*/

/*
  nodejs中的沙箱使用

  // console.log(this.constructor); //[Function: Object]
  // console.log(this.constructor.constructor); //[Function: Function]
  const vm = require("vm");
  vm.runInContext(
    "this.constructor.constructor('return process')().exit()",
    vm.createContext({ x: 2 })
  ); //这样是可以让主进程退出的
  // 解决方法：
  let ctx = Object.create(null);
  vm.runInNewContext(
    "this.constructor.constructor('return process')().exit()",
    ctx
  );
*/
