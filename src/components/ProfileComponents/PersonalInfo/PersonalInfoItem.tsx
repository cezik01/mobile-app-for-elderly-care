import { View, Image, Text } from "react-native";
import { PersonalInfoItemProps } from "types/PersonalInfoItemProps";
import { styles } from "./styles";

const PersonalInfoItem = ({ icon, label }: PersonalInfoItemProps) => {
    return (
        <View style={styles.infoItem}>
            <Image source={icon} style={styles.icon} resizeMode="contain" />
            <Text style={styles.infoText}>{label}</Text>
        </View>
    );
};

export default PersonalInfoItem;