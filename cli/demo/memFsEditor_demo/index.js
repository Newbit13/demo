var memFs = require("mem-fs");
var editor = require("mem-fs-editor");

var store = memFs.create();
var fs = editor.create(store);

fs.write("somefile.js", "var a = 1;");