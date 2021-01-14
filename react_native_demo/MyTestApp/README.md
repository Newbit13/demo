1. 在模拟器使用fetch存在跨域问题
- todo 在真机下测试
2. button组件无法设置圆角

# FlatList问题
1. FlatList的父组件需要设置高度或者flex为1，否则FlatList显示不全
2. FlatList使用ItemSeparatorComponent做分隔效果比使用margin合理
3. FlatList外面在包一层View可以使得其高度可控(!!!),但是不加的话其父级flex为1时不会遮挡(参考第1条),加的话反而又遮挡了
    总结：高度确定时挺方便的，高度不确定时得靠计算该组件高度，麻烦

# 参考资料
[React Navigation](https://reactnavigation.org/docs/4.x/tab-based-navigation/)