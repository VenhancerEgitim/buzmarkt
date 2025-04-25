import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation.types';

type WelcomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const WelcomeScreen = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Welcome{'\n'}to our store</Text>
          <Text style={styles.subtitle}>Get your groceries in as fast as one hour</Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 30,
    paddingTop: 60,
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 30,
  },
  title: {
    fontSize: 48,
    fontWeight: '600',
    color: '#181725',
    textAlign: 'center',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 16,
    color: '#7C7C7C',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#53B175',
    marginHorizontal: 20,
    height: 67,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default WelcomeScreen; 