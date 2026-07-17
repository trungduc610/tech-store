import React, { useState, useEffect, useRef } from 'react';
import { Input, Badge, Menu, Spin, Dropdown } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { SearchOutlined, HeartOutlined, ShoppingCartOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import logoImg from '../assets/images/techstore_logo.png';
import styles from './Header.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/user/userSlice';
import { toast } from 'react-toastify';

import useDebounce from '../hooks/useDebounce';
import productService from '../api/productService';

const formatPrice = (price) => new Intl.NumberFormat('vi-VN').format(price) + ' đ';

const Header = () => {
  const navigate = useNavigate();
  
  // State quản lý tìm kiếm
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const cartItems = useSelector(state => state.cart.items);
  const totalCartQty = cartItems.reduce((total, item) => total + item.qty, 0);

  const dispatch = useDispatch();
  
  const { isAuthenticated, currentUser } = useSelector(state => state.user);

  const handleLogout = () => {
    dispatch(logout());
    toast.info('Đã đăng xuất khỏi hệ thống');
  };

  const userMenu = [
    { key: 'profile', label: 'Thông tin tài khoản' },
    { key: 'orders', label: 'Đơn hàng của tôi' },
    { type: 'divider' },
    { 
      key: 'logout', 
      label: 'Đăng xuất', 
      icon: <LogoutOutlined />, 
      danger: true,
      onClick: handleLogout 
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (debouncedSearchTerm.trim()) {
        setIsSearching(true);
        setShowDropdown(true);
        try {
          const res = await productService.searchProducts(debouncedSearchTerm);
          setSearchResults(res.products || []);
        } catch (error) {
          console.error("Lỗi khi tìm kiếm:", error);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
        setShowDropdown(false);
      }
    };

    fetchSearchResults();
  }, [debouncedSearchTerm]);

  const handleProductClick = (id) => {
    setSearchTerm(''); 
    setShowDropdown(false); 
    navigate(`/products/${id}`); 
  };

  const menuItems = [
    { key: 'home', label: <Link to="/">Trang chủ</Link> },
    { key: 'laptop', label: <Link to="/products?category=laptop">Laptop</Link> },
    { key: 'phone', label: <Link to="/products?category=phone">Điện thoại</Link> },
    { key: 'accessories', label: <Link to="/products?category=accessories">Phụ kiện</Link> },
    { key: 'components', label: <Link to="/products?category=components">Linh kiện</Link> },
  ];

  return (
    <header className={styles.headerWrapper}>
      <div className={styles.topRow}>
        
        {/* Logo */}
        <Link to="/" className={styles.logoSection}>
          <img src={logoImg} alt="TechZone Logo" className={styles.logoImg} />
          <span className={styles.logoText}>TechZone</span>
        </Link>

        <div className={styles.searchContainer} ref={searchRef}>
          <Input
            size="large"
            placeholder="Bạn đang tìm kiếm gì?"
            prefix={<SearchOutlined style={{ color: '#9ca3af', marginRight: '8px' }} />}
            style={{ borderRadius: '6px' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => { if (searchTerm.trim()) setShowDropdown(true); }}
          />

          {showDropdown && (
            <div className={styles.searchResults}>
              {isSearching ? (
                <div className={styles.searchFeedback}>
                  <Spin size="small" /> <span style={{ marginLeft: 8 }}>Đang tìm kiếm...</span>
                </div>
              ) : searchResults.length > 0 ? (
                searchResults.map((product) => {
                  const priceVND = Math.round(product.price * 25000);
                  return (
                    <div 
                      key={product.id} 
                      className={styles.searchItem}
                      onClick={() => handleProductClick(product.id)}
                    >
                      <img src={product.thumbnail} alt={product.title} className={styles.searchItemImg} />
                      <div className={styles.searchItemInfo}>
                        <span className={styles.searchItemTitle}>{product.title}</span>
                        <span className={styles.searchItemPrice}>{formatPrice(priceVND)}</span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className={styles.searchFeedback}>
                  Không tìm thấy sản phẩm nào phù hợp.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Icons */}
        <div className={styles.iconSection}>
          <Link to="/wishlist" className={styles.iconLink}>
            <HeartOutlined />
          </Link>
          <Link to="/cart" className={styles.iconLink}>
            <Badge count={totalCartQty} color="#ef4444" size="small" offset={[-2, 4]}>
              <ShoppingCartOutlined style={{ fontSize: '24px', color: '#003049' }} />
            </Badge>
          </Link>
          {isAuthenticated ? (
            <Dropdown menu={{ items: userMenu }} placement="bottomRight" arrow>
              <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', color: '#0d3b66', fontWeight: 500 }}>
                <UserOutlined style={{ fontSize: '20px' }} />
                <span>Hi, {currentUser?.name}</span>
              </div>
            </Dropdown>
          ) : (
            <Link to="/login" className={styles.iconLink}>
              <UserOutlined />
            </Link>
          )}
        </div>
      </div>

      <div className={styles.bottomRow}>
        <Menu 
          mode="horizontal" 
          items={menuItems} 
          className={styles.navMenu}
          selectedKeys={[]} 
        />
      </div>
    </header>
  );
};

export default Header;