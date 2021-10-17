const superagent = require("superagent");
/**
 * 用于发送爬取的信息*/
function curl(data, url) {
  superagent
    .post(url)
    //.auth('xx', 'pwdpwd', {type:'auto'})
    // .set("Referer", "http://xxx")
    .send(data)
    .type("json")
    .end(function (err, res) {
      if (err == null) {
        console.log(res.status);
        console.log(res.text);
      } else {
        console.log(`接口post失败`);
        console.log(err.status);
      }
    });
}

module.exports = {
  curl,
};
