import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PriceAlert } from '@/types/alert';

interface AlertsState {
  alerts: PriceAlert[];
}

// Load alerts from localStorage
const loadAlerts = (): PriceAlert[] => {
  try {
    const stored = localStorage.getItem('priceAlerts');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

// Save alerts to localStorage
const saveAlerts = (alerts: PriceAlert[]) => {
  try {
    localStorage.setItem('priceAlerts', JSON.stringify(alerts));
  } catch (error) {
    console.error('Failed to save alerts:', error);
  }
};

const initialState: AlertsState = {
  alerts: loadAlerts(),
};

const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    addAlert: (state, action: PayloadAction<Omit<PriceAlert, 'id' | 'createdAt' | 'triggered'>>) => {
      const newAlert: PriceAlert = {
        ...action.payload,
        id: `alert-${Date.now()}-${Math.random()}`,
        createdAt: new Date().toISOString(),
        triggered: false,
      };
      state.alerts.push(newAlert);
      saveAlerts(state.alerts);
    },
    removeAlert: (state, action: PayloadAction<string>) => {
      state.alerts = state.alerts.filter(a => a.id !== action.payload);
      saveAlerts(state.alerts);
    },
    toggleAlert: (state, action: PayloadAction<string>) => {
      const alert = state.alerts.find(a => a.id === action.payload);
      if (alert) {
        alert.enabled = !alert.enabled;
        alert.triggered = false;
        saveAlerts(state.alerts);
      }
    },
    markAlertTriggered: (state, action: PayloadAction<string>) => {
      const alert = state.alerts.find(a => a.id === action.payload);
      if (alert) {
        alert.triggered = true;
        saveAlerts(state.alerts);
      }
    },
    resetAlert: (state, action: PayloadAction<string>) => {
      const alert = state.alerts.find(a => a.id === action.payload);
      if (alert) {
        alert.triggered = false;
        saveAlerts(state.alerts);
      }
    },
  },
});

export const { addAlert, removeAlert, toggleAlert, markAlertTriggered, resetAlert } = alertsSlice.actions;
export default alertsSlice.reducer;
