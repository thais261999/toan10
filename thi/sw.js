/* sw.js — BẢN THI. Giúp app chạy được cả khi mất mạng.

   Khác bản chính thức đúng hai chỗ:
     - Tên bộ đệm là 'toan10-thi', không phải 'toan10'.
     - Khi dọn bộ đệm cũ chỉ dọn những tên bắt đầu bằng 'toan10-thi'.
   Hai bản dùng chung tên miền github.io nên nếu không tách như vậy thì
   bản thi sẽ xoá mất bộ đệm ngoại tuyến của bản học sinh đang dùng.

   Cách hoạt động:
   - File của app (html, css, js): luôn thử lấy bản mới trên mạng trước.
     Lấy được thì dùng bản mới và lưu lại. Mất mạng thì dùng bản đã lưu.
     Nhờ vậy thầy cô sửa nội dung rồi tải lên là học sinh thấy ngay lần mở sau,
     KHÔNG phải đổi số phiên bản hay làm gì thêm.
   - Phông chữ và thư viện MathJax: lấy từ bộ nhớ đệm trước cho nhanh,
     vì những thứ đó không bao giờ đổi.
*/
const KHO = 'toan10-thi';

const KHUNG = [
  './', './index.html', './manifest.json',
  './css/style.css', './js/data.js', './js/sinh.js', './js/main.js', './js/fb.js',
  './icon-180.png', './icon-192.png', './icon-512.png'
];

/* Chỉ những nơi này mới được lưu đệm. Phần còn lại, nhất là máy chủ
   Firebase, phải đi thẳng ra mạng, lưu đệm là hỏng đăng nhập ngay. */
const CHO_DEM = [
  'fonts.googleapis.com', 'fonts.gstatic.com',
  'cdnjs.cloudflare.com', 'cdn.jsdelivr.net'
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
        /* Chỉ dọn bộ đệm cũ CỦA CHÍNH BẢN THI. Hai bản nằm chung tên miền
           github.io, lọc không kĩ là xoá mất bộ đệm của bản chính thức. */
        return Promise.all(ks.filter(function (k) {
                               return k !== KHO && k.indexOf('toan10-thi') === 0;
                             })
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

  // Firebase và mọi nơi khác: đi thẳng ra mạng, không đụng tới bộ nhớ đệm
  var duocDem = CHO_DEM.some(function (n) { return e.request.url.indexOf(n) !== -1; });
  if (!duocDem) return;

  // Phông chữ, MathJax, thư viện: ưu tiên bản đã lưu cho nhanh
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
