import React, { useState } from 'react';
import { Row, Col, Input, Button, Divider, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { FiTrash2, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import styles from './Cart.module.css';

const { Title } = Typography;

// --- MOCK DATA ---
const initialCart = [
  {
    id: 1,
    name: 'Laptop Asus ROG Strix G16',
    price: 34490000,
    qty: 1,
    img: 'https://placehold.co/150x150/f8f9fa/a0aec0?text=Asus+ROG',
    status: 'Sẵn hàng',
  },
  {
    id: 2,
    name: 'iPhone 15 Pro Max',
    price: 29990000,
    qty: 1,
    img: 'https://placehold.co/150x150/f8f9fa/a0aec0?text=iPhone+15',
    status: 'Sẵn hàng',
  },
];

const formatPrice = (price) => new Intl.NumberFormat('vi-VN').format(price) + ' đ';

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCart);

  // Tính tổng tiền đơn hàng
  const subTotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  // Xử lý tăng giảm số lượng (Tạm thời xử lý state local cho UI)
  const updateQty = (id, newQty) => {
    if (newQty < 1) return;
    const updated = cartItems.map(item => 
      item.id === id ? { ...item, qty: newQty } : item
    );
    setCartItems(updated);
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <div className={styles.cartContainer}>
      <h1 className={styles.pageTitle}>Giỏ hàng của bạn</h1>
      <div className={styles.subTitle}>
        Hiện có <strong>{cartItems.length} sản phẩm</strong> trong giỏ hàng
      </div>

      <Row gutter={40}>
        {/* ================= CỘT TRÁI: DANH SÁCH SẢN PHẨM ================= */}
        <Col xs={24} lg={16}>
          {/* Header Cột - Sử dụng class cartGrid đã cấu hình chia tỷ lệ */}
          <div className={`${styles.cartGrid} ${styles.cartHeader}`}>
            <div>Sản phẩm</div>
            <div style={{ textAlign: 'center' }}>Đơn giá</div>
            <div style={{ textAlign: 'center' }}>Số lượng</div>
            <div style={{ textAlign: 'right' }}>Tổng tiền</div>
            <div></div> {/* Cột trống cho nút xóa */}
          </div>

          {/* Danh sách Item */}
          {cartItems.map((item) => (
            <div key={item.id} className={`${styles.cartGrid} ${styles.cartItem}`}>
              
              {/* 1. Sản phẩm */}
              <div className={styles.productInfo}>
                <img src={item.img} alt={item.name} className={styles.productImg} />
                <div>
                  <div className={styles.productName}>{item.name}</div>
                  <div className={styles.stockStatus}>{item.status}</div>
                </div>
              </div>

              {/* 2. Đơn giá */}
              <div className={styles.priceText} style={{ textAlign: 'center' }}>
                {formatPrice(item.price)}
              </div>

              {/* 3. Số lượng */}
              <div style={{ textAlign: 'center' }}>
                <div className={styles.qtySelector}>
                  <button className={styles.qtyBtn} onClick={() => updateQty(item.id, item.qty - 1)}>-</button>
                  <input type="text" value={item.qty} readOnly className={styles.qtyInput} />
                  <button className={styles.qtyBtn} onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                </div>
              </div>

              {/* 4. Tổng tiền */}
              <div className={styles.totalText} style={{ textAlign: 'right' }}>
                {formatPrice(item.price * item.qty)}
              </div>

              {/* 5. Nút xóa */}
              <div style={{ textAlign: 'right' }}>
                <FiTrash2 className={styles.deleteBtn} size={20} onClick={() => removeItem(item.id)} />
              </div>

            </div>
          ))}

          {/* Nút quay lại */}
          <Link to="/products" className={styles.continueBtn}>
            <FiArrowLeft /> Tiếp tục mua sắm
          </Link>
        </Col>

        {/* ================= CỘT PHẢI: TÓM TẮT ĐƠN HÀNG ================= */}
        <Col xs={24} lg={8}>
          <div className={styles.summaryBox}>
            <div className={styles.summaryTitle}>Tóm tắt đơn hàng</div>
            
            <div className={styles.summaryRow}>
              <span>Tạm tính</span>
              <span style={{ fontWeight: 500, color: '#111827' }}>{formatPrice(subTotal)}</span>
            </div>
            
            <div className={styles.summaryRow}>
              <span>Phí vận chuyển</span>
              <span style={{ color: '#02c39a', fontWeight: 500 }}>Miễn phí</span>
            </div>

            <div className={styles.discountSection}>
              <span style={{ fontSize: '13px', fontWeight: 600, textTransform: 'uppercase' }}>Mã giảm giá</span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Input placeholder="Nhập mã..." />
                <Button type="primary" style={{ background: '#0d3b66' }}>Áp dụng</Button>
              </div>
            </div>

            <Divider style={{ margin: '16px 0' }} />

            <div className={styles.finalTotal}>
              <span style={{ fontWeight: 600, color: '#4b5563' }}>Tổng cộng</span>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#0d3b66' }}>
                  {formatPrice(subTotal)}
                </div>
                <div style={{ fontSize: '13px', color: '#6b7280' }}>(Đã bao gồm VAT)</div>
              </div>
            </div>

            <Button type="primary" size="large" className={styles.checkoutBtn}>
              Tiến hành thanh toán <FiArrowRight style={{ marginLeft: '8px' }} />
            </Button>
            
            {/* Hình ảnh các phương thức thanh toán giả lập */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '24px' }}>
              <img src="https://placehold.co/40x25/f8f9fa/a0aec0?text=VISA" alt="Visa" />
              <img src="https://placehold.co/40x25/f8f9fa/a0aec0?text=ATM" alt="ATM" />
              <img src="https://placehold.co/40x25/f8f9fa/a0aec0?text=MOMO" alt="Momo" />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Cart;