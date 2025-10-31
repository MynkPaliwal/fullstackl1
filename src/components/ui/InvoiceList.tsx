import React from 'react';
import { format, parseISO, isValid } from 'date-fns';
import { formatPurchaseDate } from '../../config/Utils';

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
            {invoices.map((invoice, index) => (
                <tr key={`${invoice.id}-${index}`} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {invoice.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {invoice.product}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {invoice.userEmail}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {formatPurchaseDate(invoice.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {invoice.status}
                        </span>
                    </td>
                </tr>
            ))}
        </>
    );
};

export default InvoiceList;
