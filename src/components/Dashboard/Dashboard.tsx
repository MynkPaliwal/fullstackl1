import React from 'react';
import { useLocation } from 'react-router-dom';
import SideDrawer from './SideDrawer/SideDrawer.tsx';
import ManageUsers from './Manage Users/ManageUsers.tsx';
import Billings from './Billings/Billings.tsx';
import { DashboardStyles } from './Dashboard.styles.ts';

const Dashboard: React.FC = () => {
    const location = useLocation();

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
            <SideDrawer />
            <div className={DashboardStyles.content}>
                {renderContent()}
            </div>
        </div>
    );
};

export default Dashboard;
