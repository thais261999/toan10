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
     ÔN TẬP GIỮA KÌ I — đề trắc nghiệm 10 câu, cấu trúc cố định
     Mỗi mẫu gắn một nhãn dang, main.js rút đúng một câu cho mỗi
     nhãn theo thứ tự ghi trong deCoDinh ở js/data.js.
     ============================================================ */

  /* Mượn lại mẫu đã có ở chương I, II rồi đóng nhãn cho đúng chỗ */
  function gan(dang, mau) {
    return function () { var q = mau(); q.dang = dang; return q; };
  }

  /* ---------- Bất phương trình: hỏi ngược lại ---------- */

  /* Cặp số cho trước là nghiệm của bất phương trình NÀO */
  function bptNao() {
    var x = ri(-3, 5), y = ri(-3, 5), lan = 0, dung = null, nhieu = [];
    while (nhieu.length < 3 && lan++ < 200) {
      var a = chon([1, 2, 3, -1, -2]), b = chon([1, 2, 3, -1, -2]), c = ri(-8, 12);
      var t = '$' + veTrai(a, b) + ' \\le ' + c + '$';
      var thoa = a * x + b * y <= c;
      if (thoa && !dung) dung = t;
      else if (!thoa && nhieu.indexOf(t) === -1 && t !== dung) nhieu.push(t);
    }
    if (!dung || nhieu.length < 3) return bptNghiem();
    return { muc: 2, dang: 'bpt-nghiem',
      de: 'Cặp số $(' + x + ';\\,' + y + ')$ là nghiệm của bất phương trình nào sau đây?',
      dapan: bon(dung, nhieu), dung: 0,
      giai: 'Thay $x = ' + x + '$, $y = ' + y + '$ vào từng vế trái, chỉ bất phương trình này cho kết quả thoả mãn.' };
  }
  function bptNghiem() { var q = C2_TN[2](); q.dang = 'bpt-nghiem'; return q; }

  /* Cặp số cho trước là nghiệm của HỆ nào */
  function heNao() {
    var x = ri(0, 6), y = ri(0, 6), lan = 0, dung = null, nhieu = [];
    function he(a, b, c) {
      return '$\\begin{cases} x \\ge 0 \\\\ y \\ge 0 \\\\ ' + veTrai(a, b) + ' \\le ' + c + ' \\end{cases}$';
    }
    while (nhieu.length < 3 && lan++ < 200) {
      var a = chon([1, 2, 3]), b = chon([1, 2, 3]), c = ri(3, 16);
      var t = he(a, b, c), thoa = a * x + b * y <= c;
      if (thoa && !dung) dung = t;
      else if (!thoa && nhieu.indexOf(t) === -1 && t !== dung) nhieu.push(t);
    }
    if (!dung || nhieu.length < 3) { var q = C2_TN[6](); q.dang = 'he-nghiem'; return q; }
    return { muc: 2, dang: 'he-nghiem',
      de: 'Cặp số $(' + x + ';\\,' + y + ')$ là nghiệm của hệ bất phương trình nào sau đây?',
      dapan: bon(dung, nhieu), dung: 0,
      giai: 'Cặp số này không âm nên luôn thoả hai điều kiện đầu, chỉ cần xét bất phương trình thứ ba.' };
  }

  /* Bất phương trình / hệ nào KHÔNG phải bậc nhất hai ẩn */
  function khongPhaiBpt() {
    var a = ri(2, 6), b = ri(2, 6), c = ri(-8, 12);
    var sai = chon(['$x^2 + ' + b + 'y \\le ' + c + '$',
                    '$' + a + 'xy \\ge ' + c + '$',
                    '$' + a + 'x + \\dfrac{' + b + '}{y} \\lt ' + c + '$',
                    '$' + a + 'x^2 + ' + b + 'y^2 \\gt ' + c + '$']);
    return { muc: 1, dang: 'bpt-nhandang',
      de: 'Bất phương trình nào sau đây <strong>không</strong> phải là bất phương trình bậc nhất hai ẩn?',
      dapan: bon(sai, ['$' + veTrai(ri(1, 5), chon([1, 2, 3, -1, -2])) + ' \\le ' + c + '$',
                       '$' + veTrai(ri(1, 4), chon([1, 2, -1, -3])) + ' \\gt ' + ri(-6, 9) + '$',
                       '$' + veTrai(ri(2, 6), chon([1, 4, -2])) + ' \\ge ' + ri(-5, 10) + '$']),
      dung: 0,
      giai: 'Bậc nhất hai ẩn thì mỗi ẩn chỉ có số mũ $1$: không có $x^2$, không nhân $x$ với $y$, không có ẩn dưới mẫu.' };
  }

  /* ---------- Lượng giác ---------- */

  /* Bảng giá trị lượng giác của các góc đặc biệt.
     Chỉ liệt kê những ô có giá trị, bỏ các ô không xác định. */
  var BANG_LG = {
    sin: { 0:'0', 30:'\\dfrac{1}{2}', 45:'\\dfrac{1}{\\sqrt{2}}', 60:'\\dfrac{\\sqrt{3}}{2}', 90:'1',
           120:'\\dfrac{\\sqrt{3}}{2}', 135:'\\dfrac{1}{\\sqrt{2}}', 150:'\\dfrac{1}{2}', 180:'0' },
    cos: { 0:'1', 30:'\\dfrac{\\sqrt{3}}{2}', 45:'\\dfrac{1}{\\sqrt{2}}', 60:'\\dfrac{1}{2}', 90:'0',
           120:'-\\dfrac{1}{2}', 135:'-\\dfrac{1}{\\sqrt{2}}', 150:'-\\dfrac{\\sqrt{3}}{2}', 180:'-1' },
    tan: { 0:'0', 30:'\\dfrac{1}{\\sqrt{3}}', 45:'1', 60:'\\sqrt{3}',
           120:'-\\sqrt{3}', 135:'-1', 150:'-\\dfrac{1}{\\sqrt{3}}', 180:'0' },
    cot: { 30:'\\sqrt{3}', 45:'1', 60:'\\dfrac{1}{\\sqrt{3}}', 90:'0',
           120:'-\\dfrac{1}{\\sqrt{3}}', 135:'-1', 150:'-\\sqrt{3}' }
  };
  var GIA_TRI_LG = ['0', '1', '-1', '\\dfrac{1}{2}', '-\\dfrac{1}{2}',
    '\\dfrac{\\sqrt{3}}{2}', '-\\dfrac{\\sqrt{3}}{2}', '\\dfrac{1}{\\sqrt{2}}', '-\\dfrac{1}{\\sqrt{2}}',
    '\\sqrt{3}', '-\\sqrt{3}', '\\dfrac{1}{\\sqrt{3}}', '-\\dfrac{1}{\\sqrt{3}}'];

  function lgBang() {
    var ham = chon(['sin', 'cos', 'tan', 'cot']);
    var gocs = Object.keys(BANG_LG[ham]);
    var goc = chon(gocs);
    var dung = BANG_LG[ham][goc];
    var con = GIA_TRI_LG.filter(function (v) { return v !== dung; });
    return { muc: 1, dang: 'lg-bang',
      de: 'Giá trị của $\\' + ham + ' ' + goc + '^\\circ$ bằng',
      dapan: bon('$' + dung + '$', xaoM(con.slice()).slice(0, 3).map(function (v) { return '$' + v + '$'; })),
      dung: 0,
      giai: 'Tra bảng giá trị lượng giác của các góc đặc biệt: $\\' + ham + ' ' + goc +
            '^\\circ = ' + dung + '$.' };
  }

  /* Hai góc phụ nhau và hai góc bù nhau */
  var CAP_GOC = [
    { de: '\\sin(90^\\circ - \\alpha)',  dung: '\\cos\\alpha',  nhieu: ['\\sin\\alpha', '-\\cos\\alpha', '\\tan\\alpha'] },
    { de: '\\cos(90^\\circ - \\alpha)',  dung: '\\sin\\alpha',  nhieu: ['\\cos\\alpha', '-\\sin\\alpha', '\\cot\\alpha'] },
    { de: '\\tan(90^\\circ - \\alpha)',  dung: '\\cot\\alpha',  nhieu: ['\\tan\\alpha', '-\\tan\\alpha', '\\sin\\alpha'] },
    { de: '\\cot(90^\\circ - \\alpha)',  dung: '\\tan\\alpha',  nhieu: ['\\cot\\alpha', '-\\cot\\alpha', '\\cos\\alpha'] },
    { de: '\\sin(180^\\circ - \\alpha)', dung: '\\sin\\alpha',  nhieu: ['-\\sin\\alpha', '\\cos\\alpha', '-\\cos\\alpha'] },
    { de: '\\cos(180^\\circ - \\alpha)', dung: '-\\cos\\alpha', nhieu: ['\\cos\\alpha', '\\sin\\alpha', '-\\sin\\alpha'] },
    { de: '\\tan(180^\\circ - \\alpha)', dung: '-\\tan\\alpha', nhieu: ['\\tan\\alpha', '\\cot\\alpha', '-\\cot\\alpha'] },
    { de: '\\cot(180^\\circ - \\alpha)', dung: '-\\cot\\alpha', nhieu: ['\\cot\\alpha', '\\tan\\alpha', '-\\tan\\alpha'] }
  ];
  function lgGoc() {
    var c = chon(CAP_GOC);
    var phu = c.de.indexOf('90') !== -1;
    return { muc: 1, dang: 'lg-goc',
      de: 'Với $0^\\circ \\lt \\alpha \\lt 90^\\circ$, ta có $' + c.de + '$ bằng',
      dapan: bon('$' + c.dung + '$', c.nhieu.map(function (v) { return '$' + v + '$'; })),
      dung: 0,
      giai: phu ? 'Hai góc phụ nhau: sin đổi thành côsin, tang đổi thành côtang.'
                : 'Hai góc bù nhau: chỉ có sin giữ nguyên dấu, ba giá trị còn lại đổi dấu.' };
  }

  /* Định lí sin, định lí côsin và các công thức diện tích */
  var CONG_THUC = [
    { de: 'Định lí côsin trong tam giác $ABC$ viết là',
      dung: '$a^2 = b^2 + c^2 - 2bc\\cos A$',
      nhieu: ['$a^2 = b^2 + c^2 + 2bc\\cos A$', '$a^2 = b^2 + c^2 - 2bc\\sin A$',
              '$a^2 = b^2 - c^2 - 2bc\\cos A$'],
      giai: 'Định lí côsin: bình phương một cạnh bằng tổng bình phương hai cạnh kia trừ hai lần tích hai cạnh đó nhân côsin góc xen giữa.' },
    { de: 'Theo định lí sin trong tam giác $ABC$, tỉ số $\\dfrac{a}{\\sin A}$ bằng',
      dung: '$2R$', nhieu: ['$R$', '$\\dfrac{R}{2}$', '$4R$'],
      giai: 'Định lí sin: $\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} = \\dfrac{c}{\\sin C} = 2R$.' },
    { de: 'Công thức nào sau đây tính đúng diện tích tam giác $ABC$?',
      dung: '$S = \\dfrac{1}{2}ab\\sin C$',
      nhieu: ['$S = \\dfrac{1}{2}ab\\cos C$', '$S = ab\\sin C$', '$S = \\dfrac{1}{2}ab\\tan C$'],
      giai: 'Diện tích bằng nửa tích hai cạnh nhân sin góc xen giữa hai cạnh đó.' },
    { de: 'Với $R$ là bán kính đường tròn ngoại tiếp, diện tích tam giác $ABC$ bằng',
      dung: '$S = \\dfrac{abc}{4R}$', nhieu: ['$S = \\dfrac{abc}{2R}$', '$S = \\dfrac{abc}{R}$', '$S = \\dfrac{4R}{abc}$'],
      giai: 'Công thức $S = \\dfrac{abc}{4R}$.' },
    { de: 'Trong công thức $S = pr$ thì $p$ và $r$ lần lượt là',
      dung: 'nửa chu vi và bán kính đường tròn nội tiếp',
      nhieu: ['chu vi và bán kính đường tròn nội tiếp',
              'nửa chu vi và bán kính đường tròn ngoại tiếp',
              'chu vi và bán kính đường tròn ngoại tiếp'],
      giai: '$p$ là nửa chu vi, $r$ là bán kính đường tròn nội tiếp.' },
    { de: 'Công thức Heron tính diện tích tam giác $ABC$ là',
      dung: '$S = \\sqrt{p(p-a)(p-b)(p-c)}$',
      nhieu: ['$S = \\sqrt{p(p+a)(p+b)(p+c)}$', '$S = p(p-a)(p-b)(p-c)$',
              '$S = \\sqrt{(p-a)(p-b)(p-c)}$'],
      giai: 'Công thức Heron dùng nửa chu vi $p$ và ba cạnh.' },
    { de: 'Diện tích tam giác $ABC$ tính theo cạnh $a$ và đường cao $h_a$ là',
      dung: '$S = \\dfrac{1}{2}ah_a$', nhieu: ['$S = ah_a$', '$S = \\dfrac{1}{3}ah_a$', '$S = \\dfrac{1}{2}a + h_a$'],
      giai: 'Diện tích bằng nửa tích cạnh đáy với đường cao tương ứng.' }
  ];
  function lgDinhLy() {
    var c = chon(CONG_THUC);
    return { muc: 1, dang: 'lg-dinhly', de: c.de,
      dapan: bon(c.dung, c.nhieu), dung: 0, giai: c.giai };
  }

  /* Thay số cụ thể vào công thức diện tích. Số liệu chọn sao cho
     kết quả luôn là số nguyên, học sinh tính nhẩm được. */
  var BO_BA = [[3,4,5],[6,8,10],[5,12,13],[9,12,15],[8,15,17],[7,24,25],[12,16,20]];
  function dtTheSo() {
    var k = ri(1, 5), q;
    if (k === 1) {                                   /* S = 1/2 a h */
      var a = 2 * ri(3, 11), h = ri(3, 14);
      q = { de: 'Tam giác $ABC$ có cạnh $a = ' + a + '$ và đường cao $h_a = ' + h +
                '$. Diện tích tam giác bằng',
            dung: a * h / 2,
            giai: '$S = \\dfrac{1}{2}ah_a = \\dfrac{1}{2}\\cdot' + a + '\\cdot' + h + ' = ' + (a * h / 2) + '$.' };
    } else if (k === 2) {                            /* S = 1/2 ab sinC */
      var goc = chon([30, 90, 150]), s = goc === 90 ? 1 : 0.5;
      var b1 = 2 * ri(2, 9), b2 = 2 * ri(2, 9);
      q = { de: 'Tam giác $ABC$ có $b = ' + b1 + '$, $c = ' + b2 + '$ và $\\widehat{A} = ' + goc +
                '^\\circ$. Diện tích tam giác bằng',
            dung: b1 * b2 * s / 2,
            giai: '$S = \\dfrac{1}{2}bc\\sin A = \\dfrac{1}{2}\\cdot' + b1 + '\\cdot' + b2 +
                  '\\cdot' + (goc === 90 ? '1' : '\\dfrac{1}{2}') + ' = ' + (b1 * b2 * s / 2) + '$.' };
    } else if (k === 3) {                            /* Heron */
      var t = chon(BO_BA), p = (t[0] + t[1] + t[2]) / 2;
      var S = Math.round(Math.sqrt(p * (p - t[0]) * (p - t[1]) * (p - t[2])));
      q = { de: 'Tam giác $ABC$ có ba cạnh $a = ' + t[0] + '$, $b = ' + t[1] + '$, $c = ' + t[2] +
                '$. Diện tích tam giác bằng',
            dung: S,
            giai: 'Nửa chu vi $p = ' + p + '$, nên $S = \\sqrt{' + p + '\\cdot' + (p - t[0]) +
                  '\\cdot' + (p - t[1]) + '\\cdot' + (p - t[2]) + '} = ' + S + '$.' };
    } else if (k === 4) {                            /* S = pr */
      var pp = ri(6, 20), rr = ri(2, 7);
      q = { de: 'Tam giác $ABC$ có nửa chu vi $p = ' + pp +
                '$ và bán kính đường tròn nội tiếp $r = ' + rr + '$. Diện tích tam giác bằng',
            dung: pp * rr,
            giai: '$S = pr = ' + pp + '\\cdot' + rr + ' = ' + (pp * rr) + '$.' };
    } else {                                         /* S = abc / 4R, dùng tam giác vuông */
      var u = chon(BO_BA), R = u[2] / 2;
      var S2 = u[0] * u[1] / 2;
      q = { de: 'Tam giác $ABC$ có ba cạnh $a = ' + u[0] + '$, $b = ' + u[1] + '$, $c = ' + u[2] +
                '$ và bán kính đường tròn ngoại tiếp $R = ' + (R % 1 ? R.toString().replace('.', '{,}') : R) +
                '$. Diện tích tam giác bằng',
            dung: S2,
            giai: '$S = \\dfrac{abc}{4R} = \\dfrac{' + u[0] + '\\cdot' + u[1] + '\\cdot' + u[2] +
                  '}{4\\cdot' + (R % 1 ? R.toString().replace('.', '{,}') : R) + '} = ' + S2 + '$.' };
    }
    var d = q.dung;
    return { muc: 2, dang: 'dt-theso', de: q.de,
      dapan: bon(String(d), [String(d * 2), String(Math.round(d / 2)), String(d + ri(2, 9))]),
      dung: 0, giai: q.giai };
  }

  /* Góc bù, góc phụ nhưng có số cụ thể, cho câu 8 phong phú hơn */
  function lgGoc2() {
    var k = ri(1, 3), q;
    if (k === 1) {                                   /* hai góc bù nhau */
      var g = chon([120, 135, 150]), b = 180 - g, ham = chon(['sin', 'cos', 'tan', 'cot']);
      var daudoi = ham !== 'sin';
      q = { de: 'Hai góc $' + g + '^\\circ$ và $' + b + '^\\circ$ bù nhau, nên $\\' + ham + ' ' + g + '^\\circ$ bằng',
            dung: '$' + (daudoi ? '-' : '') + '\\' + ham + ' ' + b + '^\\circ$',
            nhieu: ['$' + (daudoi ? '' : '-') + '\\' + ham + ' ' + b + '^\\circ$',
                    '$\\' + (ham === 'sin' ? 'cos' : 'sin') + ' ' + b + '^\\circ$',
                    '$-\\' + (ham === 'sin' ? 'cos' : 'sin') + ' ' + b + '^\\circ$'],
            giai: 'Hai góc bù nhau: sin giữ nguyên, còn côsin, tang, côtang đều đổi dấu.' };
    } else if (k === 2) {                            /* hai góc phụ nhau */
      var g2 = chon([30, 45, 60]), p2 = 90 - g2;
      var cap = chon([['sin', 'cos'], ['cos', 'sin'], ['tan', 'cot'], ['cot', 'tan']]);
      q = { de: 'Hai góc $' + g2 + '^\\circ$ và $' + p2 + '^\\circ$ phụ nhau, nên $\\' + cap[0] + ' ' + g2 + '^\\circ$ bằng',
            dung: '$\\' + cap[1] + ' ' + p2 + '^\\circ$',
            nhieu: ['$\\' + cap[0] + ' ' + p2 + '^\\circ$', '$-\\' + cap[1] + ' ' + p2 + '^\\circ$',
                    '$\\' + cap[1] + ' ' + g2 + '^\\circ$'],
            giai: 'Hai góc phụ nhau: sin đổi thành côsin, tang đổi thành côtang.' };
    } else {                                         /* cho sẵn giá trị rồi hỏi góc bù */
      var v = chon(['\\dfrac{1}{2}', '\\dfrac{\\sqrt{3}}{2}', '\\dfrac{1}{\\sqrt{2}}']);
      var am = '-' + v, giu = chon([true, false]);
      q = { de: 'Biết $\\' + (giu ? 'sin' : 'cos') + '\\alpha = ' + v +
                '$. Khi đó $\\' + (giu ? 'sin' : 'cos') + '(180^\\circ - \\alpha)$ bằng',
            dung: '$' + (giu ? v : am) + '$',
            nhieu: ['$' + (giu ? am : v) + '$', '$0$', '$1$'],
            giai: giu ? 'Hai góc bù nhau thì sin bằng nhau.' : 'Hai góc bù nhau thì côsin đối nhau.' };
    }
    return { muc: 1, dang: 'lg-goc', de: q.de, dapan: bon(q.dung, q.nhieu), dung: 0, giai: q.giai };
  }

  /* Định lí sin, côsin nhưng thay số cụ thể, cho câu 9 phong phú hơn */
  function lgDinhLy2() {
    var k = ri(1, 3), q;
    if (k === 1) {                                   /* định lí côsin, thay số */
      var A = chon([60, 90, 120]), cosA = A === 60 ? 0.5 : A === 90 ? 0 : -0.5;
      var b = ri(3, 12), c = ri(3, 12);
      var a2 = b * b + c * c - 2 * b * c * cosA;
      q = { de: 'Tam giác $ABC$ có $b = ' + b + '$, $c = ' + c + '$ và $\\widehat{A} = ' + A +
                '^\\circ$. Theo định lí côsin, $a^2$ bằng',
            dung: String(a2),
            nhieu: [String(b * b + c * c + 2 * b * c * cosA), String(b * b + c * c), String(a2 + ri(3, 9))],
            giai: '$a^2 = b^2 + c^2 - 2bc\\cos A = ' + (b * b) + ' + ' + (c * c) + ' - 2\\cdot' + b +
                  '\\cdot' + c + '\\cdot(' + (A === 60 ? '\\dfrac{1}{2}' : A === 90 ? '0' : '-\\dfrac{1}{2}') +
                  ') = ' + a2 + '$.' };
    } else if (k === 2) {                            /* định lí sin, tìm R */
      var a3 = 2 * ri(2, 10);
      q = { de: 'Tam giác $ABC$ có $a = ' + a3 + '$ và $\\widehat{A} = 30^\\circ$. Bán kính đường tròn ngoại tiếp $R$ bằng',
            dung: String(a3),
            nhieu: [String(a3 / 2), String(a3 * 2), String(a3 + 2)],
            giai: '$\\dfrac{a}{\\sin A} = 2R$ nên $2R = \\dfrac{' + a3 + '}{\\frac{1}{2}} = ' +
                  (2 * a3) + '$, suy ra $R = ' + a3 + '$.' };
    } else {                                         /* nửa chu vi */
      var t = chon([[3,4,5],[6,8,10],[5,12,13],[9,12,15],[8,15,17],[7,24,25]]);
      var p = (t[0] + t[1] + t[2]) / 2;
      q = { de: 'Tam giác $ABC$ có ba cạnh $a = ' + t[0] + '$, $b = ' + t[1] + '$, $c = ' + t[2] +
                '$. Nửa chu vi $p$ bằng',
            dung: String(p),
            nhieu: [String(2 * p), String(p + 1), String(p - 1)],
            giai: '$p = \\dfrac{a+b+c}{2} = \\dfrac{' + (2 * p) + '}{2} = ' + p + '$.' };
    }
    return { muc: 1, dang: 'lg-dinhly', de: q.de, dapan: bon(q.dung, q.nhieu), dung: 0, giai: q.giai };
  }

  var OT1_TN = [
    gan('md-nhandang', C1_TN[3]),
    gan('md-dungsai',  C1_TN[5]),
    gan('md-dungsai',  C1_TN[6]),
    gan('bpt-nhandang', C2_TN[0]),
    khongPhaiBpt,
    bptNghiem,
    gan('bpt-nghiem',  C2_TN[3]),
    bptNao,
    gan('he-nhandang', C2_TN[1]),
    gan('he-nghiem',   C2_TN[6]),
    gan('he-nghiem',   C2_TN[7]),
    heNao,
    lgBang, lgBang,
    lgGoc,  lgGoc2, lgGoc2,
    lgDinhLy, lgDinhLy2, lgDinhLy2,
    dtTheSo, dtTheSo
  ];

  /* ============================================================
     ÔN TẬP GIỮA KÌ I — ĐỀ ĐÚNG SAI HAI CÂU, CẤU TRÚC CỐ ĐỊNH
     Câu 1 về tập hợp, câu 2 về bất phương trình bậc nhất hai ẩn,
     mỗi câu bốn ý. Phải đúng trọn cả bốn ý mới được xu, sai một ý
     là không có xu nào, nên mọi ý đều giữ ở mức nhận biết và thông
     hiểu: hỏi thẳng một việc, không gài bẫy, không bắt tính dài.

     Không có đáp án nào viết tay sẵn. Máy dựng số liệu trước rồi
     tự tính lại từng ý bằng vòng lặp hoặc bằng công thức đã kiểm,
     nên ý nào cũng đúng với số liệu vừa bốc.
     ============================================================ */

  /* Tung đồng xu, dùng để quyết định một ý sẽ viết đúng hay viết lệch đi */
  function tung() { return Math.random() < 0.5; }

  /* ---------- Tập con của R: khoảng, đoạn, nửa khoảng ----------
     Một tập con của R ghi bằng bốn thông tin: hai đầu d, c và hai dấu
     ngoặc layD, layC (true là lấy đầu đó, tức viết ngoặc vuông).
     Hai đầu vô cực ghi -Infinity và Infinity, luôn là ngoặc tròn. */
  function khoang(d, c, layD, layC) {
    return { d: d, c: c,
             lD: (d === -Infinity) ? false : !!layD,
             lC: (c === Infinity)  ? false : !!layC };
  }
  function vietKhoang(k) {
    if (k.d === -Infinity && k.c === Infinity) return '\\mathbb{R}';
    return (k.lD ? '[' : '(') +
           (k.d === -Infinity ? '-\\infty' : k.d) + ';\\,' +
           (k.c === Infinity  ? '+\\infty' : k.c) +
           (k.lC ? ']' : ')');
  }
  function thuocKhoang(k, x) {
    return (k.lD ? x >= k.d : x > k.d) && (k.lC ? x <= k.c : x < k.c);
  }
  function bangKhoang(p, q) {
    return p.d === q.d && p.c === q.c && p.lD === q.lD && p.lC === q.lC;
  }
  /* Các số nguyên nằm trong tập, trả về null khi tập trải ra vô cực
     vì khi ấy đếm không được. Cũng dùng để đếm số phần tử nguyên. */
  function nguyenTrong(k) {
    if (k.d === -Infinity || k.c === Infinity) return null;
    var r = [];
    for (var x = Math.ceil(k.d) - 1; x <= Math.floor(k.c) + 1; x++)
      if (thuocKhoang(k, x)) r.push(x);
    return r;
  }
  /* Các số tự nhiên nằm trong tập, chỉ cần đầu bên phải hữu hạn */
  function tuNhienTrong(k) {
    if (k.c === Infinity) return null;
    var r = [];
    for (var x = 0; x <= Math.floor(k.c) + 1; x++)
      if (thuocKhoang(k, x)) r.push(x);
    return r;
  }
  /* Một tập lệch đi một chút để làm ý sai: đổi một dấu ngoặc, hoặc
     xê dịch một đầu đi một đơn vị. Trả về null khi không lệch được
     (tập R), lúc đó ý sẽ viết đúng. */
  function lechKhoang(k) {
    var cach = xaoM([1, 2, 3, 4]);
    for (var i = 0; i < cach.length; i++) {
      var t = null, v = cach[i];
      if (v === 1 && k.d !== -Infinity) t = khoang(k.d, k.c, !k.lD, k.lC);
      if (v === 2 && k.c !== Infinity)  t = khoang(k.d, k.c, k.lD, !k.lC);
      if (v === 3 && k.d !== -Infinity && k.c - k.d > 1) t = khoang(k.d + 1, k.c, k.lD, k.lC);
      if (v === 4 && k.c !== Infinity  && k.c - k.d > 1) t = khoang(k.d, k.c - 1, k.lD, k.lC);
      if (t && !bangKhoang(t, k)) return t;
    }
    return null;
  }

  /* ---------- Các kiểu ý cho tập con của R ----------
     Mỗi hàm trả về { t: lời của ý, d: ý đó đúng hay sai },
     hoặc null khi số liệu lần này không hỏi kiểu đó được. */

  /* Viết kết quả một phép toán, một nửa số lần viết lệch đi cho thành ý sai */
  function yKhoang(ten, k) {
    var s = tung() ? lechKhoang(k) : null;
    return { nhom: 'phep', t: '$' + ten + ' = ' + vietKhoang(s || k) + '$', d: !s };
  }
  /* Trong tập có bao nhiêu số nguyên */
  function yDemNguyen(ten, k) {
    var ds = nguyenTrong(k);
    if (!ds || ds.length < 1 || ds.length > 9) return null;
    var n = ds.length, m = n;
    if (tung()) m = (n > 1 && tung()) ? n - 1 : n + 1;
    return { nhom: 'dem', t: 'Có đúng $' + m + '$ số nguyên thuộc tập hợp $' + ten + '$',
             d: m === n };
  }
  /* Trong tập có bao nhiêu số tự nhiên */
  function yDemTuNhien(ten, k) {
    var ds = tuNhienTrong(k);
    if (!ds || ds.length > 9) return null;
    var n = ds.length;
    if (n === 0) {
      if (tung()) return { nhom: 'dem',
        t: 'Tập hợp $' + ten + '$ không chứa số tự nhiên nào', d: true };
      return { nhom: 'dem',
        t: 'Tập hợp $' + ten + '$ chứa đúng $' + ri(1, 3) + '$ số tự nhiên', d: false };
    }
    var m = n;
    if (tung()) m = (n > 1 && tung()) ? n - 1 : n + 1;
    return { nhom: 'dem', t: 'Tập hợp $' + ten + '$ chứa đúng $' + m + '$ số tự nhiên',
             d: m === n };
  }
  /* Liệt kê các số nguyên của tập */
  function yLietKeNguyen(ten, k) {
    var ds = nguyenTrong(k);
    if (!ds || ds.length < 2 || ds.length > 6) return null;
    var hien = ds.slice(), sai = false;
    if (tung()) {
      sai = true;
      /* Lệch kiểu hay gặp nhất: lấy thêm đúng cái đầu mà tập không lấy */
      var v = ri(1, 3);
      if (v === 1)      hien = [ds[0] - 1].concat(ds);
      else if (v === 2) hien = ds.concat([ds[ds.length - 1] + 1]);
      else              hien = ds.slice(1);
    }
    return { nhom: 'dem',
             t: 'Các số nguyên thuộc tập hợp $' + ten + '$ là $' + tap(hien) + '$', d: !sai };
  }
  /* Một số cho trước có thuộc tập hay không */
  function yThuocKhoang(ten, k, x) {
    if (tung()) return { nhom: 'thuoc', t: '$' + x + ' \\in ' + ten + '$',
                         d: thuocKhoang(k, x) };
    return { nhom: 'thuoc', t: '$' + x + ' \\notin ' + ten + '$', d: !thuocKhoang(k, x) };
  }
  /* Số nguyên lớn nhất của tập */
  function yLonNhatNguyen(ten, k) {
    var ds = nguyenTrong(k);
    if (!ds || !ds.length) return null;
    var m = ds[ds.length - 1], v = tung() ? m : m + 1;
    return { nhom: 'dem',
             t: 'Số nguyên lớn nhất thuộc tập hợp $' + ten + '$ là $' + v + '$', d: v === m };
  }

  /* ---------- Tập hữu hạn các số tự nhiên, số nguyên ----------
     Tập nào cũng được quét bằng vòng lặp từ điều kiện đề bài, nên
     danh sách phần tử chắc chắn khớp với lời đề. */
  function quetSo(lo, hi, kt) {
    var r = [];
    for (var x = lo; x <= hi; x++) if (kt(x)) r.push(x);
    return r;
  }
  /* Vế trái của phương trình bậc hai có hai nghiệm p, q:
     $x^2 - (p+q)x + pq = 0$, viết gọn lại cho đúng dấu và bỏ hệ số 1. */
  function vietBac2(p, q) {
    var S = p + q, P = p * q, t = 'x^2';
    if (S !== 0) t += (S > 0 ? ' - ' + (S === 1 ? '' : S) + 'x'
                             : ' + ' + (S === -1 ? '' : -S) + 'x');
    if (P !== 0) t += (P > 0 ? ' + ' + P : ' - ' + (-P));
    return t + ' = 0';
  }
  /* Cũng phương trình ấy nhưng để dạng tích $(x - p)(x - q) = 0$,
     nhận bao nhiêu nghiệm cũng được. */
  function vietTich(ds) {
    return ds.map(function (v) {
      return v === 0 ? 'x' : (v > 0 ? '(x - ' + v + ')' : '(x + ' + (-v) + ')');
    }).join('') + ' = 0';
  }
  /* Lấy n nghiệm nguyên khác nhau, xếp tăng dần. Nghiệm phải nguyên,
     vì các ý sau còn liệt kê và đếm phần tử. */
  function mayNghiem(n) {
    var r = [], v;
    while (r.length < n) { v = ri(-4, 6); if (r.indexOf(v) === -1) r.push(v); }
    return r.sort(function (a, b) { return a - b; });
  }

  /* Bốc một tập và lời mô tả của nó. ten là chữ A hoặc B.
     Tập nào cũng viết thẳng thành $A = \{x \in ... \mid <điều kiện>\}$,
     không tả bằng lời, để đề không có chỗ nào phải đoán ý.
     ds luôn do vòng lặp quét ra từ đúng điều kiện ghi trong lời đề. */
  function moTaTap(ten) {
    var k = ri(1, 10), n, p, q, d1, d2, ng;
    function bao(tapSo, dk, lo, hi, kt) {
      return { mo: '$' + ten + ' = \\{x \\in \\mathbb{' + tapSo + '} \\mid ' + dk + '\\}$',
               ds: quetSo(lo, hi, kt) };
    }

    if (k === 1) {                         /* số tự nhiên bị chặn trên */
      n = ri(4, 9); d1 = tung();
      return bao('N', 'x ' + (d1 ? '\\le' : '\\lt') + ' ' + n, 0, 60,
                 function (x) { return d1 ? x <= n : x < n; });
    }
    if (k === 2) {                         /* số nguyên trong một khoảng */
      p = ri(1, 4); q = ri(2, 5); d1 = tung(); d2 = tung();
      return bao('Z', '-' + p + ' ' + (d1 ? '\\le' : '\\lt') + ' x ' +
                      (d2 ? '\\le' : '\\lt') + ' ' + q, -20, 20,
                 function (x) { return (d1 ? x >= -p : x > -p) && (d2 ? x <= q : x < q); });
    }
    if (k === 3) {                         /* trị tuyệt đối */
      p = ri(2, 4); d1 = tung();
      return bao('Z', '|x| ' + (d1 ? '\\le' : '\\lt') + ' ' + p, -20, 20,
                 function (x) { return d1 ? Math.abs(x) <= p : Math.abs(x) < p; });
    }
    if (k === 4) {                         /* x bình phương bị chặn trên, lấy nghiệm nguyên */
      n = chon([4, 5, 9, 10, 16, 17]);
      return bao('Z', 'x^2 \\le ' + n, -20, 20, function (x) { return x * x <= n; });
    }
    if (k === 5) {                         /* cũng thế nhưng chỉ lấy số tự nhiên */
      n = chon([9, 10, 16, 17, 25, 26]);
      return bao('N', 'x^2 \\le ' + n, 0, 20, function (x) { return x * x <= n; });
    }
    if (k === 6) {                         /* phương trình dạng tích, hai nghiệm */
      ng = mayNghiem(2);
      return bao('R', vietTich(ng), -60, 60,
                 function (x) { return (x - ng[0]) * (x - ng[1]) === 0; });
    }
    if (k === 7) {                         /* phương trình bậc hai, lấy nghiệm nguyên */
      ng = mayNghiem(2);
      return bao('Z', vietBac2(ng[0], ng[1]), -60, 60,
                 function (x) { return x * x - (ng[0] + ng[1]) * x + ng[0] * ng[1] === 0; });
    }
    if (k === 8) {                         /* bậc hai nhưng chỉ lấy nghiệm tự nhiên */
      ng = mayNghiem(2);
      if (ng[1] < 0) ng = [ng[0], ri(1, 6)];   /* chắc chắn còn ít nhất một nghiệm tự nhiên */
      return bao('N', vietBac2(ng[0], ng[1]), 0, 60,
                 function (x) { return x * x - (ng[0] + ng[1]) * x + ng[0] * ng[1] === 0; });
    }
    if (k === 9) {                         /* x bình phương bằng một số chính phương */
      n = chon([1, 4, 9, 16, 25]);
      return bao('R', 'x^2 = ' + n, -60, 60, function (x) { return x * x === n; });
    }
    ng = mayNghiem(3);                     /* phương trình tích, ba nghiệm */
    return bao('R', vietTich(ng), -60, 60,
               function (x) { return (x - ng[0]) * (x - ng[1]) * (x - ng[2]) === 0; });
  }
  function giaoTap(a, b) { return a.filter(function (x) { return b.indexOf(x) !== -1; }); }
  function hieuTap(a, b) { return a.filter(function (x) { return b.indexOf(x) === -1; }); }
  function hopTap(a, b) {
    return a.concat(b.filter(function (x) { return a.indexOf(x) === -1; }))
            .sort(function (p, q) { return p - q; });
  }
  function vietTap(ds) { return ds.length ? tap(ds) : '\\varnothing'; }

  /* ---------- Các kiểu ý cho tập hữu hạn ---------- */

  /* Liệt kê một tập, một nửa số lần bỏ hoặc thêm một phần tử cho thành ý sai */
  function yLietKeTap(ten, ds) {
    var hien = ds.slice(), sai = false;
    if (ds.length && tung()) {
      sai = true;
      /* Tập số tự nhiên hay bị quên mất số 0, cho ý lệch đúng vào chỗ đó */
      var v = (ds[0] === 0 && ds.length > 1 && tung()) ? 3 : ri(1, 3);
      if (v === 1)      hien = [ds[0] - 1].concat(ds);
      else if (v === 2) hien = ds.concat([ds[ds.length - 1] + 1]);
      else if (ds.length > 1) hien = ds.slice(1);
      else              hien = [ds[0] - 1].concat(ds);
    }
    return { nhom: 'lietke', t: '$' + ten + ' = ' + vietTap(hien) + '$', d: !sai };
  }
  /* Số phần tử của một tập */
  function ySoPhanTu(ten, ds) {
    if (!ds.length) return null;
    var n = ds.length, m = n;
    if (tung()) m = (n > 1 && tung()) ? n - 1 : n + 1;
    return { nhom: 'dem', t: 'Tập hợp $' + ten + '$ có $' + m + '$ phần tử', d: m === n };
  }
  /* Một số cho trước có thuộc tập hay không */
  function yThuocTap(ten, ds, x) {
    var co = ds.indexOf(x) !== -1;
    if (tung()) return { nhom: 'thuoc', t: '$' + x + ' \\in ' + ten + '$', d: co };
    return { nhom: 'thuoc', t: '$' + x + ' \\notin ' + ten + '$', d: !co };
  }
  /* Quan hệ tập con giữa hai tập */
  function yConTap(a, b) {
    if (tung()) return { t: '$A \\subset B$', d: hieuTap(a, b).length === 0 };
    return { t: '$B \\subset A$', d: hieuTap(b, a).length === 0 };
  }
  /* Trong tập có bao nhiêu số thoả một điều kiện đơn giản */
  function yDieuKienTap(ten, ds) {
    var dk = chon([
      { chu: 'số chẵn',             kt: function (x) { return x % 2 === 0; } },
      { chu: 'số lẻ',               kt: function (x) { return x % 2 !== 0; } },
      { chu: 'số chia hết cho $3$', kt: function (x) { return x % 3 === 0; } },
      { chu: 'số lớn hơn $2$',      kt: function (x) { return x > 2; } }
    ]);
    var n = ds.filter(dk.kt).length;
    if (n === 0) return null;
    var m = n;
    if (tung()) m = (n > 1 && tung()) ? n - 1 : n + 1;
    return { nhom: 'dem',
             t: 'Trong tập hợp $' + ten + '$ có đúng $' + m + '$ ' + dk.chu, d: m === n };
  }

  /* ---------- Bốc bốn ý ----------
     Lấy bốn ý trong túi, theo hai lệ:
     — có cả ý đúng lẫn ý sai, để bấm Đúng hết hay Sai hết đều không ăn điểm,
     — mỗi nhóm ý góp nhiều nhất hai ý, để một câu không thành bốn ý y như nhau. */
  function bonY(tui, tran) {
    tran = tran || 2;
    var gan = null;
    for (var lan = 0; lan < 200; lan++) {
      var y = [], d = xaoM(tui.slice()), dem = {}, i, o;
      for (i = 0; i < d.length && y.length < 4; i++) {
        o = d[i]();
        if (!o) continue;
        if (o.nhom) {
          if ((dem[o.nhom] || 0) >= tran) continue;
          dem[o.nhom] = (dem[o.nhom] || 0) + 1;
        }
        y.push(o);
      }
      if (y.length < 4) continue;
      gan = y;
      var sd = 0;
      for (i = 0; i < 4; i++) if (y[i].d) sd++;
      if (sd > 0 && sd < 4) return y;
    }
    return gan;                     /* hiếm khi tới đây, lấy bộ gần nhất */
  }
  function raCau(dang, de, y, giai) {
    return { muc: 2, dang: dang, de: de,
             y:    y.map(function (o) { return o.t; }),
             dung: y.map(function (o) { return o.d; }),
             giai: giai };
  }

  /* ============================================================
     CÂU 1 — TẬP HỢP
     Hai dạng thay nhau: tập con của R (hay có đầu vô cực) và tập
     hữu hạn các số tự nhiên, số nguyên cho bằng tính chất.
     ============================================================ */

  /* Dạng 1: hai tập con của R.
     Dựng A và B gối lên nhau theo đúng thứ tự a1 < b1 < a2 < b2. Nhờ
     thế hợp, giao và hai hiệu đều gọn trong một khoảng duy nhất, viết
     ra theo công thức dưới đây là chắc đúng:
       A ∩ B lấy đầu trong của mỗi tập,  A ∪ B lấy đầu ngoài,
       A \ B cắt tại đầu của B và đổi dấu ngoặc ở chỗ cắt,
       B \ A cắt tại đầu của A và cũng đổi dấu ngoặc ở chỗ cắt. */
  function dsTapR() {
    var a1 = ri(-6, 1), b1 = a1 + ri(2, 4), a2 = b1 + ri(2, 4), b2 = a2 + ri(2, 4);

    /* Cho đầu vô cực xuất hiện thường xuyên, vì học sinh hay quên rằng
       hai đầu ấy luôn viết ngoặc tròn. */
    var noVo = chon(['', 'A', 'B', 'AB', 'A', 'B', 'AB']);
    var voA = noVo.indexOf('A') !== -1, voB = noVo.indexOf('B') !== -1;

    var A = khoang(voA ? -Infinity : a1, a2, tung(), tung());
    var B = khoang(b1, voB ? Infinity : b2, tung(), tung());

    var giao = khoang(B.d, A.c, B.lD, A.lC);
    var hop  = khoang(A.d, B.c, A.lD, B.lC);
    var hieu = khoang(A.d, B.d, A.lD, !B.lD);
    var hieu2 = khoang(A.c, B.c, !A.lC, B.lC);

    var tui = [
      function () { return yKhoang('A \\cap B', giao); },
      function () { return yKhoang('A \\cup B', hop); },
      function () { return yKhoang('A \\setminus B', hieu); },
      function () { return yKhoang('B \\setminus A', hieu2); },
      function () { return yThuocKhoang('A \\cap B', giao, chon([b1, a2, b1 + 1, a2 - 1])); },
      function () { return yDemNguyen('A \\cap B', giao); },
      function () { return yDemNguyen('A \\setminus B', hieu); },
      function () { return yDemTuNhien('A \\cap B', giao); },
      function () { return yDemTuNhien('A', A); },
      function () { return yLietKeNguyen('A \\cap B', giao); },
      function () { return yLonNhatNguyen('A \\cap B', giao); },
      function () { return yThuocKhoang('A', A, chon(voA ? [b1, a2, a2 - 1] : [a1, b1, a2])); },
      function () { return yThuocKhoang('B', B, chon(voB ? [b1, a2, b1 + 1] : [b1, a2, b2])); }
    ];

    var y = bonY(tui);
    return raCau('ts-taphop',
      'Cho hai tập hợp $A = ' + vietKhoang(A) + '$ và $B = ' + vietKhoang(B) + '$.',
      y,
      'Vẽ hai tập lên cùng một trục số rồi đọc ra: $A \\cap B = ' + vietKhoang(giao) +
      '$, $A \\cup B = ' + vietKhoang(hop) + '$, $A \\setminus B = ' + vietKhoang(hieu) +
      '$, $B \\setminus A = ' + vietKhoang(hieu2) + '$.');
  }

  /* Dạng 2: hai tập hữu hạn các số tự nhiên, số nguyên.
     Bốc lại cho tới khi hai tập vừa tầm liệt kê, có phần chung và
     không trùng khít nhau. Không dựng được thì chuyển sang dạng 1. */
  function dsTapZ() {
    for (var lan = 0; lan < 250; lan++) {
      var A = moTaTap('A'), B = moTaTap('B');
      /* Tập cho bằng phương trình chỉ có một hai phần tử, nên chỉ cần mỗi
         tập có phần tử và hai tập cộng lại đủ rộng để hỏi cho ra chuyện. */
      if (!A.ds.length || A.ds.length > 8) continue;
      if (!B.ds.length || B.ds.length > 8) continue;
      if (A.ds.length + B.ds.length < 5) continue;

      var giao = giaoTap(A.ds, B.ds);
      if (!giao.length) continue;                       /* phải có phần chung */
      var hieu = hieuTap(A.ds, B.ds), hieu2 = hieuTap(B.ds, A.ds);
      if (!hieu.length && !hieu2.length) continue;      /* hai tập trùng nhau thì bỏ */
      var hop = hopTap(A.ds, B.ds);

      /* Các số đem ra hỏi: lấy ngay trong hai tập, thêm một số sát ngoài
         rìa để ý hỏi không phải lúc nào cũng đúng. */
      var ngoai = [hop[0] - 1, hop[hop.length - 1] + 1];
      var tui = [
        function () { return yLietKeTap('A', A.ds); },
        function () { return yLietKeTap('B', B.ds); },
        function () { return yLietKeTap('A \\cap B', giao); },
        function () { return yLietKeTap('A \\cup B', hop); },
        function () { return yLietKeTap('A \\setminus B', hieu); },
        function () { return yLietKeTap('B \\setminus A', hieu2); },
        function () { return ySoPhanTu('A', A.ds); },
        function () { return ySoPhanTu('B', B.ds); },
        function () { return ySoPhanTu('A \\cap B', giao); },
        function () { return ySoPhanTu('A \\cup B', hop); },
        function () { return yThuocTap('A', A.ds, chon(hop.concat(ngoai))); },
        function () { return yThuocTap('B', B.ds, chon(hop.concat(ngoai))); },
        function () { return yConTap(A.ds, B.ds); },
        function () { return yDieuKienTap('A', A.ds); },
        function () { return yDieuKienTap('A \\cup B', hop); }
      ];

      var y = bonY(tui);
      if (!y) continue;
      return raCau('ts-taphop',
        'Cho hai tập hợp ' + A.mo + ' và ' + B.mo + '.',
        y,
        'Liệt kê ra rồi so sánh: $A = ' + vietTap(A.ds) + '$, $B = ' + vietTap(B.ds) +
        '$, $A \\cap B = ' + vietTap(giao) + '$, $A \\cup B = ' + vietTap(hop) + '$.');
    }
    return null;
  }

  function dsTapHop() {
    if (tung()) {
      var q = dsTapZ();
      if (q) return q;
    }
    return dsTapR();
  }

  /* ============================================================
     CÂU 2 — BẤT PHƯƠNG TRÌNH BẬC NHẤT HAI ẨN
     Cho một bất phương trình rồi hỏi bốn ý quanh nó: nhận dạng,
     thử nghiệm, đường bờ và miền nghiệm.
     ============================================================ */

  /* lay cho biết dấu có kèm dấu bằng, doi là dấu sau khi nhân hai vế với -1 */
  var DAU_BPT = [
    { ma: '\\le', lay: true,  doi: '\\ge' },
    { ma: '\\lt', lay: false, doi: '\\gt' },
    { ma: '\\ge', lay: true,  doi: '\\le' },
    { ma: '\\gt', lay: false, doi: '\\lt' }
  ];

  function dsBpt() {
    var a = chon([1, 2, 3, -1, -2]), b = chon([1, 2, 3, -1, -2, -3]);
    var d = chon(DAU_BPT), vt = veTrai(a, b);

    /* Chọn trước một điểm nguyên rồi lấy c bằng giá trị vế trái tại đó,
       nhờ vậy luôn có sẵn một điểm nằm đúng trên đường bờ để đem ra hỏi. */
    var x0 = ri(-3, 5), y0 = ri(-3, 5), c = a * x0 + b * y0;
    var bien = [x0, y0];

    /* Lùi một bước theo chiều của x làm vế trái giảm đi |a|, tiến một
       bước làm vế trái tăng thêm |a|, nên hai điểm này nằm hai bên bờ. */
    var buoc = (a > 0) ? 1 : -1;
    var thap = [x0 - buoc, y0];
    var cao  = [x0 + buoc, y0];

    function thoa(x, y) {
      var v = a * x + b * y;
      if (d.ma === '\\le') return v <= c;
      if (d.ma === '\\lt') return v <  c;
      if (d.ma === '\\ge') return v >= c;
      return v > c;
    }
    function laGoc(p) { return p[0] === 0 && p[1] === 0; }

    /* Cặp số cho trước có là nghiệm hay không */
    function yNghiem(p) {
      var ok = thoa(p[0], p[1]), toa = '$(' + p[0] + ';\\,' + p[1] + ')$';
      if (tung())
        return { nhom: 'thu',
                 t: 'Cặp số ' + toa + ' là một nghiệm của bất phương trình đã cho', d: ok };
      return { nhom: 'thu', t: 'Cặp số ' + toa +
                  ' <strong>không</strong> là nghiệm của bất phương trình đã cho', d: !ok };
    }

    var tui = [
      function () { return yNghiem(bien); },
      function () { return yNghiem(thap); },
      function () { return yNghiem(cao); },

      /* Gốc toạ độ thuộc miền nghiệm hay không */
      function () {
        if (laGoc(bien) || laGoc(thap) || laGoc(cao)) return null;
        return { nhom: 'thu',
                 t: 'Gốc toạ độ $O(0;\\,0)$ thuộc miền nghiệm của bất phương trình đã cho',
                 d: thoa(0, 0) };
      },

      /* Đường bờ của miền nghiệm là đường thẳng nào */
      function () {
        var cc = tung() ? c : c + chon([1, -1, 2]);
        return { t: 'Miền nghiệm của bất phương trình đã cho có bờ là đường thẳng $' +
                    vt + ' = ' + cc + '$', d: cc === c };
      },

      /* Đường bờ có thuộc miền nghiệm hay không, tuỳ dấu có kèm dấu bằng */
      function () {
        return { t: 'Mọi điểm nằm trên đường thẳng $' + vt + ' = ' + c +
                    '$ đều là nghiệm của bất phương trình đã cho', d: d.lay };
      },

      /* Miền nghiệm là một nửa mặt phẳng */
      function () {
        if (tung())
          return { nhom: 'ly',
                   t: 'Miền nghiệm của bất phương trình đã cho là một nửa mặt phẳng', d: true };
        return { nhom: 'ly',
                 t: 'Miền nghiệm của bất phương trình đã cho là toàn bộ mặt phẳng toạ độ',
                 d: false };
      },

      /* Số nghiệm của bất phương trình */
      function () {
        if (tung())
          return { nhom: 'ly', t: 'Bất phương trình đã cho có vô số nghiệm', d: true };
        return { nhom: 'ly', t: 'Bất phương trình đã cho chỉ có đúng một nghiệm', d: false };
      },

      /* Nhận dạng bất phương trình bậc nhất hai ẩn */
      function () {
        return { nhom: 'ly',
                 t: 'Bất phương trình đã cho là bất phương trình bậc nhất hai ẩn', d: true };
      },

      /* Nhân hai vế với -1 thì phải đổi chiều dấu */
      function () {
        var sai = tung();
        return { t: 'Bất phương trình đã cho tương đương với bất phương trình $' +
                    veTrai(-a, -b) + ' ' + (sai ? d.ma : d.doi) + ' ' + (-c) + '$', d: !sai };
      }
    ];

    var y = bonY(tui);
    return raCau('bpt-dungsai',
      'Cho bất phương trình $' + vt + ' ' + d.ma + ' ' + c + '$.',
      y,
      'Thay toạ độ từng điểm vào vế trái $' + vt + '$ rồi so với $' + c +
      '$. Đường bờ là $' + vt + ' = ' + c + '$, bờ chỉ thuộc miền nghiệm khi dấu ' +
      'của bất phương trình có kèm dấu bằng.');
  }

  /* Hai câu đúng sai của đề ôn tập, đúng thứ tự ghi trong deCoDinh ở data.js */
  var OT1_DS = [dsTapHop, dsBpt];

  /* ============================================================
     ÔN TẬP GIỮA KÌ I — ĐỀ TRẢ LỜI NGẮN BỐN CÂU, CẤU TRÚC CỐ ĐỊNH
     Câu 1 tập hợp (nhận biết), câu 2 giá trị lượng giác của một góc
     từ 0 đến 180 độ (nhận biết), câu 3 diện tích tam giác (thông
     hiểu), câu 4 bài toán thực tế về bất phương trình bậc nhất hai
     ẩn (vận dụng). Đúng mỗi câu được 5 xu.

     LUẬT CHUNG CỦA CẢ BỐN CÂU: đáp án phải là một SỐ NGUYÊN từ 10
     đến 9999. Mẫu nào bốc ra số lẻ hoặc số ngoài khoảng ấy thì bỏ,
     bốc lại. Việc kiểm do hàm raTLN dưới đây lo một lần cho tất cả,
     không mẫu nào phải tự lo lấy.
     ============================================================ */

  function dapHopLe(v) {
    return typeof v === 'number' && isFinite(v) &&
           v === Math.floor(v) && v >= 10 && v <= 9999;
  }
  /* Gọi mẫu cho tới khi ra một đáp án hợp lệ. mau() trả về
     { muc, de, dap, giai } với dap là một số, hoặc null khi bốc hụt. */
  function raTLN(dang, mau) {
    for (var i = 0; i < 500; i++) {
      var q = mau();
      if (q && dapHopLe(q.dap))
        return { muc: q.muc, dang: dang, de: q.de, dapan: String(q.dap), giai: q.giai };
    }
    return null;
  }

  /* ============================================================
     CÂU 1 — TẬP HỢP, ĐẾM SỐ PHẦN TỬ
     Ba dạng thay nhau: hai tập con của Z cho bằng tính chất, hai
     khoảng trên R, và một tập liệt kê ghép với một tập tính chất.
     Kết quả phép toán luôn do vòng lặp quét ra rồi mới đếm.
     ============================================================ */

  var PHEP_TAP = [
    { ma: 'giao',  ten: 'A \\cap B' },
    { ma: 'hop',   ten: 'A \\cup B' },
    { ma: 'hieuA', ten: 'A \\setminus B' },
    { ma: 'hieuB', ten: 'B \\setminus A' }
  ];
  function ghepTap(ma, a, b) {
    if (ma === 'giao')  return giaoTap(a, b);
    if (ma === 'hop')   return hopTap(a, b);
    if (ma === 'hieuA') return hieuTap(a, b);
    return hieuTap(b, a);
  }
  function ghepThuoc(ma, ta, tb) {
    if (ma === 'giao')  return ta && tb;
    if (ma === 'hop')   return ta || tb;
    if (ma === 'hieuA') return ta && !tb;
    return tb && !ta;
  }

  /* Một tập con của Z cho bằng tính chất, bề rộng đủ lớn để kết quả
     đếm ra ít nhất hai chữ số. */
  function tapZRong(ten) {
    var lo = ri(-30, 6), hi = lo + ri(16, 42), lLo = tung(), lHi = tung();
    var ds = [], x;
    for (x = lo; x <= hi; x++)
      if ((lLo ? x >= lo : x > lo) && (lHi ? x <= hi : x < hi)) ds.push(x);
    return { mo: '$' + ten + ' = \\{x \\in \\mathbb{Z} \\mid ' + lo +
                 (lLo ? ' \\le ' : ' \\lt ') + 'x' + (lHi ? ' \\le ' : ' \\lt ') + hi + '\\}$',
             ds: ds };
  }

  /* Dạng 1: hai tập số nguyên cho bằng tính chất */
  function tlnTapZ() {
    var A = tapZRong('A'), B = tapZRong('B'), p = chon(PHEP_TAP);
    var ds = ghepTap(p.ma, A.ds, B.ds);
    return { muc: 1,
      de: 'Cho hai tập hợp ' + A.mo + ' và ' + B.mo +
          '. Tập hợp $' + p.ten + '$ có bao nhiêu phần tử?',
      dap: ds.length,
      giai: 'Tập $A$ có ' + A.ds.length + ' phần tử, tập $B$ có ' + B.ds.length +
            ' phần tử, $' + p.ten + '$ có ' + ds.length + ' phần tử.' };
  }

  /* Dạng 2: hai khoảng trên trục số, đếm số nguyên nằm trong kết quả */
  function tlnTapR() {
    var a1 = ri(-30, 0), a2 = a1 + ri(14, 32);
    var b1 = ri(a1 + 2, a2 - 2), b2 = b1 + ri(14, 34);
    var A = khoang(a1, a2, tung(), tung()), B = khoang(b1, b2, tung(), tung());
    var p = chon(PHEP_TAP), n = 0, x;
    for (x = -300; x <= 300; x++)
      if (ghepThuoc(p.ma, thuocKhoang(A, x), thuocKhoang(B, x))) n++;
    return { muc: 1,
      de: 'Cho hai tập hợp $A = ' + vietKhoang(A) + '$ và $B = ' + vietKhoang(B) +
          '$. Có bao nhiêu số nguyên thuộc tập hợp $' + p.ten + '$?',
      dap: n,
      giai: 'Vẽ hai tập lên cùng một trục số, xác định $' + p.ten +
            '$ rồi đếm các số nguyên nằm trong đó, được ' + n + ' số.' };
  }

  /* Dạng 3: một tập cho bằng liệt kê, một tập cho bằng tính chất */
  function tlnTapLietKe() {
    var A = [], x;
    while (A.length < ri(5, 8)) { x = ri(-12, 30); if (A.indexOf(x) === -1) A.push(x); }
    A.sort(function (u, v) { return u - v; });
    var lo = ri(-10, 5), hi = lo + ri(14, 30), B = [];
    for (x = lo; x <= hi; x++) B.push(x);
    var p = chon(PHEP_TAP), ds = ghepTap(p.ma, A, B);
    return { muc: 1,
      de: 'Cho hai tập hợp $A = ' + tap(A) + '$ và $B = \\{x \\in \\mathbb{Z} \\mid ' +
          lo + ' \\le x \\le ' + hi + '\\}$. Tập hợp $' + p.ten + '$ có bao nhiêu phần tử?',
      dap: ds.length,
      giai: 'Tập $B$ gồm ' + B.length + ' số nguyên liên tiếp từ $' + lo + '$ đến $' + hi +
            '$, đối chiếu với $A$ thì $' + p.ten + '$ có ' + ds.length + ' phần tử.' };
  }

  function tlnCau1() { return raTLN('tln-taphop', chon([tlnTapZ, tlnTapR, tlnTapLietKe])); }

  /* ============================================================
     CÂU 2 — GIÁ TRỊ LƯỢNG GIÁC CỦA MỘT GÓC TỪ 0 ĐẾN 180 ĐỘ
     Mỗi mẫu trả về vế phải của biểu thức và giá trị của nó. Mọi giá
     trị lượng giác dùng ở đây hoặc là số hữu tỉ, hoặc là căn thức
     triệt tiêu nhau, nên kết quả luôn tính được đúng bằng số nguyên.
     ============================================================ */

  /* Góc không nằm trong bảng đặc biệt, chỉ dùng để nêu quan hệ
     (bù nhau, phụ nhau, sin bình cộng côsin bình), không phải tra bảng. */
  var GOC_LE = [20, 25, 35, 40, 50, 55, 65, 70, 75, 80];

  var LG_TLN = [
    /* sin 30 = cos 60 = 1/2 */
    function () {
      var a = 2 * ri(4, 45), b = 2 * ri(4, 45);
      return { bt: a + '\\sin 30^\\circ + ' + b + '\\cos 60^\\circ', dap: (a + b) / 2,
               giai: '$\\sin 30^\\circ = \\cos 60^\\circ = \\dfrac{1}{2}$ nên $P = \\dfrac{' +
                     a + ' + ' + b + '}{2} = ' + ((a + b) / 2) + '$.' };
    },
    /* Ba góc đầu và cuối của bảng */
    function () {
      var a = ri(5, 45), b = ri(5, 45), c = ri(5, 45);
      return { bt: a + '\\cos 0^\\circ + ' + b + '\\sin 90^\\circ - ' + c + '\\cos 180^\\circ',
               dap: a + b + c,
               giai: '$\\cos 0^\\circ = \\sin 90^\\circ = 1$ và $\\cos 180^\\circ = -1$ nên $P = ' +
                     a + ' + ' + b + ' + ' + c + ' = ' + (a + b + c) + '$.' };
    },
    /* sin bình cộng côsin bình bằng 1 */
    function () {
      var a = ri(12, 99), g = chon(GOC_LE);
      return { bt: a + '(\\sin^2 ' + g + '^\\circ + \\cos^2 ' + g + '^\\circ)', dap: a,
               giai: '$\\sin^2 \\alpha + \\cos^2 \\alpha = 1$ nên $P = ' + a + '$.' };
    },
    /* sin 150 = 1/2, cos 120 = -1/2 */
    function () {
      var a = 2 * ri(4, 45), b = 2 * ri(4, 45);
      return { bt: a + '\\sin 150^\\circ - ' + b + '\\cos 120^\\circ', dap: (a + b) / 2,
               giai: '$\\sin 150^\\circ = \\dfrac{1}{2}$, $\\cos 120^\\circ = -\\dfrac{1}{2}$ nên $P = \\dfrac{' +
                     a + ' + ' + b + '}{2} = ' + ((a + b) / 2) + '$.' };
    },
    /* Hai góc bù nhau có sin bằng nhau */
    function () {
      var a = ri(2, 12), b = ri(12, 99), g = chon(GOC_LE);
      return { bt: a + '(\\sin ' + g + '^\\circ - \\sin ' + (180 - g) + '^\\circ) + ' + b, dap: b,
               giai: 'Hai góc $' + g + '^\\circ$ và $' + (180 - g) +
                     '^\\circ$ bù nhau nên có sin bằng nhau, hiệu trong ngoặc bằng $0$, còn $P = ' +
                     b + '$.' };
    },
    /* Hai góc bù nhau có côsin đối nhau */
    function () {
      var a = ri(2, 12), b = ri(12, 99), g = chon(GOC_LE);
      return { bt: a + '(\\cos ' + g + '^\\circ + \\cos ' + (180 - g) + '^\\circ) + ' + b, dap: b,
               giai: 'Hai góc $' + g + '^\\circ$ và $' + (180 - g) +
                     '^\\circ$ bù nhau nên có côsin đối nhau, tổng trong ngoặc bằng $0$, còn $P = ' +
                     b + '$.' };
    },
    /* Hai góc phụ nhau: sin góc này bằng côsin góc kia */
    function () {
      var a = ri(2, 12), b = ri(12, 99), g = chon(GOC_LE);
      return { bt: a + '(\\sin ' + g + '^\\circ - \\cos ' + (90 - g) + '^\\circ) + ' + b, dap: b,
               giai: 'Hai góc $' + g + '^\\circ$ và $' + (90 - g) +
                     '^\\circ$ phụ nhau nên $\\sin ' + g + '^\\circ = \\cos ' + (90 - g) +
                     '^\\circ$, hiệu trong ngoặc bằng $0$, còn $P = ' + b + '$.' };
    },
    /* tang và côtang của góc 45 độ */
    function () {
      var a = ri(6, 60), b = ri(6, 60);
      return { bt: a + '\\tan 45^\\circ + ' + b + '\\cot 45^\\circ', dap: a + b,
               giai: '$\\tan 45^\\circ = \\cot 45^\\circ = 1$ nên $P = ' + a + ' + ' + b +
                     ' = ' + (a + b) + '$.' };
    },
    /* Chia cho sin 30 độ */
    function () {
      var a = ri(6, 60), b = ri(5, 60);
      return { bt: '\\dfrac{' + a + '}{\\sin 30^\\circ} + ' + b, dap: 2 * a + b,
               giai: '$\\sin 30^\\circ = \\dfrac{1}{2}$ nên $\\dfrac{' + a + '}{\\sin 30^\\circ} = ' +
                     (2 * a) + '$, suy ra $P = ' + (2 * a + b) + '$.' };
    },
    /* sin 60 nhân côsin 30, hai căn ba triệt tiêu nhau */
    function () {
      var a = 4 * ri(3, 24), b = ri(5, 60);
      return { bt: a + '\\sin 60^\\circ \\cos 30^\\circ + ' + b, dap: 3 * a / 4 + b,
               giai: '$\\sin 60^\\circ = \\cos 30^\\circ = \\dfrac{\\sqrt{3}}{2}$ nên tích bằng $\\dfrac{3}{4}$, ' +
                     'suy ra $P = ' + (3 * a / 4) + ' + ' + b + ' = ' + (3 * a / 4 + b) + '$.' };
    },
    /* sin 45 nhân côsin 45 */
    function () {
      var a = 2 * ri(4, 45), b = ri(5, 60);
      return { bt: a + '\\sin 45^\\circ \\cos 45^\\circ + ' + b, dap: a / 2 + b,
               giai: '$\\sin 45^\\circ = \\cos 45^\\circ = \\dfrac{\\sqrt{2}}{2}$ nên tích bằng $\\dfrac{1}{2}$, ' +
                     'suy ra $P = ' + (a / 2) + ' + ' + b + ' = ' + (a / 2 + b) + '$.' };
    },
    /* Bình phương của côsin 30 và sin 30 */
    function () {
      var a = 4 * ri(3, 24), b = 4 * ri(3, 24);
      return { bt: a + '\\cos^2 30^\\circ + ' + b + '\\sin^2 30^\\circ', dap: (3 * a + b) / 4,
               giai: '$\\cos^2 30^\\circ = \\dfrac{3}{4}$, $\\sin^2 30^\\circ = \\dfrac{1}{4}$ nên $P = ' +
                     (3 * a / 4) + ' + ' + (b / 4) + ' = ' + ((3 * a + b) / 4) + '$.' };
    },
    /* Bình phương của sin 120 độ */
    function () {
      var a = 4 * ri(3, 24), b = ri(5, 60);
      return { bt: a + '\\sin^2 120^\\circ + ' + b, dap: 3 * a / 4 + b,
               giai: '$\\sin 120^\\circ = \\dfrac{\\sqrt{3}}{2}$ nên $\\sin^2 120^\\circ = \\dfrac{3}{4}$, ' +
                     'suy ra $P = ' + (3 * a / 4) + ' + ' + b + ' = ' + (3 * a / 4 + b) + '$.' };
    },
    /* tang và côtang của góc 135 độ, cả hai bằng -1 */
    function () {
      var a = ri(5, 45), b = ri(5, 45), c = ri(70, 240);
      return { bt: a + '\\tan 135^\\circ + ' + b + '\\cot 135^\\circ + ' + c, dap: c - a - b,
               giai: '$\\tan 135^\\circ = \\cot 135^\\circ = -1$ nên $P = ' + c + ' - ' + a +
                     ' - ' + b + ' = ' + (c - a - b) + '$.' };
    },
    /* Góc 180 độ */
    function () {
      var a = ri(5, 60), b = ri(5, 60), c = ri(80, 260);
      return { bt: a + '\\cos 180^\\circ + ' + b + '\\sin 180^\\circ + ' + c, dap: c - a,
               giai: '$\\cos 180^\\circ = -1$, $\\sin 180^\\circ = 0$ nên $P = ' + c + ' - ' + a +
                     ' = ' + (c - a) + '$.' };
    },
    /* Chia cho côsin 60 độ */
    function () {
      var a = ri(10, 90), b = ri(5, 60);
      return { bt: '\\dfrac{' + a + '}{\\cos 60^\\circ} - ' + b, dap: 2 * a - b,
               giai: '$\\cos 60^\\circ = \\dfrac{1}{2}$ nên $\\dfrac{' + a + '}{\\cos 60^\\circ} = ' +
                     (2 * a) + '$, suy ra $P = ' + (2 * a - b) + '$.' };
    }
  ];

  function tlnCau2() {
    return raTLN('tln-luonggiac', function () {
      var q = chon(LG_TLN)();
      return { muc: 1, de: 'Tính giá trị của biểu thức $P = ' + q.bt + '$.',
               dap: q.dap, giai: q.giai };
    });
  }

  /* ============================================================
     CÂU 3 — DIỆN TÍCH TAM GIÁC
     Năm công thức diện tích đã học, mỗi lần dùng một công thức.
     Diện tích không ghi sẵn ở đâu cả, cứ tính lại bằng Heron rồi
     kiểm, nên không sợ chép nhầm bảng.
     ============================================================ */

  /* Diện tích theo Heron, trả về null nếu ba số không dựng được tam
     giác hoặc diện tích không phải số nguyên. */
  function heron(a, b, c) {
    if (a + b <= c || a + c <= b || b + c <= a) return null;
    var t = (a + b + c) * (b + c - a) * (a + c - b) * (a + b - c) / 16;
    var S = Math.round(Math.sqrt(t));
    return (S * S === t) ? S : null;
  }

  /* Bộ ba cạnh nguyên dựng được tam giác có diện tích nguyên */
  var CANH_NGUYEN = [
    [3, 4, 5], [5, 12, 13], [6, 8, 10], [9, 12, 15], [8, 15, 17], [7, 24, 25],
    [20, 21, 29], [13, 14, 15], [10, 13, 13], [5, 5, 6], [5, 5, 8], [9, 10, 17],
    [4, 13, 15], [11, 13, 20], [7, 15, 20], [6, 25, 29], [13, 20, 21],
    [12, 16, 20], [10, 17, 21], [16, 25, 39]
  ];

  /* Một tam giác cạnh nguyên, diện tích nguyên, kèm nửa chu vi p và
     hai bán kính r, R khi chúng cũng nguyên (không nguyên thì để null). */
  function tamGiacDep() {
    var t = chon(CANH_NGUYEN), k = chon([1, 1, 2, 2, 3]);
    var a = t[0] * k, b = t[1] * k, c = t[2] * k, S = heron(a, b, c);
    if (S === null) return null;
    var tong = a + b + c, chan = (tong % 2 === 0), p = tong / 2;
    return { a: a, b: b, c: c, S: S,
             p: chan ? p : null,
             r: (chan && S % p === 0) ? S / p : null,
             R: ((a * b * c) % (4 * S) === 0) ? (a * b * c) / (4 * S) : null };
  }

  var DT_TLN = [
    /* S = một phần hai cạnh đáy nhân đường cao */
    function () {
      var a = ri(6, 48), h = ri(5, 44);
      if ((a * h) % 2 !== 0) return null;
      return { de: 'Tam giác $ABC$ có $BC = ' + a + '$ và đường cao $AH$ ứng với cạnh $BC$ ' +
                   'bằng $' + h + '$. Tính diện tích tam giác $ABC$.',
               dap: a * h / 2,
               giai: '$S = \\dfrac{1}{2} \\cdot BC \\cdot AH = \\dfrac{1}{2} \\cdot ' + a +
                     ' \\cdot ' + h + ' = ' + (a * h / 2) + '$.' };
    },
    /* S = một phần hai tích hai cạnh nhân sin góc xen giữa */
    function () {
      var g = chon([30, 90, 150]), b = ri(4, 30), c = ri(4, 30);
      var S = (g === 90) ? b * c / 2 : b * c / 4;
      if (S !== Math.floor(S)) return null;
      var sin = (g === 90) ? '1' : '\\dfrac{1}{2}';
      return { de: 'Tam giác $ABC$ có $AB = ' + b + '$, $AC = ' + c + '$ và $\\widehat{A} = ' +
                   g + '^\\circ$. Tính diện tích tam giác $ABC$.',
               dap: S,
               giai: '$S = \\dfrac{1}{2} \\cdot AB \\cdot AC \\cdot \\sin A = \\dfrac{1}{2} \\cdot ' +
                     b + ' \\cdot ' + c + ' \\cdot ' + sin + ' = ' + S + '$.' };
    },
    /* Công thức Heron, đề cho đủ ba cạnh */
    function () {
      var t = tamGiacDep();
      if (!t || t.p === null) return null;
      return { de: 'Tam giác $ABC$ có $AB = ' + t.a + '$, $BC = ' + t.b + '$, $CA = ' + t.c +
                   '$. Tính diện tích tam giác $ABC$.',
               dap: t.S,
               giai: 'Nửa chu vi $p = ' + t.p + '$, theo công thức Heron $S = \\sqrt{p(p-a)(p-b)(p-c)} = ' +
                     t.S + '$.' };
    },
    /* S = nửa chu vi nhân bán kính đường tròn nội tiếp */
    function () {
      var t = tamGiacDep();
      if (!t || t.r === null) return null;
      return { de: 'Tam giác $ABC$ có nửa chu vi $p = ' + t.p +
                   '$ và bán kính đường tròn nội tiếp $r = ' + t.r +
                   '$. Tính diện tích tam giác $ABC$.',
               dap: t.S,
               giai: '$S = p \\cdot r = ' + t.p + ' \\cdot ' + t.r + ' = ' + t.S + '$.' };
    },
    /* S = tích ba cạnh chia cho bốn lần bán kính đường tròn ngoại tiếp */
    function () {
      var t = tamGiacDep();
      if (!t || t.R === null) return null;
      return { de: 'Tam giác $ABC$ có $AB = ' + t.a + '$, $BC = ' + t.b + '$, $CA = ' + t.c +
                   '$ và bán kính đường tròn ngoại tiếp $R = ' + t.R +
                   '$. Tính diện tích tam giác $ABC$.',
               dap: t.S,
               giai: '$S = \\dfrac{abc}{4R} = \\dfrac{' + t.a + ' \\cdot ' + t.b + ' \\cdot ' +
                     t.c + '}{4 \\cdot ' + t.R + '} = ' + t.S + '$.' };
    }
  ];

  function tlnCau3() {
    return raTLN('tln-dientich', function () {
      var q = chon(DT_TLN)();
      if (!q) return null;
      return { muc: 2, de: q.de, dap: q.dap, giai: q.giai };
    });
  }

  /* ============================================================
     CÂU 4 — BÀI TOÁN THỰC TẾ, BẤT PHƯƠNG TRÌNH BẬC NHẤT HAI ẨN
     Dựng bài từ chỗ tối ưu đi ngược ra: chọn trước điểm M(m; n) rồi
     mới viết hai ràng buộc đi qua đó. Hệ số chọn sao cho mọi đỉnh
     của miền nghiệm đều có toạ độ nguyên:
         ràng buộc 1:   x  + b1 y   với b1 là một ước của m,
         ràng buộc 2:  a2 x +   y   với a2 là một ước của n,
     khi ấy hai giao điểm với trục toạ độ đều nguyên, còn M là giao
     của hai đường.

     Hàm mục tiêu là $F = px + qy$. Trên một đa giác, giá trị lớn
     nhất và nhỏ nhất của $F$ đều rơi vào đỉnh, nên chỉ cần so $F$ ở
     các đỉnh. Bốc p, q cho tới khi M hơn hẳn mọi đỉnh còn lại, nhờ
     thế đáp án là duy nhất, không có chỗ nào mập mờ.
     ============================================================ */

  function dungQHTT(timMax) {
    var m = ri(3, 10), n = ri(3, 10);
    var b1 = chon(uoc(m)), a2 = chon(uoc(n));
    if (b1 * a2 === 1) return null;                  /* hai đường song song */
    var c1 = m + b1 * n, c2 = a2 * m + n;
    var p = ri(2, 12), q = ri(2, 12);
    var F = function (d) { return p * d[0] + q * d[1]; };
    var tot = F([m, n]), dinh, i;

    if (timMax) {
      /* Miền nghiệm là tứ giác, hai đỉnh nằm trên hai trục toạ độ */
      dinh = [[0, 0], [Math.min(c1, c2 / a2), 0], [0, Math.min(c1 / b1, c2)]];
    } else {
      /* Miền nghiệm không bị chặn, nhưng chi phí tăng theo cả hai ẩn
         nên giá trị nhỏ nhất vẫn rơi vào một trong các đỉnh */
      dinh = [[Math.max(c1, c2 / a2), 0], [0, Math.max(c1 / b1, c2)]];
    }
    for (i = 0; i < dinh.length; i++) {
      if (dinh[i][0] !== Math.floor(dinh[i][0]) || dinh[i][1] !== Math.floor(dinh[i][1]))
        return null;
      if (timMax ? F(dinh[i]) >= tot : F(dinh[i]) <= tot) return null;
    }
    return { m: m, n: n, b1: b1, a2: a2, c1: c1, c2: c2, p: p, q: q, F: tot };
  }

  /* Lời giải chung cho cả ba câu chuyện, chỉ khác tên hai ẩn */
  function giaiQHTT(o, tenX, tenY, timMax) {
    return 'Gọi $x$ là ' + tenX + ', $y$ là ' + tenY + '. Miền nghiệm của hệ bất phương trình ' +
           'có đỉnh $(' + o.m + ';\\,' + o.n + ')$, tại đó đạt giá trị ' +
           (timMax ? 'lớn' : 'nhỏ') + ' nhất $' + o.p + ' \\cdot ' + o.m + ' + ' +
           o.q + ' \\cdot ' + o.n + ' = ' + o.F + '$.';
  }

  var QHTT_TLN = [
    /* Xưởng sản xuất, tìm tiền lãi lớn nhất */
    function () {
      var o = dungQHTT(true);
      if (!o) return null;
      return { de: 'Một xưởng sản xuất hai loại sản phẩm. Làm một sản phẩm loại I cần $1$ kg ' +
                   'nguyên liệu và $' + o.a2 + '$ giờ máy, làm một sản phẩm loại II cần $' + o.b1 +
                   '$ kg nguyên liệu và $1$ giờ máy. Xưởng có $' + o.c1 + '$ kg nguyên liệu và $' +
                   o.c2 + '$ giờ máy. Tiền lãi của một sản phẩm loại I là $' + o.p +
                   '$ triệu đồng, của một sản phẩm loại II là $' + o.q +
                   '$ triệu đồng. Hỏi tiền lãi lớn nhất xưởng thu được là bao nhiêu triệu đồng?',
               dap: o.F,
               giai: giaiQHTT(o, 'số sản phẩm loại I', 'số sản phẩm loại II', true) };
    },
    /* Trồng trọt, tìm tiền lãi lớn nhất */
    function () {
      var o = dungQHTT(true);
      if (!o) return null;
      return { de: 'Một bác nông dân trồng hai loại cây. Trồng một sào cây loại I cần $1$ ngày ' +
                   'công và $' + o.a2 + '$ kg phân bón, trồng một sào cây loại II cần $' + o.b1 +
                   '$ ngày công và $1$ kg phân bón. Bác có $' + o.c1 + '$ ngày công và $' + o.c2 +
                   '$ kg phân bón. Mỗi sào cây loại I cho lãi $' + o.p +
                   '$ triệu đồng, mỗi sào cây loại II cho lãi $' + o.q +
                   '$ triệu đồng. Hỏi bác thu được tiền lãi lớn nhất là bao nhiêu triệu đồng?',
               dap: o.F,
               giai: giaiQHTT(o, 'số sào cây loại I', 'số sào cây loại II', true) };
    },
    /* Khẩu phần thức ăn, tìm chi phí nhỏ nhất */
    function () {
      var o = dungQHTT(false);
      if (!o) return null;
      return { de: 'Mỗi ngày một trại chăn nuôi cần ít nhất $' + o.c1 + '$ đơn vị chất đạm và ' +
                   'ít nhất $' + o.c2 + '$ đơn vị chất béo. Mỗi ki-lô-gam thức ăn loại I chứa $1$ ' +
                   'đơn vị chất đạm và $' + o.a2 + '$ đơn vị chất béo, mỗi ki-lô-gam thức ăn loại II ' +
                   'chứa $' + o.b1 + '$ đơn vị chất đạm và $1$ đơn vị chất béo. Giá một ki-lô-gam ' +
                   'thức ăn loại I là $' + o.p + '$ nghìn đồng, loại II là $' + o.q +
                   '$ nghìn đồng. Hỏi chi phí thức ăn ít nhất mỗi ngày là bao nhiêu nghìn đồng?',
               dap: o.F,
               giai: giaiQHTT(o, 'số ki-lô-gam thức ăn loại I', 'số ki-lô-gam thức ăn loại II', false) };
    }
  ];

  function tlnCau4() {
    return raTLN('tln-thucte', function () {
      var q = chon(QHTT_TLN)();
      if (!q) return null;
      return { muc: 3, de: q.de, dap: q.dap, giai: q.giai };
    });
  }

  /* Bốn câu trả lời ngắn, đúng thứ tự ghi trong deCoDinh ở data.js */
  var OT1_TLN = [tlnCau1, tlnCau2, tlnCau3, tlnCau4];

  /* ============================================================
     Bảng mẫu theo chương và theo dạng
     ============================================================ */
  var MAU = {
    101: { tracnghiem: OT1_TN, dungsai: OT1_DS, traloingan: OT1_TLN },
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
