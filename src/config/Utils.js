import { format, parseISO, isValid } from 'date-fns';

export const storage = {
  getStorageItem(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error reading ${key} from localStorage:`, error);
      return null;
    }
  },

  setStorageItem(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing ${key} to localStorage:`, error);
      return false;
    }
  }
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const formatPurchaseDate = (dateString) => {
  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
    if (!isValid(date)) {
      return 'Invalid date';
    }
    return format(date, 'MM/dd/yyyy');
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date';
  }
};

export const getPaginatedItems = (items, currentPage, itemsPerPage) => {
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = items.slice(startIndex, endIndex);

  return { paginatedItems, totalPages };
};

export const getTrendingProducts = (purchases, products, limit = 5) => {
  if (!purchases || purchases.length === 0) {
    return [];
  }

  const productCounts = {};
  purchases.forEach(purchase => {
    if (purchase.productName) {
      productCounts[purchase.productName] = (productCounts[purchase.productName] || 0) + 1;
    }
  });

  const trendingProducts = products
    .filter(product => productCounts[product.name] > 0)
    .map(product => ({
      ...product,
      purchaseCount: productCounts[product.name] || 0
    }))
    .sort((a, b) => b.purchaseCount - a.purchaseCount)
    .slice(0, limit);

  return trendingProducts;
};