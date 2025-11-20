import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { markAlertTriggered } from '@/store/slices/alertsSlice';
import { Token } from '@/types/token';
import { toast } from 'sonner';

/**
 * Hook to monitor price alerts and trigger notifications
 */
export function useAlertMonitoring(tokens: Token[]) {
  const dispatch = useDispatch();
  const alerts = useSelector((state: RootState) => state.alerts.alerts);

  useEffect(() => {
    // Request notification permission on mount
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    // Check each alert against current token prices
    alerts.forEach(alert => {
      if (!alert.enabled || alert.triggered) return;

      const token = tokens.find(t => t.id === alert.tokenId);
      if (!token) return;

      const isTriggered = 
        (alert.condition === 'above' && token.price >= alert.targetPrice) ||
        (alert.condition === 'below' && token.price <= alert.targetPrice);

      if (isTriggered) {
        dispatch(markAlertTriggered(alert.id));

        // Show toast notification
        const message = `${alert.tokenSymbol} is now ${alert.condition} $${alert.targetPrice.toFixed(2)}!`;
        toast.success('Price Alert Triggered!', {
          description: message,
          duration: 10000,
        });

        // Show browser notification if permitted
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('Token Tracker - Price Alert', {
            body: message,
            icon: '/favicon.ico',
            tag: alert.id,
          });
        }
      }
    });
  }, [tokens, alerts, dispatch]);
}
