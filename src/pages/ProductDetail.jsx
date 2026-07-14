import React, { useState } from 'react';
import { Breadcrumb, Row, Col, Rate, Tag, Button, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import { FiCheckCircle, FiShoppingCart, FiShield, FiTruck } from 'react-icons/fi';
import styles from './ProductDetail.module.css';

// --- MOCK DATA ---
const product = {
  id: 1,
  name: 'Laptop Asus ROG Strix G16',
  currentPrice: 34490000,
  oldPrice: 38990000,
  rating: 4.5,
  reviews: 120,
  status: 'Còn hàng',
  shortDesc: [
    'Chip Intel Core i7-13650HX thế hệ 13 mới nhất',
    'Card đồ họa NVIDIA GeForce RTX 4060 8GB GDDR6',
    'Màn hình 16 inch QHD+ (2560 x 1600) 165Hz, 100% sRGB',
    'Hệ thống tản nhiệt ROG Intelligent Cooling tiên tiến'
  ],
  images: [
    'https://placehold.co/800x600/f8f9fa/a0aec0?text=Asus+ROG+1',
    'https://placehold.co/800x600/f8f9fa/a0aec0?text=Asus+ROG+2',
    'https://placehold.co/800x600/f8f9fa/a0aec0?text=Asus+ROG+3',
    'https://placehold.co/800x600/f8f9fa/a0aec0?text=Asus+ROG+4'
  ],
  specs: [
    { label: 'CPU', value: 'Intel Core i7-13650HX (14 nhân, 20 luồng, up to 4.90GHz)' },
    { label: 'RAM', value: '16GB DDR5-4800MHz (Hỗ trợ nâng cấp tối đa 64GB)' },
    { label: 'Ổ cứng', value: '512GB SSD PCIe 4.0 NVMe M.2' },
    { label: 'Màn hình', value: '16-inch QHD+ (2560 x 1600) IPS, 165Hz, 100% sRGB, G-Sync' },
    { label: 'Đồ họa', value: 'NVIDIA GeForce RTX 4060 8GB GDDR6 (TGP 140W)' },
    { label: 'Cổng kết nối', value: '1x Thunderbolt 4, 1x USB 3.2 Gen 2 Type-C, 2x USB 3.2 Gen 2 Type-A, 1x HDMI 2.1, 1x RJ45' },
    { label: 'Trọng lượng', value: '2.50 kg' }
  ]
};

const formatPrice = (price) => new Intl.NumberFormat('vi-VN').format(price) + ' đ';

const ProductDetail = () => {
  // State quản lý ảnh đang hiển thị
  const [activeImage, setActiveImage] = useState(product.images[0]);
  // State quản lý số lượng
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  // Nội dung Tab Thông số kỹ thuật
  const SpecsTabContent = () => (
    <table className={styles.specTable}>
      <tbody>
        {product.specs.map((spec, index) => (
          <tr key={index}>
            <td>{spec.label}</td>
            <td>{spec.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className={styles.detailContainer}>
      
      {/* 1. BREADCRUMB */}
      <Breadcrumb className={styles.breadcrumb}
        items={[
          { title: <Link to="/">Trang chủ</Link> },
          { title: <Link to="/products">Laptop</Link> },
          { title: <strong>{product.name}</strong> },
        ]}
      />

      <Row gutter={40}>
        {/* ================= CỘT TRÁI: THƯ VIỆN ẢNH ================= */}
        <Col xs={24} md={10}>
          {/* Ảnh chính */}
          <div className={styles.mainImageWrapper}>
            <img src={activeImage} alt={product.name} className={styles.mainImage} />
          </div>
          
          {/* Danh sách ảnh thu nhỏ */}
          <div className={styles.thumbnailList}>
            {product.images.map((img, index) => (
              <img 
                key={index} 
                src={img} 
                alt={`Thumbnail ${index}`} 
                className={`${styles.thumbnail} ${activeImage === img ? styles.thumbnailActive : ''}`}
                onMouseEnter={() => setActiveImage(img)} // Đổi ảnh khi hover hoặc click
                onClick={() => setActiveImage(img)}
              />
            ))}
          </div>
        </Col>

        {/* ================= CỘT PHẢI: THÔNG TIN SẢN PHẨM ================= */}
        <Col xs={24} md={14}>
          <h1 className={styles.title}>{product.name}</h1>
          
          {/* Đánh giá & Tình trạng */}
          <div className={styles.ratingRow}>
            <Rate disabled defaultValue={product.rating} style={{ color: '#fadb14', fontSize: '14px' }} />
            <span style={{ color: '#6b7280', fontSize: '14px' }}>({product.reviews} đánh giá) |</span>
            <Tag color="success" style={{ margin: 0 }}>{product.status}</Tag>
          </div>

          {/* Giá */}
          <div className={styles.priceBox}>
            <div className={styles.currentPrice}>{formatPrice(product.currentPrice)}</div>
            <div className={styles.oldPrice}>{formatPrice(product.oldPrice)}</div>
          </div>

          {/* Box Mô tả ngắn */}
          <div className={styles.shortDescBox}>
            <div className={styles.shortDescTitle}>Mô tả ngắn</div>
            {product.shortDesc.map((desc, index) => (
              <div key={index} className={styles.descItem}>
                <FiCheckCircle color="#02c39a" size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{desc}</span>
              </div>
            ))}
          </div>

          {/* Chọn số lượng */}
          <div className={styles.qtyWrapper}>
            <span style={{ fontWeight: 600, color: '#374151', textTransform: 'uppercase', fontSize: '13px' }}>Số lượng:</span>
            <div className={styles.qtySelector}>
              <button className={styles.qtyBtn} onClick={handleDecrease}>-</button>
              <input type="text" value={quantity} readOnly className={styles.qtyInput} />
              <button className={styles.qtyBtn} onClick={handleIncrease}>+</button>
            </div>
          </div>

          {/* Nút hành động */}
          <div className={styles.actionBtns}>
            <Button className={styles.addToCartBtn} icon={<FiShoppingCart />}>
              Thêm vào giỏ hàng
            </Button>
            <Button type="primary" className={styles.buyNowBtn}>
              Mua ngay
            </Button>
          </div>

          {/* Cam kết */}
          <div className={styles.guarantees}>
            <div className={styles.guaranteeItem}>
              <FiShield size={18} color="#0d3b66" />
              <span>Bảo hành 24 tháng chính hãng</span>
            </div>
            <div className={styles.guaranteeItem}>
              <FiTruck size={18} color="#0d3b66" />
              <span>Giao hàng miễn phí toàn quốc</span>
            </div>
          </div>
        </Col>
      </Row>

      {/* ================= PHẦN TAB THÔNG TIN BÊN DƯỚI ================= */}
      <div style={{ marginTop: '60px' }}>
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              key: '1',
              label: <span style={{ fontSize: '16px', fontWeight: 500 }}>Thông số kỹ thuật</span>,
              children: <SpecsTabContent />,
            },
            {
              key: '2',
              label: <span style={{ fontSize: '16px', fontWeight: 500 }}>Đánh giá từ khách hàng</span>,
              children: <div style={{ padding: '20px', color: '#6b7280' }}>Chưa có đánh giá nào cho sản phẩm này.</div>,
            },
          ]}
        />
      </div>

    </div>
  );
};

export default ProductDetail;