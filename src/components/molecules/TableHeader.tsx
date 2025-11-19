import React from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

type SortField = 'price' | 'volume' | 'priceChange24h' | 'marketCap';
type SortDirection = 'asc' | 'desc';

interface TableHeaderProps {
  label: string;
  field: SortField;
  currentField: SortField;
  direction: SortDirection;
  onSort: (field: SortField) => void;
  className?: string;
}

export const TableHeader = React.memo(({
  label,
  field,
  currentField,
  direction,
  onSort,
  className
}: TableHeaderProps) => {
  const isActive = currentField === field;

  return (
    <button
      onClick={() => onSort(field)}
      className={cn(
        'flex items-center gap-2 font-semibold text-muted-foreground hover:text-foreground transition-colors',
        isActive && 'text-primary',
        className
      )}
    >
      {label}
      {isActive ? (
        direction === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
      ) : (
        <ArrowUpDown className="h-4 w-4 opacity-40" />
      )}
    </button>
  );
});

TableHeader.displayName = 'TableHeader';
