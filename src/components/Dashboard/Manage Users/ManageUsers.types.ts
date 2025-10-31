export interface PurchaseRecord {
    name: string;
    email: string;
    productName: string;
    purchasedAt: string;
}

export interface Users {
    id: number;
    name: string;
    email: string;
    itemsPurchased: string[];
}

export interface Product {
    id: number;
    name: string;
    price: string;
    image: string;
}