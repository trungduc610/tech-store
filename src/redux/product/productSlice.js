import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from '../../api/productService';

export const fetchAllProducts = createAsyncThunk(
  'product/fetchAllProducts',
  async (_, { rejectWithValue }) => {
    try {
      const [phoneRes, laptopRes, accessoryRes, tabletRes] = await Promise.all([
        productService.getProductsByCategory('smartphones'),
        productService.getProductsByCategory('laptops'),
        productService.getProductsByCategory('mobile-accessories'),
        productService.getProductsByCategory('tablets')
      ]);
      
      const combined = [
        ...(phoneRes.products || []),
        ...(laptopRes.products || []),
        ...(accessoryRes.products || []),
        ...(tabletRes.products || [])
      ];
      
      return combined; 
    } catch (error) {
      return rejectWithValue('Không thể tải dữ liệu sản phẩm từ server');
    }
  }
);

const initialState = {
  items: [], 
  status: 'idle',
  error: null
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload; 
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; 
      });
  }
});

export default productSlice.reducer;