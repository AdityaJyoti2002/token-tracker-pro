import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { websocketService } from '@/services/websocket';
import { updateTokenPrice } from '@/store/slices/tokensSlice';
import { Token } from '@/types/token';

/**
 * Hook to handle real-time price updates via WebSocket
 */
export function useRealtimeUpdates(tokens: Token[]) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (tokens.length === 0) return;

    // Subscribe to price updates
    const unsubscribe = websocketService.subscribe((tokenId, price, priceChange24h) => {
      dispatch(updateTokenPrice({ id: tokenId, price, priceChange24h }));
    });

    // Start WebSocket updates
    websocketService.start(tokens);

    // Cleanup on unmount
    return () => {
      unsubscribe();
      websocketService.stop();
    };
  }, [tokens, dispatch]);
}
