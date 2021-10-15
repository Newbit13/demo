const puppeteer = require("puppeteer");

async function openUrl(browser, url) {
  let page = await browser.newPage(); //创建Page实例，相当于一个标签页
  //   page.setViewport({ width: 1920, height: 1048 });
  // 打开页面
  await page.goto(url);
  // await page.waitForSelector(".filterBlock"); //等待某个元素加载完成，即使是异步的
  // page.waitForNavigation(options) //等待页面基本元素加载完成

  //在文档页面载入前调用 pageFunction，可以改变js环境，使用场景：页面导航完成后；页面的iframe加载或导航完成
  await page.evaluateOnNewDocument(() => {
    window.aaa = 123;
  });

  //   要在页面里执行的函数，只对当前url有效，如果加载了其他页，那么也随之失效
  await page.evaluate(() => {
    window.bbb = 777;
  });

  // 可以缩小dom查找范围，与$$eval区别是后者是：page.$$eval(selector, pageFunction[, …args])
  await page.$eval("#form", (dom) => {
    let inputDom = dom.querySelector("#kw");
    inputDom.value = "知乎";

    //在测试页面会跳转到其他页，这时候page.evaluate定义的变量失效，page.evaluateOnNewDocument定义的变量生效
    // let searchDom = dom.querySelector("#su");
    // searchDom.click();
  });

  //   todo
  // page.mouse //鼠标操作
}

async function start() {
  const browser = await puppeteer.launch({
    headless: false, //默认无头（true），就是不需要渲染界面，设置为false则让你看到当前浏览器显示的是什么
    devtools: true, //开启时可以在page.evaluate里写debugger
    // slowMo: 150, //可以延迟150ms,有啥用？
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--v8-cache-options=off",
      "--v8-cache-strategies-for-cache-storage=off",
      "--aggressive-cache-discard",
    ],
  });

  try {
    openUrl(browser, "https://www.baidu.com/");
  } catch (error) {
    browser.close();
    console.log("start error");
    console.log(error);
  }
}
start();
