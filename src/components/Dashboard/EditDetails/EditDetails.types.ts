export interface EditDetailsProps {
    editingUser: {
        id: number;
        name: string;
        email: string;
        itemsPurchased: string[];
    };
    editForm: {
        name: string;
        itemsPurchased: string[];
    };
    availableProducts: Array<{
        id: number;
        name: string;
        price: string;
        image: string;
    }>;
    onSubmit: (event: React.FormEvent) => void;
    onCancel: () => void;
    onFormChange: (form: { name: string; itemsPurchased: string[] }) => void;
}

