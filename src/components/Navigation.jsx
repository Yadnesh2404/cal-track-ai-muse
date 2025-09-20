import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dumbbell, Utensils, Scale, BarChart3, TrendingUp } from 'lucide-react';

const Navigation = ({ activeTab, setActiveTab, dailyStats }) => {
  const tabs = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: BarChart3,
      description: 'Overview & Analytics'
    },
    { 
      id: 'workout', 
      label: 'Workouts', 
      icon: Dumbbell,
      description: 'Log Exercise',
      badge: dailyStats?.workouts > 0 ? dailyStats.workouts : null
    },
    { 
      id: 'diet', 
      label: 'Nutrition', 
      icon: Utensils,
      description: 'Track Meals',
      badge: dailyStats?.caloriesConsumed > 0 ? `${dailyStats.caloriesConsumed}cal` : null
    },
    { 
      id: 'weight', 
      label: 'Weight', 
      icon: Scale,
      description: 'Monitor Progress',
      badge: dailyStats?.weight > 0 ? `${dailyStats.weight}kg` : null
    },
  ];

  return (
    <div className="space-y-4">
      {/* Quick Stats Bar */}
      <div className="flex items-center justify-between p-4 bg-card/50 rounded-lg border border-border">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <span className="font-medium">Today's Progress</span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground">Workouts:</span>
            <Badge variant="secondary">{dailyStats?.workouts || 0}</Badge>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground">Calories:</span>
            <Badge variant="secondary">{dailyStats?.caloriesConsumed || 0}</Badge>
          </div>
          {dailyStats?.weight > 0 && (
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground">Weight:</span>
              <Badge variant="secondary">{dailyStats.weight}kg</Badge>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Navigation */}
      <nav className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <Button
              key={tab.id}
              variant={isActive ? "default" : "outline"}
              onClick={() => setActiveTab(tab.id)}
              className={`relative h-auto p-4 flex flex-col items-center gap-2 transition-all duration-300 ${
                isActive 
                  ? 'fitness-gradient text-white fitness-glow border-primary' 
                  : 'hover:bg-card hover:border-primary/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <Icon className="h-5 w-5" />
                {tab.badge && (
                  <Badge 
                    variant={isActive ? "secondary" : "outline"} 
                    className="text-xs px-1.5 py-0.5"
                  >
                    {tab.badge}
                  </Badge>
                )}
              </div>
              <div className="text-center">
                <div className="font-medium text-sm">{tab.label}</div>
                <div className={`text-xs ${isActive ? 'text-white/80' : 'text-muted-foreground'}`}>
                  {tab.description}
                </div>
              </div>
            </Button>
          );
        })}
      </nav>
    </div>
  );
};

export default Navigation;