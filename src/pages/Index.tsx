import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setTokens, setLoading, setError } from '@/store/slices/tokensSlice';
import { useTokenData } from '@/hooks/useTokenData';
import { useSortedTokens } from '@/hooks/useSortedTokens';
import { useRealtimeUpdates } from '@/hooks/useRealtimeUpdates';
import { TabSwitcher } from '@/components/organisms/TabSwitcher';
import { TokenTable } from '@/components/organisms/TokenTable';
import { LoadingSkeleton } from '@/components/atoms/LoadingSkeleton';
import { Activity, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Index = () => {
  const dispatch = useDispatch();
  const { tokens, loading, error } = useSelector((state: RootState) => state.tokens);
  const { data, isLoading, isError, error: queryError, refetch } = useTokenData();

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

  // Get sorted tokens based on active tab and sort settings
  const sortedTokens = useSortedTokens(tokens);

  // Enable real-time price updates
  useRealtimeUpdates(tokens);

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
          {/* Tab Switcher */}
          <div className="flex items-center justify-between">
            <TabSwitcher tokens={tokens} />
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
