//https://webpack.js.org/api/loaders/#the-loader-context 一些api，可以获取更多信息
module.exports = function(source,map){
    // console.log(this.loaders[this.loaderIndex].options);
    // console.log(this.resourcePath);
    // console.log(this.query); //相当于options

    // this.cacheable && this.cacheable()
    // this.value = source;
    // console.log('---------------');
    // console.log(source);
    // console.log('---------------');

    // var callback = this.async();//异步时调用
    // setTimeout(function(){
    //     callback(null,'/*copy@ newbit*/'+source+';console.log("gg")');
    // },2000);
    return '/*copy@ newbit start*/'+source+'/*copy@ newbit end*/';
}