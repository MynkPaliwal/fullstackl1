import React, { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SideDrawerStyles } from './SideDrawer.styles.ts';
import { DrawerButton } from './SideDrawer.types.ts';

const SideDrawer: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const drawerButtons: DrawerButton[] = [
        { id: 'users', label: 'Users', icon: '👥', onClick: () => navigate('/dashboard/users') },
        { id: 'billings', label: 'Billings', icon: '💰', onClick: () => navigate('/dashboard/billings') }
    ];

    const handleButtonClick = useCallback((button: DrawerButton) => {
        button.onClick();
    }, []);

    const isActive = (buttonId: string) => {
        return location.pathname.includes(buttonId);
    };

    return (
        <div className={SideDrawerStyles.container}>
            <div className={SideDrawerStyles.header}>
                <div className={SideDrawerStyles.headerContent}>
                    <button onClick={() => navigate('/')} className={SideDrawerStyles.backButton} aria-label="Go back to home">←</button>
                    <h2 className={SideDrawerStyles.title}>Dashboard</h2>
                </div>
            </div>

            <div className={SideDrawerStyles.drawerContent}>
                {drawerButtons.map((button) => (
                    <button 
                        key={button.id} 
                        onClick={() => handleButtonClick(button)} 
                        className={isActive(button.id) ? SideDrawerStyles.menuButtonActive : SideDrawerStyles.menuButton} 
                        aria-label={button.label}>
                        <span className={SideDrawerStyles.menuIcon}>{button.icon}</span>
                        <span className={isActive(button.id) ? SideDrawerStyles.menuLabelActive : SideDrawerStyles.menuLabel}>
                            {button.label}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SideDrawer;
