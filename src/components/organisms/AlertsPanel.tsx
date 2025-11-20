import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { addAlert, removeAlert, toggleAlert, resetAlert } from '@/store/slices/alertsSlice';
import { Token } from '@/types/token';
import { Bell, Plus, Trash2, Power } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface AlertsPanelProps {
  tokens: Token[];
}

export const AlertsPanel = React.memo(({ tokens }: AlertsPanelProps) => {
  const dispatch = useDispatch();
  const alerts = useSelector((state: RootState) => state.alerts.alerts);
  
  const [open, setOpen] = useState(false);
  const [selectedTokenId, setSelectedTokenId] = useState<string>('');
  const [targetPrice, setTargetPrice] = useState<string>('');
  const [condition, setCondition] = useState<'above' | 'below'>('above');

  const handleCreateAlert = () => {
    if (!selectedTokenId || !targetPrice) return;

    const token = tokens.find(t => t.id === selectedTokenId);
    if (!token) return;

    dispatch(addAlert({
      tokenId: selectedTokenId,
      tokenSymbol: token.symbol,
      targetPrice: parseFloat(targetPrice),
      condition,
      enabled: true,
    }));

    // Reset form
    setSelectedTokenId('');
    setTargetPrice('');
    setOpen(false);
  };

  const activeAlerts = alerts.filter(a => a.enabled && !a.triggered);
  const triggeredAlerts = alerts.filter(a => a.triggered);

  return (
    <Card className="p-4 glass border-border/50">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-lg">Price Alerts</h3>
          {activeAlerts.length > 0 && (
            <Badge variant="default">{activeAlerts.length}</Badge>
          )}
        </div>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              New Alert
            </Button>
          </DialogTrigger>
          <DialogContent className="glass border-border/50">
            <DialogHeader>
              <DialogTitle>Create Price Alert</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Token</Label>
                <Select value={selectedTokenId} onValueChange={setSelectedTokenId}>
                  <SelectTrigger className="glass">
                    <SelectValue placeholder="Select a token" />
                  </SelectTrigger>
                  <SelectContent className="glass border-border/50 z-50">
                    {tokens.map(token => (
                      <SelectItem key={token.id} value={token.id}>
                        {token.symbol} - {token.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Condition</Label>
                <Select value={condition} onValueChange={(v) => setCondition(v as 'above' | 'below')}>
                  <SelectTrigger className="glass">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass border-border/50 z-50">
                    <SelectItem value="above">Price goes above</SelectItem>
                    <SelectItem value="below">Price goes below</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Target Price ($)</Label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(e.target.value)}
                  className="glass"
                />
              </div>

              <Button onClick={handleCreateAlert} className="w-full">
                Create Alert
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {alerts.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Bell className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>No price alerts set</p>
            <p className="text-sm">Create an alert to get notified when a token reaches your target price</p>
          </div>
        )}

        {alerts.map(alert => {
          const token = tokens.find(t => t.id === alert.tokenId);
          return (
            <div
              key={alert.id}
              className={cn(
                'flex items-center justify-between p-3 rounded-lg border transition-colors',
                alert.triggered ? 'bg-success/10 border-success/30' : 'bg-secondary/30 border-border/50',
                !alert.enabled && 'opacity-50'
              )}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{alert.tokenSymbol}</span>
                  <Badge variant={alert.triggered ? 'default' : 'secondary'} className="text-xs">
                    {alert.triggered ? 'Triggered' : alert.enabled ? 'Active' : 'Disabled'}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  {alert.condition === 'above' ? '>' : '<'} ${alert.targetPrice.toFixed(2)}
                  {token && ` (Current: $${token.price.toFixed(2)})`}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {alert.triggered && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => dispatch(resetAlert(alert.id))}
                  >
                    Reset
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => dispatch(toggleAlert(alert.id))}
                  className={cn(!alert.enabled && 'text-muted-foreground')}
                >
                  <Power className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => dispatch(removeAlert(alert.id))}
                  className="text-danger"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
});

AlertsPanel.displayName = 'AlertsPanel';
