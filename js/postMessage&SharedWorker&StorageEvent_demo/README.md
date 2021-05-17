# 跨标签通讯方式
1. postMessage（一般得通过window.open才能或者其他标签页，有局限性）
2. 监听storage事件（好处是不用使用window.open，个人推荐；注意localStorage需要保存与旧值不同的值才能触发监听，并且只能触发其他标签页的，本页不会触发）
SharedWorker ([兼容性特差:36.06%](https://www.caniuse.com/?search=SharedWorker),不能直接通讯，算是共享数据)
4. 轮询cookie（兼容性好，性能差）

