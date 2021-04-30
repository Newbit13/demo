# 思考
- img.src的值是什么才有效


本地图片预览：
FileReader实例.readAsDataURL 读取File类型的参数，返回base64

# base64
格式：
```data:[<mediatype>][;base64],<data>```,例如：data:image/png;base64,xxxxx

Base64是一种用64个字符来表示任意二进制数据的方法。

用记事本打开exe、jpg、pdf这些文件时，我们都会看到一大堆乱码，因为二进制文件包含很多无法显示和打印的字符，所以，如果要让记事本这样的文本处理软件能处理二进制数据，就需要一个二进制到字符串的转换方法。Base64是一种最常见的二进制编码方法。

Base64的原理很简单，首先，准备一个包含64个字符的数组：

['A', 'B', 'C', ... 'a', 'b', 'c', ... '0', '1', ... '+', '/']
然后，对二进制数据进行处理，每3个字节一组，一共是3x8=24bit，划为4组，每组正好6个bit。
2^6 = 64,所以每6个bit可以转换为64个字符中的某个字段。

如果要编码的二进制数据不是3的倍数，最后会剩下1个或2个字节怎么办？Base64用\x00字节在末尾补足后，再在编码的末尾加上1个或2个=号，表示补了多少字节，解码的时候，会自动去掉。

由于标准的Base64编码后可能出现字符+和/，在URL中就不能直接作为参数，所以又有一种"url safe"的base64编码，其实就是把字符+和/分别变成-和_：

# ArrayBuffer
ArrayBuffer本身只是一系列0和1，如果想看到具体的值，可以用过Int8Array、Uint8Array这些构造函数显示其值。比如二进制是0011 0001。那么显示在Int8Array就是1（根据ascii编码）

ArrayBuffer 基本上就像原始内存一样。它模拟了使用 C 之类的语言进行的直接内存访问。「你可能想知道为什么我们不让程序直接访问内存，而是添加了这种抽象层，因为直接访问内存将导致一些安全漏洞」。

由此可以知道，如果我们想生成特定的二进制数据，可以使用Int8Array这类TypedArray来构建；也可以通过TypedArray来修改ArrayBuffer

# base64转Blob
```js
function dataUrlToBlob(base64, mimeType) {
  let bytes = window.atob(base64.split(",")[1]);
  let ab = new ArrayBuffer(bytes.length);
  let ia = new Uint8Array(ab);
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeType });
}
```
## 图片上传中，普通上传和base64上传哪个更节省流量?
普通上传更节省流量，Base64编码会把3字节的二进制数据编码为4字节的文本数据，长度增加33%

## 非要上传base64格式的图片
服务器(举例express)需要特别处理：
```js
const app = require('express')();
app.post('/upload', function(req, res){
    let imgData = req.body.imgData; // 获取POST请求中的base64图片数据
    let base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    let dataBuffer = Buffer.from(base64Data, 'base64');
    fs.writeFile("haha.png", dataBuffer, function(err) {
        if(err){
          res.send(err);
        }else{
          res.send("图片上传成功！");
        }
    });
});
```

# 注意区分图片像素数据和二进制数据
todo
通道:

# 总结&注意的点
FileReader.readAsDataURL()生成的base64，其中的mediatype只是简单根据文件后缀来生成的

FileReader.readAsDataURL和URL.createObjectURL都可以通过Blob类型的参数返回一个url，前者兼容性好些（前者IE10及以上兼容，后者IE11都不兼容）

URL.createObjectURL创建的Object URL会在应用关闭前常驻内存，可以使用URL.revokeObjectURL(url)来删除该URL对该Blob资源的引用，以释放内存

# 参考资料
[玩转前端二进制](https://mp.weixin.qq.com/s/QHi6BVM5Jt8XwZ_FKcRYsg)
[base64](https://www.liaoxuefeng.com/wiki/897692888725344/949441536192576)

[FileReader](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader)

[一步一步解码 PNG 图片](https://vivaxyblog.github.io/2019/12/07/decode-a-png-image-with-javascript-cn.html)

[png解码编码工具](https://github.com/vivaxy/png)