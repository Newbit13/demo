// Compiler 包含webpack环境的所有配置信息
// Compilation 包含整个编译过程中所有环节对应的方法
const ConcatSource = require("webpack-sources").ConcatSource;
module.exports = class NoDebuggerMe {
  constructor(options = { min: 1, max: 20 }) {
    //配置文件里传过来的值
    this.min = options.min && options.min > 0 ? options.min : 1;
    this.max = options.max && options.max <= 600 ? options.max : 600;
  }
  apply(compiler) {
    compiler.hooks.afterCompile.tapAsync(
      {
        name: "NoDebuggerMe",
      },
      (compilation, callback) => {
        let assetNames = Object.keys(compilation.assets);
        for (const name of assetNames) {
          if (name.endsWith(".js")) {
            let seconds =
              Math.ceil(Math.random() * (this.max - this.min)) + this.min;
            let appendContent = `
              (()=>{
                function block(){
                  if(window.outerHeight - window.innerHeight > 200 || window.outerWidth - window.innerWidth > 200){
                    document.body.innerHTML = "zzz";
                  }
                  setInterval(()=>{
                    (function(){}["constructor"]("debugger")())
                  },${seconds})
                }
                try{
                  block();
                }catch(err){
                  console.log(err)
                  console.log("err")
                }
              })();
              `;
            compilation.updateAsset(
              name,
              (old) => new ConcatSource(old, "\n", appendContent)
            );
          }
        }
        callback();
      }
    );
  }
};
