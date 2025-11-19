import { useMemo } from 'react';
import { Token } from '@/types/token';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

/**
 * Hook to get filtered and sorted tokens based on active tab and sort settings
 */
export function useSortedTokens(tokens: Token[]) {
  const { activeTab, sortField, sortDirection } = useSelector((state: RootState) => state.ui);

  return useMemo(() => {
    // Filter by active tab
    const filtered = tokens.filter(token => token.category === activeTab);

    // Sort by selected field
    const sorted = [...filtered].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      // Handle numeric comparisons
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }

      // Fallback to string comparison
      return 0;
    });

    return sorted;
  }, [tokens, activeTab, sortField, sortDirection]);
}
