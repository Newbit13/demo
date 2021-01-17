function list() {
    return Array.prototype.slice.call(arguments);
  }
  
  function addArguments(arg1, arg2) {
      return arg1 + arg2
  }
  
  var list1 = list(1, 2, 3); // [1, 2, 3]
  
  var result1 = addArguments(1, 2); // 3
  
  // 创建一个函数，它拥有预设参数列表。
  var leadingThirtysevenList = list.bind(null, 37);
  
  // 创建一个函数，它拥有预设的第一个参数
  var addThirtySeven = addArguments.bind(null, 37);
  
  var list2 = leadingThirtysevenList();
  // [37]
  
  var list3 = leadingThirtysevenList(1, 2, 3);
  console.log(list3);
  // [37, 1, 2, 3]
  
  var result2 = addThirtySeven(5);
  console.log(result2);
  // 37 + 5 = 42
  
  var result3 = addThirtySeven(5, 10);
  console.log(result3);
  // 37 + 5 = 42 ，第二个参数被忽略