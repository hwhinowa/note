// 캐싱 스토리지에 저장될 파일 이름
var CACHE_NAME = 'cache-v4';
// 캐싱할 웹 자원(이미지, css 등)의 목록
var filesToCache = [
    './index.html', // index.html에 대한 캐싱. 기본적으로 설정
    './manifest.json',
    './favicon.png',
    './css/app.css',
    './images/gauntlet.jpg',
    './images/hammer.png',
    './images/refresh.svg',
    './images/shield.png'
];

// var CACHE_NAME = 'cache-v3';
// var filesToCache = [
//     '/',
//     '/css/app.css'
// ];

// Service Worker 설치 (웹 자원 캐싱)
// 서비스워커 파일에서는 self로 window에 접근
self.addEventListener('install', function(event){
    console.log('service worker install');
    event.waitUntil(
        // 이 안의 로직이 다 끝나기 전에는 이벤트가 종료되지 않음
        caches.open(CACHE_NAME) // CACHE_NAME 파일을 열고
        .then(function(cache){
            return cache.addAll(filesToCache); // PWA 파일에 전부 집어 넣어라
        })
        .catch(function(error){
            return console.log(error);
        })
    )
});

self.addEventListener('fetch', function(event){
    console.log('service worker fetch');
    event.respondWith(
        caches.match(event.request)
            .then(function(response){
                return response || fetch(event.request);
            })
            .catch(function(error){
                return console.log(error);
            })
    );
});

// activate 활성화. 기존 캐쉬를 비우고 새로운 캐쉬를 추가할 때
self.addEventListener('activate', function (event) {
    var newCacheList = ['cache-v4'];

    console.log('service worker activate');
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheList.map(function (cacheName) {
                    // 캐쉬 리스트 중 새로운 캐시 파일과 동일하지 않은 파일들은 삭제
                    if (newCacheList.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).catch(function (error) {
            return console.log(error);
        })
    );
});