export interface DrawerButton {
    id: string;
    label: string;
    icon: string;
    onClick: () => void;
}
export interface SideDrawerProps {
    isOpen: boolean;
    onToggle: () => void;
}