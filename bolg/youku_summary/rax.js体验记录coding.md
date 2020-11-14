# Rax.js
    超轻量，高性能，易上手的前端解决方案。一次开发多端运行，解放重复工作，专注产品逻辑，提升开发效率。

阿里的Rax.js对应的竞品，应该是京东的Taro.js，本文为体验记录，顺便列出一些需要注意的点

# 官方提醒
    为扩展 Rax 体系能力边界，我们为开发者提供了一系列的 Universal API，开发者可以通过调用这些 API 快速开发多端应用。
    目前的 API 并不是全平台支持的，每个 API 的详细文档中会通过图片标识相应平台的支持程度
# 疑问
- 是不是我想多端运行，就好就是用官方已有的api（踩坑心得）？
- 遇到不同平台的能力，如何做抹平处理？
- 我写jsx代码，就能转换成Flutter界面？
- 怎么写能让Flutter拥有webview？

# 体验
带着疑问，我开始了体验之旅
## 布局
编写的div，p，span标签会在小程序里转换成View标签，并且会有相应的样式，比如:

```<span><span>```会变成
```<View class="h5-span" onTap=xxx onDoubleTap=yyy ...></View> ```
## rpx
    我们规定屏幕宽度为 750rpx。以 iPhone6 为例，它的屏幕宽度为 375px，则 750rpx = 375px = 100vw，所以在 iPhone6 中，1rpx = 0.5px = 100/750vw。
    建议开发 Rax 页面时设计师用 750 作为设计稿的标准


## 生命周期
class组件使用：
```import { withPageLifeCycle } from 'rax-app';```
function组件使用：
```import { usePageShow } from 'rax-app';```
就可以拥有监听页面显示、隐藏等方法

## 状态管理
    多页模式下不能使用全局状态，多页模式中每个页面都是独立的，无法共享状态

## 不同平台的处理
```import { isMiniApp } from 'universal-env';```判断是否为小程序

```import { registerNativeEventListeners, addNativeEventListener, removeNativeEventListener } from 'rax-app';```注册、监听、取消监听原生事件

可以与原生小程序混用，需要注意：

    所有原生页面使用到的原生自定义组件（如上面项目中的 List 组件）必须放置于 src/miniapp-native 文件夹中，否则无法使用
    如果你的项目不是从原生小程序项目迁移而来，原生小程序页面建议放在 src/miniapp-native 文件夹中，而不是上面 src/pages/About 的做法
    如果在 src/pages 下面存在小程序原生页面，必须要在 src/app.json 对应的路由下面加上 targets 字段，从而保证其他端编译的时候不会编译该页面



# 开发过程遇到问题
## 数据请求接口报错

我的web项目正常运行，但到了小程序，控制台就会报错：
adapter is not a function

把代码压缩去掉后（build.json里配置"minify": false）看到下面代码
```
var adapter = config.adapter || defaults.adapter;
      return adapter(config).then(function (response) {...}
```
想到我用了axios，换成rax提供的universal-request试试,果然又遇到坑了
由于后端需要我POST表单，我用的是FormData
```
let fromData = new FormData()
fromData.append('question_id', questionid)
fromData.append('option_id', optionid)
request({
    url: xxxx,
    headers: { 'Content-Type': 'multipart/form-data' },
    method: 'POST',
    data: fromData
})
```
这就尴尬了，不设置Content-Type时默认是application/json，但是设置form-data后又不会在后面自动加上;boundary=--xxx，没有boundary，服务端就无法分割form-data,这可不行，寻着源码，看到了该库在web方面的实现：
路径node_modules\universal-request\src\web\index.ts，
原理当然也是new XMLHttpRequest();还是那个熟悉的味道
在XMLHttpRequest里，如果要发送的data是FormData，那么会自动使用multipart/form-data;boundary=xxx,所以只要
data instanceof FormData为true就可以不设置Content-Type了，所以我们要改一下源码

```
if (headers) {
    + if (!(data instanceof FormData)) {//hjyong
        Object.keys(headers || []).forEach((key) => {
            xhr.setRequestHeader(key, String(headers[key]));
        });
    +}
}
```
重新编译下，果然可以了！
没地方提PR,就提[issue](https://github.com/alibaba/rax/issues/2031)吧

再回头看看编译完的小程序，正常运行，完美！

boundary可以自己拼吗，可以！
查看[npm包form-data](https://www.npmjs.com/package/form-data)源码发现boundary也可以很普通：
```
FormData.prototype._generateBoundary = function() {
  // This generates a 50 character boundary similar to those used by Firefox.
  // They are optimized for boyer-moore parsing.
  var boundary = '--------------------------';
  for (var i = 0; i < 24; i++) {
    boundary += Math.floor(Math.random() * 10).toString(16);
  }

  this._boundary = boundary;
};
```
可以看出boundary只是起到一个分割线的意义，不是通过formData的值计算而来

# 参考资料
[Rax](https://rax.js.org/)

# 其他
做项目时由于需要做些测试页面供测试人员使用，并且无任何UI、框架上的要求，能用就好，我突然想起在掘金看到某些博主的项目里提到Rax.js，打算体验一下，所以就有了这篇文章
