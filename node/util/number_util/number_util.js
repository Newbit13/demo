//计算小数点位数
function getCalculatorDecimalDigits(a){
    if(!isNaN(a)){
        if(typeof a === 'string'){
            var decimal = a.split('.')[1];
            return (decimal && decimal.length) || 0;
        }else{
            //该方法在小数位太多时失效,测试是小于1e-15时省略为0,更准确的说是多于15小数位时
            // a = '0' + String(Number(a) + 1).substr(1);//a解决小数位一定位数时系统自动用科学计数法表示的问题
            // return a.split('.')[1].length;
            return a;
        }
    }else{
        //非数字
        return 0;
    }
}

// console.log(getCalculatorDecimalDigits("0.000000000000000000000000000000000000000001"));
// console.log(getCalculatorDecimalDigits(1.0000000000000001));//1+1e-16
// console.log(getCalculatorDecimalDigits(3.100001010101012100000100000000000000010001));

// console.log(1.000000000000001 * 10000000000000000);
// console.log(1.000000000000001 * 1000000000000000);

var Decimal = require('decimal.js');
x = new Decimal(1.0000000000000001) //1
y = new Decimal(1.0000000000000001) 
z = x.plus(y)
console.log(z);//2