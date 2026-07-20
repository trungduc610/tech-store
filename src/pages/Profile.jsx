import React, { useState } from 'react';
import { Row, Col, Menu, Card, Avatar, Typography, Table, Tag, Button, Empty } from 'antd';
import { 
  UserOutlined, 
  ShoppingOutlined, 
  SettingOutlined, 
  LogoutOutlined, 
  EditOutlined,
  SafetyCertificateOutlined,
  GiftOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const { Title, Text } = Typography;

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // 1. STATE QUẢN LÝ TAB ĐANG HIỂN THỊ
  const [activeTab, setActiveTab] = useState('info');

  const currentUser = useSelector(state => state.user.currentUser);

  const handleLogout = () => {
    dispatch(logout());
    toast.info('Đã đăng xuất!');
    navigate('/login');
  };

  // Cấu hình menu cột trái
  const menuItems = [
    { key: 'info', icon: <UserOutlined />, label: 'Thông tin cá nhân' },
    { key: 'orders', icon: <ShoppingOutlined />, label: 'Lịch sử đơn hàng' },
    { key: 'settings', icon: <SettingOutlined />, label: 'Cài đặt tài khoản' },
    { type: 'divider' },
    { key: 'logout', icon: <LogoutOutlined style={{ color: '#ef4444' }} />, label: <span style={{ color: '#ef4444' }}>Đăng xuất</span> },
  ];

  // 2. HÀM XỬ LÝ KHI CLICK VÀO MENU
  const handleMenuClick = (e) => {
    if (e.key === 'logout') {
      handleLogout();
    } else {
      setActiveTab(e.key); // Chuyển tab tương ứng
    }
  };

  // Dữ liệu giả lập cho bảng Đơn hàng
  const orderColumns = [
    { title: 'Mã đơn hàng', dataIndex: 'id', key: 'id', render: text => <strong>{text}</strong> },
    { title: 'Ngày mua', dataIndex: 'date', key: 'date' },
    { 
      title: 'Trạng thái', 
      dataIndex: 'status', 
      key: 'status',
      render: status => {
        let color = status === 'Đã giao hàng' ? 'success' : 'processing';
        return <Tag color={color} style={{ borderRadius: '12px', padding: '2px 10px' }}>{status}</Tag>;
      }
    },
    { title: 'Tổng tiền', dataIndex: 'total', key: 'total', align: 'right', render: text => <strong>{text}</strong> },
  ];

  const orderData = [
    { key: '1', id: '#TZ12345', date: '10/05/2026', status: 'Đã giao hàng', total: '34.490.000 đ' },
    { key: '2', id: '#TZ12344', date: '02/05/2026', status: 'Đang xử lý', total: '2.150.000 đ' },
    { key: '3', id: '#TZ12340', date: '25/04/2026', status: 'Đã giao hàng', total: '15.990.000 đ' },
  ];

  // ================= CÁC COMPONENT NỘI BỘ =================
  
  // Tab 1: Thông tin cá nhân
  const renderPersonalInfo = () => (
    <>
      <Card style={{ marginBottom: '24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <Avatar size={100} src="https://placehold.co/100x100/f8f9fa/a0aec0?text=Avatar" />
            <Button 
              shape="circle" 
              icon={<EditOutlined />} 
              size="small"
              style={{ position: 'absolute', bottom: 0, right: 0, background: '#0d3b66', color: 'white', border: 'none' }} 
            />
          </div>
          <div style={{ flex: 1 }}>
            <Title level={3} style={{ marginTop: 0, marginBottom: '24px', color: '#0d3b66' }}>
              {currentUser?.name || 'Nguyễn Văn A'}
            </Title>
            <Row gutter={[24, 16]}>
              <Col span={12}>
                <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginBottom: '4px', textTransform: 'uppercase' }}>Email</Text>
                <Text>{currentUser?.email || 'nguyenvana@email.com'}</Text>
              </Col>
              <Col span={12}>
                <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginBottom: '4px', textTransform: 'uppercase' }}>Số điện thoại</Text>
                <Text>090 123 4567</Text>
              </Col>
              <Col span={12}>
                <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginBottom: '4px', textTransform: 'uppercase' }}>Ngày tham gia</Text>
                <Text>15 tháng 10, 2025</Text>
              </Col>
              <Col span={12}>
                <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginBottom: '4px', textTransform: 'uppercase' }}>Hạng thành viên</Text>
                <Text style={{ color: '#02c39a', fontWeight: 600 }}>Khách hàng Thân thiết</Text>
              </Col>
            </Row>
          </div>
        </div>
      </Card>

      <Row gutter={24}>
        <Col span={12}>
          <Card style={{ background: '#0d3b66', color: 'white', borderRadius: '8px' }} bodyStyle={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ background: 'rgba(255,255,255,0.2)', padding: '12px', borderRadius: '8px' }}>
              <SafetyCertificateOutlined style={{ fontSize: '24px' }} />
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 600 }}>Bảo mật tài khoản</div>
              <div style={{ fontSize: '13px', opacity: 0.8 }}>Kích hoạt xác thực 2 lớp để bảo vệ tốt hơn.</div>
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card style={{ background: '#e5e7eb', borderRadius: '8px' }} bodyStyle={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ background: 'white', padding: '12px', borderRadius: '8px' }}>
              <GiftOutlined style={{ fontSize: '24px', color: '#4b5563' }} />
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 600, color: '#111827' }}>Ưu đãi của bạn</div>
              <div style={{ fontSize: '13px', color: '#6b7280' }}>Bạn đang có 2 mã giảm giá chưa sử dụng.</div>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );

  // Tab 2: Lịch sử đơn hàng
  const renderOrders = () => (
    <Card 
      title={<span style={{ color: '#0d3b66', fontSize: '18px' }}>Lịch sử đơn hàng</span>} 
      style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
      bodyStyle={{ padding: 0 }}
    >
      <Table 
        columns={orderColumns} 
        dataSource={orderData} 
        pagination={false}
      />
    </Card>
  );

  // Tab 3: Cài đặt (Tạm thời để trống)
  const renderSettings = () => (
    <Card style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', minHeight: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Empty description="Tính năng cài đặt đang được phát triển" />
    </Card>
  );

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', paddingTop: '20px' }}>
      <Row gutter={24}>
        
        {/* ================= CỘT TRÁI: MENU ================= */}
        <Col xs={24} md={6}>
          <Card bodyStyle={{ padding: '12px 0' }} style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <Menu 
              mode="inline" 
              selectedKeys={[activeTab]} // Ràng buộc UI theo state activeTab
              onClick={handleMenuClick}  // Lắng nghe sự kiện click
              items={menuItems} 
              style={{ borderRight: 'none' }}
            />
          </Card>
        </Col>

        {/* ================= CỘT PHẢI: RENDERING ĐỘNG ================= */}
        <Col xs={24} md={18}>
          {activeTab === 'info' && renderPersonalInfo()}
          {activeTab === 'orders' && renderOrders()}
          {activeTab === 'settings' && renderSettings()}
        </Col>
      </Row>
    </div>
  );
};

export default Profile;