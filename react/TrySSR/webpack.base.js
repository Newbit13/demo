const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  resolve:{
    extensions:['.js','.jsx']
  },
  module: {
    rules: [{
      test: /.jsx?$/,
      use: 'babel-loader',
      exclude: /node_modules/
    }]
  },
  plugins:[
    new CleanWebpackPlugin()
  ]
};