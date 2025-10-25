import { format, parseISO, isValid } from 'date-fns';

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

export const getPaginatedItems = (items, currentPage, itemsPerPage) => {
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = items.slice(startIndex, endIndex);

    return { paginatedItems, totalPages };
};

export const formatPurchaseDate = (dateString) => {
    try {
        const date = parseISO(dateString);
        if (!isValid(date)) {
            return dateString;
        }
        return format(date, 'MMM d, yyyy');
    } catch (error) {
        return dateString;
    }
};

export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

