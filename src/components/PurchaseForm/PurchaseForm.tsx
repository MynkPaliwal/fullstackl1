import React, { useState } from "react";
import { X } from "lucide-react";
import { purchaseFormStyles } from "./PurchaseForm.styles.ts";
import { PurchaseFormProps } from "./PurchaseForm.types.ts";
import { validateEmail } from "../../config/Utils.js";

const PurchaseForm = ({ isOpen, onClose, onSubmit, productName }: PurchaseFormProps) => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState({ name: "", email: "" });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newErrors = { name: "", email: "" };

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);

    if (!newErrors.email) {
      setFormData({ name: "", email: "" });
      onSubmit(formData);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  if (!isOpen) {
    return null;
  };

  return (
    <div className={purchaseFormStyles.backdrop}>
      <div className={purchaseFormStyles.modal}>
        <div className={purchaseFormStyles.header}>
          <h2 className={purchaseFormStyles.title}>Purchase {productName}</h2>
          <button onClick={onClose} className={purchaseFormStyles.closeBtn}>
            <X className={purchaseFormStyles.crossIcon} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={purchaseFormStyles.form}>
          <div>
            <label htmlFor="name" className={purchaseFormStyles.label}>
              Name
            </label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name"
              className={purchaseFormStyles.input}
            />
            {errors.name && <p className={purchaseFormStyles.error}>{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className={purchaseFormStyles.label}>
              Email <span className={purchaseFormStyles.mandatoryIcon}>*</span>
            </label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email"
              className={purchaseFormStyles.input}
              required
            />
            {errors.email && <p className={purchaseFormStyles.error}>{errors.email}</p>}
          </div>

          <div className={purchaseFormStyles.actions}>
            <button type="button" onClick={onClose} className={purchaseFormStyles.cancel}>
              Cancel
            </button>
            <button type="submit" className={purchaseFormStyles.submit}>
              Purchase
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PurchaseForm;
