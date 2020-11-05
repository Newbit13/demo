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
    target: ["web", "es2014"],//不然生成的代码包裹在es6的arrow function里,output.environment 也可以起到同样的效果
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
                                ['@babel/preset-env',{
                                    "useBuiltIns": "usage"
                                }]
                            ],
                            plugins: ['@babel/transform-runtime'] //根据需要引入polyfill
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