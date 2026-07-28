Tính Năng Chính
1 Trang chủ (Home):

    Hero Banner slider tự động.

    Danh mục sản phẩm nổi bật & Chính sách bán hàng.

    Hiển thị danh sách sản phẩm công nghệ bán chạy fetch từ API.

2 Tìm kiếm & Bộ lọc (Search & Filter):

    Thanh tìm kiếm thông minh tích hợp Debounce (500ms) và dropdown gợi ý sản phẩm công nghệ theo thời gian thực.

    Đổ lọc danh mục (Smartphones, Laptops, Tablets, Accessories).

3 Chi tiết sản phẩm (Product Detail):

    Xem hình ảnh chất lượng cao, giá tiền (đổi sang VNĐ), thông số kĩ thuật và đánh giá.

4 Giỏ hàng (Cart) & Redux:

    Thêm/Xóa/Sửa số lượng sản phẩm trực tiếp.

    Tự động tính tổng tiền và đồng bộ trạng thái giỏ hàng.

5 Xác thực người dùng (Auth Simulation):

    Đăng nhập giả lập để bảo vệ các route riêng tư như Trang cá nhân (/profile).

Cấu trúc thư mục
src/
├── api/          # Cấu hình Axios Client & hàm gọi API tập trung (productService...)
├── assets/       # Tài nguyên tĩnh (Hình ảnh banner, logo, icons...)
├── components/   # UI Component tái sử dụng (Header, Footer, ProductCard, PageWrapper...)
├── constants/    # Hằng số toàn cục (API_URL, APP_ROUTES...)
├── hooks/        # Custom Hooks tự định nghĩa (useDebounce...)
├── layouts/      # Khung Layout của trang (MainLayout, AuthLayout...)
├── pages/        # Các màn hình chính (Home, ProductList, ProductDetail, Cart, Profile, NotFound...)
├── redux/        # Quản lý Global State với Redux Toolkit (cartSlice, userSlice, store.js)
├── routes/       # Cấu hình Routing và Bảo vệ Route (ProtectedRoute)
├── styles/       # Cấu hình CSS dùng chung, biến màu sắc toàn cục
├── utils/        # Các hàm tiện ích bổ trợ (Format tiền tệ, xử lý chuỗi)
├── App.jsx       # Component cốt lõi gắn kết Routes và Providers
└── main.jsx      # Vite Entry-point

Hướng Dẫn Cài Đặt & Chạy Cục Bộ (Local Setup)
Yêu cầu hệ thống:
Node.js: Phiên bản 18.x trở lên

npm hoặc yarn

Các bước thực hiện:
1 Clone repository về máy:

Bash
git clone [https://github.com/trungduc610/tech-store.git]

2 Cài đặt các thư viện phụ thuộc (Dependencies):

Bash
npm install
3 Khởi chạy ứng dụng ở môi trường Development:

Bash
npm run dev
Trình duyệt sẽ mở tại địa chỉ: http://localhost:5173/