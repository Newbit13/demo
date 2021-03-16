function insertStr(str, insertStr, sn) {
    var newstr = '';
    for (var i = 0; i < str.length; i += sn) {
    var tmp = str.substring(i, i + sn);
    newstr += tmp + insertStr;
    }
    return newstr;
}

const getPublicKey = function(key) {
    const result = insertStr(key, '\n', 64);
    return '-----BEGIN PUBLIC KEY-----\n' + result + '-----END PUBLIC KEY-----';
}

const getPrivateKey = function(key) {
    const result = insertStr(key, '\n', 64);
    return '-----BEGIN PRIVATE KEY-----\n' + result + '-----END PRIVATE KEY-----';
};