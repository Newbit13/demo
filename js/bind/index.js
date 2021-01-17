function foo(a,b){
    // console.log(a);
    // console.log(b);
    return a + b;
}
const bar = foo.bind(null,10);
const r1 = foo(1,2);
console.log(r1);
const r2 = bar(1,2);
console.log(r2);