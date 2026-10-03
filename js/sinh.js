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
        return { muc: 1,
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
      return { muc: 1,
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
        return { muc: 1,
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
      return { muc: 1,
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

    // 3. Hiệu hai tập hợp liệt kê
    function () {
      var m = ri(5, 9), k = ri(3, m - 1), n = ri(m, m + 3);
      var A = day(1, m), B = day(k, n);
      return { muc: 2,
        de: 'Cho $A = ' + tap(A) + '$ và $B = ' + tap(B) + '$. ' +
            'Tập hợp gồm các phần tử thuộc $A$ nhưng không thuộc $B$ là',
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



    // 9. Số ước của một số
    function () {
      var n = chon([12, 18, 20, 24, 28, 30, 36, 40, 42, 45, 48, 54, 60]);
      var u = uoc(n);
      return { muc: 2,
        de: 'Số $' + n + '$ có bao nhiêu ước là số tự nhiên?',
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
        de: 'Tập nghiệm của phương trình $x^2 - ' + (p + q) + 'x + ' + (p * q) + ' = 0$ là',
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
        de: 'Có bao nhiêu số tự nhiên nhỏ hơn hoặc bằng $' + n + '$?',
        dapan: bon(String(n + 1), [String(n), String(n - 1), String(2 * n)]),
        dung: 0,
        giai: 'Gồm các số từ $0$ đến $' + n + '$, tất cả $' + (n + 1) + '$ số vì $\\mathbb{N}$ có số $0$.' };
    },

    // Thuộc hay không thuộc một tập hợp
    function () {
      var A = [], seen = {};
      while (A.length < 5) { var v = ri(1, 20); if (!seen[v]) { seen[v] = 1; A.push(v); } }
      A.sort(function (x, y) { return x - y; });
      var trong = chon(A), ngoai = ri(21, 35);
      return { muc: 1,
        de: 'Cho tập hợp $A = ' + tap(A) + '$. Khẳng định nào sau đây đúng?',
        dapan: bon('$' + trong + ' \\in A$',
                   ['$' + ngoai + ' \\in A$',
                    '$\\{' + trong + '\\} \\in A$',
                    '$' + trong + ' \\subset A$']),
        dung: 0,
        giai: '$' + trong + '$ là một phần tử của $A$ nên viết $\\in$. Còn $\\{' + trong +
              '\\}$ là tập con, phải viết $\\subset$.' };
    },

    // Số nào là số tự nhiên
    function () {
      var a = ri(2, 20), b = ri(2, 9), c = ri(2, 9), d = chon([2, 3, 5, 6, 7, 8, 10]);
      return { muc: 1,
        de: 'Số nào sau đây là số tự nhiên?',
        dapan: bon('$' + a + '$',
                   ['$-' + b + '$', '$\\dfrac{' + b + '}{' + (b + c) + '}$', '$\\sqrt{' + d + '}$']),
        dung: 0,
        giai: 'Số tự nhiên là $0, 1, 2, 3, \\ldots$ Số âm, phân số và căn không chính phương đều không phải.' };
    },

    // Khẳng định sai về các tập hợp số
    function () {
      var a = ri(1, 9), b = ri(2, 9), c = chon([2, 3, 5, 6, 7, 8, 10]);
      return { muc: 2,
        de: 'Khẳng định nào sau đây <strong>sai</strong>?',
        dapan: kyHieu()
          ? bon('$\\sqrt{' + c + '} \\in \\mathbb{Q}$',
                ['$-' + a + ' \\in \\mathbb{Z}$', '$0 \\in \\mathbb{N}$',
                 '$\\dfrac{' + a + '}{' + b + '} \\in \\mathbb{Q}$'])
          : bon('$\\sqrt{' + c + '}$ là số hữu tỉ',
                ['$-' + a + '$ là số nguyên', '$0$ là số tự nhiên',
                 '$\\dfrac{' + a + '}{' + b + '}$ là số hữu tỉ']),
        dung: 0,
        giai: '$\\sqrt{' + c + '}$ là số vô tỉ nên không thuộc $\\mathbb{Q}$. Ba khẳng định kia đều đúng.' };
    },

    // Số nào thuộc nửa khoảng
    function () {
      var a = ri(-6, 2), b = ri(a + 4, a + 9);
      var trong = ri(a, b - 1);
      var ngoai = [b + ri(1, 4), a - ri(1, 4), b + ri(5, 9)];
      return { muc: 2,
        de: 'Số nào sau đây thuộc nửa khoảng $[' + a + ';' + b + ')$?',
        dapan: bon('$' + trong + '$', ngoai.map(function (x) { return '$' + x + '$'; })),
        dung: 0,
        giai: 'Nửa khoảng này gồm các số $x$ với $' + a + ' \\le x \\lt ' + b + '$.' };
    },

    // Quan hệ giữa các tập hợp số
    function () {
      return { muc: 1,
        de: 'Khẳng định nào sau đây đúng?',
        dapan: bon('Mọi số tự nhiên đều là số nguyên',
                   ['Mọi số nguyên đều là số tự nhiên',
                    'Mọi số thực đều là số hữu tỉ',
                    'Mọi số hữu tỉ đều là số nguyên']),
        dung: 0,
        giai: 'Số tự nhiên nằm trong số nguyên. Ngược lại thì không, ví dụ $-3$ là số nguyên nhưng không phải số tự nhiên.' };
    },

    // Mệnh đề chứa biến, thay giá trị cụ thể
    function () {
      var p = ri(1, 6), q = ri(p + 1, p + 6), x = chon([p, q]);
      return { muc: 1,
        de: 'Với $x = ' + x + '$, mệnh đề chứa biến “$x^2 - ' + (p + q) + 'x + ' + (p * q) +
            ' = 0$” trở thành',
        dapan: bon('mệnh đề đúng', ['mệnh đề sai', 'không phải mệnh đề', 'vẫn là mệnh đề chứa biến']),
        dung: 0,
        giai: 'Thay $x = ' + x + '$ vào được $0 = 0$, đẳng thức đúng.' };
    },

    // Điều kiện cần, điều kiện đủ
    function () {
      var b = chon([2, 3, 5]), h = chon([2, 3, 4]), a = b * h;
      return { muc: 2,
        de: '“Số tự nhiên $n$ chia hết cho $' + a + '$” là điều kiện gì của “$n$ chia hết cho $' + b + '$”?',
        dapan: bon('Điều kiện đủ', ['Điều kiện cần', 'Điều kiện cần và đủ', 'Không phải điều kiện nào']),
        dung: 0,
        giai: 'Chia hết cho $' + a + '$ thì chắc chắn chia hết cho $' + b +
              '$, nhưng ngược lại không đúng, ví dụ $n = ' + b + '$.' };
    },

    // Số phần tử của hợp khi biết giao
    function () {
      var c = ri(2, 8), a = ri(c + 2, c + 10), b = ri(c + 2, c + 10);
      return { muc: 2,
        de: 'Hai tập hợp $A$ và $B$ có $' + a + '$ và $' + b +
            '$ phần tử, phần chung có $' + c + '$ phần tử. Tập $A \\cup B$ có bao nhiêu phần tử?',
        dapan: bon(String(a + b - c), [String(a + b), String(a + b + c), String(Math.abs(a - b))]),
        dung: 0,
        giai: '$' + a + ' + ' + b + ' - ' + c + ' = ' + (a + b - c) + '$.' };
    },

    // Phần bù trong tập số thực
    function () {
      var a = ri(-5, 3), b = ri(a + 2, a + 7);
      return { muc: 3,
        de: 'Phần bù của nửa khoảng $[' + a + ';' + b + ')$ trong tập số thực là',
        dapan: bon('$(-\\infty;' + a + ') \\cup [' + b + ';+\\infty)$',
                   ['$(-\\infty;' + a + '] \\cup (' + b + ';+\\infty)$',
                    '$(' + a + ';' + b + ')$',
                    '$(-\\infty;' + b + ')$']),
        dung: 0,
        giai: 'Lấy mọi số không thuộc nửa khoảng. Vì $' + a + '$ thuộc nên bỏ ra, còn $' + b +
              '$ không thuộc nên lấy vào.' };
    },

    // Liệt kê tập cho bằng tính chất
    function () {
      var n = ri(4, 9);
      return { muc: 1,
        de: 'Viết tập hợp các số tự nhiên nhỏ hơn $' + n + '$ bằng cách liệt kê, ta được',
        dapan: bon('$' + tap(day(0, n - 1)) + '$',
                   ['$' + tap(day(1, n - 1)) + '$',
                    '$' + tap(day(0, n)) + '$',
                    '$' + tap(day(1, n)) + '$']),
        dung: 0,
        giai: 'Số tự nhiên bắt đầu từ $0$, nhỏ hơn $' + n + '$ nên dừng ở $' + (n - 1) + '$.' };
    },

    // Mệnh đề tương đương
    function () {
      var a = ri(2, 9);
      return { muc: 2,
        de: 'Mệnh đề nào sau đây tương đương với “$x^2 = ' + (a * a) + '$”?',
        dapan: bon('$x = ' + a + '$ hoặc $x = -' + a + '$',
                   ['$x = ' + a + '$', '$x = -' + a + '$', '$x = ' + (a * a) + '$']),
        dung: 0,
        giai: '$x^2 = ' + (a * a) + '$ cho hai nghiệm đối nhau là $' + a + '$ và $-' + a + '$.' };
    }

  ];

  var C1_DS = [
    function () {
      var a = ri(1, 9), b = ri(2, 9), c = chon([2, 3, 5, 6, 7, 8, 10]);
      return { muc: 2,
        de: 'Xét các khẳng định về tập hợp số.',
        y: ['$-' + a + '$ là số nguyên',
            '$0$ là số tự nhiên',
            '$\\dfrac{' + a + '}{' + b + '}$ là số hữu tỉ',
            '$\\sqrt{' + c + '}$ là số hữu tỉ'],
        dung: [true, true, true, false],
        giai: '$\\sqrt{' + c + '}$ là số vô tỉ nên không thuộc $\\mathbb{Q}$.' };
    },

    function () {
      var A = [], seen = {};
      while (A.length < 5) { var v = ri(1, 15); if (!seen[v]) { seen[v] = 1; A.push(v); } }
      A.sort(function (x, y) { return x - y; });
      var trong = chon(A), ngoai = ri(16, 25);
      return { muc: 1,
        de: 'Cho tập hợp $A = ' + tap(A) + '$.',
        y: ['$' + trong + ' \\in A$',
            '$' + ngoai + ' \\notin A$',
            '$\\{' + trong + '\\} \\subset A$',
            '$\\{' + trong + '\\} \\in A$'],
        dung: [true, true, true, false],
        giai: '$\\{' + trong + '\\}$ là một tập hợp nên quan hệ với $A$ phải là $\\subset$, không phải $\\in$.' };
    },


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
        y: kyHieu()
          ? ['$\\forall x \\in \\mathbb{R},\\ x^2 + ' + a + ' \\gt 0$',
             '$\\exists x \\in \\mathbb{R},\\ x^2 = ' + (a * a) + '$',
             '$\\forall n \\in \\mathbb{N},\\ n^2 \\ge n$',
             '$\\forall x \\in \\mathbb{R},\\ x^2 \\gt x$']
          : ['Với mọi số thực $x$, ta có $x^2 + ' + a + ' \\gt 0$',
             'Tồn tại số thực $x$ sao cho $x^2 = ' + (a * a) + '$',
             'Với mọi số tự nhiên $n$, ta có $n^2 \\ge n$',
             'Với mọi số thực $x$, ta có $x^2 \\gt x$'],
        dung: [true, true, true, false],
        giai: 'Với $x = 0{,}5$ ta có $x^2 = 0{,}25 \\lt 0{,}5$ nên ý d) sai.' };
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
      var ds = [], seen = {};
      while (ds.length < 6) {
        var v = chon([ri(-9, -1), ri(1, 15), 0]);
        if (!seen[v]) { seen[v] = 1; ds.push(v); }
      }
      var tn = ds.filter(function (x) { return x >= 0; }).length;
      return { muc: 1,
        de: 'Trong các số $' + ds.join(';\\, ') + '$, có bao nhiêu số tự nhiên?',
        dapan: String(tn),
        giai: 'Số tự nhiên là các số không âm, ở đây có $' + tn + '$ số.' };
    },

    function () {
      var a = ri(-8, 0), b = ri(a + 5, a + 12);
      var tn = b >= 0 ? b + 1 : 0;
      return { muc: 2,
        de: 'Có bao nhiêu số tự nhiên thuộc đoạn $[' + a + ';' + b + ']$?',
        dapan: String(tn),
        giai: 'Các số tự nhiên trong đoạn là $0, 1, \\ldots, ' + b + '$, tất cả $' + tn + '$ số.' };
    },

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
        de: 'Tổng hai nghiệm của phương trình $x^2 - ' + (p + q) + 'x + ' + (p * q) +
            ' = 0$ bằng bao nhiêu?',
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
     CHƯƠNG II — BẤT PHƯƠNG TRÌNH VÀ HỆ BPT BẬC NHẤT HAI ẨN
     ============================================================ */

  /* Sinh 4 điểm sao cho đúng một điểm thoả bất phương trình */
  function bonDiem(kt) {
    for (var lan = 0; lan < 300; lan++) {
      var d = [], seen = {};
      for (var i = 0; i < 60 && d.length < 4; i++) {
        var p = [ri(-3, 6), ri(-3, 6)], k = p[0] + ',' + p[1];
        if (!seen[k]) { seen[k] = 1; d.push(p); }
      }
      if (d.length < 4) continue;
      var ok = d.filter(kt);
      if (ok.length === 1) {
        var dung = ok[0];
        var con = d.filter(function (p) { return p !== dung; });
        return [dung].concat(con);
      }
    }
    return null;
  }
  function diem(p) { return '$(' + p[0] + ';\\,' + p[1] + ')$'; }

  var C2_TN = [

    // 1. Điểm nào thuộc miền nghiệm
    function () {
      var a = ri(1, 4), b = ri(1, 4), c = ri(2, 10);
      var d = bonDiem(function (p) { return a * p[0] + b * p[1] <= c; });
      if (!d) return C2_TN[1]();
      return { muc: 1,
        de: 'Điểm nào sau đây thuộc miền nghiệm của bất phương trình $' +
            a + 'x + ' + b + 'y \\le ' + c + '$?',
        dapan: d.map(diem), dung: 0,
        giai: 'Thay toạ độ vào vế trái: $' + a + '\\cdot' + d[0][0] + ' + ' + b + '\\cdot' +
              d[0][1] + ' = ' + (a * d[0][0] + b * d[0][1]) + ' \\le ' + c + '$.' };
    },

    // 2. Điểm nào KHÔNG thuộc miền nghiệm
    function () {
      var a = ri(1, 4), b = ri(1, 4), c = ri(2, 10);
      var d = bonDiem(function (p) { return a * p[0] + b * p[1] > c; });
      if (!d) return C2_TN[0]();
      return { muc: 2,
        de: 'Điểm nào sau đây <strong>không</strong> thuộc miền nghiệm của $' +
            a + 'x + ' + b + 'y \\le ' + c + '$?',
        dapan: d.map(diem), dung: 0,
        giai: '$' + a + '\\cdot' + d[0][0] + ' + ' + b + '\\cdot' + d[0][1] + ' = ' +
              (a * d[0][0] + b * d[0][1]) + ' \\gt ' + c + '$ nên điểm này bị loại.' };
    },

    // 3. Giá trị lớn nhất của F trên miền tam giác
    function () {
      var a = ri(1, 5), b = ri(1, 5), m = ri(2, 7), n = ri(2, 7);
      var v = [0, a * m, b * n], max = Math.max.apply(null, v);
      return { muc: 3,
        de: 'Miền nghiệm của một hệ là tam giác có ba đỉnh $O(0;0)$, $A(' + m + ';0)$, $B(0;' + n +
            ')$. Giá trị lớn nhất của $F = ' + a + 'x + ' + b + 'y$ trên miền đó bằng',
        dapan: bon(String(max), [String(Math.min(a * m, b * n)), String(a * m + b * n), String(m + n)]),
        dung: 0,
        giai: 'Tính $F$ tại ba đỉnh được $0$, $' + (a * m) + '$, $' + (b * n) +
              '$. Giá trị lớn nhất là $' + max + '$.' };
    },

    // 4. Giá trị nhỏ nhất của F
    function () {
      var a = ri(1, 5), b = ri(1, 5), m = ri(2, 7), n = ri(2, 7);
      return { muc: 3,
        de: 'Miền nghiệm là tam giác có ba đỉnh $O(0;0)$, $A(' + m + ';0)$, $B(0;' + n +
            ')$. Giá trị nhỏ nhất của $F = ' + a + 'x + ' + b + 'y$ trên miền đó bằng',
        dapan: bon('0', [String(Math.min(a * m, b * n)), String(Math.max(a * m, b * n)), String(a + b)]),
        dung: 0,
        giai: '$F$ tại ba đỉnh là $0$, $' + (a * m) + '$, $' + (b * n) +
              '$, nhỏ nhất là $0$ tại gốc toạ độ.' };
    },

    // 5. Miền nghiệm có chứa gốc toạ độ không
    function () {
      var a = ri(1, 5), b = ri(1, 5), c = ri(1, 8);
      return { muc: 1,
        de: 'Miền nghiệm của bất phương trình $' + a + 'x + ' + b + 'y + ' + c +
            ' \\lt 0$ có chứa gốc toạ độ $O(0;0)$ không?',
        dapan: bon('Không, vì $' + c + ' \\gt 0$',
                   ['Có, vì $' + c + ' \\lt 0$', 'Có, vì gốc toạ độ luôn thuộc miền nghiệm',
                    'Không xác định được']),
        dung: 0,
        giai: 'Thay $x = y = 0$ được $' + c + ' \\lt 0$, mệnh đề sai nên $O$ không thuộc miền nghiệm.' };
    },

    // 6. Tìm m nguyên lớn nhất
    function () {
      var a = ri(1, 4), b = ri(1, 3), p = ri(1, 4), c = a * p + b * ri(2, 6) + ri(0, b - 1);
      var mMax = Math.floor((c - a * p) / b);
      return { muc: 3,
        de: 'Điểm $(' + p + ';\\,m)$ thuộc miền nghiệm của $' + a + 'x + ' + b + 'y \\le ' + c +
            '$. Giá trị nguyên lớn nhất của $m$ là',
        dapan: bon(String(mMax), [String(mMax + 1), String(mMax - 1), String(c)]),
        dung: 0,
        giai: '$' + (a * p) + ' + ' + b + 'm \\le ' + c + '$ nên $m \\le ' +
              ((c - a * p) / b).toFixed(2).replace('.', '{,}').replace('{,}00', '') +
              '$, số nguyên lớn nhất là $' + mMax + '$.' };
    },

    // 7. Nhận dạng bất phương trình bậc nhất hai ẩn
    function () {
      var a = ri(2, 6), b = ri(2, 6), c = ri(1, 9);
      return { muc: 1,
        de: 'Bất phương trình nào sau đây là bất phương trình bậc nhất hai ẩn?',
        dapan: bon('$' + a + 'x + ' + b + 'y \\le ' + c + '$',
                   ['$x^2 + ' + b + 'y \\le ' + c + '$',
                    '$' + a + 'xy \\ge ' + c + '$',
                    '$' + a + 'x + \\dfrac{' + b + '}{y} \\lt ' + c + '$']),
        dung: 0,
        giai: 'Bậc nhất hai ẩn thì mỗi ẩn chỉ có số mũ $1$ và không nhân nhau, không nằm dưới mẫu.' };
    },

    // 8. Miền nghiệm của hệ
    function () {
      return { muc: 1,
        de: 'Miền nghiệm của một hệ bất phương trình bậc nhất hai ẩn là',
        dapan: bon('Giao của các nửa mặt phẳng nghiệm',
                   ['Hợp của các nửa mặt phẳng nghiệm', 'Một đường thẳng', 'Một điểm duy nhất']),
        dung: 0,
        giai: 'Nghiệm của hệ phải thoả mãn mọi bất phương trình nên lấy phần chung.' };
    },

    // 9. Cặp số nào là nghiệm của hệ
    function () {
      var a = ri(1, 3), b = ri(1, 3), c = ri(6, 14);
      var d = bonDiem(function (p) {
        return p[0] >= 0 && p[1] >= 0 && a * p[0] + b * p[1] <= c;
      });
      if (!d) return C2_TN[7]();
      return { muc: 2,
        de: 'Cặp số nào là nghiệm của hệ $\\begin{cases} x \\ge 0 \\\\ y \\ge 0 \\\\ ' +
            a + 'x + ' + b + 'y \\le ' + c + '\\end{cases}$?',
        dapan: d.map(diem), dung: 0,
        giai: 'Chỉ cặp này thoả cả ba điều kiện, các cặp còn lại vi phạm ít nhất một điều kiện.' };
    },

    // 10. Số đỉnh của miền nghiệm
    function () {
      var a = ri(1, 4), b = ri(1, 4), c = ri(6, 14);
      return { muc: 2,
        de: 'Miền nghiệm của hệ $\\begin{cases} x \\ge 0 \\\\ y \\ge 0 \\\\ ' +
            a + 'x + ' + b + 'y \\le ' + c + '\\end{cases}$ là một đa giác có bao nhiêu đỉnh?',
        dapan: bon('3', ['2', '4', '5']),
        dung: 0,
        giai: 'Đó là tam giác với ba đỉnh $O(0;0)$, $\\left(\\dfrac{' + c + '}{' + a +
              '};0\\right)$ và $\\left(0;\\dfrac{' + c + '}{' + b + '}\\right)$.' };
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
      var a = ri(1, 4), b = ri(1, 4), m = ri(2, 6), n = ri(2, 6);
      var v = [0, a * m, b * n];
      return { muc: 3,
        de: 'Miền nghiệm là tam giác có ba đỉnh $O(0;0)$, $A(' + m + ';0)$, $B(0;' + n +
            ')$. Xét $F = ' + a + 'x + ' + b + 'y$.',
        y: ['$F$ đạt giá trị lớn nhất tại một đỉnh của tam giác',
            '$F(O) = 0$',
            '$F(A) = ' + (a * m) + '$',
            '$F$ đạt giá trị nhỏ nhất bằng $' + Math.max.apply(null, v) + '$'],
        dung: [true, true, true, false],
        giai: 'Giá trị nhỏ nhất là $0$ tại gốc toạ độ, còn $' +
              Math.max.apply(null, v) + '$ là giá trị lớn nhất.' };
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
    },
    function () {
      var a = ri(1, 3), b = ri(1, 3), c = ri(6, 14);
      return { muc: 2,
        de: 'Cho hệ $\\begin{cases} x \\ge 0 \\\\ y \\ge 0 \\\\ ' + a + 'x + ' + b + 'y \\le ' + c +
            '\\end{cases}$',
        y: ['Miền nghiệm là một tam giác',
            'Gốc toạ độ thuộc miền nghiệm',
            'Miền nghiệm nằm hoàn toàn trong góc phần tư thứ nhất',
            'Miền nghiệm không bị chặn'],
        dung: [true, true, true, false],
        giai: 'Miền nghiệm là tam giác nên bị chặn.' };
    }
  ];

  var C2_TLN = [
    function () {
      var a = ri(1, 5), b = ri(1, 5), m = ri(2, 8), n = ri(2, 8);
      return { muc: 2,
        de: 'Miền nghiệm là tam giác đỉnh $O(0;0)$, $A(' + m + ';0)$, $B(0;' + n +
            ')$. Giá trị lớn nhất của $F = ' + a + 'x + ' + b + 'y$ bằng bao nhiêu?',
        dapan: String(Math.max(0, a * m, b * n)),
        giai: '$F$ tại ba đỉnh là $0$, $' + (a * m) + '$, $' + (b * n) + '$.' };
    },
    function () {
      var a = ri(1, 4), b = ri(1, 3), p = ri(1, 5), q = ri(1, 5);
      return { muc: 1,
        de: 'Tính giá trị của $' + a + 'x + ' + b + 'y$ tại điểm $(' + p + ';\\,' + q + ')$.',
        dapan: String(a * p + b * q),
        giai: '$' + a + '\\cdot' + p + ' + ' + b + '\\cdot' + q + ' = ' + (a * p + b * q) + '$.' };
    },
    function () {
      var a = ri(1, 4), b = ri(1, 3), p = ri(1, 4);
      var c = a * p + b * ri(2, 7);
      return { muc: 3,
        de: 'Điểm $(' + p + ';\\,m)$ thuộc miền nghiệm của $' + a + 'x + ' + b + 'y \\le ' + c +
            '$. Giá trị nguyên lớn nhất của $m$ là bao nhiêu?',
        dapan: String(Math.floor((c - a * p) / b)),
        giai: '$' + b + 'm \\le ' + (c - a * p) + '$ nên $m \\le ' +
              ((c - a * p) / b) + '$.' };
    },
    function () {
      var a = ri(1, 4), b = ri(1, 4), c = ri(6, 16);
      return { muc: 2,
        de: 'Miền nghiệm của hệ $x \\ge 0$, $y \\ge 0$, $' + a + 'x + ' + b + 'y \\le ' + c +
            '$ là đa giác có bao nhiêu đỉnh?',
        dapan: '3', giai: 'Đó là một tam giác.' };
    },
    function () {
      var n = ri(2, 6), a = ri(1, 4);
      return { muc: 2,
        de: 'Có bao nhiêu số nguyên $y$ không âm thoả mãn $' + a + 'y \\le ' + (a * n) + '$?',
        dapan: String(n + 1),
        giai: '$y \\le ' + n + '$, các giá trị là $0, 1, \\ldots, ' + n + '$.' };
    },
    function () {
      var a = ri(2, 6), b = ri(2, 6);
      return { muc: 1,
        de: 'Đường thẳng $' + a + 'x + ' + b + 'y = ' + (a * b) + '$ cắt trục hoành tại điểm có hoành độ bằng bao nhiêu?',
        dapan: String(b),
        giai: 'Cho $y = 0$ được $' + a + 'x = ' + (a * b) + '$ nên $x = ' + b + '$.' };
    }
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
      return { muc: 3,
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
    function () {
      var g = chon([60, 120]);
      var t = chon(g === 60 ? BO60 : BO120);
      return { muc: 3,
        de: 'Tam giác $ABC$ có $a = ' + t[2] + '$, $b = ' + t[0] + '$, $c = ' + t[1] +
            '$. Số đo góc $A$ bằng',
        dapan: bon(g + '^\\circ', [(g === 60 ? '120' : '60') + '^\\circ', '90^\\circ', '45^\\circ'])
                 .map(function (x) { return '$' + x + '$'; }),
        dung: 0,
        giai: '$\\cos A = \\dfrac{b^2 + c^2 - a^2}{2bc} = ' + (g === 60 ? '\\dfrac{1}{2}' : '-\\dfrac{1}{2}') +
              '$ nên $\\widehat{A} = ' + g + '^\\circ$.' };
    },

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

    // 10. Diện tích qua bán kính ngoại tiếp
    function () {
      var t = chon(HERON), a = t[0], b = t[1], c = t[2], S = t[3];
      var R = a * b * c / (4 * S);
      return { muc: 3,
        de: 'Tam giác có ba cạnh $' + a + '$, $' + b + '$, $' + c + '$ và diện tích $' + S +
            '$. Bán kính đường tròn ngoại tiếp bằng',
        dapan: bon(String(Math.round(R * 1000) / 1000),
                   [String(Math.round(R * 2000) / 1000), String(S / 2), String((a + b + c) / 2)]),
        dung: 0,
        giai: '$R = \\dfrac{abc}{4S} = \\dfrac{' + (a * b * c) + '}{' + (4 * S) + '}$.' };
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
