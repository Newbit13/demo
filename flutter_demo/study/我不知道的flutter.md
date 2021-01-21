# 参考资料
[flutter学习文档](https://book.flutterchina.club/)

# InheritedWidget
[资料地址](https://book.flutterchina.club/chapter7/inherited_widget.html)

    类似React中的context，可用于跨级传递数据

体会：解决了从上到下的跨级数据传递问题。但没有解决数据共享问题(组件通信问题)

知识点：
1. State对象有一个didChangeDependencies回调

    它会在“依赖”发生变化时被Flutter Framework调用。而这个“依赖”指的就是子widget是否使用了父widget中InheritedWidget的数据

- 应该在didChangeDependencies()中做什么？

        一般来说，子widget很少会重写此方法，因为在依赖改变后framework也都会调用build()方法。但是，如果你需要在依赖改变后执行一些昂贵的操作，比如网络请求，这时最好的方式就是在此方法中执行，这样可以避免每次build()都执行这些昂贵操作。

2. InheritedWidget.updateShouldNotify函数

    如果返回true，则子树中依赖(build函数中有调用)本widget的子widget的`state.didChangeDependencies`会被调用

3. 其他

    context.dependOnInheritedWidgetOfExactType

    context.getElementForInheritedWidgetOfExactType

        用dependOnInheritedWidgetOfExactType() 和 getElementForInheritedWidgetOfExactType()的区别就是前者会注册依赖关系，而后者不会

        所以用后者的话不会触发didChangeDependencies。后者的应用场景：比如想用它来更新InheritedWidget数据(如 触发数据变化用的按钮),自身又不想更新(重新build)。

4. 问题

    子节点都会被重新build，造成性能问题。可以通过将子Widget树缓存起来解决此问题(具体做法是：子Widget不在频繁使用setState的widget中实例化,将它作为参数从父级传进来。)

# provider
针对上面提到的“InheritedWidget没有解决widget间的数据通讯问题”，用事件通知来重新构建InheritedWidget从而达到更新数据的目的

使用Flutter SDK中提供的ChangeNotifier类,它继承自Listenable,来实现通知-订阅功能

provider的原理：

    使用一个Widget A，可以传递 :
    data(继承自Listenable,可以收集A的setState函数,并批量调用),
    child(有注册的会随着A的setState调用而更新,没注册的不更新,注册的意思是用到了context.dependOnInheritedWidgetOfExactType(InheritedWidget)),
    传递(data,child)给InheritedWidget

在实践中体会到,使用了InheritedWidget的数据,并不会随着该数据的更新而"自动"更新视图,而是InheritedWidget因为setState重新构建时,其所依赖的Widget才会更新

# 线性布局（Row、Column）

Row、Column的mainAxisSize默认为MainAxisSize.max会使其占用尽可能大的空间。

    特殊情况：如果Row里面嵌套Row，或者Column里面再嵌套Column，那么只有最外面的Row或Column会占用尽可能大的空间，里面Row或Column所占用的空间为实际大小。如果想让里面的Row、Column占满外部，可以使其父组件为Expanded