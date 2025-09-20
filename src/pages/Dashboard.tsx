import React, { useState, useCallback, useEffect } from 'react';
import Dashboard from '../components/Dashboard';
import MotivationalCard from '../components/MotivationalCard';

const DashboardPage = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [dailyStats, setDailyStats] = useState({
    caloriesBurned: 0,
    caloriesConsumed: 0,
    workouts: 0,
    weight: 0
  });

  // Callback to refresh dashboard when new data is added
  const handleDataUpdate = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

  // Listen for global refresh events from other pages
  useEffect(() => {
    const handleGlobalRefresh = () => {
      setRefreshTrigger(prev => prev + 1);
    };

    window.addEventListener('dashboardRefresh', handleGlobalRefresh);
    return () => window.removeEventListener('dashboardRefresh', handleGlobalRefresh);
  }, []);

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="space-y-6">
        <Dashboard 
          refreshTrigger={refreshTrigger} 
          onStatsUpdate={setDailyStats}
        />
        <MotivationalCard dailyStats={dailyStats} />
      </div>
    </div>
  );
};

export default DashboardPage;
