const { src, dest ,series,parallel} = require('gulp');

const clean = require('gulp-clean');
const babel = require('gulp-babel'); // 编译es6
const uglify = require('gulp-uglify');//注意单独使用时不能解析es6
const rev = require('gulp-rev');//为静态文件添加一串hash值
const myGulpPlugin = require('./my-plugin/my-gulp-plugin.js');
const myGulpPlugin2 = require('./my-plugin/my-gulp-plugin2.js');
const myGulpPlugin3 = require('./my-plugin/my-gulp-plugin3.js');

function testTask(){
    return src('src/**/*.js')
        // .pipe(babel({
        //     presets: [
        //         ['@babel/preset-env',{
        //             "loose": true,
        //         }]
        //     ],
        // }))
        .pipe(uglify())
        // .pipe(rev())
        .pipe(myGulpPlugin3())
        .pipe(dest('dist/'))
        // .pipe(rev.manifest())
        // .pipe(dest('dist/map/js'))//保存原文件名和改为hash名间的映射
}

function testTask3(){
    return src('src/*.js')
        .pipe(myGulpPlugin('// hjyong 525842854\n'))
        .pipe(dest('dist/'))
}

function testTask2(){
    return src('src/**/*.html')
        .pipe(myGulpPlugin2())
        .pipe(dest('dist/'))
}

function cleans(cb) {
    // cb();return;
    return src('dist/*')
        .pipe(clean())
}

// exports.default = series(cleans,parallel(testTask3,testTask2))
// exports.default = series(testTask2)
exports.default = series(testTask)