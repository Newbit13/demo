const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
// const smp = new SpeedMeasurePlugin();

// const webpackConfig = smp.wrap({
//     module:{
//         noParse: /jquery/,
//     },
//     entry: './src/index.js',
//     output: {
//         filename: 'bundle.js',
//         path: path.resolve(__dirname, 'dist')
//     },
//     // plugins: [new HtmlWebpackPlugin({
//     //     template: './index.html'
//     // })]
// })

const webpackConfig = {
    module:{
        rules: [
            // {//全局暴露jq
            //     test: require.resolve('jquery'),
            //     use: [{
            //         loader: 'expose-loader',
            //         options: {
            //             exposes: ['$', 'jQuery'],
            //         }
            //     }]
            // }
        ]
    },
    externals:{//不打包jq,但是jq链接得自己引用
        jquery:'$',
    },
    entry: {
        index:'./src/index.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html',
        })
    ]
}

module.exports = webpackConfig;