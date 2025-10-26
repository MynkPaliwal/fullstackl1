import React from 'react';
import { EditDetailsProps } from './EditDetails.types.ts';
import { EditDetailsStyles } from './EditDetails.styles.ts';

const EditDetails: React.FC<EditDetailsProps> = ({ editingUser, editForm, availableProducts, onSubmit, onCancel, onFormChange }) => {

    return (
        <div className={EditDetailsStyles.modalOverlay}>
            <div className={EditDetailsStyles.modalContent}>
                <h2 className={EditDetailsStyles.modalTitle}>Edit User Details</h2>
                <form onSubmit={onSubmit} className={EditDetailsStyles.modalForm}>
                    <div>
                        <label className={EditDetailsStyles.formLabel}>Name</label>
                        <input type="text" value={editForm.name}
                            onChange={(event) => onFormChange({ ...editForm, name: event.target.value })}
                            className={EditDetailsStyles.formInput}
                            required />
                    </div>
                    <div>
                        <label className={EditDetailsStyles.formLabel}>Email</label>
                        <input type="email" value={editingUser.email}
                            disabled
                            className={EditDetailsStyles.formInputDisabled} />
                        <p className={EditDetailsStyles.formHelpText}>
                            Email cannot be changed (unique identifier)
                        </p>
                    </div>
                    <div>
                        <label className={EditDetailsStyles.formLabel}>
                            Items Purchased
                        </label>
                        <div className={EditDetailsStyles.itemsFieldContainer}>
                            {editForm.itemsPurchased.map((item, index) => (
                                <div key={index} className={EditDetailsStyles.itemFieldRow}>
                                    <select
                                        value={item}
                                        onChange={(event) => {
                                            const newItems = [...editForm.itemsPurchased];
                                            newItems[index] = event.target.value;
                                            onFormChange({ ...editForm, itemsPurchased: newItems });
                                        }}
                                        className={EditDetailsStyles.formInput}
                                        required>
                                        <option value="">Select a product</option>
                                        {availableProducts.map((product) => (
                                            <option key={product.id} value={product.name}>
                                                {product.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={EditDetailsStyles.formButtonsContainer}>
                        <button className={EditDetailsStyles.submitButton} type="submit">
                            Save Changes
                        </button>
                        <button className={EditDetailsStyles.cancelButton}
                            type="button"
                            onClick={onCancel}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditDetails;
