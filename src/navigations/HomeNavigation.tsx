import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationProp } from '@react-navigation/native';
import TabBar from 'components/TabBar/TabBar';
import homeRoutes from 'routes/homeRoutes';

export type ScreenNames = ['Home'];
export type RootStackParamList = Record<ScreenNames[number], any>;

export type StackHomeNavigation = NavigationProp<RootStackParamList>;

const Tab = createBottomTabNavigator<RootStackParamList>();

export default function HomeNavigation() {
  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      tabBar={props => <TabBar {...props} />}
      screenOptions={{
        headerShown: true,
        tabBarVisibilityAnimationConfig: {
          show: {
            animation: 'timing',
            config: {
              duration: 300,
            },
          },
          hide: {
            animation: 'timing',
            config: {
              duration: 300,
            },
          },
        },
      }}>
     {homeRoutes.map((item, index) => (
  <Tab.Screen name={item.name} component={item.component} key={index} />
))}
    </Tab.Navigator>
  );
}
