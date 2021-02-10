import { beforeHook, afterHook, browser, config } from 'karma-event-driver-ext/cjs/event-driver-hooks'
describe('haha', function () {
    // increase timeout
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 2000000
    //  this.timeout(200000);
    beforeAll(async (done) => {
        await beforeHook();
        done()
    });
    afterAll(async () => {
        await afterHook(false);
    });

    it('should xxxx', function () {
        expect(typeof document).toBe('object')
    });
    it('test dom', async function () {
        var div = document.createElement('div');
        div.id = "DIV"
        document.body.appendChild(div);
        div.innerHTML = '看到我吗？'
        var a = 1;
        div.onclick = function () {
            a++
        };
        // div.click();
        // await browser.moveToObject(document.body, 0, 0) // top-left corner
        // .buttonDown();
        await browser
            .moveToObject(document.body, 0, 0).$apply();

        expect(a).toBe(1);
        //  done()
        return new Promise(function (r) {
            setTimeout(function () {
                r()
                done()
            }, 3000)
        })
    });
});