const puppeteer = require("puppeteer");


async function openUrl(browser,url) {
    let page = await browser.newPage(); //创建Page实例，相当于一个标签页
    page.setViewport({ width: 1920, height: 1048 });
    // 打开页面
    await page.goto(url);
    // await page.waitForSelector(".filterBlock"); //等待某个元素加载完成，即使是异步的
    // page.waitForNavigation(options) //等待页面基本元素加载完成
  
    // page.evaluateOnNewDocument(pageFunction, …args), 在文档页面载入前调用 pageFunction，可以改变js环境？？
  
    // 可以缩小dom查找范围，与$$eval区别是后者是：page.$$eval(selector, pageFunction[, …args])
    const result = await page.$eval(".xx", (dom) => {
      let xx = dom.querySelectorAll(".xx");
    });
  }
  

function start() {
    const browser = await puppeteer.launch({
        //headless: false,
        // devtools: xx,//??
        slowMo: 150,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--v8-cache-options=off",
            "--v8-cache-strategies-for-cache-storage=off",
            "--aggressive-cache-discard",
        ],
    });

  try {
    openUrl(browser,"http://xxx");
  } catch (error) {
    browser.close();
    console.log("start error");
    console.log(error);
  }
}
start();
