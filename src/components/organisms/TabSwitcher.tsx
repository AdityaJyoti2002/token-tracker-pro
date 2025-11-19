import React from 'react';
import { TabButton } from '@/components/molecules/TabButton';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setActiveTab } from '@/store/slices/uiSlice';
import { Token } from '@/types/token';
import { Flame, Rocket, CheckCircle2 } from 'lucide-react';

interface TabSwitcherProps {
  tokens: Token[];
}

export const TabSwitcher = React.memo(({ tokens }: TabSwitcherProps) => {
  const dispatch = useDispatch();
  const { activeTab } = useSelector((state: RootState) => state.ui);

  const tabs = [
    {
      id: 'new-pairs' as const,
      label: 'New Pairs',
      icon: <Flame className="h-4 w-4" />,
      count: tokens.filter(t => t.category === 'new-pairs').length,
    },
    {
      id: 'final-stretch' as const,
      label: 'Final Stretch',
      icon: <Rocket className="h-4 w-4" />,
      count: tokens.filter(t => t.category === 'final-stretch').length,
    },
    {
      id: 'migrated' as const,
      label: 'Migrated',
      icon: <CheckCircle2 className="h-4 w-4" />,
      count: tokens.filter(t => t.category === 'migrated').length,
    },
  ];

  return (
    <div className="flex gap-2 p-2 rounded-lg bg-secondary/30 w-fit">
      {tabs.map(tab => (
        <TabButton
          key={tab.id}
          active={activeTab === tab.id}
          onClick={() => dispatch(setActiveTab(tab.id))}
          count={tab.count}
        >
          {tab.icon}
          {tab.label}
        </TabButton>
      ))}
    </div>
  );
});

TabSwitcher.displayName = 'TabSwitcher';
