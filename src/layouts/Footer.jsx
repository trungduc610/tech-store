import React from 'react';
import { Layout, Row, Col, Input, Button, Typography, Space } from 'antd';
import { Link } from 'react-router-dom';
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';

const { Footer: AntFooter } = Layout;
const { Title } = Typography;

const Footer = () => {
  // Khai báo các style dùng chung để code JSX gọn gàng hơn
  const titleStyle = { color: '#ffffff', marginBottom: '24px', fontWeight: '600' };
  const textStyle = { color: '#a3a3a3', fontSize: '14px', lineHeight: '1.8' };
  const linkStyle = { 
    color: '#a3a3a3', 
    fontSize: '14px', 
    textDecoration: 'none', 
    display: 'block', 
    marginBottom: '16px',
    transition: 'color 0.3s'
  };
  const iconStyle = { marginRight: '12px', fontSize: '18px', color: '#a3a3a3' };

  return (
    <AntFooter style={{ background: '#1c1c1c', color: '#a3a3a3', padding: '60px 50px 20px', marginTop: 'auto' }}>
      <Row gutter={[32, 32]}>
        {/* CỘT 1: GIỚI THIỆU TECHZONE */}
        <Col xs={24} sm={12} md={6}>
          <Title level={4} style={titleStyle}>TechZone</Title>
          <p style={textStyle}>
            TechZone là hệ thống bán lẻ các thiết bị công nghệ chính hãng hàng đầu Việt Nam. Chúng tôi cam kết mang đến giá trị và trải nghiệm tốt nhất.
          </p>
        </Col>

        {/* CỘT 2: LIÊN KẾT HỮU ÍCH */}
        <Col xs={24} sm={12} md={6}>
          <Title level={4} style={titleStyle}>Liên kết hữu ích</Title>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Link to="#" style={linkStyle}>Thông tin liên hệ</Link>
            <Link to="#" style={linkStyle}>Chính sách bảo hành</Link>
            <Link to="#" style={linkStyle}>Điều khoản dịch vụ</Link>
            <Link to="#" style={linkStyle}>Hướng dẫn mua hàng</Link>
          </div>
        </Col>

        {/* CỘT 3: THÔNG TIN LIÊN HỆ */}
        <Col xs={24} sm={12} md={6}>
          <Title level={4} style={titleStyle}>Liên hệ</Title>
          <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <FiMapPin style={{ ...iconStyle, marginTop: '4px' }} />
              <span style={textStyle}>TP. Hồ Chí Minh, Việt Nam</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FiPhone style={iconStyle} />
              <span style={textStyle}>1900 xxxx</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FiMail style={iconStyle} />
              <span style={textStyle}>contact@techzone.vn</span>
            </div>
          </Space>
        </Col>

        {/* CỘT 4: ĐĂNG KÝ NHẬN TIN */}
        <Col xs={24} sm={12} md={6}>
          <Title level={4} style={titleStyle}>Đăng ký nhận tin</Title>
          <p style={{ ...textStyle, marginBottom: '20px' }}>
            Nhận ưu đãi mới nhất từ chúng tôi.
          </p>
          <div style={{ display: 'flex' }}>
            <Input 
              placeholder="Email của bạn" 
              style={{ 
                background: '#333333', 
                border: '1px solid #444444', 
                color: '#f5f5f5',
                borderRadius: '4px 0 0 4px',
                padding: '8px 12px'
              }} 
            />
            <Button 
              type="primary" 
              style={{ 
                background: '#02c39a', 
                borderColor: '#02c39a',
                borderRadius: '0 4px 4px 0',
                fontWeight: 'bold',
                height: 'auto',
                padding: '0 20px'
              }}
            >
              Gửi
            </Button>
          </div>
        </Col>
      </Row>

      {/* DÒNG BẢN QUYỀN (COPYRIGHT) */}
      <div style={{ 
        textAlign: 'center', 
        marginTop: '48px', 
        borderTop: '1px solid #333333', 
        paddingTop: '24px',
        fontSize: '13px',
        color: '#777777'
      }}>
        © {new Date().getFullYear()} TechZone. Tất cả quyền được bảo lưu.
      </div>
    </AntFooter>
  );
};

export default Footer;