# 🚀 TechZone - Website Bán Đồ Công Nghệ


**TechZone** là ứng dụng web thương mại điện tử chuyên cung cấp các sản phẩm công nghệ (Điện thoại, Laptop, Máy tính bảng, Phụ kiện...). Dự án tập trung tối ưu trải nghiệm người dùng (UI/UX), tốc độ tải trang, khả năng phản hồi (Responsive) và áp dụng cấu trúc mã nguồn sạch, hiện đại.

## 📂 Cấu Trúc Thư Mục Dự Án

```text
src/
├── api/          # Cấu hình Axios Client & hàm gọi API tập trung
├── assets/       # Tài nguyên tĩnh
├── components/   # UI Component tái sử dụng
├── constants/    # Hằng số toàn cục
├── hooks/        # Custom Hooks tự định nghĩa
├── layouts/      # Khung Layout của trang
├── pages/        # Các màn hình chính
├── redux/        # Quản lý Global State với Redux Toolkit
├── routes/       # Cấu hình Routing và Bảo vệ Route
├── styles/       # Cấu hình CSS dùng chung
├── utils/        # Các hàm tiện ích bổ trợ
├── App.jsx       # Component cốt lõi
└── main.jsx      # Vite Entry-point

Tính Năng Chính
1. Trang chủ (Home): Hero Banner, Danh mục, Sản phẩm nổi bật.
2. Tìm kiếm & Bộ lọc nâng cao: Tìm kiếm thông minh tích hợp Debounce (500ms).
3. Chi tiết sản phẩm: Xem hình ảnh, giá tiền, thông số kĩ thuật.
4. Giỏ hàng (Cart) & Redux: Thêm/Xóa/Sửa, tính tổng tiền.
5. Xác thực người dùng: Đăng nhập giả lập để bảo vệ các route riêng tư.
Hướng Dẫn Cài Đặt & Chạy Cục Bộ (Local Setup)
1. Clone repository về máy
2. Cài đặt các thư viện phụ thuộc (npm install)
3. Khởi chạy ứng dụng (npm run dev)

