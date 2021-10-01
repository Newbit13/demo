var Benchmark = require("benchmark");
var suite = new Benchmark.Suite();

var a = { ss: "1232", ll: [1, 23, 4, 5], oo: { ha: 123 }, nn: 666 };
// 比较两种深拷贝的性能差异,结论 用遍历的方式比JSON.parse高效多

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
var res;
res = test1();
console.log(res);
res = test2();
console.log(res);
// return;

suite
  .add("test1", function () {
    test1();
  })
  .add("test2", function () {
    test2();
  })
  .on("cycle", function (event) {
    console.log(String(event.target));
  })
  .run({ async: true });
