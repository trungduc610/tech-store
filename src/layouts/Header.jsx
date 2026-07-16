import React, { useState, useEffect, useRef } from 'react';
import { Input, Badge, Menu, Spin } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { SearchOutlined, HeartOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import logoImg from '../assets/images/techstore_logo.png';
import styles from './Header.module.css';

// Import Custom Hook và API Service
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

  // Áp dụng custom hook: Giá trị này chỉ thay đổi khi người dùng NGỪNG GÕ 500ms
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // 1. Logic đóng Dropdown khi click ra ngoài thanh tìm kiếm
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 2. Logic gọi API Tìm kiếm khi debouncedSearchTerm thay đổi
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (debouncedSearchTerm.trim()) {
        setIsSearching(true);
        setShowDropdown(true);
        try {
          // Gọi API tìm kiếm từ DummyJSON
          const res = await productService.searchProducts(debouncedSearchTerm);
          setSearchResults(res.products || []);
        } catch (error) {
          console.error("Lỗi khi tìm kiếm:", error);
        } finally {
          setIsSearching(false);
        }
      } else {
        // Xóa kết quả nếu ô tìm kiếm rỗng
        setSearchResults([]);
        setShowDropdown(false);
      }
    };

    fetchSearchResults();
  }, [debouncedSearchTerm]);

  // 3. Xử lý khi click vào sản phẩm trong dropdown
  const handleProductClick = (id) => {
    setSearchTerm(''); // Xóa ô input
    setShowDropdown(false); // Ẩn dropdown
    navigate(`/products/${id}`); // Chuyển hướng sang trang chi tiết
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

        {/* Thanh tìm kiếm */}
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

          {/* Khung hiển thị kết quả (Dropdown) */}
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
            <Badge count={3} color="#ef4444" size="small" offset={[-2, 4]}>
              <ShoppingCartOutlined style={{ fontSize: '24px', color: '#003049' }} />
            </Badge>
          </Link>
          <Link to="/profile" className={styles.iconLink}>
            <UserOutlined />
          </Link>
        </div>
      </div>

      {/* Hàng Menu */}
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