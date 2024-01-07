export interface ProfileHeaderProps {
    name: string;
    surname: string;
    city: string;
    onEditPress: () => void;
    onNotificationsPress: () => void;
    onMenuPress: () => void;
};