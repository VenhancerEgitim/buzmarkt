import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation.types';
import { addToCart } from '../store/slices/cartSlice';
import Icon from 'react-native-vector-icons/FontAwesome';

type FavouriteScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface FavouriteItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

const FavouriteScreen = () => {
  const navigation = useNavigation<FavouriteScreenNavigationProp>();
  const dispatch = useDispatch();
  const favouriteItems = useSelector((state: RootState) => state.favourite.items);

  const handleAddAllToCart = () => {
    favouriteItems.forEach((item: FavouriteItem) => {
      dispatch(addToCart({
        ...item,
        quantity: 1
      }));
    });
  };

  const renderItem = ({ item }: { item: FavouriteItem }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
    >
      <View style={styles.itemContent}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.name}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
          <Icon name="chevron-right" size={16} color="#53B175" />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Favourites</Text>
      </View>

      <FlatList
        data={favouriteItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />

      <TouchableOpacity
        style={styles.addAllButton}
        onPress={handleAddAllToCart}
      >
        <Text style={styles.addAllButtonText}>Add All To Cart</Text>
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 90,
  },
  itemContainer: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    paddingBottom: 16,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 16,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#181725',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#181725',
  },
  addAllButton: {
    position: 'absolute',
    bottom: 80,
    left: 16,
    right: 16,
    backgroundColor: '#53B175',
    padding: 16,
    borderRadius: 18,
    alignItems: 'center',
  },
  addAllButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default FavouriteScreen; 