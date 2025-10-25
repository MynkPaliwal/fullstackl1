import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { formatISO } from 'date-fns';

export interface PurchaseRecord {
    id?: string;
    name: string;
    email: string;
    productName: string;
    purchasedAt: string;
}

interface AppContextType {
    purchases: PurchaseRecord[];
    addPurchase: (purchase: Omit<PurchaseRecord, 'purchasedAt'>) => void;
    updatePurchases: (purchases: PurchaseRecord[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [purchases, setPurchases] = useState<PurchaseRecord[]>([]);

    useEffect(() => {
        const storedPurchases = localStorage.getItem('purchases');
        if (storedPurchases) {
            try {
                setPurchases(JSON.parse(storedPurchases));
            } catch (error) {
                console.error('Error parsing purchases from localStorage:', error);
                setPurchases([]);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('purchases', JSON.stringify(purchases));
    }, [purchases]);

    const addPurchase = (purchase: Omit<PurchaseRecord, 'purchasedAt'>) => {
        const newPurchase: PurchaseRecord = {
            ...purchase,
            purchasedAt: formatISO(new Date())
        };
        setPurchases(prev => [...prev, newPurchase]);
    };

    const updatePurchases = (newPurchases: PurchaseRecord[]) => {
        setPurchases(newPurchases);
    };

    const value: AppContextType = { purchases, addPurchase, updatePurchases };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = (): AppContextType => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};

export const usePurchases = () => {
    const { purchases, addPurchase, updatePurchases } = useAppContext();
    return { purchases, addPurchase, updatePurchases };
};

