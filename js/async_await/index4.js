// const p = Promise.resolve(2);
// const p = new Promise(resolve=>{
//     setTimeout(()=>{
//         resolve()
//     },3000)
// });

const sss = (() =>{
    console.log(1);
});
console.log(sss);
sss();

(function(){
    console.log(1);
})();
