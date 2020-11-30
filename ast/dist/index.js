"use strict";

var babel = require("babel-core");

// babel.transform
//第二个参数options：参考http://babeljs.io/docs/usage/options/
babel.transformFile('./src/row.js', {}, function (err, result) {
    if (err) {
        console.log(err);
        return;
    }
    //console.log(result);//{code,map,ast}
    console.log(result.ast);
});