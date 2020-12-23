# 安装
npm install jsdoc -g

vscode查找jsdoc插件，以便自动生成注释
# 上手
新建index.js:

```
/**
 * 加法函数
 * @date 2020-12-23
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function add(a,b) {
    return a + b;
}

/**
 * 返回自定义对象
 * @date 2020-12-23
 * @returns {{ha,la,ba}}
 */
function getDiy(){
    return {
        good:233
    }
}
//当输入getDiy(). 时会提供自定义的property以选择

/**
 * 描述
 * @date 2020-12-23
 * @returns {any}
 */
class MyObj{
    constructor(){
        this.zzz = "zzz"
    }
}

/**
 * 返回自定义对象2
 * @date 2020-12-23
 * @returns {MyObj}
 */
function getDiy2(){
    return {
        ha:"s"
    }
}

//当输入getDiy2(). 时会提供对应对象的property以选择

/**
 * 描述
 * @date 2020-12-23
 * @returns {Document}
 */
function getElement(){
    return {};
}

//当输入getElement().时，会有一系列相关的方法、属性可以使用。如：getElementById

/**
 * @type {{a: Date, b: Document, c: number|string}}
 */
var cc = {
    a:true
}

```

命令行运行```jsdoc index.js```

也可以通过配置jsdoc.json:
```
{
  "source": {
    "include": [ "src/" ],
    "exclude": [ "src/libs" ]
  },
  "opts": {
    "template": "templates/default",
    "encoding": "utf8",
    "destination": "./docs/",
    "recurse": true,
    "verbose": false
  }
}
```
命令行运行```jsdoc -c jsdoc.json```

# 好处
生成相关文档
代码智能提示

# vscode智能提示有多智能
在./src/a.js中：
```
/**
 * @type {{a: Date, b: Document, c: number|string}}
 */
var cc = {
    a:true
}
```

在./src/b.js中：
输入cc.a.会出现相应的代码提示

    注意：当出现同名类型时,上级目录中的type会覆盖下级的,对type按照ctrl+鼠标左键可以预览到所有定义的位置，并跳转

# todo
根据jsdoc动态生成d.ts(egg.js的做法)

# 参考资料
[JS 工具库文档化 - JSDoc](https://juejin.cn/post/6844904160274415623)

[Annotating JavaScript for the Closure Compiler](https://github.com/google/closure-compiler/wiki/Annotating-JavaScript-for-the-Closure-Compiler#type-expressions)