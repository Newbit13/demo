var Benchmark = require("benchmark");
var suite = new Benchmark.Suite();

// 比较两种深拷贝的性能差异,结论 用遍历的方式比JSON.parse高效多
/**
 * JSON.parse缺点：
 * 1.他无法实现对函数 、RegExp等特殊对象的克隆
 * 2.会抛弃对象的constructor,所有的构造函数会指向Object
 * .对象有循环引用,会报错
 */
var a = { ss: "1232", ll: [1, 23, 4, 5], oo: { ha: 123 }, nn: 666 };
// a.wa = a;
// console.log(a);

var test1 = function () {
  var b = JSON.parse(JSON.stringify(a));
  return b;
};

function deepClone(target) {
  let typeStr = Object.prototype.toString.call(target);
  let v;
  switch (typeStr) {
    case "[object Object]":
      v = {};
      for (var key in target) {
        v[key] = deepClone(target[key]);
      }
      break;
    case "[object Array]":
      v = [];
      for (var key in target) {
        v[key] = deepClone(target[key]);
      }
      break;
    default:
      v = target;
  }
  return v;
}
var test2 = function () {
  var b = deepClone(a);
  return b;
};

const isType = (obj, type) => {
  if (typeof obj !== "object") return false;
  const typeString = Object.prototype.toString.call(obj);
  let flag;
  switch (type) {
    case "Array":
      flag = typeString === "[object Array]";
      break;
    case "Date":
      flag = typeString === "[object Date]";
      break;
    case "RegExp":
      flag = typeString === "[object RegExp]";
      break;
    default:
      flag = false;
  }
  return flag;
};

const getRegExp = (re) => {
  var flags = "";
  if (re.global) flags += "g";
  if (re.ignoreCase) flags += "i";
  if (re.multiline) flags += "m";
  return flags;
};

/**
 * deep clone
 * 1.多加了几种类型；2.可以处理循环引用问题
 * @param  {[type]} parent object 需要进行克隆的对象
 * @return {[type]}        深克隆后的对象
 */
const clone = (parent) => {
  // 维护两个储存循环引用的数组
  const parents = [];
  const children = [];

  const _clone = (parent) => {
    if (parent === null) return null;
    if (typeof parent !== "object") return parent;

    let child, proto;

    if (isType(parent, "Array")) {
      // 对数组做特殊处理
      child = [];
    } else if (isType(parent, "RegExp")) {
      // 对正则对象做特殊处理
      child = new RegExp(parent.source, getRegExp(parent));
      if (parent.lastIndex) child.lastIndex = parent.lastIndex;
    } else if (isType(parent, "Date")) {
      // 对Date对象做特殊处理
      child = new Date(parent.getTime());
    } else {
      // 处理对象原型
      proto = Object.getPrototypeOf(parent);
      // 利用Object.create切断原型链
      child = Object.create(proto);
    }

    // 处理循环引用
    const index = parents.indexOf(parent);

    if (index != -1) {
      // 如果父数组存在本对象,说明之前已经被引用过,直接返回此对象
      return children[index];
    }
    parents.push(parent);
    children.push(child);

    for (let i in parent) {
      // 递归
      child[i] = _clone(parent[i]);
    }

    return child;
  };
  return _clone(parent);
};

var test3 = function () {
  var b = clone(a);
  return b;
};
var res;
res = test1();
console.log(res);
res = test2();
console.log(res);
res = test3();
console.log(res);
// return;

suite
  .add("test1", function () {
    test1();
  })
  .add("test2", function () {
    test2();
  })
  .add("test3", function () {
    test3();
  })
  .on("cycle", function (event) {
    console.log(String(event.target));
  })
  .run({ async: true });
