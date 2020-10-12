const WebpackNodeExternals = require('webpack-node-externals')
const path = require('path');
const webpack = require('webpack');
const base = require('./webpack.base');
const {merge} = require('webpack-merge');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(base,{
  entry: path.resolve(__dirname,'./src/server/index.js'),
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname,'./dist/server')
  },
  externals: [WebpackNodeExternals()],  //排除不需要的打包模块
  target: 'node',
  module: {
    rules: [{
      test: /.css$/,
      use: [
        // './webpack/loader/css-remove-loader',
        // MiniCssExtractPlugin.loader,
        {
          loader:'css-loader',
          options: {
            modules: {
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
            },
          },
        }
      ]//服务端不需要引入css，用客户端的就好
    }]
  },
  plugins: [  // 配置webpack
      new webpack.DefinePlugin({
        '__isServer': true,   // 服务端设置true，客户端设置false
      }),
  ]
});