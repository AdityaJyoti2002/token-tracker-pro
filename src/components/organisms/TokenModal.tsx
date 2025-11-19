import React from 'react';
import { Token } from '@/types/token';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { PriceCell } from '@/components/atoms/PriceCell';
import { ChangeCell } from '@/components/atoms/ChangeCell';
import { formatNumber, getTimeAgo } from '@/utils/format';
import { TrendingUp, Users, Droplets, DollarSign, BarChart3, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TokenModalProps {
  token: Token | null;
  open: boolean;
  onClose: () => void;
}

export const TokenModal = React.memo(({ token, open, onClose }: TokenModalProps) => {
  if (!token) return null;

  const stats = [
    { label: 'Market Cap', value: `$${formatNumber(token.marketCap)}`, icon: DollarSign },
    { label: '24h Volume', value: `$${formatNumber(token.volume24h)}`, icon: BarChart3 },
    { label: 'Liquidity', value: `$${formatNumber(token.liquidity)}`, icon: Droplets },
    { label: 'Holders', value: formatNumber(token.holders), icon: Users },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl glass border-border/50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-2xl text-primary-foreground">
              {token.symbol.slice(0, 2)}
            </div>
            <div>
              <div className="text-2xl font-bold">{token.symbol}</div>
              <div className="text-sm text-muted-foreground">{token.name}</div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Price Section */}
          <div className="p-6 rounded-lg bg-secondary/50 border border-border/50">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Current Price</div>
                <div className="text-3xl font-bold">
                  <PriceCell price={token.price} direction={token.priceDirection} />
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground mb-1">24h Change</div>
                <div className="text-2xl">
                  <ChangeCell value={token.priceChange24h} />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="capitalize">
                {token.category.replace('-', ' ')}
              </Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-3 w-3" />
                Created {getTimeAgo(token.createdAt)}
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="p-4 rounded-lg glass border border-border/50">
                <div className="flex items-center gap-2 text-primary mb-2">
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{label}</span>
                </div>
                <div className="text-xl font-bold">{value}</div>
              </div>
            ))}
          </div>

          {/* Chart Placeholder */}
          <div className="p-6 rounded-lg glass border border-border/50 h-48 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <TrendingUp className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Price chart would be displayed here</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
});

TokenModal.displayName = 'TokenModal';
