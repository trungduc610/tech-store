import React from 'react';
import { Row, Col, Checkbox, Slider, Button, Select, Pagination, Card, Tag, Typography, Rate, Space } from 'antd';
import { FiFilter } from 'react-icons/fi';
import styles from './ProductList.module.css';

const { Title, Text } = Typography;

// --- MOCK DATA ---
const mockProducts = [
  { id: 1, name: 'iPhone 15 Pro Max 256GB Titanium', price: 32990000, rating: 4.9, reviews: 128, tag: 'Còn hàng', tagColor: 'success', img: 'https://placehold.co/200x200/f8f9fa/a0aec0?text=iPhone' },
  { id: 2, name: 'MacBook Air M2 8GB 256GB 2023', price: 26490000, rating: 5.0, reviews: 85, tag: 'Giảm 10%', tagColor: 'error', img: 'https://placehold.co/200x200/f8f9fa/a0aec0?text=MacBook' },
  { id: 3, name: 'Sony WH-1000XM5 Noise Cancelling', price: 8490000, rating: 4.8, reviews: 210, tag: null, tagColor: '', img: 'https://placehold.co/200x200/f8f9fa/a0aec0?text=Sony+WH' },
  { id: 4, name: 'Chuột Logitech MX Master 3S Wireless', price: 2490000, rating: 4.9, reviews: 450, tag: null, tagColor: '', img: 'https://placehold.co/200x200/f8f9fa/a0aec0?text=Mouse' },
  { id: 5, name: 'Laptop Gaming Gigabyte AORUS 16GB RAM', price: 28990000, rating: 4.7, reviews: 56, tag: 'Mới', tagColor: 'processing', img: 'https://placehold.co/200x200/f8f9fa/a0aec0?text=Gigabyte' },
  { id: 6, name: 'Samsung Galaxy S24 Ultra 512GB', price: 33990000, rating: 4.9, reviews: 204, tag: 'Còn hàng', tagColor: 'success', img: 'https://placehold.co/200x200/f8f9fa/a0aec0?text=Samsung' },
  { id: 7, name: 'Bàn phím cơ Keychron K8 Pro', price: 2190000, rating: 4.6, reviews: 92, tag: null, tagColor: '', img: 'https://placehold.co/200x200/f8f9fa/a0aec0?text=Keyboard' },
  { id: 8, name: 'Màn hình Dell UltraSharp 27 inch 4K', price: 12590000, rating: 4.8, reviews: 77, tag: 'Giảm 5%', tagColor: 'error', img: 'https://placehold.co/200x200/f8f9fa/a0aec0?text=Monitor' },
];

const formatPrice = (price) => new Intl.NumberFormat('vi-VN').format(price) + 'đ';

const ProductList = () => {
  return (
    <div className={styles.listContainer}>
      <Row gutter={24}>
        
        {/* ================= CỘT TRÁI: BỘ LỌC ================= */}
        <Col span={6}>
          <div className={styles.sidebar}>
            <div className={styles.filterHeader}>
              <FiFilter /> Bộ lọc
            </div>

            {/* Danh mục */}
            <div className={styles.filterSection}>
              <div className={styles.filterTitle}>Danh mục sản phẩm</div>
              <Space direction="vertical">
                <Checkbox>Laptop</Checkbox>
                <Checkbox defaultChecked>Điện thoại</Checkbox>
                <Checkbox>Phụ kiện</Checkbox>
                <Checkbox>Linh kiện</Checkbox>
              </Space>
            </div>

            {/* Khoảng giá */}
            <div className={styles.filterSection}>
              <div className={styles.filterTitle}>Khoảng giá (VNĐ)</div>
              <Slider range defaultValue={[0, 100]} />
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6b7280', fontSize: '13px' }}>
                <span>0đ</span>
                <span>100tr+</span>
              </div>
            </div>

            {/* Thương hiệu */}
            <div className={styles.filterSection}>
              <div className={styles.filterTitle}>Thương hiệu</div>
              <div className={styles.brandGrid}>
                <Button>Apple</Button>
                <Button>Samsung</Button>
                <Button>Dell</Button>
                <Button>Asus</Button>
              </div>
            </div>

            {/* Đánh giá */}
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
          
          {/* Top Bar */}
          <div className={styles.topBar}>
            <div>
              Tìm thấy <strong style={{ color: '#0d3b66' }}>120</strong> sản phẩm
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

          {/* Product Grid */}
          <Row gutter={[20, 20]}>
            {mockProducts.map((prod) => (
              /* Dùng span=6 để chia 4 cột trong khoảng trống 18 cột (24/6 = 4) */
              <Col span={6} key={prod.id}>
                <Card
                  hoverable
                  className={styles.productCard}
                  bodyStyle={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}
                  cover={
                    <div style={{ padding: '20px', position: 'relative', background: '#fff', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}>
                      {prod.tag && (
                        <Tag color={prod.tagColor} style={{ position: 'absolute', top: 12, left: 12, margin: 0, fontWeight: 500 }}>
                          {prod.tag}
                        </Tag>
                      )}
                      <img alt={prod.name} src={prod.img} style={{ width: '100%', height: '140px', objectFit: 'contain' }} />
                    </div>
                  }
                >
                  <Text ellipsis={{ tooltip: prod.name }} style={{ fontSize: '14px', fontWeight: 500, color: '#374151' }}>
                    {prod.name}
                  </Text>
                  
                  <div className={styles.priceText}>
                    {formatPrice(prod.price)}
                  </div>
                  
                  <div className={styles.ratingContainer}>
                    <Rate disabled defaultValue={prod.rating} style={{ fontSize: '12px', color: '#fadb14' }} />
                    <span>{prod.rating}</span>
                    <span>({prod.reviews})</span>
                  </div>

                  {/* Nút được đẩy xuống đáy card bằng flex-grow tự động */}
                  <div style={{ marginTop: 'auto' }}>
                    <Button type="primary" className={styles.addToCartBtn}>
                      Thêm vào giỏ
                    </Button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Pagination */}
          <div className={styles.paginationWrapper}>
            <Pagination defaultCurrent={1} total={120} pageSize={16} showSizeChanger={false} />
          </div>

        </Col>
      </Row>
    </div>
  );
};

export default ProductList;