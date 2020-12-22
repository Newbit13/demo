// through2 是一个对 node 的 transform streams 简单封装
var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var color = gutil.colors;

// 常量
const PLUGIN_NAME = 'gulp-prefixer';

function prefixStream(prefixText) {
  var stream = through();
  stream.write(prefixText);
  return stream;
}

// 插件级别函数 (处理文件)
function gulpPrefixer(prefixText) {

  if (!prefixText) {
    throw new PluginError(PLUGIN_NAME, 'Missing prefix text!');
  }
  prefixText = Buffer.from(prefixText); // 预先分配

  // 创建一个让每个文件通过的 stream 通道
  return through.obj(function(file, encode, cb) {
    // console.log(file.dirname);
    // console.log(file.relative);
    console.log(color.blue('正在处理'+ file.relative));
    if (file.isNull()) {
      // 返回空文件
      cb(null, file);
    }
    if (file.isBuffer()) {
      file.contents = Buffer.concat([prefixText, file.contents]);
    }
    if (file.isStream()) {
      file.contents = file.contents.pipe(prefixStream(prefixText));
    }
    // this.push(file);//有了这句，cb就不需要第二个参数了
    cb(null, file);

  },function(cb){//through.obj的第二个参数可省略，当没什么操作的最后调用
    cb()
  });

};

// 暴露（export）插件主函数
module.exports = gulpPrefixer;