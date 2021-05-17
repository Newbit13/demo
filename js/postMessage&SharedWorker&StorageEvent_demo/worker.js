console.log('hhhhhhhhhhh');
let a = 0;
onconnect = function (e) {
    var port = e.ports[0];
    a++;
    port.addEventListener('message', function (e) {
        // var workerResult = 'Result: ' + (e.data[0] * e.data[1]);
        var workerResult = 'Result: ' + (a);
        port.postMessage(workerResult);
    });

    port.start(); // Required when using addEventListener. Otherwise called implicitly by onmessage setter.
}