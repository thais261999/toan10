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
   mỗi dạng một phần bằng nhau. Chương I trắc nghiệm đang dùng sáu nhãn:
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
     Đề trắc nghiệm có cấu trúc cố định 10 câu, mỗi câu một dạng,
     liệt kê trong deCoDinh dưới đây theo đúng thứ tự xuất hiện.
     Câu hỏi do bộ sinh trong js/sinh.js tạo ra, số liệu mỗi lần một khác.

     khoa: dạng nào ghi ở đây thì hiện khoá, bấm vào chỉ báo một câu,
     chưa cho làm. Muốn mở thì xoá dòng tương ứng đi. */
  {
    id: 101, tap: 1, mach: 'dai-so',
    ten: 'Ôn tập giữa kì I',
    nhan: 'Ôn tập',
    bai: [
      'Chương I. Mệnh đề và tập hợp',
      'Chương II. Bất phương trình và hệ bất phương trình bậc nhất hai ẩn',
      'Chương III. Hệ thức lượng trong tam giác'
    ],
    khoa: {
      dungsai:    'Phần này thầy cô chưa mở, em làm trắc nghiệm trước nhé.',
      traloingan: 'Phần này thầy cô chưa mở, em làm trắc nghiệm trước nhé.'
    },
    deCoDinh: [
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
    cauhoi: { tracnghiem: [], dungsai: [], traloingan: [] }
  }

];

const TEN_MACH = {
  'dai-so':    'Đại số và Giải tích',
  'hinh-hoc':  'Hình học và Đo lường',
  'thong-ke':  'Thống kê và Xác suất'
};
