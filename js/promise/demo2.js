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
        if(this.state === RESOLVED){
            resloveFn(this.resolveV);
        }
        if(this.state === PENDDING){
            this.regisFn.push(resloveFn);
        }
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