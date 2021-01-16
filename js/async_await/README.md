# 现象

一开始以为Promise 和 IIFE有冲突，如下：
正常：
```
const sss = (() =>{
    console.log(1);
});
console.log(sss);
//sss()

(function(){
    console.log(1);
})();
```
报错
```
- //sss()
+ sss()
```


# 原因
```sss()```后面需要加分号