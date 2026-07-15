import React from 'react';
import { Input, Badge, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { SearchOutlined, HeartOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import logoImg from '../assets/images/techstore_logo.png';
import styles from './Header.module.css';

const Header = () => {
  // Đưa các danh mục con vào menu luôn để giống với một web bán hàng thực tế
  const menuItems = [
    { key: 'home', label: <Link to="/">Trang chủ</Link> },
    { key: 'laptop', label: <Link to="/products?category=laptop">Laptop</Link> },
    { key: 'phone', label: <Link to="/products?category=phone">Điện thoại</Link> },
    { key: 'accessories', label: <Link to="/products?category=accessories">Phụ kiện</Link> },
    { key: 'components', label: <Link to="/products?category=components">Linh kiện</Link> },
  ];

  return (
    <header className={styles.headerWrapper}>
      
      {/* 1. HÀNG TRÊN (TOP ROW) */}
      <div className={styles.topRow}>
        
        {/* Logo */}
        <Link to="/" className={styles.logoSection}>
          <img src={logoImg} alt="TechZone Logo" className={styles.logoImg} />
          <span className={styles.logoText}>TechZone</span>
        </Link>

        {/* Thanh tìm kiếm trung tâm */}
        <div className={styles.searchSection}>
          <Input
            size="large"
            placeholder="Bạn đang tìm kiếm gì?"
            prefix={<SearchOutlined style={{ color: '#9ca3af', marginRight: '8px' }} />}
            style={{ borderRadius: '6px' }}
          />
        </div>

        {/* Các biểu tượng chức năng */}
        <div className={styles.iconSection}>
          <Link to="/wishlist" className={styles.iconLink}>
            <HeartOutlined />
          </Link>
          
          <Link to="/cart" className={styles.iconLink}>
            {/* Sử dụng Badge để tạo chấm đỏ thông báo số lượng */}
            <Badge count={3} color="#ef4444" size="small" offset={[-2, 4]}>
              <ShoppingCartOutlined style={{ fontSize: '24px', color: '#003049' }} />
            </Badge>
          </Link>

          {/* Giữ lại icon Profile để người dùng có thể đăng nhập */}
          <Link to="/profile" className={styles.iconLink}>
            <UserOutlined />
          </Link>
        </div>
      </div>

      {/* 2. HÀNG DƯỚI (BOTTOM ROW) - MENU ĐIỀU HƯỚNG */}
      <div className={styles.bottomRow}>
        <Menu 
          mode="horizontal" 
          items={menuItems} 
          className={styles.navMenu}
          selectedKeys={[]} // Tạm thời để trống, sau này có thể cấu hình active theo route
        />
      </div>

    </header>
  );
};

export default Header;