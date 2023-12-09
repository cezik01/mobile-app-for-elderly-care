import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import AppNavigation from 'navigations/AppNavigation';
import { UserProvider } from './src/context/UserContext';

export default function App() {
  return (
    <NativeBaseProvider>
      <UserProvider> 
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
      </UserProvider>
    </NativeBaseProvider>
  );
}
