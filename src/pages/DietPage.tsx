import React, { useState, useCallback } from 'react';
import DietForm from '../components/DietForm';

const DietPage = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Callback to refresh when new data is added
  const handleDataUpdate = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
    // Trigger a global refresh event
    window.dispatchEvent(new CustomEvent('dashboardRefresh'));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 animate-in fade-in duration-1500">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center space-y-4 animate-in slide-in-from-top duration-1200">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-fitness-calories to-accent bg-clip-text text-transparent">
              Log Your Meal
            </h1>
            <p className="text-lg text-muted-foreground">
              Track your meals and calories to maintain a healthy diet and reach your nutrition goals.
            </p>
          </div>
          <div className="animate-in slide-in-from-bottom duration-1200 delay-600">
            <DietForm onDietAdded={handleDataUpdate} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DietPage;
