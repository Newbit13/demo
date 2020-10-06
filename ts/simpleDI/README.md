# Simple Dependency Inject

## 依赖安装
```
npm install typescript 

//reflect-metadata
npm install reflect-metadata
npm install -D @types/reflect-metadata
```

环境配置
在tsconfig.json中配置compilerOptions(部分)
```
{
    "types": ["reflect-metadata"],
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
}
```



## 额外一：在浏览器中运行
### 关于搭配webpack
```
npm install webpack webpack-cli --save-dev
npm install ts-loader --save-dev
```
配置 webpack.config.js

终端执行
```
npx webpack --config webpack.config.js
```


























## 额外二：在node中运行
### 使用ts-node
```
npm install ts-node
```
package.json里配置
```
"scripts": {
    "start": "nodemon --watch src/**/*.ts --exec ts-node src/app.ts"
}
```
### 在node中使用import/export( **使用```ts-node```的时候不用** )
```
npm install babel-cli  -D
npm install babel-preset-env -D
```
node 启动路径修改为
```
babel-node --presets env {你的文件路径}
```

添加nodemon监听
```
npm install -g nodemon
nodemono --exec babel-node --presets env {你的文件路径}
```

## 参考资料
[用TypeScript装饰器实现一个简单的依赖注入](https://juejin.im/post/6872238443334729735#heading-1)