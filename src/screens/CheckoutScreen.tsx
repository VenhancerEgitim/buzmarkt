import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation.types';

type Props = StackScreenProps<RootStackParamList, 'Checkout'>;

const CheckoutScreen: React.FC<Props> = ({ navigation }) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const total = useSelector((state: RootState) => state.cart.total);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.closeButton}>×</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Checkout</Text>
      </View>

      <ScrollView style={styles.content}>
        <TouchableOpacity style={styles.section}>
          <View>
            <Text style={styles.sectionTitle}>Delivery</Text>
          </View>
          <View style={styles.sectionRight}>
            <Text style={styles.sectionValue}>Select Method</Text>
            <Text style={styles.arrow}>→</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.section}>
          <View>
            <Text style={styles.sectionTitle}>Payment</Text>
          </View>
          <View style={styles.sectionRight}>
            <Text style={styles.cardInfo}>💳</Text>
            <Text style={styles.arrow}>→</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.section}>
          <View>
            <Text style={styles.sectionTitle}>Promo Code</Text>
          </View>
          <View style={styles.sectionRight}>
            <Text style={styles.sectionValue}>Pick discount</Text>
            <Text style={styles.arrow}>→</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.section}>
          <View>
            <Text style={styles.sectionTitle}>Total Cost</Text>
          </View>
          <View style={styles.sectionRight}>
            <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
            <Text style={styles.arrow}>→</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>
            By placing an order you agree to our{' '}
            <Text style={styles.termsLink}>Terms</Text> And{' '}
            <Text style={styles.termsLink}>Conditions</Text>
          </Text>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.placeOrderButton}>
        <Text style={styles.placeOrderButtonText}>Place Order</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  closeButton: {
    fontSize: 32,
    color: '#000',
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  sectionTitle: {
    fontSize: 16,
  },
  sectionRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionValue: {
    fontSize: 16,
    color: '#666',
    marginRight: 8,
  },
  cardInfo: {
    fontSize: 16,
    marginRight: 8,
  },
  arrow: {
    fontSize: 16,
    color: '#666',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  termsContainer: {
    padding: 16,
  },
  termsText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  termsLink: {
    color: '#4CAF50',
  },
  placeOrderButton: {
    margin: 16,
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  placeOrderButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CheckoutScreen; 