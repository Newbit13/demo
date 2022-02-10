const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

const webpackConfig = {
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/preset-env',
                                    {
                                        modules: "commonjs"
                                    }
                                ]
                            ],
                            // plugins: [['@babel/plugin-transform-runtime', { corejs: 3 }]]
                        }
                    }
                ]
            },{
                test:/\.(glb|stl)$/,
                loader:'file-loader',
            }
        ]
    },
    entry: {
        index: './src/index9.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html',
        }),
    ],
}

module.exports = webpackConfig;