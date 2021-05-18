# ts学习笔记
1. keyof

```ts
interface Props {
    foo: string;
    la: number;
    [key: string]: Props[keyof Props];
}
```
用 keyof 来获取一个接口的所有 key 组成的联合类型

[手册指南](https://www.tslang.cn/docs/handbook/advanced-types.html)