const MyPromise = require('./myPromise.js');

// MyPromise.resolve(1).then((res)=>{
//     console.log(res);
// })
// console.log(222);

MyPromise.resolve(1).then((res)=>{
    console.log(res);
})
console.log(222);