export interface Token {
  id: string;
  symbol: string;
  name: string;
  price: number;
  priceChange24h: number;
  volume24h: number;
  marketCap: number;
  liquidity: number;
  holders: number;
  category: 'new-pairs' | 'final-stretch' | 'migrated';
  logo?: string;
  priceDirection?: 'up' | 'down' | 'neutral';
  createdAt: string;
}
