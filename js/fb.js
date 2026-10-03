/* ============================================================
   fb.js — kết nối Firebase
   Lo việc: đăng nhập Google, hồ sơ học sinh, chờ duyệt,
   và đồng bộ xu cùng tiến độ lên máy chủ.
   ============================================================ */
(function () {
  'use strict';

  var CAU_HINH = {
    apiKey:            "AIzaSyBgFl4Rd6kOY4oO681eZZRl7JS9afGoniA",
    authDomain:        "toan10-a1366.firebaseapp.com",
    projectId:         "toan10-a1366",
    storageBucket:     "toan10-a1366.firebasestorage.app",
    messagingSenderId: "860172145213",
    appId:             "1:860172145213:web:193d772a6dda9a4918d054"
  };

  /* ⚠️⚠️⚠️  ĐIỀN GMAIL CỦA THẦY CÔ VÀO ĐÂY  ⚠️⚠️⚠️
     Chỉ (các) địa chỉ trong danh sách này mới vào được trang quản lý.
     Nhớ điền y hệt địa chỉ này vào luật bảo mật trên Firebase nữa. */
  var EMAIL_GIAO_VIEN = ['thais261999@gmail.com'];

  var app, auth, kho, hen = null;

  var FB = window.FB = {
    san: false,          // thư viện đã nạp được chưa
    u: null,             // tài khoản Google đang đăng nhập
    du: null,            // hồ sơ học sinh trong kho dữ liệu
    EMAIL_GIAO_VIEN: EMAIL_GIAO_VIEN
  };

  FB.laGiaoVien = function (email) {
    return EMAIL_GIAO_VIEN.indexOf(String(email || '').toLowerCase()) !== -1;
  };

  /* ---------- Khởi động, theo dõi trạng thái đăng nhập ----------
     goi(trangThai) với trangThai.loai là một trong:
       'loi'   thư viện không nạp được
       'chua'  chưa đăng nhập
       'khai'  đã đăng nhập nhưng chưa khai họ tên và lớp
       'cho'   đã khai, đang chờ thầy cô duyệt
       'ok'    đã được duyệt
  */
  FB.batDau = function (goi, anDanh) {
    FB.anDanh = !!anDanh;
    if (typeof firebase === 'undefined') { goi({ loai: 'loi' }); return; }
    try {
      app  = firebase.initializeApp(CAU_HINH);
      auth = firebase.auth();
      kho  = firebase.firestore();
      FB.san = true;
    } catch (e) { goi({ loai: 'loi', e: e }); return; }

    auth.onAuthStateChanged(function (u) {
      FB.u = u;
      if (!u) {
        FB.du = null;
        // Trang học sinh tự tạo tài khoản ẩn danh, các em không phải làm gì
        if (FB.anDanh) {
          auth.signInAnonymously().catch(function (e) { goi({ loai: 'loi', e: e }); });
        } else {
          goi({ loai: 'chua' });
        }
        return;
      }

      kho.collection('hocsinh').doc(u.uid).get().then(function (b) {
        if (!b.exists) { FB.du = null; goi({ loai: 'khai', u: u }); return; }
        FB.du = b.data();
        goi({ loai: FB.du.duyet ? 'ok' : 'cho', u: u, du: FB.du });
      }).catch(function (e) {
        goi({ loai: 'loi', e: e });
      });
    });
  };

  FB.vaoGoogle = function () {
    var p = new firebase.auth.GoogleAuthProvider();
    p.setCustomParameters({ prompt: 'select_account' });
    return auth.signInWithPopup(p);
  };

  FB.ra = function () { return auth.signOut(); };

  /* ---------- Học sinh khai họ tên và lớp, hồ sơ nằm chờ duyệt ---------- */
  FB.taoHoSo = function (ten, lop) {
    var u = FB.u;
    var d = {
      email: (u.email || '').toLowerCase(),
      ten: ten, lop: lop,
      duyet: false,
      xu: 0, phieu: 0, soBai: 0,
      co: [], mac: [],
      tienDo: {},
      tao: firebase.firestore.FieldValue.serverTimestamp()
    };
    return kho.collection('hocsinh').doc(u.uid).set(d).then(function () {
      FB.du = d;
      return d;
    });
  };

  /* ---------- Thưởng 1 xu khi hoàn thành một bài ----------
     Tách riêng vì luật trên máy chủ chỉ cho xu tăng tối đa 1 mỗi lần ghi. */
  FB.thuongXu = function (n) {
    if (!FB.u || !FB.du || !FB.du.duyet) return Promise.resolve();
    n = Math.max(0, Math.min(n || 0, 50));
    FB.du.xu = (FB.du.xu || 0) + n;
    FB.du.soBai = (FB.du.soBai || 0) + 1;
    return kho.collection('hocsinh').doc(FB.u.uid)
             .update({ xu: firebase.firestore.FieldValue.increment(n),
                       soBai: firebase.firestore.FieldValue.increment(1) })
             .catch(function (e) { console.warn('Không ghi được xu:', e); });
  };

  /* ---------- Lưu tiến độ, đồ đã mua và điểm cộng ----------
     Gom lại, chờ 1,2 giây rồi mới ghi một lần cho đỡ tốn lượt. */
  FB.luu = function (tienDo, vi) {
    if (!FB.u || !FB.du || !FB.du.duyet) return;
    clearTimeout(hen);
    hen = setTimeout(function () {
      kho.collection('hocsinh').doc(FB.u.uid).update({
        tienDo: tienDo || {},
        co: (vi && vi.co) || [],
        mac: (vi && vi.mac) || [],
        phieu: (vi && vi.phieu) || 0,
        xu: (vi && typeof vi.xu === 'number') ? vi.xu : (FB.du.xu || 0),
        capnhat: firebase.firestore.FieldValue.serverTimestamp()
      }).catch(function (e) { console.warn('Không lưu được:', e); });
    }, 1200);
  };

  /* ---------- Dành cho trang quản lý ---------- */
  FB.dsHocSinh = function () {
    return kho.collection('hocsinh').get().then(function (q) {
      var ds = [];
      q.forEach(function (b) { var d = b.data(); d._id = b.id; ds.push(d); });
      return ds;
    });
  };
  FB.duyet = function (id, co) {
    return kho.collection('hocsinh').doc(id).update({ duyet: !!co });
  };
  FB.xoaHocSinh = function (id) {
    return kho.collection('hocsinh').doc(id).delete();
  };
})();
