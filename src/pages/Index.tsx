import React, { useState, useCallback } from 'react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Dashboard from '../components/Dashboard';
import WorkoutForm from '../components/WorkoutForm';
import DietForm from '../components/DietForm';
import WeightForm from '../components/WeightForm';
import MotivationalCard from '../components/MotivationalCard';
import Footer from '../components/Footer';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
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

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <Dashboard 
              refreshTrigger={refreshTrigger} 
              onStatsUpdate={setDailyStats}
            />
            <MotivationalCard dailyStats={dailyStats} />
          </div>
        );
      case 'workout':
        return <WorkoutForm onWorkoutAdded={handleDataUpdate} />;
      case 'diet':
        return <DietForm onDietAdded={handleDataUpdate} />;
      case 'weight':
        return <WeightForm onWeightAdded={handleDataUpdate} />;
      default:
        return <Dashboard refreshTrigger={refreshTrigger} />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header dailyStats={dailyStats} />
      
      <main className="container mx-auto px-4 py-6 space-y-6 flex-1">
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} dailyStats={dailyStats} />
        
        <div className="animate-in fade-in-50 duration-500">
          {renderContent()}
        </div>
      </main>
      
      <Footer />
      
      {/* Background gradient for visual appeal */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-background via-background to-primary/5" />
    </div>
  );
};

export default Index;
