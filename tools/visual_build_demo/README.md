收获
# 00
react想要实现动态组件，它不像vue：vue能够有```<component is="xxx"></component>```这种写法；
也不能这样：
```
function DynaicComp(){
    const name="haha";
    return (
        <name></name>
    );
}
```
jsx的转换规律如下：
```
<test />
```
转换为
```
React.createElement("test", null);
```

```
<Test />
```
转换为
```
React.createElement(Test, null);
```



所以```<Xxx>```中的Xxx是个class标识且首字母大写。所以我们需要Xxx = fn("Xxx")，fn的实现方法有三种：
一：window.Xxx = class组件，使用时用window['Xxx']获取class组件的值；
二：编写相应的loader，利用ast将约定好的'Xxx'转换为Xxx；
三：编写switch语句，根据xxx的值返回class组件的值；

第一种方法会污染全局，第二种需要懂一点ast转换的方法及相应插件的写法（优点是代码简洁但维护性差点），所以推荐第三种；

# 01
开启css module：
```
npm i --dev react-app-rewire-css-modules
```
根目录创建config-overrides.js并编辑以下代码
```
/*config-overrides.js */
const { injectBabelPlugin } = require('react-app-rewired');
const rewireCssModules = require('react-app-rewire-css-modules');

module.exports = function override(config, env) {
//css模块化
config = rewireCssModules(config, env);
return config;
};
```

css文件后缀需要加上特殊写法
*.module.css

# 02
我作为新手，犯的错误：
1.纯函数问题
```
a=[{for:1}];
b=[...a];
a[0] === b[0];//true
```
所以使用react-redux的时候，由于reducer得是纯函数，所以单纯把state的值用...拓展运算符只能进行浅复制。在真正需要时光旅行的功能时会出问题（比如这个项目需要的undo、redo功能）
Immutable.js可以解决这个问题

2.hook问题
useCallback如果里面有用到外部变量，记得考虑把他作为依赖项（写在第二个参数中），否则外部变量更新时useCallback不更新

# 参考资料
[可视化拖拽组件库一些技术要点原理分析](https://juejin.cn/post/6908502083075325959)