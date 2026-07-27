import axiosClient from './axiosClient';

const productService = {
  
  getProducts: (limit = 16, skip = 0) => {
    const url = `/products?limit=${limit}&skip=${skip}`;
    return axiosClient.get(url);
  },

  getProductById: (id) => {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  },

  searchProducts: (keyword) => {
    const url = `/products/search?q=${keyword}`;
    return axiosClient.get(url);
  },

  getProductsByCategory: (category) => {
    const url = `/products/category/${category}`;
    return axiosClient.get(url);
  },
  
  getCategories: () => {
    const url = '/products/categories';
    return axiosClient.get(url);
  }
};

export default productService;