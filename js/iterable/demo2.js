/**
 * 通过next来手动迭代，可以有更高的灵活性
*/
let list = [1,2,3];
let iterator = list[Symbol.iterator]();
let item = iterator.next();
console.log(item);
