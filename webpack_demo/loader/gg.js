module.exports = function(source,map){
    this.cacheable && this.cacheable()
    this.value = source;
    console.log('---------------');
    console.log(source);
    console.log('---------------');

    // var callback = this.async();//异步时调用
    // setTimeout(function(){
    //     callback(null,'/*copy@ newbit*/'+source+';console.log("gg")');
    // },2000);
    return '/*copy@ newbit*/'+source+';console.log("gg")';
}