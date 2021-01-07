// const { injectBabelPlugin } = require('react-app-rewired');
const rewireCssModules = require('react-app-rewire-css-modules');

module.exports = function override(config, env) {
    //css模块化
    config = rewireCssModules(config, env);
    return config;
};