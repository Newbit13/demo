const { src, dest ,series,parallel} = require('gulp');

const clean = require('gulp-clean');
const babel = require('gulp-babel'); // 编译es6
const uglify = require('gulp-uglify');//注意单独使用时不能解析es6
const rev = require('gulp-rev');//为静态文件添加一串hash值
const myGulpPlugin = require('./my-plugin/my-gulp-plugin.js');

function testTask(){
    return src('src/**/*.js')
        .pipe(babel({
            presets: [
                ['@babel/preset-env',{
                    "loose": true,
                }]
            ],
        }))
        // .pipe(uglify())
        // .pipe(rev())
        .pipe(dest('dist/'))
        // .pipe(rev.manifest())
        // .pipe(dest('dist/map/js'))//保存原文件名和改为hash名间的映射
}

function testTask3(){
    return src('src/index.js')
        .pipe(babel({
            presets: [
                ['@babel/preset-env',{
                    "loose": true,
                }]
            ],
        }))
        .pipe(myGulpPlugin('//首句被我注释掉啦'))
        .pipe(dest('dist/'))
}

function testTask2(){
    return src('src/**/*.html')
        .pipe(dest('dist/'))
}

function cleans(cb) {
    // cb();return;
    return src('dist/*')
        .pipe(clean())
}

exports.default = series(cleans,parallel(testTask3,testTask2))