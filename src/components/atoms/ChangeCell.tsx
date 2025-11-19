import React from 'react';
import { formatPercent } from '@/utils/format';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChangeCellProps {
  value: number;
}

export const ChangeCell = React.memo(({ value }: ChangeCellProps) => {
  const isPositive = value >= 0;

  return (
    <div className={cn(
      'flex items-center gap-1 font-medium',
      isPositive ? 'text-success' : 'text-danger'
    )}>
      {isPositive ? (
        <TrendingUp className="h-4 w-4" />
      ) : (
        <TrendingDown className="h-4 w-4" />
      )}
      <span>{formatPercent(value)}</span>
    </div>
  );
});

ChangeCell.displayName = 'ChangeCell';
