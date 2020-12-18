let str = 'hello,world,i am the sugar baby aha'
let res = str.replace(/o/g,function(...arr){
    console.log(arr);
    return 'F'
})

console.log(`res:${res}`);