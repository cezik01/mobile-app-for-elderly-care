import { RouteProp } from "@react-navigation/native";
import { HelpScreenRouteParams } from "types/navigation/HelpScreenRouteParams";

export type HelpScreenProps = {
    route: RouteProp<{ params: HelpScreenRouteParams }, 'params'>;
};