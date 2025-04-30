import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface FilterState {
  categories: FilterOption[];
  brands: FilterOption[];
  loading: boolean;
  error: string | null;
}

interface FilterOption {
  id: string;
  name: string;
  isSelected: boolean;
}

const initialState: FilterState = {
  categories: [],
  brands: [],
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk(
  'filter/fetchCategories',
  async () => {
    const response = await axios.get('https://api.escuelajs.co/api/v1/categories');
    return response.data.map((category: any) => ({
      id: category.id.toString(),
      name: category.name,
      isSelected: false,
    }));
  }
);

export const fetchBrands = createAsyncThunk(
  'filter/fetchBrands',
  async () => {
    // Simüle edilmiş API çağrısı - gerçek API endpoint'iniz ile değiştirin
    const brands = [
      { id: '1', name: 'Individual Collection' },
      { id: '2', name: 'Cocola' },
      { id: '3', name: 'Ifad' },
      { id: '4', name: 'Kazi Farmas' },
    ];
    return brands.map(brand => ({
      ...brand,
      isSelected: false,
    }));
  }
);

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    toggleCategory: (state, action) => {
      const category = state.categories.find(c => c.id === action.payload);
      if (category) {
        category.isSelected = !category.isSelected;
      }
    },
    toggleBrand: (state, action) => {
      const brand = state.brands.find(b => b.id === action.payload);
      if (brand) {
        brand.isSelected = !brand.isSelected;
      }
    },
    resetFilters: (state) => {
      state.categories.forEach(category => category.isSelected = false);
      state.brands.forEach(brand => brand.isSelected = false);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Kategoriler yüklenirken bir hata oluştu';
      })
      .addCase(fetchBrands.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Markalar yüklenirken bir hata oluştu';
      });
  },
});

export const { toggleCategory, toggleBrand, resetFilters } = filterSlice.actions;
export default filterSlice.reducer; 