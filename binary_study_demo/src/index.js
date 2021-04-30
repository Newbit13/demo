import * as png from '@vivaxy/png/lib/index.js';

// import a from './node_modules/@ha/index.js'
// console.log(a);

const loadFile = function (event) {
    // FileReader体验
    // const reader = new FileReader();
    // reader.onload = function () {
    //     const output = document.querySelector("#previewContainer");
    //     console.log(reader.result);
    //     output.src = reader.result;
    // };
    // reader.readAsDataURL(event.target.files[0]);
    // reader.readAsArrayBuffer(event.target.files[0]);
    // reader.readAsBinaryString(event.target.files[0]);
    // reader.readAsText(event.target.files[0]);

    // URL.createObjectURL
    // const image = document.querySelector("#previewContainer");
    // const objectURL = URL.createObjectURL(event.target.files[0]);
    // console.log('objectURL', objectURL);
    // image.src = objectURL;

    // 对图片像素数据进行编辑
    // 以下方法不可行
    const reader = new FileReader();
    reader.onload = function () {
        const output = document.querySelector("#previewContainer");
        // let data = new Uint8ClampedArray(reader.result);
        // console.log('操作前', data);

        // demo：https://github.com/vivaxy/png
        // import * as png from '@vivaxy/png';
        // const metadata = png.decode(imageBuffer);
        // const imageBuffer = png.encode(metadata);
        let imageData = png.decode(reader.result);
        let data = imageData.data;
        console.log('二进制数据解码为像素数据', data);

        // 置灰
        const grayscale = function () {
            for (let i = 0; i < data.length; i += 4) {
                const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                // const avg = (data[i] + data[i + 1] + data[i + 2]) / 6;
                // const avg = (data[i] + data[i + 1] + data[i + 2])*1.1;
                data[i] = avg; // red
                data[i + 1] = avg; // green
                data[i + 2] = avg; // blue
            }
        };
        grayscale();
        console.log('像素数据编码为二进制数据');
        const imageBuffer = png.encode(imageData);
        console.log(imageBuffer);
        // output.src = reader.result;


        output.src = URL.createObjectURL(new Blob([imageBuffer]));
    };
    reader.readAsArrayBuffer(event.target.files[0]);
};
window.loadFile = loadFile;

(function () {
    const reader = new FileReader();
    reader.onload = function () {
        console.log(reader.result);
    };
    let b = new Blob([12]);
    // console.log('arrayBuffer',b.slice(1,2).arrayBuffer());
    // console.log('stream',b.slice(1,2).stream());
    // let apromise = b.arrayBuffer();
    // console.log(apromise);
    // apromise.then(v=>{console.log(v);})

    // reader.readAsDataURL(b);
    // reader.readAsArrayBuffer(b);
    // reader.readAsBinaryString(b);
    // reader.readAsText(b);

    //在ASCII里，1的编码是49，对应的二进制为 00110001，所以base64是MQ==
    // console.log(btoa(1));//MQ==
})();

(() => {
    const image = document.querySelector("#previewContainer");
    fetch("https://avatars3.githubusercontent.com/u/4220799")
        .then((response) => {
            // console.log('arrayBuffer',response.arrayBuffer());
            return response.blob();
        })
        .then((blob) => {
            // const objectURL = URL.createObjectURL(blob);
            // console.log('objectURL', objectURL);
            // image.src = objectURL;

            // const reader = new FileReader();
            // reader.onload = function () {
            //     const output = document.querySelector("#previewContainer");
            //     // console.log(reader.result);//base64
            //     output.src = reader.result;
            // };
            // reader.readAsDataURL(blob);
        });
})();

//ArrayBuffer
(() => {
    // let buffer = new ArrayBuffer(8)
    // console.log(buffer);

    // let view = new Int32Array(buffer);
    // console.log(view);
    // view[1] = 1; //通过TypedArray来修改ArrayBuffer
    // console.log(view);

    // new Blob([11111111]).arrayBuffer().then(buffer => {
    //     console.log(buffer);
    //     let view = new Int32Array(buffer);
    //     console.log(view);
    // });



    // let view = new Int8Array([49,49,49]); //49是1的ascii的编码
    // console.log(view);

    // const reader = new FileReader();
    // reader.onload = function () {
    //     console.log(reader.result);
    // };
    //  reader.readAsDataURL(new Blob([view.buffer]));
    // reader.readAsArrayBuffer(new Blob([view.buffer]));
    // reader.readAsBinaryString(new Blob([view.buffer]));
    // reader.readAsText(new Blob([view.buffer]));//111
    // console.log(view.buffer);

})();

//DataView
(() => {
    let buffer = new ArrayBuffer(2)
    let view = new DataView(buffer, 1);
    view.setUint8(0, 255);
    // console.log(new Uint8Array(view.buffer));
})();