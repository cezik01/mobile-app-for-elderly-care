import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import appRoutes from 'routes/appRoutes';
import CaregiverProfileScreen from '../screens/profiles/CaregiverProfileScreen';
import PatientProfileScreen from '../screens/profiles/PatientProfileScreen';


const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <Stack.Navigator initialRouteName="Registration">
      {appRoutes.map((route, index) => (
        <Stack.Screen
          key={index}
          name={route.name}
          component={route.component}
        />
      ))}
      
    </Stack.Navigator>
    
  );
}
