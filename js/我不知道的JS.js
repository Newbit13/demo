//JSON.stringify不能打印JSON里的函数，但是通过参数可以打印其函数体
console.log(JSON.stringify(
    {
        dsa:function(){return 1},
        ha:213
    }, 
    function(a,b,c){
        if(b.dsa){
            console.log(b.dsa)
            b.dsa = b.dsa.toString();
        }
        return b
    },
    2
));