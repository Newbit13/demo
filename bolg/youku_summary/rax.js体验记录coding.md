# Rax.js
    超轻量，高性能，易上手的前端解决方案。一次开发多端运行，解放重复工作，专注产品逻辑，提升开发效率。

阿里的Rax.js对应的竞品，应该是京东的Taro.js

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

boundary可以自己拼吗，可以：[npm包form-data](https://www.npmjs.com/package/form-data)

# 参考资料
[Rax](https://rax.js.org/)

# 其他
做项目时由于需要做些测试页面供测试人员使用，并且无任何UI、框架上的要求，能用就好，我突然想起在掘金看到某些博主的项目里提到Rax.js，打算体验一下，所以就有了这篇文章
