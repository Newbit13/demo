var shell = require('shelljs');
const path = require('path');
const fs = require('fs');
shell.echo('hello world');

//shell.which 在当前路径查找该命令行是否存在
// if (!shell.which('git')) {
//   shell.echo('Sorry, this script requires git');
//   shell.exit(1);
// }

// Copy files to release dir
shell.rm('-rf', path.resolve(__dirname,'./out'));
//cp
// -f: force (default behavior)
// -n: no-clobber
// -u: only copy if source is newer than dest
// -r, -R: recursive
// -L: follow symlinks//symlinks类似快捷方式
// -P: don't follow symlinks
shell.cp('-R', path.resolve(__dirname,'./lib/'),path.resolve(__dirname,'./out'));//把lib文件夹里的东西复制到out文件夹里

// Replace macros in each .js file
shell.cd(path.resolve(__dirname,'./out'));
shell.ls('*.js').forEach(function (file) {
  shell.sed('-i', 'BUILD_VERSION', 'v0.1.2', file);
  shell.sed('-i', /\/\/ good([\n\r])/, '', file);
  shell.sed('-i', /.*REPLACE_LINE_WITH_MACRO.*([\n\r])/, shell.cat(path.resolve(__dirname,'./macro.js')), file);
});
// shell.cd('..');
var res = shell.grep('--', 'h', path.resolve(__dirname,'./out/b.js'));//找到所有包含hh的行
console.log(res.stdout);

console.log('cat');
res = shell.cat('*.js');//前面用了cd，所以现在在out目录里
console.log(res.stdout);

console.log(__dirname);
console.log(process.cwd());//打印当前进程路径，注意与__dirname区分
console.log(shell.pwd().stdout);//打印当前进程路径，注意与__dirname区分

//异步执行
// shell.exec('npm i');//执行命令行

res = shell.find('*.js').filter(function(file) { return file.match(/\.js$/); });
console.log(res);

// console.log(fs.readdirSync(__dirname));

res = shell.head({'-n': 1},path.resolve(__dirname,'./out/b.js'));//返回该文件的前n行，不配置时返回全部
console.log(res.stdout);

res = shell.ls(path.resolve(__dirname,'./out'));//ls
console.log(res.stdout);

// shell.mkdir //创建目录
// shell.mv //移动目录
// shell.tail,与head相反
// shell.test 确定路径的类型，如文件、目录、软链接、等

// shell.uniq
//uniq([options,] [input, [output]])
// -i: Ignore case while comparing //比较时忽略大小写
// -c: Prefix lines by the number of occurrences //统计同样的一行出现的次数
// -d: Only print duplicate lines, one for each group of identical lines 只打印大于一行的代码
shell.uniq('-cd',path.resolve(__dirname,'./out/a.js'),path.resolve(__dirname,'./out/c.js'))
