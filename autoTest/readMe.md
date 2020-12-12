# 自动生成测试代码

思考下，我们编写的代码要如何优雅的自动生成测试代码。
我选择jest作为我的测试框架

需要确定几个问题：
- 测试代码有多少种形式
- 如何知道要生成什么样的测试代码

## 测试代码有多少种形式
### toBe类：
值：toBe

对象：toEqual

undefined, null, and false：toBeNull、toBeUndefined、toBeDefined、toBeTruthy、toBeFalsy

值比较：toBeGreaterThan、toBeGreaterThanOrEqual、toBeLessThan、toBeLessThanOrEqual、toBeCloseTo（应对小数计算精度问题）

数组：toContain

异常：toThrow

### 异步类：
注意必须使用done,可以避免问题（如果不用，当整个test执行完成时，而回调还没触发，会误以为这个测试没问题）：
```
test("test async", (done) => {
  setTimeout(()=>{
    expect(1).toBe(2);
    done()
  },2000)
});
```

### 启动、结束（可以作用于指定范围）
beforeEach、afterEach；beforeAll、afterAll
#### Scope
可以对一类测试划分范围，并让beforeEach只在访问内生效：
```
beforeAll(() => console.log('1 - beforeAll'));
afterAll(() => console.log('1 - afterAll'));
beforeEach(() => console.log('1 - beforeEach'));
afterEach(() => console.log('1 - afterEach'));
test('', () => console.log('1 - test'));
describe('Scoped / Nested block', () => {
  beforeAll(() => console.log('2 - beforeAll'));
  afterAll(() => console.log('2 - afterAll'));
  beforeEach(() => console.log('2 - beforeEach'));
  afterEach(() => console.log('2 - afterEach'));
  test('', () => console.log('2 - test'));
});

// 1 - beforeAll
// 1 - beforeEach
// 1 - test
// 1 - afterEach
// 2 - beforeAll
// 1 - beforeEach
// 2 - beforeEach
// 2 - test
// 2 - afterEach
// 1 - afterEach
// 2 - afterAll
// 1 - afterAll
```
describe优先级比test高，会比test先执行
test.only可以指定要特意执行哪个测试单元，其他的不管

### mock function
```
const mockCallback = jest.fn(x => 42 + x);
xxxFn(xx, mockCallback);
expect(mockCallback.mock.calls[0][0]).toBe(0);
```
可以测试mockCallback函数的输入值，输出值，调用次数
#### mocking modules
通过mock axios可以用假数据代替真实的api请求
```
// users.js
import axios from 'axios';

class Users {
  static all() {
    return axios.get('/users.json').then(resp => resp.data);
  }
}

export default Users;
```
```
import axios from 'axios';
import Users from './users';

jest.mock('axios');

test('should fetch users', () => {
  const users = [{name: 'Bob'}];
  const resp = {data: users};
  axios.get.mockResolvedValue(resp);

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))

  return Users.all().then(data => expect(data).toEqual(users));
});
```
jest.mock(fn) 可以对fn进行覆盖
```
// foo.js
module.exports = function () {
  // some implementation;
};

// test.js
jest.mock('../foo'); // this happens automatically with automocking
const foo = require('../foo');

// foo is a mock function
foo.mockImplementation(() => 42);
foo();
// > 42
```



## 如何知道要生成什么样的测试代码
通过观察jest的demo可以发现，一个简单的测试代码大概包括：处理函数，输入，输出，验证形式，描述

一个函数可以提供满足上述要素的，我想只要函数名称了。所以我绝对通过注解的方式，提供上述所有要素，再通过babylon解析这些代码，得到注释的信息，再用这些信息编写测试代码的ast，最终生成测试代码。

在这个过程中，我遇到的问题是，注释代码一般是字符串的形式存在，所以在写输入、输出参数时需要加个类型的提示
```
// test:minus
// des:minus 3 - 2 to equal 1
// params:num 3,num 2
// result:num 1
// method:toBe
function minus(a,b){
    return a - b;
}

```
最终生成测试代码：
```
test("minus 3 - 2 to equal 1", () => {
  expect(minus(3, 2)).toBe(1);
});
```

### 怎么编写能生成测试代码的ast代码？
我的方法是：
1. 访问https://astexplorer.net/
2. 把要写的代码输入并生成ast树
3. 观察树的结构并用babel-types构建

# 结论
感觉就是纯粹折腾，通过注解的方式自动生成测试代码跟自己写测试代码区别不大，并没有提升工作效率，反而在业务代码中留下了大量测试用的注解，阅读体验不佳。所以这当做一次练习AST生成代码的经历吧。

# 参考资料
[jest，一个 JavaScript 测试框架](https://www.jestjs.cn/docs//getting-started)