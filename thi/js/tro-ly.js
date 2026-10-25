/* ============================================================
   tro-ly.js — TRỢ LÝ HỌC TẬP

   Chạy hoàn toàn trong trình duyệt, không gọi máy chủ và không cần
   mạng, đúng tinh thần của bản dự thi. Học sinh gõ một câu hỏi ngắn,
   trợ lý tìm trong kho kiến thức dưới đây rồi trả lời kèm công thức.

   Thêm kiến thức mới: viết thêm một mục vào mảng KIEN_THUC, gồm
     tu    các từ khoá để tìm (viết thường, không dấu cũng được)
     tieu  tiêu đề hiện trên câu trả lời
     noi   phần giải thích, công thức đặt giữa hai dấu $ ... $
   ============================================================ */
(function () {
  'use strict';
  var R = String.raw;

  var KIEN_THUC = [
    { tu:'mệnh đề phủ định kéo theo tương đương', tieu:'Mệnh đề',
      noi: R`Mệnh đề là câu khẳng định đúng hoặc sai, không thể vừa đúng vừa sai. Câu hỏi và câu cảm thán không phải mệnh đề.<br>
      $P \Rightarrow Q$ chỉ sai khi $P$ đúng mà $Q$ sai. Mệnh đề đảo là $Q \Rightarrow P$.<br>
      Phủ định: $\overline{\forall x \in X,\ P(x)}$ là $\exists x \in X,\ \overline{P(x)}$.` },
    { tu:'tập hợp giao hợp hiệu tập con phần bù', tieu:'Tập hợp và các phép toán',
      noi: R`$A \cap B$ gồm phần tử thuộc cả hai; $A \cup B$ thuộc ít nhất một; $A \setminus B$ thuộc $A$ mà không thuộc $B$.<br>
      Tập có $n$ phần tử có $2^n$ tập con. Công thức đếm: $|A \cup B| = |A| + |B| - |A \cap B|$.` },
    { tu:'bất phương trình bậc nhất hai ẩn miền nghiệm', tieu:'Bất phương trình bậc nhất hai ẩn',
      noi: R`Dạng $ax + by + c \lt 0$ (hoặc $\gt, \le, \ge$) với $a$, $b$ không đồng thời bằng $0$.<br>
      Miền nghiệm là một nửa mặt phẳng bờ $ax + by + c = 0$. Cách làm: vẽ đường thẳng bờ rồi thử một điểm, thường lấy $O(0;0)$.` },
    { tu:'hệ bất phương trình miền đa giác giá trị lớn nhất nhỏ nhất quy hoạch',
      tieu:'Hệ bất phương trình bậc nhất hai ẩn',
      noi: R`Miền nghiệm của hệ là giao các nửa mặt phẳng, thường là một đa giác.<br>
      Biểu thức $F = ax + by$ đạt giá trị lớn nhất và nhỏ nhất tại <b>một đỉnh</b> của đa giác đó. Vậy chỉ cần thay toạ độ từng đỉnh rồi so sánh.` },
    { tu:'giá trị lượng giác góc bù sin cos tan cot 180 độ', tieu:'Giá trị lượng giác của góc từ 0° đến 180°',
      noi: R`$\sin^2\alpha + \cos^2\alpha = 1$ và $\sin\alpha \ge 0$ với mọi $\alpha \in [0^\circ; 180^\circ]$.<br>
      Hai góc bù nhau: $\sin(180^\circ - \alpha) = \sin\alpha$, $\cos(180^\circ - \alpha) = -\cos\alpha$, $\tan(180^\circ-\alpha) = -\tan\alpha$.<br>
      Nhớ: $\sin 30^\circ = \dfrac{1}{2}$, $\sin 45^\circ = \dfrac{\sqrt2}{2}$, $\sin 60^\circ = \dfrac{\sqrt3}{2}$.` },
    { tu:'định lí côsin cosin tính cạnh tam giác', tieu:'Định lí côsin',
      noi: R`$a^2 = b^2 + c^2 - 2bc\cos A$, từ đó $\cos A = \dfrac{b^2 + c^2 - a^2}{2bc}$.<br>
      Dùng khi biết hai cạnh và góc xen giữa, hoặc biết cả ba cạnh cần tìm góc.` },
    { tu:'định lí sin bán kính đường tròn ngoại tiếp', tieu:'Định lí sin',
      noi: R`$\dfrac{a}{\sin A} = \dfrac{b}{\sin B} = \dfrac{c}{\sin C} = 2R$.<br>
      Dùng khi biết một cạnh và góc đối diện, hoặc cần tìm bán kính $R$ của đường tròn ngoại tiếp.` },
    { tu:'diện tích tam giác heron nửa chu vi', tieu:'Công thức diện tích tam giác',
      noi: R`$S = \dfrac{1}{2}ab\sin C = \dfrac{abc}{4R} = pr = \sqrt{p(p-a)(p-b)(p-c)}$ với $p = \dfrac{a+b+c}{2}$.<br>
      Biết hai cạnh và góc xen giữa thì dùng công thức đầu, biết ba cạnh thì dùng công thức Heron.` },
    { tu:'vectơ vecto cùng phương cùng hướng bằng nhau độ dài', tieu:'Các khái niệm về vectơ',
      noi: R`Vectơ là đoạn thẳng có hướng. Hai vectơ bằng nhau khi <b>cùng hướng và cùng độ dài</b>.<br>
      Quy tắc ba điểm: $\overrightarrow{AB} + \overrightarrow{BC} = \overrightarrow{AC}$. Quy tắc hình bình hành: $\overrightarrow{AB} + \overrightarrow{AD} = \overrightarrow{AC}$.` },
    { tu:'toạ độ vectơ khoảng cách hai điểm trung điểm trọng tâm', tieu:'Vectơ trong mặt phẳng toạ độ',
      noi: R`$\overrightarrow{AB} = (x_B - x_A;\ y_B - y_A)$ và $AB = \sqrt{(x_B-x_A)^2 + (y_B-y_A)^2}$.<br>
      Trung điểm: $M\left(\dfrac{x_A+x_B}{2}; \dfrac{y_A+y_B}{2}\right)$. Trọng tâm: $G\left(\dfrac{x_A+x_B+x_C}{3}; \dfrac{y_A+y_B+y_C}{3}\right)$.` },
    { tu:'tích vô hướng góc giữa hai vectơ vuông góc', tieu:'Tích vô hướng',
      noi: R`$\vec{a}\cdot\vec{b} = |\vec{a}||\vec{b}|\cos(\vec{a},\vec{b})$; theo toạ độ $\vec{a}\cdot\vec{b} = a_1b_1 + a_2b_2$.<br>
      Hai vectơ vuông góc khi và chỉ khi $\vec{a}\cdot\vec{b} = 0$.` },
    { tu:'số gần đúng sai số quy tròn làm tròn', tieu:'Số gần đúng và sai số',
      noi: R`Sai số tuyệt đối $\Delta_a = |\bar{a} - a|$, sai số tương đối $\delta_a = \dfrac{\Delta_a}{|a|}$.<br>
      Quy tròn: nhìn chữ số ngay sau hàng cần làm tròn, nếu nó $\ge 5$ thì tăng một đơn vị, nếu nhỏ hơn $5$ thì giữ nguyên.` },
    { tu:'số trung bình trung vị mốt tứ phân vị xu thế trung tâm', tieu:'Số đặc trưng đo xu thế trung tâm',
      noi: R`Số trung bình $\bar{x} = \dfrac{x_1 + x_2 + \dots + x_n}{n}$.<br>
      Trung vị là giá trị đứng giữa khi đã sắp thứ tự (mẫu chẵn thì lấy trung bình hai giá trị giữa). Mốt là giá trị xuất hiện nhiều nhất.<br>
      Khi mẫu có giá trị bất thường, nên dùng trung vị thay cho số trung bình.` },
    { tu:'phương sai độ lệch chuẩn khoảng biến thiên khoảng tứ phân vị phân tán',
      tieu:'Số đặc trưng đo độ phân tán',
      noi: R`Khoảng biến thiên $R = x_{\max} - x_{\min}$; khoảng tứ phân vị $\Delta_Q = Q_3 - Q_1$.<br>
      Phương sai $s^2 = \dfrac{1}{n}\sum (x_i - \bar{x})^2$, độ lệch chuẩn $s = \sqrt{s^2}$.<br>
      Giá trị bất thường là giá trị nhỏ hơn $Q_1 - 1{,}5\Delta_Q$ hoặc lớn hơn $Q_3 + 1{,}5\Delta_Q$.` },
    { tu:'hàm số tập xác định đồng biến nghịch biến', tieu:'Hàm số',
      noi: R`Tập xác định là tập các giá trị $x$ làm biểu thức có nghĩa: mẫu khác $0$, biểu thức dưới căn bậc hai không âm.<br>
      Hàm đồng biến khi $x$ tăng thì $y$ tăng, nghịch biến khi $x$ tăng thì $y$ giảm.` },
    { tu:'hàm số bậc hai parabol đỉnh trục đối xứng', tieu:'Hàm số bậc hai',
      noi: R`$y = ax^2 + bx + c$ có đỉnh $I\left(-\dfrac{b}{2a};\ -\dfrac{\Delta}{4a}\right)$, trục đối xứng $x = -\dfrac{b}{2a}$.<br>
      $a \gt 0$: bề lõm lên trên, hàm đạt giá trị nhỏ nhất tại đỉnh. $a \lt 0$: bề lõm xuống dưới, đạt giá trị lớn nhất tại đỉnh.` },
    { tu:'dấu tam thức bậc hai bất phương trình bậc hai', tieu:'Dấu của tam thức bậc hai',
      noi: R`Nếu $\Delta \lt 0$ thì $f(x)$ luôn cùng dấu với $a$ với mọi $x$.<br>
      Nếu $\Delta \gt 0$, $f(x)$ trái dấu với $a$ giữa hai nghiệm, cùng dấu với $a$ ngoài khoảng hai nghiệm.<br>
      Nhớ câu: "trong trái, ngoài cùng".` },
    { tu:'phương trình chứa căn quy về bậc hai', tieu:'Phương trình quy về phương trình bậc hai',
      noi: R`Với $\sqrt{A} = B$: bình phương hai vế rồi <b>kiểm tra lại</b> điều kiện $B \ge 0$ và $A \ge 0$.<br>
      Với $\sqrt{A} = \sqrt{B}$: giải $A = B$ kèm điều kiện $A \ge 0$. Luôn thử lại nghiệm vào phương trình gốc.` },
    { tu:'phương trình đường thẳng vectơ pháp tuyến chỉ phương tham số', tieu:'Phương trình đường thẳng',
      noi: R`Dạng tổng quát $ax + by + c = 0$ nhận $\vec{n} = (a; b)$ làm vectơ pháp tuyến và $\vec{u} = (-b; a)$ làm vectơ chỉ phương.<br>
      Đi qua $M(x_0; y_0)$ với pháp tuyến $(a; b)$: $a(x - x_0) + b(y - y_0) = 0$.` },
    { tu:'khoảng cách từ điểm đến đường thẳng góc giữa hai đường song song cắt nhau',
      tieu:'Vị trí tương đối, góc và khoảng cách',
      noi: R`$d(M, \Delta) = \dfrac{|ax_0 + by_0 + c|}{\sqrt{a^2 + b^2}}$.<br>
      Hai đường song song khi $\dfrac{a_1}{a_2} = \dfrac{b_1}{b_2} \ne \dfrac{c_1}{c_2}$, trùng nhau khi cả ba tỉ số bằng nhau, cắt nhau khi $\dfrac{a_1}{a_2} \ne \dfrac{b_1}{b_2}$.` },
    { tu:'đường tròn phương trình tâm bán kính tiếp tuyến', tieu:'Đường tròn trong mặt phẳng toạ độ',
      noi: R`$(x-a)^2 + (y-b)^2 = R^2$ có tâm $I(a; b)$, bán kính $R$.<br>
      Dạng khai triển $x^2 + y^2 - 2ax - 2by + c = 0$ là đường tròn khi $a^2 + b^2 - c \gt 0$, khi đó $R = \sqrt{a^2+b^2-c}$.` },
    { tu:'elip hypebol parabol conic tiêu điểm', tieu:'Ba đường conic',
      noi: R`Elip $\dfrac{x^2}{a^2} + \dfrac{y^2}{b^2} = 1$ có trục lớn $2a$, trục nhỏ $2b$, tiêu cự $2c$ với $c^2 = a^2 - b^2$.<br>
      Hypebol $\dfrac{x^2}{a^2} - \dfrac{y^2}{b^2} = 1$ với $c^2 = a^2 + b^2$. Parabol $y^2 = 2px$ có tiêu điểm $F\left(\dfrac{p}{2}; 0\right)$.` },
    { tu:'quy tắc đếm cộng nhân', tieu:'Quy tắc đếm',
      noi: R`Quy tắc cộng: công việc có nhiều phương án <b>rời nhau</b> thì cộng số cách.<br>
      Quy tắc nhân: công việc gồm nhiều công đoạn <b>liên tiếp</b> thì nhân số cách.` },
    { tu:'hoán vị chỉnh hợp tổ hợp giai thừa', tieu:'Hoán vị, chỉnh hợp, tổ hợp',
      noi: R`$P_n = n!$ (xếp tất cả), $A_n^k = \dfrac{n!}{(n-k)!}$ (chọn $k$ rồi xếp thứ tự), $C_n^k = \dfrac{n!}{k!(n-k)!}$ (chỉ chọn, không xếp).<br>
      Mẹo phân biệt: đề có "xếp", "thứ tự", "chức vụ" thì dùng chỉnh hợp; đề chỉ "chọn ra" thì dùng tổ hợp.` },
    { tu:'nhị thức newton khai triển hệ số', tieu:'Nhị thức Newton',
      noi: R`$(a+b)^n = \sum_{k=0}^{n} C_n^k a^{n-k} b^k$, khai triển có $n+1$ số hạng.<br>
      Số hạng tổng quát: $T_{k+1} = C_n^k a^{n-k} b^k$.` },
    { tu:'biến cố không gian mẫu xác suất cổ điển biến cố đối', tieu:'Biến cố và xác suất cổ điển',
      noi: R`$P(A) = \dfrac{n(A)}{n(\Omega)}$ với $n(\Omega)$ là số kết quả có thể, $n(A)$ là số kết quả thuận lợi.<br>
      Luôn có $0 \le P(A) \le 1$ và $P(\overline{A}) = 1 - P(A)$.` },
    { tu:'tính xác suất bi thẻ xúc xắc đồng xu thực hành', tieu:'Thực hành tính xác suất',
      noi: R`Ba bước: (1) đếm $n(\Omega)$, (2) đếm $n(A)$, (3) chia.<br>
      Bài lấy đồng thời nhiều vật thường dùng tổ hợp: lấy $k$ vật từ $n$ vật có $C_n^k$ cách.<br>
      Gieo hai con xúc xắc thì $n(\Omega) = 36$.` }
  ];

  var GOI_Y = ['Định lí côsin', 'Diện tích tam giác', 'Tích vô hướng',
               'Dấu tam thức bậc hai', 'Tổ hợp và chỉnh hợp', 'Xác suất cổ điển'];

  /* bỏ dấu tiếng Việt để so khớp cho dễ */
  function khong_dau(s) {
    return s.toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/đ/g, 'd').replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
  }

  function timCauTraLoi(hoi) {
    var tu = khong_dau(hoi).split(' ').filter(function (t) { return t.length > 1; });
    if (!tu.length) return null;
    var tot = null, diemTot = 0;
    KIEN_THUC.forEach(function (m) {
      var kho = khong_dau(m.tu + ' ' + m.tieu);
      var diem = 0;
      tu.forEach(function (t) { if (kho.indexOf(t) >= 0) diem += t.length; });
      if (diem > diemTot) { diemTot = diem; tot = m; }
    });
    return diemTot >= 4 ? tot : null;
  }

  /* ---------- giao diện ---------- */
  var nut = document.getElementById('tlNut');
  var hop = document.getElementById('tlHop');
  var than = document.getElementById('tlThan');
  var oGoi = document.getElementById('tlGoi');
  var form = document.getElementById('tlNhap');
  var o = document.getElementById('tlO');
  if (!nut || !hop) return;

  function toan(root) {
    if (!window.MathJax || !MathJax.startup) return;
    MathJax.startup.promise = MathJax.startup.promise
      .then(function () { return MathJax.typesetPromise([root]); })
      .catch(function () {});
  }

  function noi(ai, html) {
    var d = document.createElement('div');
    d.className = 'tl__loi tl__loi--' + ai;
    d.innerHTML = html;
    than.appendChild(d);
    than.scrollTop = than.scrollHeight;
    toan(d);
  }

  function hoi(cau) {
    noi('em', cau.replace(/</g, '&lt;'));
    var m = timCauTraLoi(cau);
    if (m) noi('tl', '<b>' + m.tieu + '</b><br>' + m.noi);
    else noi('tl', 'Phần này trợ lý chưa có sẵn. Em thử hỏi theo tên kiến thức, ví dụ ' +
      '<i>định lí sin</i>, <i>phương sai</i>, <i>phương trình đường tròn</i>, ' +
      '<i>hoán vị chỉnh hợp tổ hợp</i>. Trong lúc làm bài, mỗi câu sai đều có lời giải ngay bên dưới nhé.');
  }

  GOI_Y.forEach(function (g) {
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'tl__chip'; b.textContent = g;
    b.onclick = function () { hoi(g); };
    oGoi.appendChild(b);
  });

  nut.addEventListener('click', function () {
    hop.hidden = !hop.hidden;
    if (!hop.hidden) {
      if (!than.childElementCount)
        noi('tl', 'Chào em. Em hỏi một kiến thức trong chương trình Toán 10, ' +
                  'trợ lý nhắc lại định nghĩa và công thức cần nhớ. Bấm thử một gợi ý bên dưới nhé.');
      o.focus();
    }
  });
  document.getElementById('tlDong').addEventListener('click', function () { hop.hidden = true; });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var cau = o.value.trim();
    if (!cau) return;
    o.value = '';
    hoi(cau);
  });
})();
