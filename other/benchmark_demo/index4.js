var Benchmark = require('benchmark')
var suite = new Benchmark.Suite;

var a = {
    h:'发顺丰',
    s:'风格的',
    z:{
        b:'发生的',
        c:'天那',
        h:'发顺丰',
        s:'风格的',
        z:{
            b:'发生的',
            c:'天那',
            z:{
                b:'发生的',
                c:'天那',
                z:{
                    b:'发生的',
                    c:'天那',
                    z:{
                        b:'发生的',
                        c:'天那'
                    }
                }
            }
        }
    }
}

var aStr = JSON.stringify(a,null,2);
// console.log(aStr);

var test1 = function(){
    var b = [];

    aStr.replace(/:.*["]/g,function(a){
        // console.log(a);
        b.push(a.replace(/[:"\s]/g,''));
    })

    return b;
}

var test2 = function(){
    var b = [];

    function walkObj(v,container){
        var objType = Object.prototype.toString.call(v);
        switch (objType){
            case "[object String]":
                container.push(v);
                break;
            case "[object Object]":
                for(var i in v){
                    walkObj(v[i],container)
                }
                break;
        }
    }
    walkObj(a,b);

    return b;
}
var res;
res = test1();
console.log(res);
res = test2();
console.log(res);
// return

suite.add('test1',function(){
    test1();
}).add('test2',function(){
    test2();
}).on('cycle',function(event){
    console.log(String(event.target));
}).run({async:true});