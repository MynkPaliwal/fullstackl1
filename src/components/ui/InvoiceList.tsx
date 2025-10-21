import React from 'react';
import { formatPurchaseDate } from '../../config/Utils.js';
import { BillingsStyles } from '../Dashboard/Billings/Billings.styles.ts';

interface Invoice {
    id: string;
    product: string;
    userEmail: string;
    date: string;
    status: string;
}

interface InvoiceListProps {
    invoices: Invoice[];
}

const InvoiceList: React.FC<InvoiceListProps> = ({ invoices }) => {
    return (
        <>
            {invoices.map((invoice) => (
                <tr key={invoice.id} className={BillingsStyles.tableRow}>
                    <td className={BillingsStyles.tableCellBold}>
                        {invoice.id}
                    </td>
                    <td className={BillingsStyles.tableCell}>
                        {invoice.product}
                    </td>
                    <td className={BillingsStyles.tableCell}>
                        {invoice.userEmail}
                    </td>
                    <td className={BillingsStyles.tableCell}>
                        {formatPurchaseDate(invoice.date)}
                    </td>
                    <td className={BillingsStyles.tableCell}>
                        <span className={BillingsStyles.statusBadge}>
                            {invoice.status}
                        </span>
                    </td>
                </tr>
            ))}
        </>
    );
};

export default InvoiceList;

