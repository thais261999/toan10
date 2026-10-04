/* ============================================================
   sw.js — BẢN NHÁP, CỐ TÌNH KHÔNG LƯU ĐỆM

   Bản chính thức có sw.js lưu đệm để chạy được cả khi mất mạng.
   Bản nháp thì ngược lại: không lưu gì hết, để mỗi lần mở là thấy
   ngay bản vừa sửa, khỏi phải đóng app hay xoá bộ nhớ đệm.

   Không bắt sự kiện fetch, nên trình duyệt tự đi lấy bản mới.
   Cũng không xoá bộ đệm của bản chính thức, vì hai bản nằm chung
   một tên miền github.io.

   ⚠️ TUYỆT ĐỐI KHÔNG chép tệp này đè lên bản chính thức.
   ============================================================ */
self.addEventListener('install',  function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });
