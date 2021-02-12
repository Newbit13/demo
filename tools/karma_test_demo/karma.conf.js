// Karma configuration
// Generated on Tue Feb 09 2021 17:12:40 GMT+0800 (GMT+08:00)
var webpackConfig = require('./webpack.test.config');
module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'webpack'],


    // list of files / patterns to load in the browser
    files: [//测试代码的路径，里面可以直接写测试代码，不用再引入jasmine包这些，并且可以自动监听文件变化重新测试
      'test/*.js'
    ],


    // list of files / patterns to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/*.js': ['webpack']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: false
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    hostname: '127.0.0.1',
    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    // browsers: ['Chrome', 'Firefox', 'IE'],
    browsers: ['Chrome'],
    // browsers: ['PhantomJS','Chrome'],

    customLaunchers: {//用于模拟浏览器操作
      'Chrome': {
        base: 'WebDriverio',
        browserName: 'chrome',
        name: 'Karma',
        config: {
          browserName: 'chrome',
          host: '127.0.0.1', // default
          port: '4444' // default
        }
      },
      // 'PhantomJS': {
      //   base: 'WebDriverio',
      //   browserName: 'chrome',
      //   name: 'Karma',
      //   config: {
      //     browserName: 'chrome',
      //     host: '127.0.0.1', // default
      //     port: '3000' // default
      //   }
      // },
      // 'Firefox': {
      //   base: 'WebDriverio',
      //   browserName: 'firefox',
      //   name: 'Karma-Firefox',
      //   config: {
      //     browserName: 'firefox',
      //     host: '127.0.0.1', // default
      //     port: '4444' // default
      //   }
      // }
    },
    plugins: [
      'karma-webdriverio-launcher',
      'karma-webpack',
      'karma-jasmine',
      'karma-chrome-launcher',
      // 'karma-phantomjs-launcher'
    ],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
