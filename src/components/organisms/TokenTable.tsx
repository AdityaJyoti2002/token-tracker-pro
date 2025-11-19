import React from 'react';
import { Token } from '@/types/token';
import { TokenRow } from '@/components/molecules/TokenRow';
import { TableHeader } from '@/components/molecules/TableHeader';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { toggleSortDirection, setSelectedTokenId } from '@/store/slices/uiSlice';
import { TokenModal } from './TokenModal';

interface TokenTableProps {
  tokens: Token[];
}

export const TokenTable = React.memo(({ tokens }: TokenTableProps) => {
  const dispatch = useDispatch();
  const { sortField, sortDirection, selectedTokenId } = useSelector((state: RootState) => state.ui);

  const selectedToken = tokens.find(t => t.id === selectedTokenId) || null;

  const handleSort = (field: 'price' | 'volume' | 'priceChange24h' | 'marketCap') => {
    dispatch(toggleSortDirection(field));
  };

  const handleRowClick = (tokenId: string) => {
    dispatch(setSelectedTokenId(tokenId));
  };

  const handleCloseModal = () => {
    dispatch(setSelectedTokenId(null));
  };

  return (
    <>
      <div className="space-y-2">
        {/* Table Header */}
        <div className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-4 px-4 py-2 text-sm">
          <div>Token</div>
          <div className="text-right">
            <TableHeader
              label="Price"
              field="price"
              currentField={sortField}
              direction={sortDirection}
              onSort={handleSort}
            />
          </div>
          <div className="text-right">
            <TableHeader
              label="24h %"
              field="priceChange24h"
              currentField={sortField}
              direction={sortDirection}
              onSort={handleSort}
            />
          </div>
          <div className="text-right">
            <TableHeader
              label="Volume"
              field="volume"
              currentField={sortField}
              direction={sortDirection}
              onSort={handleSort}
            />
          </div>
          <div className="text-right">
            <TableHeader
              label="Market Cap"
              field="marketCap"
              currentField={sortField}
              direction={sortDirection}
              onSort={handleSort}
            />
          </div>
          <div className="text-right">Age</div>
        </div>

        {/* Table Rows */}
        <div className="space-y-2">
          {tokens.map((token, index) => (
            <div
              key={token.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <TokenRow token={token} onClick={() => handleRowClick(token.id)} />
            </div>
          ))}
        </div>

        {tokens.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No tokens found in this category
          </div>
        )}
      </div>

      <TokenModal token={selectedToken} open={!!selectedTokenId} onClose={handleCloseModal} />
    </>
  );
});

TokenTable.displayName = 'TokenTable';
