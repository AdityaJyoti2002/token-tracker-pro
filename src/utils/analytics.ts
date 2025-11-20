import { Token } from '@/types/token';

export interface TokenAnalytics {
  topGainers: Token[];
  topLosers: Token[];
  mostActive: Token[];
  totalVolume: number;
  avgChange: number;
}

/**
 * Calculate analytics from token data
 */
export function calculateAnalytics(tokens: Token[]): TokenAnalytics {
  if (tokens.length === 0) {
    return {
      topGainers: [],
      topLosers: [],
      mostActive: [],
      totalVolume: 0,
      avgChange: 0,
    };
  }

  // Sort by 24h change for gainers/losers
  const sortedByChange = [...tokens].sort((a, b) => b.priceChange24h - a.priceChange24h);
  const topGainers = sortedByChange.slice(0, 5);
  const topLosers = sortedByChange.slice(-5).reverse();

  // Sort by volume for most active
  const mostActive = [...tokens].sort((a, b) => b.volume24h - a.volume24h).slice(0, 5);

  // Calculate totals
  const totalVolume = tokens.reduce((sum, token) => sum + token.volume24h, 0);
  const avgChange = tokens.reduce((sum, token) => sum + token.priceChange24h, 0) / tokens.length;

  return {
    topGainers,
    topLosers,
    mostActive,
    totalVolume,
    avgChange,
  };
}
