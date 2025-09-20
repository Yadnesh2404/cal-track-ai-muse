import React from 'react';
import { Button } from '@/components/ui/button';
import { Dumbbell, Utensils, Scale, BarChart3 } from 'lucide-react';

const Navigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'workout', label: 'Log Workout', icon: Dumbbell },
    { id: 'diet', label: 'Log Diet', icon: Utensils },
    { id: 'weight', label: 'Log Weight', icon: Scale },
  ];

  return (
    <nav className="flex flex-wrap gap-2 p-1 bg-muted rounded-lg">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "ghost"}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 ${
              activeTab === tab.id 
                ? 'fitness-gradient text-white fitness-glow' 
                : 'hover:bg-background'
            }`}
          >
            <Icon className="h-4 w-4" />
            <span className="hidden sm:inline">{tab.label}</span>
          </Button>
        );
      })}
    </nav>
  );
};

export default Navigation;