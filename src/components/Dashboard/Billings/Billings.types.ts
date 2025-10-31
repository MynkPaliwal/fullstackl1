export interface TrendingProduct {
    id: number;
    name: string;
    price: string;
    image: string;
    purchaseCount: number;
}

export interface PurchaseRecord {
    id?: string;
    name: string;
    email: string;
    productName: string;
    purchasedAt: string;
}

export interface Product {
    id: number;
    name: string;
    price: string;
    image: string;
}