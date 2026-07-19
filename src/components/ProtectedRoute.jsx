import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  if (!isAuthenticated) {
    toast.warning('Bạn cần đăng nhập để truy cập trang này!');
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;