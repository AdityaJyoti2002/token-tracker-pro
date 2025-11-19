import { Token } from '@/types/token';

type PriceUpdateCallback = (tokenId: string, price: number, priceChange24h: number) => void;

/**
 * Mock WebSocket service for real-time price updates
 * Simulates price changes every 1-2 seconds with realistic volatility
 */
class WebSocketService {
  private intervals: Map<string, NodeJS.Timeout> = new Map();
  private callbacks: PriceUpdateCallback[] = [];

  /**
   * Subscribe to price updates
   */
  subscribe(callback: PriceUpdateCallback): () => void {
    this.callbacks.push(callback);
    return () => {
      this.callbacks = this.callbacks.filter(cb => cb !== callback);
    };
  }

  /**
   * Start price updates for tokens
   */
  start(tokens: Token[]): void {
    this.stop(); // Clear any existing intervals

    tokens.forEach(token => {
      const interval = setInterval(() => {
        // Random price change between -5% and +5%
        const changePercent = (Math.random() - 0.5) * 10;
        const newPrice = token.price * (1 + changePercent / 100);
        
        // Update 24h change slightly
        const new24hChange = token.priceChange24h + (Math.random() - 0.5) * 2;

        // Notify all subscribers
        this.callbacks.forEach(callback => {
          callback(token.id, newPrice, new24hChange);
        });

        // Update local reference for next calculation
        token.price = newPrice;
        token.priceChange24h = new24hChange;
      }, Math.random() * 1000 + 1000); // Random interval between 1-2 seconds

      this.intervals.set(token.id, interval);
    });
  }

  /**
   * Stop all price updates
   */
  stop(): void {
    this.intervals.forEach(interval => clearInterval(interval));
    this.intervals.clear();
  }
}

export const websocketService = new WebSocketService();
