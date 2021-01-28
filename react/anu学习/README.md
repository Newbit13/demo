阅读源码的顺序
1. 阅读```anu.createElement```的实现

### 为什么先看这个？
因为平时写react的时候，我们先写的就是jsx组件，经过babel编译后变成了React.createElement,例如：
```
function A(){
	return <div></div>;
}
```
经过babel后⬇
```
function A() {
  return React.createElement("div", null);
}
```

anu.js中的vnode结构
```
{
    Type: 1,//...?   2(源自createComponentShape)                4(源自createPortalShape,一定是dom节点？)
    type: type,//"h1",Fn,class,...
    props: {},
    children: [],
    DOMNode: null,//是dom?
    instance: null,//...?
    index: 0,//...？
    nodeName: null,//...?
    key: void 0
}
```

### 收获
undefined在局部可以被重写(全局下不会)：
```
(function (){
    var undefined = 1;
    alert(undefined)//1;
})()
```
可以用void 0代替undefined

[void 0 与 undefined的区别](https://blog.csdn.net/juzipchy/article/details/86367565)

2. 阅读```anu.render```的实现





# 备忘
createElement中的index的作用：
声明了一个空数组：var children = []，index就是用与将子元素按顺序保存到children中。
作用我能猜到，在了解vdom的diff算法时就知道，是比较数组里相应的vnode实现的，这里的作用应该一样。
继续看，
疑问：不用children.push吗