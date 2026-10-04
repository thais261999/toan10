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

  /* main.js coi hồ sơ trả về đây là "dữ liệu trên máy chủ" và chép đè lên
     bản lưu trong máy. Bản nháp không có máy chủ, nên phải đọc ngược lại
     từ chính bộ nhớ của máy, nếu không thì tải lại trang một cái là
     mất sạch xu với tiến độ đang thử. */
  function doc(khoa, macDinh) {
    try { return JSON.parse(localStorage.getItem(khoa)) || macDinh; }
    catch (e) { return macDinh; }
  }

  function hoSoThu() {
    var vi = doc('toan10-vi', {});
    return {
      ten: 'Bản nháp', lop: 'THỬ', duyet: true,
      tienDo: doc('toan10-tiendo', {}),
      xu:    vi.xu    || 0,
      co:    vi.co    || [],
      mac:   vi.mac   || [],
      phieu: vi.phieu || 0
    };
  }

  var FB = window.FB = {
    san: false,
    u: { uid: 'nhap', displayName: 'Bản nháp', email: 'nhap@thu-nghiem' },
    du: null,
    laBanNhap: true,
    EMAIL_GIAO_VIEN: []
  };

  FB.laGiaoVien = function () { return true; };

  FB.batDau = function (goi) {
    danNhan();
    setTimeout(function () {
      FB.du = hoSoThu();
      goi({ loai: 'ok', u: FB.u, du: FB.du });
    }, 0);
  };

  /* Những hàm dưới đây cố tình không làm gì, để bản nháp không đụng
     tới máy chủ. main.js vẫn gọi được bình thường, không báo lỗi. */
  FB.luu       = function () {};
  FB.thuongXu  = function () {};
  FB.ra        = function () { return Promise.resolve(); };
  FB.taoHoSo   = function () { return Promise.resolve(hoSoThu()); };
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
        'background:#e8590c;color:#fff;font:700 11px/1.5 system-ui,sans-serif;' +
        'text-align:center;letter-spacing:.06em;padding:3px 8px;' +
        'pointer-events:none;text-transform:uppercase}' +
        /* chừa chỗ cho dải chữ, không che mất nút dưới cùng */
        'body{padding-bottom:26px}' +
        '.manhinh{min-height:calc(100dvh - var(--cao-top,76px) - 26px)}';
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
