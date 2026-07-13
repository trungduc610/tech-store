import React from 'react';
import { Carousel, Row, Col, Card, Button, Typography, Rate, Badge } from 'antd';
import { Link } from 'react-router-dom';
import { 
  FiMonitor, FiSmartphone, FiHeadphones, FiCpu, 
  FiShield, FiTruck, FiClock, FiRefreshCw 
} from 'react-icons/fi';
import styles from './Home.module.css';

const { Title, Text } = Typography;

// --- MOCK DATA ---
const categories = [
  { id: 1, title: 'Laptop', count: '120+', icon: <FiMonitor className={styles.categoryIcon} /> },
  { id: 2, title: 'Điện thoại', count: '85+', icon: <FiSmartphone className={styles.categoryIcon} /> },
  { id: 3, title: 'Phụ kiện', count: '450+', icon: <FiHeadphones className={styles.categoryIcon} /> },
  { id: 4, title: 'Linh kiện', count: '210+', icon: <FiCpu className={styles.categoryIcon} /> },
];

const bestSellers = [
  { id: 1, name: 'Điện thoại iPhone 16 Pro Max 256GB', price: '29.990.000 đ', rating: 5.0, isNew: true, img: 'https://placehold.co/400x300/f8f9fa/a0aec0?text=iPhone+15' },
  { id: 2, name: 'Laptop MacBook Air M2 13 inch', price: '24.500.000 đ', rating: 4.8, isNew: false, img: 'https://placehold.co/400x300/f8f9fa/a0aec0?text=MacBook+Air' },
  { id: 3, name: 'Tai nghe AirPods Pro Gen 2', price: '5.890.000 đ', rating: 4.9, isNew: false, img: 'https://placehold.co/400x300/f8f9fa/a0aec0?text=AirPods' },
  { id: 4, name: 'Chuột Logitech MX Master 3S', price: '2.350.000 đ', rating: 5.0, isNew: false, img: 'https://placehold.co/400x300/f8f9fa/a0aec0?text=Logitech+Mouse' },
];

const policies = [
  { title: 'Hàng chính hãng', desc: 'Cam kết 100%', icon: <FiShield size={30} color="#0d3b66" /> },
  { title: 'Giao hàng nhanh', desc: 'Nội thành trong 2h', icon: <FiTruck size={30} color="#0d3b66" /> },
  { title: 'Hỗ trợ 24/7', desc: 'Tư vấn tận tâm', icon: <FiClock size={30} color="#0d3b66" /> },
  { title: 'Đổi trả 30 ngày', desc: 'Nếu lỗi từ nhà SX', icon: <FiRefreshCw size={30} color="#0d3b66" /> },
];

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      
      {/* 1. HERO BANNER */}
      <Carousel autoplay>
        <div>
          <div className={styles.bannerWrapper}>
            <div className={styles.bannerContent}>
              <span className={styles.bannerTag}>KHUYẾN MÃI CỰC HOT</span>
              <h1 className={styles.bannerTitle}>Siêu phẩm Laptop<br/>AI mới - Giảm ngay<br/>5 triệu</h1>
              <p className={styles.bannerDesc}>Trải nghiệm sức mạnh trí tuệ nhân tạo, thiết kế đẳng cấp cho giới chuyên gia.</p>
              <Button type="primary" size="large" style={{ background: '#fff', color: '#0d3b66', fontWeight: 'bold' }}>
                Mua Ngay
              </Button>
            </div>
            {/* Ảnh placeholder cho Laptop trong banner */}
            <img src="https://placehold.co/500x300/transparent/white?text=Laptop+AI+Image" alt="Banner" style={{ zIndex: 1 }} />
          </div>
        </div>
        {/* Bạn có thể copy khối <div> bọc .bannerWrapper ở trên thêm 1-2 lần để làm slide thứ 2, thứ 3 */}
      </Carousel>

      {/* 2. DANH MỤC NỔI BẬT */}
      <section>
        <Title level={3} style={{ color: '#0d3b66' }}>Danh mục nổi bật</Title>
        <Row gutter={[24, 24]}>
          {categories.map((cat) => (
            <Col xs={12} sm={12} md={6} key={cat.id}>
              <Card hoverable className={styles.customCard} bodyStyle={{ textAlign: 'center', padding: '30px 20px' }}>
                {cat.icon}
                <Title level={5} style={{ margin: '10px 0 5px' }}>{cat.title}</Title>
                <Text type="secondary">{cat.count} Sản phẩm</Text>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* 3. SẢN PHẨM BÁN CHẠY */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <Title level={3} style={{ color: '#0d3b66', margin: 0 }}>Sản phẩm bán chạy</Title>
          <Link to="/products" style={{ fontWeight: 500 }}>Xem tất cả</Link>
        </div>
        <Row gutter={[24, 24]}>
          {bestSellers.map((prod) => (
            <Col xs={24} sm={12} md={6} key={prod.id}>
              <Badge.Ribbon text="Mới" color="#02c39a" style={{ display: prod.isNew ? 'block' : 'none' }}>
                <Card
                  hoverable
                  className={styles.customCard}
                  cover={<img alt={prod.name} src={prod.img} style={{ padding: '20px', height: '220px', objectFit: 'contain' }} />}
                >
                  <Card.Meta 
                    title={<Text ellipsis title={prod.name}>{prod.name}</Text>}
                  />
                  <div style={{ marginTop: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <Rate disabled defaultValue={prod.rating} style={{ fontSize: '12px', color: '#fadb14' }} />
                      <Text type="secondary" style={{ fontSize: '12px' }}>{prod.rating}</Text>
                    </div>
                    <Title level={4} style={{ color: '#0d3b66', margin: 0 }}>{prod.price}</Title>
                  </div>
                </Card>
              </Badge.Ribbon>
            </Col>
          ))}
        </Row>
      </section>

      {/* 4. CHÍNH SÁCH BÁN HÀNG */}
      <section className={styles.policySection}>
        <Row gutter={[16, 16]}>
          {policies.map((policy, index) => (
            <Col xs={12} md={6} key={index}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {policy.icon}
                <div>
                  <div style={{ fontWeight: 'bold', color: '#0d3b66' }}>{policy.title}</div>
                  <Text type="secondary" style={{ fontSize: '12px' }}>{policy.desc}</Text>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </section>

    </div>
  );
};

export default Home;