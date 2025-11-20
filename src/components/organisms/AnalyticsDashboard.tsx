import React from 'react';
import { Token } from '@/types/token';
import { calculateAnalytics } from '@/utils/analytics';
import { formatNumber, formatPercent } from '@/utils/format';
import { TrendingUp, TrendingDown, Activity, DollarSign } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { SparklineChart } from '@/components/atoms/SparklineChart';
import { Badge } from '@/components/ui/badge';

interface AnalyticsDashboardProps {
  tokens: Token[];
}

export const AnalyticsDashboard = React.memo(({ tokens }: AnalyticsDashboardProps) => {
  const analytics = calculateAnalytics(tokens);

  return (
    <div className="space-y-4">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 glass border-border/50">
          <div className="flex items-center gap-2 text-primary mb-2">
            <DollarSign className="h-4 w-4" />
            <span className="text-sm font-medium">Total 24h Volume</span>
          </div>
          <div className="text-2xl font-bold">${formatNumber(analytics.totalVolume)}</div>
        </Card>

        <Card className="p-4 glass border-border/50">
          <div className="flex items-center gap-2 text-primary mb-2">
            <Activity className="h-4 w-4" />
            <span className="text-sm font-medium">Average Change</span>
          </div>
          <div className="text-2xl font-bold">
            <span className={analytics.avgChange >= 0 ? 'text-success' : 'text-danger'}>
              {formatPercent(analytics.avgChange)}
            </span>
          </div>
        </Card>

        <Card className="p-4 glass border-border/50">
          <div className="flex items-center gap-2 text-primary mb-2">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm font-medium">Active Tokens</span>
          </div>
          <div className="text-2xl font-bold">{tokens.length}</div>
        </Card>
      </div>

      {/* Top Gainers & Losers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top Gainers */}
        <Card className="p-4 glass border-border/50">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-success" />
            <h3 className="font-semibold text-lg">Top Gainers</h3>
          </div>
          <div className="space-y-2">
            {analytics.topGainers.map((token, index) => (
              <div key={token.id} className="flex items-center justify-between p-3 rounded-lg bg-success/5 border border-success/20">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="w-6 h-6 flex items-center justify-center p-0">
                    {index + 1}
                  </Badge>
                  <div>
                    <div className="font-semibold">{token.symbol}</div>
                    <div className="text-xs text-muted-foreground">{token.name}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <SparklineChart trend="up" basePrice={token.price} change24h={token.priceChange24h} />
                  <div className="text-right">
                    <div className="font-semibold text-success">{formatPercent(token.priceChange24h)}</div>
                    <div className="text-xs text-muted-foreground">${formatNumber(token.volume24h)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Losers */}
        <Card className="p-4 glass border-border/50">
          <div className="flex items-center gap-2 mb-4">
            <TrendingDown className="h-5 w-5 text-danger" />
            <h3 className="font-semibold text-lg">Top Losers</h3>
          </div>
          <div className="space-y-2">
            {analytics.topLosers.map((token, index) => (
              <div key={token.id} className="flex items-center justify-between p-3 rounded-lg bg-danger/5 border border-danger/20">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="w-6 h-6 flex items-center justify-center p-0">
                    {index + 1}
                  </Badge>
                  <div>
                    <div className="font-semibold">{token.symbol}</div>
                    <div className="text-xs text-muted-foreground">{token.name}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <SparklineChart trend="down" basePrice={token.price} change24h={token.priceChange24h} />
                  <div className="text-right">
                    <div className="font-semibold text-danger">{formatPercent(token.priceChange24h)}</div>
                    <div className="text-xs text-muted-foreground">${formatNumber(token.volume24h)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
});

AnalyticsDashboard.displayName = 'AnalyticsDashboard';
