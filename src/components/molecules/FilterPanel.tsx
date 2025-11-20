import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, SlidersHorizontal } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';

interface FilterPanelProps {
  priceRange: { min: number | null; max: number | null };
  volumeRange: { min: number | null; max: number | null };
  changeRange: { min: number | null; max: number | null };
  onPriceRangeChange: (range: { min: number | null; max: number | null }) => void;
  onVolumeRangeChange: (range: { min: number | null; max: number | null }) => void;
  onChangeRangeChange: (range: { min: number | null; max: number | null }) => void;
  onClear: () => void;
}

export const FilterPanel = React.memo(({
  priceRange,
  volumeRange,
  changeRange,
  onPriceRangeChange,
  onVolumeRangeChange,
  onChangeRangeChange,
  onClear,
}: FilterPanelProps) => {
  const activeFilterCount = [
    priceRange.min !== null || priceRange.max !== null,
    volumeRange.min !== null || volumeRange.max !== null,
    changeRange.min !== null || changeRange.max !== null,
  ].filter(Boolean).length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="glass border-border/50 relative">
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters
          {activeFilterCount > 0 && (
            <Badge variant="default" className="ml-2 px-1.5 py-0 h-5 text-xs">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 glass border-border/50 z-50" align="end">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">Filters</h4>
            {activeFilterCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClear}
                className="h-auto p-1 text-xs"
              >
                Clear all
              </Button>
            )}
          </div>

          {/* Price Range */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Price Range ($)</Label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={priceRange.min ?? ''}
                onChange={(e) => onPriceRangeChange({
                  ...priceRange,
                  min: e.target.value ? parseFloat(e.target.value) : null,
                })}
                className="glass"
              />
              <Input
                type="number"
                placeholder="Max"
                value={priceRange.max ?? ''}
                onChange={(e) => onPriceRangeChange({
                  ...priceRange,
                  max: e.target.value ? parseFloat(e.target.value) : null,
                })}
                className="glass"
              />
            </div>
          </div>

          {/* Volume Range */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">24h Volume ($)</Label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={volumeRange.min ?? ''}
                onChange={(e) => onVolumeRangeChange({
                  ...volumeRange,
                  min: e.target.value ? parseFloat(e.target.value) : null,
                })}
                className="glass"
              />
              <Input
                type="number"
                placeholder="Max"
                value={volumeRange.max ?? ''}
                onChange={(e) => onVolumeRangeChange({
                  ...volumeRange,
                  max: e.target.value ? parseFloat(e.target.value) : null,
                })}
                className="glass"
              />
            </div>
          </div>

          {/* Change Range */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">24h Change (%)</Label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={changeRange.min ?? ''}
                onChange={(e) => onChangeRangeChange({
                  ...changeRange,
                  min: e.target.value ? parseFloat(e.target.value) : null,
                })}
                className="glass"
              />
              <Input
                type="number"
                placeholder="Max"
                value={changeRange.max ?? ''}
                onChange={(e) => onChangeRangeChange({
                  ...changeRange,
                  max: e.target.value ? parseFloat(e.target.value) : null,
                })}
                className="glass"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
});

FilterPanel.displayName = 'FilterPanel';
