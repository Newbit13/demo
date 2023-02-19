// Compiler 包含webpack环境的所有配置信息
// Compilation 包含整个编译过程中所有环节对应的方法
const ConcatSource = require("webpack-sources").ConcatSource;
module.exports = class CustomPlugin {
  // constructor(options){//配置文件里传过来的值

  // }
  apply(compiler) {
    compiler.hooks.compilation.tap("CustomPlugin", (compilation) => {
      compilation.hooks.optimizeChunkAssets.tap("CustomPlugin", (chunks) => {
        // 在optimizeChunkAssets阶段拿到的chunk资源已经完成各种Loader的处理，所以如果这时候在新增ES6的代码是不会被转化
        chunks.forEach((chunk) => {
          chunk.files.forEach((fileName) => {
            if (fileName.endsWith(".js")) {
              compilation.assets[fileName] = new ConcatSource(
                `console.log(666);`,
                compilation.assets[fileName],
                `console.log(666);`
              );
            }
          });
        });
      });
    });
  }
};
