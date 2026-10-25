# Tự học Toán 10 — Chương trình GDPT 2018

Trang web tự học và tự luyện Toán lớp 10, chạy hoàn toàn trong trình duyệt,
không cần máy chủ, không cần đăng nhập. Mở link là học được ngay.

> Đây là bản giới thiệu độc lập, dựng riêng để gửi dự thi. Bản này không nối
> tới máy chủ nào, mọi tiến độ chỉ lưu trong máy người xem.

## Mở ra xem

Bấm đúp `index.html`, hoặc mở địa chỉ web của bản này. Lần đầu mở cần có mạng
để tải thư viện MathJax, sau đó trình duyệt nhớ sẵn và dùng được cả khi mất mạng.

## Nội dung hiện có

Mở trang ra là thấy ngay toàn bộ chương trình Toán 10, không qua màn hình trung
gian nào. Chín chương theo đúng sách Kết nối tri thức với cuộc sống, cộng thêm
một đề ôn tập giữa kì I:

| Tập | Chương | Các bài |
|---|---|---|
| Một | I. Mệnh đề và tập hợp | Bài 1 – 2 |
| Một | II. Bất phương trình bậc nhất hai ẩn | Bài 3 – 4 |
| Một | III. Hệ thức lượng trong tam giác | Bài 5 – 6 |
| Một | Ôn tập giữa kì I | đề 16 câu, số liệu sinh mới mỗi lượt |
| Một | IV. Vectơ | Bài 7 – 11 |
| Một | V. Các số đặc trưng của mẫu số liệu | Bài 12 – 14 |
| Hai | VI. Hàm số, đồ thị và ứng dụng | Bài 15 – 18 |
| Hai | VII. Phương pháp toạ độ trong mặt phẳng | Bài 19 – 22 |
| Hai | VIII. Đại số tổ hợp | Bài 23 – 25 |
| Hai | IX. Tính xác suất theo định nghĩa cổ điển | Bài 26 – 27 |

Tổng cộng **27 bài** và **114 câu hỏi viết sẵn**: 60 câu trắc nghiệm, 18 câu
đúng sai bốn ý, 36 câu trả lời ngắn — đúng ba dạng của định dạng đề thi mới.
Mỗi câu gắn sẵn mã bài, nên một lượt làm bài luôn rút đều các bài trong chương
chứ không dồn vào một bài.

## Mỗi lần làm là một đề khác

Riêng ba chương đầu và đề ôn tập giữa kì còn có thêm bộ sinh câu hỏi trong
`js/sinh.js`: cấu trúc đề giữ nguyên nhưng số liệu dựng mới tại chỗ, bốn phương
án cũng được xáo lại. Học sinh làm đi làm lại mười lần vẫn gặp mười đề khác nhau.

## Chấm ngay và giải thích ngay

Làm xong một câu là biết đúng sai liền. **Lời giải hiện ra ở mọi câu**, kể cả
câu làm đúng, để học sinh đối chiếu lại cách làm của mình. Câu trả lời ngắn nhận
đáp án là số nguyên, gõ dấu chấm hay dấu phẩy ngăn hàng nghìn đều được tính đúng.

## Trợ lý học tập

Nút tròn góc dưới bên phải mở một trợ lý hỏi đáp nhỏ. Học sinh gõ tên một kiến
thức — *định lí sin*, *phương sai*, *phương trình đường tròn*, *hoán vị chỉnh hợp
tổ hợp* — trợ lý nhắc lại định nghĩa và công thức cần nhớ, có sẵn sáu gợi ý bấm
nhanh. Kho kiến thức gồm 27 mục, mỗi mục ứng với một bài trong chương trình.

Trợ lý chạy ngay trong trình duyệt, **không gọi ra ngoài và không cần mạng**, nên
dùng được cả khi máy không nối Internet và không gửi đi bất cứ dữ liệu nào.

## Điểm thưởng

Mỗi câu đúng được điểm: trắc nghiệm 1, đúng sai và trả lời ngắn 5. Số điểm hiện
ở góc trên, dùng để học sinh tự theo dõi mình đã luyện được bao nhiêu.

## Cài vào điện thoại như một ứng dụng

Trang là một **PWA**. Mở địa chỉ https của bản này trên điện thoại rồi chọn
*Thêm vào Màn hình chính* là có biểu tượng riêng, mở toàn màn hình, và chạy
được cả khi không có mạng.

- Android, Chrome: bấm dấu ba chấm, chọn *Thêm vào Màn hình chính*.
- iPhone, Safari: bấm nút Chia sẻ, chọn *Thêm vào MH chính*.

## Làm bằng gì

HTML, CSS và JavaScript thuần, không dùng framework nào. Toàn bộ công thức toán
viết bằng LaTeX ngay trong mã nguồn, do **MathJax 3.2.2** dựng hình dạng SVG nên
nét ở mọi cỡ màn hình. Giao diện có sẵn chế độ sáng và chế độ tối, tự đổi theo
cài đặt của máy.

```
├── index.html      khung trang và cấu hình MathJax
├── css/style.css   giao diện, sáng và tối
├── js/data.js      chín chương, 27 bài, 114 câu hỏi viết sẵn
├── js/sinh.js      bộ sinh câu hỏi, mỗi lượt một số liệu khác
├── js/main.js      logic hiển thị, chấm bài và điểm thưởng
├── js/tro-ly.js    trợ lý học tập, kho kiến thức 27 mục
├── js/fb.js        bản độc lập, không nối máy chủ
├── manifest.json   khai báo để cài được vào màn hình chính
└── sw.js           cho phép chạy khi mất mạng
```

## Dữ liệu của người học

Tiến độ và điểm lưu bằng `localStorage`, nằm trên máy người học và không gửi đi
đâu. Bản này không thu thập, không gửi và không lưu trữ bất kì thông tin cá nhân
nào.
