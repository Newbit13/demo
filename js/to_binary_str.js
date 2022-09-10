function to_binary_str(code, binaryLen) {
  if (!binaryLen) {//如果没有要求要显示的位数
    let len = 0;
    let v = code;
    do {
      v = v >> 2;
      len++;
    } while (v);
    // 这个加一我是先通过最后结果算不准而修正出来的。
    binaryLen = len + 1;//剩最后一位无法除2，所以要加一
  }

  let strBuf = new Array(64);
  let mask = 1 << (binaryLen - 1);
  for (let i = 0; i < binaryLen; i++) {
    if (code & mask) {
      strBuf[i] = 1;
    } else {
      strBuf[i] = 0;
    }
    mask >>= 1;
  }
  return strBuf.filter((item) => item !== null).join("");
}
// let result = to_binary_str(7);
// console.log(result);
