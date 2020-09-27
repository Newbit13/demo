const { override, fixBabelImports,addLessLoader } = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd-mobile',
        libraryDirectory:'es',
        style: true
    }),
    addLessLoader({
        javascriptEnabled:true,
        modifyVars:{
            '@primary-color': 'gold',
            '@brand-primary': 'gold',
            '@brand-primary-tap': 'GoldenRod'
        }
    })
);