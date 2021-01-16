async function foo(){
    const a = await 42;
    console.log(a);//42
    return a;
}

let result = foo();
console.log(result);//Promise { <pending> }