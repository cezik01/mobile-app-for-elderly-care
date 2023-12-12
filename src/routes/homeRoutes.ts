// Import necessary components and types
import HomeScreen from 'screens/home/HomeScreen';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

type ScreenNames = 'Home';

export type RootStackParamList = {
  [key in ScreenNames]: undefined;
};

export type StackHomeNavigation = BottomTabNavigationProp<RootStackParamList>;

const homeRoutes: { name: keyof RootStackParamList; component: React.ComponentType<any>; }[] = [
  {
    name: 'Home',
    component: HomeScreen,
  },
];

export default homeRoutes;
