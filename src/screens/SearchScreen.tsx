import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image, ActivityIndicator, Modal, SafeAreaView } from 'react-native';
import { SafeAreaView as SafeAreaViewRN } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation.types';
import { RootState, AppDispatch } from '../store';
import Icon from 'react-native-vector-icons/FontAwesome';
import { fetchProducts } from '../store/slices/productSlice';
import { fetchCategories, fetchBrands, toggleCategory, toggleBrand, resetFilters } from '../store/slices/filterSlice';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Props = StackScreenProps<RootStackParamList, 'Search'>;

type SearchScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SearchScreen: React.FC<Props> = ({ route, navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading: productsLoading, error: productsError } = useSelector((state: RootState) => state.products);
  const { categories, brands, loading: filtersLoading } = useSelector((state: RootState) => state.filter);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchBrands());
  }, [dispatch]);

  useEffect(() => {
    if (route.params?.directSearch) {
      dispatch(fetchProducts());
    }
  }, [dispatch, route.params?.directSearch]);

  const handleApplyFilters = () => {
    // Burada seçili filtrelere göre ürünleri filtreleme mantığı eklenebilir
    setIsFilterVisible(false);
  };

  const renderProduct = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', { productId: item.id.toString() })}
    >
      <Image source={{ uri: item.images[0] }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
      </View>
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => handleAddToCart(item)}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const handleAddToCart = (product: any) => {
    dispatch(addToCart({
      id: product.id.toString(),
      name: product.title,
      price: product.price,
      quantity: 1,
      image: product.images[0]
    }));
  };

  const FilterModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isFilterVisible}
      onRequestClose={() => setIsFilterVisible(false)}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setIsFilterVisible(false)}>
              <Icon name="times" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Filters</Text>
            <TouchableOpacity onPress={() => dispatch(resetFilters())}>
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>
          </View>

          {filtersLoading ? (
            <ActivityIndicator size="large" color="#53B175" style={styles.loader} />
          ) : (
            <>
              <View style={styles.filterSection}>
                <Text style={styles.sectionTitle}>Categories</Text>
                {categories.map(category => (
                  <TouchableOpacity
                    key={category.id}
                    style={styles.filterOption}
                    onPress={() => dispatch(toggleCategory(category.id))}
                  >
                    <View style={[
                      styles.checkbox,
                      category.isSelected && styles.checkboxSelected
                    ]}>
                      {category.isSelected && (
                        <Icon name="check" size={12} color="#fff" />
                      )}
                    </View>
                    <Text style={[
                      styles.optionText,
                      category.isSelected && styles.optionTextSelected
                    ]}>{category.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.filterSection}>
                <Text style={styles.sectionTitle}>Brand</Text>
                {brands.map(brand => (
                  <TouchableOpacity
                    key={brand.id}
                    style={styles.filterOption}
                    onPress={() => dispatch(toggleBrand(brand.id))}
                  >
                    <View style={[
                      styles.checkbox,
                      brand.isSelected && styles.checkboxSelected
                    ]}>
                      {brand.isSelected && (
                        <Icon name="check" size={12} color="#fff" />
                      )}
                    </View>
                    <Text style={[
                      styles.optionText,
                      brand.isSelected && styles.optionTextSelected
                    ]}>{brand.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}

          <TouchableOpacity
            style={styles.applyButton}
            onPress={handleApplyFilters}
          >
            <Text style={styles.applyButtonText}>Apply Filter</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );

  if (productsLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#53B175" />
      </View>
    );
  }

  if (productsError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{productsError}</Text>
      </View>
    );
  }

  return (
    <SafeAreaViewRN style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color="#000" />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#7C7C7C" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Store"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setIsFilterVisible(true)}
        >
          <Icon name="sliders" size={20} color="#7C7C7C" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={products.filter(product => 
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        )}
        renderItem={renderProduct}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.productList}
      />

      <FilterModal />
    </SafeAreaViewRN>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F3F2',
    borderRadius: 15,
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    height: 45,
    fontSize: 16,
    color: '#181725',
  },
  filterButton: {
    width: 45,
    height: 45,
    backgroundColor: '#F2F3F2',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productList: {
    padding: 8,
  },
  productCard: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  addButton: {
    width: 30,
    height: 30,
    backgroundColor: '#4CAF50',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 8,
    right: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#181725',
  },
  filterSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#181725',
    marginBottom: 16,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E2E2E2',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#53B175',
    borderColor: '#53B175',
  },
  optionText: {
    fontSize: 16,
    color: '#181725',
  },
  optionTextSelected: {
    color: '#53B175',
  },
  applyButton: {
    backgroundColor: '#53B175',
    padding: 16,
    borderRadius: 18,
    alignItems: 'center',
    marginTop: 'auto',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  resetText: {
    color: '#53B175',
    fontSize: 16,
    fontWeight: '500',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchScreen; 