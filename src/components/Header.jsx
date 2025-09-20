import React from 'react';
import { Activity, Bell, Settings, User, Home, BarChart3, Dumbbell, Utensils, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = ({ dailyStats }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const hasActivity = dailyStats && (dailyStats.workouts > 0 || dailyStats.caloriesConsumed > 0);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/' },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, path: '/dashboard' },
    { id: 'workout', label: 'Workouts', icon: Dumbbell, path: '/workout' },
    { id: 'diet', label: 'Nutrition', icon: Utensils, path: '/diet' },
    { id: 'weight', label: 'Weight', icon: Scale, path: '/weight' },
  ];

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Brand Section */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="fitness-gradient p-2 rounded-lg fitness-glow">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                CalTrack
              </h1>
              <p className="text-sm text-muted-foreground">
                Your personal health & fitness companion
              </p>
            </div>
          </div>

          {/* Horizontal Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-muted/50 rounded-lg p-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-2 px-3 py-2 ${
                    isActive 
                      ? 'fitness-gradient text-white' 
                      : 'hover:bg-background'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Button>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Mobile Menu - Show nav items on mobile */}
            <div className="md:hidden flex items-center gap-1">
              {navItems.slice(1, 4).map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Button
                    key={item.id}
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(item.path)}
                    className={`p-2 ${isActive ? 'text-primary' : ''}`}
                  >
                    <Icon className="h-4 w-4" />
                  </Button>
                );
              })}
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              {hasActivity && (
                <Badge className="absolute -top-1 -right-1 h-2 w-2 p-0 bg-primary"></Badge>
              )}
            </Button>

            {/* Settings */}
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>

            {/* Profile */}
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;