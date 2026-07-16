// src/hooks/useDebounce.js
import { useState, useEffect } from 'react';

/**
 * Custom hook useDebounce
 * @param {any} value - Giá trị cần theo dõi (ví dụ: từ khóa tìm kiếm)
 * @param {number} delay - Thời gian chờ (mili-giây)
 * @returns Giá trị đã được delay
 */
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); 

  return debouncedValue;
};

export default useDebounce;