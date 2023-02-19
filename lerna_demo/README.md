# lerna 体验
他是一个多包管理工具
按我理解，作用是：
1.就是原本多个包的依赖可以提取出来放在根目录下，然后每个包发布时又可以单独发布
2.多包之间可以相互依赖，且不用重新安装或使用npm link（原本一个包更新了代码，依赖这个包的项目需要重新安装。使用了npm link的话就不用）

```
# 初始化
# 第一种方法
npm i lerna -g
lerna init
# 第二种方法
npx lerna init

# 新增包
lerna create <name>

# 把pk1写进pk2的package.json的dependencies中。然后在根目录执行yarn，会把各种包中的依赖安装到根目录的node_modules(此例子中：包括pk1)
lerna add pk1 --scope=pk2
# 给某个包添加jquery依赖,然后这个包其实会安装在根目录的node_modules中，这样所有包就不用重复装依赖
lerna add jquery --scope=pk1
# 给所有包都添加lodash依赖
lerna add lodash

# 运行每个包的脚本,如运行这些包的package.json中的script：test
lerna run test
# 运行某个包的脚本
lerna run test --scope=pk2

# 删除所有包的node_module文件夹,也可以加--scope=pk1
lerna clean 
# ??可以将所有的包的依赖提到最顶层，
lerna bootstrap --hoist

# 批量对所有包进行版本发布（发布后如果一个包引用了另一个包，他们依赖的版本号也会更新）
lerna publish
```