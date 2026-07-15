import React, { useState, useEffect } from 'react';
import { Row, Col, Checkbox, Slider, Button, Select, Pagination, Card, Tag, Typography, Rate, Space, Spin, Alert, Skeleton } from 'antd';
import { FiFilter } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import productService from '../api/productService'; // Import service đã tạo ở Ngày 8
import styles from './ProductList.module.css';

const { Title, Text } = Typography;

const formatPrice = (price) => new Intl.NumberFormat('vi-VN').format(price) + 'đ';

const ProductList = () => {
  // 1. KHỞI TẠO STATE
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0); // Tổng số sản phẩm API trả về
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. GỌI API KHI COMPONENT MOUNT
  useEffect(() => {
    const fetchTechProducts = async () => {
      try {
        setLoading(true);
        
        // Gọi song song 4 API lấy điện thoại, laptop, phụ kiện và máy tính bảng
        const [phoneRes, laptopRes, accessoryRes, tabletRes] = await Promise.all([
          productService.getProductsByCategory('smartphones'),
          productService.getProductsByCategory('laptops'),
          productService.getProductsByCategory('mobile-accessories'),
          productService.getProductsByCategory('tablets')
        ]);
        
        // Gộp tất cả các mảng sản phẩm lại với nhau
        // Thêm dấu ? (Optional Chaining) hoặc điều kiện phụ để phòng hờ API trả về rỗng
        const combinedProducts = [
          ...(phoneRes.products || []), 
          ...(laptopRes.products || []),
          ...(accessoryRes.products || []),
          ...(tabletRes.products || [])
        ];
        
        setProducts(combinedProducts);
        setTotal(combinedProducts.length);
        setError(null);
      } catch (err) {
        setError('Không thể tải danh sách sản phẩm. Vui lòng kiểm tra lại kết nối mạng!');
      } finally {
        setLoading(false);
      }
    };

    fetchTechProducts();
  }, []);

  return (
    <div className={styles.listContainer}>
      <Row gutter={24}>
        
        {/* ================= CỘT TRÁI: BỘ LỌC (GIỮ NGUYÊN) ================= */}
        <Col span={6}>
          <div className={styles.sidebar}>
            <div className={styles.filterHeader}>
              <FiFilter /> Bộ lọc
            </div>

            <div className={styles.filterSection}>
              <div className={styles.filterTitle}>Danh mục sản phẩm</div>
              <Space direction="vertical">
                <Checkbox>Laptop</Checkbox>
                <Checkbox defaultChecked>Điện thoại</Checkbox>
                <Checkbox>Phụ kiện</Checkbox>
                <Checkbox>Linh kiện</Checkbox>
              </Space>
            </div>

            <div className={styles.filterSection}>
              <div className={styles.filterTitle}>Khoảng giá (VNĐ)</div>
              <Slider range defaultValue={[0, 100]} />
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6b7280', fontSize: '13px' }}>
                <span>0đ</span>
                <span>100tr+</span>
              </div>
            </div>

            <div className={styles.filterSection}>
              <div className={styles.filterTitle}>Thương hiệu</div>
              <div className={styles.brandGrid}>
                <Button>Apple</Button>
                <Button>Samsung</Button>
                <Button>Dell</Button>
                <Button>Asus</Button>
              </div>
            </div>

            <div className={styles.filterSection}>
              <div className={styles.filterTitle}>Đánh giá</div>
              <Space direction="vertical">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Rate disabled defaultValue={5} style={{ fontSize: '14px', color: '#fadb14' }} />
                  <span style={{ fontSize: '13px', color: '#6b7280' }}>từ 5 sao</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Rate disabled defaultValue={4} style={{ fontSize: '14px', color: '#fadb14' }} />
                  <span style={{ fontSize: '13px', color: '#6b7280' }}>từ 4 sao</span>
                </div>
              </Space>
            </div>
          </div>
        </Col>

        {/* ================= CỘT PHẢI: DANH SÁCH SẢN PHẨM ================= */}
        <Col span={18}>
          
          <div className={styles.topBar}>
            <div>
              Tìm thấy <strong style={{ color: '#0d3b66' }}>{loading ? '...' : total}</strong> sản phẩm
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#6b7280' }}>Sắp xếp theo:</span>
              <Select 
                defaultValue="banchay" 
                style={{ width: 150 }}
                options={[
                  { value: 'banchay', label: 'Bán chạy nhất' },
                  { value: 'giathap', label: 'Giá thấp đến cao' },
                  { value: 'giacao', label: 'Giá cao đến thấp' },
                ]}
              />
            </div>
          </div>

          {/* 3. XỬ LÝ RENDER THEO TRẠNG THÁI LOADING / ERROR / SUCCESS */}
          {loading ? (
            // Trạng thái Loading bằng Skeleton Grid
            <Row gutter={[20, 20]}>
              {/* Tạo một mảng 16 phần tử rỗng để lặp ra 16 cái Card Skeleton */}
              {Array.from({ length: 16 }).map((_, index) => (
                <Col span={6} key={index}>
                  <Card
                    className={styles.productCard}
                    bodyStyle={{ padding: '16px', display: 'flex', flexDirection: 'column', height: '100%' }}
                    cover={
                      <div style={{ padding: '20px', display: 'flex', justifyContent: 'center', background: '#f9fafb', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}>
                        {/* Ảnh giả */}
                        <Skeleton.Image active style={{ width: '160px', height: '140px' }} />
                      </div>
                    }
                  >
                    {/* Tiêu đề giả (1 dòng) */}
                    <Skeleton active paragraph={{ rows: 0 }} style={{ marginBottom: '12px' }} />
                    
                    {/* Giá tiền và Rating giả (2 dòng ngắn) */}
                    <Skeleton active paragraph={{ rows: 1 }} title={false} style={{ marginBottom: '20px' }} />
                    
                    {/* Nút "Thêm vào giỏ" giả */}
                    <div style={{ marginTop: 'auto' }}>
                      <Skeleton.Button active block shape="round" style={{ height: '32px' }} />
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : error ? (
            // Trạng thái Error
            <Alert 
              message="Đã xảy ra lỗi" 
              description={error} 
              type="error" 
              showIcon 
              style={{ margin: '20px 0' }}
            />
          ) : (
            // Trạng thái có Dữ liệu
            <>
              <Row gutter={[20, 20]}>
                {products.map((prod) => {
                  // Giả lập giá VNĐ bằng cách nhân giá USD của DummyJSON với 25.000
                  const priceVND = Math.round(prod.price * 25000);

                  return (
                    <Col span={6} key={prod.id}>
                      <Card
                        hoverable
                        className={styles.productCard}
                        bodyStyle={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}
                        cover={
                          <div style={{ padding: '20px', position: 'relative', background: '#fff', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}>
                            {/* Dùng discountPercentage của API để làm Tag giảm giá */}
                            {prod.discountPercentage > 10 && (
                              <Tag color="error" style={{ position: 'absolute', top: 12, left: 12, margin: 0, fontWeight: 500 }}>
                                Giảm {Math.round(prod.discountPercentage)}%
                              </Tag>
                            )}
                            {/* Dùng prod.thumbnail từ API */}
                            <img alt={prod.title} src={prod.thumbnail} style={{ width: '100%', height: '140px', objectFit: 'contain' }} />
                          </div>
                        }
                      >
                        <Link to={`/products/${prod.id}`}>
                          <Text ellipsis={{ tooltip: prod.title }} style={{ fontSize: '14px', fontWeight: 500, color: '#374151', cursor: 'pointer' }}>
                            {prod.title}
                          </Text>
                        </Link>
                        
                        <div className={styles.priceText}>
                          {formatPrice(priceVND)}
                        </div>
                        
                        <div className={styles.ratingContainer}>
                          <Rate disabled defaultValue={Math.round(prod.rating)} style={{ fontSize: '12px', color: '#fadb14' }} />
                          <span>{prod.rating}</span>
                          <span>({prod.reviews ? prod.reviews.length : Math.floor(Math.random() * 100 + 10)})</span>
                        </div>

                        <div style={{ marginTop: 'auto' }}>
                          <Button type="primary" className={styles.addToCartBtn}>
                            Thêm vào giỏ
                          </Button>
                        </div>
                      </Card>
                    </Col>
                  );
                })}
              </Row>

              <div className={styles.paginationWrapper}>
                <Pagination 
                  defaultCurrent={1} 
                  total={total} 
                  pageSize={16} 
                  showSizeChanger={false} 
                />
              </div>
            </>
          )}

        </Col>
      </Row>
    </div>
  );
};

export default ProductList;