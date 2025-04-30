import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator, TextInput, Dimensions, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchProducts, fetchCategories, fetchProductsByCategory, setSelectedCategory } from '../store/slices/productSlice';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation.types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type ExploreScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;

const { width } = Dimensions.get('window');
const COLUMN_GAP = 16;
const NUM_COLUMNS = 2;
const ITEM_WIDTH = (width - (COLUMN_GAP * (NUM_COLUMNS + 1))) / NUM_COLUMNS;

const ALLOWED_CATEGORIES = ['clothes', 'electronics', 'furniture', 'shoes', 'miscellaneous'];

const ExploreScreen = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<ExploreScreenNavigationProp>();
  const { categories, loading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const filteredCategories = categories.filter(category => 
    ALLOWED_CATEGORIES.includes(category.name.toLowerCase())
  );

  const handleCategoryPress = (category: any) => {
    dispatch(setSelectedCategory(category));
    dispatch(fetchProductsByCategory(category.id));
    navigation.navigate('Search', { categoryId: category.id });
  };

  const handleSearchPress = () => {
    dispatch(setSelectedCategory(null));
    navigation.navigate('Search', { directSearch: true });
  };

  const renderCategoryItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.categoryCard}
      onPress={() => handleCategoryPress(item)}
    >
      <Image source={{ uri: item.image }} style={styles.categoryImage} />
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Explore</Text>
      </View>

      <TouchableOpacity 
        style={styles.searchContainer}
        onPress={handleSearchPress}
      >
        <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
        <Text style={styles.searchPlaceholder}>Search Store</Text>
      </TouchableOpacity>

      <FlatList
        data={filteredCategories}
        renderItem={renderCategoryItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.categoriesContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 16,
    height: 48,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 16,
    color: '#999',
  },
  categoriesContainer: {
    padding: COLUMN_GAP,
  },
  categoryCard: {
    width: ITEM_WIDTH,
    margin: COLUMN_GAP / 2,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
    backgroundColor: '#F5F5F5',
  },
  categoryImage: {
    width: ITEM_WIDTH * 0.6,
    height: ITEM_WIDTH * 0.6,
    resizeMode: 'contain',
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default ExploreScreen; 