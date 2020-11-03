// 写一个 es6 的继承过程,要实现 extends 的功能。
const createExtends = function(sons, ssuper) {
	// TODO
    sons.__proto__ = ssuper;//继承静态属性
    sons.prototype.__proto__ = ssuper.prototype;//继承动态属性
}

class Human{
  static ha = 1
  static la = 2
  speak() {
    console.log('i am human')
  }
}

class Man{
  static zz = 3
  static la = 5
  // speak() {
  //   console.log('i am man')
  // }
}

createExtends(Man,Human)

console.log(Human.la);
console.log(Human.ha);

console.log(Man.la);
console.log(Man.ha);

console.log(Man.speak);
console.log(new Man().speak());