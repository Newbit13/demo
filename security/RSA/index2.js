const crypto = require('crypto');
const NodeRSA = require('node-rsa');


let inputString = '我是明文字符串！';
let publicKeyStr = '-----BEGIN PUBLIC KEY-----\n' +
    'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDdSuaHgkT3a+qRLycdOUdRwVZz\n' +
    'QuykgG55LzhO873c6O72o9p2fhSP/7pX61Tl7WQZI0mnwSTkl8W1Q9mG17KW2QFJ\n' +
    'xqAc1wYa0uqEPPpqkGDweBMHicQb1wtd865SCaBw0AK1ffa0vmtojkHXvhJDFdVO\n' +
    'aOTGOtYY5DFuuU2ukQIDAQAB\n' +
    '-----END PUBLIC KEY-----';
let privateKeyStr = '-----BEGIN PRIVATE KEY-----\n' +
    'MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAN1K5oeCRPdr6pEv\n' +
    'Jx05R1HBVnNC7KSAbnkvOE7zvdzo7vaj2nZ+FI//ulfrVOXtZBkjSafBJOSXxbVD\n' +
    '2YbXspbZAUnGoBzXBhrS6oQ8+mqQYPB4EweJxBvXC13zrlIJoHDQArV99rS+a2iO\n' +
    'Qde+EkMV1U5o5MY61hjkMW65Ta6RAgMBAAECgYATu54a707fEUx1bdL7FCR78dWX\n' +
    'qZwYfytauw82Wx3PGSZV7/6HGm8S+CbRuDZ12llWtILY5qw3hiEnLMm08H8IMg4S\n' +
    '27EFHJjUt0XU7JVGGzJkGB5GbPs83h6NZ8BhLSch8ZjZ7uUpQ8dqB2iTclwwJeZ9\n' +
    '4io1+OVTH7wYtMWM0QJBAPe7FVOZ08q0tsZSE3jYmml9GYRZrNnE+j9wCDP3Od3M\n' +
    'VF6p8GKR1ORxh/v97JlpyJV+Ah3iaLLXdN06jPh0MdcCQQDkreWFmn0EssHJ5jsK\n' +
    '017wBgoB0DJrPI2lH9LumL2DmfoRM9GPFJ2TgcVJyMmMDixCuOgJeM9KLAXBQo8C\n' +
    'omXXAkEAgoM2nh+5u95vOJZ/GbiLyS2WJusTrHshGBDO0YnbG6YNgP3o3hVUYrIJ\n' +
    'YVIKt1xKx69mMBZa8HWgZPj20eJtawJAIYoPu8SoyWOeYIpP5oqRxgpctV9fxbKf\n' +
    '47QDL9NfGEohDxzWg3G2msfRs7yrMstxWmfcQGdjn7FNNscYSn6fCQJBAOCWSRw9\n' +
    'bMlCFQFcedOUemczwz6FbeCR8BJJeAnz1Og/ordO1r5KLsJYcVpBczgDPPwNWalf\n' +
    'vxVGilYSjtz1YgA=\n' +
    '-----END PRIVATE KEY-----';
//NodeRSA实现RSA加解密方式
let key = new NodeRSA(publicKeyStr);
key.setOptions({encryptionScheme: 'pkcs1'});
let encryptStr = key.encrypt(inputString, 'base64');

// java用公钥生成的密文
// let encryptStr = 'bjC/Ae38B7+xVmJ1oCp/JpRsOv6C6DCYYqAOszrxXnruab3WaeP2SsnF7iGn7qwMGGdgT8c6dujyx/zrr57d4DWo+7XjxA6LIxWg2YucH1uiiL/kI4rasP9HH/M6DtT5TT4rInXjBs/wWd6exdtTHhfs3MntP4kyV/HpUkXgf/8='

console.log(encryptStr);
key.importKey(privateKeyStr, 'pkcs8-private');
console.log(key.decrypt(encryptStr, 'utf8'));

//crypto实现RSA加解密方式
encryptStr = crypto.publicEncrypt({key:publicKeyStr, padding: crypto.constants.RSA_PKCS1_PADDING}, Buffer.from(inputString, 'utf8'));
console.log(encryptStr.toString('base64'));

// java用公钥生成的密文
// encryptStr = 'bjC/Ae38B7+xVmJ1oCp/JpRsOv6C6DCYYqAOszrxXnruab3WaeP2SsnF7iGn7qwMGGdgT8c6dujyx/zrr57d4DWo+7XjxA6LIxWg2YucH1uiiL/kI4rasP9HH/M6DtT5TT4rInXjBs/wWd6exdtTHhfs3MntP4kyV/HpUkXgf/8=';
// encryptStr = new Buffer.from(encryptStr, 'base64');

let decryptStr = crypto.privateDecrypt({key:privateKeyStr, padding: crypto.constants.RSA_PKCS1_PADDING}, encryptStr);
console.log(decryptStr.toString('utf-8'));