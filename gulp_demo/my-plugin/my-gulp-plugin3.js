// through2 是一个对 node 的 transform streams 简单封装
var through = require("through2");
var gutil = require("gulp-util");
var PluginError = gutil.PluginError;
var color = gutil.colors;

// 引入ast操作工具
const babylon = require("babylon");
const traverse = require("babel-traverse").default;
const t = require("babel-types");
const generate = require("babel-generator").default;

// 插件级别函数 (处理文件)
function gulpPrefixer() {
  // 创建一个让每个文件通过的 stream 通道
  return through.obj(
    function (file, encode, cb) {
      // console.log(file.dirname);
      // console.log(file.relative);
      console.log(color.blue("正在处理" + file.relative));
      if (file.isNull()) {
        // 返回空文件
        cb(null, file);
      }
      if (file.isBuffer()) {
        var code = file.contents.toString(); //拿到js代码

        // main
        let ast = babylon.parse(code, {});
        //转换、修改ast
        traverse(ast, {
          Literal(path) {
            if (path.node.value == "123456") {
              // path.node.value = "6666" //可改变值，但无法直接写为"66"+"66",因为后者是个表达式，与path.node的type不符合
              // 错误例子(无效)：path.node = t.binaryExpression("+",t.stringLiteral("123"),t.stringLiteral("456"));
              path.replaceWith(t.binaryExpression("+",t.stringLiteral("123"),t.stringLiteral("456")));
            }
          },
        });
        //根据ast生成代码
        const res = generate(ast, {}, code);

        file.contents = Buffer.from(res.code);
      }
      cb(null, file);
    },
    function (cb) {
      //through.obj的第二个参数可省略，当没什么操作的最后调用
      cb();
    }
  );
}

// 暴露（export）插件主函数
module.exports = gulpPrefixer;
