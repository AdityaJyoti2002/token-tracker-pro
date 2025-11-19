import React, { useEffect, useState } from 'react';
import { formatPrice } from '@/utils/format';
import { cn } from '@/lib/utils';

interface PriceCellProps {
  price: number;
  direction?: 'up' | 'down' | 'neutral';
}

export const PriceCell = React.memo(({ price, direction }: PriceCellProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (direction && direction !== 'neutral') {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 600);
      return () => clearTimeout(timer);
    }
  }, [price, direction]);

  return (
    <span
      className={cn(
        'font-mono font-medium transition-colors duration-300',
        isAnimating && direction === 'up' && 'price-increase text-success',
        isAnimating && direction === 'down' && 'price-decrease text-danger',
        !isAnimating && 'text-foreground'
      )}
    >
      {formatPrice(price)}
    </span>
  );
});

PriceCell.displayName = 'PriceCell';
