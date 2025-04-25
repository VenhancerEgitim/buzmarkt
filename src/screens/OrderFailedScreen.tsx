import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation.types';
import Icon from 'react-native-vector-icons/FontAwesome';

type OrderFailedScreenProps = {
  visible: boolean;
  onClose: () => void;
  onTryAgain: () => void;
};

const OrderFailedScreen: React.FC<OrderFailedScreenProps> = ({ visible, onClose, onTryAgain }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon name="times" size={24} color="#000" />
          </TouchableOpacity>

          <View style={styles.imageContainer}>
            <Icon name="shopping-bag" size={50} color="#53B175" />
          </View>

          <Text style={styles.title}>Oops! Order Failed</Text>
          <Text style={styles.subtitle}>Something went terribly wrong.</Text>

          <TouchableOpacity 
            style={styles.tryAgainButton}
            onPress={onTryAgain}
          >
            <Text style={styles.tryAgainText}>Please Try Again</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.navigate('MainTabs', { screen: 'Explore' })}
          >
            <Text style={styles.backButtonText}>Back to home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    padding: 8,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#7C7C7C',
    textAlign: 'center',
    marginBottom: 32,
  },
  tryAgainButton: {
    backgroundColor: '#53B175',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 20,
    width: '100%',
    marginBottom: 16,
  },
  tryAgainText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  backButton: {
    paddingVertical: 8,
  },
  backButtonText: {
    color: '#181725',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default OrderFailedScreen; 