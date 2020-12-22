var Benchmark = require('benchmark')
var suite = new Benchmark.Suite;


var test1 = function(){
    var a = 'abcdefghijklmnopqrstuvwxyz';

    var index = a.search(/z/);

    return index;
}

var test2 = function(){
    var a = 'abcdefghijklmnopqrstuvwxyz';

    var index = a.indexOf('z');

    return index;
}
var test3 = function(){
    var a = 'abcdefghijklmnopqrstuvwxyz';

    var index = a.search(/a/);

    return index;
}

var test4 = function(){
    var a = 'abcdefghijklmnopqrstuvwxyz';

    var index = a.indexOf('a');

    return index;
}

suite.add('test1',function(){
    test1();
}).add('test2',function(){
    test2();
}).add('test3',function(){
    test3();
}).add('test4',function(){
    test4();
}).on('cycle',function(event){
    console.log(String(event.target));
}).run({async:true});