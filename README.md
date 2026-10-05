# Toán 10 – Chương trình GDPT 2018

Trang tự học Toán lớp 10, chạy trong trình duyệt, không cần máy chủ.
Công thức toán viết bằng **LaTeX**, do thư viện MathJax dựng hình.

## Chạy thử

```
open index.html
```

Lần đầu mở cần có mạng để tải MathJax. Sau đó trình duyệt nhớ sẵn trong bộ đệm.

## Cấu trúc

```
web-toan-10/
├── index.html      khung trang + cấu hình MathJax
├── css/style.css   giao diện, có sẵn chế độ sáng và tối
├── js/data.js      ← TOÀN BỘ NỘI DUNG HỌC, viết bằng LaTeX
└── js/main.js      logic hiển thị và chấm bài
```

## Ba quy tắc khi sửa js/data.js

1. Chuỗi chữ bọc trong dấu nháy ngược `` ` `` và có chữ `L` đứng trước.
   Nhờ chữ `L` đó bạn viết `\frac` như bình thường, **không** phải viết `\\frac`.
2. Công thức đặt giữa hai dấu `$ ... $` ngay trong câu văn tiếng Việt.
3. Dùng `\lt` và `\gt` thay cho dấu `<` và `>`, vì trình duyệt hiểu nhầm hai dấu này là thẻ HTML.

```js
de: L`Giải bất phương trình $x^2 - 5x + 6 \gt 0$.`
```

Chuỗi thuần tiếng Việt không có công thức thì bỏ chữ `L` cũng được.

## Mỗi lần làm bài rút một đề khác nhau

Bấm vào một dạng là trang bốc ngẫu nhiên câu từ ngân hàng của chương đó,
chia theo ba mức độ rồi xếp dễ trước khó sau. Mở `js/main.js`, hai dòng đầu:

```js
var SO_CAU = { tracnghiem: 10, dungsai: 2, traloingan: 3 };
var TI_LE  = { 1: 0.55, 2: 0.35, 3: 0.10 };   // nhận biết, thông hiểu, vận dụng
```

Viết một số thì lần nào cũng bấy nhiêu câu. Viết một khoảng thì mỗi lần một số
khác nhau, ví dụ `tracnghiem: [18, 25]` sẽ ra từ 18 đến 25 câu tuỳ lượt.

## Đề có cấu trúc cố định

Riêng đề ôn tập thì không rút tự do như trên. Chương nào có `deCoDinh` trong
`js/data.js` thì dạng bài ghi trong đó ra đúng từng câu, theo đúng thứ tự,
mỗi câu một dạng, lần nào làm cũng đủ các dạng, chỉ số liệu là đổi:

```js
deCoDinh: {
  tracnghiem: ['md-nhandang', 'md-dungsai', ...],   // 10 câu
  dungsai:    ['ts-taphop', 'bpt-dungsai']          //  2 câu
}
```

Mỗi nhãn là một `dang` của mẫu sinh trong `js/sinh.js`. Số câu khi ấy do số
nhãn quyết định, `SO_CAU` không còn tác dụng với dạng bài đó.

## Ngân hàng câu hỏi nên có bao nhiêu

| Dạng | Rút mỗi lần | Kho mỗi chương nên có |
|---|---|---|
| Trắc nghiệm | 10 | **300** |
| Đúng sai | 2 | **50** |
| Trả lời ngắn | 3 | **50** |

Kho càng lớn thì đề càng ít lặp. Khi kho ít hơn số cần rút, trang lấy hết
những gì có, nên đề sẽ ngắn và giống nhau mỗi lần.

## Thêm câu hỏi mới

Mở `js/data.js`, tìm chương cần thêm, chèn vào mảng `cauhoi`:

```js
{
  de: L`Giá trị của $\cos 150^\circ$ bằng`,
  dapan: [
    L`$-\dfrac{\sqrt{3}}{2}$`,
    L`$-\dfrac{1}{2}$`,
    L`$\dfrac{1}{2}$`,
    L`$\dfrac{\sqrt{3}}{2}$`
  ],
  dung: 0,
  giai: L`$\cos 150^\circ = -\cos 30^\circ = -\dfrac{\sqrt{3}}{2}$.`
}
```

**Luôn đặt đáp án đúng ở vị trí đầu tiên và để `dung: 0`.** Trang tự xáo trộn
thứ tự bốn phương án mỗi lần làm bài nên học sinh không đoán được theo vị trí.

## Lệnh LaTeX dùng được

MathJax hiểu gần như toàn bộ lệnh toán quen thuộc: `\frac` `\dfrac` `\sqrt`
`\sum` `\prod` `\int` `\lim` `\overline` `\overrightarrow` `\vec` `\widehat`
`\mathbb` `\left( \right)` `\begin{cases}...\end{cases}` `\begin{array}...`
cùng mọi chữ Hy Lạp và kí hiệu `\in \cup \cap \setminus \forall \exists
\Rightarrow \Leftrightarrow \le \ge \ne \pm \cdot \infty \perp`.

Vài thói quen riêng của trang này:

| Việc | Viết |
|---|---|
| dấu nhỏ hơn, lớn hơn | `\lt` và `\gt` |
| độ | `90^\circ` |
| dấu phẩy thập phân | `4{,}8` để khoảng cách đúng |
| dấu chấm phẩy ngăn toạ độ | `$(3;4)$` |
| công thức đứng riêng, cỡ lớn | `$$ ... $$` |

Không viết tiếng Việt bên trong `$ ... $`, hãy đóng dấu `$` lại rồi viết tiếp.

## Thêm một chương

Chép nguyên một khối chương trong `data.js`, đổi `id`, `ten`, `bai`, `lythuyet`,
`cauhoi`. Trường `mach` nhận một trong ba giá trị `dai-so`, `hinh-hoc`, `thong-ke`.

## Tiến độ học

Điểm và trạng thái từng chương lưu bằng `localStorage`, chỉ nằm trên máy người học,
không gửi đi đâu. Nút **Đặt lại tiến độ** ở góc trên xoá sạch.

## Cài vào điện thoại như một app

Trang này là **PWA**, cài được vào màn hình chính mà không cần kho ứng dụng.
Nhưng PWA bắt buộc chạy qua **https**, nên phải đưa lên mạng trước, mở file
trực tiếp bằng `open index.html` sẽ không cài được.

**Bước 1.** Vào https://app.netlify.com/drop rồi kéo thả cả thư mục `web-toan-10` vào.
Vài giây sau có địa chỉ dạng `https://ten-gi-do.netlify.app`.

