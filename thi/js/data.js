/* ============================================================
   data.js — TOÀN BỘ NỘI DUNG HỌC NẰM Ở ĐÂY
   Công thức viết bằng LaTeX, đặt giữa hai dấu $ ... $

   BA QUY TẮC DUY NHẤT KHI SỬA FILE NÀY
   1. Mọi chuỗi chữ bọc trong dấu nháy ngược ` ` và có chữ L đứng trước.
      Nhờ chữ L đó bạn viết \frac như bình thường, KHÔNG phải viết \\frac.
   2. Công thức toán đặt giữa hai dấu $ ... $ ngay trong câu văn.
   3. Dùng \lt và \gt thay cho dấu < và > (vì trang web hiểu nhầm hai dấu này).

   Cấu trúc một chương:
   {
     id, tap, mach ('dai-so' | 'hinh-hoc' | 'thong-ke'), ten,
     bai:    [tên các bài trong chương],
     cauhoi: {
       tracnghiem: [{ muc, dang, de, dapan: [4 phương án], dung: 0, giai }],
       dungsai:    [{ muc, dang, de, y: [4 ý], dung: [true,false,true,false], giai }],
       traloingan: [{ muc, dang, de, dapan: '8', giai }],
     }
   }

   muc là mức độ: 1 nhận biết, 2 thông hiểu, 3 vận dụng.
   dang là mã bài trong chương ('b1', 'b2', ...). Nhờ nó mà mỗi lượt
   làm bài trang rút đều các bài, không dồn hết vào một bài.

   Chương "Ôn tập giữa kì I" không viết sẵn câu hỏi mà dùng bộ sinh
   trong js/sinh.js, mỗi lượt một số liệu khác.
   ============================================================ */

const L = String.raw;   // cho phép viết \frac thay vì \\frac

