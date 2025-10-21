
export interface Product {
    id: number;
    name: string;
    price: string;
    image: string;
}

export interface Users {
    id: number;
    name: string;
    email: string;
    itemsPurchased: string[];
}

export interface EditDetailsProps {
    editingUser: Users;
    editForm: {
        name: string;
        itemsPurchased: string[];
    };
    availableProducts: Product[];
    onSubmit: (event: React.FormEvent) => void;
    onCancel: () => void;
    onFormChange: (editForm: { name: string; itemsPurchased: string[] }) => void;
}