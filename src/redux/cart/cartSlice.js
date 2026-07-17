import { createSlice } from '@reduxjs/toolkit';
import { loadState } from '../../utils/localStorage';


const persistedItems = loadState('cartItems') || [];
const initialState = {
  items: persistedItems,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      
      if (existingItem) {
        existingItem.qty += newItem.qty;
      } else {
        state.items.push(newItem);
      }
    },
    
    updateQuantity: (state, action) => {
      const { id, qty } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem && qty >= 1) {
        existingItem.qty = qty;
      }
    },
    
    removeFromCart: (state, action) => {
      const idToRemove = action.payload;
      state.items = state.items.filter(item => item.id !== idToRemove);
    }
  }
});

export const { addToCart, updateQuantity, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;