**Bước 2.** Gửi địa chỉ đó cho học sinh.

- **Android, Chrome:** mở link, bấm dấu ba chấm, chọn *Thêm vào Màn hình chính*.
  Máy thường tự hiện sẵn thanh gợi ý cài đặt.
- **iPhone, Safari:** mở link, bấm nút Chia sẻ, chọn *Thêm vào MH chính*.
  Bắt buộc dùng Safari, Chrome trên iPhone không cài được.

Sau khi cài, app có biểu tượng riêng, mở toàn màn hình không thấy thanh địa chỉ,
và **chạy được cả khi mất mạng** nhờ `sw.js`.

### Mỗi lần sửa nội dung

Mở `sw.js`, tăng số phiên bản ở dòng đầu, ví dụ `toan10-v1` thành `toan10-v2`,
rồi kéo thả lại thư mục lên Netlify. Máy học sinh sẽ tự tải bản mới.

## Lộ trình và quy tắc mở khoá

Trang chủ là con đường chín chặng. Chặng sau chỉ mở khi chặng trước **hoàn thành**,
tức là làm trắc nghiệm đúng từ **60%** trở lên, hoặc bấm *Đánh dấu đã học xong chương*.

Giáo viên muốn xem trước mọi chương thì bấm **Mở khoá hết** ở góc trên bên phải.
Muốn đổi mốc 60%, sửa dòng `var MOC = 0.6;` trong `js/main.js`.
