/* ============================================================
   data.js — TOÀN BỘ NỘI DUNG HỌC NẰM Ở ĐÂY
   Công thức viết bằng LaTeX, đặt giữa hai dấu $ ... $

   BA QUY TẮC DUY NHẤT KHI SỬA FILE NÀY
   1. Mọi chuỗi chữ bọc trong dấu nháy ngược ` ` và có chữ L đứng trước.
      Nhờ chữ L đó bạn viết \frac như bình thường, KHÔNG phải viết \\frac.
   2. Công thức toán đặt giữa hai dấu $ ... $ ngay trong câu văn.
   3. Dùng \lt và \gt thay cho dấu < và > (vì trang web hiểu nhầm hai dấu này).

   Ví dụ:  de: L`Giải bất phương trình $x^2 - 5x + 6 \gt 0$.`

   Cấu trúc một chương:
   {
     id, tap, mach ('dai-so' | 'hinh-hoc' | 'thong-ke'), ten,
     bai:    [tên các bài],
     cauhoi: {
       tracnghiem: [{ muc, de, dapan: [4 phương án], dung: 0, giai }],
       dungsai:    [{ muc, de, y: [4 ý], dung: [true,false,true,false], giai }],
       traloingan: [{ muc, de, dapan: '8', giai }],
     }
   }

   muc là mức độ: 1 nhận biết, 2 thông hiểu, 3 vận dụng.
   Trang tự sắp câu theo mức độ tăng dần rồi chia thành các chặng,
   Số câu mỗi chặng đặt trong SO_CAU ở js/main.js:
   trắc nghiệm 20 câu, đúng sai 10 câu, trả lời ngắn 5 câu.
   ============================================================ */

const L = String.raw;   // cho phép viết \frac thay vì \\frac

