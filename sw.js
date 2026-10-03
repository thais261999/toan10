/* sw.js — giúp app chạy được cả khi mất mạng.

   Cách hoạt động:
   - File của app (html, css, js): luôn thử lấy bản mới trên mạng trước.
     Lấy được thì dùng bản mới và lưu lại. Mất mạng thì dùng bản đã lưu.
     Nhờ vậy thầy cô sửa nội dung rồi tải lên là học sinh thấy ngay lần mở sau,
     KHÔNG phải đổi số phiên bản hay làm gì thêm.
   - Phông chữ và thư viện MathJax: lấy từ bộ nhớ đệm trước cho nhanh,
     vì những thứ đó không bao giờ đổi.
*/
const KHO = 'toan10';

const KHUNG = [
  './', './index.html', './manifest.json',
  './css/style.css', './js/data.js', './js/main.js',
  './icon-180.png', './icon-192.png', './icon-512.png'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(KHO)
      .then(function (c) { return c.addAll(KHUNG); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (ks) {
        return Promise.all(ks.filter(function (k) { return k !== KHO; })
                             .map(function (k) { return caches.delete(k); }));
      })
      .then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  var cungNha = e.request.url.indexOf(self.location.origin) === 0;

  if (cungNha) {
    // File của app: ưu tiên bản mới trên mạng
    e.respondWith(
      fetch(e.request).then(function (res) {
        if (res && res.ok) {
          var ban = res.clone();
          caches.open(KHO).then(function (c) { c.put(e.request, ban); });
        }
        return res;
      }).catch(function () {
        return caches.match(e.request).then(function (co) {
          return co || caches.match('./index.html');
        });
      })
    );
    return;
  }

  // Phông chữ, MathJax: ưu tiên bản đã lưu
  e.respondWith(
    caches.match(e.request).then(function (co) {
      if (co) return co;
      return fetch(e.request).then(function (res) {
        if (res && (res.ok || res.type === 'opaque')) {
          var ban = res.clone();
          caches.open(KHO).then(function (c) { c.put(e.request, ban); });
        }
        return res;
      });
    })
  );
});
