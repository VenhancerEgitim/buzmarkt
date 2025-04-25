import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation.types';
import Icon from 'react-native-vector-icons/FontAwesome';

type OrderAcceptedScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const OrderAcceptedScreen = () => {
  const navigation = useNavigation<OrderAcceptedScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.successCircle}>
          <View style={styles.checkCircle}>
            <Icon name="check" size={40} color="#fff" />
          </View>
          <View style={styles.confetti}>
            <View style={[styles.confettiPiece, styles.confettiRed]} />
            <View style={[styles.confettiPiece, styles.confettiBlue]} />
            <View style={[styles.confettiPiece, styles.confettiYellow]} />
            <View style={[styles.confettiPiece, styles.confettiPurple]} />
            <View style={[styles.confettiPiece, styles.confettiOrange]} />
          </View>
        </View>

        <Text style={styles.title}>Your Order has been accepted</Text>
        <Text style={styles.subtitle}>
          Your items has been placed and is on{'\n'}it's way to being processed
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.trackButton}
            onPress={() => {/* Track Order logic */}}
          >
            <Text style={styles.trackButtonText}>Track Order</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate('MainTabs')}
          >
            <Text style={styles.backButtonText}>Back to home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  successCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#53B175',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  checkCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#53B175',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  confetti: {
    position: 'absolute',
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confettiPiece: {
    position: 'absolute',
    width: 8,
    height: 20,
    borderRadius: 4,
  },
  confettiRed: {
    backgroundColor: '#FF5252',
    transform: [{ rotate: '45deg' }, { translateX: 80 }],
  },
  confettiBlue: {
    backgroundColor: '#448AFF',
    transform: [{ rotate: '-45deg' }, { translateX: -80 }],
  },
  confettiYellow: {
    backgroundColor: '#FFD740',
    transform: [{ rotate: '135deg' }, { translateY: 80 }],
  },
  confettiPurple: {
    backgroundColor: '#E040FB',
    transform: [{ rotate: '-135deg' }, { translateY: -80 }],
  },
  confettiOrange: {
    backgroundColor: '#FF6E40',
    transform: [{ rotate: '90deg' }, { translateX: 60 }, { translateY: 60 }],
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#7C7C7C',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  trackButton: {
    backgroundColor: '#53B175',
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: 'center',
  },
  trackButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  backButton: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#181725',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default OrderAcceptedScreen; 