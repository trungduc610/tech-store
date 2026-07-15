import axios from 'axios';

// Khởi tạo một instance của Axios với các cấu hình mặc định
const axiosClient = axios.create({
  baseURL: 'https://dummyjson.com', // Cố định domain gốc của DummyJSON
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Tối đa 10 giây chờ phản hồi
});

// Interceptor cho Request: Chạy trước khi request được gửi đi
axiosClient.interceptors.request.use(
  (config) => {
    // Tương lai nếu có token đăng nhập, bạn sẽ đính kèm token vào header tại đây
    // const token = localStorage.getItem('token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor cho Response: Chạy trước khi component nhận được data
axiosClient.interceptors.response.use(
  (response) => {
    // Chỉ lấy phần data trả về, bỏ qua các thông tin config thừa của axios
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Nơi xử lý lỗi tập trung (ví dụ: hiển thị toast lỗi mạng)
    console.error('Lỗi gọi API:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosClient;