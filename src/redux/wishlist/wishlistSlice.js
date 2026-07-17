import { createSlice } from '@reduxjs/toolkit';
import { loadState } from '../../utils/localStorage';

const persistedItems = loadState('wishlistItems') || [];

const initialState = {
  items: persistedItems,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      const newItem = action.payload;
      const existingIndex = state.items.findIndex(item => item.id === newItem.id);
      
      if (existingIndex >= 0) {
        state.items.splice(existingIndex, 1);
      } else {
        state.items.push(newItem);
      }
    },
    removeFromWishlist: (state, action) => {
      const idToRemove = action.payload;
      state.items = state.items.filter(item => item.id !== idToRemove);
    }
  }
});

export const { toggleWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;