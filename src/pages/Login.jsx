import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined, AppstoreFilled, ArrowRightOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/user/userSlice';
import { toast } from 'react-toastify';
import styles from './Login.module.css';

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
      toast.error('Tài khoản hoặc mật khẩu không chính xác!');
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginCard}>
        
        {/* LOGO & TIÊU ĐỀ */}
        <div className={styles.logoSection}>
          <AppstoreFilled className={styles.logoIcon} />
          <h1 className={styles.logoText}>TechZone</h1>
        </div>
        
        <div className={styles.welcomeTitle}>Chào mừng bạn quay trở lại</div>
        <div className={styles.welcomeSubtitle}>Vui lòng nhập thông tin để truy cập tài khoản</div>

        <Form name="login_form" onFinish={onFinish} layout="vertical" requiredMark={false}>
          
          <div className={styles.formLabel}>Tên đăng nhập</div>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
            style={{ marginBottom: '20px' }}
          >
            <Input 
              prefix={<UserOutlined style={{ color: '#9ca3af' }} />} 
              placeholder="Nhập tên đăng nhập hoặc email" 
              size="large" 
            />
          </Form.Item>

          <div className={styles.formLabel}>Mật khẩu</div>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            style={{ marginBottom: '16px' }}
          >
            <Input.Password 
              prefix={<LockOutlined style={{ color: '#9ca3af' }} />} 
              placeholder="Nhập mật khẩu của bạn" 
              size="large" 
            />
          </Form.Item>

          <div className={styles.optionsRow}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox style={{ color: '#4b5563' }}>Ghi nhớ đăng nhập</Checkbox>
            </Form.Item>
            <a href="#" className={styles.forgotPwd} onClick={(e) => e.preventDefault()}>
              Quên mật khẩu?
            </a>
          </div>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button 
              type="primary" 
              htmlType="submit" 
              block 
              className={styles.loginBtn}
            >
              Đăng nhập <ArrowRightOutlined />
            </Button>
          </Form.Item>
        </Form>

        <div className={styles.divider}></div>
        <div className={styles.registerText}>
          Chưa có tài khoản? 
          <Link to="/register" className={styles.registerLink}>
            Đăng ký ngay
          </Link>
        </div>

      </div>

      <div className={styles.footer}>
        <div>© 2026 TechZone. Hệ thống quản lý bảo mật cao.</div>
        <div className={styles.footerLinks}>
          <span>Hỗ trợ</span> • <span>Quyền riêng tư</span> • <span>Điều khoản</span>
        </div>
      </div>
    </div>
  );
};

export default Login;