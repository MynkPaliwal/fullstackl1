import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import SideDrawer from './SideDrawer/SideDrawer.tsx';
import ManageUsers from './Manage Users/ManageUsers.tsx';
import Billings from './Billings/Billings.tsx';
import { DashboardStyles } from './Dashboard.styles.ts';

const Dashboard: React.FC = () => {
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const renderContent = () => {
        if (location.pathname === '/dashboard/users') {
            return <ManageUsers />;
        } else if (location.pathname === '/dashboard/billings') {
            return <Billings />;
        }
        return <ManageUsers />;
    };

    return (
        <div className={DashboardStyles.container}>
            <SideDrawer isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
            <div className={DashboardStyles.content}>
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className={DashboardStyles.mobileMenuButton}>
                    <Menu size={24} />
                </button>

                {renderContent()}
            </div>
        </div>
    );
};

export default Dashboard;
