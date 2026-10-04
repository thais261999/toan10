/* ============================================================
   sinh.js — BỘ SINH ĐỀ
   Mỗi mẫu là một hàm. Mỗi lần gọi, máy bốc số ngẫu nhiên rồi
   tự tính đáp án, nên không bao giờ sai và không bao giờ lặp.
   Muốn thêm mẫu, chép một hàm rồi sửa theo ý.
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Tiện ích ---------- */
  function ri(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
  function chon(a) { return a[Math.floor(Math.random() * a.length)]; }
  function day(a, b) { var r = []; for (var i = a; i <= b; i++) r.push(i); return r; }
  function tap(a) { return '\\{' + a.join(';\\,') + '\\}'; }
  function xaoM(a) {
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  /* Ghép đáp án đúng với các phương án nhiễu, loại trùng, luôn đủ 4 */
  function bon(dung, nhieu) {
    var r = [dung];
    nhieu.forEach(function (x) {
      x = String(x);
      if (r.length < 4 && r.indexOf(x) === -1) r.push(x);
    });

    // Thiếu phương án thì tự nghĩ thêm bằng cách đổi con số trong đáp án đúng
    var so = String(dung).match(/-?\d+(?:[.,]\d+)?/);
    var k = 1;
    while (r.length < 4 && so && k <= 24) {
      var goc = parseFloat(so[0].replace(',', '.'));
      var buoc = Math.abs(goc) >= 20 ? 5 : (Math.abs(goc) >= 5 ? 2 : 1);
      var moiSo = goc + (k % 2 ? 1 : -1) * Math.ceil(k / 2) * buoc;
      if (moiSo !== goc) {
        var t = String(dung).replace(so[0], String(moiSo));
        if (r.indexOf(t) === -1) r.push(t);
      }
      k++;
    }
    while (r.length < 4) r.push('Không xác định được' + (r.length > 3 ? ' ' : ''));
    return r;
  }
  /* Tung đồng xu chọn cách diễn đạt: khi thì ký hiệu, khi thì lời văn */
  function kyHieu() { return Math.random() < 0.5; }

  function soTapCon(n) { return Math.pow(2, n); }
  function toHop(n, k) {
    var r = 1;
    for (var i = 1; i <= k; i++) r = r * (n - k + i) / i;
    return Math.round(r);
  }
  function uoc(n) { var r = []; for (var i = 1; i <= n; i++) if (n % i === 0) r.push(i); return r; }

  /* ============================================================
     CHƯƠNG I — MỆNH ĐỀ VÀ TẬP HỢP
     ============================================================ */
  var C1_TN = [

    // 1. Phủ định mệnh đề có "với mọi"
    function () {
      var a = ri(1, 9);
      if (kyHieu()) {
        return { muc: 1, dang: 'phudinh',
          de: 'Cho mệnh đề $P: \\forall x \\in \\mathbb{R},\\ x^2 + ' + a + ' \\gt 0$. ' +
              'Mệnh đề phủ định $\\overline{P}$ là',
          dapan: bon(
            '$\\exists x \\in \\mathbb{R},\\ x^2 + ' + a + ' \\le 0$',
            ['$\\forall x \\in \\mathbb{R},\\ x^2 + ' + a + ' \\le 0$',
             '$\\exists x \\in \\mathbb{R},\\ x^2 + ' + a + ' \\gt 0$',
             '$\\forall x \\in \\mathbb{R},\\ x^2 + ' + a + ' \\lt 0$']),
          dung: 0,
          giai: 'Đổi $\\forall$ thành $\\exists$, đồng thời đổi $\\gt$ thành $\\le$.' };
      }
      return { muc: 1, dang: 'phudinh',
        de: 'Cho mệnh đề $P$: “Với mọi số thực $x$, ta có $x^2 + ' + a + ' \\gt 0$”. ' +
            'Mệnh đề phủ định $\\overline{P}$ là',
        dapan: bon(
          'Tồn tại số thực $x$ sao cho $x^2 + ' + a + ' \\le 0$',
          ['Với mọi số thực $x$, ta có $x^2 + ' + a + ' \\le 0$',
           'Tồn tại số thực $x$ sao cho $x^2 + ' + a + ' \\gt 0$',
           'Với mọi số thực $x$, ta có $x^2 + ' + a + ' \\lt 0$']),
        dung: 0,
        giai: 'Phủ định của “với mọi” là “tồn tại”, đồng thời đổi $\\gt$ thành $\\le$.' };
    },

    // 2. Phủ định mệnh đề có "tồn tại"
    function () {
      var a = ri(2, 9);
      if (kyHieu()) {
        return { muc: 1, dang: 'phudinh',
          de: 'Cho mệnh đề $P: \\exists n \\in \\mathbb{N},\\ n^2 = ' + a + '$. ' +
              'Mệnh đề phủ định $\\overline{P}$ là',
          dapan: bon(
            '$\\forall n \\in \\mathbb{N},\\ n^2 \\ne ' + a + '$',
            ['$\\exists n \\in \\mathbb{N},\\ n^2 \\ne ' + a + '$',
             '$\\forall n \\in \\mathbb{N},\\ n^2 = ' + a + '$',
             '$\\exists n \\in \\mathbb{N},\\ n^2 \\gt ' + a + '$']),
          dung: 0,
          giai: 'Đổi $\\exists$ thành $\\forall$, đồng thời đổi dấu bằng thành dấu khác.' };
      }
      return { muc: 1, dang: 'phudinh',
        de: 'Cho mệnh đề $P$: “Tồn tại số tự nhiên $n$ sao cho $n^2 = ' + a + '$”. ' +
            'Mệnh đề phủ định $\\overline{P}$ là',
        dapan: bon(
          'Với mọi số tự nhiên $n$, ta có $n^2 \\ne ' + a + '$',
          ['Tồn tại số tự nhiên $n$ sao cho $n^2 \\ne ' + a + '$',
           'Với mọi số tự nhiên $n$, ta có $n^2 = ' + a + '$',
           'Tồn tại số tự nhiên $n$ sao cho $n^2 \\gt ' + a + '$']),
        dung: 0,
        giai: 'Phủ định của “tồn tại” là “với mọi”, đồng thời đổi dấu bằng thành dấu khác.' };
    },

    // Mệnh đề chứa biến, thay giá trị cụ thể
    function () {
      var p = ri(1, 6), q = ri(p + 1, p + 6), x = chon([p, q]);
      return { muc: 1, dang: 'chuabien',
        de: 'Với $x = ' + x + '$, mệnh đề chứa biến “$x^2 - ' + (p + q) + 'x + ' + (p * q) +
            ' = 0$” trở thành',
        dapan: bon('mệnh đề đúng', ['mệnh đề sai', 'không phải mệnh đề', 'vẫn là mệnh đề chứa biến']),
        dung: 0,
        giai: 'Thay $x = ' + x + '$ vào được $0 = 0$, đẳng thức đúng.' };
    },
    // Nhận biết: câu nào là mệnh đề, câu nào không phải mệnh đề
    function () {
      var md = ['$7$ là số nguyên tố', '$12$ chia hết cho $4$',
                'Hà Nội là thủ đô của Việt Nam', '$5 + 3 = 8$',
                'Số $10$ là số chẵn', 'Tam giác đều có ba cạnh bằng nhau',
                'Một tuần có bảy ngày', '$2 \\lt 1$'];
      var kh = ['Bạn tên là gì?', 'Hôm nay trời đẹp quá!', 'Hãy làm bài tập đi!',
                'Mấy giờ rồi?', 'Ôi, bức tranh đẹp quá!', 'Đi học thôi!',
                'Bạn có khoẻ không?', 'Chúc bạn một ngày vui!'];
      var laMD = kyHieu();
      return { muc: 1, dang: 'nhandang',
        de: laMD ? 'Câu nào sau đây là mệnh đề?'
                 : 'Câu nào sau đây <strong>không</strong> phải là mệnh đề?',
        dapan: bon(chon(laMD ? md : kh), xaoM((laMD ? kh : md).slice()).slice(0, 3)),
        dung: 0,
        giai: 'Mệnh đề là câu khẳng định, hoặc đúng hoặc sai. Câu hỏi, câu cảm thán, câu cầu khiến đều không phải mệnh đề.' };
    },

    // Nhận biết mệnh đề chứa biến
    function () {
      var cb  = ['$x + 1 \\gt 3$', '$x^2 = 4$', '$2x - 5 = 1$', '$y + 7 \\le 10$',
                 '$n$ chia hết cho $3$', '$x \\lt 0$', '$3x = 12$'];
      var kcb = ['$2 + 3 = 5$', 'Hà Nội là thủ đô của Việt Nam', '$9$ chia hết cho $3$',
                 'Hãy học bài!', 'Số $4$ là số chẵn', 'Bạn tên là gì?'];
      return { muc: 1, dang: 'chuabien',
        de: 'Câu nào sau đây là mệnh đề chứa biến?',
        dapan: bon(chon(cb), xaoM(kcb.slice()).slice(0, 3)),
        dung: 0,
        giai: 'Mệnh đề chứa biến còn chữ chưa biết, phải thay giá trị cụ thể vào mới biết đúng hay sai.' };
    },

    // Mệnh đề nào đúng
    function () {
      var b = chon([2, 3, 4, 5]), a = b * ri(2, 8), sai = [];
      while (sai.length < 3) {
        var x = ri(5, 60);
        if (x % b !== 0 && sai.indexOf(x) === -1) sai.push(x);
      }
      return { muc: 1, dang: 'dung',
        de: 'Mệnh đề nào sau đây đúng?',
        dapan: bon('$' + a + '$ chia hết cho $' + b + '$',
                   sai.map(function (v) { return '$' + v + '$ chia hết cho $' + b + '$'; })),
        dung: 0,
        giai: '$' + a + ' = ' + b + ' \\times ' + (a / b) + '$ nên $' + a +
              '$ chia hết cho $' + b + '$, ba số còn lại thì không.' };
    },

    // Mệnh đề nào sai
    function () {
      var p = ri(2, 9), q = ri(p + 1, 15);
      return { muc: 1, dang: 'sai',
        de: 'Mệnh đề nào sau đây <strong>sai</strong>?',
        dapan: bon('$' + q + ' \\lt ' + p + '$',
                   ['$' + p + ' \\lt ' + q + '$',
                    '$' + q + ' \\gt ' + p + '$',
                    '$' + p + ' + ' + q + ' = ' + (p + q) + '$']),
        dung: 0,
        giai: 'Vì $' + p + ' \\lt ' + q + '$ nên “$' + q + ' \\lt ' + p + '$” là mệnh đề sai.' };
    },

    // Phát biểu mệnh đề đảo
    function () {
      var c = chon([
        { P: '$n$ chia hết cho $6$',  Q: '$n$ chia hết cho $3$',
          kP: '$n$ không chia hết cho $6$',  kQ: '$n$ không chia hết cho $3$' },
        { P: '$n$ chia hết cho $10$', Q: '$n$ chia hết cho $5$',
          kP: '$n$ không chia hết cho $10$', kQ: '$n$ không chia hết cho $5$' },
        { P: 'tứ giác $ABCD$ là hình vuông', Q: 'tứ giác $ABCD$ là hình chữ nhật',
          kP: 'tứ giác $ABCD$ không là hình vuông', kQ: 'tứ giác $ABCD$ không là hình chữ nhật' },
        { P: 'tam giác $ABC$ là tam giác đều', Q: 'tam giác $ABC$ là tam giác cân',
          kP: 'tam giác $ABC$ không là tam giác đều', kQ: 'tam giác $ABC$ không là tam giác cân' }
      ]);
      return { muc: 2, dang: 'dao',
        de: 'Mệnh đề đảo của mệnh đề “Nếu ' + c.P + ' thì ' + c.Q + '” là',
        dapan: bon('Nếu ' + c.Q + ' thì ' + c.P,
                   ['Nếu ' + c.kP + ' thì ' + c.kQ,
                    'Nếu ' + c.P + ' thì ' + c.kQ,
                    'Nếu ' + c.Q + ' thì ' + c.kP]),
        dung: 0,
        giai: 'Mệnh đề đảo là đổi chỗ giả thiết và kết luận cho nhau.' };
    },

    // Phát biểu mệnh đề phủ định, viết bằng lời cho dễ
    function () {
      var k = ri(1, 3), a;
      if (k === 1) {
        a = ri(2, 9);
        return { muc: 1, dang: 'phudinh',
          de: 'Phủ định của mệnh đề “$x \\gt ' + a + '$” là',
          dapan: bon('$x \\le ' + a + '$',
                     ['$x \\lt ' + a + '$', '$x \\ge ' + a + '$', '$x = ' + a + '$']),
          dung: 0,
          giai: 'Phủ định của “lớn hơn” là “nhỏ hơn hoặc bằng”.' };
      }
      if (k === 2) {
        a = ri(2, 9);
        return { muc: 1, dang: 'phudinh',
          de: 'Phủ định của mệnh đề “$x = ' + a + '$” là',
          dapan: bon('$x \\ne ' + a + '$',
                     ['$x \\gt ' + a + '$', '$x \\lt ' + a + '$', '$x \\le ' + a + '$']),
          dung: 0,
          giai: 'Phủ định của “bằng” là “khác”.' };
      }
      a = chon([3, 5, 7]);
      return { muc: 1, dang: 'phudinh',
        de: 'Phủ định của mệnh đề “$n$ chia hết cho $' + a + '$” là',
        dapan: bon('$n$ không chia hết cho $' + a + '$',
                   ['$n$ chia hết cho $' + (a + 1) + '$',
                    '$n$ chia hết cho $' + (a * 2) + '$',
                    '$n$ là bội của $' + a + '$']),
        dung: 0,
        giai: 'Phủ định chỉ cần thêm chữ “không”. “Là bội của $' + a +
              '$” chính là mệnh đề ban đầu chứ không phải phủ định.' };
    }
  ];

  var C1_DS = [
    // Đúng sai Chương I dùng đúng 3 câu viết tay trong data.js
  ];

  var C1_TLN = [
    // Trả lời ngắn Chương I dùng đúng 1 câu viết tay trong data.js
  ];


  /* ============================================================
     CHƯƠNG II — BẤT PHƯƠNG TRÌNH VÀ HỆ BPT BẬC NHẤT HAI ẨN
     ============================================================ */

  /* Sinh 4 điểm sao cho đúng một điểm thoả bất phương trình */
  /* Bốn cặp số khác nhau, đúng một cặp thoả điều kiện kt.
     lo, hi là khoảng lấy toạ độ, mặc định -3 đến 6.
     canDuong là số cặp tối thiểu có cả hai toạ độ không âm. Đặt số này
     để học sinh không đoán được đáp án chỉ bằng cách nhìn dấu âm. */
  function bonDiem(kt, lo, hi, canDuong) {
    if (lo === undefined) lo = -3;
    if (hi === undefined) hi = 6;
    canDuong = canDuong || 0;
    for (var lan = 0; lan < 400; lan++) {
      var d = [], seen = {};
      for (var i = 0; i < 80 && d.length < 4; i++) {
        var p = [ri(lo, hi), ri(lo, hi)], k = p[0] + ',' + p[1];
        if (!seen[k]) { seen[k] = 1; d.push(p); }
      }
      if (d.length < 4) continue;
      if (d.filter(function (p) { return p[0] >= 0 && p[1] >= 0; }).length < canDuong) continue;
      var ok = d.filter(kt);
      if (ok.length === 1) {
        var dung = ok[0];
        var con = d.filter(function (p) { return p !== dung; });
        return [dung].concat(con);
      }
    }
    return null;
  }

  /* Viết vế trái ax + by cho đúng quy ước: bỏ hệ số 1, hệ số âm viết dấu trừ.
     veTrai(1, 2) -> 'x + 2y';  veTrai(3, -1) -> '3x - y' */
  function veTrai(a, b) {
    var s = (a === 1) ? 'x' : (a === -1) ? '-x' : a + 'x';
    if (b === 1) return s + ' + y';
    if (b === -1) return s + ' - y';
    return s + (b < 0 ? ' - ' + (-b) : ' + ' + b) + 'y';
  }
  function diem(p) { return '$(' + p[0] + ';\\,' + p[1] + ')$'; }

  var C2_TN = [
    // 1. Nhận dạng bất phương trình bậc nhất hai ẩn
    function () {
      var a = ri(1, 6), b = chon([1, 2, 3, 4, 5, -1, -2, -3, -4]), c = ri(-8, 12);
      var a2 = ri(2, 6), b2 = ri(2, 6);
      return { muc: 1,
        de: 'Bất phương trình nào sau đây là bất phương trình bậc nhất hai ẩn?',
        dapan: bon('$' + veTrai(a, b) + ' \\le ' + c + '$',
                   ['$x^2 + ' + b2 + 'y \\le ' + c + '$',
                    '$' + a2 + 'xy \\ge ' + c + '$',
                    '$' + a2 + 'x + \\dfrac{' + b2 + '}{y} \\lt ' + c + '$']),
        dung: 0,
        giai: 'Bậc nhất hai ẩn thì mỗi ẩn chỉ có số mũ $1$: không có $x^2$, không nhân $x$ với $y$, không có ẩn dưới mẫu.' };
    },

    // 2. Nhận dạng hệ bất phương trình bậc nhất hai ẩn
    function () {
      var c = ri(2, 14), g = ri(-6, 9), a2 = ri(2, 5), b2 = ri(2, 5);
      var d1 = veTrai(ri(1, 4), chon([1, 2, 3, -1, -2])) + ' \\le ' + c;
      var d2 = veTrai(ri(1, 3), chon([1, 2, -1, -2])) + ' \\ge ' + g;
      function he(t1, t2) { return '$\\begin{cases} ' + t1 + ' \\\\ ' + t2 + ' \\end{cases}$'; }
      return { muc: 1,
        de: 'Hệ nào sau đây là hệ bất phương trình bậc nhất hai ẩn?',
        dapan: bon(he(d1, d2),
                   [he('x^2 + ' + b2 + 'y \\le ' + c, d2),
                    he(d1, a2 + 'xy \\ge ' + g),
                    he('\\dfrac{' + a2 + '}{x} + y \\le ' + c, d2)]),
        dung: 0,
        giai: 'Hệ bậc nhất hai ẩn là hệ mà mọi bất phương trình trong hệ đều bậc nhất hai ẩn.' };
    },

    // 3. Cặp số nào là nghiệm của bất phương trình
    function () {
      var a = chon([1, 2, 3, 4, -1, -2, -3]), b = chon([1, 2, 3, 4, -1, -2, -3]);
      var c = ri(-6, 12);
      var d = bonDiem(function (p) { return a * p[0] + b * p[1] <= c; }, -4, 7, 2);
      if (!d) return C2_TN[5]();
      return { muc: 1,
        de: 'Cặp số nào sau đây là nghiệm của bất phương trình $' +
            veTrai(a, b) + ' \\le ' + c + '$?',
        dapan: d.map(diem), dung: 0,
        giai: 'Thay vào vế trái được $' + (a * d[0][0] + b * d[0][1]) + ' \\le ' + c +
              '$ nên cặp này là nghiệm, ba cặp còn lại đều cho giá trị lớn hơn $' + c + '$.' };
    },

    // 4. Cặp số nào KHÔNG là nghiệm của bất phương trình
    function () {
      var a = chon([1, 2, 3, 4, -1, -2, -3]), b = chon([1, 2, 3, 4, -1, -2, -3]);
      var c = ri(-6, 12);
      var d = bonDiem(function (p) { return a * p[0] + b * p[1] > c; }, -4, 7, 2);
      if (!d) return C2_TN[2]();
      return { muc: 2,
        de: 'Cặp số nào sau đây <strong>không</strong> là nghiệm của bất phương trình $' +
            veTrai(a, b) + ' \\le ' + c + '$?',
        dapan: d.map(diem), dung: 0,
        giai: 'Thay vào vế trái được $' + (a * d[0][0] + b * d[0][1]) + ' \\gt ' + c +
              '$ nên cặp này không thoả, ba cặp còn lại đều thoả.' };
    },

    // 5. Một cặp số cho trước có là nghiệm của bất phương trình không
    function () {
      var a = chon([1, 2, 3, 4, -1, -2, -3]), b = chon([1, 2, 3, 4, -1, -2, -3]);
      var x = ri(-4, 6), y = ri(-4, 6);
      var vt = a * x + b * y, c = vt + chon([-6, -4, -3, -2, -1, 1, 2, 3, 4, 6]);
      var la = vt <= c;
      return { muc: 1,
        de: 'Cặp số $(' + x + ';\\,' + y + ')$ có phải là nghiệm của bất phương trình $' +
            veTrai(a, b) + ' \\le ' + c + '$ không?',
        dapan: bon(la ? 'Có, vì $' + vt + ' \\le ' + c + '$' : 'Không, vì $' + vt + ' \\gt ' + c + '$',
                   [la ? 'Không, vì $' + vt + ' \\gt ' + c + '$' : 'Có, vì $' + vt + ' \\le ' + c + '$',
                    'Không xác định được',
                    'Cặp số này nằm trên đường bờ']),
        dung: 0,
        giai: 'Thay $x = ' + x + '$ và $y = ' + y + '$ vào vế trái được $' + vt + '$, so với $' + c +
              '$ thì ' + (la ? 'nhỏ hơn nên là nghiệm.' : 'lớn hơn nên không là nghiệm.') };
    },

    // 6. Gốc toạ độ có thuộc miền nghiệm không
    function () {
      var a = chon([1, 2, 3, 4, 5, -1, -2, -3]), b = chon([1, 2, 3, 4, 5, -1, -2, -3]);
      var c = chon([-9, -7, -5, -4, -3, -2, -1, 2, 3, 5, 6, 8, 10, 12]);
      var la = 0 <= c;
      return { muc: 1,
        de: 'Điểm $O(0;0)$ có thuộc miền nghiệm của bất phương trình $' +
            veTrai(a, b) + ' \\le ' + c + '$ không?',
        dapan: bon(la ? 'Có, vì $0 \\le ' + c + '$' : 'Không, vì $0 \\gt ' + c + '$',
                   [la ? 'Không, vì $0 \\gt ' + c + '$' : 'Có, vì $0 \\le ' + c + '$',
                    'Không xác định được',
                    'Gốc toạ độ nằm trên đường bờ']),
        dung: 0,
        giai: 'Thay $x = 0$, $y = 0$ vào vế trái được $0$, mà $0 ' +
              (la ? '\\le ' : '\\gt ') + c + '$.' };
    },

    // 7. Cặp số nào là nghiệm của hệ
    function () {
      var a = chon([1, 2, 3]), b = chon([1, 2, 3]), c = ri(6, 16);
      var d = bonDiem(function (p) {
        return p[0] >= 0 && p[1] >= 0 && a * p[0] + b * p[1] <= c;
      }, -3, 8, 2);
      if (!d) return C2_TN[0]();
      return { muc: 2,
        de: 'Cặp số nào sau đây là nghiệm của hệ $\\begin{cases} x \\ge 0 \\\\ y \\ge 0 \\\\ ' +
            veTrai(a, b) + ' \\le ' + c + ' \\end{cases}$?',
        dapan: d.map(diem), dung: 0,
        giai: 'Chỉ cặp $(' + d[0][0] + ';\\,' + d[0][1] +
              ')$ thoả cả ba điều kiện, ba cặp còn lại vi phạm ít nhất một điều kiện.' };
    },

    // 8. Cặp số nào KHÔNG là nghiệm của hệ (cả bốn cặp đều không âm)
    function () {
      var a = chon([1, 2, 3]), b = chon([1, 2, 3]), c = ri(6, 18);
      var d = bonDiem(function (p) { return a * p[0] + b * p[1] > c; }, 0, 9, 4);
      if (!d) return C2_TN[6]();
      return { muc: 2,
        de: 'Cặp số nào sau đây <strong>không</strong> là nghiệm của hệ $\\begin{cases} x \\ge 0 \\\\ y \\ge 0 \\\\ ' +
            veTrai(a, b) + ' \\le ' + c + ' \\end{cases}$?',
        dapan: d.map(diem), dung: 0,
        giai: 'Bốn cặp đều không âm, nhưng cặp này cho $' + (a * d[0][0] + b * d[0][1]) +
              ' \\gt ' + c + '$ nên vi phạm bất phương trình thứ ba.' };
    },

    // 9. Một cặp số cho trước có là nghiệm của hệ không
    function () {
      var a = chon([1, 2, 3]), b = chon([1, 2, 3]), c = ri(6, 16);
      var x = ri(-3, 8), y = ri(-3, 8);
      var vt = a * x + b * y;
      var la = (x >= 0 && y >= 0 && vt <= c);
      var vi = (x < 0) ? 'vì $x = ' + x + ' \\lt 0$'
             : (y < 0) ? 'vì $y = ' + y + ' \\lt 0$'
             : 'vì $' + vt + ' \\gt ' + c + '$';
      return { muc: 2,
        de: 'Cặp số $(' + x + ';\\,' + y + ')$ có phải là nghiệm của hệ $\\begin{cases} x \\ge 0 \\\\ y \\ge 0 \\\\ ' +
            veTrai(a, b) + ' \\le ' + c + ' \\end{cases}$ không?',
        dapan: bon(la ? 'Có, vì cả ba điều kiện đều thoả mãn' : 'Không, ' + vi,
                   la ? ['Không, vì $' + vt + ' \\gt ' + c + '$',
                         'Không, vì $x \\lt 0$',
                         'Không xác định được']
                      : ['Có, vì cả ba điều kiện đều thoả mãn',
                         'Không xác định được',
                         'Còn tuỳ giá trị của $x$ và $y$']),
        dung: 0,
        giai: la ? 'Thay vào thấy $x \\ge 0$, $y \\ge 0$ và $' + vt + ' \\le ' + c + '$ nên là nghiệm.'
                 : 'Cặp số này không là nghiệm, ' + vi + '.' };
    }
  ];

  var C2_DS = [
    function () {
      var a = ri(1, 3), b = ri(1, 3), c = ri(5, 12);
      var p1 = [0, 0], p2 = [ri(4, 8), ri(4, 8)];
      return { muc: 2,
        de: 'Cho bất phương trình $' + a + 'x + ' + b + 'y \\le ' + c + '$.',
        y: ['Đây là bất phương trình bậc nhất hai ẩn',
            'Gốc toạ độ $O(0;0)$ thuộc miền nghiệm',
            'Miền nghiệm là một nửa mặt phẳng',
            'Điểm ' + diem(p2).replace(/\$/g, '') + ' thuộc miền nghiệm'],
        dung: [true, true, true, a * p2[0] + b * p2[1] <= c],
        giai: 'Thay điểm cuối vào vế trái được $' + (a * p2[0] + b * p2[1]) +
              '$, so với $' + c + '$ là biết ngay.' };
    },
    function () {
      var a = ri(1, 4), b = ri(1, 4), c = ri(1, 8);
      return { muc: 2,
        de: 'Cho bất phương trình $' + a + 'x + ' + b + 'y + ' + c + ' \\lt 0$.',
        y: ['Bờ của miền nghiệm là đường thẳng $' + a + 'x + ' + b + 'y + ' + c + ' = 0$',
            'Đường bờ không thuộc miền nghiệm vì dấu là $\\lt$',
            'Gốc toạ độ không thuộc miền nghiệm',
            'Miền nghiệm là toàn bộ mặt phẳng'],
        dung: [true, true, true, false],
        giai: 'Miền nghiệm chỉ là một nửa mặt phẳng, không bao giờ là cả mặt phẳng.' };
    }];

  var C2_TLN = [
    // Trả lời ngắn Chương II dùng đúng 1 câu viết tay trong data.js
  ];

  /* ============================================================
     CHƯƠNG III — HỆ THỨC LƯỢNG TRONG TAM GIÁC
     ============================================================ */
  var BO60  = [[3,8,7],[5,8,7],[7,15,13],[8,15,13],[5,21,19],[16,21,19]];   // góc 60°
  var BO120 = [[3,5,7],[7,8,13],[5,16,19],[11,24,31]];                       // góc 120°
  var HERON = [[3,4,5,6],[5,12,13,30],[6,8,10,24],[9,12,15,54],[13,14,15,84],
               [10,13,13,60],[5,5,6,12],[5,5,8,12],[13,13,10,60],[7,15,20,42]];

  var C3_TN = [

    // 1. Định lí côsin, tìm cạnh
    function () {
      var g = chon([60, 120]);
      var t = chon(g === 60 ? BO60 : BO120);
      var b = t[0], c = t[1], a = t[2];
      return { muc: 2,
        de: 'Tam giác $ABC$ có $b = ' + b + '$, $c = ' + c + '$ và $\\widehat{A} = ' + g +
            '^\\circ$. Cạnh $a$ bằng',
        dapan: bon(String(a), [String(a + 1), String(a - 1), String(b + c)]),
        dung: 0,
        giai: '$a^2 = ' + b + '^2 + ' + c + '^2 ' + (g === 60 ? '-' : '+') + ' ' + b + '\\cdot' + c +
              ' = ' + (a * a) + '$ nên $a = ' + a + '$.' };
    },

    // 2. Định lí sin, tìm bán kính ngoại tiếp
    function () {
      var a = ri(3, 12);
      return { muc: 2,
        de: 'Tam giác $ABC$ có $a = ' + a + '$ và $\\widehat{A} = 30^\\circ$. Bán kính đường tròn ngoại tiếp $R$ bằng',
        dapan: bon(String(a), [String(2 * a), String(a + 3), String(a + 6)]),
        dung: 0,
        giai: '$\\dfrac{a}{\\sin A} = 2R$ nên $2R = \\dfrac{' + a + '}{0{,}5} = ' + (2 * a) +
              '$, suy ra $R = ' + a + '$.' };
    },

    // 3. Diện tích theo hai cạnh và góc xen giữa
    function () {
      var b = 2 * ri(2, 6), c = 2 * ri(2, 6);
      var g = chon([30, 150]);
      var S = b * c / 4;
      return { muc: 2,
        de: 'Tam giác có hai cạnh bằng $' + b + '$ và $' + c + '$, góc xen giữa bằng $' + g +
            '^\\circ$. Diện tích tam giác bằng',
        dapan: bon(String(S), [String(2 * S), String(S / 2), String(b * c)]),
        dung: 0,
        giai: '$S = \\dfrac{1}{2}\\cdot' + b + '\\cdot' + c + '\\cdot\\sin ' + g + '^\\circ = ' + S + '$.' };
    },

    // 4. Công thức Heron
    function () {
      var t = chon(HERON), a = t[0], b = t[1], c = t[2], S = t[3];
      return { muc: 2,
        de: 'Tam giác có ba cạnh $' + a + '$, $' + b + '$, $' + c + '$. Diện tích tam giác bằng',
        dapan: bon(String(S), [String(S + 6), String(S - 6), String((a + b + c) / 2)]),
        dung: 0,
        giai: 'Nửa chu vi $p = ' + ((a + b + c) / 2) + '$, theo Heron $S = ' + S + '$.' };
    },

    // 5. Giá trị lượng giác của góc bù
    function () {
      var g = chon([30, 45, 60]);
      var bu = 180 - g;
      var ten = { 30: '\\dfrac{\\sqrt{3}}{2}', 45: '\\dfrac{\\sqrt{2}}{2}', 60: '\\dfrac{1}{2}' };
      return { muc: 1,
        de: 'Giá trị của $\\cos ' + bu + '^\\circ$ bằng',
        dapan: bon('$-' + ten[g] + '$',
                   ['$' + ten[g] + '$', '$-\\dfrac{1}{2}$', '$0$']),
        dung: 0,
        giai: '$\\cos ' + bu + '^\\circ = \\cos(180^\\circ - ' + g + '^\\circ) = -\\cos ' + g +
              '^\\circ = -' + ten[g] + '$.' };
    },

    // 6. Tìm góc từ ba cạnh

    // 7. Bán kính đường tròn nội tiếp
    function () {
      var t = chon(HERON), a = t[0], b = t[1], c = t[2], S = t[3];
      var p = (a + b + c) / 2, r = S / p;
      return { muc: 3,
        de: 'Tam giác có ba cạnh $' + a + '$, $' + b + '$, $' + c +
            '$ và diện tích $' + S + '$. Bán kính đường tròn nội tiếp bằng',
        dapan: bon(String(r), [String(r + 1), String(p), String(S / 2)]),
        dung: 0,
        giai: '$r = \\dfrac{S}{p} = \\dfrac{' + S + '}{' + p + '} = ' + r + '$.' };
    },

    // 8. Định lí sin dạng tỉ số
    function () {
      return { muc: 1,
        de: 'Trong tam giác $ABC$, tỉ số $\\dfrac{a}{\\sin A}$ bằng',
        dapan: bon('$2R$', ['$R$', '$\\dfrac{R}{2}$', '$4R$']),
        dung: 0,
        giai: 'Đây chính là nội dung định lí sin.' };
    },

    // 9. Nhận biết góc tù
    function () {
      var g = chon([100, 110, 120, 135, 150]);
      return { muc: 1,
        de: 'Nếu $\\cos A \\lt 0$ thì góc $A$ của tam giác là',
        dapan: bon('góc tù', ['góc nhọn', 'góc vuông', 'không xác định được']),
        dung: 0,
        giai: 'Với $0^\\circ \\lt A \\lt 180^\\circ$, côsin âm khi $A \\gt 90^\\circ$, ví dụ $A = ' +
              g + '^\\circ$.' };
    },


    // Côsin của góc trong tam giác
    function () {
      var g = chon([60, 120]);
      var t = chon(g === 60 ? BO60 : BO120);
      return { muc: 2,
        de: 'Tam giác $ABC$ có $a = ' + t[2] + '$, $b = ' + t[0] + '$, $c = ' + t[1] +
            '$. Giá trị của $\\cos A$ bằng',
        dapan: bon(g === 60 ? '$\\dfrac{1}{2}$' : '$-\\dfrac{1}{2}$',
                   [g === 60 ? '$-\\dfrac{1}{2}$' : '$\\dfrac{1}{2}$',
                    '$\\dfrac{\\sqrt{3}}{2}$', '$0$']),
        dung: 0,
        giai: '$\\cos A = \\dfrac{b^2+c^2-a^2}{2bc}$, thay số được kết quả trên.' };
    },

    // Diện tích khi biết cạnh đáy và đường cao
    function () {
      var a = 2 * ri(2, 9), h = ri(3, 12);
      return { muc: 1,
        de: 'Tam giác có cạnh đáy bằng $' + a + '$ và đường cao tương ứng bằng $' + h +
            '$. Diện tích tam giác bằng',
        dapan: bon(String(a * h / 2), [String(a * h), String(a + h), String(a * h / 4)]),
        dung: 0,
        giai: '$S = \\dfrac{1}{2} \\cdot ' + a + ' \\cdot ' + h + ' = ' + (a * h / 2) + '$.' };
    },

    // Sin của góc bù
    function () {
      var g = chon([30, 45, 60]), bu = 180 - g;
      var ten = { 30: '\\dfrac{1}{2}', 45: '\\dfrac{\\sqrt{2}}{2}', 60: '\\dfrac{\\sqrt{3}}{2}' };
      return { muc: 1,
        de: 'Giá trị của $\\sin ' + bu + '^\\circ$ bằng',
        dapan: bon('$' + ten[g] + '$', ['$-' + ten[g] + '$', '$0$', '$1$']),
        dung: 0,
        giai: 'Hai góc bù nhau có sin bằng nhau nên $\\sin ' + bu + '^\\circ = \\sin ' + g +
              '^\\circ = ' + ten[g] + '$.' };
    },

    // Chu vi tam giác
    function () {
      var t = chon(HERON);
      return { muc: 1,
        de: 'Tam giác có ba cạnh $' + t[0] + '$, $' + t[1] + '$, $' + t[2] + '$. Chu vi bằng',
        dapan: bon(String(t[0] + t[1] + t[2]),
                   [String((t[0] + t[1] + t[2]) / 2), String(t[3]), String(t[0] * t[1])]),
        dung: 0,
        giai: 'Chu vi là tổng ba cạnh, bằng $' + (t[0] + t[1] + t[2]) + '$.' };
    },

    // Giá trị lượng giác góc đặc biệt
    function () {
      var g = chon([0, 90, 180]);
      var cos = { 0: '1', 90: '0', 180: '-1' };
      return { muc: 1,
        de: 'Giá trị của $\\cos ' + g + '^\\circ$ bằng',
        dapan: bon('$' + cos[g] + '$', ['$0$', '$1$', '$-1$'].filter(function (x) {
                     return x !== '$' + cos[g] + '$'; })),
        dung: 0,
        giai: '$\\cos 0^\\circ = 1$, $\\cos 90^\\circ = 0$, $\\cos 180^\\circ = -1$.' };
    },

    // Công thức diện tích
    function () {
      return { muc: 1,
        de: 'Công thức tính diện tích tam giác theo hai cạnh và góc xen giữa là',
        dapan: bon('$S = \\dfrac{1}{2}ab\\sin C$',
                   ['$S = \\dfrac{1}{2}ab\\cos C$', '$S = ab\\sin C$', '$S = \\dfrac{1}{2}(a+b)\\sin C$']),
        dung: 0,
        giai: 'Diện tích bằng nửa tích hai cạnh nhân sin góc xen giữa.' };
    },

    // Nửa chu vi
    function () {
      var t = chon(HERON), p = (t[0] + t[1] + t[2]) / 2;
      return { muc: 1,
        de: 'Tam giác có ba cạnh $' + t[0] + '$, $' + t[1] + '$, $' + t[2] + '$. Nửa chu vi $p$ bằng',
        dapan: bon(String(p), [String(2 * p), String(p + 2), String(p - 2)]),
        dung: 0,
        giai: '$p = \\dfrac{' + t[0] + ' + ' + t[1] + ' + ' + t[2] + '}{2} = ' + p + '$.' };
    },

    // Sin 90 độ
    function () {
      return { muc: 1,
        de: 'Trong tam giác vuông, cạnh đối diện góc vuông được gọi là',
        dapan: bon('cạnh huyền', ['cạnh góc vuông', 'đường cao', 'trung tuyến']),
        dung: 0,
        giai: 'Cạnh đối diện góc vuông là cạnh dài nhất, gọi là cạnh huyền.' };
    }

  ];

  var C3_DS = [
    function () {
      var t = chon(HERON), a = t[0], b = t[1], c = t[2], S = t[3];
      var p = (a + b + c) / 2, r = S / p;
      return { muc: 3,
        de: 'Tam giác $ABC$ có $a = ' + a + '$, $b = ' + b + '$, $c = ' + c + '$.',
        y: ['Nửa chu vi $p = ' + p + '$',
            'Diện tích $S = ' + S + '$',
            'Bán kính đường tròn nội tiếp $r = ' + r + '$',
            'Bán kính đường tròn ngoại tiếp $R = ' + p + '$'],
        dung: [true, true, true, false],
        giai: '$R = \\dfrac{abc}{4S} = \\dfrac{' + (a * b * c) + '}{' + (4 * S) +
              '}$, không bằng nửa chu vi.' };
    },
    function () {
      var g = chon([30, 45, 60]), bu = 180 - g;
      return { muc: 2,
        de: 'Xét các khẳng định về giá trị lượng giác.',
        y: ['$\\sin ' + bu + '^\\circ = \\sin ' + g + '^\\circ$',
            '$\\cos ' + bu + '^\\circ = -\\cos ' + g + '^\\circ$',
            'Trong mọi tam giác, $a^2 = b^2 + c^2 - 2bc\\cos A$',
            '$\\cos ' + bu + '^\\circ = \\cos ' + g + '^\\circ$'],
        dung: [true, true, true, false],
        giai: 'Côsin của hai góc bù nhau đối dấu nhau nên ý d) sai.' };
    },
    function () {
      var g = chon([60, 120]);
      var t = chon(g === 60 ? BO60 : BO120);
      var b = t[0], c = t[1], a = t[2];
      return { muc: 3,
        de: 'Tam giác $ABC$ có $b = ' + b + '$, $c = ' + c + '$, $\\widehat{A} = ' + g + '^\\circ$.',
        y: ['$a^2 = ' + (a * a) + '$',
            '$a = ' + a + '$',
            'Có thể dùng định lí côsin để tính $a$',
            '$a = ' + b + ' + ' + c + '$'],
        dung: [true, true, true, false],
        giai: 'Trong tam giác, một cạnh luôn nhỏ hơn tổng hai cạnh kia.' };
    },
    function () {
      var a = ri(4, 12);
      return { muc: 2,
        de: 'Tam giác $ABC$ có $a = ' + a + '$ và $\\widehat{A} = 30^\\circ$.',
        y: ['$\\sin A = \\dfrac{1}{2}$',
            '$2R = ' + (2 * a) + '$',
            '$R = ' + a + '$',
            '$R = ' + (a / 2) + '$'],
        dung: [true, true, true, false],
        giai: '$\\dfrac{a}{\\sin A} = 2R$ cho $2R = ' + (2 * a) + '$ nên $R = ' + a + '$.' };
    }
  ];

  var C3_TLN = [
    function () {
      var g = chon([60, 120]);
      var t = chon(g === 60 ? BO60 : BO120);
      return { muc: 2,
        de: 'Tam giác $ABC$ có $b = ' + t[0] + '$, $c = ' + t[1] + '$, $\\widehat{A} = ' + g +
            '^\\circ$. Cạnh $a$ bằng bao nhiêu?',
        dapan: String(t[2]),
        giai: '$a^2 = ' + (t[2] * t[2]) + '$ nên $a = ' + t[2] + '$.' };
    },
    function () {
      var b = 2 * ri(2, 7), c = 2 * ri(2, 7);
      return { muc: 2,
        de: 'Tam giác có hai cạnh $' + b + '$ và $' + c +
            '$, góc xen giữa $30^\\circ$. Diện tích bằng bao nhiêu?',
        dapan: String(b * c / 4),
        giai: '$S = \\dfrac{1}{2}\\cdot' + b + '\\cdot' + c + '\\cdot\\dfrac{1}{2} = ' + (b * c / 4) + '$.' };
    },
    function () {
      var t = chon(HERON);
      return { muc: 3,
        de: 'Tam giác có ba cạnh $' + t[0] + '$, $' + t[1] + '$, $' + t[2] + '$. Diện tích bằng bao nhiêu?',
        dapan: String(t[3]),
        giai: 'Nửa chu vi $p = ' + ((t[0] + t[1] + t[2]) / 2) + '$, theo Heron $S = ' + t[3] + '$.' };
    },
    function () {
      var t = chon(HERON), p = (t[0] + t[1] + t[2]) / 2;
      return { muc: 2,
        de: 'Tam giác có ba cạnh $' + t[0] + '$, $' + t[1] + '$, $' + t[2] +
            '$. Nửa chu vi bằng bao nhiêu?',
        dapan: String(p), giai: '$p = \\dfrac{' + t[0] + '+' + t[1] + '+' + t[2] + '}{2} = ' + p + '$.' };
    },
    function () {
      var a = ri(4, 14);
      return { muc: 2,
        de: 'Tam giác $ABC$ có $a = ' + a + '$, $\\widehat{A} = 30^\\circ$. Bán kính đường tròn ngoại tiếp bằng bao nhiêu?',
        dapan: String(a), giai: '$2R = \\dfrac{' + a + '}{0{,}5} = ' + (2 * a) + '$ nên $R = ' + a + '$.' };
    },
    function () {
      var g = chon([60, 120]);
      var t = chon(g === 60 ? BO60 : BO120);
      return { muc: 3,
        de: 'Tam giác $ABC$ có $a = ' + t[2] + '$, $b = ' + t[0] + '$, $c = ' + t[1] +
            '$. Số đo góc $A$ bằng bao nhiêu độ?',
        dapan: String(g),
        giai: '$\\cos A = ' + (g === 60 ? '0{,}5' : '-0{,}5') + '$ nên $\\widehat{A} = ' + g + '^\\circ$.' };
    }
  ];

  /* ============================================================
     Bảng mẫu theo chương và theo dạng
     ============================================================ */
  var MAU = {
    1: { tracnghiem: C1_TN, dungsai: C1_DS, traloingan: C1_TLN },
    2: { tracnghiem: C2_TN, dungsai: C2_DS, traloingan: C2_TLN },
    3: { tracnghiem: C3_TN, dungsai: C3_DS, traloingan: C3_TLN }
  };

  window.SINH = {
    co: function (idChuong, ma) {
      return !!(MAU[idChuong] && MAU[idChuong][ma] && MAU[idChuong][ma].length);
    },
    soMau: function (idChuong, ma) {
      return (MAU[idChuong] && MAU[idChuong][ma] || []).length;
    },
    /* Sinh n câu, cố gắng không lặp lại cùng một mẫu quá sớm */
    ra: function (idChuong, ma, n) {
      var ds = MAU[idChuong] && MAU[idChuong][ma];
      if (!ds || !ds.length) return [];
      var thuTu = [], out = [];
      while (out.length < n) {
        if (!thuTu.length) thuTu = xaoM(ds.slice());
        out.push(thuTu.pop()());
      }
      return out;
    }
  };
})();
