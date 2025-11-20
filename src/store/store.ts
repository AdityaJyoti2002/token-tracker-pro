import { configureStore } from '@reduxjs/toolkit';
import tokensReducer from './slices/tokensSlice';
import uiReducer from './slices/uiSlice';
import alertsReducer from './slices/alertsSlice';
import filtersReducer from './slices/filtersSlice';

export const store = configureStore({
  reducer: {
    tokens: tokensReducer,
    ui: uiReducer,
    alerts: alertsReducer,
    filters: filtersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
