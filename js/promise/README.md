# 00
demo.js为本人基于对promise的观察，随意编写的
规范写法及具体细节还是请参考下方的资料

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

# 参考资料
[彻底理解Promise原理及全功能实现](https://juejin.cn/post/6866372840451473415)