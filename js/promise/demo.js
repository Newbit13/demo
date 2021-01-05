class MyPromise{
    constructor(stateChangeFn){
        this.state = 'pending',
        this.resolveV;
        this.rejectV;
        this.regisFn = [];
        stateChangeFn(this.resolve.bind(this))
    }

    then(resloveFn){
        this.regisFn.push(resloveFn);
    }

    resolve(res){
        var promise = this;
        promise.state = 'resolve',
        promise.resolveV = res;
        setTimeout(function(){
            promise.regisFn.forEach((fn)=>{
                fn(promise.resolveV)
            })
        })
        return promise
    }
}

MyPromise.resolve = function(res){
    var promise = new MyPromise();
    promise.state = 'resolve',
    promise.resolveV = res;
    setTimeout(function(){
        promise.regisFn.forEach((fn)=>{
            fn(promise.resolveV)
        })
    })
    return promise
}

// MyPromise.resolve(1).then((res)=>{
//     console.log(res);
// })
// console.log(222);

// new MyPromise(resolve=>{
//     setTimeout(function(){
//         resolve(2333)
//     },3000)
// }).then((res)=>{
//     console.log(res);
// })
// console.log(666);