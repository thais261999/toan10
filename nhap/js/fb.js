/* ============================================================
   fb.js — BẢN NHÁP, KHÔNG NỐI FIREBASE

   Đây là bản giả, cố tình thay cho fb.js thật của bản chính thức.
   Mục đích:
     - Vào thẳng trang học, không phải đăng nhập, không phải chờ duyệt.
     - KHÔNG ghi một chữ nào vào dữ liệu học sinh thật trên máy chủ.
       Xu và tiến độ chỉ lưu trong máy, thử xong xoá đi cũng được.
     - Dán một dải chữ BẢN NHÁP lên đầu trang cho khỏi nhầm với bản thật.

   ⚠️ TUYỆT ĐỐI KHÔNG chép tệp này đè lên bản chính thức.
      Tệp DUA-NHAP-LEN-CHINH.command đã được dặn bỏ qua nó.
   ============================================================ */
(function () {
  'use strict';

  var HO_SO_THU = { ten: 'Bản nháp', lop: 'THỬ', duyet: true, xu: 0 };

  var FB = window.FB = {
    san: false,
    u: { uid: 'nhap', displayName: 'Bản nháp', email: 'nhap@thu-nghiem' },
    du: HO_SO_THU,
    laBanNhap: true,
    EMAIL_GIAO_VIEN: []
  };

  FB.laGiaoVien = function () { return true; };

  FB.batDau = function (goi) {
    danNhan();
    setTimeout(function () {
      goi({ loai: 'ok', u: FB.u, du: HO_SO_THU });
    }, 0);
  };

  /* Những hàm dưới đây cố tình không làm gì, để bản nháp không đụng
     tới máy chủ. main.js vẫn gọi được bình thường, không báo lỗi. */
  FB.luu       = function () {};
  FB.thuongXu  = function () {};
  FB.ra        = function () { return Promise.resolve(); };
  FB.taoHoSo   = function () { return Promise.resolve(HO_SO_THU); };
  FB.vaoGoogle = function () { return Promise.resolve(); };
  FB.dsHocSinh = function () { return Promise.resolve([]); };
  FB.duyet     = function () { return Promise.resolve(); };
  FB.xoaHocSinh= function () { return Promise.resolve(); };

  /* ---------- Dải chữ BẢN NHÁP ---------- */
  function danNhan() {
    function dan() {
      if (document.getElementById('nhanBanNhap')) return;
      var s = document.createElement('style');
      s.textContent =
        '#nhanBanNhap{position:fixed;left:0;right:0;bottom:0;z-index:99999;' +
        'background:#e8590c;color:#fff;font:700 12px/1.6 system-ui,sans-serif;' +
        'text-align:center;letter-spacing:.08em;padding:3px 8px;' +
        'pointer-events:none;text-transform:uppercase}';
      document.head.appendChild(s);
      var d = document.createElement('div');
      d.id = 'nhanBanNhap';
      d.textContent = 'Bản nháp thử nghiệm — không phải bản học sinh đang dùng';
      document.body.appendChild(d);
    }
    if (document.body) dan();
    else document.addEventListener('DOMContentLoaded', dan);
  }
})();
