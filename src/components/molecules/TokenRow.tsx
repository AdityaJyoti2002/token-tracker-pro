import React from 'react';
import { Token } from '@/types/token';
import { PriceCell } from '@/components/atoms/PriceCell';
import { ChangeCell } from '@/components/atoms/ChangeCell';
import { formatNumber, getTimeAgo } from '@/utils/format';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Users, Droplets, Clock } from 'lucide-react';

interface TokenRowProps {
  token: Token;
  onClick: () => void;
}

export const TokenRow = React.memo(({ token, onClick }: TokenRowProps) => {
  return (
    <div
      onClick={onClick}
      className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-4 p-4 rounded-lg glass hover:bg-secondary/50 cursor-pointer transition-all duration-200 hover:scale-[1.01] items-center"
    >
      {/* Token Info with Hover Card */}
      <HoverCard openDelay={200}>
        <HoverCardTrigger>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-primary-foreground">
              {token.symbol.slice(0, 2)}
            </div>
            <div>
              <div className="font-semibold">{token.symbol}</div>
              <div className="text-xs text-muted-foreground">{token.name}</div>
            </div>
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-80 glass border-border/50">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-lg">{token.symbol}</h4>
              <span className="text-sm text-muted-foreground">{token.name}</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Holders:</span>
                <span className="font-medium">{formatNumber(token.holders)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Liquidity:</span>
                <span className="font-medium">${formatNumber(token.liquidity)}</span>
              </div>
              <div className="flex items-center gap-2 col-span-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Created:</span>
                <span className="font-medium">{getTimeAgo(token.createdAt)}</span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>

      {/* Price */}
      <div className="text-right">
        <PriceCell price={token.price} direction={token.priceDirection} />
      </div>

      {/* 24h Change */}
      <div className="text-right">
        <ChangeCell value={token.priceChange24h} />
      </div>

      {/* Volume */}
      <div className="text-right">
        <div className="font-medium">${formatNumber(token.volume24h)}</div>
        <div className="text-xs text-muted-foreground">24h Vol</div>
      </div>

      {/* Market Cap */}
      <div className="text-right">
        <div className="font-medium">${formatNumber(token.marketCap)}</div>
        <div className="text-xs text-muted-foreground">MCap</div>
      </div>

      {/* Age */}
      <div className="text-right text-sm text-muted-foreground">
        {getTimeAgo(token.createdAt)}
      </div>
    </div>
  );
});

TokenRow.displayName = 'TokenRow';
