const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');

// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
// const smp = new SpeedMeasurePlugin();
// const webpackConfig = smp.wrap({
//     module:{
//         rules: [
//             // {//全局暴露jq
//             //     test: require.resolve('jquery'),
//             //     use: [{
//             //         loader: 'expose-loader',
//             //         options: {
//             //             exposes: ['$', 'jQuery'],
//             //         }
//             //     }]
//             // }
//         ]
//     },
//     // externals:{//不打包jq,但是jq链接得自己引用
//     //     jquery:'$',
//     // },
//     entry: {
//         index:'./src/index.js',
//     },
//     output: {
//         filename: '[name].bundle.js',
//         path: path.resolve(__dirname, 'dist')
//     },
//     plugins: [
//         // new CleanWebpackPlugin(),
//         // new HtmlWebpackPlugin({
//         //     template: './index.html',
//         // })
//     ],
//     optimization: {
//         splitChunks: {//为了避免重复引用 || 把大的文件提取出来
//             chunks: 'initial',
//             automaticNameDelimiter: '.',
//             name: 'vendors_hahaha',
//             cacheGroups: {
//                 vendors: {//cacheGroups里可以设置多个对象，通过priority优先级来判断执行哪个对象的内容
//                     test: /[\\/]node_modules[\\/]/,
//                     priority: 1
//                 }
//             }
//         },
//         // runtimeChunk: {
//         //     name: entrypoint => `manifest.${entrypoint.name}`
//         // }
//     }
// })

const webpackConfig = {
    // mode: 'development',
    mode: 'none',
    target: ["web", "es2013"],//不然生成的代码包裹在es6的arrow function里,output.environment 也可以起到同样的效果
    module:{
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'gg',
                    },
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                // '@babel/preset-env'
                                ['@babel/preset-env',//转换插件的集合,如果源码中使用了不在 @babel/preset-env 中的语法，会报错，手动在 plugins 中增加即可
                                {//useBuiltIns配置在使用@babel/plugin-transform-runtime后就不需要了，plugin-transform-runtime以沙箱垫片(shim)的方式防止污染全局（不用plugin-transform-runtime时，"".padStart在IE9是个function）,一起使用时，"useBuiltIns": "usage"会跟没有使用一样，而跟"useBuiltIns": "entry"一起使用会重复引入，所以不要一起使用就对了
                                    // debug: true,
                                    // "useBuiltIns": "entry",//需要在入口处import "core-js"，这种方法就是全引入
                                    // "useBuiltIns": "usage",//按需
                                    // corejs: 3,//bug：本来不用加的，加了一次之后反而不能去掉了
                                    // modules:false,
                                    // loose: true//没用？
                                    // "targets": {
                                    //     "esmodules": true
                                    //   },
                                    // "targets":{
                                    //     // "ie":"8"
                                    //     "chrome":"70"
                                    // }//没用，IE还是没有Object.defineProperty,这个
                                }
                                ]
                            ],
                            // plugins: [['@babel/transform-runtime',{corejs: 3}]] //就是@babel/plugin-transform-runtime吗？ 作用：缩减代码、解决polyfill直接修改api带来的全局污染问题
                            // plugins: [['@babel/plugin-transform-runtime',{corejs: 3}]] //作用：缩减代码、解决polyfill直接修改api带来的全局污染问题,比如"".padStart 是undefined    这个不受presets的targets影响，比如"chrome":"70"没用
                        }
                    }
                ]
            }
        ]
    },
    // externals:{//不打包jq,但是jq链接得自己引用
    //     jquery:'$',
    //     react:'React',
    //     'react-dom':'ReactDOM'
    // },
    entry: {
        // index:["babel-polyfill",'./src/index.js'],
        index:'./src/index.js',
        // index2:'./src/index2.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        // environment: {
        //     // The environment supports arrow functions ('() => { ... }').
        //     arrowFunction: false,//true,
        //     // The environment supports BigInt as literal (123n).
        //     bigIntLiteral: false,
        //     // The environment supports const and let for variable declarations.
        //     const: true,
        //     // The environment supports destructuring ('{ a, b } = obj').
        //     destructuring: true,
        //     // The environment supports an async import() function to import EcmaScript modules.
        //     dynamicImport: false,
        //     // The environment supports 'for of' iteration ('for (const x of array) { ... }').
        //     forOf: true,
        //     // The environment supports ECMAScript Module syntax to import ECMAScript modules (import ... from '...').
        //     module: false,
        // }
    },
    plugins: [
        new CleanWebpackPlugin(),
        // new webpack.DllReferencePlugin({
        //     context: __dirname,
        //     manifest: path.resolve(__dirname, 'build/manifest.json'),//require('./manifest.json'),
        // }),
        new HtmlWebpackPlugin({
            template: './index.html',
        }),
        // new BundleAnalyzerPlugin()//查看打包结果
    ],
    // optimization: {
    //     splitChunks: {//为了避免重复引用 || 把大的文件提取出来
    //         chunks: 'initial',
    //         automaticNameDelimiter: '.',
    //         name: 'vendors_hahaha',
    //         cacheGroups: {
    //             vendors: {//cacheGroups里可以设置多个对象，通过priority优先级来判断执行哪个对象的内容
    //                 test: /[\\/]node_modules[\\/]/,
    //                 priority: 1
    //             }
    //         }
    //     },
    //     // runtimeChunk: {
    //     //     name: entrypoint => `manifest.${entrypoint.name}`
    //     // }
    // },
    resolveLoader:{//自定义loader时，在开发阶段需要指定loader的位置，否则默认只会在node_modules中找
        modules: ['node_modules','loader']
    }
}

module.exports = webpackConfig;