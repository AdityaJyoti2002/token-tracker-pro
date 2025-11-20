import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setTokens, setLoading, setError } from '@/store/slices/tokensSlice';
import { setSearchQuery, setPriceRange, setVolumeRange, setChangeRange, clearFilters } from '@/store/slices/filtersSlice';
import { useTokenData } from '@/hooks/useTokenData';
import { useSortedTokens } from '@/hooks/useSortedTokens';
import { useFilteredTokens } from '@/hooks/useFilteredTokens';
import { useRealtimeUpdates } from '@/hooks/useRealtimeUpdates';
import { useAlertMonitoring } from '@/hooks/useAlertMonitoring';
import { TabSwitcher } from '@/components/organisms/TabSwitcher';
import { TokenTable } from '@/components/organisms/TokenTable';
import { AnalyticsDashboard } from '@/components/organisms/AnalyticsDashboard';
import { AlertsPanel } from '@/components/organisms/AlertsPanel';
import { SearchBar } from '@/components/molecules/SearchBar';
import { FilterPanel } from '@/components/molecules/FilterPanel';
import { LoadingSkeleton } from '@/components/atoms/LoadingSkeleton';
import { Activity, AlertCircle, BarChart3 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Index = () => {
  const dispatch = useDispatch();
  const { tokens, loading, error } = useSelector((state: RootState) => state.tokens);
  const filters = useSelector((state: RootState) => state.filters);
  const { data, isLoading, isError, error: queryError, refetch } = useTokenData();
  
  const [showAnalytics, setShowAnalytics] = useState(false);

  // Update Redux store when data changes
  useEffect(() => {
    if (data) {
      dispatch(setTokens(data));
    }
  }, [data, dispatch]);

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  useEffect(() => {
    if (isError) {
      dispatch(setError(queryError?.message || 'Failed to fetch tokens'));
    }
  }, [isError, queryError, dispatch]);

  // Apply filters and sorting
  const filteredTokens = useFilteredTokens(tokens);
  const sortedTokens = useSortedTokens(filteredTokens);

  // Enable real-time price updates
  useRealtimeUpdates(tokens);
  
  // Monitor price alerts
  useAlertMonitoring(tokens);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 glass sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Activity className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Token Tracker
                </h1>
                <p className="text-sm text-muted-foreground">
                  Real-time crypto token monitoring
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/20">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-sm font-medium text-success">Live</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Analytics Toggle */}
          <div className="flex items-center gap-2">
            <Button
              variant={showAnalytics ? 'default' : 'outline'}
              onClick={() => setShowAnalytics(!showAnalytics)}
              className="gap-2"
            >
              <BarChart3 className="h-4 w-4" />
              Analytics
            </Button>
          </div>

          {/* Analytics Dashboard */}
          {showAnalytics && !loading && (
            <AnalyticsDashboard tokens={tokens} />
          )}

          {/* Alerts Panel */}
          {!loading && <AlertsPanel tokens={tokens} />}

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <SearchBar
              value={filters.searchQuery}
              onChange={(value) => dispatch(setSearchQuery(value))}
            />
            <div className="flex items-center gap-2">
              <FilterPanel
                priceRange={filters.priceRange}
                volumeRange={filters.volumeRange}
                changeRange={filters.changeRange}
                onPriceRangeChange={(range) => dispatch(setPriceRange(range))}
                onVolumeRangeChange={(range) => dispatch(setVolumeRange(range))}
                onChangeRangeChange={(range) => dispatch(setChangeRange(range))}
                onClear={() => dispatch(clearFilters())}
              />
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center justify-between">
            <TabSwitcher tokens={filteredTokens} />
            <div className="text-sm text-muted-foreground">
              {sortedTokens.length} token{sortedTokens.length !== 1 ? 's' : ''} found
            </div>
          </div>

          {/* Error State */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="flex items-center justify-between">
                <span>{error}</span>
                <button
                  onClick={() => refetch()}
                  className="text-sm underline hover:no-underline"
                >
                  Retry
                </button>
              </AlertDescription>
            </Alert>
          )}

          {/* Loading State */}
          {loading && <LoadingSkeleton />}

          {/* Token Table */}
          {!loading && !error && <TokenTable tokens={sortedTokens} />}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>Real-time updates powered by WebSocket • Data refreshes every 20s</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
