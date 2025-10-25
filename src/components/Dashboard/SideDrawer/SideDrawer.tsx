import React, { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { X, ArrowLeft } from 'lucide-react';
import { SideDrawerStyles } from './SideDrawer.styles.ts';
import { DrawerButton, SideDrawerProps } from './SideDrawer.types.ts';

const SideDrawer: React.FC<SideDrawerProps> = ({ isOpen, onToggle }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const drawerButtons: DrawerButton[] = [
        { id: 'users', label: 'Users', icon: '👥', onClick: () => navigate('/dashboard/users') },
        { id: 'billings', label: 'Billings', icon: '💰', onClick: () => navigate('/dashboard/billings') }
    ];

    const handleButtonClick = useCallback((button: DrawerButton) => {
        button.onClick();
        onToggle();
    }, [onToggle]);

    const isActive = (buttonId: string) => {
        if (buttonId === 'users') {
            return location.pathname === '/dashboard/users';
        }
        if (buttonId === 'billings') {
            return location.pathname === '/dashboard/billings';
        }
        return false;
    };

    return (
        <>
            {isOpen && (
                <div onClick={onToggle} className={SideDrawerStyles.overlay}></div>
            )}

            <div className={`${SideDrawerStyles.container} ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                <div className={SideDrawerStyles.logoSection}>
                    <div className={SideDrawerStyles.logoContainer}>
                        <button 
                            onClick={() => navigate('/')} 
                            className={SideDrawerStyles.backButton}
                            title="Back to Home"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <h1 className={SideDrawerStyles.logoText}>Dashboard</h1>
                    </div>
                    <button onClick={onToggle} className={SideDrawerStyles.closeButton}>
                        <X size={24} />
                    </button>
                </div>
                <div className={SideDrawerStyles.buttonSection}>
                    {drawerButtons.map((button) => (
                        <button
                            key={button.id}
                            onClick={() => handleButtonClick(button)}
                            className={`${SideDrawerStyles.button} ${
                                isActive(button.id)
                                    ? SideDrawerStyles.buttonActive
                                    : SideDrawerStyles.buttonInactive
                            }`}
                        >
                            <span className={SideDrawerStyles.buttonIcon}>{button.icon}</span>
                            <span className={SideDrawerStyles.buttonLabel}>{button.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
};

export default SideDrawer;
