import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation.types';
import BottomTabNavigator from './BottomTabNavigator';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import OrderAcceptedScreen from '../screens/OrderAcceptedScreen';
import SearchScreen from '../screens/SearchScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SplashScreen from '../screens/SplashScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import OrderFailedScreen from '../screens/OrderFailedScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="OrderAccepted" component={OrderAcceptedScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="OrderFailed" component={OrderFailedScreen} />
    </Stack.Navigator>
  );
};

export default RootStack; 