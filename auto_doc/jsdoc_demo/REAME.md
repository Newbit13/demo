# 安装
npm install jsdoc -g

vscode查找jsdoc插件，以便自动生成注释(ctrl + shift + p,输入jsdoc)
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
    return document;
}

//当输入getElement().时，会有一系列相关的方法、属性可以使用。如：getElementById

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

# 暂不清楚的点
或者说jsdoc代码提示的缺陷：全局类型在不同文件中如何共用

# todo
根据jsdoc动态生成d.ts(egg.js的做法)

# 参考资料
[JS 工具库文档化 - JSDoc](https://juejin.cn/post/6844904160274415623)

[Annotating JavaScript for the Closure Compiler](https://github.com/google/closure-compiler/wiki/Annotating-JavaScript-for-the-Closure-Compiler#type-expressions)