# 跨端App有三种形式
## 1.套壳app
webview + JSBridge

通过原生webview组件，进而利用web排版技术进行UI显示，并且由js与原生系统进行双向通讯
代表有：cordova

### cordova
![cordova](/分享/cordova.png)
## 2.混合app（hybrid app）
hybird 就是混合的意思。主要特点就是最后渲染得都是 *native UI*。

原理是利用js（虚拟dom）生成原生UI和写业务逻辑，配合自研布局引擎处理css，也是由js与原生通讯
代表有：react native, weex
## 3.
自己开发一套渲染引擎，UI画在一块画布上
代表有：flutter

# flutter与react native的区别
## cordova技术架构
todo
## react native技术架构及原理
todo
## flutter技术架构及原理
todo

# 参考资料
[【深入解析】跨端框架的核心技术到底是什么？](https://mp.weixin.qq.com/s/rSIAyQihmBQnyaoY0XtB-w)

[移动端跨平台开发框架对比分析](https://www.jianshu.com/p/900bf9cbd005)

[浅谈Cordova框架的一些理解](https://www.cnblogs.com/cr330326/p/7082821.html)

[Flutter 高性能原理浅析](https://www.jianshu.com/p/ff50f15edb54)
[]()

实践
webview显示与原生ui显示相比，效果如何？

？？？
现时常用的底层图形 API 包括 OpenGL (ES)、Direct2D/3D、Vulkan、Metal。操作系统提供的较高层 API 有 GDI(+)、WPF、Quartz。还有一些跨平台的图形库如 Cairo、Skia、SDL 等。