export interface PurchaseSuccessProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productPrice: string;
  autoCloseDelay?: number;
}
