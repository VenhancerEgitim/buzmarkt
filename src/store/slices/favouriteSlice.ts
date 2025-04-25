import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from './cartSlice';

// Types
export type FavouriteItem = Omit<CartItem, 'quantity'>;

interface FavouriteState {
  items: FavouriteItem[];
}

// Initial state
const initialState: FavouriteState = {
  items: [],
};

// Slice
const favouriteSlice = createSlice({
  name: 'favourite',
  initialState,
  reducers: {
    addToFavourites: (state, action: PayloadAction<FavouriteItem>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (!existingItem) {
        state.items.push(action.payload);
      }
    },
    removeFromFavourites: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearFavourites: (state) => {
      state.items = [];
    },
    toggleFavourite: (state, action: PayloadAction<FavouriteItem>) => {
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (existingItemIndex > -1) {
        state.items.splice(existingItemIndex, 1);
      } else {
        state.items.push(action.payload);
      }
    },
  },
});

export const { addToFavourites, removeFromFavourites, clearFavourites, toggleFavourite } = favouriteSlice.actions;
export default favouriteSlice.reducer; 