//serviceWorker.js
var CACHE_NAME = 'my-first-sw';
var urlsToCache = [
    // '/',
    '/index.css',
    '/index.js'
];

//install事件只会在首次安装时执行一次，后续不会触发
self.addEventListener('install', function (event) {
    // 在install阶段里可以预缓存一些资源
    console.log('install');
    event.waitUntil(//https://developer.mozilla.org/zh-CN/docs/Web/API/ExtendableEvent/waitUntil
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// 缓存更新
self.addEventListener('active', function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName)
                    }
                })
            )
        })
    )
})

//在fetch事件里能拦截网络请求，进行一些处理
self.addEventListener('fetch', function (event) {

    console.log('fetch request');
    console.log(event.request);
    event.respondWith(
        caches.match(event.request).then(function (response) {
            // 如果匹配到缓存里的资源，则直接返回
            if (response) {
                return response;
            }

            //
            // return fetch(request).then(function (httpRes) {
            //     //继续请求
            //     return httpRes;
            // });

            //不用
            // 匹配失败则继续请求
            var request = event.request.clone(); // 把原始请求拷过来

            //默认情况下，从不支持 CORS 的第三方网址中获取资源将会失败。
            // 您可以向请求中添加 no-CORS 选项来克服此问题，不过这可能会导致“不透明”的响应，这意味着您无法辨别响应是否成功。
            if (request.mode !== 'navigate' && request.url.indexOf(request.referrer) === -1) {
                request = new Request(request, { mode: 'no-cors' })
            }

            return fetch(request).then(function (httpRes) {
                //拿到了http请求返回的数据，进行一些操作

                //请求失败了则直接返回、对于post请求也直接返回，sw不能缓存post请求
                if (!httpRes || (httpRes.status !== 200 && httpRes.status !== 304 && httpRes.type !== 'opaque') || request.method === 'POST') {
                    return httpRes;
                }

                // 请求成功的话，将请求缓存起来。
                var responseClone = httpRes.clone();
                caches.open(CACHE_NAME).then(function (cache) {
                    cache.put(event.request, responseClone);
                });

                return httpRes;
            });
        })
    );
});





