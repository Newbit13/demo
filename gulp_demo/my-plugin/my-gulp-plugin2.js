// through2 是一个对 node 的 transform streams 简单封装
var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var color = gutil.colors;
const htmlparser2 = require("htmlparser2");

// 常量
const PLUGIN_NAME = 'gulp-prefixer2';

// 插件级别函数 (处理文件)
function gulpPrefixer() {
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
      var code = file.contents.toString();
      let fileList = [];
      const parser = new htmlparser2.Parser({
        onopentag(name, attributes) {
            /*
             * This fires when a new tag is opened.
             *
             * If you don't need an aggregated `attributes` object,
             * have a look at the `onopentagname` and `onattribute` events.
             */
            if (name === "script" && attributes.src) {
              fileList.push(attributes.src);
            }
        },
      })
      parser.write(code);
      fileList.forEach((name)=>{
        let disname = name.replace(/\?.*/,'');
        code = code.replace(name,disname+'?v='+Date.now())
      })
      // const dom = htmlparser2.parseDocument(code);
      // console.log(dom);
      file.contents = Buffer.from(code);
      // file.contents = Buffer.concat([prefixText, file.contents]);
    }
    // this.push(file);//有了这句，cb就不需要第二个参数了
    cb(null, file);

  },function(cb){//through.obj的第二个参数可省略，当没什么操作的最后调用
    cb()
  });

};

// 暴露（export）插件主函数
module.exports = gulpPrefixer;