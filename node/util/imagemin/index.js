const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminWebp = require('imagemin-webp');
 
(async () => {
    const files = await imagemin(['images/*.{jpg,png}'], {
        destination: 'dist',
        plugins: [
            imageminMozjpeg({
                //Compression quality, in range 0 (worst) to 100 (perfect).
                //imageminMozjpeg默认生成的是Progressive JPEG,视觉上好一些，
                //但是解码速度比baseline JPEG慢一些，更吃cpu一些，做移动端时还是要看看实际影响如何
                //progressive 设置为false时关闭
                quality:70
            }),
            imageminPngquant({
                //Min and max are numbers in range 0 (worst) to 1 (perfect), similar to JPEG.
                quality: [0.6, 0.8]
            }),
            imageminWebp({
                quality: 75,
            }),
        ]
    });
 
    console.log(files);
    //=> [{data: <Buffer 89 50 4e …>, path: 'build/images/foo.jpg'}, …]
})();