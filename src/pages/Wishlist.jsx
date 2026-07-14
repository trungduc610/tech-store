import React, { useState } from 'react';
import { Breadcrumb, Row, Col, Button, Rate, Typography, Tag, Empty } from 'antd';
import { Link } from 'react-router-dom';
import { FiShare2, FiShoppingCart, FiMonitor, FiSmartphone, FiHeadphones, FiCpu } from 'react-icons/fi';
import { IoCloseOutline, IoHeartOutline } from 'react-icons/io5';
import styles from './Wishlist.module.css';

const { Text } = Typography;

// --- MOCK DATA ---
const initialWishlist = [
  {
    id: 1,
    name: 'Tai nghe AirPods Pro Gen 2',
    price: 5890000,
    oldPrice: null,
    rating: 4.9,
    reviews: 128,
    img: 'https://placehold.co/200x200/f8f9fa/a0aec0?text=AirPods',
    tags: [{ text: 'CÒN HÀNG', color: 'success' }]
  },
  {
    id: 2,
    name: 'MacBook Air M3 (8GB/256GB)',
    price: 29690000,
    oldPrice: 32990000,
    rating: 5.0,
    reviews: 45,
    img: 'https://placehold.co/200x200/f8f9fa/a0aec0?text=MacBook+Air',
    tags: [{ text: 'MỚI', color: 'processing' }, { text: '-10%', color: 'error' }]
  },
  {
    id: 3,
    name: 'Sony Alpha A7 IV Body',
    price: 56490000,
    oldPrice: null,
    rating: 4.8,
    reviews: 21,
    img: 'https://placehold.co/200x200/f8f9fa/a0aec0?text=Sony+A7',
    tags: []
  },
  {
    id: 4,
    name: 'Bàn phím cơ Logitech G915 TKL',
    price: 4250000,
    oldPrice: null,
    rating: 4.7,
    reviews: 89,
    img: 'https://placehold.co/200x200/f8f9fa/a0aec0?text=Logitech',
    tags: []
  }
];

const formatPrice = (price) => new Intl.NumberFormat('vi-VN').format(price) + ' đ';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState(initialWishlist);
  // Thay đổi biến này thành true để xem màn hình lúc chưa có sản phẩm nào
  const [isEmpty, setIsEmpty] = useState(false); 

  const handleRemove = (id) => {
    const newItems = wishlistItems.filter(item => item.id !== id);
    setWishlistItems(newItems);
    if (newItems.length === 0) setIsEmpty(true);
  };

  // Nếu danh sách trống
  if (isEmpty) {
    return (
      <div className={styles.wishlistContainer}>
        <div className={styles.emptyStateWrapper}>
          <IoHeartOutline size={120} color="#e5e7eb" style={{ strokeDasharray: '4 4' }} />
          <h2 className={styles.emptyTitle}>Danh sách yêu thích của bạn đang trống</h2>
          <p className={styles.emptyDesc}>Hãy thêm những sản phẩm bạn yêu thích để dễ dàng mua sắm sau này</p>
          <Link to="/products">
            <Button type="primary" size="large" style={{ background: '#0d3b66', padding: '0 40px', height: '48px' }}>
              Tiếp tục mua sắm
            </Button>
          </Link>

          {/* Các nút danh mục nhỏ bên dưới Empty State */}
          <div style={{ marginTop: '60px', display: 'flex', gap: '20px' }}>
             <Button icon={<FiMonitor />} style={{ width: '120px', height: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>Laptop</Button>
             <Button icon={<FiSmartphone />} style={{ width: '120px', height: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>Điện thoại</Button>
             <Button icon={<FiHeadphones />} style={{ width: '120px', height: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>Phụ kiện</Button>
             <Button icon={<FiCpu />} style={{ width: '120px', height: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>Linh kiện</Button>
          </div>
        </div>
      </div>
    );
  }

  // Nếu có sản phẩm
  return (
    <div className={styles.wishlistContainer}>
      <Breadcrumb className={styles.breadcrumb}
        items={[
          { title: <Link to="/">Trang chủ</Link> },
          { title: <strong>Danh sách yêu thích</strong> },
        ]}
      />

      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Danh sách yêu thích của tôi <span style={{ color: '#6b7280', fontSize: '24px', fontWeight: 'normal' }}>({wishlistItems.length})</span></h1>
        <div className={styles.headerActions}>
          <Button icon={<FiShare2 />}>Chia sẻ</Button>
          <Button type="primary" icon={<FiShoppingCart />} style={{ background: '#0d3b66' }}>Mua tất cả</Button>
        </div>
      </div>

      <Row gutter={[24, 24]}>
        {wishlistItems.map((item) => (
          <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
            <div className={styles.wishlistCard}>
              <button className={styles.removeBtn} onClick={() => handleRemove(item.id)}>
                <IoCloseOutline />
              </button>
              
              <div className={styles.imageWrapper}>
                <img src={item.img} alt={item.name} className={styles.productImage} />
                <div className={styles.tagsWrapper}>
                  {item.tags.map((tag, index) => (
                    <Tag color={tag.color} key={index} style={{ margin: 0, fontWeight: 600 }}>{tag.text}</Tag>
                  ))}
                </div>
              </div>

              <div className={styles.cardBody}>
                <Text ellipsis={{ tooltip: item.name }} className={styles.productName}>{item.name}</Text>
                
                <div className={styles.ratingRow}>
                  <Rate disabled defaultValue={item.rating} style={{ fontSize: '12px', color: '#fadb14' }} />
                  <span>{item.rating}</span>
                  <span>({item.reviews} đánh giá)</span>
                </div>

                <div className={styles.priceWrapper}>
                  {item.oldPrice && <span className={styles.oldPrice}>{formatPrice(item.oldPrice)}</span>}
                  <div className={styles.currentPrice}>{formatPrice(item.price)}</div>
                </div>

                <Button type="primary" icon={<FiShoppingCart />} className={styles.moveToCartBtn}>
                  Chuyển vào giỏ
                </Button>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Wishlist;