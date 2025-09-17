
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { AppProvider } from './core/context/auth.provider';
import { BottomTabsNavigator } from './presentation/routes/BottomTabsNavigator';
import { LoginScreen } from './presentation/screens/auth/LoginScreen';
import { ProductDetailScreen } from './presentation/screens/products/ProductDetailScreen';

export type RootStackParams = {
  Login: undefined;
  Home: undefined;
  ProductDetail: { id: number }
}

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Login' component={ LoginScreen } options={{ gestureEnabled: false, headerShown: false }} />
        <Stack.Screen name='Home' component={ BottomTabsNavigator } options={{ title:'', gestureEnabled: false }} />
        <Stack.Screen name='ProductDetail' component={ ProductDetailScreen } options={{ title: '', headerBackButtonDisplayMode: 'minimal' }}/>
      </Stack.Navigator>
    </AppProvider>
  )
}
