import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';
import {useDispatch} from 'react-redux';
import {logout} from '../store/slices/authSlice';
import {commonStyles, colors} from '../styles/theme';

const MainScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigation.replace('Auth');
  };

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>Home</Text>
      <Text style={commonStyles.subtitle}>You have successfully logged in!</Text>
      
      <TouchableOpacity style={commonStyles.button} onPress={handleLogout}>
        <Text style={commonStyles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MainScreen; 