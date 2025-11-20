import { useMemo } from 'react';
import { Token } from '@/types/token';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

/**
 * Hook to filter tokens based on search and filter criteria
 */
export function useFilteredTokens(tokens: Token[]) {
  const filters = useSelector((state: RootState) => state.filters);

  return useMemo(() => {
    return tokens.filter(token => {
      // Search filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesSearch = 
          token.symbol.toLowerCase().includes(query) ||
          token.name.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Price range filter
      if (filters.priceRange.min !== null && token.price < filters.priceRange.min) {
        return false;
      }
      if (filters.priceRange.max !== null && token.price > filters.priceRange.max) {
        return false;
      }

      // Volume range filter
      if (filters.volumeRange.min !== null && token.volume24h < filters.volumeRange.min) {
        return false;
      }
      if (filters.volumeRange.max !== null && token.volume24h > filters.volumeRange.max) {
        return false;
      }

      // Change range filter
      if (filters.changeRange.min !== null && token.priceChange24h < filters.changeRange.min) {
        return false;
      }
      if (filters.changeRange.max !== null && token.priceChange24h > filters.changeRange.max) {
        return false;
      }

      return true;
    });
  }, [tokens, filters]);
}
