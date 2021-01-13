// 开发时遇到跨域问题，且fetch无法设置host，referer等

GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest
function request(){
    //?lan=1&plat=4
    // return fetch("http://192.168.50.214:3000/",{
    // return fetch("http://www.baidu.com",{
    return fetch("http://txt-api-dev.7m.com.cn/esports-live/api/matches/live/list?lan=1&plat=4",{
        method:"GET",
        headers:{
            Accept: "application/json",
            Host: "txt-api-dev.7m.com.cn",
            Origin:"http://esports.devp.7m.com.cn",
            Referer: "http://esports.devp.7m.com.cn/",
            // UserAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
        }
    }).then(res=>{
        console.log(1);
        return res.json()
    }).then(res=>{
        console.log(res);
    }).catch(err=>{
        console.log(2);
        console.log(err);
    });
    // return fetch("http://www.baidu.com",{mode:'no-cors'}).then(res=>{
    //     console.log(1);
    //     console.log(res);
    // }).catch(err=>{
    //     console.log(2);
    //     console.log(err);
    // });
}

export default request