const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const base = require('./webpack.base');
const {merge} = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(base,{
  entry: path.resolve(__dirname,'./src/client/index.js'),
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname,'./dist/client')
  },
  devtool:'cheap-module-eval-source-map',
  devServer:{
    contentBase:'./dist',
    open:true,
    port:3333,
    hot:true,
    // hotOnly:true
  },
  module:{
    rules:[{
      test:/.css$/,
      use:[
        MiniCssExtractPlugin.loader,
        // 'style-loader',
        {
          loader:'css-loader',
          options: {
            modules: {
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
            },
          },
        }
      ]
    }]
  },
  plugins:[
    // new htmlWebpackPlugin({
    //   title:"ssr title",
    //   template:"./index.html",
    //   // minify:{
    //   //   removeComments:true,
    //   //   collapseWhitespace:true,
    //   //   minifyCSS:true
    //   // }
    // }),
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      '__isServer': false,   // 服务端设置true，客户端设置false
    }),
    new MiniCssExtractPlugin({
      filename:'index.css'
    })
  ]
});