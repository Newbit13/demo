# 问题：webview可以代替原生吗
参考美团技术团队的[WebView性能、体验分析与优化](https://tech.meituan.com/2017/06/09/webviewperf.html)
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

# 其他
观点
[原生渲染为何比webview渲染快？](https://www.zhihu.com/question/264592475/answer/283852178)

webview渲染细节可参考浏览器的渲染原理：

[浏览器渲染详细过程：重绘、重排和 composite 只是冰山一角](https://www.cnblogs.com/feng9exe/p/10907959.html)

[浏览器工作原理与实践 - 浏览器中的页面](https://blog.poetries.top/browser-working-principle/guide/part5/lesson21.html)

## 光栅化是什么?
    比如在浏览器的绘制阶段，其实并不是真正地绘出图片，而是将绘制指令组合成一个列表，比如一个图层要设置的背景为黑色，并且还要在中间画一个圆形，那么绘制过程会生成：
    - Paint BackGroundColor:Black 
    - Paint Circle

    这样的绘制指令列表，绘制过程就完成了。

    有了绘制列表之后，就需要进入光栅化阶段了，*光栅化就是按照绘制列表中的指令生成图片*。每一个图层都对应一张图片，合成线程有了这些图片之后，会将这些图片合成为“一张”图片，并最终将生成的图片发送到后缓冲区。这就是一个大致的分层、合成流程。
资料来源：[浏览器中的页面 - 分层和合成机制：为什么css动画比JavaScript高效 - 分层和合成](https://blog.poetries.top/browser-working-principle/guide/part5/lesson24.html#%E5%88%86%E5%B1%82%E5%92%8C%E5%90%88%E6%88%90)

按我的理解，光栅化就是要得到：投到屏幕上每个元素是什么颜色（RGB值） --参考[图形学 光栅化详解（Rasterization）](https://www.jianshu.com/p/54fe91a946e2?open_source=weibo_search)


？？？
现时常用的底层图形 API 包括 OpenGL (ES)、Direct2D/3D、Vulkan、Metal。操作系统提供的较高层 API 有 GDI(+)、WPF、Quartz。还有一些跨平台的图形库如 Cairo、Skia、SDL 等。