import React, { useState, useEffect, useMemo } from 'react';
import { formatISO, parseISO } from 'date-fns';
import { fetchAppleProducts } from '../../../api/fallbackProducts.tsx';
import { Users, Product } from './ManageUsers.types.ts';
import { ManageUsersStyles } from './ManageUsers.styles.ts';
import EditDetails from '../EditDetails/EditDetails.tsx';
import UserTable from '../../ui/UserTable.tsx';
import { usePurchases } from '../../../context/AppContext.tsx';
import { generateInvoiceId } from '../../../config/Utils.js';

const ManageUsers = () => {
    const { purchases, updatePurchases } = usePurchases();
    const [users, setUsers] = useState<Users[]>([]);
    const [availableProducts, setAvailableProducts] = useState<Product[]>([]);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const products = await fetchAppleProducts();
                setAvailableProducts(products);
            } catch (error) {
                console.error('Failed to load products:', error);
                setAvailableProducts([]);
            }
        };
        loadProducts();
    }, []);

    const usersData = useMemo(() => {
        const userMap = new Map();
        const userFirstPurchase = new Map();

        if (!Array.isArray(purchases)) {
            return [];
        }

        purchases.forEach(purchase => {
            if (userMap.has(purchase.email)) {
                const user = userMap.get(purchase.email);
                user.itemsPurchased.push(purchase.productName);

                const currentFirstPurchase = userFirstPurchase.get(purchase.email);
                const purchaseTime = parseISO(purchase.purchasedAt || '').getTime();
                if (!currentFirstPurchase || purchaseTime < currentFirstPurchase) {
                    userFirstPurchase.set(purchase.email, purchaseTime);
                }
            } else {
                userMap.set(purchase.email, {
                    id: userMap.size + 1,
                    name: purchase.name,
                    email: purchase.email,
                    itemsPurchased: [purchase.productName]
                });

                userFirstPurchase.set(purchase.email, parseISO(purchase.purchasedAt || '').getTime());
            }
        });

        return Array.from(userMap.values()).sort((a, b) => {
            const dateA = userFirstPurchase.get(a.email) || 0;
            const dateB = userFirstPurchase.get(b.email) || 0;

            return dateA - dateB;
        });
    }, [purchases]);

    useEffect(() => {
        setUsers(usersData);
    }, [usersData]);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [editingUser, setEditingUser] = useState<Users | null>(null);
    const [editForm, setEditForm] = useState({ name: '', itemsPurchased: [] as string[] });

    const totalPages = Math.ceil(users.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentUsers = users.slice(startIndex, endIndex);

    const handleEditClick = (user: Users) => {
        setEditingUser(user);
        setEditForm({ name: user.name, itemsPurchased: user.itemsPurchased });
    };

    const handleEditSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (editingUser) {
            setUsers(users.map(user =>
                user.id === editingUser.id ? { ...user, name: editForm.name, itemsPurchased: editForm.itemsPurchased } : user));

            const filteredPurchases = purchases.filter(p => p.email !== editingUser.email);

            const newPurchases = editForm.itemsPurchased.map(item => ({
                id: generateInvoiceId(),
                name: editForm.name,
                email: editingUser.email,
                productName: item,
                purchasedAt: formatISO(new Date())
            }));

            const finalPurchases = [...filteredPurchases, ...newPurchases];
            updatePurchases(finalPurchases);

            setEditingUser(null);
            setEditForm({ name: '', itemsPurchased: [] });
        }
    };

    const handleEditCancel = () => {
        setEditingUser(null);
        setEditForm({ name: '', itemsPurchased: [] });
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className={ManageUsersStyles.container}>
            <div className={ManageUsersStyles.header}>
                <h1 className={ManageUsersStyles.title}>Users</h1>
            </div>

            {users.length === 0 ? (
                <div className={ManageUsersStyles.emptyState}>
                    <div className={ManageUsersStyles.emptyIcon}>👥</div>
                    <h3 className={ManageUsersStyles.emptyTitle}>No users found</h3>
                    <p className={ManageUsersStyles.emptyMessage}>
                        No purchase records found.
                    </p>
                </div>
            ) : (
                <div className={ManageUsersStyles.tableContainer}>
                    <UserTable users={currentUsers} onEditClick={handleEditClick} />
                </div>
            )}

            {users.length > 0 && (
                <div className={ManageUsersStyles.paginationContainer}>
                    <div className={ManageUsersStyles.paginationControls}>
                        <button onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                            className={`${ManageUsersStyles.paginationButton} ${currentPage === 1
                                ? ManageUsersStyles.paginationButtonDisabled
                                : ManageUsersStyles.paginationButtonActive
                                }`}>
                            Previous
                        </button>
                        <span className={ManageUsersStyles.paginationText}>
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className={`${ManageUsersStyles.paginationButton} ${currentPage === totalPages
                                ? ManageUsersStyles.paginationButtonDisabled
                                : ManageUsersStyles.paginationButtonActive
                                }`}>
                            Next
                        </button>
                    </div>
                </div>
            )}

            {editingUser && (
                <EditDetails
                    editingUser={editingUser}
                    editForm={editForm}
                    availableProducts={availableProducts}
                    onSubmit={handleEditSubmit}
                    onCancel={handleEditCancel}
                    onFormChange={setEditForm}
                />
            )}
        </div>
    );
};

export default ManageUsers;
