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
    nhieu.forEach(function (x) { if (r.length < 4 && r.indexOf(x) === -1) r.push(x); });
    var k = 1;
    while (r.length < 4) { var t = dung + ' '.repeat(k); r.push(t); k++; }
    return r;
  }
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

    // 1. Phủ định mệnh đề với mọi
    function () {
      var a = ri(1, 9);
      return { muc: 1,
        de: 'Phủ định của mệnh đề $\\forall x \\in \\mathbb{R},\\ x^2 + ' + a + ' \\gt 0$ là',
        dapan: bon(
          '$\\exists x \\in \\mathbb{R},\\ x^2 + ' + a + ' \\le 0$',
          ['$\\forall x \\in \\mathbb{R},\\ x^2 + ' + a + ' \\le 0$',
           '$\\exists x \\in \\mathbb{R},\\ x^2 + ' + a + ' \\gt 0$',
           '$\\forall x \\in \\mathbb{R},\\ x^2 + ' + a + ' \\lt 0$']),
        dung: 0,
        giai: 'Đổi $\\forall$ thành $\\exists$ rồi phủ định bất đẳng thức, $\\gt$ thành $\\le$.' };
    },

    // 2. Phủ định mệnh đề với tồn tại
    function () {
      var a = ri(2, 9);
      return { muc: 1,
        de: 'Phủ định của mệnh đề $\\exists n \\in \\mathbb{N},\\ n^2 = ' + a + '$ là',
        dapan: bon(
          '$\\forall n \\in \\mathbb{N},\\ n^2 \\ne ' + a + '$',
          ['$\\exists n \\in \\mathbb{N},\\ n^2 \\ne ' + a + '$',
           '$\\forall n \\in \\mathbb{N},\\ n^2 = ' + a + '$',
           '$\\exists n \\in \\mathbb{N},\\ n^2 \\gt ' + a + '$']),
        dung: 0,
        giai: 'Đổi $\\exists$ thành $\\forall$ rồi phủ định đẳng thức.' };
    },

    // 3. Hiệu hai tập hợp liệt kê
    function () {
      var m = ri(5, 9), k = ri(3, m - 1), n = ri(m, m + 3);
      var A = day(1, m), B = day(k, n);
      return { muc: 2,
        de: 'Cho $A = ' + tap(A) + '$ và $B = ' + tap(B) + '$. Tập $A \\setminus B$ bằng',
        dapan: bon(
          '$' + tap(day(1, k - 1)) + '$',
          ['$' + tap(day(k, m)) + '$',
           '$' + tap(day(m + 1, n)) + '$',
           '$' + tap(day(1, m)) + '$']),
        dung: 0,
        giai: '$A \\setminus B$ gồm các phần tử thuộc $A$ nhưng không thuộc $B$, tức từ $1$ đến $' + (k - 1) + '$.' };
    },

    // 4. Số phần tử của giao
    function () {
      var m = ri(6, 10), k = ri(3, m - 2), n = ri(m + 1, m + 4);
      return { muc: 2,
        de: 'Cho $A = ' + tap(day(1, m)) + '$ và $B = ' + tap(day(k, n)) +
            '$. Tập $A \\cap B$ có bao nhiêu phần tử?',
        dapan: bon(String(m - k + 1), [String(m - k), String(n - k + 1), String(m)]),
        dung: 0,
        giai: 'Phần chung là các số từ $' + k + '$ đến $' + m + '$, tất cả $' + (m - k + 1) + '$ số.' };
    },

    // 5. Giao hai nửa khoảng
    function () {
      var a = ri(-5, 0), c = ri(a + 1, a + 3), b = ri(c + 1, c + 4), d = ri(b + 1, b + 4);
      return { muc: 2,
        de: 'Cho $A = [' + a + ';' + b + ')$ và $B = (' + c + ';' + d + ']$. Khi đó $A \\cap B$ bằng',
        dapan: bon(
          '$(' + c + ';' + b + ')$',
          ['$[' + a + ';' + d + ']$', '$[' + a + ';' + c + ']$', '$[' + b + ';' + d + ']$']),
        dung: 0,
        giai: 'Giao là phần chung, lấy từ $' + c + '$ không kể đến $' + b + '$ không kể.' };
    },

    // 6. Hợp hai nửa khoảng
    function () {
      var a = ri(-6, -1), c = ri(a + 1, a + 3), b = ri(c + 1, c + 3), d = ri(b + 1, b + 5);
      return { muc: 2,
        de: 'Cho $A = [' + a + ';' + b + ']$ và $B = (' + c + ';' + d + ')$. Khi đó $A \\cup B$ bằng',
        dapan: bon(
          '$[' + a + ';' + d + ')$',
          ['$(' + a + ';' + d + ']$', '$(' + c + ';' + b + ')$', '$[' + a + ';' + d + ']$']),
        dung: 0,
        giai: 'Hợp lấy toàn bộ hai tập, mút trái là $' + a + '$ có lấy, mút phải là $' + d + '$ không lấy.' };
    },

    // 7. Số tập con
    function () {
      var n = ri(3, 6);
      var A = ['a', 'b', 'c', 'd', 'e', 'f'].slice(0, n);
      return { muc: 1,
        de: 'Tập hợp $' + tap(A) + '$ có bao nhiêu tập con?',
        dapan: bon(String(soTapCon(n)), [String(n), String(2 * n), String(soTapCon(n) - 1)]),
        dung: 0,
        giai: 'Tập có $n$ phần tử thì có $2^n$ tập con, ở đây $2^{' + n + '} = ' + soTapCon(n) + '$.' };
    },

    // 8. Số tập con có đúng k phần tử
    function () {
      var n = ri(4, 7), k = ri(2, 3);
      return { muc: 2,
        de: 'Một tập hợp có $' + n + '$ phần tử thì có bao nhiêu tập con gồm đúng $' + k + '$ phần tử?',
        dapan: bon(String(toHop(n, k)),
                   [String(toHop(n, k - 1)), String(n * k), String(soTapCon(n))]),
        dung: 0,
        giai: 'Chọn $' + k + '$ trong $' + n + '$ phần tử, có $C_{' + n + '}^{' + k + '} = ' + toHop(n, k) + '$ cách.' };
    },

    // 9. Số ước của một số
    function () {
      var n = chon([12, 18, 20, 24, 28, 30, 36, 40, 42, 45, 48, 54, 60]);
      var u = uoc(n);
      return { muc: 2,
        de: 'Tập hợp $X = \\{x \\in \\mathbb{N} \\mid x$ là ước của $' + n + '\\}$ có bao nhiêu phần tử?',
        dapan: bon(String(u.length), [String(u.length - 1), String(u.length + 1), String(Math.round(n / 2))]),
        dung: 0,
        giai: 'Các ước của $' + n + '$ là $' + u.join(', ') + '$, tất cả $' + u.length + '$ số.' };
    },

    // 10. Đếm số nguyên trong nửa khoảng
    function () {
      var a = ri(-6, 2), b = ri(a + 3, a + 9);
      return { muc: 2,
        de: 'Có bao nhiêu số nguyên thuộc nửa khoảng $[' + a + ';' + b + ')$?',
        dapan: bon(String(b - a), [String(b - a + 1), String(b - a - 1), String(b + a)]),
        dung: 0,
        giai: 'Các số nguyên từ $' + a + '$ đến $' + (b - 1) + '$, tất cả $' + (b - a) + '$ số.' };
    },

    // 11. Bài toán hai tập hợp
    function () {
      var c = ri(5, 12), a = ri(c + 3, c + 14), b = ri(c + 2, c + 12);
      var N = ri(a + b - c + 2, a + b - c + 12);
      return { muc: 3,
        de: 'Lớp có ' + N + ' học sinh, trong đó ' + a + ' em giỏi Toán, ' + b +
            ' em giỏi Văn và ' + c + ' em giỏi cả hai môn. Có bao nhiêu em giỏi ít nhất một môn?',
        dapan: bon(String(a + b - c), [String(a + b), String(a + b + c), String(N - c)]),
        dung: 0,
        giai: '$' + a + ' + ' + b + ' - ' + c + ' = ' + (a + b - c) + '$ em.' };
    },

    // 12. Tập nghiệm phương trình bậc hai
    function () {
      var p = ri(1, 6), q = ri(p + 1, p + 6);
      return { muc: 2,
        de: 'Cho $A = \\{x \\in \\mathbb{R} \\mid x^2 - ' + (p + q) + 'x + ' + (p * q) + ' = 0\\}$. Khi đó $A$ bằng',
        dapan: bon('$' + tap([p, q]) + '$',
                   ['$' + tap([-p, -q]) + '$', '$' + tap([p]) + '$', '$\\emptyset$']),
        dung: 0,
        giai: 'Phương trình có hai nghiệm $' + p + '$ và $' + q + '$ vì tổng bằng $' +
              (p + q) + '$ và tích bằng $' + (p * q) + '$.' };
    },

    // 13. Mệnh đề kéo theo và mệnh đề đảo
    function () {
      var b = chon([2, 3, 5]), h = chon([2, 3, 4]), a = b * h;
      return { muc: 3,
        de: 'Xét mệnh đề “Nếu $n$ chia hết cho $' + a + '$ thì $n$ chia hết cho $' + b + '$”. Khẳng định nào đúng?',
        dapan: bon(
          'Mệnh đề đúng, mệnh đề đảo sai',
          ['Mệnh đề sai, mệnh đề đảo đúng', 'Cả hai đều đúng', 'Cả hai đều sai']),
        dung: 0,
        giai: '$' + a + '$ chia hết cho $' + b + '$ nên mệnh đề đúng. Ngược lại $n = ' + b +
              '$ chia hết cho $' + b + '$ nhưng không chia hết cho $' + a + '$.' };
    },

    // 14. Tập hợp cho bằng tính chất đặc trưng
    function () {
      var n = ri(4, 12);
      return { muc: 1,
        de: 'Tập hợp $\\{x \\in \\mathbb{N} \\mid x \\le ' + n + '\\}$ có bao nhiêu phần tử?',
        dapan: bon(String(n + 1), [String(n), String(n - 1), String(2 * n)]),
        dung: 0,
        giai: 'Gồm các số từ $0$ đến $' + n + '$, tất cả $' + (n + 1) + '$ số vì $\\mathbb{N}$ có số $0$.' };
    }
  ];

  var C1_DS = [

    // 1. Phép toán trên hai tập liệt kê
    function () {
      var m = ri(5, 8), k = ri(3, m - 1), n = ri(m + 1, m + 3);
      var A = day(1, m), B = day(k, n);
      var hop = day(1, n), giao = day(k, m);
      return { muc: 2,
        de: 'Cho $A = ' + tap(A) + '$ và $B = ' + tap(B) + '$.',
        y: ['$A \\cap B = ' + tap(giao) + '$',
            '$A \\cup B$ có $' + (n) + '$ phần tử',
            '$A \\setminus B = ' + tap(day(1, k - 1)) + '$',
            '$B \\subset A$'],
        dung: [true, true, true, false],
        giai: '$' + n + ' \\in B$ nhưng không thuộc $A$ nên $B$ không là tập con của $A$.' };
    },

    // 2. Hai nửa khoảng
    function () {
      var a = ri(-5, -1), c = ri(a + 1, a + 3), b = ri(c + 1, c + 3), d = ri(b + 1, b + 4);
      return { muc: 2,
        de: 'Cho $A = [' + a + ';' + b + ')$ và $B = (' + c + ';' + d + ']$.',
        y: ['$A \\cap B = (' + c + ';' + b + ')$',
            '$A \\cup B = [' + a + ';' + d + ']$',
            '$A \\setminus B = [' + a + ';' + c + ']$',
            '$B \\setminus A = (' + b + ';' + d + ']$'],
        dung: [true, true, true, false],
        giai: '$B \\setminus A = [' + b + ';' + d + ']$ vì điểm $' + b + '$ không thuộc $A$ nên vẫn còn lại.' };
    },

    // 3. Mệnh đề có lượng từ
    function () {
      var a = ri(1, 9);
      return { muc: 2,
        de: 'Xét tính đúng sai của các mệnh đề sau.',
        y: ['$\\forall x \\in \\mathbb{R},\\ x^2 + ' + a + ' \\gt 0$',
            '$\\exists x \\in \\mathbb{R},\\ x^2 = ' + (a * a) + '$',
            '$\\forall n \\in \\mathbb{N},\\ n^2 \\ge n$',
            '$\\forall x \\in \\mathbb{R},\\ x^2 \\gt x$'],
        dung: [true, true, true, false],
        giai: 'Với $x = 0{,}5$ ta có $x^2 = 0{,}25 \\lt 0{,}5$ nên ý d) sai.' };
    },

    // 4. Tập con
    function () {
      var n = ri(3, 5);
      var A = ['a', 'b', 'c', 'd', 'e'].slice(0, n);
      return { muc: 2,
        de: 'Cho tập hợp $' + tap(A) + '$.',
        y: ['Tập này có $' + soTapCon(n) + '$ tập con',
            'Có $' + n + '$ tập con gồm đúng một phần tử',
            'Có $' + toHop(n, 2) + '$ tập con gồm đúng hai phần tử',
            'Có $' + soTapCon(n) + '$ tập con khác rỗng'],
        dung: [true, true, true, false],
        giai: 'Bỏ tập rỗng đi thì chỉ còn $' + (soTapCon(n) - 1) + '$ tập con khác rỗng.' };
    },

    // 5. Bài toán hai tập hợp
    function () {
      var c = ri(4, 10), a = ri(c + 4, c + 12), b = ri(c + 3, c + 10);
      var N = ri(a + b - c + 3, a + b - c + 10);
      return { muc: 3,
        de: 'Lớp có ' + N + ' học sinh, ' + a + ' em giỏi Toán, ' + b +
            ' em giỏi Anh và ' + c + ' em giỏi cả hai môn.',
        y: ['Số em giỏi ít nhất một môn là $' + (a + b - c) + '$',
            'Số em không giỏi môn nào là $' + (N - a - b + c) + '$',
            'Số em chỉ giỏi Toán là $' + (a - c) + '$',
            'Số em chỉ giỏi Anh là $' + b + '$'],
        dung: [true, true, true, false],
        giai: 'Số em chỉ giỏi Anh là $' + b + ' - ' + c + ' = ' + (b - c) + '$.' };
    }
  ];

  var C1_TLN = [
    function () {
      var m = ri(5, 9), k = ri(3, m - 1), n = ri(m + 1, m + 4);
      return { muc: 1,
        de: 'Cho $A = ' + tap(day(1, m)) + '$ và $B = ' + tap(day(k, n)) +
            '$. Tập $A \\cup B$ có bao nhiêu phần tử?',
        dapan: String(n), giai: 'Hợp gồm các số từ $1$ đến $' + n + '$.' };
    },
    function () {
      var m = ri(6, 10), k = ri(3, m - 2), n = ri(m + 1, m + 4);
      return { muc: 1,
        de: 'Cho $A = ' + tap(day(1, m)) + '$ và $B = ' + tap(day(k, n)) +
            '$. Tập $A \\cap B$ có bao nhiêu phần tử?',
        dapan: String(m - k + 1), giai: 'Phần chung là từ $' + k + '$ đến $' + m + '$.' };
    },
    function () {
      var n = ri(3, 7);
      return { muc: 1,
        de: 'Một tập hợp có $' + n + '$ phần tử thì có bao nhiêu tập con?',
        dapan: String(soTapCon(n)), giai: '$2^{' + n + '} = ' + soTapCon(n) + '$.' };
    },
    function () {
      var n = ri(5, 8), k = ri(2, 3);
      return { muc: 2,
        de: 'Một tập hợp có $' + n + '$ phần tử thì có bao nhiêu tập con gồm đúng $' + k + '$ phần tử?',
        dapan: String(toHop(n, k)),
        giai: '$C_{' + n + '}^{' + k + '} = ' + toHop(n, k) + '$.' };
    },
    function () {
      var a = ri(-7, 1), b = ri(a + 4, a + 11);
      return { muc: 2,
        de: 'Có bao nhiêu số nguyên thuộc đoạn $[' + a + ';' + b + ']$?',
        dapan: String(b - a + 1), giai: 'Từ $' + a + '$ đến $' + b + '$, tất cả $' + (b - a + 1) + '$ số.' };
    },
    function () {
      var c = ri(5, 12), a = ri(c + 4, c + 14), b = ri(c + 3, c + 12);
      var N = ri(a + b - c + 2, a + b - c + 12);
      return { muc: 3,
        de: 'Lớp có ' + N + ' học sinh, ' + a + ' em giỏi Toán, ' + b + ' em giỏi Lí, ' +
            c + ' em giỏi cả hai. Có bao nhiêu em không giỏi môn nào?',
        dapan: String(N - a - b + c),
        giai: 'Giỏi ít nhất một môn là $' + (a + b - c) + '$, còn lại $' + (N - a - b + c) + '$ em.' };
    },
    function () {
      var p = ri(1, 7), q = ri(p + 1, p + 7);
      return { muc: 2,
        de: 'Cho $A = \\{x \\in \\mathbb{R} \\mid x^2 - ' + (p + q) + 'x + ' + (p * q) +
            ' = 0\\}$. Tổng các phần tử của $A$ bằng bao nhiêu?',
        dapan: String(p + q), giai: 'Hai nghiệm là $' + p + '$ và $' + q + '$.' };
    },
    function () {
      var n = chon([12, 18, 20, 24, 28, 30, 36, 40, 45, 48, 60]);
      return { muc: 2,
        de: 'Số $' + n + '$ có bao nhiêu ước tự nhiên?',
        dapan: String(uoc(n).length), giai: 'Các ước là $' + uoc(n).join(', ') + '$.' };
    }
  ];

  /* ============================================================
     Bảng mẫu theo chương và theo dạng
     ============================================================ */
  var MAU = {
    1: { tracnghiem: C1_TN, dungsai: C1_DS, traloingan: C1_TLN }
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
