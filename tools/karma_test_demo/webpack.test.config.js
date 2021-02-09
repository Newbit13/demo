var path = require('path');
var webpack = require('webpack');

// 此配置参数中没有entry、output两个节点的配置，打包的输入和输出karma会指定
module.exports={
    module:{
        loaders:[{
            test:/\.js$/,
            loader:'babel',
            query:{
                presets:['es2015']
            },
            exclude:[
               path.resolve( __dirname, '../test' ), path.resolve( __dirname, '../node_modules' )
            ]
        }]
    }
};