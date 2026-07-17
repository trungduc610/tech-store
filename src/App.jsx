import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './layouts/Header';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';

const App = () => {
  return (
    <Router>
      <Header />
      
      <ToastContainer 
        position="bottom-right"
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={true}
        closeOnClick 
        pauseOnHover 
        theme="colored"
      />

      <main style={{ padding: '20px 50px', background: '#f9fafb', minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;