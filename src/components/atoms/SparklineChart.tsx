import React, { useMemo } from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface SparklineChartProps {
  trend: 'up' | 'down';
  basePrice: number;
  change24h: number;
}

/**
 * Generate mock price history data based on current price and 24h change
 */
const generatePriceHistory = (basePrice: number, change24h: number) => {
  const points = 24;
  const data = [];
  
  // Calculate the starting price 24 hours ago
  const startPrice = basePrice / (1 + change24h / 100);
  
  for (let i = 0; i < points; i++) {
    // Create a somewhat realistic price curve
    const progress = i / (points - 1);
    const randomFactor = (Math.random() - 0.5) * 0.05; // ±5% random variation
    const price = startPrice + (basePrice - startPrice) * progress + startPrice * randomFactor;
    data.push({ price });
  }
  
  return data;
};

export const SparklineChart = React.memo(({ trend, basePrice, change24h }: SparklineChartProps) => {
  const data = useMemo(() => generatePriceHistory(basePrice, change24h), [basePrice, change24h]);
  const color = trend === 'up' ? 'hsl(var(--success))' : 'hsl(var(--danger))';

  return (
    <ResponsiveContainer width={80} height={30}>
      <LineChart data={data}>
        <Line
          type="monotone"
          dataKey="price"
          stroke={color}
          strokeWidth={1.5}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
});

SparklineChart.displayName = 'SparklineChart';
