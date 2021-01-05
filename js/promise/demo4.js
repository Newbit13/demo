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
            list.forEach((v)=>{
                v.then(res=>{
                    temp.push(res);
                    index++;
                    if(index === len){
                        resolve(temp)
                    }
                })
            })
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

// MyPromise.resolve(1).then(res=>{
//     console.log(res);
//     return new MyPromise((resolve, reject) => {
//         resolve('promise second')
//     })
// }).then(res=>{
//     console.log(res);
// })

const promise1 = new MyPromise(resolve=>{
    setTimeout(function(){
        resolve(2333)
    },1000)
})
const promise2 = MyPromise.resolve(2)
const promise3 = MyPromise.resolve(3)

MyPromise.all([promise1,promise2,promise3]).then(res => {
    console.log(res)
})