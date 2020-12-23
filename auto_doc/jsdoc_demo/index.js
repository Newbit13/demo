/**
 * 加法函数
 * @date 2020-12-23
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function add(a,b) {
    return a + b;
}

/**
 * 返回自定义对象
 * @date 2020-12-23
 * @returns {{ha,la,ba}}
 */
function getDiy(){
    return {
        good:233
    }
}
//当输入getDiy(). 时会提供自定义的property以选择

/**
 * 描述
 * @date 2020-12-23
 * @returns {any}
 */
class MyObj{
    constructor(){
        this.zzz = "zzz"
    }
}

/**
 * 返回自定义对象2
 * @date 2020-12-23
 * @returns {MyObj}
 */
function getDiy2(){
    return {
        ha:"s"
    }
}

//当输入getDiy2(). 时会提供对应对象的property以选择

/**
 * 描述
 * @date 2020-12-23
 * @returns {Document}
 */
function getElement(){
    return document;
}

//当输入getElement().时，会有一系列相关的方法、属性可以使用。如：getElementById
