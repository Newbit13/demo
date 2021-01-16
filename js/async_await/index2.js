async function foo(){
    const a = await 42;
    return a;
}

async function bar(){
    let result = foo();
    console.log(result);//Promise { <pending> }
    result =await foo();
    console.log(result);//42
}

bar();
console.log(1);