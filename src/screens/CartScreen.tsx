import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Platform, Dimensions, Modal } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { removeFromCart, updateQuantity, clearCart } from '../store/slices/cartSlice';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation.types';

const { width } = Dimensions.get('window');

type CartScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const CartScreen = () => {
  const navigation = useNavigation<CartScreenNavigationProp>();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch<AppDispatch>();
  const [isCheckoutVisible, setIsCheckoutVisible] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handlePlaceOrder = () => {
    dispatch(clearCart());
    setIsCheckoutVisible(false);
    navigation.navigate('OrderAccepted');
  };

  const CheckoutModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isCheckoutVisible}
      onRequestClose={() => setIsCheckoutVisible(false)}
    >
      <TouchableOpacity 
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={() => setIsCheckoutVisible(false)}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Checkout</Text>
            <TouchableOpacity onPress={() => setIsCheckoutVisible(false)}>
              <Icon name="times" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.checkoutOption}>
            <Text style={styles.optionLabel}>Delivery</Text>
            <View style={styles.optionRight}>
              <Text style={styles.optionValue}>Select Method</Text>
              <Icon name="chevron-right" size={16} color="#999" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.checkoutOption}>
            <Text style={styles.optionLabel}>Payment</Text>
            <View style={styles.optionRight}>
              <Icon name="credit-card" size={20} color="#53B175" />
              <Icon name="chevron-right" size={16} color="#999" style={{ marginLeft: 8 }} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.checkoutOption}>
            <Text style={styles.optionLabel}>Promo Code</Text>
            <View style={styles.optionRight}>
              <Text style={styles.optionValue}>Pick discount</Text>
              <Icon name="chevron-right" size={16} color="#999" />
            </View>
          </TouchableOpacity>

          <View style={styles.checkoutOption}>
            <Text style={styles.optionLabel}>Total Cost</Text>
            <View style={styles.optionRight}>
              <Text style={styles.totalCost}>${total.toFixed(2)}</Text>
              <Icon name="chevron-right" size={16} color="#999" />
            </View>
          </View>

          <Text style={styles.termsText}>
            By placing an order you agree to our{' '}
            <Text style={styles.termsLink}>Terms</Text> And{' '}
            <Text style={styles.termsLink}>Conditions</Text>
          </Text>

          <TouchableOpacity 
            style={styles.testErrorLink}
            onPress={() => {
              setIsCheckoutVisible(false);
              navigation.navigate('OrderFailed');
            }}
          >
            <Text style={styles.testErrorText}>hata testi</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.placeOrderButton}
            onPress={handlePlaceOrder}
          >
            <Text style={styles.placeOrderText}>Place Order</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.cartItem}>
      <View style={styles.itemRow}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.name}</Text>
        </View>
        <TouchableOpacity 
          onPress={() => handleRemoveItem(item.id)}
          style={styles.removeButton}
        >
          <Icon name="times" size={20} color="#999" />
        </TouchableOpacity>
      </View>
      <View style={styles.itemBottom}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity 
            onPress={() => handleUpdateQuantity(item.id, item.quantity - 1)}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity 
            onPress={() => handleUpdateQuantity(item.id, item.quantity + 1)}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>My Cart</Text>
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyCart}>
          <Icon name="shopping-cart" size={64} color="#ccc" />
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.cartList}
          />
          <View style={[styles.bottomContainer, { bottom: insets.bottom + 60 }]}>
            <TouchableOpacity 
              style={styles.checkoutButton}
              onPress={() => setIsCheckoutVisible(true)}
            >
              <Text style={styles.checkoutButtonText}>Go to Checkout</Text>
              <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      <CheckoutModal />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 10 : 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  cartList: {
    padding: 16,
    paddingBottom: 120,
  },
  cartItem: {
    marginBottom: 20,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  itemUnit: {
    fontSize: 14,
    color: '#999',
  },
  itemBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 8,
  },
  quantityButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 20,
    color: '#666',
  },
  quantity: {
    marginHorizontal: 12,
    fontSize: 16,
    fontWeight: '600',
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    padding: 8,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  bottomContainer: {
    position: 'absolute',
    left: 16,
    right: 16,
  },
  checkoutButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#53B175',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  totalAmount: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 18,
    color: '#666',
    marginTop: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 16,
    paddingBottom: 32,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  checkoutOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionLabel: {
    fontSize: 16,
    color: '#666',
  },
  optionRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionValue: {
    fontSize: 16,
    color: '#999',
    marginRight: 8,
  },
  totalCost: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#53B175',
    marginRight: 8,
  },
  termsText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  termsLink: {
    color: '#53B175',
    textDecorationLine: 'underline',
  },
  placeOrderButton: {
    backgroundColor: '#53B175',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  placeOrderText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  testErrorLink: {
    alignSelf: 'center',
    marginBottom: 12,
  },
  testErrorText: {
    color: '#FF4B4B',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default CartScreen; 