/* ============================================================
   main.js — phần điều khiển
   Nội dung học nằm ở js/data.js, file này lo lộ trình và cách làm bài.

   Mỗi chương có ba dạng bài: Trắc nghiệm, Đúng sai, Trả lời ngắn.
   Bấm vào một dạng là rút ngẫu nhiên một đề từ ngân hàng câu hỏi của chương đó.
   Đề chạy từng câu một, trả lời xong biết đúng sai ngay rồi mới sang câu sau.
   ============================================================ */
(function () {
  'use strict';


  /* Số câu đúng tối thiểu để được tính là Hoàn thành.
     Riêng đúng sai, một câu chỉ được tính khi làm đúng cả bốn ý. */
  var DAT = { tracnghiem: 7, dungsai: 3, traloingan: 2 };

  /* Số câu rút ra mỗi lần làm bài, riêng cho từng dạng.
     Viết một số thì lần nào cũng bấy nhiêu câu.
     Viết một khoảng [ít nhất, nhiều nhất] thì mỗi lần một số khác nhau,
     ví dụ tracnghiem: [18, 25] sẽ ra từ 18 đến 25 câu tuỳ lượt. */
  var SO_CAU = { tracnghiem: 10, dungsai: 5, traloingan: 3 };

  /* Khi ngân hàng chưa đủ câu, đề ngắn lại thì ngưỡng cũng co theo cho công bằng. */
  function canDat(ma, soCau) {
    var v = SO_CAU[ma];
    var chuan = (Object.prototype.toString.call(v) === '[object Array]') ? v[1] : v;
    var ti = (DAT[ma] || chuan) / chuan;
    return Math.max(1, Math.min(soCau, Math.ceil(soCau * ti)));
  }

  function soCauRut(ma) {
    var v = SO_CAU[ma];
    if (Object.prototype.toString.call(v) === '[object Array]')
      return v[0] + Math.floor(Math.random() * (v[1] - v[0] + 1));
    return v || 10;
  }

  /* Tỉ lệ ba mức độ trong một đề: nhận biết, thông hiểu, vận dụng.
     Đang để nhẹ cho học sinh, muốn khó hơn thì tăng số của mức 3. */
  var TI_LE = { 1: 0.55, 2: 0.35, 3: 0.10 };

  var DANG = [
    { ma: 'tracnghiem', ten: 'Trắc nghiệm',  hieu: '✏️' },
    { ma: 'dungsai',    ten: 'Đúng sai',     hieu: '⚖️' },
    { ma: 'traloingan', ten: 'Trả lời ngắn', hieu: '🔢' }
  ];
  var TEN_MUC = { 1: 'Nhận biết', 2: 'Thông hiểu', 3: 'Vận dụng' };

  var CHU_SO  = ['I','II','III','IV','V','VI','VII','VIII','IX'];

  /* ---------- Rút ngẫu nhiên một đề từ ngân hàng câu hỏi ----------
     Mỗi lần bấm vào là một đề khác, lấy đủ ba mức độ rồi xếp dễ trước khó sau. */
  function xaoMang(a) {
    for (var j = a.length - 1; j > 0; j--) {
      var k = Math.floor(Math.random() * (j + 1));
      var t = a[j]; a[j] = a[k]; a[k] = t;
    }
    return a;
  }
  function theoMuc(a, b) { return (a.muc || 1) - (b.muc || 1); }

  /* Rút đều theo dạng câu hỏi.
     Câu nào có gắn dang: '...' thì được xếp vào nhóm theo nhãn đó, rồi mỗi
     nhóm góp một phần bằng nhau vào đề. Chia hết không trọn thì phần dư
     chia ngẫu nhiên, nên lần nào dạng được thêm câu cũng khác.
     Chương nào không gắn nhãn thì bỏ qua, rút theo mức độ như cũ. */
  function rutTheoDang(kho, n) {
    var nhom = {}, ten = [];
    kho.forEach(function (q) {
      if (!q.dang) return;
      if (!nhom[q.dang]) { nhom[q.dang] = []; ten.push(q.dang); }
      nhom[q.dang].push(q);
    });
    if (ten.length < 2) return null;

    xaoMang(ten);
    ten.forEach(function (d) { xaoMang(nhom[d]); });

    var moi = Math.floor(n / ten.length), du = n - moi * ten.length;
    var de = [];
    ten.forEach(function (d, i) {
      de = de.concat(nhom[d].slice(0, moi + (i < du ? 1 : 0)));
    });

    // Dạng nào không đủ câu thì bù bằng câu còn lại cho đủ số
    if (de.length < n) {
      var con = xaoMang(kho.filter(function (q) { return de.indexOf(q) === -1; }));
      de = de.concat(con.slice(0, n - de.length));
    }
    return de.sort(theoMuc);
  }

  function rutDe(ch, ma) {
    var n = soCauRut(ma);

    // Có bộ sinh đề cho chương này thì lấy từ đó, số liệu mỗi lần một khác
    var kho;
    if (window.SINH && SINH.co(ch.id, ma)) {
      kho = SINH.ra(ch.id, ma, n * 3).concat((ch.cauhoi[ma] || []).slice());
    } else {
      kho = (ch.cauhoi[ma] || []).slice();
    }
    if (kho.length <= n) return kho.sort(theoMuc);

    var deuDang = rutTheoDang(kho, n);
    if (deuDang) return deuDang;

    var theo = { 1: [], 2: [], 3: [] };
    kho.forEach(function (q) { theo[q.muc || 1].push(q); });
    [1, 2, 3].forEach(function (k) { xaoMang(theo[k]); });

    var can = { 1: Math.round(n * TI_LE[1]), 2: Math.round(n * TI_LE[2]) };
    can[3] = n - can[1] - can[2];

    var de = [];
    [1, 2, 3].forEach(function (k) { de = de.concat(theo[k].slice(0, can[k])); });

    // Mức nào thiếu câu thì bù bằng câu còn lại cho đủ số
    if (de.length < n) {
      var con = xaoMang(kho.filter(function (q) { return de.indexOf(q) === -1; }));
      de = de.concat(con.slice(0, n - de.length));
    }
    return de.sort(theoMuc);
  }

  var CHU_CAI = ['A','B','C','D'];
  var CHU_Y   = ['a','b','c','d'];

  /* ============================================================
     TIẾN ĐỘ
     tienDo[idChuong][dang][soChang] = { xong:true, diem:7 }
     ============================================================ */
  var KEY = 'toan10-tiendo';

  function docTienDo() {
    var td;
    try { td = JSON.parse(localStorage.getItem(KEY)) || {}; }
    catch (e) { td = {}; }
    // Gộp dữ liệu của các bản trước
    Object.keys(td).forEach(function (id) {
      var o = td[id] || {};
      delete o.kienthuc; delete o.tuluan;
      Object.keys(o).forEach(function (ma) {
        var v = o[ma];
        if (v && typeof v === 'object' && v['0']) {
          o[ma] = { xong: !!v['0'].xong, diem: v['0'].diem };
        }
      });
      td[id] = o;
    });
    return td;
  }
  var tienDo = docTienDo();
  function ghi() {
    try { localStorage.setItem(KEY, JSON.stringify(tienDo)); } catch (e) {}
    if (window.FB && FB.du && FB.du.duyet) FB.luu(tienDo, vi);
  }

  function hoSo(id, ma) {
    if (!tienDo[id]) tienDo[id] = {};
    if (!tienDo[id][ma]) tienDo[id][ma] = {};
    return tienDo[id][ma];
  }
  function xongDang(ch, ma) {
    if (!(ch.cauhoi[ma] || []).length) return true;      // dạng trống thì không chặn đường
    var o = tienDo[ch.id] && tienDo[ch.id][ma];
    return !!(o && o.xong);
  }

  /* ---------- Gom các thẻ hay dùng ---------- */
  var el = {};
  ['viewList','viewNha','duong',
   'hoc','hocDong','hocThan','hocDem','hocNut','thanhDay',
   'phanhoi','phanhoiTieu','phanhoiGiai',
   'mung','mungTieu','mungTen','mungPhu','mungPhao','mungOk',
   'cuTop','cuPhanHoi','cuMung','phaoHoc','btnXu','soXu',
   'cho','choDong','choXu','cuCho','hangDiem','hangDo','hangNha','btnRa',
   'nhaMua','nhaHoc','nhaNho','nhaVach','phong','cuNha','btnHoc','btnHocChu',
   'canhBui','bongNoi','bongNoiChu',
   'vao','cuVao','buocChua','buocKhai','buocCho','buocLoi',
   'nutKhai','khaiTen','khaiLop','khaiBao','choChu',
   'nutKiemTra','nutTaiLai','nutRaPhu','loiChu',
   'brandHome'
  ].forEach(function (id) { el[id] = document.getElementById(id); });

  function toan(root) {
    if (!window.MathJax || !MathJax.startup) return;
    MathJax.startup.promise = MathJax.startup.promise
      .then(function () { return MathJax.typesetPromise([root]); })
      .catch(function () {});
  }
  function toiDa(ma, cau) { return cau.length; }

  /* ---------- Vẽ một hàng trên lộ trình: biểu tượng tròn, chữ nằm bên cạnh ---------- */
  var SONG = [0, 11, 16, 11, 0, -11, -16, -11];   // sóng uốn lượn, tính theo % bề ngang

  function veMuc(o) {
    var lech = SONG[o.i % SONG.length];
    var d = document.createElement('div');
    d.className = 'muc is-' + o.trangThai + (lech >= 0 ? ' is-trai' : ' is-phai');
    d.style.setProperty('--x', lech + '%');

    d.innerHTML =
      '<button class="vien" aria-label="' + o.ten + '"><span>' + o.hieu + '</span></button>' +
      '<div class="muc__chu"><h3>' + o.ten + '</h3></div>';

    d.addEventListener('click', o.bam);
    return d;
  }

  /* ---------- Đường cong nối các nút, vẽ bằng SVG sau khi đã có vị trí thật ---------- */
  function duongCong(p) {
    var d = 'M' + p[0][0].toFixed(1) + ' ' + p[0][1].toFixed(1);
    for (var i = 1; i < p.length; i++) {
      var a = p[i - 1], b = p[i], giua = (a[1] + b[1]) / 2;
      d += ' C' + a[0].toFixed(1) + ' ' + giua.toFixed(1) +
           ',' + b[0].toFixed(1) + ' ' + giua.toFixed(1) +
           ',' + b[0].toFixed(1) + ' ' + b[1].toFixed(1);
    }
    return d;
  }

  function veDay(nhom) {
    var cu = nhom.querySelector('svg.day');
    if (cu) cu.parentNode.removeChild(cu);

    var goc = nhom.getBoundingClientRect();
    if (!goc.width) return;                       // chưa hiện ra thì chưa đo được

    var diem = [];
    nhom.querySelectorAll('.vien').forEach(function (v) {
      var r = v.getBoundingClientRect();
      diem.push([r.left - goc.left + r.width / 2, r.top - goc.top + r.height / 2]);
    });
    if (diem.length < 2) return;

    var NS = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'day');
    svg.setAttribute('viewBox', '0 0 ' + goc.width + ' ' + goc.height);
    svg.setAttribute('preserveAspectRatio', 'none');
    var p = document.createElementNS(NS, 'path');
    p.setAttribute('d', duongCong(diem));
    svg.appendChild(p);
    nhom.insertBefore(svg, nhom.firstChild);
  }

  function veLaiDay() {
    document.querySelectorAll('.nhom').forEach(veDay);
  }
  var hen;
  window.addEventListener('resize', function () {
    clearTimeout(hen); hen = setTimeout(veLaiDay, 160);
  });

  /* Phông chữ tải xong thì chiều cao các hàng đổi, phải vẽ lại đường nối
     nếu không nó sẽ lệch khỏi tâm các nút. */
  window.addEventListener('load', veLaiDay);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(veLaiDay).catch(function () {});
  }



  /* ============================================================
     PHÁO GIẤY VÀ TIẾNG CHUÔNG
     ============================================================ */
  var MAU_PHAO = ['#5a4fe0', '#0f9d78', '#f5c542', '#e0436b', '#2f80ed', '#f5a623'];

  var KIEU_ROI = ['roiA', 'roiB', 'roiC', 'roiD'];

  function phaoGiay(hop, soManh) {
    if (!hop) return;
    hop.innerHTML = '';

    var html = '';
    for (var i = 0; i < soManh; i++) {
      var w   = (8 + Math.random() * 8).toFixed(1);
      var trai = (Math.random() * 98).toFixed(1);
      var dai = (1.9 + Math.random() * 1.2).toFixed(2);
      var tre = (Math.random() * 600).toFixed(0);
      html += '<i style="left:' + trai + '%;width:' + w + 'px;height:' + (w * 1.7).toFixed(1) +
              'px;background:' + MAU_PHAO[i % MAU_PHAO.length] +
              ';animation-name:' + KIEU_ROI[i % KIEU_ROI.length] +
              ';animation-duration:' + dai + 's' +
              ';animation-delay:' + tre + 'ms"></i>';
    }
    hop.innerHTML = html;

    clearTimeout(hop._hen);
    hop._hen = setTimeout(function () { hop.innerHTML = ''; }, 4200);
  }

  /* ============================================================
     VÍ XU, CỬA HÀNG VÀ CÚ MÈO
     Mỗi bài hoàn thành được 1 xu. Xu dùng để mua đồ cho cú mèo,
     hoặc đổi lấy điểm cộng trên lớp.
     ============================================================ */
  var VI_KEY = 'toan10-vi';
  /* Xu thưởng cho mỗi câu đúng, riêng từng dạng.
     Đúng sai phải đúng trọn cả bốn ý mới được tính.
     Muốn riêng một câu nào đó thưởng khác mức chung thì thêm xu: <số> vào
     câu đó trong data.js, ví dụ { muc: 2, xu: 15, de: ... }. */
  var XU_CAU = { tracnghiem: 1, dungsai: 5, traloingan: 5 };
  function xuCau(ma, c) {
    return (typeof c.xu === 'number') ? c.xu : XU_CAU[ma];
  }

  /* Điểm cộng đắt dần: lần đầu 200 xu, mỗi lần sau thêm 100. */
  var DIEM_DAU = 200, DIEM_TANG = 100;
  function giaDiemCong() { return DIEM_DAU + DIEM_TANG * (vi.phieu || 0); }

  /* Đồ trang trí nhà cú. x và y là vị trí trong phòng, tính theo phần trăm. */
  /* x, y là chỗ đặt món đồ, tính theo phần trăm cả căn phòng.
     Cửa sổ chiếm khoảng x 19-81%, y 7-38%; tường gặp sàn ở 56%;
     cú đứng giữa, chiếm khoảng x 32-68%, y 66-89%.
     Xếp tránh ba chỗ đó ra, đừng để đồ chồng lên nhau. */
  var NHA = [
    { ma: 'cay',    ten: 'Chậu cây',      hinh: '🪴', gia: 150,  x: 8,  y: 66 },
    { ma: 'tranh',  ten: 'Tranh treo',    hinh: '🖼️', gia: 200,  x: 90, y: 17 },
    { ma: 'gau',    ten: 'Gấu bông',      hinh: '🧸', gia: 280,  x: 21, y: 86 },
    { ma: 'den',    ten: 'Đèn tường',     hinh: '💡', gia: 350,  x: 9,  y: 16 },
    { ma: 'ke',     ten: 'Kệ sách',       hinh: '📚', gia: 450,  x: 89, y: 45 },
    { ma: 'dongho', ten: 'Đồng hồ',       hinh: '🕰️', gia: 550,  x: 50, y: 47 },
    { ma: 'cup',    ten: 'Tủ cúp',        hinh: '🏆', gia: 700,  x: 10, y: 45 },
    { ma: 'sofa',   ten: 'Ghế sofa',      hinh: '🛋️', gia: 900,  x: 84, y: 70 },
    { ma: 'dan',    ten: 'Đàn piano',     hinh: '🎹', gia: 1200, x: 80, y: 88 },
    { ma: 'meo',    ten: 'Mèo bạn thân',  hinh: '🐈', gia: 1500, x: 15, y: 77 }
  ];

  var HANG = [
    { ma: 'mu',    ten: 'Mũ tốt nghiệp', gia: 200 },
    { ma: 'kinh',  ten: 'Kính cận',      gia: 300 },
    { ma: 'khan',  ten: 'Khăn quàng',    gia: 450 },
    { ma: 'but',   ten: 'Bút chì',       gia: 600 },
    { ma: 'huy',   ten: 'Huy chương',    gia: 800 },
    { ma: 'sach',  ten: 'Quyển sách',    gia: 1000 },
    { ma: 'sao',   ten: 'Ngôi sao',      gia: 1300 },
    { ma: 'ao',    ten: 'Áo choàng',     gia: 1700 },
    { ma: 'vuong', ten: 'Vương miện',    gia: 2500 }
  ];

  function docVi() {
    var v;
    try { v = JSON.parse(localStorage.getItem(VI_KEY)); } catch (e) {}
    v = v || {};
    return { xu: v.xu || 0, co: v.co || [], mac: v.mac || [], phieu: v.phieu || 0 };
  }
  var vi = docVi();
  function ghiVi() {
    try { localStorage.setItem(VI_KEY, JSON.stringify(vi)); } catch (e) {}
    if (window.FB && FB.du && FB.du.duyet) FB.luu(tienDo, vi);
  }

  /* ────────────────────────────────────────────────────────────
     CỔNG NẠP XU ĐỂ THỬ CỬA HÀNG
     Mở trang kèm  ?xu=1000  là có ngay 1000 xu.
     ⚠️ GỠ CẢ KHỐI NÀY TRƯỚC KHI CHO HỌC SINH DÙNG,
        nếu không em nào biết mẹo cũng tự nạp xu được.
     ──────────────────────────────────────────────────────────── */
  try {
    var napXu = /[?&]xu=(\d{1,6})/.exec(location.search);
    if (napXu) {
      vi.xu = parseInt(napXu[1], 10);
      ghiVi();
      console.warn('Đã nạp ' + vi.xu + ' xu. Nhớ gỡ cổng nạp xu trong js/main.js trước khi phát cho học sinh.');
    }
  } catch (e) {}

  function themXu(n) {
    vi.xu += n;
    try { localStorage.setItem(VI_KEY, JSON.stringify(vi)); } catch (e) {}
    veSoXu();
    if (window.FB && FB.du && FB.du.duyet) FB.thuongXu(n);
  }
  function veSoXu() {
    el.soXu.textContent = vi.xu;
    if (el.choXu) el.choXu.textContent = vi.xu;
  }

  function svgCu() {
    return '' +
    '<svg class="cu" viewBox="0 0 100 118" aria-hidden="true">' +
      // áo choàng nằm sau thân
      '<g class="do do--ao"><path d="M13 60q37 46 74 0q-7 52-37 54q-30-2-37-54z" fill="#e0436b"/></g>' +
      // cánh
      '<ellipse class="canh canh--t" cx="17" cy="72" rx="8.5" ry="19" fill="#5a4fe0"/>' +
      '<ellipse class="canh canh--p" cx="83" cy="72" rx="8.5" ry="19" fill="#5a4fe0"/>' +
      // chân
      '<g stroke="#f5a623" stroke-width="3.6" stroke-linecap="round" fill="none">' +
        '<path d="M39 100l-6 7M39 100v8M39 100l6 7"/><path d="M61 100l-6 7M61 100v8M61 100l6 7"/></g>' +
      // túm lông tai
      '<path d="M23 40 17 17l22 12z" fill="#4a3fd0"/><path d="M77 40 83 17 61 29z" fill="#4a3fd0"/>' +
      // thân và bụng
      '<ellipse cx="50" cy="66" rx="34" ry="36" fill="#6a5be8"/>' +
      '<ellipse cx="50" cy="75" rx="22" ry="25" fill="#ddd9fd"/>' +
      // khăn quàng
      '<g class="do do--khan">' +
        '<path d="M28 84q22 11 44 0v9q-22 11-44 0z" fill="#0f9d78"/>' +
        '<path d="M64 92l11 17-9 3-7-15z" fill="#0b7a5d"/></g>' +
      // dây cặp
      '<g class="do do--sach" transform="rotate(-13 20 85)">' +
        '<rect x="7" y="76" width="24" height="18" rx="2.5" fill="#0f9d78"/>' +
        '<rect x="10" y="79" width="18" height="12" rx="1.5" fill="#eafaf4"/>' +
        '<path d="M19 79v12" stroke="#0f9d78" stroke-width="1.5"/></g>' +
      // huy chương
      '<g class="do do--huy"><path d="M43 85l7 13M57 85l-7 13" stroke="#c9c3fb" stroke-width="3"/>' +
        '<circle cx="50" cy="104" r="9.5" fill="#f5c542" stroke="#e0a020" stroke-width="2"/>' +
        '<path d="M50 99l1.6 3.4 3.6.5-2.6 2.6.6 3.7-3.2-1.8-3.2 1.8.6-3.7-2.6-2.6 3.6-.5z" fill="#b8860b"/></g>' +
      // mắt
      '<circle cx="36" cy="52" r="15" fill="#fff"/><circle cx="64" cy="52" r="15" fill="#fff"/>' +
      '<g class="trong"><circle cx="38" cy="53" r="7" fill="#1b2140"/>' +
        '<circle cx="66" cy="53" r="7" fill="#1b2140"/>' +
        '<circle cx="40.5" cy="50" r="2.6" fill="#fff"/><circle cx="68.5" cy="50" r="2.6" fill="#fff"/></g>' +
      // mi mắt, chỉ hiện khi buồn
      '<g class="mi"><path d="M21 52h30M49 52h30" stroke="#6a5be8" stroke-width="0"/></g>' +
      // kính
      '<g class="do do--kinh" fill="none" stroke="#2b2f52" stroke-width="3">' +
        '<circle cx="36" cy="52" r="15.5"/><circle cx="64" cy="52" r="15.5"/>' +
        '<path d="M51.5 52h-3"/><path d="M20.5 52 12 47M79.5 52 88 47"/></g>' +
      // mỏ
      '<path class="mo" d="M50 61l-7 9h14z" fill="#f5a623"/>' +
      // bút chì gài tai
      '<g class="do do--but" transform="rotate(22 84 42)">' +
        '<rect x="80" y="22" width="7.5" height="27" rx="1.5" fill="#f5c542"/>' +
        '<rect x="80" y="22" width="7.5" height="5" fill="#e0436b"/>' +
        '<path d="M80 49h7.5l-3.7 7z" fill="#f0a05a"/></g>' +
      // mũ tốt nghiệp
      '<g class="do do--mu"><path d="M50 12 18 25l32 13 32-13z" fill="#2b2f52"/>' +
        '<path d="M34 31v9q16 8 32 0v-9" fill="#3a3f68"/>' +
        '<path d="M82 25v15" stroke="#f5c542" stroke-width="2.6"/>' +
        '<circle cx="82" cy="42" r="3.4" fill="#f5c542"/></g>' +
      // vương miện, thay cho mũ ở cấp cuối
      '<g class="do do--vuong"><path d="M28 26l5-16 8 10 9-14 9 14 8-10 5 16z" fill="#f5c542" ' +
        'stroke="#e0a020" stroke-width="1.6" stroke-linejoin="round"/>' +
        '<circle cx="50" cy="19" r="2.8" fill="#e0436b"/></g>' +
      // ngôi sao lấp lánh trên đỉnh
      '<g class="do do--sao"><path d="M50 2l2.6 5.6L59 8.4l-4.5 4.4 1.1 6.2L50 16l-5.6 3 1.1-6.2L41 8.4l6.4-.8z" ' +
        'fill="#f5c542"/></g>' +
    '</svg>';
  }

  function veCu(hop) {
    if (!hop) return;
    hop.innerHTML = svgCu();
    var svg = hop.querySelector('.cu');
    vi.mac.forEach(function (d) { svg.classList.add('co-' + d); });
    if (vi.mac.indexOf('vuong') !== -1) svg.classList.remove('co-mu');  // vương miện thay mũ
    hop.title = vi.mac.length
      ? 'Đang mặc: ' + vi.mac.map(function (d) { return tenDo(d); }).join(', ')
      : 'Vào cửa hàng mua đồ cho cú mèo nhé';
    return svg;
  }
  function tenDo(ma) {
    var h = HANG.filter(function (x) { return x.ma === ma; })[0];
    return h ? h.ten : ma;
  }

  function cuPhanUng(hop, vui) {
    var svg = veCu(hop);
    if (!svg) return;
    svg.classList.add(vui ? 'vui' : 'buon');
    if (vui) {
      for (var i = 0; i < 7; i++) {
        hop.insertAdjacentHTML('beforeend',
          '<i class="tia" style="--g:' + (i * 51) + 'deg;--d:' + (i * 40) + 'ms"></i>');
      }
    }
  }

  /* ============================================================
     MÀN 1 — LỘ TRÌNH CHƯƠNG, MỖI CHƯƠNG BỐN DẠNG
     ============================================================ */
  function veDuong() {
    el.duong.innerHTML = '';

    CHUONG_TRINH.forEach(function (ch, ic) {
      var dai = document.createElement('div');
      dai.className = 'dai';
      dai.innerHTML =
        '<span class="dai__so">Chương ' + CHU_SO[ic] + '</span>' +
        '<h2>' + ch.ten + '</h2>';
      el.duong.appendChild(dai);

      var nhom = document.createElement('div');
      nhom.className = 'nhom';

      DANG.forEach(function (d, ix) {
        var co = (ch.cauhoi[d.ma] || []).length;

        nhom.appendChild(veMuc({
          i: ix,
          trangThai: 'mo',
          hieu: d.hieu, ten: d.ten,
          bam: function () {
            if (!co) { alert('Dạng này chưa có câu hỏi. Thầy cô thêm vào js/data.js nhé.'); return; }
            batDau(ch, d.ma);
          }
        }));
      });
      el.duong.appendChild(nhom);
      veDay(nhom);
    });
  }

  /* ============================================================
     MÀN LÀM BÀI — MỖI LẦN MỘT CÂU
     ============================================================ */
  var phien = null;

  function batDau(ch, ma) {
    var ds = rutDe(ch, ma);
    phien = { ch: ch, ma: ma, ds: ds, i: 0, diem: 0, xu: 0, chon: null, daCham: false };
    el.hoc.hidden = false;
    document.body.classList.add('khoa-cuon');
    veCau();
  }

  function thoat() {
    el.hoc.hidden = true;
    document.body.classList.remove('khoa-cuon');
    phien = null;
    veCu(el.cuTop);
    veDuong();
  }
  el.hocDong.addEventListener('click', function () {
    if (phien && phien.i > 0 && !confirm('Thoát bài này? Phần đang làm sẽ không được lưu.')) return;
    thoat();
  });

  function xao(n) {
    var a = [], i, j, k, t;
    for (i = 0; i < n; i++) a.push(i);
    for (j = n - 1; j > 0; j--) { k = Math.floor(Math.random() * (j + 1)); t = a[j]; a[j] = a[k]; a[k] = t; }
    return a;
  }
  function nut(chu, khoa) {
    el.hocNut.textContent = chu;
    el.hocNut.disabled = !!khoa;
    el.hocNut.className = 'solid btn--lg btn--block';
  }

  function veCau() {
    var p = phien, c = p.ds[p.i];
    p.chon = (p.ma === 'dungsai') ? [null, null, null, null] : null;
    p.daCham = false;

    el.thanhDay.style.width = (p.i / p.ds.length * 100) + '%';
    el.hocDem.textContent = (p.i + 1) + '/' + p.ds.length;
    el.phanhoi.hidden = true;
    el.hoc.classList.remove('co-phanhoi');


    if (p.ma === 'tracnghiem') {
      var tt = xao(c.dapan.length);
      el.hocThan.innerHTML = '<h3 class="hoc__de">' + c.de + '</h3>' +
        '<div class="q__ds">' + tt.map(function (g, v) {
          return '<button class="opt" data-goc="' + g + '">' +
                 '<span class="opt__k">' + CHU_CAI[v] + '</span><span>' + c.dapan[g] + '</span></button>';
        }).join('') + '</div>';
      nut('Kiểm tra', true);

    } else if (p.ma === 'dungsai') {
      el.hocThan.innerHTML = '<h3 class="hoc__de">' + c.de + '</h3>' +
        '<div class="ys">' + c.y.map(function (y, j) {
          return '<div class="y" data-y="' + j + '">' +
                 '<span class="y__k">' + CHU_Y[j] + ')</span>' +
                 '<span class="y__t">' + y + '</span>' +
                 '<span class="y__n"><button class="ds" data-v="1">Đúng</button>' +
                 '<button class="ds" data-v="0">Sai</button></span></div>';
        }).join('') + '</div>';
      nut('Kiểm tra', true);

    } else {
      el.hocThan.innerHTML = '<h3 class="hoc__de">' + c.de + '</h3>' +
        '<div class="tln"><input type="text" id="oNhap" placeholder="Kết quả" autocomplete="off"></div>';
      nut('Kiểm tra', true);
      var o = document.getElementById('oNhap');
      o.addEventListener('input', function () {
        p.chon = o.value; el.hocNut.disabled = !o.value.trim();
      });
      o.addEventListener('keydown', function (ev) {
        if (ev.key === 'Enter' && !el.hocNut.disabled) el.hocNut.click();
      });
      setTimeout(function () { o.focus(); }, 60);

    }
    toan(el.hocThan);
  }

  el.hocThan.addEventListener('click', function (ev) {
    var p = phien;
    if (!p || p.daCham) return;
    var o = ev.target.closest('.opt');
    if (o) {
      p.chon = +o.dataset.goc;
      el.hocThan.querySelectorAll('.opt').forEach(function (b) { b.classList.remove('is-pick'); });
      o.classList.add('is-pick');
      el.hocNut.disabled = false;
      return;
    }
    var d = ev.target.closest('.ds');
    if (d) {
      var hang = d.closest('.y');
      p.chon[+hang.dataset.y] = +d.dataset.v;
      hang.querySelectorAll('.ds').forEach(function (b) { b.classList.remove('is-pick'); });
      d.classList.add('is-pick');
      el.hocNut.disabled = p.chon.indexOf(null) !== -1;
    }
  });

  function chuanHoa(s) {
    return String(s).trim().toLowerCase().replace(/\s+/g, '').replace(/,/g, '.');
  }

  el.hocNut.addEventListener('click', function () {
    var p = phien, c = p.ds[p.i];

    if (!p.daCham) {
      p.daCham = true;
      var dung = false, soY = 0;

      if (p.ma === 'tracnghiem') {
        el.hocThan.querySelectorAll('.opt').forEach(function (o) {
          var g = +o.dataset.goc;
          o.classList.remove('is-pick');
          if (g === c.dung) o.classList.add('is-right');
          else if (g === p.chon) o.classList.add('is-wrong');
        });
        dung = p.chon === c.dung;
        if (dung) { p.diem++; p.xu += xuCau('tracnghiem', c); }

      } else if (p.ma === 'dungsai') {
        el.hocThan.querySelectorAll('.y').forEach(function (hang, j) {
          var dap = c.dung[j] ? 1 : 0;
          hang.classList.add(p.chon[j] === dap ? 'is-right' : 'is-wrong');
          hang.querySelectorAll('.ds').forEach(function (b) {
            b.classList.remove('is-pick');
            if (+b.dataset.v === dap) b.classList.add('is-key');
          });
          if (p.chon[j] === dap) soY++;
        });
        dung = soY === 4;
        if (dung) { p.diem++; p.xu += xuCau('dungsai', c); }

      } else {
        var o2 = document.getElementById('oNhap');
        o2.disabled = true;
        dung = chuanHoa(p.chon) === chuanHoa(c.dapan);
        o2.classList.add(dung ? 'is-right' : 'is-wrong');
        if (dung) { p.diem++; p.xu += xuCau('traloingan', c); }
      }

      var tieu = dung ? 'Chính xác!' : 'Chưa đúng.';
      var giai = '';
      if (p.ma === 'traloingan' && !dung) giai = 'Đáp án: <strong>' + c.dapan + '</strong>';

      el.phanhoi.className = 'phanhoi is-' + (dung ? 'dung' : 'sai');
      el.phanhoiTieu.textContent = tieu;
      el.phanhoiGiai.innerHTML = giai;
      el.phanhoiGiai.hidden = !giai;
      el.thanhDay.style.width = ((p.i + 1) / p.ds.length * 100) + '%';
      el.phanhoi.hidden = false;
      el.hoc.classList.add('co-phanhoi');
      cuPhanUng(el.cuPhanHoi, dung);
      if (dung) phaoGiay(el.phaoHoc, 40);
      toan(el.phanhoi);

      nut(p.i + 1 < p.ds.length ? 'Tiếp tục' : 'Hoàn thành', false);
      el.hocNut.className += dung ? ' nut--dung' : ' nut--sai';
      return;
    }

    p.i++;
    if (p.i < p.ds.length) veCau(); else ketThuc();
  });

  /* ---------- Kết thúc một lượt làm bài ---------- */
  function ketThuc() {
    var p = phien, ch = p.ch, ma = p.ma;
    var max = toiDa(ma, p.ds);
    var can = canDat(ma, max);
    var dat = (p.diem >= can);

    var hs = hoSo(ch.id, ma);
    if (dat) hs.xong = true;
    if (typeof hs.diem !== 'number' || p.diem > hs.diem) hs.diem = p.diem;
    ghi();

    el.hoc.hidden = true;
    document.body.classList.remove('khoa-cuon');

    var ic = CHUONG_TRINH.indexOf(ch);
    var tenDang = DANG.filter(function (d) { return d.ma === ma; })[0].ten;

    el.mungTieu.textContent = dat ? 'Hoàn thành!' : 'Chưa hoàn thành';
    el.mungTen.textContent = 'Chương ' + CHU_SO[ic] + ' · ' + tenDang;

    if (p.xu > 0) themXu(p.xu);
    el.mungPhu.textContent = 'Đúng ' + p.diem + '/' + max +
      (p.xu > 0 ? ', nhận được ' + p.xu + ' xu 🪙' : '') +
      (dat ? '.' : '. Cần ' + can + '/' + max + ' để hoàn thành, em làm lại nhé.');

    cuPhanUng(el.cuMung, dat);
    el.mung.hidden = false;
    if (dat) phaoGiay(el.phaoHoc, 60);
    phien = null;
  }

  function dongMung() {
    el.mung.hidden = true;
    veCu(el.cuTop);
    veDuong();
  }
  el.mungOk.addEventListener('click', dongMung);
  el.mung.addEventListener('click', function (ev) { if (ev.target === el.mung) dongMung(); });
  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape' && !el.mung.hidden) dongMung();
  });



  /* ---------- Cửa hàng ---------- */
  function veCho() {
    veSoXu();
    veCu(el.cuCho);

    el.hangDiem.innerHTML =
      '<div class="mon mon--diem">' +
        '<span class="mon__hinh">🎟️</span>' +
        '<div class="mon__chu"><b>Điểm cộng</b>' +
          '<small>Em đã đổi được ' + vi.phieu + ' điểm cộng.</small></div>' +
        '<button class="mon__nut' + (vi.xu >= giaDiemCong() ? '' : ' is-thieu') +
          '" data-diem="1">🪙 ' + giaDiemCong() + '</button>' +
      '</div>';

    el.hangNha.innerHTML = NHA.map(function (h) {
      var co = vi.co.indexOf(h.ma) !== -1, dat = vi.mac.indexOf(h.ma) !== -1;
      var nut = co
        ? '<button class="mon__nut mon__nut--' + (dat ? 'bo' : 'mac') + '" data-mac="' + h.ma + '">' +
          (dat ? 'Cất đi' : 'Bày ra') + '</button>'
        : '<button class="mon__nut' + (vi.xu >= h.gia ? '' : ' is-thieu') +
          '" data-mua="' + h.ma + '">🪙 ' + h.gia + '</button>';
      return '<div class="mon' + (co ? ' is-co' : '') + '">' +
               '<span class="mon__hinh">' + h.hinh + '</span>' +
               '<div class="mon__chu"><b>' + h.ten + '</b>' +
                 '<small>' + (dat ? 'Đang bày trong nhà' : co ? 'Đã có, chưa bày' : 'Chưa mua') + '</small></div>' +
               nut + '</div>';
    }).join('');

    el.hangDo.innerHTML = HANG.map(function (h) {
      var co = vi.co.indexOf(h.ma) !== -1;
      var mac = vi.mac.indexOf(h.ma) !== -1;
      var nut = co
        ? '<button class="mon__nut mon__nut--' + (mac ? 'bo' : 'mac') + '" data-mac="' + h.ma + '">' +
          (mac ? 'Bỏ ra' : 'Mặc vào') + '</button>'
        : '<button class="mon__nut' + (vi.xu >= h.gia ? '' : ' is-thieu') +
          '" data-mua="' + h.ma + '">🪙 ' + h.gia + '</button>';
      return '<div class="mon' + (co ? ' is-co' : '') + '">' +
               '<span class="mon__hinh">' + HINH_DO[h.ma] + '</span>' +
               '<div class="mon__chu"><b>' + h.ten + '</b>' +
                 '<small>' + (mac ? 'Cú mèo đang mặc' : co ? 'Đã có' : 'Chưa mua') + '</small></div>' +
               nut +
             '</div>';
    }).join('');
  }

  var HINH_DO = {
    mu: '🎓', kinh: '👓', khan: '🧣', but: '✏️', huy: '🏅',
    sach: '📗', sao: '⭐', ao: '🦸', vuong: '👑'
  };

  function moCho() { veCho(); el.cho.hidden = false; }
  el.btnXu.addEventListener('click', moCho);
  el.choDong.addEventListener('click', function () { el.cho.hidden = true; });
  el.cho.addEventListener('click', function (ev) { if (ev.target === el.cho) el.cho.hidden = true; });

  el.cho.addEventListener('click', function (ev) {
    var b = ev.target.closest('.mon__nut');
    if (!b) return;

    if (b.dataset.diem) {
      if (vi.xu < giaDiemCong()) { nhacThieu(b); return; }
      vi.xu -= giaDiemCong();
      vi.phieu += 1;
      ghiVi(); veCho();
      phaoGiay(el.phaoHoc, 40);
      alert('Em đã đổi được 1 điểm cộng. Tổng cộng: ' + vi.phieu + ' điểm cộng.');
      return;
    }

    if (b.dataset.mua) {
      var h = HANG.concat(NHA).filter(function (x) { return x.ma === b.dataset.mua; })[0];
      if (!h || vi.xu < h.gia) { nhacThieu(b); return; }
      vi.xu -= h.gia;
      vi.co.push(h.ma);
      vi.mac.push(h.ma);
      ghiVi(); veCho(); veCu(el.cuTop); veNha();
      phaoGiay(el.phaoHoc, 24);
      return;
    }

    if (b.dataset.mac) {
      var ma = b.dataset.mac;
      var k = vi.mac.indexOf(ma);
      if (k === -1) vi.mac.push(ma); else vi.mac.splice(k, 1);
      ghiVi(); veCho(); veCu(el.cuTop); veNha();
    }
  });

  function nhacThieu(b) {
    b.classList.remove('lac'); void b.offsetWidth; b.classList.add('lac');
  }


  /* ============================================================
     NHÀ CỦA CÚ — MÀN HÌNH CHÍNH
     Một căn phòng tràn màn hình. Bầu trời ngoài cửa sổ đổi theo giờ
     thật, bụi bay lơ lửng trong nắng, cú thở đều và biết nói chuyện.
     ============================================================ */

  /* Chiều cao thanh đầu đổi theo khổ màn hình, đo rồi báo cho CSS biết
     để căn phòng chiếm đúng phần còn lại, không thừa không thiếu. */
  function doThanhDau() {
    var t = document.querySelector('.top');
    if (t) document.documentElement.style.setProperty('--cao-top', t.offsetHeight + 'px');
  }
  doThanhDau();
  window.addEventListener('resize', doThanhDau);

  function khungGio() {
    var g = new Date().getHours();
    if (g >= 5  && g < 10) return 'sang';
    if (g >= 10 && g < 15) return 'trua';
    if (g >= 15 && g < 18) return 'chieu';
    return 'toi';
  }

  /* Bụi sáng bay trong phòng. Chỉ rắc một lần, sau đó CSS lo phần động. */
  function raiBui() {
    if (!el.canhBui || el.canhBui.children.length) return;
    var n = window.innerWidth < 420 ? 9 : 14, h = '';
    for (var i = 0; i < n; i++) {
      h += '<i class="bui" style="left:' + ri(2, 96) + '%;bottom:' + ri(8, 40) + '%;' +
           'animation-duration:' + ri(14, 30) + 's;animation-delay:-' + ri(0, 26) + 's;' +
           'opacity:' + (ri(35, 80) / 100) + '"></i>';
    }
    el.canhBui.innerHTML = h;
  }
  function ri(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }

  /* ---------- Cú nói chuyện ---------- */
  var LOI_CU = {
    sang:  ['Chào buổi sáng! Hôm nay học gì nào?',
            'Dậy sớm thế, giỏi quá!',
            'Làm một bài cho tỉnh ngủ nhé.'],
    trua:  ['Trưa rồi, nghỉ tay chút rồi học tiếp nha.',
            'Mình làm vài câu thôi, không cần nhiều đâu.',
            'Nắng đẹp ghê. Học xong đi chơi nhé!'],
    chieu: ['Chiều nay làm một chương nhé?',
            'Cố thêm chút nữa là xong rồi đó.',
            'Mình chờ bạn ở phòng học nè.'],
    toi:   ['Tối rồi, học nhẹ nhàng thôi nha.',
            'Một bài nữa rồi đi ngủ nhé.',
            'Khuya rồi đó, giữ sức khoẻ nha bạn.']
  };
  var LOI_THEM = [
    'Mỗi ngày một chút, lâu dần thành giỏi.',
    'Sai cũng không sao, biết vì sao sai mới quan trọng.',
    'Bạn làm được mà, mình tin đó.',
    'Làm sai một câu thì học được một điều.'
  ];

  var henBong = null;
  function cuNoi(chu, giay) {
    if (!el.bongNoi) return;
    el.bongNoiChu.textContent = chu;
    el.bongNoi.hidden = false;
    el.bongNoi.style.animation = 'none';
    void el.bongNoi.offsetWidth;
    el.bongNoi.style.animation = '';
    clearTimeout(henBong);
    henBong = setTimeout(function () { el.bongNoi.hidden = true; }, (giay || 5) * 1000);
  }
  function loiNgauNhien() {
    var kho = LOI_CU[khungGio()].concat(LOI_THEM);
    /* Nói về căn nhà thì phải đúng với tình trạng thật, không thì
       nhà đủ đồ rồi mà cú vẫn kêu trống, nghe vô duyên. */
    var day = NHA.filter(function (h) { return vi.mac.indexOf(h.ma) !== -1; }).length;
    if (day === 0)
      kho = kho.concat(['Nhà trống quá, mua cho mình chậu cây đi!',
                        'Bạn trang trí nhà giúp mình với.']);
    else if (day >= NHA.length)
      kho = kho.concat(['Nhà mình đủ đồ rồi, đẹp quá, cảm ơn bạn nhé!',
                        'Nhà đẹp thế này học cũng vui hơn hẳn.']);
    else
      kho = kho.concat(['Học xong nhớ ghé cửa hàng sắm thêm đồ nhé!',
                        'Còn ' + (NHA.length - day) + ' món nữa là nhà mình đủ đồ đó.']);
    return kho[Math.floor(Math.random() * kho.length)];
  }

  /* ---------- Vẽ lại cả căn phòng ---------- */
  function veNha() {
    if (!el.phong) return;
    el.phong.querySelectorAll('.do-nha').forEach(function (e) { e.remove(); });

    el.phong.className = 'canh gio-' + khungGio();
    raiBui();

    var day = 0;
    NHA.forEach(function (h) {
      if (vi.mac.indexOf(h.ma) === -1) return;
      day++;
      el.phong.insertAdjacentHTML('beforeend',
        '<span class="do-nha" title="' + h.ten + '" style="left:' + h.x + '%;top:' + h.y + '%">' +
        h.hinh + '</span>');
    });
    veCu(el.cuNha);

    el.nhaNho.textContent =
      day >= NHA.length ? 'Nhà cú đã đủ ' + NHA.length + '/' + NHA.length + ' món đồ 🎉'
      : day             ? 'Nhà cú đã có ' + day + '/' + NHA.length + ' món đồ'
                        : 'Nhà còn trống trơn, trang trí cho cú nào';
    if (el.nhaVach) el.nhaVach.style.width = (day / NHA.length * 100) + '%';
  }

  /* Chạm vào cú thì cú vui và nói một câu */
  if (el.cuNha) {
    el.cuNha.addEventListener('click', function () {
      cuPhanUng(el.cuNha, true);
      cuNoi(loiNgauNhien());
    });
  }

  /* ---------- Chuyển qua lại hai màn hình chính ----------
     'nha'  nhà của cú, đây là màn hình mở ra đầu tiên
     'hoc'  lộ trình chín chương
     Nút góc phải đổi chữ theo màn hình đang xem, nên chỉ cần một nút
     là đi được cả hai chiều. */
  var manHinh = 'nha';

  function hienMan(ten) {
    manHinh = ten;
    var laNha = (ten === 'nha');
    el.viewNha.hidden  = !laNha;
    el.viewList.hidden = laNha;
    el.btnHocChu.textContent = laNha ? 'Học tập' : 'Nhà cú';
    el.btnHoc.querySelector('.hoctap__hinh').textContent = laNha ? '📚' : '🏠';
    el.btnHoc.title = laNha ? 'Vào phần học tập' : 'Về nhà của cú';
    if (laNha) { veNha(); cuNoi(loiNgauNhien(), 6); }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  el.btnHoc.addEventListener('click', function () {
    hienMan(manHinh === 'nha' ? 'hoc' : 'nha');
  });
  el.nhaHoc.addEventListener('click', function () { hienMan('hoc'); });
  el.cuTop.addEventListener('click', function () { hienMan('nha'); });
  el.nhaMua.addEventListener('click', function () { moCho(); });

  /* ============================================================
     ĐĂNG NHẬP VÀ ĐỒNG BỘ VỚI MÁY CHỦ
     ============================================================ */
  function hienBuoc(ten) {
    ['buocChua', 'buocKhai', 'buocCho', 'buocLoi'].forEach(function (b) {
      el[b].hidden = (b !== ten);
    });
    el.nutRaPhu.hidden = (ten === 'buocChua');
    el.vao.hidden = false;
    document.body.classList.add('khoa-cuon');
    veCu(el.cuVao);
  }

  function vaoHoc(du) {
    // Lấy dữ liệu trên máy chủ về, đè lên bản lưu trong máy
    tienDo = du.tienDo || {};
    vi = { xu: du.xu || 0, co: du.co || [], mac: du.mac || [], phieu: du.phieu || 0 };
    try {
      localStorage.setItem(KEY, JSON.stringify(tienDo));
      localStorage.setItem(VI_KEY, JSON.stringify(vi));
    } catch (e) {}

    el.vao.hidden = true;
    document.body.classList.remove('khoa-cuon');
    if (el.btnRa) {
      el.btnRa.hidden = false;
      el.btnRa.title = du.ten + ' · ' + du.lop + ' — bấm để đăng xuất';
    }

    veSoXu();
    veCu(el.cuTop);
    veDuong();
  }

  function theoDoi() {
    FB.batDau(function (t) {
      if (t.loai === 'loi') {
        el.loiChu.textContent = t.e
          ? 'Lỗi: ' + (t.e.message || t.e) + '. Em kiểm tra mạng rồi tải lại trang nhé.'
          : 'Em kiểm tra lại mạng rồi tải lại trang nhé.';
        hienBuoc('buocLoi');
        return;
      }
      if (t.loai === 'chua') { hienBuoc('buocChua'); return; }
      if (t.loai === 'khai') {
        el.khaiTen.value = t.u.displayName || '';
        el.khaiBao.textContent = '';
        hienBuoc('buocKhai');
        return;
      }
      if (t.loai === 'cho') {
        el.choChu.textContent = 'Thầy cô đã nhận hồ sơ của ' + t.du.ten + ' lớp ' + t.du.lop +
          '. Khi nào được duyệt em vào học được ngay. Thử bấm Kiểm tra lại sau một lúc nhé.';
        hienBuoc('buocCho');
        return;
      }
      vaoHoc(t.du);
    }, true);
  }

  el.nutKhai.addEventListener('click', function () {
    var ten = el.khaiTen.value.replace(/\s+/g, ' ').trim();
    var lop = el.khaiLop.value.replace(/\s+/g, '').trim().toUpperCase();
    if (ten.length < 2) { el.khaiBao.textContent = 'Em nhập họ tên đầy đủ nhé.'; return; }
    if (!lop)           { el.khaiBao.textContent = 'Em nhập lớp nhé, ví dụ 10A1.'; return; }
    el.nutKhai.disabled = true;
    el.khaiBao.textContent = 'Đang gửi...';
    FB.taoHoSo(ten, lop).then(function (d) {
      el.nutKhai.disabled = false;
      el.choChu.textContent = 'Thầy cô đã nhận hồ sơ của ' + d.ten + ' lớp ' + d.lop +
        '. Khi nào được duyệt em vào học được ngay.';
      hienBuoc('buocCho');
    }).catch(function (e) {
      el.nutKhai.disabled = false;
      el.khaiBao.textContent = 'Gửi không được: ' + (e.message || e);
    });
  });

  el.nutKiemTra.addEventListener('click', function () { location.reload(); });
  el.nutTaiLai.addEventListener('click', function () { location.reload(); });
  el.nutRaPhu.addEventListener('click', function () { FB.ra().then(function(){ location.reload(); }); });
  if (el.btnRa) el.btnRa.addEventListener('click', function () {
    if (confirm('Đăng xuất khỏi tài khoản này?')) FB.ra().then(function(){ location.reload(); });
  });

  /* ============================================================
     CÁC NÚT CHUNG
     ============================================================ */
  el.brandHome.addEventListener('click', function (ev) {
    ev.preventDefault(); hienMan('nha');
  });

  /* ---------- Khởi động ---------- */
  veSoXu();
  veCu(el.cuTop);
  veDuong();
  hienMan('nha');

  if (window.FB) theoDoi();
  else { el.loiChu.textContent = 'Không nạp được thư viện Firebase. Em kiểm tra mạng nhé.'; hienBuoc('buocLoi'); }
})();
