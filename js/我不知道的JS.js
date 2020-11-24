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

//监听元素是否显示或隐藏在视窗内
// IntersectionObserver
const intersectionObserver = new IntersectionObserver(function(items, observer) {
    items.forEach(function(item) {
        if(item.isIntersecting) {
            // loadImage(item.target);
            observer.unobserve(item.target);
        }
    });
});

intersectionObserver.observe(image);