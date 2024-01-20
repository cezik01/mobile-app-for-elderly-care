import { RouteProp } from "@react-navigation/native";
import { ProfileEditScreenRouteParams } from "types/navigation/ProfileEditScreenRouteParams";

export type ProfileEditScreenProps = {
    route: RouteProp<{ params: ProfileEditScreenRouteParams }, 'params'>;
};