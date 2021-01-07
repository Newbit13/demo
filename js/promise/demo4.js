const PENDDING = "PENDDING"; // 初始化pendding状态
const RESOLVED = "RESOLVED"; // 正确完成resolve状态
// const REJECTED = "REJECTED"; // 错误完成reject状态

class MyPromise{
    constructor(stateChangeFn){
        this.state = PENDDING,
        this.resolveV;
        this.rejectV;
        this.regisFn = [];
        stateChangeFn(this.resolve.bind(this))
    }

    then(resloveFn){
        if(!resloveFn){//针对空值情况
            resloveFn = v=>v;
        }
        return new MyPromise(resolve=>{
            function fulfilished(value){
                const res = resloveFn(value);
                if(res instanceof MyPromise){
                    res.then(resolve)
                }else{
                    resolve(res);
                }
            }
            if(this.state === RESOLVED){
                fulfilished(this.resolveV)
            }
            if(this.state === PENDDING){
                this.regisFn.push(fulfilished);
            }
        });
    }

    resolve(res){
        var promise = this;
        promise.state = RESOLVED,
        promise.resolveV = res;
        promise.regisFn.forEach((fn)=>{
            fn(promise.resolveV)
        })
    }
}

MyPromise.resolve = function(res){
    return new MyPromise(resolve=>{
        setTimeout(function(){
            resolve(res)
        })
    });
}

MyPromise.all = function(list){
    var len = list.length;
    var index = 0;
    return new MyPromise(resolve=>{
        setTimeout(function(){
            var temp = [];
            list.forEach((v,i)=>{
                v.then(res=>{
                    //这里不用temp.push,为了与promise.all的返回值保持一致
                    temp[i] = res;
                    index++;
                    if(index === len){
                        resolve(temp)
                    }
                })
            })
        })
    });
}

//别人的写法
MyPromise.all2 = function(promises) {
    // 已然是返回一个promise
    return new MyPromise((resolve) => {
      // 创建一个收集返回值的数组
      const result = []

      // 执行
      deepPromise(promises[0], 0 , result)

      

      // 这里我们用递归来实现
      // @param {MyPromise} promise 每一个promise方法
      // @param {number} index 索引
      // @param {string[]} result 收集返回结果的数组
      function deepPromise(promise, index, result) {
        // 边界判断
        // 所有执行完之后返回收集数组
        if(index > promises.length - 1) {
            // 返回结果
            return resolve(result)
        }
        if(typeof promise.then === 'function') {
          // 如果是promise
          promise.then(res => {
            index++
            result.push(res)
            deepPromise(promises[index], index, result)
          })
        }else {
          // 如果是普通值
          // 这里我们只做简单判断，非promise则直接当返回值处理
          index++
          result.push(promise)
          deepPromise(promises[index], index, res)
        }
      }
    })

}

//验证用的代码
// MyPromise.resolve(1).then((res)=>{
//     console.log(res);
// })
// console.log(222);

// new MyPromise(resolve=>{
//     setTimeout(function(){
//         resolve(2333)
//     },1000)
// }).then((res)=>{
//     console.log(res);
// })
// console.log(666);

// MyPromise.resolve(1).then(res=>{
//     console.log(res);
//     return new MyPromise((resolve, reject) => {
//         resolve('promise second')
//     })
// }).then(res=>{
//     console.log(res);
// })

// MyPromise = Promise
console.time('ttt')
let p = new MyPromise(resolve=>{
    setTimeout(function(){
        resolve(2333)
    },2000)
});
// p.then(res=>console.log(res));
const promise1 = p
const promise2 = MyPromise.resolve(2)
const promise3 = new MyPromise(resolve=>{
    setTimeout(function(){
        resolve(777)
    },1000)
})
// MyPromise.all([promise1,promise2,promise3]).then(res => {
//     console.log(res)
//     console.timeEnd('ttt')
// })
MyPromise.all2([promise1,promise2,promise3]).then(res => {
    console.log(res)
    console.timeEnd('ttt')
})