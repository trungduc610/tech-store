import React from 'react';
import { Form, Input, Button, Card, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/user/userSlice';
import { toast } from 'react-toastify';

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = (values) => {
    if (values.username === 'admin' && values.password === '123456') {
      
      const mockResponse = {
        user: { id: 1, name: 'Quản trị viên', email: 'admin@techzone.com', role: 'admin' },
        token: 'mock-jwt-token-abcdef-123456'
      };

      dispatch(loginSuccess(mockResponse));
      
      toast.success('Đăng nhập thành công!');
      navigate('/'); 
    } else {
      toast.error('Tài khoản hoặc mật khẩu không chính xác! (Gợi ý: admin / 123456)');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <Card style={{ width: 400, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <Title level={3} style={{ textAlign: 'center', color: '#0d3b66', marginBottom: '24px' }}>
          Đăng nhập hệ thống
        </Title>
        
        <Form name="login_form" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Vui lòng nhập tên tài khoản!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Tài khoản (admin)" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu (123456)" size="large" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block style={{ background: '#0d3b66' }}>
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;