const CHUONG_TRINH = [

  /* ---------------- CHƯƠNG I ---------------- */
  {
    id: 1, tap: 1, mach: 'dai-so',
    ten: 'Mệnh đề và tập hợp',
    bai: [
      'Bài 1. Mệnh đề',
      'Bài 2. Tập hợp và các phép toán trên tập hợp'
    ],
    cauhoi: {
      tracnghiem: [
        { muc: 1, de: L`Phủ định của mệnh đề $\forall x \in \mathbb{R},\ x^2 \ge 0$ là mệnh đề nào?`,
        dapan: [
          L`$\exists x \in \mathbb{R},\ x^2 \lt 0$`,
          L`$\forall x \in \mathbb{R},\ x^2 \lt 0$`,
          L`$\exists x \in \mathbb{R},\ x^2 \ge 0$`,
          L`$\forall x \in \mathbb{R},\ x^2 \le 0$`
        ],
        dung: 0,
        giai: L`Phủ định đổi $\forall$ thành $\exists$ và đổi $\ge$ thành $\lt$.` },

        { muc: 1, de: L`Cho $A = \{1;\,2;\,3;\,4\}$ và $B = \{3;\,4;\,5\}$. Tập $A \setminus B$ bằng`,
        dapan: [L`$\{1;\,2\}$`, L`$\{3;\,4\}$`, L`$\{5\}$`, L`$\{1;\,2;\,5\}$`],
        dung: 0,
        giai: L`$A \setminus B$ gồm các phần tử thuộc $A$ nhưng không thuộc $B$, đó là $1$ và $2$.` },

        { muc: 2, de: L`Cho $A = [1;5)$ và $B = (3;7]$. Khi đó $A \cap B$ bằng`,
        dapan: [L`$(3;5)$`, L`$[1;7]$`, L`$[1;3]$`, L`$[5;7]$`],
        dung: 0,
        giai: `Giao là phần chung của hai khoảng, lấy từ 3 không kể đến 5 không kể.` },

        { muc: 3, de: L`Mệnh đề đảo của mệnh đề “Nếu $n$ chia hết cho $6$ thì $n$ chia hết cho $3$” là`,
        dapan: [
          L`Nếu $n$ chia hết cho $3$ thì $n$ chia hết cho $6$`,
          L`Nếu $n$ không chia hết cho $6$ thì $n$ không chia hết cho $3$`,
          L`Nếu $n$ chia hết cho $6$ thì $n$ không chia hết cho $3$`,
          L`$n$ chia hết cho $6$ khi và chỉ khi $n$ chia hết cho $3$`
        ],
        dung: 0,
        giai: L`Mệnh đề đảo của $P \Rightarrow Q$ là $Q \Rightarrow P$. Lưu ý mệnh đề đảo này sai, chẳng hạn với $n = 9$.` },

        { muc: 1, de: L`Câu nào sau đây <strong>không</strong> phải là mệnh đề?`,
          dapan: [
            L`Hôm nay trời đẹp quá!`,
            L`$2 + 3 = 5$`,
            L`Hà Nội là thủ đô của Việt Nam.`,
            L`$9$ chia hết cho $3$.`
          ],
          dung: 0,
          giai: L`Câu cảm thán không khẳng định điều gì nên không phải mệnh đề.` },

        { muc: 1, de: L`Mệnh đề nào sau đây sai?`,
          dapan: [
            L`$\sqrt{16} = \pm 4$`,
            L`$\sqrt{16} = 4$`,
            L`$(-2)^2 = 4$`,
            L`$\left|-5\right| = 5$`
          ],
          dung: 0,
          giai: L`Căn bậc hai số học của $16$ chỉ nhận một giá trị không âm là $4$.` },

        { muc: 1, de: L`Câu nào sau đây là mệnh đề chứa biến?`,
          dapan: [
            L`$x + 1 \gt 3$`,
            L`$2 + 3 = 5$`,
            L`Hà Nội là thủ đô của Việt Nam.`,
            L`Hãy học bài!`
          ],
          dung: 0,
          giai: L`Mệnh đề chứa biến chỉ xác định được đúng sai khi gán giá trị cho biến.` },

        { muc: 1, de: L`Với $x = 2$, mệnh đề chứa biến $x^2 - 3x + 2 = 0$ trở thành`,
          dapan: [
            L`mệnh đề đúng`,
            L`mệnh đề sai`,
            L`không phải mệnh đề`,
            L`vẫn là mệnh đề chứa biến`
          ],
          dung: 0,
          giai: L`Thay $x = 2$ được $4 - 6 + 2 = 0$, đẳng thức đúng.` },

        { muc: 1, de: L`Mệnh đề “$17$ là số chẵn” có tính đúng sai là`,
          dapan: [
            L`sai`,
            L`đúng`,
            L`vừa đúng vừa sai`,
            L`không xác định được`
          ],
          dung: 0,
          giai: L`$17$ không chia hết cho $2$ nên đây là mệnh đề sai.` },

        { muc: 1, de: L`Câu nào sau đây là mệnh đề?`,
          dapan: [
            L`$\sqrt{2}$ là số vô tỉ`,
            L`Bạn tên là gì?`,
            L`Đi học thôi!`,
            L`Thật tuyệt vời!`
          ],
          dung: 0,
          giai: L`Chỉ câu đầu là câu khẳng định xác định được đúng sai.` },

        { muc: 1, de: L`Trong các mệnh đề sau, mệnh đề nào đúng?`,
          dapan: [
            L`$6$ chia hết cho $3$`,
            L`$7$ chia hết cho $3$`,
            L`$8$ chia hết cho $3$`,
            L`$10$ chia hết cho $3$`
          ],
          dung: 0,
          giai: L`$6 = 3 \cdot 2$ nên $6$ chia hết cho $3$.` },

        { muc: 1, de: L`Phủ định của mệnh đề “$3 \gt 2$” là`,
          dapan: [
            L`$3 \le 2$`,
            L`$3 \lt 2$`,
            L`$3 = 2$`,
            L`$3 \ge 2$`
          ],
          dung: 0,
          giai: L`Phủ định của $\gt$ là $\le$.` },

        { muc: 1, de: L`Phủ định của mệnh đề “$x = 5$” là`,
          dapan: [
            L`$x \ne 5$`,
            L`$x \gt 5$`,
            L`$x \lt 5$`,
            L`$x \le 5$`
          ],
          dung: 0,
          giai: L`Phủ định của dấu bằng là dấu khác.` },

        { muc: 1, de: L`Phủ định của mệnh đề “$a$ chia hết cho $3$” là`,
          dapan: [
            L`$a$ không chia hết cho $3$`,
            L`$a$ chia hết cho $9$`,
            L`$a$ là số lẻ`,
            L`$a$ chia hết cho $6$`
          ],
          dung: 0,
          giai: L`Phủ định chỉ việc bác bỏ khẳng định ban đầu.` },

        { muc: 1, de: L`Phủ định của mệnh đề “Tam giác $ABC$ là tam giác đều” là`,
          dapan: [
            L`Tam giác $ABC$ không là tam giác đều`,
            L`Tam giác $ABC$ là tam giác cân`,
            L`Tam giác $ABC$ là tam giác vuông`,
            L`Tam giác $ABC$ có ba cạnh khác nhau`
          ],
          dung: 0,
          giai: L`Không đều thì có thể cân, vuông hay thường, nên chỉ cách viết đầu mới là phủ định.` },

        { muc: 2, de: L`Phủ định của mệnh đề $\forall x \in \mathbb{R},\ x^2 + 1 \gt 0$ là`,
          dapan: [
            L`$\exists x \in \mathbb{R},\ x^2 + 1 \le 0$`,
            L`$\forall x \in \mathbb{R},\ x^2 + 1 \le 0$`,
            L`$\exists x \in \mathbb{R},\ x^2 + 1 \gt 0$`,
            L`$\forall x \in \mathbb{R},\ x^2 + 1 \lt 0$`
          ],
          dung: 0,
          giai: L`Đổi $\forall$ thành $\exists$ và phủ định mệnh đề bên trong.` },

        { muc: 2, de: L`Phủ định của mệnh đề $\exists n \in \mathbb{N},\ n^2 = 2$ là`,
          dapan: [
            L`$\forall n \in \mathbb{N},\ n^2 \ne 2$`,
            L`$\exists n \in \mathbb{N},\ n^2 \ne 2$`,
            L`$\forall n \in \mathbb{N},\ n^2 = 2$`,
            L`$\exists n \in \mathbb{N},\ n^2 \gt 2$`
          ],
          dung: 0,
          giai: L`Đổi $\exists$ thành $\forall$ và phủ định đẳng thức.` },

        { muc: 2, de: L`Phủ định của mệnh đề “Có ít nhất một số thực $x$ thoả mãn $x^3 = 2$” là`,
          dapan: [
            L`Mọi số thực $x$ đều thoả mãn $x^3 \ne 2$`,
            L`Có ít nhất một số thực $x$ thoả mãn $x^3 \ne 2$`,
            L`Mọi số thực $x$ đều thoả mãn $x^3 = 2$`,
            L`Không có số thực nào thoả mãn $x^3 \ne 2$`
          ],
          dung: 0,
          giai: L`Phủ định của “tồn tại” là “với mọi … không”.` },

        { muc: 2, de: L`Phủ định của mệnh đề $\forall x \in \mathbb{R},\ x^2 \ge x$ là`,
          dapan: [
            L`$\exists x \in \mathbb{R},\ x^2 \lt x$`,
            L`$\forall x \in \mathbb{R},\ x^2 \lt x$`,
            L`$\exists x \in \mathbb{R},\ x^2 \gt x$`,
            L`$\forall x \in \mathbb{R},\ x^2 \le x$`
          ],
          dung: 0,
          giai: L`Đổi $\forall$ thành $\exists$ và đổi $\ge$ thành $\lt$.` },

        { muc: 2, de: L`Phủ định của mệnh đề $\exists x \in \mathbb{Q},\ 4x^2 - 1 = 0$ là`,
          dapan: [
            L`$\forall x \in \mathbb{Q},\ 4x^2 - 1 \ne 0$`,
            L`$\exists x \in \mathbb{Q},\ 4x^2 - 1 \ne 0$`,
            L`$\forall x \in \mathbb{Q},\ 4x^2 - 1 = 0$`,
            L`$\forall x \in \mathbb{R},\ 4x^2 - 1 \ne 0$`
          ],
          dung: 0,
          giai: L`Giữ nguyên tập $\mathbb{Q}$, đổi $\exists$ thành $\forall$ và phủ định đẳng thức.` },

        { muc: 2, de: L`Cho mệnh đề $P: \forall x \in \mathbb{R},\ x^2 - x + 1 \gt 0$. Mệnh đề phủ định của $P$ là`,
          dapan: [
            L`$\exists x \in \mathbb{R},\ x^2 - x + 1 \le 0$`,
            L`$\forall x \in \mathbb{R},\ x^2 - x + 1 \le 0$`,
            L`$\exists x \in \mathbb{R},\ x^2 - x + 1 \ge 0$`,
            L`$\forall x \in \mathbb{R},\ x^2 - x + 1 \lt 0$`
          ],
          dung: 0,
          giai: L`Đổi lượng từ và phủ định bất đẳng thức.` },

        { muc: 3, de: L`Xét mệnh đề $P: \forall x \in \mathbb{R},\ x^2 + 1 \gt 0$. Khẳng định nào đúng?`,
          dapan: [
            L`$P$ đúng và phủ định của $P$ sai`,
            L`$P$ sai và phủ định của $P$ đúng`,
            L`Cả $P$ và phủ định của $P$ đều đúng`,
            L`Cả $P$ và phủ định của $P$ đều sai`
          ],
          dung: 0,
          giai: L`$x^2 \ge 0$ nên $x^2 + 1 \ge 1 \gt 0$ với mọi $x$, do đó $P$ đúng và phủ định của nó sai.` },

        { muc: 1, de: L`Mệnh đề $P \Rightarrow Q$ sai trong trường hợp nào?`,
          dapan: [
            L`$P$ đúng và $Q$ sai`,
            L`$P$ sai và $Q$ đúng`,
            L`$P$ sai và $Q$ sai`,
            L`$P$ đúng và $Q$ đúng`
          ],
          dung: 0,
          giai: L`Mệnh đề kéo theo chỉ sai khi giả thiết đúng mà kết luận sai.` },

        { muc: 2, de: L`Mệnh đề đảo của “Nếu tứ giác $ABCD$ là hình vuông thì nó là hình chữ nhật” là`,
          dapan: [
            L`Nếu tứ giác $ABCD$ là hình chữ nhật thì nó là hình vuông`,
            L`Nếu tứ giác $ABCD$ không là hình vuông thì nó không là hình chữ nhật`,
            L`Nếu tứ giác $ABCD$ không là hình chữ nhật thì nó không là hình vuông`,
            L`Tứ giác $ABCD$ là hình vuông khi và chỉ khi nó là hình chữ nhật`
          ],
          dung: 0,
          giai: L`Đổi chỗ giả thiết và kết luận. Lưu ý mệnh đề đảo này sai.` },

        { muc: 2, de: L`Xét mệnh đề “Nếu $a$ chia hết cho $4$ thì $a$ chia hết cho $2$”. Khẳng định nào đúng?`,
          dapan: [
            L`Mệnh đề đúng, mệnh đề đảo sai`,
            L`Mệnh đề sai, mệnh đề đảo đúng`,
            L`Cả hai đều đúng`,
            L`Cả hai đều sai`
          ],
          dung: 0,
          giai: L`Chia hết cho $4$ thì chia hết cho $2$. Ngược lại $a = 6$ chia hết cho $2$ nhưng không chia hết cho $4$.` },



        { muc: 2, de: L`Mệnh đề $P \Leftrightarrow Q$ đúng khi và chỉ khi`,
          dapan: [
            L`$P$ và $Q$ cùng đúng hoặc cùng sai`,
            L`$P$ đúng và $Q$ sai`,
            L`$P$ sai và $Q$ đúng`,
            L`$P$ đúng, không phụ thuộc $Q$`
          ],
          dung: 0,
          giai: L`Tương đương nghĩa là hai mệnh đề cùng tính đúng sai.` },

        { muc: 3, de: L`Mệnh đề nào sau đây tương đương với mệnh đề $x^2 = 4$ (với $x \in \mathbb{R}$)?`,
          dapan: [
            L`$x = 2$ hoặc $x = -2$`,
            L`$x = 2$`,
            L`$x = -2$`,
            L`$x = 4$`
          ],
          dung: 0,
          giai: L`$x^2 = 4 \Leftrightarrow (x-2)(x+2) = 0$.` },


        { muc: 3, de: L`Mệnh đề đảo của “Hai tam giác bằng nhau thì có diện tích bằng nhau” là mệnh đề`,
          dapan: [
            L`sai`,
            L`đúng`,
            L`vừa đúng vừa sai`,
            L`không phải mệnh đề`
          ],
          dung: 0,
          giai: L`Hai tam giác có cùng diện tích chưa chắc bằng nhau, chẳng hạn một tam giác $3 \times 4$ và một tam giác $2 \times 6$.` },

        { muc: 3, de: L`Trong các mệnh đề sau, mệnh đề nào có mệnh đề đảo cũng đúng?`,
          dapan: [
            L`Nếu $a = b$ thì $a^3 = b^3$`,
            L`Nếu $a = b$ thì $a^2 = b^2$`,
            L`Nếu $a \gt b$ thì $a^2 \gt b^2$`,
            L`Nếu $a$ chia hết cho $2$ thì $a$ chia hết cho $4$`
          ],
          dung: 0,
          giai: L`Hàm lập phương đơn điệu trên $\mathbb{R}$ nên $a^3 = b^3 \Rightarrow a = b$.` }
      ],

      dungsai: [
        { muc: 1, de: L`Cho hai tập hợp $A = \{1;2;3;4;5\}$ và $B = \{2;4;6\}$.`,
          y: [L`$A \cap B = \{2;4\}$`, L`$A \cup B = \{1;2;3;4;5;6\}$`,
              L`$A \setminus B = \{1;3;5\}$`, L`$B \subset A$`],
          dung: [true, true, true, false],
          giai: L`Ý d) sai vì $6 \in B$ nhưng $6 \notin A$.` },

        { muc: 2, de: `Xét tính đúng sai của các khẳng định sau.`,
          y: [L`Mệnh đề $\forall x \in \mathbb{R},\ x^2 + 1 \gt 0$ là mệnh đề đúng`,
              L`Mệnh đề $\exists x \in \mathbb{R},\ x^2 = -1$ là mệnh đề đúng`,
              L`Phủ định của $\exists x \in \mathbb{R},\ x \gt 2$ là $\forall x \in \mathbb{R},\ x \le 2$`,
              L`Mệnh đề $P \Rightarrow Q$ sai khi $P$ sai và $Q$ đúng`],
          dung: [true, false, true, false],
          giai: L`Ý b) sai vì $x^2 \ge 0$ với mọi $x$. Ý d) sai vì $P \Rightarrow Q$ chỉ sai khi $P$ đúng mà $Q$ sai.` },

        { muc: 1, de: L`Cho $A = \{1;2;3;4;5;6\}$ và $B = \{2;4;6;8\}$.`,
          y: [
            L`$A \cap B = \{2;4;6\}$`,
            L`$A \cup B$ có $8$ phần tử`,
            L`$A \setminus B = \{1;3;5\}$`,
            L`$B \setminus A = \{8\}$`
          ],
          dung: [true, false, true, true],
          giai: L`$A \cup B = \{1;2;3;4;5;6;8\}$ chỉ có $7$ phần tử nên ý b) sai.` },

        { muc: 1, de: L`Xét quan hệ giữa các tập hợp số.`,
          y: [
            L`$\mathbb{N} \subset \mathbb{Z}$`,
            L`$\mathbb{Z} \subset \mathbb{Q}$`,
            L`$\mathbb{Q} \subset \mathbb{R}$`,
            L`$\mathbb{R} \subset \mathbb{Q}$`
          ],
          dung: [true, true, true, false],
          giai: L`$\sqrt{2} \in \mathbb{R}$ nhưng không thuộc $\mathbb{Q}$ nên ý d) sai.` },

        { muc: 2, de: L`Cho $A = [-1;4)$ và $B = (2;6]$.`,
          y: [
            L`$A \cap B = (2;4)$`,
            L`$A \cup B = [-1;6]$`,
            L`$A \setminus B = [-1;2]$`,
            L`$B \setminus A = (4;6]$`
          ],
          dung: [true, true, true, false],
          giai: L`$B \setminus A$ gồm các số thuộc $B$ mà không thuộc $A$, tức $4 \le x \le 6$, vậy bằng $[4;6]$.` },

        { muc: 2, de: L`Cho hai mệnh đề $P: \forall x \in \mathbb{R},\ x^2 \ge 0$ và $Q: \exists x \in \mathbb{R},\ x^2 = -1$.`,
          y: [
            L`$P$ là mệnh đề đúng`,
            L`$Q$ là mệnh đề sai`,
            L`Phủ định của $P$ là $\exists x \in \mathbb{R},\ x^2 \lt 0$`,
            L`Phủ định của $Q$ là $\exists x \in \mathbb{R},\ x^2 \ne -1$`
          ],
          dung: [true, true, true, false],
          giai: L`Phủ định của $\exists$ phải là $\forall$, tức $\forall x \in \mathbb{R},\ x^2 \ne -1$.` },

        { muc: 1, de: L`Cho $X = \{x \in \mathbb{N} \mid x$ là ước của $18\}$.`,
          y: [
            L`$X = \{1;2;3;6;9;18\}$`,
            L`$X$ có $6$ phần tử`,
            L`$4 \in X$`,
            L`$9 \in X$`
          ],
          dung: [true, true, false, true],
          giai: L`$18$ không chia hết cho $4$ nên $4 \notin X$.` },

        { muc: 2, de: L`Cho tập hợp $A = \{a;b;c\}$.`,
          y: [
            L`$A$ có $8$ tập con`,
            L`$A$ có $3$ tập con gồm đúng một phần tử`,
            L`$A$ có $3$ tập con gồm đúng hai phần tử`,
            L`$A$ có $7$ tập con khác rỗng và khác chính nó`
          ],
          dung: [true, true, true, false],
          giai: L`Có $7$ tập con khác rỗng, bỏ thêm chính $A$ thì còn $6$.` },

        { muc: 2, de: L`Cho $A = \{x \in \mathbb{R} \mid x^2 - 5x + 6 = 0\}$.`,
          y: [
            L`$A = \{2;3\}$`,
            L`$A$ có hai phần tử`,
            L`$1 \in A$`,
            L`$A \subset \mathbb{N}$`
          ],
          dung: [true, true, false, true],
          giai: L`Thay $x = 1$ được $1 - 5 + 6 = 2 \ne 0$ nên $1 \notin A$.` },

        { muc: 2, de: L`Xét các tập hợp sau có phải tập rỗng hay không.`,
          y: [
            L`$\{x \in \mathbb{R} \mid x^2 + 1 = 0\} = \emptyset$`,
            L`$\{x \in \mathbb{N} \mid x \lt 0\} = \emptyset$`,
            L`$\{x \in \mathbb{Z} \mid 2x = 1\} = \emptyset$`,
            L`$\{x \in \mathbb{R} \mid x^2 = 0\} = \emptyset$`
          ],
          dung: [true, true, true, false],
          giai: L`$x^2 = 0$ có nghiệm $x = 0$ nên tập đó bằng $\{0\}$, không rỗng.` },

        { muc: 2, de: L`Cho $A = (-\infty;3]$ và $B = [1;+\infty)$.`,
          y: [
            L`$A \cap B = [1;3]$`,
            L`$A \cup B = \mathbb{R}$`,
            L`$A \setminus B = (-\infty;1]$`,
            L`$C_{\mathbb{R}}A = (3;+\infty)$`
          ],
          dung: [true, true, false, true],
          giai: L`$A \setminus B$ gồm các số nhỏ hơn $1$, tức $(-\infty;1)$, không lấy điểm $1$.` },

        { muc: 3, de: L`Xét tính đúng sai của các mệnh đề có lượng từ.`,
          y: [
            L`$\forall n \in \mathbb{N},\ n^2 \ge n$`,
            L`$\exists n \in \mathbb{N},\ n^2 = n$`,
            L`$\forall x \in \mathbb{R},\ x^2 \gt x$`,
            L`$\exists x \in \mathbb{R},\ x^2 \lt x$`
          ],
          dung: [true, true, false, true],
          giai: L`Với $x = 0{,}5$ ta có $x^2 = 0{,}25 \lt 0{,}5$ nên ý c) sai còn ý d) đúng.` },

        { muc: 1, de: L`Cho $A = \{1;2;3\}$ và $B = \{1;2;3;4;5\}$.`,
          y: [
            L`$A \subset B$`,
            L`$A \cap B = A$`,
            L`$A \cup B = B$`,
            L`$A \setminus B = \{4;5\}$`
          ],
          dung: [true, true, true, false],
          giai: L`Mọi phần tử của $A$ đều thuộc $B$ nên $A \setminus B = \emptyset$.` },


        { muc: 3, de: L`Cho $A = [m;m+3]$ và $B = [0;5]$.`,
          y: [
            L`Với $m = 1$ thì $A \subset B$`,
            L`Với $m = 3$ thì $A \subset B$`,
            L`$A \subset B$ khi và chỉ khi $0 \le m \le 2$`,
            L`Với $m = -1$ thì $A \cap B = [0;2]$`
          ],
          dung: [true, false, true, true],
          giai: L`Với $m = 3$ thì $A = [3;6]$, mà $6 \notin B$ nên ý b) sai.` },

        { muc: 1, de: L`Cho $A = \{0;1;2;3;4\}$ và $B = \{x \in \mathbb{N} \mid x \le 2\}$.`,
          y: [
            L`$B = \{0;1;2\}$`,
            L`$B \subset A$`,
            L`$A \setminus B = \{3;4\}$`,
            L`$A \cap B$ có hai phần tử`
          ],
          dung: [true, true, true, false],
          giai: L`$A \cap B = B = \{0;1;2\}$ nên có ba phần tử.` },

        { muc: 2, de: L`Xét số phần tử của các tập hợp sau.`,
          y: [
            L`$\{x \in \mathbb{Z} \mid |x| \le 2\}$ có $5$ phần tử`,
            L`$\{x \in \mathbb{N} \mid x \le 5\}$ có $6$ phần tử`,
            L`$\{x \in \mathbb{N}^* \mid x \le 5\}$ có $5$ phần tử`,
            L`$\{x \in \mathbb{Z} \mid x^2 = 9\}$ có $1$ phần tử`
          ],
          dung: [true, true, true, false],
          giai: L`$x^2 = 9$ cho $x = 3$ và $x = -3$, tức hai phần tử.` }
      ],

      traloingan: [
        { muc: 1, de: L`Cho $A = \{1;2;3;4;5;6\}$ và $B = \{4;5;6;7;8\}$. Tập $A \cup B$ có bao nhiêu phần tử?`,
          dapan: '8',
          giai: L`$n(A \cup B) = 6 + 5 - 3 = 8$.` },

        { muc: 2, de: `Lớp 10A có 30 học sinh, trong đó 18 em giỏi Toán, 15 em giỏi Văn và 8 em giỏi cả hai môn. Có bao nhiêu em giỏi ít nhất một trong hai môn?`,
          dapan: '25',
          giai: L`$18 + 15 - 8 = 25$ em.` },

        { muc: 1, de: L`Cho $A = \{1;2;3;4;5\}$ và $B = \{4;5;6;7\}$. Tập $A \cup B$ có bao nhiêu phần tử?`,
          dapan: '7',
          giai: L`$A \cup B = \{1;2;3;4;5;6;7\}$.` },

        { muc: 1, de: L`Cho $A = \{1;2;3;4;5\}$ và $B = \{4;5;6;7\}$. Tập $A \cap B$ có bao nhiêu phần tử?`,
          dapan: '2',
          giai: L`$A \cap B = \{4;5\}$.` },

        { muc: 1, de: L`Tập hợp $\{a;b;c;d\}$ có bao nhiêu tập con?`,
          dapan: '16',
          giai: L`Tập có $n$ phần tử thì có $2^n$ tập con, ở đây $2^4 = 16$.` },

        { muc: 2, de: L`Tập hợp $\{1;2;3;4;5\}$ có bao nhiêu tập con gồm đúng hai phần tử?`,
          dapan: '10',
          giai: L`Chọn $2$ trong $5$ phần tử, có $10$ cách.` },

        { muc: 2, de: L`Tập hợp $\{x \in \mathbb{N} \mid x$ là ước của $24\}$ có bao nhiêu phần tử?`,
          dapan: '8',
          giai: L`Các ước là $1, 2, 3, 4, 6, 8, 12, 24$.` },

        { muc: 1, de: L`Tập hợp $\{x \in \mathbb{Z} \mid |x| \le 4\}$ có bao nhiêu phần tử?`,
          dapan: '9',
          giai: L`Từ $-4$ đến $4$, tất cả $9$ số nguyên.` },

        { muc: 2, de: L`Có bao nhiêu số nguyên thuộc nửa khoảng $[-2;5)$?`,
          dapan: '7',
          giai: L`Đó là $-2, -1, 0, 1, 2, 3, 4$.` },

        { muc: 2, de: L`Có bao nhiêu số nguyên thuộc nửa khoảng $(1;7]$?`,
          dapan: '6',
          giai: L`Đó là $2, 3, 4, 5, 6, 7$.` },

        { muc: 3, de: L`Lớp có 40 học sinh, 22 em giỏi Toán, 18 em giỏi Anh, 8 em giỏi cả hai. Có bao nhiêu em giỏi ít nhất một môn?`,
          dapan: '32',
          giai: L`$22 + 18 - 8 = 32$.` },

        { muc: 3, de: L`Vẫn lớp 40 học sinh ở trên, có bao nhiêu em không giỏi môn nào?`,
          dapan: '8',
          giai: L`$40 - 32 = 8$.` },

        { muc: 2, de: L`Cho $A = \{x \in \mathbb{R} \mid x^2 - 7x + 12 = 0\}$. Tổng các phần tử của $A$ bằng bao nhiêu?`,
          dapan: '7',
          giai: L`Hai nghiệm là $3$ và $4$, tổng bằng $7$.` },

        { muc: 2, de: L`Cho $A = \{x \in \mathbb{R} \mid x^2 - 4 = 0\}$. Tích các phần tử của $A$ bằng bao nhiêu?`,
          dapan: '-4',
          giai: L`Hai nghiệm là $2$ và $-2$, tích bằng $-4$.` },

        { muc: 3, de: L`Cho $A = [0;6]$ và $B = [4;10]$. Đoạn $A \cap B$ có độ dài bằng bao nhiêu?`,
          dapan: '2',
          giai: L`$A \cap B = [4;6]$ nên độ dài là $6 - 4 = 2$.` },

        { muc: 3, de: L`Cho $A = (-\infty;m)$ và $B = (3;+\infty)$. Giá trị nguyên nhỏ nhất của $m$ để $A \cap B \ne \emptyset$ là bao nhiêu?`,
          dapan: '4',
          giai: L`Cần $m \gt 3$, số nguyên nhỏ nhất thoả mãn là $4$.` },

        { muc: 2, de: L`Một tập hợp có $5$ phần tử thì có bao nhiêu tập con gồm đúng ba phần tử?`,
          dapan: '10',
          giai: L`Chọn $3$ trong $5$ phần tử, có $10$ cách.` },

        { muc: 3, de: L`Cho $n(A) = 10$, $n(B) = 7$ và $n(A \cap B) = 4$. Khi đó $n(A \cup B)$ bằng bao nhiêu?`,
          dapan: '13',
          giai: L`$n(A \cup B) = 10 + 7 - 4 = 13$.` },

        { muc: 2, de: L`Cho $A \subset B$, biết $A$ có $5$ phần tử và $B$ có $9$ phần tử. Tập $B \setminus A$ có bao nhiêu phần tử?`,
          dapan: '4',
          giai: L`Vì $A \subset B$ nên $n(B \setminus A) = 9 - 5 = 4$.` }
      ]
    }
  },

  /* ---------------- CHƯƠNG II ---------------- */
  {
    id: 2, tap: 1, mach: 'dai-so',
    ten: 'Bất phương trình và hệ bất phương trình bậc nhất hai ẩn',
    bai: [
      'Bài 3. Bất phương trình bậc nhất hai ẩn',
      'Bài 4. Hệ bất phương trình bậc nhất hai ẩn'
    ],
    cauhoi: {
      tracnghiem: [
        { muc: 1, de: L`Điểm $O(0;0)$ có thuộc miền nghiệm của bất phương trình $2x + y \le 3$ không?`,
        dapan: [L`Có, vì $0 \le 3$`, L`Không, vì $0 \gt 3$`, `Không xác định được`, `Chỉ thuộc đường biên`],
        dung: 0,
        giai: L`Thay $x = 0$ và $y = 0$ được $0 \le 3$, mệnh đề đúng nên điểm $O$ thuộc miền nghiệm.` },

        { muc: 2, de: L`Điểm nào sau đây <strong>không</strong> thuộc miền nghiệm của $x - 2y \lt 4$?`,
        dapan: [L`$(4;0)$`, L`$(0;0)$`, L`$(1;2)$`, L`$(-1;1)$`],
        dung: 0,
        giai: L`Với $(4;0)$ ta có $4 - 0 = 4$, không nhỏ hơn $4$ nên điểm này bị loại.` },

        { muc: 3, de: `Miền nghiệm của một hệ bất phương trình bậc nhất hai ẩn luôn là`,
        dapan: [`Giao của các nửa mặt phẳng`, `Hợp của các nửa mặt phẳng`, `Một đường thẳng`, `Một điểm duy nhất`],
        dung: 0,
        giai: `Nghiệm của hệ phải thoả mãn mọi bất phương trình trong hệ, nên ta lấy phần chung.` }
      ],

      dungsai: [
        { muc: 1, de: L`Cho bất phương trình $2x - y \ge 1$.`,
          y: [L`Điểm $(1;1)$ thuộc miền nghiệm`, L`Điểm $(0;0)$ thuộc miền nghiệm`,
              L`Điểm $(2;0)$ thuộc miền nghiệm`, L`Miền nghiệm không chứa gốc toạ độ $O$`],
          dung: [true, false, true, true],
          giai: L`Thay lần lượt: $(1;1) \to 1 \ge 1$ đúng, $(0;0) \to 0 \ge 1$ sai, $(2;0) \to 4 \ge 1$ đúng.` },

        { muc: 2, de: L`Cho hệ bất phương trình $x \ge 0$, $y \ge 0$, $x + y \le 4$.`,
          y: [`Miền nghiệm là một tam giác`, L`Điểm $(2;2)$ thuộc miền nghiệm`,
              L`Điểm $(3;2)$ thuộc miền nghiệm`, L`$F = x + 2y$ có giá trị lớn nhất bằng $8$ trên miền nghiệm`],
          dung: [true, true, false, true],
          giai: L`Miền nghiệm là tam giác đỉnh $O(0;0)$, $(4;0)$, $(0;4)$. Tại ba đỉnh $F$ nhận $0$, $4$, $8$ nên giá trị lớn nhất là $8$.` }
      ],

      traloingan: [
        { muc: 1, de: L`Miền nghiệm của một hệ là tam giác có ba đỉnh $O(0;0)$, $A(4;0)$, $B(0;3)$. Giá trị lớn nhất của $F = 2x + 3y$ trên miền đó bằng bao nhiêu?`,
          dapan: '9',
          giai: L`$F(O) = 0$, $F(A) = 8$, $F(B) = 9$.` },

        { muc: 2, de: L`Điểm $(3;m)$ thuộc miền nghiệm của $x + 2y \le 9$. Giá trị nguyên lớn nhất của $m$ là bao nhiêu?`,
          dapan: '3',
          giai: L`$3 + 2m \le 9 \Leftrightarrow m \le 3$.` }
      ]
    }
  },

  /* ---------------- CHƯƠNG III ---------------- */
  {
    id: 3, tap: 1, mach: 'hinh-hoc',
    ten: 'Hệ thức lượng trong tam giác',
    bai: [
      'Bài 5. Giá trị lượng giác của một góc từ 0° đến 180°',
      'Bài 6. Hệ thức lượng trong tam giác'
    ],
    cauhoi: {
      tracnghiem: [
        { muc: 1, de: L`Giá trị của $\cos 120^\circ$ bằng`,
        dapan: [L`$-\dfrac{1}{2}$`, L`$\dfrac{1}{2}$`, L`$-\dfrac{\sqrt{3}}{2}$`, L`$\dfrac{\sqrt{3}}{2}$`],
        dung: 0,
        giai: L`$\cos 120^\circ = \cos(180^\circ - 60^\circ) = -\cos 60^\circ = -\dfrac{1}{2}$.` },

        { muc: 1, de: L`Tam giác $ABC$ có $b = 5$, $c = 8$ và $\widehat{A} = 60^\circ$. Cạnh $a$ bằng`,
        dapan: [L`$7$`, L`$9$`, L`$\sqrt{89}$`, L`$13$`],
        dung: 0,
        giai: L`$a^2 = 25 + 64 - 2 \cdot 5 \cdot 8 \cdot \dfrac{1}{2} = 89 - 40 = 49$, suy ra $a = 7$.` },

        { muc: 2, de: L`Tam giác có hai cạnh bằng $4$ và $6$, góc xen giữa bằng $30^\circ$. Diện tích tam giác bằng`,
        dapan: [L`$6$`, L`$12$`, L`$3$`, L`$24$`],
        dung: 0,
        giai: L`$S = \dfrac{1}{2} \cdot 4 \cdot 6 \cdot \sin 30^\circ = 12 \cdot \dfrac{1}{2} = 6$.` },

        { muc: 3, de: L`Trong tam giác $ABC$, tỉ số $\dfrac{a}{\sin A}$ bằng`,
        dapan: [L`$2R$`, L`$R$`, L`$\dfrac{R}{2}$`, L`$4R$`],
        dung: 0,
        giai: `Đây chính là nội dung của định lí sin.` }
      ],

      dungsai: [
        { muc: 1, de: L`Tam giác $ABC$ có $a = 13$, $b = 14$, $c = 15$.`,
          y: [L`Nửa chu vi $p = 21$`, L`Diện tích $S = 84$`,
              L`Bán kính đường tròn ngoại tiếp $R = 8$`, L`Bán kính đường tròn nội tiếp $r = 4$`],
          dung: [true, true, false, true],
          giai: L`$S = \sqrt{21 \cdot 8 \cdot 7 \cdot 6} = 84$, $r = \dfrac{S}{p} = 4$, còn $R = \dfrac{abc}{4S} = \dfrac{65}{8} = 8{,}125$ nên ý c) sai.` },

        { muc: 2, de: `Xét tính đúng sai của các khẳng định sau.`,
          y: [L`$\sin 135^\circ = \dfrac{\sqrt{2}}{2}$`, L`$\cos 135^\circ = \dfrac{\sqrt{2}}{2}$`,
              L`Trong mọi tam giác, $a^2 = b^2 + c^2 - 2bc\cos A$`,
              L`Nếu $\cos A \lt 0$ thì góc $A$ là góc tù`],
          dung: [true, false, true, true],
          giai: L`$\cos 135^\circ = -\dfrac{\sqrt{2}}{2}$ nên ý b) sai.` }
      ],

      traloingan: [
        { muc: 1, de: L`Tam giác $ABC$ có $a = 7$, $b = 8$, $c = 5$. Số đo góc $A$ bằng bao nhiêu độ?`,
          dapan: '60',
          giai: L`$\cos A = \dfrac{64 + 25 - 49}{2 \cdot 8 \cdot 5} = \dfrac{1}{2}$ nên $A = 60^\circ$.` },

        { muc: 2, de: L`Tam giác có hai cạnh bằng $6$ và $10$, góc xen giữa bằng $30^\circ$. Diện tích tam giác bằng bao nhiêu?`,
          dapan: '15',
          giai: L`$S = \dfrac{1}{2} \cdot 6 \cdot 10 \cdot \sin 30^\circ = 15$.` }
      ]
    }
  },

  /* ---------------- CHƯƠNG IV ---------------- */
  {
    id: 4, tap: 1, mach: 'hinh-hoc',
    ten: 'Vectơ',
    bai: [
      'Bài 7. Các khái niệm mở đầu về vectơ',
      'Bài 8. Tổng và hiệu của hai vectơ',
      'Bài 9. Tích của một vectơ với một số',
      'Bài 10. Vectơ trong mặt phẳng toạ độ',
      'Bài 11. Tích vô hướng của hai vectơ'
    ],
    cauhoi: {
      tracnghiem: [
        { muc: 1, de: L`Cho $A(1;2)$ và $B(4;6)$. Độ dài $\left|\overrightarrow{AB}\right|$ bằng`,
        dapan: [L`$5$`, L`$7$`, L`$\sqrt{7}$`, L`$25$`],
        dung: 0,
        giai: L`$\overrightarrow{AB} = (3;4)$ nên độ dài bằng $\sqrt{9 + 16} = 5$.` },

        { muc: 1, de: L`Cho $\vec{u} = (2;-1)$ và $\vec{v} = (3;6)$. Kết luận nào đúng?`,
        dapan: [
          L`$\vec{u} \perp \vec{v}$`,
          L`$\vec{u}$ cùng phương với $\vec{v}$`,
          L`$\vec{u} = \vec{v}$`,
          L`$\vec{u}$ ngược hướng với $\vec{v}$`
        ],
        dung: 0,
        giai: L`$\vec{u} \cdot \vec{v} = 2 \cdot 3 + (-1) \cdot 6 = 0$ nên hai vectơ vuông góc.` },

        { muc: 2, de: L`Tổng $\overrightarrow{MN} + \overrightarrow{NP}$ bằng`,
        dapan: [L`$\overrightarrow{MP}$`, L`$\overrightarrow{PM}$`, L`$\overrightarrow{NM}$`, L`$\vec{0}$`],
        dung: 0,
        giai: L`Áp dụng quy tắc ba điểm với ba điểm $M$, $N$, $P$.` },

        { muc: 3, de: L`Tam giác $ABC$ có $A(0;0)$, $B(6;0)$, $C(0;3)$. Trọng tâm $G$ có toạ độ`,
        dapan: [L`$(2;1)$`, L`$(3;1{,}5)$`, L`$(6;3)$`, L`$(1;2)$`],
        dung: 0,
        giai: L`$x_G = \dfrac{0 + 6 + 0}{3} = 2$ và $y_G = \dfrac{0 + 0 + 3}{3} = 1$.` }
      ],

      dungsai: [
        { muc: 1, de: L`Trong mặt phẳng toạ độ cho $A(1;2)$, $B(4;6)$, $C(1;6)$.`,
          y: [L`$\overrightarrow{AB} = (3;4)$`, L`$\left|\overrightarrow{AB}\right| = 5$`,
              L`$\overrightarrow{AC} = (0;4)$`, L`Tam giác $ABC$ vuông tại $A$`],
          dung: [true, true, true, false],
          giai: L`$\overrightarrow{AB} \cdot \overrightarrow{AC} = 3 \cdot 0 + 4 \cdot 4 = 16 \ne 0$ nên tam giác không vuông tại $A$, mà vuông tại $C$.` },

        { muc: 2, de: L`Cho $\vec{u} = (1;-2)$ và $\vec{v} = (-2;4)$.`,
          y: [L`$\vec{u}$ và $\vec{v}$ cùng phương`, L`$\vec{u}$ và $\vec{v}$ cùng hướng`,
              L`$\vec{u} \cdot \vec{v} = -10$`, L`$\left|\vec{v}\right| = 2\left|\vec{u}\right|$`],
          dung: [true, false, true, true],
          giai: L`$\vec{v} = -2\vec{u}$ nên hai vectơ cùng phương nhưng ngược hướng, do đó ý b) sai.` }
      ],

      traloingan: [
        { muc: 1, de: L`Cho $A(-1;3)$ và $B(2;7)$. Độ dài $\left|\overrightarrow{AB}\right|$ bằng bao nhiêu?`,
          dapan: '5',
          giai: L`$\overrightarrow{AB} = (3;4)$ nên độ dài bằng $\sqrt{9+16} = 5$.` },

        { muc: 2, de: L`Cho $\vec{u} = (2;3)$ và $\vec{v} = (m;4)$. Tìm $m$ để $\vec{u} \perp \vec{v}$.`,
          dapan: '-6',
          giai: L`$2m + 12 = 0 \Leftrightarrow m = -6$.` }
      ]
    }
  },

  /* ---------------- CHƯƠNG V ---------------- */
  {
    id: 5, tap: 1, mach: 'thong-ke',
    ten: 'Các số đặc trưng của mẫu số liệu không ghép nhóm',
    bai: [
      'Bài 12. Số gần đúng và sai số',
      'Bài 13. Các số đặc trưng đo xu thế trung tâm',
      'Bài 14. Các số đặc trưng đo độ phân tán'
    ],
    cauhoi: {
      tracnghiem: [
        { muc: 1, de: L`Số trung bình của mẫu số liệu $2;\ 4;\ 4;\ 5;\ 9$ bằng`,
        dapan: [L`$4{,}8$`, L`$4$`, L`$5$`, L`$4{,}5$`],
        dung: 0,
        giai: L`Tổng bằng $24$, chia cho $5$ được $4{,}8$.` },

        { muc: 1, de: L`Trung vị của mẫu số liệu $1;\ 3;\ 5;\ 7;\ 9;\ 11$ bằng`,
        dapan: [L`$6$`, L`$5$`, L`$7$`, L`$5{,}5$`],
        dung: 0,
        giai: L`Mẫu có $6$ giá trị nên trung vị là trung bình hai số giữa, bằng $\dfrac{5 + 7}{2} = 6$.` },

        { muc: 2, de: L`Mốt của mẫu số liệu $2;\ 3;\ 3;\ 5;\ 7$ bằng`,
        dapan: [L`$3$`, L`$2$`, L`$4$`, L`$5$`],
        dung: 0,
        giai: L`Mốt là giá trị xuất hiện nhiều lần nhất, ở đây số $3$ xuất hiện hai lần.` },

        { muc: 3, de: `Số đặc trưng nào đo độ phân tán và ít bị ảnh hưởng bởi giá trị bất thường nhất?`,
        dapan: [`Khoảng tứ phân vị`, `Khoảng biến thiên`, `Số trung bình`, `Tổng các giá trị`],
        dung: 0,
        giai: `Khoảng tứ phân vị chỉ dùng phần giữa của mẫu nên bỏ qua hai đầu bất thường.` }
      ],

      dungsai: [
        { muc: 1, de: L`Cho mẫu số liệu $2;\ 4;\ 6;\ 6;\ 8;\ 10$.`,
          y: [L`Số trung bình bằng $6$`, L`Trung vị bằng $6$`,
              L`Mốt bằng $6$`, L`Khoảng biến thiên bằng $10$`],
          dung: [true, true, true, false],
          giai: L`Khoảng biến thiên $R = 10 - 2 = 8$ nên ý d) sai.` },

        { muc: 2, de: L`Cho mẫu số liệu $1;\ 3;\ 4;\ 7;\ 10$.`,
          y: [L`Số trung bình bằng $5$`, L`Trung vị bằng $4$`,
              L`$Q_1 = 2$`, L`$Q_3 = 7$`],
          dung: [true, true, true, false],
          giai: L`Nửa trên của mẫu là $\{7;10\}$ nên $Q_3 = 8{,}5$, ý d) sai.` }
      ],

      traloingan: [
        { muc: 1, de: L`Cho mẫu số liệu $12;\ 15;\ 18;\ 20;\ 25$. Khoảng biến thiên của mẫu bằng bao nhiêu?`,
          dapan: '13',
          giai: L`$R = 25 - 12 = 13$.` },

        { muc: 2, de: L`Cho mẫu số liệu $5;\ 7;\ 8;\ 9;\ 11$. Độ lệch chuẩn của mẫu bằng bao nhiêu?`,
          dapan: '2',
          giai: L`$\bar{x} = 8$, phương sai $s^2 = \dfrac{9+1+0+1+9}{5} = 4$ nên $s = 2$.` }
      ]
    }
  },

  /* ---------------- CHƯƠNG VI ---------------- */
  {
    id: 6, tap: 2, mach: 'dai-so',
    ten: 'Hàm số, đồ thị và ứng dụng',
    bai: [
      'Bài 15. Hàm số',
      'Bài 16. Hàm số bậc hai',
      'Bài 17. Dấu của tam thức bậc hai',
      'Bài 18. Phương trình quy về phương trình bậc hai'
    ],
    cauhoi: {
      tracnghiem: [
        { muc: 1, de: L`Đồ thị hàm số $y = x^2 - 4x + 3$ có đỉnh là`,
        dapan: [L`$I(2;-1)$`, L`$I(-2;15)$`, L`$I(2;1)$`, L`$I(4;3)$`],
        dung: 0,
        giai: L`$x = -\dfrac{b}{2a} = 2$, thay vào được $y = 4 - 8 + 3 = -1$.` },

        { muc: 1, de: L`Tập xác định của hàm số $y = \sqrt{x - 2}$ là`,
        dapan: [L`$[2; +\infty)$`, L`$(2; +\infty)$`, L`$(-\infty; 2]$`, L`$\mathbb{R}$`],
        dung: 0,
        giai: L`Cần $x - 2 \ge 0$, tức là $x \ge 2$.` },

        { muc: 2, de: L`Tập nghiệm của bất phương trình $x^2 - 5x + 6 \gt 0$ là`,
        dapan: [L`$(-\infty;2) \cup (3;+\infty)$`, L`$(2;3)$`, L`$[2;3]$`, L`$\mathbb{R}$`],
        dung: 0,
        giai: L`Tam thức có hai nghiệm $2$ và $3$, hệ số $a = 1 \gt 0$ nên nhận giá trị dương ở ngoài khoảng hai nghiệm.` },

        { muc: 3, de: L`Tam thức $f(x) = ax^2 + bx + c$ có $a \gt 0$ và $\Delta \lt 0$. Khi đó`,
        dapan: [
          L`$f(x) \gt 0$ với mọi $x$`,
          L`$f(x) \lt 0$ với mọi $x$`,
          L`$f(x)$ có hai nghiệm phân biệt`,
          L`$f(x)$ đổi dấu đúng một lần`
        ],
        dung: 0,
        giai: L`Vì $\Delta \lt 0$ nên tam thức không đổi dấu, luôn cùng dấu với hệ số $a$.` }
      ],

      dungsai: [
        { muc: 1, de: L`Cho hàm số $y = -x^2 + 4x - 3$.`,
          y: [L`Đồ thị có đỉnh $I(2;1)$`, `Parabol có bề lõm quay lên trên`,
              L`Hàm số đồng biến trên khoảng $(-\infty;2)$`, L`$y \gt 0$ khi $1 \lt x \lt 3$`],
          dung: [true, false, true, true],
          giai: L`Hệ số $a = -1 \lt 0$ nên bề lõm quay xuống dưới, ý b) sai.` },

        { muc: 2, de: L`Cho tam thức $f(x) = x^2 - 3x + 2$.`,
          y: [L`$f(x) = 0$ có hai nghiệm $1$ và $2$`, L`$f(x) \lt 0$ khi $x \in (1;2)$`,
              L`$\Delta = 1$`, L`$f(x) \ge 0$ với mọi $x$`],
          dung: [true, true, true, false],
          giai: L`Vì $f(x) \lt 0$ trên khoảng $(1;2)$ nên ý d) sai.` }
      ],

      traloingan: [
        { muc: 1, de: L`Giá trị nhỏ nhất của hàm số $y = x^2 - 6x + 11$ bằng bao nhiêu?`,
          dapan: '2',
          giai: L`Đỉnh tại $x = 3$, khi đó $y = 9 - 18 + 11 = 2$.` },

        { muc: 2, de: L`Bất phương trình $x^2 - 7x + 10 \le 0$ có bao nhiêu nghiệm nguyên?`,
          dapan: '4',
          giai: L`Tập nghiệm là $[2;5]$, các nghiệm nguyên là $2, 3, 4, 5$.` }
      ]
    }
  },

  /* ---------------- CHƯƠNG VII ---------------- */
  {
    id: 7, tap: 2, mach: 'hinh-hoc',
    ten: 'Phương pháp toạ độ trong mặt phẳng',
    bai: [
      'Bài 19. Phương trình đường thẳng',
      'Bài 20. Vị trí tương đối giữa hai đường thẳng, góc và khoảng cách',
      'Bài 21. Đường tròn trong mặt phẳng toạ độ',
      'Bài 22. Ba đường conic'
    ],
    cauhoi: {
      tracnghiem: [
        { muc: 1, de: L`Đường tròn $(x - 1)^2 + (y + 2)^2 = 9$ có tâm và bán kính là`,
        dapan: [L`$I(1;-2)$, $R = 3$`, L`$I(-1;2)$, $R = 3$`, L`$I(1;-2)$, $R = 9$`, L`$I(-1;2)$, $R = 9$`],
        dung: 0,
        giai: L`So với dạng chuẩn ta được tâm $I(1;-2)$ và $R = \sqrt{9} = 3$.` },

        { muc: 1, de: L`Khoảng cách từ $O(0;0)$ đến đường thẳng $3x + 4y - 10 = 0$ bằng`,
        dapan: [L`$2$`, L`$10$`, L`$5$`, L`$\dfrac{1}{2}$`],
        dung: 0,
        giai: L`$d = \dfrac{\left|-10\right|}{\sqrt{9 + 16}} = \dfrac{10}{5} = 2$.` },

        { muc: 2, de: L`Đường thẳng $2x - 3y + 1 = 0$ có một vectơ pháp tuyến là`,
        dapan: [L`$(2;-3)$`, L`$(3;2)$`, L`$(-3;2)$`, L`$(2;3)$`],
        dung: 0,
        giai: L`Vectơ pháp tuyến lấy trực tiếp từ hệ số của $x$ và $y$.` },

        { muc: 3, de: L`Đường thẳng đi qua $A(1;0)$ và nhận $\vec{n} = (1;2)$ làm vectơ pháp tuyến có phương trình`,
        dapan: [L`$x + 2y - 1 = 0$`, L`$x + 2y + 1 = 0$`, L`$2x + y - 2 = 0$`, L`$x - 2y - 1 = 0$`],
        dung: 0,
        giai: L`$1(x - 1) + 2(y - 0) = 0$, rút gọn được $x + 2y - 1 = 0$.` }
      ],

      dungsai: [
        { muc: 1, de: L`Cho đường thẳng $d: 3x - 4y + 5 = 0$.`,
          y: [L`$d$ có một vectơ pháp tuyến là $(3;-4)$`, L`$d$ có một vectơ chỉ phương là $(4;3)$`,
              L`Điểm $M(1;2)$ thuộc $d$`, L`Khoảng cách từ $O$ đến $d$ bằng $5$`],
          dung: [true, true, true, false],
          giai: L`$d(O,d) = \dfrac{\left|5\right|}{\sqrt{9+16}} = 1$ nên ý d) sai.` },

        { muc: 2, de: L`Cho đường tròn $(C): x^2 + y^2 - 2x + 4y - 4 = 0$.`,
          y: [L`Tâm của $(C)$ là $I(1;-2)$`, L`Bán kính $R = 3$`,
              L`Điểm $O(0;0)$ nằm bên trong $(C)$`, L`$(C)$ tiếp xúc với trục $Ox$`],
          dung: [true, true, true, false],
          giai: L`Khoảng cách từ $I$ đến $Ox$ bằng $2 \ne R = 3$ nên đường tròn không tiếp xúc $Ox$.` }
      ],

      traloingan: [
        { muc: 1, de: L`Khoảng cách từ điểm $M(2;1)$ đến đường thẳng $4x - 3y + 1 = 0$ bằng bao nhiêu?`,
          dapan: '1,2',
          giai: L`$d = \dfrac{\left|8 - 3 + 1\right|}{\sqrt{16+9}} = \dfrac{6}{5} = 1{,}2$.` },

        { muc: 2, de: L`Đường tròn tâm $I(2;-1)$ đi qua điểm $A(5;3)$ có bán kính bằng bao nhiêu?`,
          dapan: '5',
          giai: L`$R = IA = \sqrt{3^2 + 4^2} = 5$.` }
      ]
    }
  },

  /* ---------------- CHƯƠNG VIII ---------------- */
  {
    id: 8, tap: 2, mach: 'thong-ke',
    ten: 'Đại số tổ hợp',
    bai: [
      'Bài 23. Quy tắc đếm',
      'Bài 24. Hoán vị, chỉnh hợp và tổ hợp',
      'Bài 25. Nhị thức Newton'
    ],
    cauhoi: {
      tracnghiem: [
        { muc: 1, de: `Có bao nhiêu cách xếp 5 bạn ngồi thành một hàng ngang?`,
        dapan: [L`$120$`, L`$25$`, L`$60$`, L`$720$`],
        dung: 0,
        giai: L`Đây là hoán vị của $5$ phần tử, bằng $5! = 120$.` },

        { muc: 2, de: L`Giá trị của $A_5^2$ bằng`,
        dapan: [L`$20$`, L`$10$`, L`$120$`, L`$25$`],
        dung: 0,
        giai: L`$A_5^2 = 5 \times 4 = 20$.` },

        { muc: 3, de: L`Hệ số của $x^2$ trong khai triển $(1 + x)^5$ là`,
        dapan: [L`$10$`, L`$5$`, L`$20$`, L`$15$`],
        dung: 0,
        giai: L`Hệ số đó bằng $C_5^2 = 10$.` }
      ],

      dungsai: [
        { muc: 1, de: `Xét tính đúng sai của các khẳng định sau.`,
          y: [L`$C_5^5 = 1$`, L`$A_5^3 = 60$`, L`$C_6^2 = 15$`, L`$P_4 = 12$`],
          dung: [true, true, true, false],
          giai: L`$P_4 = 4! = 24$ nên ý d) sai.` },

        { muc: 2, de: L`Xét khai triển $(x + 2)^4$.`,
          y: [`Khai triển có 5 số hạng`, L`Hệ số của $x^3$ bằng $8$`,
              L`Số hạng tự do bằng $16$`, L`Hệ số của $x^2$ bằng $12$`],
          dung: [true, true, true, false],
          giai: L`Hệ số của $x^2$ là $C_4^2 \cdot 2^2 = 6 \cdot 4 = 24$ nên ý d) sai.` }
      ],

      traloingan: [
        { muc: 1, de: `Một lớp có 12 học sinh. Có bao nhiêu cách chọn ra 1 lớp trưởng và 1 lớp phó?`,
          dapan: '132',
          giai: L`Có phân biệt chức vụ nên dùng chỉnh hợp, $A_{12}^{2} = 12 \cdot 11 = 132$.` },

        { muc: 2, de: `Từ các chữ số 1, 2, 3, 4, 5 lập được bao nhiêu số tự nhiên có ba chữ số đôi một khác nhau?`,
          dapan: '60',
          giai: L`$A_5^3 = 5 \cdot 4 \cdot 3 = 60$.` }
      ]
    }
  },

  /* ---------------- CHƯƠNG IX ---------------- */
  {
    id: 9, tap: 2, mach: 'thong-ke',
    ten: 'Tính xác suất theo định nghĩa cổ điển',
    bai: [
      'Bài 26. Biến cố và định nghĩa cổ điển của xác suất',
      'Bài 27. Thực hành tính xác suất theo định nghĩa cổ điển'
    ],
    cauhoi: {
      tracnghiem: [
        { muc: 1, de: `Gieo một con xúc xắc cân đối. Xác suất xuất hiện mặt có số chấm chẵn là`,
        dapan: [L`$\dfrac{1}{2}$`, L`$\dfrac{1}{3}$`, L`$\dfrac{1}{4}$`, L`$\dfrac{2}{3}$`],
        dung: 0,
        giai: L`Có $3$ kết quả thuận lợi là $2, 4, 6$ trên tổng số $6$ kết quả.` },

        { muc: 1, de: `Gieo đồng thời hai đồng xu cân đối. Xác suất cả hai đều ra mặt sấp là`,
        dapan: [L`$\dfrac{1}{4}$`, L`$\dfrac{1}{2}$`, L`$\dfrac{1}{3}$`, L`$\dfrac{2}{3}$`],
        dung: 0,
        giai: L`Không gian mẫu có $4$ kết quả, chỉ $1$ kết quả là cả hai cùng sấp.` },

        { muc: 2, de: `Rút ngẫu nhiên một lá từ bộ bài 52 lá. Xác suất rút được lá chất cơ là`,
        dapan: [L`$\dfrac{1}{4}$`, L`$\dfrac{1}{3}$`, L`$\dfrac{1}{13}$`, L`$\dfrac{1}{52}$`],
        dung: 0,
        giai: L`Bộ bài có $13$ lá chất cơ nên xác suất bằng $\dfrac{13}{52} = \dfrac{1}{4}$.` },

        { muc: 3, de: L`Nếu $P(A) = 0{,}3$ thì xác suất của biến cố đối bằng`,
        dapan: [L`$0{,}7$`, L`$0{,}3$`, L`$1{,}3$`, L`$0$`],
        dung: 0,
        giai: L`Áp dụng $P\left(\overline{A}\right) = 1 - 0{,}3 = 0{,}7$.` }
      ],

      dungsai: [
        { muc: 1, de: `Gieo đồng thời hai con xúc xắc cân đối và đồng chất.`,
          y: [L`$n(\Omega) = 36$`, L`Xác suất tổng số chấm bằng $7$ là $\dfrac{1}{6}$`,
              L`Xác suất tổng số chấm bằng $12$ là $\dfrac{1}{36}$`,
              L`Xác suất hai mặt có số chấm giống nhau là $\dfrac{1}{36}$`],
          dung: [true, true, true, false],
          giai: L`Có $6$ kết quả hai mặt giống nhau nên xác suất là $\dfrac{6}{36} = \dfrac{1}{6}$, ý d) sai.` },

        { muc: 2, de: `Một hộp có 5 viên bi đỏ và 3 viên bi xanh. Lấy ngẫu nhiên một viên.`,
          y: [L`$n(\Omega) = 8$`, L`Xác suất lấy được bi đỏ là $\dfrac{5}{8}$`,
              L`Xác suất lấy được bi xanh là $\dfrac{3}{8}$`,
              L`Xác suất lấy được viên không phải bi đỏ là $\dfrac{5}{8}$`],
          dung: [true, true, true, false],
          giai: L`Biến cố đối của lấy được bi đỏ là lấy được bi xanh, xác suất bằng $\dfrac{3}{8}$.` }
      ],

      traloingan: [
        { muc: 1, de: `Một hộp có 4 bi đỏ và 6 bi xanh. Lấy ngẫu nhiên đồng thời 2 viên. Không gian mẫu có bao nhiêu phần tử?`,
          dapan: '45',
          giai: L`$n(\Omega) = C_{10}^{2} = 45$.` },

        { muc: 2, de: `Gieo đồng thời ba đồng xu cân đối. Không gian mẫu có bao nhiêu phần tử?`,
          dapan: '8',
          giai: L`Mỗi đồng xu có 2 kết quả nên $n(\Omega) = 2^3 = 8$.` }
      ]
    }
  }
];

const TEN_MACH = {
  'dai-so':    'Đại số và Giải tích',
  'hinh-hoc':  'Hình học và Đo lường',
  'thong-ke':  'Thống kê và Xác suất'
};
