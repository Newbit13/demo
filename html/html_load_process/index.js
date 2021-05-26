console.log(document.readyState);

// iframe的缺点
// 1.iframe会阻塞主页面的Onload事件
// 2.搜索引擎的检索程序无法解读这种页面，不利于SEO
// 3.iframe和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载
// 通过动态赋予iframe src的值，可以解决1、3问题
document.getElementById("haha").src = "https://www.baidu.com"

setTimeout(()=>{
    console.log(document.readyState);
},1000);