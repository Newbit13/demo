const WebpackNodeExternals = require('webpack-node-externals')
const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname,'./src/client/index.js'),
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname,'./dist/client')
  },
  // externals: [WebpackNodeExternals()],  //排除不需要的打包模块
  devtool:'cheap-module-eval-source-map',
  module: {
    rules: [{
      test: /.jsx?$/,
      use: 'babel-loader',
      exclude: /node_modules/
    }]
  }
};