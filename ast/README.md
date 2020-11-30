# AST

    AST (Abstract Syntax Tree(抽象语法树)) 是源代码语法结构的一种抽象表示。它以树状的形式表现编程语言的语法结构。它由一堆节点（Node）组成，每个节点都表示源代码中的一种结构。不同结构用类型来区分，常见的类型有： Identifier(标识符)，BinaryExpression(二元表达式)，VariableDeclaration(变量定义)，FunctionDeclaration(函数定义)等。

# 怎么得到AST

搜索一下资料[为什么编译原理被称为龙书？](https://blog.csdn.net/guleileo/article/details/107551839)后得到一些理解，AST是个编程概念，源代码通过编译器转换成AST,再转成目标代码。那为什么不直接生成目标代码呢？
这个问题有人回答了：[编译原理中的抽象语法树(AST)为什么而存在？
](https://www.zhihu.com/question/363445606/answer/953866386),为了方便维护，为了更加方便的优化、改写代码。

## 结论
所以AST由解析器得来，JS的解析器目前大家都在用的是esprima

作为前端，我们能做到的就是把js代码用esprima转成AST，再加工下转成别的代码(vue,react,小程序，给代码赋能如埋点、打印、环境判断等)

或者是，定义我们自己的DSL,转成AST,再转成(vue,react,小程序)

结合网上找到的资料，我们的学习步骤应该是：
1. 学习Babel（编译器）体验下编译器能给我们编程带来什么惊喜
2. 体验了编译器的魅力后，可以学习下esprima，了解下编译器中重要的一环：解析器的原理
3. 尝试着自己写编译器。别人的小DEMO:[
the-super-tiny-compiler](https://github.com/jamiebuilds/the-super-tiny-compiler)

在第一步学习完成后，我们就可以尝试着用Babel做一些工具了。
而第二、三步是为了做更加定制化的事比如那种一套代码多端运行的工具（Rax.js、[taro UI](https://taro-ui.jd.com/#/docs/tabbar)等这些），编写自己的DSL(特定领域语言)

# 学习目的

了解编译器（包含了解析器），可以知道我们平时常用的工具的原理及增加我们的编程能力，涉及：
- 代码压缩
- 代码高亮
- ES6 转 ES5
- css加前缀
- 梳理、破解混淆过的代码
- 编写自己的DSL、H5转小程序等

可以做的事情很多，这应该就是传说中的终极技能了

# 尝试阶段
## 我们先来了解下开源的优秀作品

1. [Babel](https://github.com/babel/babel)

一个通用的多用途JS编译器。官网对它的介绍是：一个工具，让你可以写最新版本的JS代码，即使是目前环境不支持的新特性。
babel-preset-xxx:可以将新版本代码转成旧版本
babel-polyfill:运行当前环境尚不存在的API
babel-runtime:将一些常用的“助手”方法添加到文件顶部，以此保持代码整洁


学习步骤：

[Babel 用户手册](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/user-handbook.md)

[Babel Plugin Handbook](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md)

2. [esprima](https://esprima.org/demo/parse.html)

 一个js的解析器

看下官网的Features：
- 支持到ECMAScript 2017
- 合理的语法树格式（[ESTree project](https://github.com/estree/estree)的标准）
- Experimental support for JSX
- 可跟踪定位语法节点的位置：Optional tracking of syntax node location (index-based and line-column)
- 高测试覆盖率

# 编译原理浅析
字符流->词法分析->语法分析(常用方法：语法树)->语义分析(类型检查，某些程序设计语言比如 Java 会允许自动类型转换)->中间代码生成(ast,特点要易于生成，易于翻译)->代码优化->目标代码生成(目标语言是机器代码的话，那么必须要为每个变量分配寄存器或内存位置)

# 参考资料
[AST 介绍](https://www.jianshu.com/p/6fa90ee14d0e)