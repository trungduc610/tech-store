import React, { useState, useEffect } from 'react';
import { Breadcrumb, Row, Col, Rate, Tag, Button, Tabs, Spin, Alert } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { FiCheckCircle, FiShoppingCart, FiShield, FiTruck } from 'react-icons/fi';
import productService from '../api/productService';
import styles from './ProductDetail.module.css';

const formatPrice = (price) => new Intl.NumberFormat('vi-VN').format(price) + ' đ';

const ProductDetail = () => {
  const { id } = useParams(); // Lấy ID sản phẩm từ URL
  
  // Các state quản lý dữ liệu API
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Các state quản lý UI
  const [activeImage, setActiveImage] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        setLoading(true);
        const data = await productService.getProductById(id);
        
        setProduct(data);
        setActiveImage(data.images[0]); 
        setError(null);
      } catch (err) {
        setError('Không thể tải thông tin chi tiết sản phẩm. Vui lòng kiểm tra lại!');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductDetail();
    }
  }, [id]);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <Spin size="large" tip="Đang tải chi tiết sản phẩm..." />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className={styles.detailContainer}>
        <Alert message="Lỗi tải trang" description={error || 'Sản phẩm không tồn tại'} type="error" showIcon style={{ margin: '40px 0' }} />
        <Link to="/products"><Button type="primary">Quay lại danh sách</Button></Link>
      </div>
    );
  }

  const currentPriceVND = Math.round(product.price * 25000);
  const oldPriceVND = Math.round(currentPriceVND / (1 - product.discountPercentage / 100));
  
  const specs = [
    { label: 'Thương hiệu', value: product.brand || 'Đang cập nhật' },
    { label: 'Danh mục', value: product.category },
    { label: 'Trọng lượng', value: `${product.weight} gram` },
    { label: 'Kích thước', value: `${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth} cm` },
    { label: 'Bảo hành', value: product.warrantyInformation },
    { label: 'Vận chuyển', value: product.shippingInformation },
    { label: 'Chính sách đổi trả', value: product.returnPolicy }
  ];

  const SpecsTabContent = () => (
    <table className={styles.specTable}>
      <tbody>
        {specs.map((spec, index) => (
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
          { title: <Link to="/products">Sản phẩm</Link> },
          { title: <strong>{product.title}</strong> },
        ]}
      />

      <Row gutter={40}>
        <Col xs={24} md={10}>
          <div className={styles.mainImageWrapper}>
            <img src={activeImage} alt={product.title} className={styles.mainImage} />
          </div>
          
          <div className={styles.thumbnailList}>
            {product.images.map((img, index) => (
              <img 
                key={index} 
                src={img} 
                alt={`Thumbnail ${index}`} 
                className={`${styles.thumbnail} ${activeImage === img ? styles.thumbnailActive : ''}`}
                onMouseEnter={() => setActiveImage(img)}
                onClick={() => setActiveImage(img)}
              />
            ))}
          </div>
        </Col>

        <Col xs={24} md={14}>
          <h1 className={styles.title}>{product.title}</h1>
          
          <div className={styles.ratingRow}>
            <Rate disabled defaultValue={Math.round(product.rating)} style={{ color: '#fadb14', fontSize: '14px' }} />
            <span style={{ color: '#6b7280', fontSize: '14px' }}>
              ({product.reviews ? product.reviews.length : 0} đánh giá) |
            </span>
            <Tag color={product.stock > 0 ? "success" : "error"} style={{ margin: 0 }}>
              {product.stock > 0 ? `Còn ${product.stock} sản phẩm` : 'Hết hàng'}
            </Tag>
          </div>

          <div className={styles.priceBox}>
            <div className={styles.currentPrice}>{formatPrice(currentPriceVND)}</div>
            {product.discountPercentage > 0 && (
              <div className={styles.oldPrice}>{formatPrice(oldPriceVND)}</div>
            )}
          </div>

          <div className={styles.shortDescBox}>
            <div className={styles.shortDescTitle}>Mô tả ngắn</div>
            <div className={styles.descItem}>
              <FiCheckCircle color="#02c39a" size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>{product.description}</span>
            </div>
            {/* Lấy thông tin tags từ API để làm mô tả ngắn thêm phong phú */}
            {product.tags && product.tags.map((tag, idx) => (
              <div key={idx} className={styles.descItem}>
                <FiCheckCircle color="#02c39a" size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ textTransform: 'capitalize' }}>Nổi bật: {tag}</span>
              </div>
            ))}
          </div>

          <div className={styles.qtyWrapper}>
            <span style={{ fontWeight: 600, color: '#374151', textTransform: 'uppercase', fontSize: '13px' }}>Số lượng:</span>
            <div className={styles.qtySelector}>
              <button className={styles.qtyBtn} onClick={handleDecrease}>-</button>
              <input type="text" value={quantity} readOnly className={styles.qtyInput} />
              <button className={styles.qtyBtn} onClick={handleIncrease} disabled={quantity >= product.stock}>+</button>
            </div>
          </div>

          <div className={styles.actionBtns}>
            <Button className={styles.addToCartBtn} icon={<FiShoppingCart />} disabled={product.stock === 0}>
              Thêm vào giỏ hàng
            </Button>
            <Button type="primary" className={styles.buyNowBtn} disabled={product.stock === 0}>
              Mua ngay
            </Button>
          </div>

          <div className={styles.guarantees}>
            <div className={styles.guaranteeItem}>
              <FiShield size={18} color="#0d3b66" />
              <span>{product.warrantyInformation || 'Bảo hành chính hãng'}</span>
            </div>
            <div className={styles.guaranteeItem}>
              <FiTruck size={18} color="#0d3b66" />
              <span>{product.shippingInformation || 'Giao hàng toàn quốc'}</span>
            </div>
          </div>
        </Col>
      </Row>

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
              children: (
                <div style={{ padding: '20px' }}>
                  {product.reviews && product.reviews.length > 0 ? (
                    product.reviews.map((review, idx) => (
                      <div key={idx} style={{ marginBottom: '20px', borderBottom: '1px solid #f0f0f0', paddingBottom: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                          <strong>{review.reviewerName}</strong>
                          <Rate disabled defaultValue={review.rating} style={{ fontSize: '12px', color: '#fadb14' }} />
                        </div>
                        <p style={{ color: '#4b5563', margin: 0 }}>{review.comment}</p>
                        <span style={{ fontSize: '12px', color: '#9ca3af' }}>
                          {new Date(review.date).toLocaleDateString('vi-VN')}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div style={{ color: '#6b7280' }}>Chưa có đánh giá nào cho sản phẩm này.</div>
                  )}
                </div>
              ),
            },
          ]}
        />
      </div>

    </div>
  );
};

export default ProductDetail;