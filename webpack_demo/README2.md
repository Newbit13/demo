# 解决webpack5使用babel后IE8不兼容的问题（深入）

# 问题背景(可跳过)

# babel-loader处理流程


# babel & IE8
  原来 Babel 把 ES6 的标准分为 syntax 和 built-in 两种类型。syntax 就是语法，像 const、=> 这些默认被 Babel 转译的就是 syntax 的类型。而对于那些可以通过改写覆盖的语法就认为是 built-in，像 includes 和 Promise 这些都属于 built-in。而 Babel 默认只转译 syntax 类型的，对于 built-in 类型的就需要通过 @babel/polyfill 来完成转译。

  @babel/polyfill    Babel 在 7.4.0 版本中宣布废弃 @babel/polyfill 

## 设置目标浏览器


```
{
  "targets":{"ie":"8"}
}
```
@babel/preset-env会处理es6的syntax，但你设置目标浏览器后，它会选择那些语法需要处理。所以像promise，Map这些它还是不管的


  对于IE8的问题，继续研究，目前知道的是，只要引入polyfill，就会带来Object.defineProperty问题，很棘手,可以确定的是，Object.defineProperty的代码不是Babel带来的，而是import ... from 'xxxx...corejs/instance/map'这些polyfill后，webpack编译带来的

  When exporting functions using ```export function foo``` and importing using ```import * as bar```, they are compiled to getters/setters in Webpack 4.
  
  最终解决方案：[Allow module system that does not rely on getters in Webpack 4 #6979](https://github.com/webpack/webpack/issues/6979)

# 收获
babel-loader 的配置参数里有个customize，提供可自定义功能，例如 通过环境决定用什么babel plugin (被你发现我没看过官网文档了...)

# 过程中遇到的困难
在查看babel-loader的源码时，有一句

```
const validateOptions = require("schema-utils");
```

  根目录下的“node_modules”里有“schema-utils”,babel-loader文件夹下也有“schema-utils”，笔者不小心看错了文件夹

  教训：以后记得用编辑器的自动跳转功能（require的读取规则得弄清楚，别再乌龙了）

# 参考资料
[Allow module system that does not rely on getters in Webpack 4 #6979](https://github.com/webpack/webpack/issues/6979)

[Babel —— 把 ES6 送上天的通天塔](https://www.cnblogs.com/vivotech/p/13330393.html)

[@babel/preset-env 与@babel/plugin-transform-runtime 使用及场景区别](https://segmentfault.com/a/1190000021188054)