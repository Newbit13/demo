var Benchmark = require('benchmark')
var suite = new Benchmark.Suite;

var rword = /[^, ]+/g

function oneObject(array, val) {
    if (typeof array === 'string') {
        array = array.match(rword) || []
    }
    return array
}

var str = 'animationIterationCount,columnCount,order,flex,flexGrow,flexShrink,fillOpacity,fontWeight,lineHeight,opacity,orphans,widows,zIndex,zoom';

var test1 = function(){
    var cssNumber = oneObject(str);
    return cssNumber;
}

var test2 = function(){
    var cssNumber = str.split(',');

    return cssNumber;
}
// console.log(test1());
// console.log(test2());

suite.add('test1',function(){
    test1();
}).add('test2',function(){
    test2();
}).on('cycle',function(event){
    console.log(String(event.target));
}).run({async:true});