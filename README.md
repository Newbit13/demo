# demo 

    分类别收藏平时的练习，代码测试等，包括一些实用工具的实现


## 学习清单
[前端对AST（抽象语法树）的应用越来越多，应该看什么书籍才能补充这方面的知识点？](https://www.zhihu.com/question/268622554/answer/384881779)

[聊一聊 Javascript 中的 AST](https://www.jianshu.com/p/32db2f258986)

[H5转小程序]()

[Storybook](https://storybook.js.org/)

[backpack-js](https://www.npmjs.com/package/backpack-js)

## i18n
[I18nWebpackPlugin](https://www.webpackjs.com/plugins/i18n-webpack-plugin/)

# 微前端
[berial：更精致的微前端框架](https://zhuanlan.zhihu.com/p/301283431)

```
//沙箱：
const run = function (window){
  eval(`
    window.a = 1;
    console.log(window.a);
  `)
}
run(new Proxy({}))

//使用了 MutationObserver 对沙箱外部的世界进行观察，一旦发现逃逸，就塞回原沙箱
new MutationObserver((mutations) => {
    mutations.forEach(async (m: any) => {
        switch (m.type) {
        case 'childList':
            if (m.target !== host) {
            for (let i = 0; i < m.addedNodes.length; i++) {
                const node = m.addedNodes[i]
                if (node instanceof HTMLScriptElement) {
                // 塞回去
                }
            }
            }
            break
        default:
        }
    })
}).observe(document, { childList: true, subtree: true })
```
    

