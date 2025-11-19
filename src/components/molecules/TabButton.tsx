import React from 'react';
import { cn } from '@/lib/utils';

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  count?: number;
}

export const TabButton = React.memo(({ active, onClick, children, count }: TabButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'relative px-6 py-3 rounded-lg font-medium transition-all duration-300',
        'hover:bg-secondary/50',
        active && 'bg-primary text-primary-foreground shadow-lg'
      )}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {count !== undefined && (
          <span className={cn(
            'px-2 py-0.5 rounded-full text-xs font-bold',
            active ? 'bg-primary-foreground/20' : 'bg-muted'
          )}>
            {count}
          </span>
        )}
      </span>
      {active && (
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary to-primary/80 animate-pulse" />
      )}
    </button>
  );
});

TabButton.displayName = 'TabButton';
