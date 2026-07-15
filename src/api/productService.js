import axiosClient from './axiosClient';

const productService = {
  // 1. Lấy danh sách tất cả sản phẩm (có hỗ trợ phân trang)
  // DummyJSON hỗ trợ limit (số lượng lấy) và skip (số lượng bỏ qua)
  getProducts: (limit = 16, skip = 0) => {
    const url = `/products?limit=${limit}&skip=${skip}`;
    return axiosClient.get(url);
  },

  // 2. Lấy chi tiết một sản phẩm theo ID
  getProductById: (id) => {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  },

  // 3. Tìm kiếm sản phẩm theo tên (Dành cho thanh tìm kiếm trên Header)
  searchProducts: (keyword) => {
    const url = `/products/search?q=${keyword}`;
    return axiosClient.get(url);
  },

  // 4. Lấy danh sách sản phẩm theo danh mục (Category)
  getProductsByCategory: (category) => {
    const url = `/products/category/${category}`;
    return axiosClient.get(url);
  },
  
  // 5. Lấy danh sách các danh mục (Categories) hiện có
  getCategories: () => {
    const url = '/products/categories';
    return axiosClient.get(url);
  }
};

export default productService;