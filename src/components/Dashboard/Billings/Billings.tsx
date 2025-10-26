import React, { useEffect, useState, useMemo } from 'react';
import { formatISO, parseISO } from 'date-fns';
import { fetchAppleProducts } from '../../../api/fallbackProducts.tsx';
import { TrendingProduct } from './Billings.types.ts';
import { BillingsStyles } from './Billings.styles.ts';
import InvoiceList from '../../ui/InvoiceList.tsx';
import { usePurchases } from '../../../context/AppContext.tsx';
import { getPaginatedItems, getTrendingProducts } from '../../../config/Utils.js';

const Billings = () => {
    const { purchases } = usePurchases();
    const [products, setProducts] = useState<any[]>([]);
    const [trendingProducts, setTrendingProducts] = useState<TrendingProduct[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [loadingProducts, setLoadingProducts] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            setLoadingProducts(true);
            try {
                const productsData = await fetchAppleProducts();
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
        if (products.length > 0) {
            const trending = getTrendingProducts(purchases, products, 3);
            setTrendingProducts(trending);
        }
    }, [purchases, products]);

    useEffect(() => {
        setCurrentPage(1);
    }, [purchases.length]);

    const sortedInvoices = useMemo(() => {
        if (!Array.isArray(purchases)) {
            return [];
        }
        return [...purchases]
            .sort((a, b) => {
                const dateA = parseISO(a.purchasedAt || '');
                const dateB = parseISO(b.purchasedAt || '');
                return dateB.getTime() - dateA.getTime();
            })
            .map((purchase) => ({
                id: purchase.id || 'N/A',
                product: purchase.productName || 'Unknown Product',
                userEmail: purchase.email || 'N/A',
                date: purchase.purchasedAt || formatISO(new Date()),
                status: 'Completed'
            }));
    }, [purchases]);

    const { paginatedItems: paginatedInvoices, totalPages } = useMemo(() =>
        getPaginatedItems(sortedInvoices, currentPage, itemsPerPage),
        [sortedInvoices, currentPage, itemsPerPage]
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const renderPagination = () => {
        if (totalPages <= 1) {
            return null;
        }

        return (
            <div className={BillingsStyles.paginationContainer}>
                <div className={BillingsStyles.paginationControls}>
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`${BillingsStyles.paginationButton} ${currentPage === 1 ? BillingsStyles.paginationButtonDisabled : BillingsStyles.paginationButtonActive}`}>
                        Previous
                    </button>
                    <span className={BillingsStyles.paginationText}>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`${BillingsStyles.paginationButton} ${currentPage === totalPages ? BillingsStyles.paginationButtonDisabled : BillingsStyles.paginationButtonActive}`}>
                        Next
                    </button>
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
