# 解决webpack5使用babel后IE8不兼容的问题（深入）

# loose mode
用Babel将ES6转ES5有两种模式,普通(normal)和宽松(loose)模式，默认是normal模式。
- 支持宽松模式的人：
生成的代码可能更快，并且与旧引擎更兼容。它也趋向于更干净，更es5风格。

- 反对宽松模式的人：
当您以后从编译ES6换成用原生的ES6时，您可能会遇到问题。

遇到什么问题？下面栗子可以让你看到区别

比如现在有一段代码：
```
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    toString() {
        return `(${this.x}, ${this.y})`;
    }
}
```

用普通模式,这样用到了IE8所不兼容的defineProperty，因为根据ES6规范，class里的方法，属性这些都不可枚举:
```
"use strict";

var _createClass = (function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor); // (A)
        }
    }
    return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
})();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var Point = (function () {
    function Point(x, y) {
        _classCallCheck(this, Point);

        this.x = x;
        this.y = y;
    }

    _createClass(Point, [{
        key: "toString",
        value: function toString() {
            return "(" + this.x + ", " + this.y + ")";
        }
    }]);

    return Point;
})();
```

而使用宽松模式时:
```
"use strict";

function _classCallCheck(instance, Constructor) { ··· }

var Point = (function () {
    function Point(x, y) {
        _classCallCheck(this, Point);

        this.x = x;
        this.y = y;
    }

    Point.prototype.toString = function toString() { // (A)
        return "(" + this.x + ", " + this.y + ")";
    };

    return Point;
})();
```

这也是为什么babel出来的代码**一般**IE8运行不起来的原因。


# babel-loader先加载preset还是plugins？他们的区别是什么？


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
- babel-loader 的配置参数里有个customize，提供可自定义功能，例如 通过环境决定用什么babel plugin (被你发现我没看过官网文档了...)
- 立即执行函数的两种用法( 用哪种取决于你需不需要返回值 )
  - ```!function(p){alert(p);return p;}(233) //返回值为false```
  - ```(function(p){alert(p);return p;})(2333) //返回值为2333```
- callee及caller的用法  详见[你还傻傻的分不清javascript中的caller和callee吗？](https://juejin.im/post/6844904150778511373)

# 过程中遇到的困难
在查看babel-loader的源码时，有一句

```
const validateOptions = require("schema-utils");
```

  根目录下的“node_modules”里有“schema-utils”,babel-loader文件夹下也有“schema-utils”，笔者不小心看错了文件夹导致疑惑了好一会(代码结构不同)

  教训：以后记得用编辑器的自动跳转功能（require的读取规则得弄清楚，别再乌龙了）

# 参考资料
[Allow module system that does not rely on getters in Webpack 4 #6979](https://github.com/webpack/webpack/issues/6979)

[Babel —— 把 ES6 送上天的通天塔](https://www.cnblogs.com/vivotech/p/13330393.html)

[@babel/preset-env 与@babel/plugin-transform-runtime 使用及场景区别](https://segmentfault.com/a/1190000021188054)

[Babel 6: loose mode](https://2ality.com/2015/12/babel6-loose-mode.html)