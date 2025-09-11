
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { AppProvider } from './core/context/auth.provider';
import { BottomTabsNavigator } from './presentation/routes/BottomTabsNavigator';
import { LoginScreen } from './presentation/screens/auth/LoginScreen';

export type RootStackParams = {
  Login: undefined;
  Home: undefined;
}

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Login' component={ LoginScreen } options={{ gestureEnabled: false }} />
        <Stack.Screen name='Home' component={ BottomTabsNavigator } options={{ gestureEnabled: false }} />
      </Stack.Navigator>
    </AppProvider>
  )
}
