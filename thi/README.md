# Tự học Toán 10 — Chương trình GDPT 2018

Trang web tự học và tự luyện đề Toán lớp 10, chạy hoàn toàn trong trình duyệt,
không cần máy chủ, không cần đăng nhập. Mở link là học được ngay.

> Đây là bản giới thiệu độc lập, dựng riêng để gửi dự thi. Bản này không nối
> tới máy chủ nào, mọi tiến độ chỉ lưu trong máy người xem.

## Mở ra xem

Bấm đúp `index.html`, hoặc mở địa chỉ web của bản này. Lần đầu mở cần có mạng
để tải thư viện MathJax, sau đó trình duyệt nhớ sẵn và dùng được cả khi mất mạng.

## Nội dung hiện có

**Đề ôn tập giữa kì I**, gồm 16 câu theo đúng định dạng đề thi mới:

| Dạng | Số câu | Nội dung |
|---|---|---|
| Trắc nghiệm bốn phương án | 10 | mệnh đề, bất phương trình bậc nhất hai ẩn, hệ thức lượng trong tam giác |
| Đúng sai bốn ý | 2 | các phép toán trên tập hợp, bất phương trình bậc nhất hai ẩn |
| Trả lời ngắn | 4 | đếm phần tử tập hợp, giá trị lượng giác, diện tích tam giác, bài toán thực tế |

Đề bao trùm ba chương đầu của chương trình lớp 10:

- Chương I. Mệnh đề và tập hợp
- Chương II. Bất phương trình và hệ bất phương trình bậc nhất hai ẩn
- Chương III. Hệ thức lượng trong tam giác

## Mỗi lần làm là một đề khác

Câu hỏi không lấy từ một kho cố định mà do bộ sinh trong `js/sinh.js` dựng ra
tại chỗ. Cấu trúc đề giữ nguyên, mỗi câu một dạng theo đúng thứ tự, nhưng số
liệu thì sinh mới mỗi lượt. Bốn phương án trắc nghiệm cũng được xáo trộn lại,
nên học sinh không đoán được đáp án theo vị trí.

Nhờ vậy một học sinh làm đi làm lại mười lần vẫn gặp mười đề khác nhau, mà vẫn
luyện đúng từng dạng cần luyện.

## Chấm ngay và giải thích ngay

Làm xong một câu là biết đúng sai liền, kèm lời giải viết sẵn cho chính con số
vừa gặp. Câu trả lời ngắn nhận đáp án là số nguyên, gõ dấu chấm hay dấu phẩy
ngăn hàng nghìn đều được tính đúng.

## Thưởng xu và cửa hàng

Mỗi câu đúng được xu, trắc nghiệm 1 xu, đúng sai và trả lời ngắn 5 xu. Xu dùng
để mua áo mũ cho con cú mèo, mua đồ trang trí nhà cú, hoặc đổi lấy điểm cộng
trên lớp. Đây là phần giữ học sinh quay lại làm bài thêm một lượt nữa.

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
├── js/data.js      khai báo chương và cấu trúc đề
├── js/sinh.js      bộ sinh câu hỏi, mỗi lượt một số liệu khác
├── js/main.js      logic hiển thị, chấm bài, xu và cửa hàng
├── js/fb.js        bản độc lập, không nối máy chủ
├── manifest.json   khai báo để cài được vào màn hình chính
└── sw.js           cho phép chạy khi mất mạng
```

## Dữ liệu của người học

Tiến độ, xu và đồ đã mua lưu bằng `localStorage`, nằm trên máy người học và
không gửi đi đâu. Bản này không thu thập, không gửi và không lưu trữ bất kì
thông tin cá nhân nào.
