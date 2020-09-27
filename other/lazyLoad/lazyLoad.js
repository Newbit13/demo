(function(){
    //真正要懒加载的不能放到src里
    //原来的问题：默认img的宽高要最好设置好，不然可能因为默认图片跟目标图片大小不一致而导致判定加载时不准确
    //我开始的解决办法是给图片加宽高，不过图片会失真
    //解决办法。。。就是只加高咯，笨！
    var aImg = [].slice.call(document.getElementsByTagName('img')),
        length = aImg.length;

    for (var i = 0; i < length; i++) {
        aImg[i].src = 'img/loading.jpg';
    }
    if (!-[1,]) {
        window.attachEvent('onscroll', deBounce(lazy, 500));
    } else {
        window.addEventListener('scroll', deBounce(lazy, 500), false);
    }
    lazy();
    function lazy() {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
            vH = document.documentElement.clientHeight + scrollTop;
        for (var i = aImg.length - 1; i >= 0; i--) {
            if (getTop(aImg[i]) < vH) {
                aImg[i].src = aImg[i].getAttribute('data-original');
                aImg.splice(i, 1);
            }
        }
    }
    function getTop(obj) {
        var t = 0;
        while (obj !== document.body) {
            t += obj.offsetTop;
            obj = obj.offsetParent;
        }
        return t;
    }
})()