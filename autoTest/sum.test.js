const {sum,minus} = require('./sum');

test('add 1 + 2 to equal 3',()=>{
    expect(sum(1,2)).toBe(3);
});

test('minus 3 - 2 to equal 1',()=>{
    expect(minus(3,2)).toBe(1);
});