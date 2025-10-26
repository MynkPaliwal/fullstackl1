import React from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    itemsPurchased: string[];
}

interface UserTableProps {
    users: User[];
    onEditClick: (user: User) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onEditClick }) => {
    return (
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                    <th className="px-3 md:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                        Name
                    </th>
                    <th className="px-3 md:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                        Email
                    </th>
                    <th className="px-3 md:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                        Items Purchased
                    </th>
                    <th className="px-3 md:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-3 md:px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-900">
                            {user.name}
                        </td>
                        <td className="px-3 md:px-6 py-4 text-center whitespace-nowrap text-xs md:text-sm text-gray-600">
                            {user.email}
                        </td>
                        <td className="px-3 md:px-6 py-4 text-center">
                            <div className="flex flex-wrap justify-center gap-1 md:gap-2">
                                {user.itemsPurchased.map((item, index) => (
                                    <div key={index} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </td>
                        <td className="px-3 md:px-6 py-4 text-center whitespace-nowrap text-sm font-medium">
                            <button
                                className="text-blue-600 hover:text-blue-900 text-xs md:text-sm"
                                onClick={() => onEditClick(user)}>
                                Edit
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default UserTable;

