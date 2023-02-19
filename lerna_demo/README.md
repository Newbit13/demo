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

# 把pk1写进pk2的package.json的dependencies中
lerna add pk1 --scope=pk2

# 运行每个包的脚本,如运行这些包的package.json中的script：test
lerna run test
```