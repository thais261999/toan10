/* ============================================================
   fb.js — BẢN ĐỘC LẬP, KHÔNG NỐI MÁY CHỦ

   Bản này dành cho bản sao gửi đi thi. Nó thay hẳn cho fb.js của
   bản chính thức, nên trang không có một dòng nào nối tới Firebase.

   Nhờ vậy:
     - Mở link là vào thẳng trang học. Không đăng nhập Google,
       không khai họ tên, không phải chờ thầy cô duyệt.
     - KHÔNG đọc và KHÔNG ghi một chữ nào vào dữ liệu học sinh thật
       của bản chính thức.
     - Xu và tiến độ lưu trong máy người xem, bằng khoá riêng
       'toan10thi-...', không lẫn với khoá 'toan10-...' của bản chính.

   ⚠️ KHÔNG chép tệp này sang bản chính thức ở ~/web-toan-10,
      chép sang là bản chính mất đăng nhập và mất dữ liệu học sinh.
   ============================================================ */
(function () {
  'use strict';

  /* main.js coi hồ sơ trả về đây là "dữ liệu trên máy chủ" rồi chép đè
     lên bản lưu trong máy. Bản này không có máy chủ, nên phải đọc ngược
     lại từ chính bộ nhớ của máy, nếu không thì tải lại trang một cái là
     mất sạch xu với tiến độ vừa làm. */
  function doc(khoa, macDinh) {
    try { return JSON.parse(localStorage.getItem(khoa)) || macDinh; }
    catch (e) { return macDinh; }
  }

  function hoSo() {
    var vi = doc('toan10thi-vi', {});
    return {
      ten: 'Người dùng', lop: '10', duyet: true,
      tienDo: doc('toan10thi-tiendo', {}),
      xu:    vi.xu    || 0,
      co:    vi.co    || [],
      mac:   vi.mac   || [],
      phieu: vi.phieu || 0
    };
  }

  var FB = window.FB = {
    san: false,          // không có thư viện máy chủ nào được nạp
    u: { uid: 'khach', displayName: 'Người dùng', email: '' },
    du: null,
    docLap: true,        // dấu hiệu cho biết đây là bản không nối máy chủ
    EMAIL_GIAO_VIEN: []
  };

  FB.laGiaoVien = function () { return true; };

  /* Vào thẳng, trạng thái 'ok' ngay từ đầu, không qua màn đăng nhập. */
  FB.batDau = function (goi) {
    setTimeout(function () {
      FB.du = hoSo();
      goi({ loai: 'ok', u: FB.u, du: FB.du });
    }, 0);
  };

  /* Những hàm dưới đây cố tình không làm gì, để trang không đụng tới
     bất kì máy chủ nào. main.js và quanly.js vẫn gọi được bình thường,
     không báo lỗi. */
  FB.luu        = function () {};
  FB.thuongXu   = function () {};
  FB.ra         = function () { return Promise.resolve(); };
  FB.taoHoSo    = function () { return Promise.resolve(hoSo()); };
  FB.vaoGoogle  = function () { return Promise.resolve(); };
  FB.dsHocSinh  = function () { return Promise.resolve([]); };
  FB.duyet      = function () { return Promise.resolve(); };
  FB.xoaHocSinh = function () { return Promise.resolve(); };
})();
