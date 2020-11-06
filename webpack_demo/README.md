# webpack性能优化
##  分析打包速度
用speed-measure-webpack-plugin
```
npm install --save-dev speed-measure-webpack-plugin
```
```
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
 
const smp = new SpeedMeasurePlugin();
 
const webpackConfig = smp.wrap({
  plugins: [
    new MyPlugin(),
    new MyOtherPlugin()
  ]
});
```
## 分析包大小
```
npm install --save-dev webpack-bundle-analyzer
```
```
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin()
  ]
}
```

## 分析影响打包速度环节
    解析时间   loader执行耗时
    压缩时间   
    搜索时间   依赖项搜索耗时

# 优化解析时间
### 一、开启多线程打包
### thread-loader
    把这个 loader 放置在其他 loader 之前， 放置在这个 loader 之后的 loader 就会在一个单独的 worker【worker pool】 池里运行，一个worker 就是一个nodeJS 进程【node.js proces】，每个单独进程处理时间上限为600ms，各个进程的数据交换也会限制在这个时间内。

## 二、利用缓存
    利用缓存会增加初始构建时间，缩短连续构建时间
### cache-loader
### HardSourceWebpackPlugin

## 三、提前解析耗时、稳定的模块
  webpack.DllPlugin和webpack.DllReferencePlugin
  与config.externals原理类似，都是跳过需要解析的包，并在html下手动引入被跳过的包

  首先配置webpack.config.dll.js
  ```
  const webpack = require('webpack');
  const path = require('path');

  const vendors = [
      'react',
      'react-dom',
      'jquery',
      // ...其它库
  ];

  const webpackConfig = {
      output: {
          path: path.resolve(__dirname, 'build'),
          filename: '[name].js',
          library: '[name]',
      },
      entry: {
          "lib": vendors,
      },
      plugins: [
          new webpack.DllPlugin({
              path: path.resolve(__dirname, 'build/manifest.json'),
              name: '[name]',
              context: __dirname,
          }),
      ],
  };

  module.exports = webpackConfig;
  ```
  webpack运行后得到想要加入html的lib.js以及记录需要跳过解析的包（给DllReferencePlugin用的）
  
  然后在webpack.config.js添加：
  ```
  plugins: [
      new webpack.DllReferencePlugin({
          context: __dirname,
          manifest: path.resolve(__dirname, 'build/manifest.json'),
      }),
  ],
  ```

# 优化压缩时间
    原理：开启并行
    1.terser-webpack-plugin
```
module.exports = {
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
    ],
  },
};
```
    2.ParallelUglifyPlugin (没人维护，不推荐)

# 优化搜索时间
    1.在使用loader时使用test、include、exclude
    2.resolve.modules
    3.resolve.alias
    4.resolve.extensions 出现频率高的放前，列表尽可能短，代码中尽可能手动带上后缀
    5.module.noParse   忽略没有采用模块化的库，没有解析的必要  如jQuery、ChartJS


# babel
  原来 Babel 把 ES6 的标准分为 syntax 和 built-in 两种类型。syntax 就是语法，像 const、=> 这些默认被 Babel 转译的就是 syntax 的类型。而对于那些可以通过改写覆盖的语法就认为是 built-in，像 includes 和 Promise 这些都属于 built-in。而 Babel 默认只转译 syntax 类型的，对于 built-in 类型的就需要通过 @babel/polyfill 来完成转译。

  @babel/polyfill    Babel 在 7.4.0 版本中宣布废弃 @babel/polyfill 

## 设置目标浏览器


```
{
  "targets":{"ie":"8"}
}
```
@babel/preset-env会处理es6的syntax，但你设置目标浏览器后，它会选择那些语法需要处理。所以像promise，Map这些它还是不管的


  对于IE8的问题，继续研究，目前知道的是，只要引入polyfill，就会带来Object.defineProperty问题，很棘手
  
  方案一：Remove the Babel config from webpack.config.js, and only leave it in babel.config.js

[Babel —— 把 ES6 送上天的通天塔](https://www.cnblogs.com/vivotech/p/13330393.html)
[@babel/preset-env 与@babel/plugin-transform-runtime 使用及场景区别](https://segmentfault.com/a/1190000021188054)