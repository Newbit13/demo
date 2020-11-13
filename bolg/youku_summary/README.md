# 优酷竞猜项目总结

# Vue插件

# i18n

# App里判断参数环境

# 本地开发经验

# 技术尝鲜-rax.js
## 思考 应该注意什么
- 调用原生方法如何区分
- 哪些生命周期不兼容，应该怎样避免使用
- rpx
- 什么情况下得用Rax提供的Universal 组件

编写的div，p，span，标签会在小程序里转换成View标签，并且会有相应的转换，比如:

```<span><span>```会变成
```<View class="h5-span" ...></View> ```

## 遇到问题
### 数据请求接口报错
adapter is not a function

把代码压缩去掉（build.json里配置"minify": false）后看到下面代码
```
var adapter = config.adapter || defaults.adapter;
      return adapter(config).then(function (response) {...}
```
可以猜出需要配置某些适配器
看了一圈文档发现好像没有地方可以配置adapter，想到我用了axios，换成rax提供的universal-request试试,果然又遇到坑了
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
没地方提PR,就提issue吧
---fdsfdsf

# boundary可以自己算吗？
入手点：from-data库有getBoundary函数
