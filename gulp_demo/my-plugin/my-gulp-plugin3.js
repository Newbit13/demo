// through2 是一个对 node 的 transform streams 简单封装
var through = require("through2");
var gutil = require("gulp-util");
var PluginError = gutil.PluginError;
var color = gutil.colors;

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
        var code = file.contents.toString() + 666;
        file.contents = Buffer.from(code);
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
