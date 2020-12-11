const {
  sum,
  minus,
  multip,
  isTrue,
  isUndefined,
  isNull
} = require("./sum.js");

test("add 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});
test("minus 3 - 2 to equal 1", () => {
  expect(minus(3, 2)).toBe(1);
});
test("multip 3 * 2 to equal 6", () => {
  expect(multip(3, 2)).toBe(6);
});
test("true equal true", () => {
  expect(isTrue(true)).toBe(true);
});
test("undefined equal undefined", () => {
  expect(isUndefined(undefined)).toBe(undefined);
});
test("null equal null", () => {
  expect(isNull(null)).toBe(null);
});