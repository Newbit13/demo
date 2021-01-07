# 00
demo.js为本人基于对promise的观察，随意编写的
规范写法及具体细节还是请参考下方的资料（参考资料写的有瑕疵，但不影响理解核心思想）

# 01
从自己的实现与他人的实现进行对比可以看出问题
- promise状态没有合理使用
- 静态resolve方法的实现方式很奇怪
- 静态resolve方法没必要使用setTimeout吗?需要

实时证明参考资料有错误的地方：
```
//MyPromise 与 Promise 在此处代码表现不一
MyPromise.resolve(1).then((res)=>{
    console.log(res);
})
console.log(222);
```

# 02
demo2.js为看了参考资料后做的调整，虽然还是简陋，但demo.js看起来好一些了

# 03
demo3.js对then进行了简单的改进

# 04 
demo4.js实现了静态方法all，并对参考资料中的all方法进行修改，见demo4.js中的MyPromise.all2

# 总结
    promise实现的核心思想是，将then的函数参数注册到列表中，当resolve的时候逐一将列表中的函数消费掉

# 参考资料
[彻底理解Promise原理及全功能实现](https://juejin.cn/post/6866372840451473415)