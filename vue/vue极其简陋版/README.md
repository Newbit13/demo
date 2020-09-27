## 简介

简单指出了Observe，Watcher，defineProperty的概念
简单版除了首次更新，二次赋值不会变化，因为watcher的cb写的不正确

## 困惑
思考了一下使用“Mustache”语法 (双大括号) 的文本插值的原理
我尝试着简单的将形如```{{a}}{{b}}```的内容中取得a，b

发现```RegExp.rightContext```的表现跟我预想的不太一样，似乎其更新是异步的（除了第一次）
最终发现问题出现在了正则表达式的g上，如下所示
```var reg1 =  /\{\{([^}]*)\}\}/g;
var c =  '{{lala}}';
console.log(reg1.test(c)); //true
console.log(reg1.lastIndex); //8
console.log(reg1.test(c)); //false
console.log(reg1.lastIndex); //0
console.log(reg1.test(c)); //true
console.log(reg1.lastIndex); //8
console.log('--------------------------------------');
var reg2 =  /\{\{([^}]*)\}\}/;
console.log(reg2.test(c));//true
console.log(reg1.lastIndex);//8
console.log(reg2.test(c));//true
console.log(reg1.lastIndex);//8
console.log(reg2.test(c));//true
console.log(reg1.lastIndex);//8
```
原理 在g的情况下，匹配完lastIndex会在匹配的字符串索引最后一位+1，下次test时是在lastIndex的基础上继续匹配，如果失败则再将lastIndex重置为0
