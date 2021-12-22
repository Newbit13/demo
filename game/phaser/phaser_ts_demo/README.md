使用vite
npm init vite@latest
选vanilla

安装phaser
npm install phaser@3.55.2

phaser中文教程
http://phaser.io/tutorials/making-your-first-phaser-3-game-chinese


```ts
let oo = {
  add: function (this: any, n: number) {
    console.log(n);
    console.log(this);
  },
};
oo.add(1);
```
在ts之中，this可以放在函数第一个参数并给予其类型