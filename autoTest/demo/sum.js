// test:sum
// des:add 1 + 2 to equal 3
// params:num 1,num 2
// result:num 3
function sum(a,b){
    return a + b;
}

// test:minus
// des:minus 3 - 2 to equal 1
// params:num 3,num 2
// result:num 1
function minus(a,b){
    return a - b;
}

// test:multip
// des:multip 3 * 2 to equal 6
// params:num 3,num 2
// result:num 6
function multip(a,b){
    return a * b;
}

// test:isTrue
// des:true equal true
// params:bool true
// result:bool true
function isTrue(bool){
    return bool;
}

// test:isUndefined
// des:undefined equal undefined
// params:undefined 1
// result:undefined 1
function isUndefined(){
    return;
}

// test:isNull
// des:null equal null
// params:null null
// result:null null
function isNull(a){
    return a;
}

module.exports = {
    sum,
    minus,
    multip,
    isTrue,
    isUndefined,
    isNull
};