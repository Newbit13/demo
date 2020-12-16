# 从0搭建一个脚手架
1.注册一个可以使用的命令行名字，[node-npm发布包-package.json中bin的用法](https://www.cnblogs.com/xiaozhumaopao/p/12357455.html)

# 用到的库
[commander.js](https://github.com/tj/commander.js/blob/master/Readme_zh-CN.md)
完整的 node.js 命令行解决方案

[chalk.js](https://github.com/chalk/chalk)
可以用于控制终端输出字符串的样式

[Inquirer.js](https://github.com/SBoudrias/Inquirer.js/)
处理命令行交互

[ora](https://github.com/sindresorhus/ora)
loading效果

[shelljs](https://github.com/shelljs/shelljs)
执行shell 脚本,用处如：项目初始化后自动安装依赖```npm install```
还可以复制、删除目录；批量替换文件中的值；执行git操作（前提是你有git命令可以用）

[node-glob](https://github.com/isaacs/node-glob)
可以通过类似**/*.js获取所有匹配模式下的文件

<!-- [node-fs-extra](https://github.com/jprichardson/node-fs-extra/blob/master/docs/readJson.md)
跟fs差不多，多个readJson可以读json文件，返回对象 -->

操作模板方面可以用的库：
[mem-fs-editor](https://github.com/SBoudrias/mem-fs-editor)
主要用的api是copyTpl；也可以解析json；

[cheerio](https://github.com/cheeriojs/cheerio)

# 参考资料
[Taro 技术揭秘：taro-cli](https://juejin.cn/post/6844903633557913608)