import React, { useEffect, useState } from 'react';
import { getTrendingProducts, getPaginatedItems } from '../../../config/Utils.js';
import { fetchAppleProducts } from '../../../api/fallbackProducts.tsx';
import { TrendingProduct, PurchaseRecord } from './Billings.types.ts';
import { BillingsStyles } from './Billings.styles.ts';
import InvoiceList from '../../ui/InvoiceList.tsx';

const Billings = () => {
    const [purchases, setPurchases] = useState<PurchaseRecord[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [trendingProducts, setTrendingProducts] = useState<TrendingProduct[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [loadingProducts, setLoadingProducts] = useState(true);

    useEffect(() => {
        const storedPurchases = localStorage.getItem('purchases');
        if (storedPurchases) {
            setPurchases(JSON.parse(storedPurchases));
        }
    }, []);

    useEffect(() => {
        const loadProducts = async () => {
            setLoadingProducts(true);
            try {
                const productsData = await fetchAppleProducts();
                console.log('Loaded products:', productsData);
                setProducts(productsData);
            } catch (error) {
                console.error('Failed to load products:', error);
                setProducts([]);
            } finally {
                setLoadingProducts(false);
            }
        };
        loadProducts();
    }, []);

    useEffect(() => {
        console.log('Products state:', products);
        console.log('Purchases state:', purchases);
        if (products.length > 0) {
            const trending = getTrendingProducts(purchases, products, 3);
            console.log('Trending calculated:', trending);
            setTrendingProducts(trending);
        }
    }, [purchases, products]);

    const sortedInvoices = purchases
        .sort((a, b) => new Date(b.purchasedAt).getTime() - new Date(a.purchasedAt).getTime())
        .map((purchase, index) => ({
            id: purchase.id || `INV-${String(index + 1).padStart(4, '0')}`,
            product: purchase.productName || 'Unknown Product',
            userEmail: purchase.email || 'N/A',
            date: purchase.purchasedAt || new Date().toISOString(),
            status: 'Completed'
        }));

    const { paginatedItems: paginatedInvoices, totalPages } = getPaginatedItems(
        sortedInvoices,
        currentPage,
        itemsPerPage
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const renderPagination = () => {
        if (totalPages <= 1) {
            return null;
        }

        const pages: React.ReactNode[] = [];
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        pages.push(
            <button key="prev" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className={BillingsStyles.paginationButtonPrev}>
                Previous
            </button>
        );

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button key={i} onClick={() => handlePageChange(i)} className={i === currentPage ? BillingsStyles.paginationButtonActive : BillingsStyles.paginationButtonInactive}>
                    {i}
                </button>
            );
        }

        pages.push(
            <button key="next" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className={BillingsStyles.paginationButtonNext}>
                Next
            </button>
        );

        return (
            <div className={BillingsStyles.paginationContainer}>
                <div className={BillingsStyles.paginationInfo}>
                    Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedInvoices.length)} of {sortedInvoices.length} invoices
                </div>
                <div className={BillingsStyles.paginationButtons}>
                    {pages}
                </div>
            </div>
        );
    };

    return (
        <div>
            <h1 className={BillingsStyles.title}>Billings</h1>
            <div className={BillingsStyles.container}>
                <div className={BillingsStyles.sectionCard}>
                    <h2 className={BillingsStyles.sectionTitle}>🔥 Trending Products</h2>
                    <p className={BillingsStyles.sectionDescription}>Most purchased items based on customer activity</p>
                    
                    {loadingProducts ? (
                        <div className={BillingsStyles.loadingContainer}>
                            <div className={BillingsStyles.loadingSpinner}></div>
                            <p className={BillingsStyles.loadingText}>Loading products...</p>
                        </div>
                    ) : trendingProducts.length > 0 ? (
                        <div className={BillingsStyles.trendingGrid}>
                            {trendingProducts.map((product, index) => (
                                <div key={product.id} className={BillingsStyles.trendingCard}>
                                    <div className={BillingsStyles.trendingCardInner}>
                                        <h3 className={BillingsStyles.productName}>{product.name}</h3>
                                        <div className={BillingsStyles.productImageContainer}>
                                            <img 
                                                src={product.image} 
                                                alt={product.name}
                                                className={BillingsStyles.productImage}
                                            />
                                        </div>
                                        <div className={BillingsStyles.purchaseCountBadge}>
                                            {product.purchaseCount} purchase{product.purchaseCount !== 1 ? 's' : ''}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className={BillingsStyles.emptyState}>
                            <div className={BillingsStyles.emptyStateIcon}>📊</div>
                            <p className={BillingsStyles.emptyStateText}>No purchase data available yet</p>
                            <p className={BillingsStyles.emptyStateSubtext}>Trending products will appear here once customers start making purchases</p>
                        </div>
                    )}
                </div>

                <div className={BillingsStyles.sectionCard}>
                    <h2 className={BillingsStyles.sectionTitle}>Invoices</h2>
                    {sortedInvoices.length > 0 ? (
                        <>
                            <div className={BillingsStyles.tableContainer}>
                                <table className={BillingsStyles.table}>
                                    <thead className={BillingsStyles.tableHead}>
                                        <tr>
                                            <th className={BillingsStyles.tableHeader}>
                                                Invoice ID
                                            </th>
                                            <th className={BillingsStyles.tableHeader}>
                                                Product
                                            </th>
                                            <th className={BillingsStyles.tableHeader}>
                                                User Email
                                            </th>
                                            <th className={BillingsStyles.tableHeader}>
                                                Date
                                            </th>
                                            <th className={BillingsStyles.tableHeader}>
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className={BillingsStyles.tableBody}>
                                        <InvoiceList invoices={paginatedInvoices} />
                                    </tbody>
                                </table>
                            </div>
                            {renderPagination()}
                        </>
                    ) : (
                        <div className={BillingsStyles.emptyState}>
                            <div className={BillingsStyles.emptyStateIcon}>📄</div>
                            <p className={BillingsStyles.emptyStateText}>No invoices available yet</p>
                            <p className={BillingsStyles.emptyStateSubtext}>Invoices will appear here once customers make purchases</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Billings;
