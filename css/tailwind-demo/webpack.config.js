const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const {PurgeCSSPlugin} = require('purgecss-webpack-plugin');
// const glob = require("glob-all");
const webpackConfig = {
  mode: "development", //none
  // target: ["web", "es3"], //不然生成的代码包裹在es6的arrow function里,output.environment 也可以起到同样的效果
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env", //转换插件的集合,如果源码中使用了不在 @babel/preset-env 中的语法，会报错
                ],
              ],
              plugins: [
                "@babel/plugin-transform-runtime",
                "@babel/plugin-transform-regenerator",
              ],
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "url-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, 
          "css-loader", "postcss-loader"],
      },
    ],
  },
  entry: {
    index: "./src/index.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
  },
  plugins: [
    new CleanWebpackPlugin(),
    // 会让tailwind的hover失效
    // new PurgeCSSPlugin({
    //   paths: glob.sync([
    //     //glob用于匹配路径
    //     path.resolve(__dirname, "./src/*.html"), //html 上 也有css 需要摇树
    //     path.resolve(__dirname, "./index.html"), 
    //     path.resolve(__dirname, "./src/*.js"),
    //   ]),
    // }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    
  ],
};

module.exports = webpackConfig;
