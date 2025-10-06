import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";

export interface PurchaseSuccessProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productPrice: string;
  autoCloseDelay?: number;
}

const PurchaseSuccess = ({ isOpen, onClose, productName, productPrice, autoCloseDelay = 10000 }: PurchaseSuccessProps) => {
  const [countdown, setCountdown] = useState(autoCloseDelay / 1000);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setCountdown(autoCloseDelay / 1000);

    const timer = setTimeout(() => {
      onClose();
    }, autoCloseDelay);

    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(countdownInterval);
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
        <div className="text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Purchase Successful!</h2>
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <h3 className="font-medium text-foreground mb-1">Product Details:</h3>
            <p className="text-sm text-gray-600 mb-1"><strong>Name:</strong> {productName}</p>
            <p className="text-sm text-gray-600"><strong>Price:</strong> {productPrice}</p>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            Thank you for your purchase! You will receive a confirmation email shortly.
          </p>

          <button onClick={onClose} className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Okay
          </button>

          {autoCloseDelay > 0 && (
            <p className="text-xs text-gray-500 mt-2">
              This popup will close automatically in <span className="font-semibold text-blue-600">{countdown}</span> seconds
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchaseSuccess;
