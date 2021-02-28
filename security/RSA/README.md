```sh
# 利用openssl生成pem的过程：
# 1.生成RSA私钥 通常大于512，选择1024或者2048
openssl genrsa -out rsa_private_key.pem 1024
# 2.需要转换成RSA私钥转换成PKCS8格式
openssl pkcs8 -topk8 -inform PEM -in rsa_private_key.pem -outform PEM -nocrypt
# 3.生成RSA公钥
openssl rsa -in rsa_private_key.pem -pubout -out rsa_public_key.pem
```

1.为什么需要转换RSA私钥为PKCS8格式？
PKCS8形式：
-----BEGIN PRIVATE KEY-----
MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAN1K5oeCRPdr6pEv
...
vxVGilYSjtz1YgA=
-----END PRIVATE KEY-----

在java程序中，不用借助openssl就能生成公钥密钥对，但是生成的不是pem格式的。
其生成的公钥*不包括*形如`-----BEGIN PUBLIC KEY-----`这种头跟尾；
生成的密钥不是这种`-----BEGIN RSA PRIVATE KEY-----`而是`-----BEGIN PRIVATE KEY-----`这种格式的**内容**(注意这里指的内容不包括头尾)

# 本项目中的node程序的解密算法可以解密java生成的密文
```java
import java.nio.charset.Charset;
import java.util.Arrays;
import java.util.Base64;
import java.security.Key;
import java.security.KeyFactory;
import java.security.spec.X509EncodedKeySpec;
import javax.crypto.Cipher;
import java.io.ByteArrayOutputStream;

class HelloWord{
    public static String PUBLICKEY = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDdSuaHgkT3a+qRLycdOUdRwVZzQuykgG55LzhO873c6O72o9p2fhSP/7pX61Tl7WQZI0mnwSTkl8W1Q9mG17KW2QFJxqAc1wYa0uqEPPpqkGDweBMHicQb1wtd865SCaBw0AK1ffa0vmtojkHXvhJDFdVOaOTGOtYY5DFuuU2ukQIDAQAB";
    public static int MAX_ENCRYPT_BLOCK = 117;
    public static String KEY_ALGORITHM = "RSA";
    public static void main(String[] args){
		test_getSign();
		
    }
	public static String test_getSign(){
		try {
			byte[] encryptBytes = encryptByPublicKey("好".getBytes(Charset.forName("UTF-8")), PUBLICKEY);
			String encrypt = java.util.Base64.getEncoder().encodeToString(encryptBytes);
			System.out.println(encrypt);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

    public static byte[] decryptBASE64(String key){
        Base64.Decoder decoder = Base64.getDecoder();
        byte[] keyBytes = decoder.decode(key);
        
		return keyBytes;
	}

    public static byte[] encryptByPublicKey(byte[] data, String key)throws Exception{
		// 对公钥解密
		byte[] keyBytes = decryptBASE64(key);

		// 取得公钥
		X509EncodedKeySpec x509KeySpec = new X509EncodedKeySpec(keyBytes);
		KeyFactory keyFactory = KeyFactory.getInstance(KEY_ALGORITHM);
		Key publicKey = keyFactory.generatePublic(x509KeySpec);

		// 对数据加密
		Cipher cipher = Cipher.getInstance(keyFactory.getAlgorithm());
		cipher.init(Cipher.ENCRYPT_MODE, publicKey);

		int inputLen = data.length;
		ByteArrayOutputStream out = new ByteArrayOutputStream();
		int offSet = 0;
		byte[] cache;
		int i = 0;
		// 对数据分段加密
		while (inputLen - offSet > 0) {
			if (inputLen - offSet > MAX_ENCRYPT_BLOCK) {
				cache = cipher.doFinal(data, offSet, MAX_ENCRYPT_BLOCK);
			} else {
				cache = cipher.doFinal(data, offSet, inputLen - offSet);
			}
			out.write(cache, 0, cache.length);
			i++;
			offSet = i * MAX_ENCRYPT_BLOCK;
		}
		byte[] encryptedData = out.toByteArray();
		out.close();
		return encryptedData;
		// return "好".getBytes(Charset.forName("UTF-8"));
	}
}
```

# 辅助工具，将java生成的公钥密钥转成pem格式
```js
function insertStr(str, insertStr, sn) {
    var newstr = '';
    for (var i = 0; i < str.length; i += sn) {
    var tmp = str.substring(i, i + sn);
    newstr += tmp + insertStr;
    }
return newstr;
}

const getPrivateKey = function(key) {
    const result = insertStr(key, '\n', 64);
    return '-----BEGIN PRIVATE KEY-----\n' + result + '-----END PRIVATE KEY-----';
};

const getPublicKey = function(key) {
    const result = insertStr(key, '\n', 64);
    return '-----BEGIN PUBLIC KEY-----\n' + result + '-----END PUBLIC KEY-----';
};
```


# 参考
[NodeJS 两个模块进行 RSA 加密解密(匹配Java RSA)](https://my.oschina.net/u/943746/blog/2885763)

[RSA_PKCS1_PADDING](https://www.douban.com/note/338531480/)