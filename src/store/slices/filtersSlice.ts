import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
  searchQuery: string;
  priceRange: {
    min: number | null;
    max: number | null;
  };
  volumeRange: {
    min: number | null;
    max: number | null;
  };
  changeRange: {
    min: number | null;
    max: number | null;
  };
}

const initialState: FiltersState = {
  searchQuery: '',
  priceRange: { min: null, max: null },
  volumeRange: { min: null, max: null },
  changeRange: { min: null, max: null },
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<{ min: number | null; max: number | null }>) => {
      state.priceRange = action.payload;
    },
    setVolumeRange: (state, action: PayloadAction<{ min: number | null; max: number | null }>) => {
      state.volumeRange = action.payload;
    },
    setChangeRange: (state, action: PayloadAction<{ min: number | null; max: number | null }>) => {
      state.changeRange = action.payload;
    },
    clearFilters: (state) => {
      state.searchQuery = '';
      state.priceRange = { min: null, max: null };
      state.volumeRange = { min: null, max: null };
      state.changeRange = { min: null, max: null };
    },
  },
});

export const { setSearchQuery, setPriceRange, setVolumeRange, setChangeRange, clearFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
