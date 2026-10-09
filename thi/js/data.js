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
   Số câu mỗi chặng đặt trong SO_CAU ở js/main.js.

   dang là nhãn dạng câu hỏi, không bắt buộc. Trong một dạng bài của
   một chương, nếu MỌI câu đều có gắn dang thì đề rút đều các dạng,
   mỗi dạng một phần bằng nhau.

   deCoDinh dùng cho đề ôn tập: ghi sẵn nhãn dang của từng câu theo
   đúng thứ tự muốn chúng xuất hiện, lần nào làm cũng đủ các dạng và
   đúng vị trí, chỉ số liệu là đổi. Viết riêng cho từng dạng bài:
     deCoDinh: { tracnghiem: ['...', '...'], dungsai: ['...', '...'] }
   Đề đúng sai của Ôn tập giữa kì I đang dùng hai nhãn:
     'ts-taphop'    các phép toán trên tập hợp, tập con của tập số thực
     'bpt-dungsai'  bất phương trình bậc nhất hai ẩn
   Đề trả lời ngắn dùng bốn nhãn:
     'tln-taphop'    đếm số phần tử sau một phép toán tập hợp
     'tln-luonggiac' giá trị lượng giác của một góc từ 0 đến 180 độ
     'tln-dientich'  diện tích tam giác
     'tln-thucte'    bài toán thực tế về bất phương trình bậc nhất hai ẩn
   Mọi đáp án trả lời ngắn đều là số nguyên từ 10 đến 9999.
   Các mẫu sinh ra những câu này nằm ở cuối js/sinh.js.

   Chương I trắc nghiệm đang dùng sáu nhãn:
     'nhandang'  câu nào là mệnh đề, câu nào không phải mệnh đề
     'chuabien'  mệnh đề chứa biến
     'dung'      mệnh đề nào đúng
     'sai'       mệnh đề nào sai
     'dao'       phát biểu mệnh đề đảo
     'phudinh'   phát biểu mệnh đề phủ định
   Thêm câu mới cho Chương I thì nhớ gắn một trong sáu nhãn trên,
   và gắn cả trong bộ sinh ở js/sinh.js nếu viết thêm mẫu sinh.

   xu là số xu riêng cho một câu, không bắt buộc. Bỏ trống thì ăn mức
   chung đặt trong XU_CAU ở js/main.js.
   ============================================================ */

const L = String.raw;   // cho phép viết \frac thay vì \\frac

const CHUONG_TRINH = [

  /* ---------------- ÔN TẬP GIỮA KÌ I ----------------
     Đề có cấu trúc cố định: mỗi câu một dạng, liệt kê trong deCoDinh
     dưới đây theo đúng thứ tự xuất hiện. Trắc nghiệm 10 câu, đúng sai
     2 câu, trả lời ngắn 4 câu. Câu hỏi do bộ sinh trong js/sinh.js
     tạo ra, số liệu mỗi lần một khác.

     Muốn khoá tạm một dạng bài thì thêm lại khối khoa, ví dụ
       khoa: { traloingan: 'Phần này thầy cô chưa mở.' }
     dạng nào ghi trong đó thì hiện khoá, bấm vào chỉ báo một câu. */
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
      tracnghiem: [
        'md-nhandang',   /* 1. câu nào là mệnh đề / không phải mệnh đề   */
        'md-dungsai',    /* 2. mệnh đề nào đúng / mệnh đề nào sai        */
        'bpt-nhandang',  /* 3. nhận dạng bất phương trình bậc nhất hai ẩn*/
        'bpt-nghiem',    /* 4. nghiệm của bất phương trình               */
        'he-nhandang',   /* 5. nhận dạng hệ bất phương trình             */
        'he-nghiem',     /* 6. nghiệm của hệ bất phương trình            */
        'lg-bang',       /* 7. tra bảng giá trị lượng giác               */
        'lg-goc',        /* 8. góc bù, góc phụ                           */
        'lg-dinhly',     /* 9. định lí sin, côsin, công thức diện tích   */
        'dt-theso'       /*10. thay số vào công thức tính diện tích      */
      ],
      dungsai: [
        'ts-taphop',     /* 1. tập hợp: liệt kê, số phần tử, hợp, giao, hiệu */
        'bpt-dungsai'    /* 2. bất phương trình bậc nhất hai ẩn              */
      ],
      traloingan: [
        'tln-taphop',    /* 1. đếm số phần tử sau một phép toán tập hợp */
        'tln-luonggiac', /* 2. giá trị lượng giác của góc từ 0 đến 180  */
        'tln-dientich',  /* 3. diện tích tam giác                        */
        'tln-thucte'     /* 4. bài toán thực tế, quy hoạch tuyến tính     */
      ]
    },
    cauhoi: { tracnghiem: [], dungsai: [], traloingan: [] }
  }

];

const TEN_MACH = {
  'dai-so':    'Đại số và Giải tích',
  'hinh-hoc':  'Hình học và Đo lường',
  'thong-ke':  'Thống kê và Xác suất'
};
