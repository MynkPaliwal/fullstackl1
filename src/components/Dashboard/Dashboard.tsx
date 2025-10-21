import React from 'react';
import { useLocation } from 'react-router-dom';
import SideDrawer from './SideDrawer/SideDrawer.tsx';
import ManageUsers from './Manage Users/ManageUsers.tsx';
import Billings from './Billings/Billings.tsx';
import { DashboardStyles } from './Dashboard.styles.ts';

const Dashboard = () => {
    const location = useLocation();

    const renderContent = () => {
        switch (location.pathname) {
            case '/dashboard/users':
                return <ManageUsers />;
            case '/dashboard/billings':
                return <Billings />;
        }
    };

    return (
        <div className={DashboardStyles.container}>
            <SideDrawer />
            <div className={DashboardStyles.mainContent}>
                <div className={DashboardStyles.mainContentInner}>
                    <div className={DashboardStyles.contentWrapper}>
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
