2017-3-8的代码跟2017-3-20的变化较大，所以我称前者为1.0，后者为2.0

# anu.js读后感
# 准备工作
拉代码xxx
导出较初的节点xxx
live-server配置方法，用利用se6 原生module进行调试

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
    Type: 1,//...?1(会在render时在createClass把vnode包装成可以返回vnode的函数)  2(源自createComponentShape),fn组件是2                4(源自createPortalShape,一定是dom节点？)
    type: type,//"h1",Fn,class,...
    props: {},
    children: [],
    DOMNode: null,//是dom
    instance: null,//...?
    index: 0,//...？
    nodeName: null,//存储的是vnode.type,用于判断是否是根节点
    key: void 0
}
```

对于vnode.Type不为2的，在render时会调用createClass将其转为函数（并为vnode设置setState，forceUpdate属性），并调用createComponentShape使其变为一个新的vnode.Type为2的vnode。所以说，vnode如果不是函数组件（fn | class），会通过createClass将其套一层变成Component，相当于写class组件时自己extends Component.

reconcileNodes的操作要注意一点：老的vnode会更新，而不是用新的vnode去代替老的vnode

代码中出现的node（newnode，nextnode这些），注意观察是vnode还是dom，此命名个人觉得容易混淆，同理还有element(有可能是Element实例也有可能想表示dom).

dom复用的前提是有key标识

### 收获
undefined在局部可以被重写(全局下不会)：
```
(function (){
    var undefined = 1;
    alert(undefined)//1;
})()
```
可以用void 0代替undefined

createElementNS???用于创建有命名空间的元素，比如svg。创建svg如果用的是createElement则无效！并且创建svg时需要有效的命名空间URI：http://www.w3.org/2000/svg 


[void 0 与 undefined的区别](https://blog.csdn.net/juzipchy/article/details/86367565)

2. 阅读```anu.render```的实现





# 备忘
createElement中的index的作用：
声明了一个空数组：var children = []，index就是用与将子元素按顺序保存到children中。

疑问：不用children.push吗
