//防抖函数
/* 
@param fn欲防抖的函数
@param t 防抖时间，单位毫秒，据说不能低于30，否则没有效果（有关浏览器的事件触发频率） 
@param immediate1 首次是否触发   默认true
@param immediate2 最后一次次是否触发   默认true
 */
function deBounce(fn, t, immediate1, immediate2) {
    var timeout;//作为闭包用的变量，因闭包特性不会消失
    immediate1 = immediate1 === false ? false : true;
    immediate2 = immediate2 === false ? false : true;
    return function (event) {
        var argv = arguments;
        function laster() {
            timeout = null;
            if (immediate2) fn.apply(this, argv);
        }
        var firstTime = immediate1 && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(laster, t);
        if (firstTime) {
            fn.apply(this, argv);
        }
    }
}