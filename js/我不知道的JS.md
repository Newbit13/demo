```js
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
```
```js
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
```

# 正则表达式 - (?!), (?:), (?=)的区别
(?:pattern) 
非获取匹配，匹配pattern但不获取匹配结果，不进行存储供以后使用。这在使用或字符“(|)”来组合一个模式的各个部分是很有用。例如“industr(?:y|ies)”就是一个比“industry|industries”更简略的表达式。
(?=pattern)
非获取匹配，正向肯定预查，在任何匹配pattern的字符串开始处匹配查找字符串，该匹配不需要获取供以后使用。例如，“Windows(?=95|98|NT|2000)”能匹配“Windows2000”中的“Windows”，但不能匹配“Windows3.1”中的“Windows”。预查不消耗字符，也就是说，在一个匹配发生后，在最后一次匹配之后立即开始下一次匹配的搜索，而不是从包含预查的字符之后开始。
(?!pattern)
非获取匹配，正向否定预查，在任何不匹配pattern的字符串开始处匹配查找字符串，该匹配不需要获取供以后使用。例如“Windows(?!95|98|NT|2000)”能匹配“Windows3.1”中的“Windows”，但不能匹配“Windows2000”中的“Windows”。
(?<=pattern)
非获取匹配，反向肯定预查，与正向肯定预查类似，只是方向相反。例如，“(?<=95|98|NT|2000)Windows”能匹配“2000Windows”中的“Windows”，但不能匹配“3.1Windows”中的“Windows”。
(?<!pattern)
非获取匹配，反向否定预查，与正向否定预查类似，只是方向相反。例如“(?<!95|98|NT|2000)Windows”能匹配“3.1Windows”中的“Windows”，但不能匹配“2000Windows”中的“Windows”。这个地方不正确，有问题 

# 创建匿名函数
```
(function(){}["constructor"]("console.log(1)")())
```

# js filter
```
let list = [,,,1,,3];
list.filter(Boolean);//[1,3]  其中Boolean是一个函数
```