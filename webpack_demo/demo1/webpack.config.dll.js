const webpack = require('webpack');
const path = require('path');

const vendors = [
    'react',
    'react-dom',
    'jquery',
    'react-addons-css-transition-group'
    // ...其它库
];

const webpackConfig = {
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js',
        library: '[name]',
    },
    entry: {
        "lib": vendors,
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.resolve(__dirname, 'build/manifest.json'),//'manifest.json',
            name: '[name]',
            context: __dirname,
        }),
    ],
};

module.exports = webpackConfig;