import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { Provider as PaperProvider } from 'react-native-paper';
import AppNavigation from 'navigations/AppNavigation';
import { UserProvider } from './src/context/UserContext';

export default function App() {
  return (
    <NativeBaseProvider>
      <PaperProvider>
        <UserProvider> 
          <NavigationContainer>
            <AppNavigation />
          </NavigationContainer>
        </UserProvider>
      </PaperProvider>
    </NativeBaseProvider>
  );
}
