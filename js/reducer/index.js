// 串行
const createPromise = (time,id)=>()=>{
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            console.log('promise',id);
            resolve();
        },time);
    })
}

// 并行
// const createPromise = (time,id)=>{
//     return new Promise(function(resolve,reject){
//         setTimeout(function(){
//             console.log('promise',id);
//             resolve();
//         },time);
//     })
// }

let data = [1000,2000,3000]

data.reduce((p,n)=>{
    return p.then(createPromise(n,n))
},Promise.resolve());

