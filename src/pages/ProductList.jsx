import React, { useState, useEffect } from 'react';
import { Row, Col, Checkbox, Slider, Button, Select, Pagination, Card, Tag, Typography, Rate, Space, Spin, Alert, Skeleton } from 'antd';
import { FiFilter } from 'react-icons/fi';
import { Link, useSearchParams } from 'react-router-dom';
import productService from '../api/productService'; 
import styles from './ProductList.module.css';

const { Title, Text } = Typography;

const formatPrice = (price) => new Intl.NumberFormat('vi-VN').format(price) + 'đ';

const CATEGORIES = [
  { label: 'Laptop', value: 'laptops' },
  { label: 'Điện thoại', value: 'smartphones' },
  { label: 'Phụ kiện', value: 'mobile-accessories' },
  { label: 'Máy tính bảng', value: 'tablets' }
];

const PAGE_SIZE = 16;

const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const initialCategories = searchParams.get('category') ? searchParams.get('category').split(',') : [];
  const initialSort = searchParams.get('sort') || 'banchay';
  const initialMinPrice = searchParams.get('min') ? Number(searchParams.get('min')) : 0;
  const initialMaxPrice = searchParams.get('max') ? Number(searchParams.get('max')) : 100000000;
  const initialPage = searchParams.get('page') ? Number(searchParams.get('page')) : 1;

  const [originalProducts, setOriginalProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]); // Chứa tất cả SP đã lọc
  
  const [selectedCategories, setSelectedCategories] = useState(initialCategories);
  const [priceRange, setPriceRange] = useState([initialMinPrice, initialMaxPrice]);
  const [sortOrder, setSortOrder] = useState(initialSort);
  const [currentPage, setCurrentPage] = useState(initialPage);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const updateURLParams = (categories, sort, minPrice, maxPrice, page) => {
    const params = {};
    
    if (categories.length > 0) params.category = categories.join(',');
    if (sort !== 'banchay') params.sort = sort;
    if (minPrice > 0) params.min = minPrice;
    if (maxPrice < 100000000) params.max = maxPrice;
    if (page > 1) params.page = page;

    setSearchParams(params);
  };

  useEffect(() => {
    const fetchTechProducts = async () => {
      try {
        setLoading(true);
        const [phoneRes, laptopRes, accessoryRes, tabletRes] = await Promise.all([
          productService.getProductsByCategory('smartphones'),
          productService.getProductsByCategory('laptops'),
          productService.getProductsByCategory('mobile-accessories'),
          productService.getProductsByCategory('tablets')
        ]);
        
        const combinedProducts = [
          ...(phoneRes.products || []), 
          ...(laptopRes.products || []),
          ...(accessoryRes.products || []),
          ...(tabletRes.products || [])
        ];
        
        setOriginalProducts(combinedProducts);
        setError(null);
      } catch (err) {
        setError('Không thể tải danh sách sản phẩm. Vui lòng kiểm tra lại!');
      } finally {
        setLoading(false);
      }
    };

    fetchTechProducts();
  }, []); 

  useEffect(() => {
    if (originalProducts.length === 0) return;

    let result = [...originalProducts];

    // Lọc theo Category
    if (selectedCategories.length > 0) {
      result = result.filter(prod => selectedCategories.includes(prod.category));
    }

    // Lọc theo Khoảng giá
    result = result.filter(prod => {
      const priceVND = Math.round(prod.price * 25000);
      return priceVND >= priceRange[0] && priceVND <= priceRange[1];
    });

    // Sắp xếp
    if (sortOrder === 'giathap') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'giacao') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOrder === 'banchay') {
      result.sort((a, b) => b.rating - a.rating); 
    }

    setDisplayProducts(result);
    
    const totalPages = Math.ceil(result.length / PAGE_SIZE);
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
      updateURLParams(selectedCategories, sortOrder, priceRange[0], priceRange[1], 1);
    }
  }, [originalProducts, selectedCategories, priceRange, sortOrder]);

  const handleCategoryChange = (checkedValues) => {
    setSelectedCategories(checkedValues);
    setCurrentPage(1); // Khi đổi bộ lọc luôn quay về trang 1
    updateURLParams(checkedValues, sortOrder, priceRange[0], priceRange[1], 1);
  };

  const handlePriceChange = (value) => {
    const min = value[0] * 1000000;
    const max = value[1] * 1000000;
    setPriceRange([min, max]);
    setCurrentPage(1);
    updateURLParams(selectedCategories, sortOrder, min, max, 1);
  };

  const handleSortChange = (value) => {
    setSortOrder(value);
    setCurrentPage(1);
    updateURLParams(selectedCategories, value, priceRange[0], priceRange[1], 1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    updateURLParams(selectedCategories, sortOrder, priceRange[0], priceRange[1], page);
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedProducts = displayProducts.slice(startIndex, endIndex);

  return (
    <div className={styles.listContainer}>
      <Row gutter={24}>
        
        <Col span={6}>
          <div className={styles.sidebar}>
            <div className={styles.filterHeader}>
              <FiFilter /> Bộ lọc
            </div>

            <div className={styles.filterSection}>
              <div className={styles.filterTitle}>Danh mục sản phẩm</div>
              <Checkbox.Group 
                options={CATEGORIES} 
                value={selectedCategories}
                onChange={handleCategoryChange}
                style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
              />
            </div>

            <div className={styles.filterSection}>
              <div className={styles.filterTitle}>Khoảng giá (Triệu VNĐ)</div>
              {/* Đưa giá trị priceRange đang ở mức VNĐ về lại hệ số 0-100 (Triệu) để Slider hiểu */}
              <Slider 
                range 
                value={[priceRange[0] / 1000000, priceRange[1] / 1000000]} 
                max={100} 
                onChange={(val) => setPriceRange([val[0] * 1000000, val[1] * 1000000])} 
                onAfterChange={handlePriceChange} 
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6b7280', fontSize: '13px' }}>
                <span>0đ</span>
                <span>100tr+</span>
              </div>
            </div>

            <div className={styles.filterSection}>
              <div className={styles.filterTitle}>Thương hiệu</div>
              <div className={styles.brandGrid}>
                <Button>Apple</Button>
                <Button>Samsung</Button>
                <Button>Dell</Button>
                <Button>Asus</Button>
              </div>
            </div>
          </div>
        </Col>

        <Col span={18}>
          
          <div className={styles.topBar}>
            <div>
              Tìm thấy <strong style={{ color: '#0d3b66' }}>{loading ? '...' : displayProducts.length}</strong> sản phẩm
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#6b7280' }}>Sắp xếp theo:</span>
              <Select 
                value={sortOrder}
                onChange={handleSortChange}
                style={{ width: 150 }}
                options={[
                  { value: 'banchay', label: 'Bán chạy nhất' },
                  { value: 'giathap', label: 'Giá thấp đến cao' },
                  { value: 'giacao', label: 'Giá cao đến thấp' },
                ]}
              />
            </div>
          </div>

          {loading ? (
             <Row gutter={[20, 20]}>
               {Array.from({ length: 16 }).map((_, index) => (
                 <Col span={6} key={index}>
                   <Card className={styles.productCard} bodyStyle={{ padding: '16px', display: 'flex', flexDirection: 'column', height: '100%' }} cover={<div style={{ padding: '20px', display: 'flex', justifyContent: 'center', background: '#f9fafb', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}><Skeleton.Image active style={{ width: '160px', height: '140px' }} /></div>}>
                     <Skeleton active paragraph={{ rows: 0 }} style={{ marginBottom: '12px' }} />
                     <Skeleton active paragraph={{ rows: 1 }} title={false} style={{ marginBottom: '20px' }} />
                     <div style={{ marginTop: 'auto' }}><Skeleton.Button active block shape="round" style={{ height: '32px' }} /></div>
                   </Card>
                 </Col>
               ))}
             </Row>
          ) : error ? (
             <Alert message="Đã xảy ra lỗi" description={error} type="error" showIcon style={{ margin: '20px 0' }} />
          ) : displayProducts.length === 0 ? (
             <Alert message="Không có sản phẩm" description="Không tìm thấy sản phẩm nào phù hợp với bộ lọc." type="info" showIcon style={{ margin: '20px 0' }} />
          ) : (
            <>
              <Row gutter={[20, 20]}>
                {paginatedProducts.map((prod) => {
                  const priceVND = Math.round(prod.price * 25000);
                  return (
                    <Col span={6} key={prod.id}>
                       <Card
                        hoverable
                        className={styles.productCard}
                        bodyStyle={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}
                        cover={
                          <div style={{ padding: '20px', position: 'relative', background: '#fff', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}>
                            {prod.discountPercentage > 10 && (
                              <Tag color="error" style={{ position: 'absolute', top: 12, left: 12, margin: 0, fontWeight: 500 }}>
                                Giảm {Math.round(prod.discountPercentage)}%
                              </Tag>
                            )}
                            <img alt={prod.title} src={prod.thumbnail} style={{ width: '100%', height: '140px', objectFit: 'contain' }} />
                          </div>
                        }
                      >
                        <Link to={`/products/${prod.id}`}>
                          <Text ellipsis={{ tooltip: prod.title }} style={{ fontSize: '14px', fontWeight: 500, color: '#374151', cursor: 'pointer' }}>
                            {prod.title}
                          </Text>
                        </Link>
                        
                        <div className={styles.priceText}>
                          {formatPrice(priceVND)}
                        </div>
                        
                        <div className={styles.ratingContainer}>
                          <Rate disabled defaultValue={Math.round(prod.rating)} style={{ fontSize: '12px', color: '#fadb14' }} />
                          <span>{prod.rating}</span>
                          <span>({prod.reviews ? prod.reviews.length : Math.floor(Math.random() * 100 + 10)})</span>
                        </div>

                        <div style={{ marginTop: 'auto' }}>
                          <Button type="primary" className={styles.addToCartBtn}>
                            Thêm vào giỏ
                          </Button>
                        </div>
                      </Card>
                    </Col>
                  );
                })}
              </Row>

              <div className={styles.paginationWrapper}>
                <Pagination 
                  current={currentPage} 
                  total={displayProducts.length} 
                  pageSize={PAGE_SIZE} 
                  showSizeChanger={false} 
                  onChange={handlePageChange} 
                />
              </div>
            </>
          )}

        </Col>
      </Row>
    </div>
  );
};

export default ProductList;