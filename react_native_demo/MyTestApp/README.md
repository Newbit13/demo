1. 在模拟器使用fetch存在跨域问题
- todo 在真机下测试
2. button组件无法设置圆角

# FlatList问题
1. FlatList的父组件需要设置高度或者flex为1，否则FlatList显示不全
2. FlatList使用ItemSeparatorComponent做分隔效果比使用margin合理
3. FlatList外面在包一层View可以使得其高度可控(!!!),但是不加的话其父级flex为1时不会遮挡(参考第1条),加的话反而又遮挡了
    总结：高度确定时挺方便的，高度不确定时得靠计算该组件高度，麻烦

# KeyboardAvoidingView
1. KeyboardAvoidingView的behavior为"position"时，子元素flex:1则消失
2. KeyboardAvoidingView的behavior为"padding"时，唤起键盘则flex:1的子元素高度计算错误（这个现象看起来是，视图的paddingButtom变成了两倍键盘的高度）


我遇到了同样的问题：[KeyboardAvoidingView with ScrollView](https://stackoverflow.com/questions/40438986/keyboardavoidingview-with-scrollview)

本来以为解决第二个问题的方法是：用ScrollView包裹KeyboardAvoidingView，看起来正常点，但是KeyboardAvoidingView内部高度一但过高又是各种显示不正常
最终我觉得放弃使用KeyboardAvoidingView
#  flex:1
1. 使用flex：1的前提是父元素有高度，有时设置该属性会让其高度变为0。譬如父元素是KeyboardAvoidingView且behavior为"position"时

# 关于列表的性能及表现
[列表配置优化](https://reactnative.cn/docs/optimizing-flatlist-configuration)

在使用模拟器开发预览时发现滚动过快会出现空白区，可以在上述链接中看到解决方法：设置maxToRenderPerBatch

# 曲折
改一个组件样式为100%,然后模拟器就失去响应，工作被迫中断（解决方案：上备用真机）

# 参考资料
[React Navigation](https://reactnavigation.org/docs/4.x/tab-based-navigation/)