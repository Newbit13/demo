//节流函数
/* 
@param fn 目标函数
@param t1 防抖时间，单位毫秒，据说不能低于30，否则没有效果（有关浏览器的事件触发频率） 
@param t2 规定时间内必须执行一次 单位毫秒
@param immediate1 最后一次次是否触发   默认true
*/
function trottle(fn, t1, t2, immediate1) {
    var timeout;//作为闭包用的变量，因闭包特性不会消失
    immediate1 = immediate1 === false ? false : true;
    var preTime = 0;
    return function () {
        var argv = arguments;
        function laster() {
            timeout = null;
            if (immediate1) fn.apply(this, argv);
        }
        var now = new Date().getTime();
        if (now - preTime > t2) {
            fn.apply(this, argv);
            preTime = now;
        }
        clearTimeout(timeout);
        timeout = setTimeout(laster, t1);
    }
}