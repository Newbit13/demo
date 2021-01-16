// const p = Promise.resolve(2);
const p = new Promise(resolve=>{
    setTimeout(()=>{
        resolve()
    },3000)
})

const sss = (async () =>{
    await p;
    console.log(1);
});
console.log(sss);
sss();

(async function(){
    await p;
    console.log(1);
})();

// const aaa = (async () =>{
//     await p;
//     console.log(1);
// });
// aaa()

// (async () =>{
//     await p;
//     console.log(1);
// })();




// (async () =>{
//     await p;
//     console.log(1);
// })();

// const fooFn = async function foo(){
//     await p;
//     console.log('1');
// }
// console.log(fooFn);
// foo();

// p.then(()=>{
//     console.log('a');
// }).then(()=>{
//     console.log('b');
// })

// console.log('out');