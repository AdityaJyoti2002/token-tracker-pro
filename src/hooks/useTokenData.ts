import { useQuery } from '@tanstack/react-query';
import { Token } from '@/types/token';

/**
 * Mock API call to fetch tokens
 */
async function fetchTokens(): Promise<Token[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Generate mock data
  const categories: Token['category'][] = ['new-pairs', 'final-stretch', 'migrated'];
  const symbols = ['PEPE', 'WOJAK', 'DOGE', 'SHIB', 'FLOKI', 'BONK', 'BRETT', 'MOG', 'WIF', 'POPCAT'];
  
  return Array.from({ length: 30 }, (_, i) => ({
    id: `token-${i}`,
    symbol: symbols[i % symbols.length] + (i > 9 ? i : ''),
    name: `${symbols[i % symbols.length]} Token ${i > 9 ? i : ''}`,
    price: Math.random() * 10,
    priceChange24h: (Math.random() - 0.5) * 50,
    volume24h: Math.random() * 10000000,
    marketCap: Math.random() * 50000000,
    liquidity: Math.random() * 5000000,
    holders: Math.floor(Math.random() * 10000),
    category: categories[i % 3],
    createdAt: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    priceDirection: 'neutral',
  }));
}

/**
 * Hook to fetch and manage token data with React Query
 */
export function useTokenData() {
  return useQuery({
    queryKey: ['tokens'],
    queryFn: fetchTokens,
    refetchInterval: 20000, // Auto-refresh every 20 seconds
    staleTime: 15000,
  });
}
