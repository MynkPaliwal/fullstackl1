import React, { useEffect, useState } from "react";
import { formatISO } from "date-fns";
import { CheckCircle } from "lucide-react";
import { purchaseSuccessStyles } from "./PurchaseSuccess.styles.ts";
import { PurchaseSuccessProps } from "./PuchaseSuccess.types.ts";
import { formatPurchaseDate } from "../../config/Utils.js";

const PurchaseSuccess = ({ isOpen, onClose, productName, productPrice, autoCloseDelay = 10000 }: PurchaseSuccessProps) => {
  const [countdown, setCountdown] = useState(autoCloseDelay / 1000);
  const [purchaseDate] = useState(formatISO(new Date()));

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
    <div className={purchaseSuccessStyles.backdrop}>
      <div className={purchaseSuccessStyles.modal}>
        <div className={purchaseSuccessStyles.center}>
          <CheckCircle className={purchaseSuccessStyles.icon} />
          <h2 className={purchaseSuccessStyles.title}>Purchase Successful!</h2>
          <div className={purchaseSuccessStyles.details}>
            <h3 className={purchaseSuccessStyles.productDetailsText}>Product Details:</h3>
            <p className={purchaseSuccessStyles.productDetailsName}><strong>Name:</strong> {productName}</p>
            <p className={purchaseSuccessStyles.productDetailsPrice}><strong>Price:</strong> {productPrice}</p>
            <p className={purchaseSuccessStyles.productDetailsPrice}><strong>Purchased:</strong> {formatPurchaseDate(purchaseDate)}</p>
          </div>

          <p className={purchaseSuccessStyles.paragraph}>
            Thank you for your purchase!
          </p>

          <button onClick={onClose} className={purchaseSuccessStyles.okBtn}>
            Okay
          </button>

          {autoCloseDelay > 0 && (
            <p className={purchaseSuccessStyles.countdown}>
              This popup will close automatically in <span className={purchaseSuccessStyles.countdownNum}>{countdown}</span> seconds
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchaseSuccess;
