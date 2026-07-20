import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { 
  HomeOutlined, 
  CustomerServiceOutlined, 
  ProfileOutlined, 
  EnvironmentOutlined 
} from '@ant-design/icons';
import styles from './NotFound.module.css';
import notfound from '../assets/images/not_found.png'

const NotFound = () => {
  return (
    <div className={styles.notFoundContainer}>
      {/* Khối Hình ảnh */}
      <div className={styles.imageWrapper}>
        <img
          src={notfound}
          alt="404 Not Found"
          className={styles.robotImg}
        />
      </div>

      {/* Khối Văn bản */}
      <h1 className={styles.title}>Rất tiếc! Trang không tồn tại</h1>
      <p className={styles.description}>
        Đường dẫn bạn truy cập có thể đã bị lỗi hoặc đã được di chuyển.<br />
        Đừng lo lắng, chúng tôi sẽ giúp bạn quay lại đúng hướng.
      </p>

      {/* Nút Quay về */}
      <Link to="/">
        <Button type="primary" icon={<HomeOutlined />} className={styles.homeBtn}>
          Quay về Trang Chủ
        </Button>
      </Link>

      {/* Khối Liên kết hữu ích bên dưới */}
      <div className={styles.footerSection}>
        <div className={styles.footerTitle}>Liên kết hữu ích</div>
        <div className={styles.linksWrapper}>
          <Link to="/support" className={styles.linkItem}>
            <CustomerServiceOutlined /> Hỗ trợ khách hàng
          </Link>
          <Link to="/profile#orders" className={styles.linkItem}>
            <ProfileOutlined /> Theo dõi đơn hàng
          </Link>
          <Link to="/stores" className={styles.linkItem}>
            <EnvironmentOutlined /> Hệ thống cửa hàng
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;