const path = require('path');
const base = require('./webpack.base');
const {merge} = require('webpack-merge');

module.exports = merge(base,{
  entry: path.resolve(__dirname,'./src/client/index.js'),
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname,'./dist/client')
  },
  devtool:'cheap-module-eval-source-map'
});