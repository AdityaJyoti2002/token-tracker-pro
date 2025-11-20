export interface PriceAlert {
  id: string;
  tokenId: string;
  tokenSymbol: string;
  targetPrice: number;
  condition: 'above' | 'below';
  enabled: boolean;
  triggered: boolean;
  createdAt: string;
}
