import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation.types';
import SplashScreen from '../screens/SplashScreen';
import AuthNavigator from './AuthNavigator';
import MainScreen from '../screens/MainScreen';
import BottomTabNavigator from './BottomTabNavigator';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import SearchScreen from '../screens/SearchScreen';
import OrderAcceptedScreen from '../screens/OrderAcceptedScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Auth" component={AuthNavigator} />
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen 
        name="OrderAccepted" 
        component={OrderAcceptedScreen}
        options={{
          presentation: 'fullScreenModal',
          animation: 'slide_from_bottom'
        }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator; 