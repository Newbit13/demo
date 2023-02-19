/**
 * 如何成为迭代器
 * 1 对象实现了Symbol.iterator属性
 * 2 对象里有[Symbol.iterator]函数和next函数
*/
let obj = {};
obj[Symbol.iterator] = function () {
  return {
    current: 10,
    next() {
      if (this.current > 0) {
        return { done: false, value: this.current-- };
      }
      return { done: true };
    },
  };
};
for(let i of obj){
  // console.log(i);
}


let obj2 = {
  current: 10,
  [Symbol.iterator](){
    return this;
  },
  next() {
    if (this.current > 0) {
      return { done: false, value: this.current-- };
    }
    return { done: true };
  },
}

for(let i of obj2){
  // console.log(i);
}


