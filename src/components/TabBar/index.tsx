import { FontAwesome } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import { HOME_NAV } from 'common/constants/navigations';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { TabBarButtonProbs } from '../../types/TabBarProps';
import { styles } from './styles';

const handleTabBarIcon = (name: string, focused: boolean) => {
  switch (name) {
    case HOME_NAV.HOME:
      return (
        <FontAwesome name="home" size={24} color={focused ? 'black' : 'grey'} />
      );
    default:
      return null;
  }
};

const TabBarButton = ({ name, onPress, focused }: TabBarButtonProbs) => {
  return (
    <TouchableOpacity onPress={() => onPress()} style={styles.buttonContainer}>
      {handleTabBarIcon(name, focused)}
    </TouchableOpacity>
  );
};

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  return (
    <View style={styles.tabBar}>
      {state.routes.map(
        (
          route: { key: string | number; name: string },
          index: React.Key | null | undefined,
        ) => {
          const { options } = descriptors[route.key];
          const name: string =
            (options.tabBarLabel as string) || options.title || route.name;
          const focused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key.toString(),
              canPreventDefault: true,
            });

            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
          return (
            <TabBarButton
              key={index}
              name={name}
              onPress={onPress}
              focused={focused}
            />
          );
        },
      )}
    </View>
  );
};

export default TabBar;
