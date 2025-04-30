import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../types/navigation.types';
import ExploreScreen from '../screens/ExploreScreen';
import CartScreen from '../screens/CartScreen';
import FavouriteScreen from '../screens/FavouriteScreen';
import AccountScreen from '../screens/AccountScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Platform, View } from 'react-native';

const Tab = createBottomTabNavigator<MainTabParamList>();

const BottomTabNavigator = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
            height: Platform.OS === 'ios' ? 100 : 75,
            paddingBottom: Platform.OS === 'ios' ? 30 : 12,
            paddingTop: 0,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
        },
        tabBarActiveTintColor: '#FF6B6B',
        tabBarInactiveTintColor: '#8E8E93',
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: '500',
            marginBottom: Platform.OS === 'ios' ? 0 : 4,
            marginTop: -4,
          },
          tabBarItemStyle: {
            paddingVertical: 0,
            marginTop: 8,
          },
        }}>
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarLabel: 'Explore',
            tabBarIcon: ({ color, size }) => (
              <Icon name="search" size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarLabel: 'Cart',
            tabBarIcon: ({ color, size }) => (
              <Icon name="shopping-cart" size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favourite"
        component={FavouriteScreen}
        options={{
          tabBarLabel: 'Favourite',
            tabBarIcon: ({ color, size }) => (
              <Icon name="heart" size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarLabel: 'Account',
            tabBarIcon: ({ color, size }) => (
              <Icon name="user" size={28} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
    </View>
  );
};

export default BottomTabNavigator; 