import { configureStore } from '@reduxjs/toolkit';
import productReducer from './product/productSlice';
import cartReducer from './cart/cartSlice';
import wishlistReducer from './wishlist/wishlistSlice'; 
import { saveState } from '../utils/localStorage';
import userReducer from './user/userSlice';

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    user: userReducer,
  },
});

store.subscribe(() => {
  saveState('cartItems', store.getState().cart.items);
  saveState('wishlistItems', store.getState().wishlist.items);
});