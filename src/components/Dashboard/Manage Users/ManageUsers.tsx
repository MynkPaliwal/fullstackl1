import React, { useState, useEffect } from 'react';
import { fetchAppleProducts } from '../../../api/fallbackProducts.tsx';
import { Users, PurchaseRecord } from './ManageUsers.types.ts';
import { ManageUsersStyles } from './ManageUsers.styles.ts';
import EditDetails from '../EditDetails/EditDetails.tsx';
import { usePurchases } from '../../../context/AppContext.tsx';

const ManageUsers = () => {
    const { purchases, updatePurchases } = usePurchases();
    const [users, setUsers] = useState<Users[]>([]);
    const [availableProducts, setAvailableProducts] = useState<any[]>([]);

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

    const getUsers = () => {
        const userMap = new Map();
        
        purchases.forEach(purchase => {
            if (userMap.has(purchase.email)) {
                const user = userMap.get(purchase.email);
                user.itemsPurchased.push(purchase.productName);
            } else {
                userMap.set(purchase.email, {
                    id: userMap.size + 1,
                    name: purchase.name,
                    email: purchase.email,
                    itemsPurchased: [purchase.productName]
                });
            }
        });

        return Array.from(userMap.values());
    };

    useEffect(() => {
        const usersData = getUsers();
        setUsers(usersData);
    }, [purchases]);

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
                name: editForm.name,
                email: editingUser.email,
                productName: item,
                purchasedAt: new Date().toISOString()
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
                    <table className={ManageUsersStyles.table}>
                        <thead className={ManageUsersStyles.tableHead}>
                            <tr>
                                <th className={ManageUsersStyles.tableHeader}>
                                    Name
                                </th>
                                <th className={ManageUsersStyles.tableHeader}>
                                    Email
                                </th>
                                <th className={ManageUsersStyles.tableHeader}>
                                    Items Purchased
                                </th>
                                <th className={ManageUsersStyles.tableHeader}>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className={ManageUsersStyles.tableBody}>
                            {currentUsers.map((user) => (
                                <tr key={user.id} className={ManageUsersStyles.tableRow}>
                                    <td className={ManageUsersStyles.tableCellName}>
                                        {user.name}
                                    </td>
                                    <td className={ManageUsersStyles.tableCellEmail}>
                                        {user.email}
                                    </td>
                                    <td className={ManageUsersStyles.tableCellItems}>
                                        <div className={ManageUsersStyles.itemsContainer}>
                                            {user.itemsPurchased.map((item, index) => (
                                                <div key={index} className={ManageUsersStyles.itemText}>
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td className={ManageUsersStyles.tableCellActions}>
                                        <button className={ManageUsersStyles.editButton}
                                            onClick={() => handleEditClick(user)}>
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
