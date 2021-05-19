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

了解：
    Mapped types（映射类型）
    Conditional Types（条件类型）
    Index types（索引类型）

2. extends
```T extends U ? X : Y```
如果 T 和 U 兼容（T 包含 U 有的所有属性，T 可以被赋值给 U），这个类型就是 X，否则就是 Y。
例子：
```ts
//但这样的类型写法是有问题的，因为返回值有可能是 null，没有 toUpperCase 这个方法。
function process(text: string | null): string | null {
  return text;
}
process().toUpperCase() // ???
```
这个时候我们可以用条件类型来解决：(==，有错)
```ts
function process<T extends string | null>(
 text: T
): T extends string ? string : null {
 ...
}

process("foo").toUpperCase() // ok
process().toUpperCase() // error
```




[ts-高级类型](https://www.tslang.cn/docs/handbook/advanced-types.html)
[巧用 Typescript](https://zhuanlan.zhihu.com/p/39620591)