const puppeteer  = require('puppeteer');

const project_name = '12bet_basket_';//项目名
const xintiao_log = project_name + 'now_log';//心跳key值
const error_time = project_name + 'error_timeout_';//网络错误时间截 key
const page_error = project_name + 'now_error_page-';//页面错误key


/**
 *对Date的扩展，将 Date 转化为指定格式的String
 *月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 *年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 *例子：
 *(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 *(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 */
Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

function getData(){
    (async () => {
        if(process.env.NODE_DEBUG>0) {
            console.log(`爬虫程序正式开始0`);
        }
        const browser = await puppeteer.launch({
            // headless: false,
            slowMo:100,
            args: ['--no-sandbox', '--disable-setuid-sandbox','--v8-cache-options=off',
                '--v8-cache-strategies-for-cache-storage=off','--aggressive-cache-discard'],
            // executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
        });

        /**
        * 方法：存储redis错误
        * 调用：errFun(e, 'page_error', true, "页面错误");
        * @param _e      {object}  错误信息      Default: ''
        * @param _name   {string}  变量名        Default: xintiao_log
        * @param _istrue {boolean} 是否加时间戳  Default: true
        * @param _txt    {string}  错误文字      Default: ''
        */
        function errFun(_e = '', _name = xintiao_log, _istrue = true, _txt = ''){
            _e = String(_e);
            console.log(`提示=========${new Date()}=========信息:${_txt}`);
            console.log(_e);
            //browser.close(); // 关闭浏览器
            console.log("浏览器已关闭，正在重启...");
            getData();
        }
        if(process.env.NODE_DEBUG>0) {
            console.log(`爬虫程序正式开始1`);
        }
        let page = await browser.newPage();		
        // Configure the navigation timeout
        console.log("取消超时限制");
        await page.setDefaultNavigationTimeout(0);

        console.log(`爬虫程序正式开始===${new Date().format("yyyy-MM-dd hh:mm:ss")}`);
        //打开初始网页
        try{
            page.setViewport({width: 1920, height: 1048});
            // 打开页面
            await page.goto('http://www.baidu.com');
            console.log(`页面载入完成===网络正常`);
        }catch(e){
             await browser.close();
             errFun(e,error_time, true, "网络错误");
             return;
        }
        try{
            // 循环获取dom
            while(1) {
                try {
                    console.log(`刷新网页...`);
                    await page.waitFor(3000);
                    await page.waitForSelector('#head_wrapper');
                    console.log(`网页正常加载完毕`);
                }catch(e){
                    await browser.close();
                    console.log(`xxxx`);
                    return;
                }
                try {
                    //获取数据统计
                    const result = await page.$eval('#head_wrapper', element1 => {
                        console.log(2333);
                        return element1;
                    });
                    console.log(result);
                    const result2 = await page.$('#head_wrapper');
                    console.log(result2.innerText);
                    console.log(`爬取成功`);
                }catch (e) {
                    // console.log(e);
                    await browser.close();
                    errFun(e, '', _istrue = false, _txt = '获取数据时出现错误');
                    return;
                }
                
                await page.waitFor(1000*2);
                await page.reload();
                await page.waitFor(1000*3);

            }
        }catch(e){
            await browser.close();
            errFun(e, page_error + Number(new Date()), true, "页面错误");
        }
    })();
}
getData();