var memFs = require("mem-fs");
var editor = require("mem-fs-editor");
const path = require('path');

var store = memFs.create();
var fs = editor.create(store);

var res;
res = fs.read(path.resolve(__dirname,'./gogo.js'));
console.log(res);

res = fs.readJSON(path.resolve(__dirname,'./game.json'));
console.log(res.score);

//write只在commit后才能实际生效
fs.write(path.resolve(__dirname,'./something.js'), "var a = 1;");
fs.writeJSON(path.resolve(__dirname,'./something.json'), {ha:1});
fs.commit(function(){
    console.log("提交完毕");
})

fs.copyTpl(path.resolve(__dirname,'./template.html'),path.resolve(__dirname,'./template_copy.html'),{
    value:'123'
})