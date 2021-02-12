如果安装了webpack，却提示找不到，那很有可能是路径问题。
首先卸载所有karama、karama-cli：```npm uninstall karama karama-cli```
在重新安装：注意karama-cli要-g全局安装，karama需要-D安装

自定义Matchers:
jasmine提供了内置的Matchers如toBe、toBeNull、toContain等等，也可以自己提供Matchers：
```js
beforeEach(function () {
    this.addMatchers({
    toHaveKeys: function () {
        return {
        compare: function (actual, expected) {
            var keys = {}
            for (var i in actual) {
            try {
                keys[i] = true
            } catch (e) { }
            }
            for (var i = 0; i < expected.length; i++) {
            var el = expected[i]
            if (keys[el] !== true) {
                return {
                message: 'toHaveKeys has not this [' + el + '] key',
                pass: false
                }
            }
            }
            return {
            pass: true
            }
        }
        }
    },
    
    toA: function () {
        return {
        compare: function (actual, expected) {
            if (actual == null) {
            var type = actual + ''
            } else {
            var toS = Object.prototype.toString
            type = toS.call(actual).slice(8, -1).toLowerCase()
            }
            if (/error$/.test(type)) {
            type = 'error' //IE对错误类型存在差异,因此统一为Error
            }

            if (type !== expected) {
            return {
                message: 'Expected [' + expected + '] but actual is ' + type + '!',
                pass: false
            }
            }
            return {
            pass: true
            }
        }
        }
    }
    })
})
```
jasmine.addMatchers可以提前定义测试规则

通过下列方法可以让自定义Matchers可以全局使用：
```js
if (typeof jasmine !== 'undefined') {
    // http://stackoverflow.com/questions/11942085/is-there-a-way-to-add-a-jasmine-matcher-to-the-whole-environment
    beforeEach(function () {
      jasmine.addMatchers({
          ///your matchers
      })
    }
}
```

karma.conf.js中的plugins字段不写的话会根据需要自动找到插件(有时因为全局安装karma的问题找不到对应的插件)，要写的话需要写全。

karma-event-driver-ext：模仿浏览器操作用的

配置webpack的babel记得把测试文件排除，否则会报错某些错误（我遇到的是ReferenceError: regeneratorRuntime is not defined）

#bug
我使用chrome作为浏览器来测试时，发现普通测试可以，但是想使用karma-event-driver-ext来模拟浏览器的操作时缺报错：
- WARN [karma]: No captured browser, open http://127.0.0.1:9876/
- Couldn't connect to selenium server

看了这个：
https://github.com/karma-runner/karma/issues/2372

我决定换无头浏览器试试,也无法解决问题

我再重新阅读了[karma-event-driver-ext](https://www.npmjs.com/package/karma-event-driver-ext)：
- 得知需要通过```java -jar selenium-server-standalone-3.3.1.jar```运行selenium server
- 下载chromedriver并将其放到chrome安装目录下并配置环境变量

报错：SessionNotCreatedException，可能原因是浏览器版本与chromedriver版本不对，果然！成功运行！