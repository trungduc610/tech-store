import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import Layout
import BaseLayout from '../layouts/BaseLayout';

// Import Pages
import Home from '../pages/Home';
import ProductList from '../pages/ProductList';
import ProductDetail from '../pages/ProductDetail';
import Cart from '../pages/Cart';
import Wishlist from '../pages/Wishlist';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import NotFound from '../pages/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Các Route nằm trong BaseLayout sẽ có Header và Footer */}
      <Route path="/" element={<BaseLayout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<ProductList />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* Các Route đứng độc lập (Không có Header/Footer) */}
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;