const sumString = require('./big_num_add');
function multi(a, b) {
    //用短的每一项去乘以长的每一项运行量会少一点
    var aL = a.length;
    var bL = b.length;
    var leftV,rightV,compL;

    //值1规定为小值，值2而为大值,compL为较短的长度
    if(aL > bL){
      leftV = b;
      rightV = a;
      compL = bL;
    }else{
      leftV = a;
      rightV = b;
      compL = aL;
    }
    

    var result = '0';
    var zeroIndex = -1;
    var temp = '0';
    for(var i = compL - 1;i > -1;i--){
      zeroIndex++;
      temp = '0';
      // 以加法代替乘法
      temp = addSingle(rightV,Number(leftV[i]));
      //个位乘法
      // temp = multiSingle(rightV,Number(leftV[i]));
      temp += "".padStart(zeroIndex, "0");
      result = sumString(result,temp);
    }

    console.log(result);
    return result;
}

//默认b为个位,用乘法计算和,
function multiSingle(a, b) {
  var aL = a.length;
  var res = [];
  var carry = 0;
  var temp;
  for(var i = aL - 1;i > -1;i--){
    temp = Number(a[i]) * Number(b) + carry;
    if(temp >= 10) {
      carry = Number(String(temp)[0]);
      res.unshift(String(temp)[1])
    }
    else{
      carry = 0;
      res.unshift(temp)
    }
  }
  if(carry > 0){
    res.unshift(carry);
  }

  return res.join('');
}

function addSingle(v, times) {
  temp = "0";
  for(var ii = 0;ii < times;ii++){
    temp = sumString(v,temp);
  }
  return temp;
}

  // sumString("0","30000000000000000000000000");
  // sumString("30000000000000000000000000","0");
  // multi("10000000000000000000000000","313")
  // multi("1234343287589423758942375892375089423768927924","1234343287589423758942375892375089423768927924")
  // multi("20","30")

  // console.log(multiSingle('1234343287589423758942375892375089423768927924','3'));
  // console.log(addSingle('1234343287589423758942375892375089423768927924','3'));
  const Benchmark = require('benchmark');
  const suite = new Benchmark.Suite;

  suite.add('multiSingle',function(){
    multiSingle('1234343287589423758942375892375089423768927924','3')
  }).add('addSingle',function(){
    addSingle('1234343287589423758942375892375089423768927924','3')
  }).on('cycle',function(event){
    console.log(String(event.target));
  }).run({async:true});

//benchmark结果
// multiSingle x 264,570 ops/sec ±0.12% (95 runs sampled)
// addSingle x 80,910 ops/sec ±1.13% (94 runs sampled)