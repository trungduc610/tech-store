import React from 'react';
import { Row, Col, Input, Button, Divider, Typography, Empty } from 'antd';
import { Link } from 'react-router-dom';
import { FiTrash2, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '../redux/cart/cartSlice';
import styles from './Cart.module.css';
import { toast } from 'react-toastify';

const { Title } = Typography;

const formatPrice = (price) => new Intl.NumberFormat('vi-VN').format(price) + ' đ';

const Cart = () => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const subTotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleUpdateQty = (id, newQty) => {
    if (newQty < 1) return;
    dispatch(updateQuantity({ id, qty: newQty }));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
    toast.error('Đã xóa sản phẩm khỏi giỏ hàng!');
  };

  if (cartItems.length === 0) {
    return (
      <div className={styles.cartContainer} style={{ textAlign: 'center', padding: '60px 0' }}>
        <Empty 
          description={<span style={{ fontSize: '18px', color: '#6b7280' }}>Giỏ hàng của bạn đang trống</span>} 
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
        <Link to="/products">
          <Button type="primary" size="large" style={{ marginTop: '20px', background: '#0d3b66' }}>
            Bắt đầu mua sắm ngay
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.cartContainer}>
      <h1 className={styles.pageTitle}>Giỏ hàng của bạn</h1>
      <div className={styles.subTitle}>
        Hiện có <strong>{cartItems.length} sản phẩm</strong> trong giỏ hàng
      </div>

      <Row gutter={40}>
        <Col xs={24} lg={16}>
          <div className={`${styles.cartGrid} ${styles.cartHeader}`}>
            <div>Sản phẩm</div>
            <div style={{ textAlign: 'center' }}>Đơn giá</div>
            <div style={{ textAlign: 'center' }}>Số lượng</div>
            <div style={{ textAlign: 'right' }}>Tổng tiền</div>
            <div></div> 
          </div>

          {cartItems.map((item) => (
            <div key={item.id} className={`${styles.cartGrid} ${styles.cartItem}`}>
              <div className={styles.productInfo}>
                <img src={item.img} alt={item.name} className={styles.productImg} />
                <div>
                  <div className={styles.productName}>{item.name}</div>
                  <div className={styles.stockStatus}>Sẵn hàng</div>
                </div>
              </div>

              <div className={styles.priceText} style={{ textAlign: 'center' }}>
                {formatPrice(item.price)}
              </div>

              <div style={{ textAlign: 'center' }}>
                <div className={styles.qtySelector}>
                  <button className={styles.qtyBtn} onClick={() => handleUpdateQty(item.id, item.qty - 1)}>-</button>
                  <input type="text" value={item.qty} readOnly className={styles.qtyInput} />
                  <button className={styles.qtyBtn} onClick={() => handleUpdateQty(item.id, item.qty + 1)}>+</button>
                </div>
              </div>

              <div className={styles.totalText} style={{ textAlign: 'right' }}>
                {formatPrice(item.price * item.qty)}
              </div>

              <div style={{ textAlign: 'right' }}>
                <FiTrash2 className={styles.deleteBtn} size={20} onClick={() => handleRemoveItem(item.id)} />
              </div>
            </div>
          ))}

          <Link to="/products" className={styles.continueBtn}>
            <FiArrowLeft /> Tiếp tục mua sắm
          </Link>
        </Col>

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