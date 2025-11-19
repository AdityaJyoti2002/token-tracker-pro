import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Token } from '@/types/token';

interface TokensState {
  tokens: Token[];
  loading: boolean;
  error: string | null;
}

const initialState: TokensState = {
  tokens: [],
  loading: false,
  error: null,
};

const tokensSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<Token[]>) => {
      state.tokens = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateTokenPrice: (state, action: PayloadAction<{ id: string; price: number; priceChange24h: number }>) => {
      const token = state.tokens.find(t => t.id === action.payload.id);
      if (token) {
        const oldPrice = token.price;
        token.price = action.payload.price;
        token.priceChange24h = action.payload.priceChange24h;
        token.priceDirection = action.payload.price > oldPrice ? 'up' : action.payload.price < oldPrice ? 'down' : 'neutral';
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setTokens, updateTokenPrice, setLoading, setError } = tokensSlice.actions;
export default tokensSlice.reducer;
