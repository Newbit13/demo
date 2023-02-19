const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack(config){
    // config.devtool = "cheap-module-source-map"
    config.devtool = "inline-source-map"
  }
})
