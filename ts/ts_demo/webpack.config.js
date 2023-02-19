const path = require('path');

module.exports = {
    entry: "./src/index.ts",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
            { 
                test: /\.tsx?$/,
                include: [
                    path.resolve(__dirname, "./src")
                ],
                exclude: [
                    path.resolve(__dirname, "./node_modules")
                ],
                loader: "ts-loader"
            }
        ]
    }
};