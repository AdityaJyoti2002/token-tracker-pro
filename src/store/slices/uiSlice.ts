import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TabType = 'new-pairs' | 'final-stretch' | 'migrated';
type SortField = 'price' | 'volume' | 'priceChange24h' | 'marketCap';
type SortDirection = 'asc' | 'desc';

interface UiState {
  activeTab: TabType;
  sortField: SortField;
  sortDirection: SortDirection;
  selectedTokenId: string | null;
}

const initialState: UiState = {
  activeTab: 'new-pairs',
  sortField: 'volume',
  sortDirection: 'desc',
  selectedTokenId: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<TabType>) => {
      state.activeTab = action.payload;
    },
    setSorting: (state, action: PayloadAction<{ field: SortField; direction: SortDirection }>) => {
      state.sortField = action.payload.field;
      state.sortDirection = action.payload.direction;
    },
    toggleSortDirection: (state, action: PayloadAction<SortField>) => {
      if (state.sortField === action.payload) {
        state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        state.sortField = action.payload;
        state.sortDirection = 'desc';
      }
    },
    setSelectedTokenId: (state, action: PayloadAction<string | null>) => {
      state.selectedTokenId = action.payload;
    },
  },
});

export const { setActiveTab, setSorting, toggleSortDirection, setSelectedTokenId } = uiSlice.actions;
export default uiSlice.reducer;
