// (function(doc, win) {
//     var docEl = doc.documentElement,
//         resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
//         recalc = function() {
//             var clientWidth = docEl.clientWidth;
//             if (!clientWidth) return;
//             docEl.style.fontSize = 10 * (clientWidth /750) + 'px';
//         };
//     if (!doc.addEventListener) return;
//     win.addEventListener(resizeEvt, recalc, false);
//     doc.addEventListener('DOMContentLoaded', recalc, false);
// })(document, window);

/*********************************/
;(function(designWidth, maxWidth) {
    var doc = document,
        win = window;
    var docEl = doc.documentElement;
    var tid;
    var rootItem,rootStyle;

    function refreshRem() {
        var width = docEl.getBoundingClientRect().width;
        if (!maxWidth) {
            maxWidth = 540;
        };
        if (width > maxWidth) {
            width = maxWidth;
        }
        //1rem=75px
        var rem = width * 64 / designWidth;
        //兼容UC开始
        rootStyle="html{font-size:"+rem+'px !important}';
        rootItem = document.getElementById('rootsize') || document.createElement("style");
        if(!document.getElementById('rootsize')){
            document.getElementsByTagName("head")[0].appendChild(rootItem);
            rootItem.id='rootsize';
        }
        if(rootItem.styleSheet){
            rootItem.styleSheet.disabled||(rootItem.styleSheet.cssText=rootStyle)
        }else{
            try{rootItem.innerHTML=rootStyle}catch(f){rootItem.innerText=rootStyle}
        }
        //兼容UC结束
        docEl.style.fontSize = rem + "px";
    };
    refreshRem();

    win.addEventListener("resize", function() {
        clearTimeout(tid); //防止执行两次
        tid = setTimeout(refreshRem, 300);
    }, false);

    win.addEventListener("pageshow", function(e) {
        if (e.persisted) { // 浏览器后退的时候重新计算
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);

    if (doc.readyState === "complete") {
        doc.body.style.fontSize = "12px";
    } else {
        doc.addEventListener("DOMContentLoaded", function(e) {
            doc.body.style.fontSize = "12px";
        }, false);
    }
})(640,750);
