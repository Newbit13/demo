# demo 

    分类别收藏平时的练习，代码测试等，包括一些实用工具的实现


# 研究清单
[开源录屏工具](https://github.com/rrweb-io/rrweb)

[Storybook](https://storybook.js.org/)

[backpack-js](https://www.npmjs.com/package/backpack-js)

# 实践清单
- H5转小程序

- 可视化页面搭建


## i18n
[I18nWebpackPlugin](https://www.webpackjs.com/plugins/i18n-webpack-plugin/)

## 微前端
[berial：更精致的微前端框架](https://zhuanlan.zhihu.com/p/301283431)

```
//沙箱：
let run = function (window){
  eval(`
    window.a = 233;
    console.log(window.a);
    console.log(window.document.documentElement);
  `)
}
const forkWindow = {};
run(new Proxy(window,{
get(target, key) {
      console.log('获取了getter属性');
      if(key in forkWindow){
        return forkWindow[key];
      }else{
        return target[key]
      }
      
    },
set(target, key,val) {
      console.log('设置了setter属性');
      return forkWindow[key] = val;
    }
}))



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
    

