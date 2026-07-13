import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { ShoppingCartOutlined, HeartOutlined, UserOutlined } from '@ant-design/icons';

// 1. Import file logo từ thư mục assets
import logoImg from '../assets/images/techstore_logo.png'; 

const { Header: AntHeader } = Layout;

const Header = () => {
  const menuItems = [
    {
      key: 'home',
      label: <Link to="/">Trang chủ</Link>,
    },
    {
      key: 'products',
      label: <Link to="/products">Sản phẩm</Link>,
    },
  ];

  return (
    <AntHeader style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#0d3b66', padding: '0 50px' }}>
      
      {/* 2. Cập nhật phần Logo: Dùng display flex và gap để tạo khoảng cách */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', gap: '12px' }}>
          <img 
            src={logoImg} 
            alt="TechZone Logo" 
            style={{ height: '36px', width: 'auto', objectFit: 'contain', background: '#fff', borderRadius: '4px', padding: '2px' }} 
          />
          <span style={{ color: '#02c39a', fontSize: '24px', fontWeight: 'bold' }}>TechZone</span>
        </Link>
      </div>

      {/* Điều hướng */}
      <Menu 
        theme="dark" 
        mode="horizontal" 
        items={menuItems} 
        style={{ background: 'transparent', flex: 1, justifyContent: 'center', borderBottom: 'none' }} 
      />

      {/* Icons */}
      <div style={{ display: 'flex', gap: '20px', fontSize: '20px' }}>
        <Link to="/wishlist" style={{ color: '#fff' }}><HeartOutlined /></Link>
        <Link to="/cart" style={{ color: '#fff' }}><ShoppingCartOutlined /></Link>
        <Link to="/profile" style={{ color: '#fff' }}><UserOutlined /></Link>
      </div>
    </AntHeader>
  );
};

export default Header;