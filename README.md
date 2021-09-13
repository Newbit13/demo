# demo 

    分类别收藏平时的练习，代码测试等，包括一些实用工具的实现

# 目录
- [node图片压缩工具](./node/util/imagemin)
- [大数据相关](./BigData)
- [机器学习相关](./ml/python_study)
- [gulp插件编写方法](./gulp_demo)

# 研究清单
- hard-source-webpack-plugin

'之前使用 DllPlugin 和 DllReferencePlugin 完成，但是其配置非常复杂，而且假如更新了文件，还需要手动重新生成 dll。这里选择了 AutoDllPlugin'

[开源录屏工具](https://github.com/rrweb-io/rrweb)
[web页面录屏实现](https://juejin.cn/post/6844903774897569805)

[Storybook](https://storybook.js.org/)

[backpack-js](https://www.npmjs.com/package/backpack-js)

[从零实现webpack热更新HMR](https://juejin.cn/post/6844904020528594957)

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
    

