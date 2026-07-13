import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const { Content } = Layout;

const BaseLayout = () => {
  return (
    // Thêm display flex và direction column để đảm bảo footer luôn ở dưới cùng chuẩn xác
    <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Content style={{ padding: '24px 50px', background: '#fff', flex: 1 }}>
        <Outlet /> 
      </Content>
      <Footer />
    </Layout>
  );
};

export default BaseLayout;