const puppeteer = require("puppeteer");
var ProgressBar = require("progress");
const { curl } = require("./utils.js");

// curl({list:[{ha:1}]},"http://127.0.0.1/datasource/uploadgame")
async function openUrl(browser, url) {
  let page = await browser.newPage(); //创建Page实例，相当于一个标签页
  page.setViewport({ width: 1920, height: 926 });
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

  //跳转登录
  let loginUrl = await page.$eval(".actions .btn", (dom) => {
    // 这里面相当于页面的控制台环境，没有node代码外面那些变量，比如page
    let loginUrl = dom.href;
    return loginUrl;
  });

  await page.goto(loginUrl);
  //登录操作
  await page.$eval(".js-validate", (dom) => {
    dom.querySelector("input[type=email]").value = "525842854@qq.com";
    dom.querySelector("input[type=password]").value = "1q2w3e4r";
    dom.querySelector(".go-login").click();
  });

  // 跳转到游戏页，此时已经登录
  await page.waitForNavigation();
  await page.goto("https://switchvip.com/category/games");
  let postUrls = await page.$eval(".posts-wrapper", async (dom) => {
    async function check() {
      return new Promise((resolve) => {
        let timer = setInterval(() => {
          window.scrollTo(0, body.innerHeight());
          let domList = dom.querySelectorAll("article.post");
          domLen = domList.length;
          if (domLen > 5) {
            clearInterval(timer);
            resolve(domList);
          }
        }, 1000);
      });
    }

    let domList = await check();
    let postUrls = [];
    domList.forEach((post) => {
      let postUrl = post.querySelector("a").href;
      let gameName = post.querySelector(".entry-title a").innerText;

      let imageDom = post.querySelector(".placeholder img");
      let imgUrl = "";
      if (imageDom) {
        imgUrl = imageDom.getAttribute("data-src");
      }

      postUrls.push({
        url: postUrl,
        name: gameName,
        img: imgUrl,
      });
    });
    return postUrls.slice(0, 1); //test,先返回一个
  });

  // 跳转进每个游戏界面获取游戏详情
  var bar = new ProgressBar(
    "数据获取中： [:bar] 进度:percent 预计:etas后完成",
    { total: postUrls.length, width: 100 }
  );
  await Promise.all(
    postUrls.map(async (game, index) => {
      let page = await browser.newPage();
      await page.goto(game.url);

      let gameInfo = await page.$eval("#app", (app) => {
        let dom = app.querySelector(".btn-group");
        let baiduLinkTemp = dom.querySelector("a").href;
        let baiduCode = dom
          .querySelector("button.go-copy")
          .innerText.replace("密码：", "");

        let videoUrl = "";
        let remarkText = "";
        let remarkDom = app.querySelector(".article-content .entry-wrapper");
        if (remarkDom) {
          remarkText = remarkDom.innerText;
          // 因为删除dom后，其innerText内容不变，所以使用别的方法代替
          // todo 待调试
          let alertDom = remarkDom.querySelector(".alert");
          if (alertDom) {
            remarkText = remarkText.replace(alertDom.innerText, "");
          }
          let shareDom = remarkDom.querySelector(".entry-share");
          if (shareDom) {
            remarkText = remarkText.replace(shareDom.innerText, "");
          }
          let videoIframe = remarkDom.querySelector("iframe");
          if (videoIframe) {
            videoUrl = videoIframe.src;
            remarkText = remarkText.replace(videoIframe.innerText, "");
          }
        }

        return {
          baiduLinkTemp,
          baiduCode,
          videoUrl,
          remarkText,
        };
      });
      // to note off
      // await page.goto(gameInfo.baiduLinkTemp);//先禁用，因为访问会消耗下载次数

      await page.goto("https://www.baidu.com");
      let baiduLink = await page.url();

      postUrls[index].baiduLink = baiduLink;
      postUrls[index].baiduCode = gameInfo.baiduCode;
      postUrls[index].video = gameInfo.videoUrl;
      postUrls[index].remark = gameInfo.remarkText;

      bar.tick();
    })
  );
  console.log(postUrls);
  // curl({list:postUrls},"http://127.0.0.1/datasource/uploadgame")
  //   todo
  // page.mouse //鼠标操作
}

async function start() {
  const browser = await puppeteer.launch({
    // headless: false, //默认无头（true），就是不需要渲染界面，设置为false则让你看到当前浏览器显示的是什么
    // devtools: true, //开启时可以在page.evaluate里写debugger
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
    openUrl(browser, "https://switchvip.com/");
  } catch (error) {
    browser.close();
    console.log("start error");
    console.log(error);
  }
}
start();
