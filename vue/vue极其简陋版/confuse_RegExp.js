
var reg1 =  /\{\{([^}]*)\}\}/g;
var c =  '{{lala}}';
console.log(reg1.test(c)); //true
console.log(reg1.lastIndex); //8
console.log(reg1.test(c)); //false
console.log(reg1.lastIndex); //0
console.log(reg1.test(c)); //true
console.log(reg1.lastIndex); //8
console.log('--------------------------------------');
var reg2 =  /\{\{([^}]*)\}\}/;
console.log(reg2.test(c));//true
console.log(reg2.lastIndex);//0
console.log(reg2.test(c));//true
console.log(reg2.lastIndex);//0
console.log(reg2.test(c));//true
console.log(reg2.lastIndex);//0