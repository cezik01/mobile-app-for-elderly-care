import { NavigationProp } from "@react-navigation/native";

export interface SidebarProps {
    style?: object;
    setSidebarVisible: (visible: boolean) => void;
    navigation: NavigationProp<any>;
    handleLogout: () => Promise<void>;
};