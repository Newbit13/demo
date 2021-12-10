vite 对 decorators 支持不好，由于存在预编译，所以当我使用了 装饰器 的代码会报错。
解决方法就是将文件改成 tsx，并且在 vite.config.js 中加入：

```
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          ["@babel/plugin-proposal-decorators", { legacy: true }],
          ["@babel/plugin-proposal-class-properties", { loose: true }],
        ],
      },
    }),
  ],
});
```

为什么触发 action 不更新是因为版本 6.0 之后需要加入 makeObservable

fn 组件里,例如组件名为 BFn：`export default inject("counter")(observer(BFn)); `,其中 counter 对应与提供给 Provider 的值（Provider 来源于`import { Provider } from "mobx-react";`）
