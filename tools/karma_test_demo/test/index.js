// import {a} from '../src/index.js'
// var a =1;
// console.log(a);
describe('haha', function () {
    // it('should xxxx', function () {
    //     expect(a).toBe(1)
    // });
    it('toHaveKeys test', function () {
        expect({ha:1,ka:1}).toHaveKeys(['ha','ka'])
    });
});