const CHUONG_TRINH = [

/* ============================================================
   CHƯƠNG I. MỆNH ĐỀ VÀ TẬP HỢP
   ============================================================ */
{
  id: 1, tap: 1, mach: 'dai-so',
  ten: 'Chương I. Mệnh đề và tập hợp',
  nhan: 'Chương I',
  bai: ['Bài 1. Mệnh đề', 'Bài 2. Tập hợp và các phép toán trên tập hợp'],
  cauhoi: {
  tracnghiem: [
    { muc:1, dang:'b1', de: L`Câu nào sau đây là một mệnh đề?`,
      dapan: [L`Hôm nay trời đẹp quá!`, L`Bạn đã làm bài tập chưa?`, L`Số $17$ là số nguyên tố.`, L`$x + 3 = 7$`],
      dung: 2,
      giai: L`Mệnh đề là câu khẳng định đúng hoặc sai. "Số $17$ là số nguyên tố" là khẳng định đúng nên là mệnh đề. Câu cảm thán và câu hỏi không phải mệnh đề; $x + 3 = 7$ chỉ là mệnh đề chứa biến.` },
    { muc:1, dang:'b1', de: L`Mệnh đề $P \Rightarrow Q$ sai trong trường hợp nào?`,
      dapan: [L`$P$ đúng, $Q$ đúng`, L`$P$ đúng, $Q$ sai`, L`$P$ sai, $Q$ đúng`, L`$P$ sai, $Q$ sai`],
      dung: 1,
      giai: L`Theo định nghĩa, $P \Rightarrow Q$ chỉ sai duy nhất khi giả thiết đúng mà kết luận sai.` },
    { muc:2, dang:'b1', de: L`Phủ định của mệnh đề $\forall x \in \mathbb{R},\ x^2 \ge 0$ là:`,
      dapan: [L`$\exists x \in \mathbb{R},\ x^2 \lt 0$`, L`$\forall x \in \mathbb{R},\ x^2 \lt 0$`, L`$\exists x \in \mathbb{R},\ x^2 \ge 0$`, L`$\forall x \in \mathbb{R},\ x^2 \le 0$`],
      dung: 0,
      giai: L`Phủ định biến $\forall$ thành $\exists$, đồng thời phủ định mệnh đề bên trong: $x^2 \ge 0$ thành $x^2 \lt 0$.` },
    { muc:2, dang:'b1', de: L`Mệnh đề đảo của mệnh đề "Nếu tứ giác $ABCD$ là hình vuông thì nó là hình chữ nhật" là:`,
      dapan: [L`Nếu tứ giác $ABCD$ là hình chữ nhật thì nó là hình vuông.`,
              L`Nếu tứ giác $ABCD$ không là hình vuông thì nó không là hình chữ nhật.`,
              L`Tứ giác $ABCD$ là hình vuông khi và chỉ khi nó là hình chữ nhật.`,
              L`Nếu tứ giác $ABCD$ không là hình chữ nhật thì nó không là hình vuông.`],
      dung: 0,
      giai: L`Mệnh đề đảo của $P \Rightarrow Q$ là $Q \Rightarrow P$, tức đổi chỗ giả thiết và kết luận.` },
    { muc:1, dang:'b2', de: L`Cho $A = \{1; 2; 3; 4\}$ và $B = \{3; 4; 5\}$. Tập $A \cap B$ là:`,
      dapan: [L`$\{1; 2\}$`, L`$\{3; 4\}$`, L`$\{5\}$`, L`$\{1; 2; 3; 4; 5\}$`],
      dung: 1,
      giai: L`Giao của hai tập gồm các phần tử có mặt ở cả hai tập, đó là $3$ và $4$.` },
    { muc:1, dang:'b2', de: L`Tập hợp $\{x \in \mathbb{N} \mid x \lt 4\}$ viết bằng cách liệt kê là:`,
      dapan: [L`$\{1; 2; 3\}$`, L`$\{0; 1; 2; 3\}$`, L`$\{0; 1; 2; 3; 4\}$`, L`$\{1; 2; 3; 4\}$`],
      dung: 1,
      giai: L`Số tự nhiên nhỏ hơn $4$ gồm cả số $0$, nên tập đó là $\{0; 1; 2; 3\}$.` },
    { muc:2, dang:'b2', de: L`Cho $A = [-1; 5)$ và $B = (2; 7]$. Khi đó $A \cap B$ bằng:`,
      dapan: [L`$(2; 5)$`, L`$[-1; 7]$`, L`$(2; 5]$`, L`$[2; 5)$`],
      dung: 0,
      giai: L`Phần chung của hai tập là các số vừa lớn hơn $2$ vừa nhỏ hơn $5$, tức khoảng $(2; 5)$.` },
    { muc:3, dang:'b2', de: L`Cho $A = \{x \in \mathbb{R} \mid x^2 - 5x + 6 = 0\}$. Số phần tử của $A$ là:`,
      dapan: [L`$0$`, L`$1$`, L`$2$`, L`$3$`],
      dung: 2,
      giai: L`$x^2 - 5x + 6 = 0 \Leftrightarrow x = 2$ hoặc $x = 3$, vậy $A = \{2; 3\}$ có $2$ phần tử.` }
  ],
  dungsai: [
    { muc:2, dang:'b1', de: L`Cho hai mệnh đề $P$: "$12$ chia hết cho $4$" và $Q$: "$12$ là số chẵn".`,
      y: [L`$P$ là mệnh đề đúng.`, L`Mệnh đề $P \Rightarrow Q$ đúng.`,
          L`Phủ định của $P$ là "$12$ không chia hết cho $4$".`, L`Mệnh đề $P \Leftrightarrow Q$ sai.`],
      dung: [true, true, true, false],
      giai: L`$P$ đúng, $Q$ đúng nên $P \Rightarrow Q$ đúng và $P \Leftrightarrow Q$ cũng đúng. Vì vậy ý d) sai.` },
    { muc:2, dang:'b2', de: L`Cho $A = \{0; 1; 2; 3\}$ và $B = \{2; 3; 4\}$.`,
      y: [L`$A \cup B = \{0; 1; 2; 3; 4\}$.`, L`$A \setminus B = \{0; 1\}$.`,
          L`$A \cap B$ có đúng $3$ phần tử.`, L`$B \setminus A = \{4\}$.`],
      dung: [true, true, false, true],
      giai: L`$A \cap B = \{2; 3\}$ chỉ có $2$ phần tử nên ý c) sai.` }
  ],
  traloingan: [
    { muc:1, dang:'b1', de: L`Trong bốn câu sau, có bao nhiêu câu là mệnh đề? (1) "$7$ là số chẵn"; (2) "Bạn tên gì?"; (3) "$2 + 2 = 5$"; (4) "$n$ chia hết cho $3$".`,
      dapan: '2',
      giai: L`Câu (1) và (3) là mệnh đề (đều sai nhưng vẫn là mệnh đề). Câu (2) là câu hỏi, câu (4) là mệnh đề chứa biến.` },
    { muc:2, dang:'b2', de: L`Tập hợp $A = \{1; 2; 3\}$ có bao nhiêu tập con?`,
      dapan: '8',
      giai: L`Tập có $n$ phần tử có $2^n$ tập con. Ở đây $2^3 = 8$.` },
    { muc:2, dang:'b2', de: L`Cho $A = (-\infty; 3]$ và $B = [1; +\infty)$. Biết $A \cap B = [a; b]$, tính $a + b$.`,
      dapan: '4',
      giai: L`$A \cap B = [1; 3]$ nên $a = 1$, $b = 3$ và $a + b = 4$.` },
    { muc:3, dang:'b2', de: L`Lớp 10A có $30$ học sinh, trong đó $18$ em giỏi Toán, $15$ em giỏi Văn và $8$ em giỏi cả hai môn. Hỏi có bao nhiêu em không giỏi môn nào?`,
      dapan: '5',
      giai: L`Số em giỏi ít nhất một môn là $18 + 15 - 8 = 25$. Vậy số em không giỏi môn nào là $30 - 25 = 5$.` }
  ]}
},

/* ============================================================
   CHƯƠNG II. BẤT PHƯƠNG TRÌNH VÀ HỆ BẤT PHƯƠNG TRÌNH BẬC NHẤT HAI ẨN
   ============================================================ */
{
  id: 2, tap: 1, mach: 'dai-so',
  ten: 'Chương II. Bất phương trình bậc nhất hai ẩn',
  nhan: 'Chương II',
  bai: ['Bài 3. Bất phương trình bậc nhất hai ẩn', 'Bài 4. Hệ bất phương trình bậc nhất hai ẩn'],
  cauhoi: {
  tracnghiem: [
    { muc:1, dang:'b3', de: L`Bất phương trình nào sau đây là bất phương trình bậc nhất hai ẩn?`,
      dapan: [L`$x^2 + y \gt 1$`, L`$2x - 3y \le 5$`, L`$xy \ge 4$`, L`$x + \dfrac{1}{y} \lt 0$`],
      dung: 1,
      giai: L`Bậc nhất hai ẩn nghĩa là $x$ và $y$ đều có bậc một, không bình phương và không nhân với nhau.` },
    { muc:1, dang:'b3', de: L`Cặp số nào sau đây là nghiệm của bất phương trình $x + 2y \le 6$?`,
      dapan: [L`$(4; 2)$`, L`$(2; 3)$`, L`$(1; 2)$`, L`$(6; 1)$`],
      dung: 2,
      giai: L`Thay $(1; 2)$: $1 + 2 \cdot 2 = 5 \le 6$ nên đúng. Ba cặp còn lại đều cho giá trị lớn hơn $6$.` },
    { muc:2, dang:'b3', de: L`Miền nghiệm của bất phương trình $x - y \gt 0$ là nửa mặt phẳng chứa điểm nào?`,
      dapan: [L`$(1; 0)$`, L`$(0; 1)$`, L`$(0; 0)$`, L`$(-1; 2)$`],
      dung: 0,
      giai: L`Thay $(1; 0)$ được $1 - 0 = 1 \gt 0$ nên điểm này thuộc miền nghiệm. Điểm $(0; 0)$ nằm trên bờ nên không thuộc.` },
    { muc:1, dang:'b4', de: L`Cặp số nào là nghiệm của hệ $\begin{cases} x \ge 0 \\ y \ge 0 \\ x + y \le 4 \end{cases}$?`,
      dapan: [L`$(-1; 2)$`, L`$(2; 1)$`, L`$(3; 3)$`, L`$(0; 5)$`],
      dung: 1,
      giai: L`$(2; 1)$ thoả mãn cả ba điều kiện: $2 \ge 0$, $1 \ge 0$ và $2 + 1 = 3 \le 4$.` },
    { muc:2, dang:'b4', de: L`Miền nghiệm của hệ $\begin{cases} x \ge 0 \\ y \ge 0 \end{cases}$ là:`,
      dapan: [L`góc phần tư thứ nhất`, L`góc phần tư thứ hai`, L`nửa mặt phẳng phía trên trục hoành`, L`toàn bộ mặt phẳng`],
      dung: 0,
      giai: L`Hai điều kiện $x \ge 0$ và $y \ge 0$ đồng thời cho góc phần tư thứ nhất, kể cả hai nửa trục.` },
    { muc:3, dang:'b4', de: L`Cho $F = 2x + 3y$ xét trên miền đa giác có các đỉnh $O(0; 0)$, $A(4; 0)$, $B(0; 3)$. Giá trị lớn nhất của $F$ là:`,
      dapan: [L`$8$`, L`$9$`, L`$12$`, L`$0$`],
      dung: 1,
      giai: L`$F(O) = 0$, $F(A) = 8$, $F(B) = 9$. Giá trị lớn nhất đạt tại một đỉnh, ở đây là $9$.` }
  ],
  dungsai: [
    { muc:2, dang:'b3', de: L`Cho bất phương trình $2x + y \ge 4$.`,
      y: [L`Cặp $(2; 0)$ là một nghiệm.`, L`Cặp $(0; 0)$ là một nghiệm.`,
          L`Miền nghiệm là nửa mặt phẳng có bờ là đường thẳng $2x + y = 4$.`, L`Điểm $(1; 2)$ nằm trên đường thẳng bờ.`],
      dung: [true, false, true, true],
      giai: L`Với $(0; 0)$ ta có $0 \ge 4$ là sai. Với $(1; 2)$: $2 + 2 = 4$ nên điểm nằm đúng trên bờ.` },
    { muc:3, dang:'b4', de: L`Cho hệ $\begin{cases} x \ge 0 \\ y \ge 0 \\ x + 2y \le 6 \end{cases}$ và biểu thức $F = x + y$.`,
      y: [L`Điểm $(6; 0)$ thuộc miền nghiệm.`, L`Điểm $(0; 4)$ thuộc miền nghiệm.`,
          L`Giá trị lớn nhất của $F$ bằng $6$.`, L`Giá trị nhỏ nhất của $F$ bằng $0$.`],
      dung: [true, false, true, true],
      giai: L`Với $(0; 4)$: $0 + 8 = 8 \gt 6$ nên không thuộc. Các đỉnh là $O(0;0)$, $(6;0)$, $(0;3)$ cho $F$ lần lượt $0$; $6$; $3$.` }
  ],
  traloingan: [
    { muc:1, dang:'b3', de: L`Cho bất phương trình $3x - y \le 6$. Thay $x = 2$, $y = 0$ thì vế trái bằng bao nhiêu?`,
      dapan: '6', giai: L`$3 \cdot 2 - 0 = 6$, và $6 \le 6$ nên $(2; 0)$ là một nghiệm.` },
    { muc:1, dang:'b3', de: L`Đường thẳng $x + y = 5$ cắt trục hoành tại điểm có hoành độ bằng bao nhiêu?`,
      dapan: '5', giai: L`Cho $y = 0$ ta được $x = 5$.` },
    { muc:2, dang:'b4', de: L`Miền nghiệm của hệ $\begin{cases} x \ge 0 \\ y \ge 0 \\ x + y \le 5 \end{cases}$ là một tam giác. Tam giác đó có bao nhiêu đỉnh?`,
      dapan: '3', giai: L`Ba đỉnh là $O(0; 0)$, $(5; 0)$ và $(0; 5)$.` },
    { muc:3, dang:'b4', de: L`Với $F = 3x + y$ xét trên miền có các đỉnh $(0; 0)$, $(2; 0)$, $(0; 4)$, giá trị lớn nhất của $F$ bằng bao nhiêu?`,
      dapan: '6', giai: L`$F(0;0) = 0$, $F(2;0) = 6$, $F(0;4) = 4$. Giá trị lớn nhất là $6$.` }
  ]}
},

/* ============================================================
   CHƯƠNG III. HỆ THỨC LƯỢNG TRONG TAM GIÁC
   ============================================================ */
{
  id: 3, tap: 1, mach: 'hinh-hoc',
  ten: 'Chương III. Hệ thức lượng trong tam giác',
  nhan: 'Chương III',
  bai: ['Bài 5. Giá trị lượng giác của một góc từ 0° đến 180°', 'Bài 6. Hệ thức lượng trong tam giác'],
  cauhoi: {
  tracnghiem: [
    { muc:1, dang:'b5', de: L`Giá trị của $\cos 120^\circ$ bằng:`,
      dapan: [L`$\dfrac{1}{2}$`, L`$-\dfrac{1}{2}$`, L`$\dfrac{\sqrt{3}}{2}$`, L`$-\dfrac{\sqrt{3}}{2}$`],
      dung: 1,
      giai: L`$\cos 120^\circ = \cos(180^\circ - 60^\circ) = -\cos 60^\circ = -\dfrac{1}{2}$.` },
    { muc:2, dang:'b5', de: L`Cho $\sin \alpha = \dfrac{3}{5}$ với $90^\circ \lt \alpha \lt 180^\circ$. Khi đó $\cos \alpha$ bằng:`,
      dapan: [L`$\dfrac{4}{5}$`, L`$-\dfrac{4}{5}$`, L`$\dfrac{3}{4}$`, L`$-\dfrac{3}{4}$`],
      dung: 1,
      giai: L`$\cos^2\alpha = 1 - \dfrac{9}{25} = \dfrac{16}{25}$ nên $\cos\alpha = \pm\dfrac{4}{5}$. Góc tù có côsin âm nên lấy $-\dfrac{4}{5}$.` },
    { muc:1, dang:'b5', de: L`Khẳng định nào đúng với mọi $\alpha \in [0^\circ; 180^\circ]$?`,
      dapan: [L`$\sin\alpha \ge 0$`, L`$\cos\alpha \ge 0$`, L`$\tan\alpha \ge 0$`, L`$\sin\alpha \le 0$`],
      dung: 0,
      giai: L`Trên nửa đường tròn đơn vị phía trên trục hoành, tung độ luôn không âm nên $\sin\alpha \ge 0$.` },
    { muc:2, dang:'b6', de: L`Tam giác $ABC$ có $b = 3$, $c = 4$, $\widehat{A} = 60^\circ$. Độ dài cạnh $a$ bằng:`,
      dapan: [L`$\sqrt{13}$`, L`$5$`, L`$\sqrt{37}$`, L`$7$`],
      dung: 0,
      giai: L`Định lí côsin: $a^2 = 9 + 16 - 2 \cdot 3 \cdot 4 \cdot \dfrac{1}{2} = 13$ nên $a = \sqrt{13}$.` },
    { muc:2, dang:'b6', de: L`Tam giác $ABC$ có $a = 6$, $\sin A = \dfrac{1}{2}$. Bán kính đường tròn ngoại tiếp $R$ bằng:`,
      dapan: [L`$3$`, L`$6$`, L`$12$`, L`$24$`],
      dung: 1,
      giai: L`Định lí sin: $\dfrac{a}{\sin A} = 2R$ nên $2R = 6 : \dfrac{1}{2} = 12$, suy ra $R = 6$.` },
    { muc:2, dang:'b6', de: L`Tam giác có hai cạnh $5$ và $8$, góc xen giữa bằng $30^\circ$. Diện tích tam giác bằng:`,
      dapan: [L`$10$`, L`$20$`, L`$40$`, L`$12{,}5$`],
      dung: 0,
      giai: L`$S = \dfrac{1}{2} \cdot 5 \cdot 8 \cdot \sin 30^\circ = 20 \cdot \dfrac{1}{2} = 10$.` }
  ],
  dungsai: [
    { muc:1, dang:'b5', de: L`Cho góc $\alpha = 135^\circ$.`,
      y: [L`$\sin 135^\circ = \dfrac{\sqrt{2}}{2}$.`, L`$\cos 135^\circ = \dfrac{\sqrt{2}}{2}$.`,
          L`$\tan 135^\circ = -1$.`, L`$\alpha$ là một góc tù.`],
      dung: [true, false, true, true],
      giai: L`$\cos 135^\circ = -\cos 45^\circ = -\dfrac{\sqrt{2}}{2}$ nên ý b) sai.` },
    { muc:3, dang:'b6', de: L`Cho tam giác $ABC$ có $a = 7$, $b = 8$, $c = 5$.`,
      y: [L`Nửa chu vi $p = 10$.`, L`$\cos A = \dfrac{1}{2}$.`,
          L`Góc $A$ bằng $60^\circ$.`, L`Tam giác $ABC$ vuông tại $A$.`],
      dung: [true, true, true, false],
      giai: L`$p = \dfrac{7+8+5}{2} = 10$; $\cos A = \dfrac{64+25-49}{2 \cdot 8 \cdot 5} = \dfrac{1}{2}$ nên $A = 60^\circ$, tam giác không vuông.` }
  ],
  traloingan: [
    { muc:1, dang:'b5', de: L`Tính giá trị của biểu thức $\sin 30^\circ + \cos 60^\circ$ rồi nhân kết quả với $10$.`,
      dapan: '10', giai: L`$\sin 30^\circ = \dfrac{1}{2}$ và $\cos 60^\circ = \dfrac{1}{2}$, tổng bằng $1$, nhân $10$ được $10$.` },
    { muc:1, dang:'b5', de: L`Cho $\sin\alpha = 1$ với $0^\circ \le \alpha \le 180^\circ$. Số đo góc $\alpha$ bằng bao nhiêu độ?`,
      dapan: '90', giai: L`Chỉ có $\sin 90^\circ = 1$.` },
    { muc:2, dang:'b6', de: L`Tam giác $ABC$ có $b = 5$, $c = 12$, $\widehat{A} = 90^\circ$. Cạnh $a$ bằng bao nhiêu?`,
      dapan: '13', giai: L`$a^2 = 25 + 144 = 169$ nên $a = 13$. Khi $A = 90^\circ$ định lí côsin trở thành định lí Pythagoras.` },
    { muc:2, dang:'b6', de: L`Tam giác có ba cạnh $3$, $4$, $5$. Diện tích tam giác bằng bao nhiêu?`,
      dapan: '6', giai: L`Nửa chu vi $p = 6$, công thức Heron cho $S = \sqrt{6 \cdot 3 \cdot 2 \cdot 1} = 6$.` }
  ]}
},

/* ============================================================
   ÔN TẬP GIỮA KÌ I — đề do bộ sinh js/sinh.js tạo, mỗi lượt một số liệu khác
   ============================================================ */
{
  id: 101, tap: 1, mach: 'dai-so',
  ten: 'Ôn tập giữa kì I',
  nhan: 'Ôn tập',
  bai: [
    'Chương I. Mệnh đề và tập hợp',
    'Chương II. Bất phương trình và hệ bất phương trình bậc nhất hai ẩn',
    'Chương III. Hệ thức lượng trong tam giác'
  ],
  deCoDinh: {
    tracnghiem: ['md-nhandang','md-dungsai','bpt-nhandang','bpt-nghiem','he-nhandang',
                 'he-nghiem','lg-bang','lg-goc','lg-dinhly','dt-theso'],
    dungsai: ['ts-taphop','bpt-dungsai'],
    traloingan: ['tln-taphop','tln-luonggiac','tln-dientich','tln-thucte']
  },
  cauhoi: { tracnghiem: [], dungsai: [], traloingan: [] }
},

/* ============================================================
   CHƯƠNG IV. VECTƠ
   ============================================================ */
{
  id: 4, tap: 1, mach: 'hinh-hoc',
  ten: 'Chương IV. Vectơ',
  nhan: 'Chương IV',
  bai: ['Bài 7. Các khái niệm mở đầu', 'Bài 8. Tổng và hiệu của hai vectơ',
        'Bài 9. Tích của một vectơ với một số', 'Bài 10. Vectơ trong mặt phẳng toạ độ',
        'Bài 11. Tích vô hướng của hai vectơ'],
  cauhoi: {
  tracnghiem: [
    { muc:1, dang:'b7', de: L`Vectơ là đoạn thẳng:`,
      dapan: [L`có độ dài bằng $1$`, L`có hướng`, L`nằm trên trục toạ độ`, L`luôn song song với trục hoành`],
      dung: 1,
      giai: L`Vectơ là một đoạn thẳng có hướng, xác định bởi điểm đầu và điểm cuối.` },
    { muc:1, dang:'b7', de: L`Hai vectơ bằng nhau khi và chỉ khi chúng:`,
      dapan: [L`cùng độ dài`, L`cùng hướng`, L`cùng hướng và cùng độ dài`, L`cùng phương`],
      dung: 2,
      giai: L`$\vec{a} = \vec{b}$ khi hai vectơ cùng hướng và có cùng độ dài.` },
    { muc:2, dang:'b8', de: L`Với ba điểm $A$, $B$, $C$ bất kì, khẳng định nào đúng?`,
      dapan: [L`$\overrightarrow{AB} + \overrightarrow{BC} = \overrightarrow{AC}$`,
              L`$\overrightarrow{AB} + \overrightarrow{BC} = \overrightarrow{CA}$`,
              L`$\overrightarrow{AB} - \overrightarrow{BC} = \overrightarrow{AC}$`,
              L`$\overrightarrow{AB} + \overrightarrow{AC} = \overrightarrow{BC}$`],
      dung: 0,
      giai: L`Đây chính là quy tắc ba điểm (quy tắc cộng vectơ nối tiếp).` },
    { muc:2, dang:'b9', de: L`Cho $\vec{a} \ne \vec{0}$. Vectơ $-3\vec{a}$ là vectơ:`,
      dapan: [L`cùng hướng với $\vec{a}$, độ dài gấp $3$ lần`,
              L`ngược hướng với $\vec{a}$, độ dài gấp $3$ lần`,
              L`cùng hướng với $\vec{a}$, độ dài bằng $\dfrac{1}{3}$`,
              L`vuông góc với $\vec{a}$`],
      dung: 1,
      giai: L`Khi $k \lt 0$ thì $k\vec{a}$ ngược hướng với $\vec{a}$ và có độ dài $|k| \cdot |\vec{a}| = 3|\vec{a}|$.` },
    { muc:1, dang:'b10', de: L`Cho $A(1; 2)$ và $B(4; 6)$. Toạ độ của $\overrightarrow{AB}$ là:`,
      dapan: [L`$(3; 4)$`, L`$(5; 8)$`, L`$(-3; -4)$`, L`$(4; 3)$`],
      dung: 0,
      giai: L`$\overrightarrow{AB} = (x_B - x_A;\ y_B - y_A) = (4-1;\ 6-2) = (3; 4)$.` },
    { muc:2, dang:'b10', de: L`Cho $A(1; 2)$ và $B(4; 6)$. Độ dài $AB$ bằng:`,
      dapan: [L`$5$`, L`$7$`, L`$\sqrt{7}$`, L`$25$`],
      dung: 0,
      giai: L`$AB = \sqrt{3^2 + 4^2} = \sqrt{25} = 5$.` },
    { muc:2, dang:'b11', de: L`Cho $\vec{a} = (2; 3)$ và $\vec{b} = (1; -2)$. Tích vô hướng $\vec{a} \cdot \vec{b}$ bằng:`,
      dapan: [L`$-4$`, L`$4$`, L`$8$`, L`$-8$`],
      dung: 0,
      giai: L`$\vec{a} \cdot \vec{b} = 2 \cdot 1 + 3 \cdot (-2) = 2 - 6 = -4$.` },
    { muc:3, dang:'b11', de: L`Hai vectơ $\vec{a} = (1; m)$ và $\vec{b} = (2; -4)$ vuông góc với nhau khi $m$ bằng:`,
      dapan: [L`$\dfrac{1}{2}$`, L`$2$`, L`$-2$`, L`$4$`],
      dung: 0,
      giai: L`Vuông góc khi $\vec{a} \cdot \vec{b} = 0$, tức $2 - 4m = 0 \Leftrightarrow m = \dfrac{1}{2}$.` }
  ],
  dungsai: [
    { muc:2, dang:'b8', de: L`Cho hình bình hành $ABCD$ tâm $O$.`,
      y: [L`$\overrightarrow{AB} = \overrightarrow{DC}$.`,
          L`$\overrightarrow{AB} + \overrightarrow{AD} = \overrightarrow{AC}$.`,
          L`$\overrightarrow{OA} + \overrightarrow{OC} = \vec{0}$.`,
          L`$\overrightarrow{AB} = \overrightarrow{CD}$.`],
      dung: [true, true, true, false],
      giai: L`$\overrightarrow{AB}$ và $\overrightarrow{CD}$ ngược hướng nên ý d) sai; đúng phải là $\overrightarrow{AB} = -\overrightarrow{CD}$.` },
    { muc:2, dang:'b10', de: L`Trong mặt phẳng toạ độ cho $A(0; 1)$, $B(3; 5)$ và $\vec{u} = \overrightarrow{AB}$.`,
      y: [L`$\vec{u} = (3; 4)$.`, L`$|\vec{u}| = 5$.`,
          L`Trung điểm $AB$ có toạ độ $\left(\dfrac{3}{2}; 3\right)$.`, L`$\vec{u}$ cùng phương với $(6; 9)$.`],
      dung: [true, true, true, false],
      giai: L`$(6; 9)$ không cùng phương với $(3; 4)$ vì $3 \cdot 9 - 4 \cdot 6 = 3 \ne 0$.` }
  ],
  traloingan: [
    { muc:1, dang:'b10', de: L`Cho $A(2; 1)$ và $B(6; 4)$. Tính độ dài đoạn $AB$.`,
      dapan: '5', giai: L`$\overrightarrow{AB} = (4; 3)$ nên $AB = \sqrt{16 + 9} = 5$.` },
    { muc:2, dang:'b11', de: L`Cho $\vec{a} = (3; 4)$ và $\vec{b} = (4; 3)$. Tính $\vec{a} \cdot \vec{b}$.`,
      dapan: '24', giai: L`$\vec{a} \cdot \vec{b} = 3 \cdot 4 + 4 \cdot 3 = 24$.` },
    { muc:2, dang:'b11', de: L`Cho $|\vec{a}| = 3$, $|\vec{b}| = 4$ và góc giữa hai vectơ bằng $60^\circ$. Tính $\vec{a} \cdot \vec{b}$.`,
      dapan: '6', giai: L`$\vec{a} \cdot \vec{b} = 3 \cdot 4 \cdot \cos 60^\circ = 12 \cdot \dfrac{1}{2} = 6$.` },
    { muc:3, dang:'b9', de: L`Cho tam giác $ABC$ có trọng tâm $G$. Biết $\overrightarrow{GA} + \overrightarrow{GB} + \overrightarrow{GC} = k\vec{0}$. Giá trị $k$ bằng bao nhiêu? (ghi $1$ nếu tổng bằng vectơ không)`,
      dapan: '1', giai: L`Tính chất trọng tâm: $\overrightarrow{GA} + \overrightarrow{GB} + \overrightarrow{GC} = \vec{0}$.` }
  ]}
},

/* ============================================================
   CHƯƠNG V. CÁC SỐ ĐẶC TRƯNG CỦA MẪU SỐ LIỆU KHÔNG GHÉP NHÓM
   ============================================================ */
{
  id: 5, tap: 1, mach: 'thong-ke',
  ten: 'Chương V. Các số đặc trưng của mẫu số liệu',
  nhan: 'Chương V',
  bai: ['Bài 12. Số gần đúng và sai số', 'Bài 13. Các số đặc trưng đo xu thế trung tâm',
        'Bài 14. Các số đặc trưng đo độ phân tán'],
  cauhoi: {
  tracnghiem: [
    { muc:1, dang:'b12', de: L`Quy tròn số $3{,}14159$ đến hàng phần trăm ta được:`,
      dapan: [L`$3{,}14$`, L`$3{,}15$`, L`$3{,}1$`, L`$3{,}142$`],
      dung: 0,
      giai: L`Chữ số hàng phần nghìn là $1 \lt 5$ nên giữ nguyên hàng phần trăm: $3{,}14$.` },
    { muc:2, dang:'b12', de: L`Cho số gần đúng $a = 2{,}718$ với sai số tuyệt đối không vượt quá $0{,}005$. Khẳng định nào đúng?`,
      dapan: [L`$2{,}713 \le \bar{a} \le 2{,}723$`, L`$2{,}700 \le \bar{a} \le 2{,}736$`,
              L`$\bar{a} = 2{,}718$`, L`$\bar{a} \ge 2{,}723$`],
      dung: 0,
      giai: L`Sai số tuyệt đối $\le 0{,}005$ nghĩa là $|\bar{a} - 2{,}718| \le 0{,}005$.` },
    { muc:1, dang:'b13', de: L`Số trung bình của mẫu $2;\ 4;\ 6;\ 8$ bằng:`,
      dapan: [L`$4$`, L`$5$`, L`$6$`, L`$20$`],
      dung: 1,
      giai: L`$\bar{x} = \dfrac{2+4+6+8}{4} = \dfrac{20}{4} = 5$.` },
    { muc:2, dang:'b13', de: L`Trung vị của mẫu $1;\ 3;\ 4;\ 7;\ 9$ bằng:`,
      dapan: [L`$3$`, L`$4$`, L`$4{,}8$`, L`$7$`],
      dung: 1,
      giai: L`Mẫu có $5$ giá trị đã sắp thứ tự, trung vị là giá trị đứng giữa, tức $4$.` },
    { muc:2, dang:'b14', de: L`Khoảng biến thiên của mẫu $5;\ 8;\ 12;\ 20$ bằng:`,
      dapan: [L`$15$`, L`$12$`, L`$8$`, L`$20$`],
      dung: 0,
      giai: L`Khoảng biến thiên $R = x_{\max} - x_{\min} = 20 - 5 = 15$.` },
    { muc:3, dang:'b14', de: L`Mẫu số liệu $2;\ 4;\ 4;\ 6$ có phương sai bằng:`,
      dapan: [L`$2$`, L`$4$`, L`$1$`, L`$8$`],
      dung: 0,
      giai: L`$\bar{x} = 4$; phương sai $s^2 = \dfrac{(2-4)^2 + 0 + 0 + (6-4)^2}{4} = \dfrac{8}{4} = 2$.` }
  ],
  dungsai: [
    { muc:2, dang:'b13', de: L`Cho mẫu số liệu $3;\ 5;\ 5;\ 7;\ 10$.`,
      y: [L`Số trung bình bằng $6$.`, L`Trung vị bằng $5$.`,
          L`Mốt bằng $5$.`, L`Khoảng biến thiên bằng $5$.`],
      dung: [true, true, true, false],
      giai: L`$\bar{x} = \dfrac{30}{5} = 6$; trung vị là $5$; mốt là $5$. Khoảng biến thiên $= 10 - 3 = 7$ nên ý d) sai.` },
    { muc:3, dang:'b14', de: L`Cho mẫu $1;\ 2;\ 3;\ 4;\ 5;\ 6;\ 7;\ 8$.`,
      y: [L`Trung vị $Q_2 = 4{,}5$.`, L`Tứ phân vị thứ nhất $Q_1 = 2{,}5$.`,
          L`Tứ phân vị thứ ba $Q_3 = 6{,}5$.`, L`Khoảng tứ phân vị bằng $2$.`],
      dung: [true, true, true, false],
      giai: L`$\Delta_Q = Q_3 - Q_1 = 6{,}5 - 2{,}5 = 4$ nên ý d) sai.` }
  ],
  traloingan: [
    { muc:1, dang:'b13', de: L`Tính số trung bình của mẫu số liệu $10;\ 12;\ 14;\ 16;\ 18$.`,
      dapan: '14', giai: L`$\bar{x} = \dfrac{70}{5} = 14$.` },
    { muc:2, dang:'b14', de: L`Mẫu số liệu $4;\ 9;\ 11;\ 20$ có khoảng biến thiên bằng bao nhiêu?`,
      dapan: '16', giai: L`$R = 20 - 4 = 16$.` },
    { muc:2, dang:'b13', de: L`Mẫu $6;\ 6;\ 7;\ 9;\ 12$ có trung vị bằng bao nhiêu?`,
      dapan: '7', giai: L`Mẫu có $5$ giá trị, trung vị là giá trị thứ ba, tức $7$.` },
    { muc:3, dang:'b12', de: L`Quy tròn số $1234{,}56$ đến hàng chục ta được số nào?`,
      dapan: '1230', giai: L`Chữ số hàng đơn vị là $4 \lt 5$ nên làm tròn xuống, được $1230$.` }
  ]}
},

/* ============================================================
   CHƯƠNG VI. HÀM SỐ, ĐỒ THỊ VÀ ỨNG DỤNG
   ============================================================ */
{
  id: 6, tap: 2, mach: 'dai-so',
  ten: 'Chương VI. Hàm số, đồ thị và ứng dụng',
  nhan: 'Chương VI',
  bai: ['Bài 15. Hàm số', 'Bài 16. Hàm số bậc hai', 'Bài 17. Dấu của tam thức bậc hai',
        'Bài 18. Phương trình quy về phương trình bậc hai'],
  cauhoi: {
  tracnghiem: [
    { muc:1, dang:'b15', de: L`Tập xác định của hàm số $y = \dfrac{1}{x - 2}$ là:`,
      dapan: [L`$\mathbb{R}$`, L`$\mathbb{R} \setminus \{2\}$`, L`$(2; +\infty)$`, L`$[2; +\infty)$`],
      dung: 1,
      giai: L`Mẫu phải khác $0$ nên $x \ne 2$.` },
    { muc:2, dang:'b15', de: L`Tập xác định của hàm số $y = \sqrt{x - 3}$ là:`,
      dapan: [L`$(3; +\infty)$`, L`$[3; +\infty)$`, L`$(-\infty; 3]$`, L`$\mathbb{R}$`],
      dung: 1,
      giai: L`Biểu thức dưới căn phải không âm: $x - 3 \ge 0 \Leftrightarrow x \ge 3$.` },
    { muc:1, dang:'b16', de: L`Parabol $y = x^2 - 4x + 3$ có toạ độ đỉnh là:`,
      dapan: [L`$(2; -1)$`, L`$(-2; 15)$`, L`$(2; 1)$`, L`$(4; 3)$`],
      dung: 0,
      giai: L`$x_I = -\dfrac{b}{2a} = 2$, thay vào được $y_I = 4 - 8 + 3 = -1$.` },
    { muc:2, dang:'b16', de: L`Hàm số $y = -x^2 + 2x + 5$ đạt giá trị lớn nhất bằng:`,
      dapan: [L`$5$`, L`$6$`, L`$1$`, L`$-6$`],
      dung: 1,
      giai: L`$a \lt 0$ nên hàm đạt giá trị lớn nhất tại đỉnh $x = 1$, giá trị là $-1 + 2 + 5 = 6$.` },
    { muc:2, dang:'b17', de: L`Tam thức $f(x) = x^2 - 5x + 6$ nhận giá trị âm khi:`,
      dapan: [L`$x \lt 2$ hoặc $x \gt 3$`, L`$2 \lt x \lt 3$`, L`$x \gt 3$`, L`mọi $x$`],
      dung: 1,
      giai: L`$f(x)$ có hai nghiệm $2$ và $3$, hệ số $a \gt 0$ nên $f(x) \lt 0$ giữa hai nghiệm.` },
    { muc:3, dang:'b17', de: L`Tam thức $f(x) = x^2 + 2x + m$ luôn dương với mọi $x$ khi:`,
      dapan: [L`$m \gt 1$`, L`$m \lt 1$`, L`$m \ge 1$`, L`$m = 1$`],
      dung: 0,
      giai: L`Cần $a \gt 0$ (đã có) và $\Delta' = 1 - m \lt 0 \Leftrightarrow m \gt 1$.` },
    { muc:2, dang:'b18', de: L`Phương trình $\sqrt{x + 1} = x - 1$ có điều kiện xác định là:`,
      dapan: [L`$x \ge -1$`, L`$x \ge 1$`, L`$x \ge 0$`, L`$x \le -1$`],
      dung: 0,
      giai: L`Căn thức đòi hỏi $x + 1 \ge 0$, tức $x \ge -1$. (Khi giải còn cần thêm $x - 1 \ge 0$.)` }
  ],
  dungsai: [
    { muc:2, dang:'b16', de: L`Cho hàm số $y = x^2 - 2x - 3$.`,
      y: [L`Đồ thị là parabol có bề lõm quay lên trên.`, L`Đỉnh của parabol là $I(1; -4)$.`,
          L`Hàm số có hai nghiệm $x = -1$ và $x = 3$.`, L`Hàm số đồng biến trên $(-\infty; 1)$.`],
      dung: [true, true, true, false],
      giai: L`Với $a \gt 0$ hàm nghịch biến trên $(-\infty; 1)$ và đồng biến trên $(1; +\infty)$, nên ý d) sai.` },
    { muc:3, dang:'b17', de: L`Cho bất phương trình $x^2 - 4x + 3 \le 0$.`,
      y: [L`Tam thức có hai nghiệm $1$ và $3$.`, L`Tập nghiệm là $[1; 3]$.`,
          L`$x = 2$ là một nghiệm.`, L`$x = 0$ là một nghiệm.`],
      dung: [true, true, true, false],
      giai: L`Thay $x = 0$ được $3 \le 0$ là sai, nên ý d) sai.` }
  ],
  traloingan: [
    { muc:1, dang:'b16', de: L`Parabol $y = x^2 - 6x + 5$ có hoành độ đỉnh bằng bao nhiêu?`,
      dapan: '3', giai: L`$x_I = -\dfrac{b}{2a} = \dfrac{6}{2} = 3$.` },
    { muc:2, dang:'b17', de: L`Tam thức $x^2 - 7x + 12$ có hai nghiệm. Tổng hai nghiệm bằng bao nhiêu?`,
      dapan: '7', giai: L`Theo định lí Viète, tổng hai nghiệm bằng $-\dfrac{b}{a} = 7$.` },
    { muc:2, dang:'b18', de: L`Giải phương trình $\sqrt{2x + 3} = 3$. Nghiệm $x$ bằng bao nhiêu?`,
      dapan: '3', giai: L`Bình phương hai vế: $2x + 3 = 9 \Leftrightarrow x = 3$ (thoả điều kiện).` },
    { muc:3, dang:'b16', de: L`Một quả bóng được ném lên có độ cao $h = -5t^2 + 20t$ (mét, $t$ tính bằng giây). Độ cao lớn nhất quả bóng đạt được là bao nhiêu mét?`,
      dapan: '20', giai: L`Đỉnh tại $t = \dfrac{20}{10} = 2$, khi đó $h = -20 + 40 = 20$ mét.` }
  ]}
},

/* ============================================================
   CHƯƠNG VII. PHƯƠNG PHÁP TOẠ ĐỘ TRONG MẶT PHẲNG
   ============================================================ */
{
  id: 7, tap: 2, mach: 'hinh-hoc',
  ten: 'Chương VII. Phương pháp toạ độ trong mặt phẳng',
  nhan: 'Chương VII',
  bai: ['Bài 19. Phương trình đường thẳng', 'Bài 20. Vị trí tương đối giữa hai đường thẳng. Góc và khoảng cách',
        'Bài 21. Đường tròn trong mặt phẳng toạ độ', 'Bài 22. Ba đường conic'],
  cauhoi: {
  tracnghiem: [
    { muc:1, dang:'b19', de: L`Đường thẳng $d: 2x - 3y + 1 = 0$ có một vectơ pháp tuyến là:`,
      dapan: [L`$(2; -3)$`, L`$(3; 2)$`, L`$(-3; 2)$`, L`$(2; 3)$`],
      dung: 0,
      giai: L`Đường thẳng $ax + by + c = 0$ nhận $\vec{n} = (a; b)$ làm vectơ pháp tuyến.` },
    { muc:2, dang:'b19', de: L`Đường thẳng đi qua $A(1; 2)$ với vectơ pháp tuyến $\vec{n} = (3; 4)$ có phương trình:`,
      dapan: [L`$3x + 4y - 11 = 0$`, L`$3x + 4y + 11 = 0$`, L`$4x + 3y - 10 = 0$`, L`$3x - 4y + 5 = 0$`],
      dung: 0,
      giai: L`$3(x - 1) + 4(y - 2) = 0 \Leftrightarrow 3x + 4y - 11 = 0$.` },
    { muc:2, dang:'b20', de: L`Khoảng cách từ điểm $M(1; 1)$ đến đường thẳng $3x + 4y - 2 = 0$ bằng:`,
      dapan: [L`$1$`, L`$\dfrac{5}{2}$`, L`$\dfrac{1}{5}$`, L`$5$`],
      dung: 0,
      giai: L`$d = \dfrac{|3 + 4 - 2|}{\sqrt{9 + 16}} = \dfrac{5}{5} = 1$.` },
    { muc:2, dang:'b20', de: L`Hai đường thẳng $d_1: x + y - 1 = 0$ và $d_2: 2x + 2y + 3 = 0$ có vị trí tương đối là:`,
      dapan: [L`cắt nhau`, L`song song`, L`trùng nhau`, L`vuông góc`],
      dung: 1,
      giai: L`Hệ số tương ứng tỉ lệ $\dfrac{1}{2} = \dfrac{1}{2} \ne \dfrac{-1}{3}$ nên hai đường song song.` },
    { muc:1, dang:'b21', de: L`Đường tròn $(x - 1)^2 + (y + 2)^2 = 9$ có tâm và bán kính là:`,
      dapan: [L`$I(1; -2)$, $R = 3$`, L`$I(-1; 2)$, $R = 3$`, L`$I(1; -2)$, $R = 9$`, L`$I(-1; 2)$, $R = 9$`],
      dung: 0,
      giai: L`Dạng $(x-a)^2 + (y-b)^2 = R^2$ cho tâm $I(a; b)$ và bán kính $R = \sqrt{9} = 3$.` },
    { muc:2, dang:'b21', de: L`Đường tròn tâm $I(2; 3)$ bán kính $R = 5$ có phương trình:`,
      dapan: [L`$(x-2)^2 + (y-3)^2 = 25$`, L`$(x+2)^2 + (y+3)^2 = 25$`,
              L`$(x-2)^2 + (y-3)^2 = 5$`, L`$(x-3)^2 + (y-2)^2 = 25$`],
      dung: 0,
      giai: L`Thay trực tiếp vào dạng chính tắc, chú ý $R^2 = 25$.` },
    { muc:2, dang:'b22', de: L`Elip $\dfrac{x^2}{25} + \dfrac{y^2}{9} = 1$ có độ dài trục lớn bằng:`,
      dapan: [L`$5$`, L`$10$`, L`$6$`, L`$3$`],
      dung: 1,
      giai: L`$a^2 = 25$ nên $a = 5$, độ dài trục lớn là $2a = 10$.` }
  ],
  dungsai: [
    { muc:2, dang:'b19', de: L`Cho đường thẳng $d: x - 2y + 4 = 0$.`,
      y: [L`$\vec{n} = (1; -2)$ là một vectơ pháp tuyến của $d$.`,
          L`Điểm $A(0; 2)$ thuộc $d$.`,
          L`$\vec{u} = (2; 1)$ là một vectơ chỉ phương của $d$.`,
          L`Điểm $B(1; 1)$ thuộc $d$.`],
      dung: [true, true, true, false],
      giai: L`Thay $B(1; 1)$: $1 - 2 + 4 = 3 \ne 0$ nên $B$ không thuộc $d$.` },
    { muc:3, dang:'b21', de: L`Cho đường tròn $(C): x^2 + y^2 - 4x + 2y - 4 = 0$.`,
      y: [L`Tâm của $(C)$ là $I(2; -1)$.`, L`Bán kính $R = 3$.`,
          L`Điểm $O(0; 0)$ nằm trong đường tròn.`, L`Điểm $A(5; -1)$ nằm trên đường tròn.`],
      dung: [true, true, true, true],
      giai: L`$I(2; -1)$, $R = \sqrt{4 + 1 + 4} = 3$. Với $O$: $OI = \sqrt{5} \lt 3$ nên nằm trong. Với $A$: $AI = 3 = R$ nên nằm trên đường tròn.` }
  ],
  traloingan: [
    { muc:1, dang:'b20', de: L`Tính khoảng cách từ gốc toạ độ $O$ đến đường thẳng $3x + 4y - 10 = 0$.`,
      dapan: '2', giai: L`$d = \dfrac{|-10|}{\sqrt{9+16}} = \dfrac{10}{5} = 2$.` },
    { muc:2, dang:'b21', de: L`Đường tròn $x^2 + y^2 = 49$ có bán kính bằng bao nhiêu?`,
      dapan: '7', giai: L`$R = \sqrt{49} = 7$.` },
    { muc:2, dang:'b22', de: L`Elip $\dfrac{x^2}{16} + \dfrac{y^2}{4} = 1$ có độ dài trục lớn bằng bao nhiêu?`,
      dapan: '8', giai: L`$a = 4$ nên trục lớn dài $2a = 8$.` },
    { muc:3, dang:'b19', de: L`Đường thẳng $2x + y - 6 = 0$ cắt trục hoành tại $A$ và trục tung tại $B$. Tính diện tích tam giác $OAB$.`,
      dapan: '9', giai: L`$A(3; 0)$, $B(0; 6)$ nên $S = \dfrac{1}{2} \cdot 3 \cdot 6 = 9$.` }
  ]}
},

/* ============================================================
   CHƯƠNG VIII. ĐẠI SỐ TỔ HỢP
   ============================================================ */
{
  id: 8, tap: 2, mach: 'dai-so',
  ten: 'Chương VIII. Đại số tổ hợp',
  nhan: 'Chương VIII',
  bai: ['Bài 23. Quy tắc đếm', 'Bài 24. Hoán vị, chỉnh hợp và tổ hợp', 'Bài 25. Nhị thức Newton'],
  cauhoi: {
  tracnghiem: [
    { muc:1, dang:'b23', de: L`Một lớp có $5$ bạn nam và $7$ bạn nữ. Số cách chọn một bạn đi dự đại hội là:`,
      dapan: [L`$35$`, L`$12$`, L`$7$`, L`$5$`],
      dung: 1,
      giai: L`Hai phương án rời nhau nên dùng quy tắc cộng: $5 + 7 = 12$.` },
    { muc:2, dang:'b23', de: L`Có $4$ chiếc áo và $3$ chiếc quần. Số cách chọn một bộ gồm một áo và một quần là:`,
      dapan: [L`$7$`, L`$12$`, L`$4$`, L`$3$`],
      dung: 1,
      giai: L`Hai công đoạn liên tiếp nên dùng quy tắc nhân: $4 \cdot 3 = 12$.` },
    { muc:1, dang:'b24', de: L`Số hoán vị của $4$ phần tử là:`,
      dapan: [L`$4$`, L`$16$`, L`$24$`, L`$12$`],
      dung: 2,
      giai: L`$P_4 = 4! = 24$.` },
    { muc:2, dang:'b24', de: L`Giá trị của $C_5^2$ bằng:`,
      dapan: [L`$10$`, L`$20$`, L`$25$`, L`$5$`],
      dung: 0,
      giai: L`$C_5^2 = \dfrac{5!}{2! \cdot 3!} = \dfrac{20}{2} = 10$.` },
    { muc:2, dang:'b24', de: L`Từ $6$ học sinh chọn ra $3$ em xếp thành hàng. Số cách xếp là:`,
      dapan: [L`$20$`, L`$120$`, L`$18$`, L`$720$`],
      dung: 1,
      giai: L`Có thứ tự nên dùng chỉnh hợp: $A_6^3 = 6 \cdot 5 \cdot 4 = 120$.` },
    { muc:2, dang:'b25', de: L`Khai triển $(x + 1)^4$ có bao nhiêu số hạng?`,
      dapan: [L`$4$`, L`$5$`, L`$6$`, L`$3$`],
      dung: 1,
      giai: L`Khai triển $(a+b)^n$ có $n + 1$ số hạng, ở đây là $5$.` }
  ],
  dungsai: [
    { muc:2, dang:'b24', de: L`Một tổ có $8$ học sinh.`,
      y: [L`Số cách chọn $3$ em làm trực nhật là $C_8^3 = 56$.`,
          L`Số cách chọn $3$ em rồi xếp thành tổ trưởng, tổ phó, thư kí là $A_8^3 = 336$.`,
          L`Số cách xếp cả $8$ em thành một hàng dọc là $8!$.`,
          L`$C_8^3 = A_8^3$.`],
      dung: [true, true, true, false],
      giai: L`$C_8^3 = 56$ còn $A_8^3 = 336$, hai số khác nhau nên ý d) sai: chỉnh hợp có tính thứ tự, tổ hợp thì không.` },
    { muc:3, dang:'b25', de: L`Xét khai triển $(x + 2)^3$.`,
      y: [L`Khai triển có $4$ số hạng.`, L`Hệ số của $x^2$ bằng $6$.`,
          L`Số hạng không chứa $x$ bằng $8$.`, L`Hệ số của $x^3$ bằng $3$.`],
      dung: [true, true, true, false],
      giai: L`$(x+2)^3 = x^3 + 6x^2 + 12x + 8$. Hệ số của $x^3$ là $1$ nên ý d) sai.` }
  ],
  traloingan: [
    { muc:1, dang:'b24', de: L`Tính $C_6^2$.`, dapan: '15', giai: L`$C_6^2 = \dfrac{6 \cdot 5}{2} = 15$.` },
    { muc:1, dang:'b24', de: L`Tính $5!$.`, dapan: '120', giai: L`$5! = 5 \cdot 4 \cdot 3 \cdot 2 \cdot 1 = 120$.` },
    { muc:2, dang:'b23', de: L`Từ các chữ số $1, 2, 3, 4$ lập được bao nhiêu số có hai chữ số khác nhau?`,
      dapan: '12', giai: L`$A_4^2 = 4 \cdot 3 = 12$.` },
    { muc:3, dang:'b25', de: L`Trong khai triển $(x + 1)^5$, hệ số của $x^3$ bằng bao nhiêu?`,
      dapan: '10', giai: L`Hệ số là $C_5^3 = 10$.` }
  ]}
},

/* ============================================================
   CHƯƠNG IX. TÍNH XÁC SUẤT THEO ĐỊNH NGHĨA CỔ ĐIỂN
   ============================================================ */
{
  id: 9, tap: 2, mach: 'thong-ke',
  ten: 'Chương IX. Tính xác suất theo định nghĩa cổ điển',
  nhan: 'Chương IX',
  bai: ['Bài 26. Biến cố và định nghĩa cổ điển của xác suất', 'Bài 27. Thực hành tính xác suất theo định nghĩa cổ điển'],
  cauhoi: {
  tracnghiem: [
    { muc:1, dang:'b26', de: L`Gieo một con xúc xắc cân đối. Không gian mẫu có bao nhiêu phần tử?`,
      dapan: [L`$3$`, L`$6$`, L`$12$`, L`$36$`],
      dung: 1,
      giai: L`Con xúc xắc có $6$ mặt nên $n(\Omega) = 6$.` },
    { muc:1, dang:'b26', de: L`Gieo một đồng xu cân đối. Xác suất xuất hiện mặt ngửa bằng:`,
      dapan: [L`$\dfrac{1}{2}$`, L`$\dfrac{1}{4}$`, L`$1$`, L`$\dfrac{1}{3}$`],
      dung: 0,
      giai: L`$P = \dfrac{1}{2}$ vì có $2$ kết quả đồng khả năng.` },
    { muc:2, dang:'b26', de: L`Gieo một con xúc xắc. Xác suất để số chấm xuất hiện là số chẵn bằng:`,
      dapan: [L`$\dfrac{1}{2}$`, L`$\dfrac{1}{3}$`, L`$\dfrac{1}{6}$`, L`$\dfrac{2}{3}$`],
      dung: 0,
      giai: L`Biến cố gồm $\{2; 4; 6\}$ nên $P = \dfrac{3}{6} = \dfrac{1}{2}$.` },
    { muc:2, dang:'b27', de: L`Một hộp có $4$ bi đỏ và $6$ bi xanh. Lấy ngẫu nhiên một viên. Xác suất lấy được bi đỏ bằng:`,
      dapan: [L`$\dfrac{2}{5}$`, L`$\dfrac{3}{5}$`, L`$\dfrac{1}{4}$`, L`$\dfrac{1}{10}$`],
      dung: 0,
      giai: L`$P = \dfrac{4}{10} = \dfrac{2}{5}$.` },
    { muc:3, dang:'b27', de: L`Gieo hai con xúc xắc. Xác suất để tổng số chấm bằng $7$ là:`,
      dapan: [L`$\dfrac{1}{6}$`, L`$\dfrac{1}{9}$`, L`$\dfrac{5}{36}$`, L`$\dfrac{7}{36}$`],
      dung: 0,
      giai: L`Có $6$ cặp cho tổng $7$ trên tổng số $36$ kết quả, nên $P = \dfrac{6}{36} = \dfrac{1}{6}$.` },
    { muc:2, dang:'b26', de: L`Biến cố $A$ có xác suất $P(A) = 0{,}3$. Xác suất của biến cố đối $\overline{A}$ bằng:`,
      dapan: [L`$0{,}7$`, L`$0{,}3$`, L`$1{,}3$`, L`$0$`],
      dung: 0,
      giai: L`$P(\overline{A}) = 1 - P(A) = 1 - 0{,}3 = 0{,}7$.` }
  ],
  dungsai: [
    { muc:2, dang:'b26', de: L`Gieo một con xúc xắc cân đối, gọi $A$ là biến cố "số chấm lớn hơn $4$".`,
      y: [L`$n(\Omega) = 6$.`, L`$A = \{5; 6\}$.`,
          L`$P(A) = \dfrac{1}{3}$.`, L`$P(\overline{A}) = \dfrac{1}{3}$.`],
      dung: [true, true, true, false],
      giai: L`$P(A) = \dfrac{2}{6} = \dfrac{1}{3}$ nên $P(\overline{A}) = \dfrac{2}{3}$, ý d) sai.` },
    { muc:3, dang:'b27', de: L`Một hộp có $3$ bi trắng và $5$ bi đen. Lấy ngẫu nhiên $2$ viên.`,
      y: [L`Số cách lấy là $C_8^2 = 28$.`, L`Số cách lấy $2$ bi trắng là $3$.`,
          L`Xác suất lấy được $2$ bi trắng là $\dfrac{3}{28}$.`, L`Xác suất lấy được $2$ bi đen là $\dfrac{5}{28}$.`],
      dung: [true, true, true, false],
      giai: L`Số cách lấy $2$ bi đen là $C_5^2 = 10$, nên xác suất là $\dfrac{10}{28} = \dfrac{5}{14}$, ý d) sai.` }
  ],
  traloingan: [
    { muc:1, dang:'b26', de: L`Gieo một con xúc xắc. Có bao nhiêu kết quả để số chấm là số lẻ?`,
      dapan: '3', giai: L`Các kết quả là $1$, $3$, $5$ nên có $3$ kết quả.` },
    { muc:2, dang:'b27', de: L`Một hộp có $10$ thẻ đánh số từ $1$ đến $10$. Rút một thẻ, có bao nhiêu kết quả thuận lợi cho biến cố "số trên thẻ chia hết cho $3$"?`,
      dapan: '3', giai: L`Các số là $3$, $6$, $9$ nên có $3$ kết quả.` },
    { muc:2, dang:'b27', de: L`Gieo hai con xúc xắc. Không gian mẫu có bao nhiêu phần tử?`,
      dapan: '36', giai: L`$n(\Omega) = 6 \cdot 6 = 36$.` },
    { muc:3, dang:'b27', de: L`Một tổ có $5$ nam và $4$ nữ. Chọn ngẫu nhiên $2$ bạn. Có bao nhiêu cách chọn được $2$ bạn cùng giới tính?`,
      dapan: '16', giai: L`$C_5^2 + C_4^2 = 10 + 6 = 16$.` }
  ]}
}

];

const TEN_MACH = {
  'dai-so':    'Đại số và Giải tích',
  'hinh-hoc':  'Hình học và Đo lường',
  'thong-ke':  'Thống kê và Xác suất'
};
