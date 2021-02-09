var path = require('path');
var webpack = require('webpack');

// 此配置参数中没有entry、output两个节点的配置，打包的输入和输出karma会指定
module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};