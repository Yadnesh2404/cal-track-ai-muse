import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, subDays, isToday } from 'date-fns';
import { Activity, Flame, Scale, Target } from 'lucide-react';

const Dashboard = ({ refreshTrigger, onStatsUpdate }) => {
  const [dashboardData, setDashboardData] = useState({
    dailySummary: {
      totalCaloriesConsumed: 0,
      totalCaloriesBurned: 0,
      totalWorkouts: 0,
      currentWeight: 0
    },
    caloriesChart: [],
    workoutsChart: [],
    weightChart: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [refreshTrigger]);

  useEffect(() => {
    console.log('Dashboard data updated:', dashboardData);
  }, [dashboardData]);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      console.log('Fetching dashboard data...');
      
      // Test individual table queries to identify the problem
      console.log('Testing workouts table...');
      const workoutsRes = await supabase.from('workouts').select('*');
      console.log('Workouts query result:', workoutsRes);
      
      console.log('Testing diet table...');
      const dietRes = await supabase.from('diet').select('*');
      console.log('Diet query result:', dietRes);
      
      console.log('Testing weight table...');
      const weightRes = await supabase.from('weight').select('*').order('id', { ascending: true });
      console.log('Weight query result:', weightRes);

      if (workoutsRes.error) {
        console.error('Workouts fetch error:', workoutsRes.error);
        // Don't throw error, continue with empty data
      }
      if (dietRes.error) {
        console.error('Diet fetch error:', dietRes.error);
        // Don't throw error, continue with empty data
      }
      if (weightRes.error) {
        console.error('Weight fetch error:', weightRes.error);
        // Don't throw error, continue with empty data
      }

      const workouts = workoutsRes.data || [];
      const diet = dietRes.data || [];
      const weights = weightRes.data || [];

      console.log('=== DATA PROCESSING ===');
      console.log('Total records found:');
      console.log('- Workouts:', workouts.length);
      console.log('- Diet:', diet.length);
      console.log('- Weight:', weights.length);

      // Show actual data structure
      if (workouts.length > 0) {
        console.log('First workout record:', workouts[0]);
        console.log('Workout table columns:', Object.keys(workouts[0]));
      } else {
        console.log('No workout records found');
      }
      
      if (diet.length > 0) {
        console.log('First diet record:', diet[0]);
        console.log('Diet table columns:', Object.keys(diet[0]));
      } else {
        console.log('No diet records found');
      }
      
      if (weights.length > 0) {
        console.log('First weight record:', weights[0]);
        console.log('Weight table columns:', Object.keys(weights[0]));
      } else {
        console.log('No weight records found');
      }

      // Calculate daily summary (ALL data for now to debug)
      const dailySummary = {
        totalCaloriesConsumed: diet.reduce((sum, meal) => sum + (meal.calories || 0), 0),
        totalCaloriesBurned: workouts.reduce((sum, workout) => sum + (workout.calories || 0), 0),
        totalWorkouts: workouts.length,
        currentWeight: weights.length > 0 ? parseFloat(weights[weights.length - 1].weight) || 0 : 0
      };

      // Debug weight specifically
      if (weights.length > 0) {
        console.log('Weight debug - Latest weight entry:', weights[0]);
        console.log('Weight value:', weights[0].weight);
        console.log('Parsed weight:', parseFloat(weights[0].weight));
      }

      console.log('=== CALCULATIONS ===');
      console.log('Daily summary calculated:', dailySummary);

      // Simple chart data using all available data
      const caloriesChart = [
        {
          date: 'Total',
          caloriesIn: diet.reduce((sum, meal) => sum + (meal.calories || 0), 0),
          caloriesOut: workouts.reduce((sum, workout) => sum + (workout.calories || 0), 0)
        }
      ];

      // Create workouts per day chart - group by date if created_at exists
      const workoutsChart = workouts.length > 0 ? (() => {
        if (workouts[0].created_at) {
          // Group workouts by date
          const workoutsByDate = workouts.reduce((acc, workout) => {
            const date = new Date(workout.created_at).toLocaleDateString();
            acc[date] = (acc[date] || 0) + 1;
            return acc;
          }, {});
          
          return Object.entries(workoutsByDate).map(([date, count]) => ({
            date,
            workouts: count,
            calories: workouts
              .filter(w => new Date(w.created_at).toLocaleDateString() === date)
              .reduce((sum, w) => sum + (w.calories || 0), 0)
          }));
        } else {
          // Fallback: show each workout as separate entry
          return workouts.map((workout, index) => ({
            date: `Workout ${index + 1}`,
            workouts: 1,
            calories: workout.calories || 0,
            exercise: workout.exercise_name || 'Exercise'
          }));
        }
      })() : [];

      // Create weight trend chart with all entries
      const weightChart = weights.map((entry, index) => ({
        date: entry.created_at ? new Date(entry.created_at).toLocaleDateString() : `Entry ${index + 1}`,
        weight: parseFloat(entry.weight) || 0
      }));

      console.log('=== CHART DATA ===');
      console.log('Calories chart:', caloriesChart);
      console.log('Workouts chart:', workoutsChart);
      console.log('Weight chart:', weightChart);
      console.log('=== END DEBUG ===');

      setDashboardData({
        dailySummary,
        caloriesChart,
        workoutsChart,
        weightChart
      });

      // Update parent component with daily stats for motivational card
      if (onStatsUpdate) {
        onStatsUpdate({
          caloriesBurned: dailySummary.totalCaloriesBurned,
          caloriesConsumed: dailySummary.totalCaloriesConsumed,
          workouts: dailySummary.totalWorkouts,
          weight: dailySummary.currentWeight
        });
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Set empty data on error so dashboard still renders
      setDashboardData({
        dailySummary: {
          totalCaloriesConsumed: 0,
          totalCaloriesBurned: 0,
          totalWorkouts: 0,
          currentWeight: 0
        },
        caloriesChart: [],
        workoutsChart: [],
        weightChart: []
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="grid gap-6">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  const { dailySummary, caloriesChart, workoutsChart, weightChart } = dashboardData;

  return (
    <div className="space-y-8 animate-in fade-in duration-1500">
      {/* Daily Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-gradient border-border hover:border-fitness-calories/50 hover:scale-105 transition-all duration-500 animate-in slide-in-from-left delay-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Calories In</p>
                <p className="text-3xl font-bold text-fitness-calories">{dailySummary.totalCaloriesConsumed}</p>
              </div>
              <Flame className="h-10 w-10 text-fitness-calories hover:scale-110 transition-transform duration-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient border-border hover:border-primary/50 hover:scale-105 transition-all duration-500 animate-in slide-in-from-left delay-600">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Calories Burned</p>
                <p className="text-3xl font-bold text-primary">{dailySummary.totalCaloriesBurned}</p>
              </div>
              <Target className="h-10 w-10 text-primary hover:scale-110 transition-transform duration-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient border-border hover:border-accent/50 hover:scale-105 transition-all duration-500 animate-in slide-in-from-left delay-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Total Workouts</p>
                <p className="text-3xl font-bold text-accent">{dailySummary.totalWorkouts}</p>
              </div>
              <Activity className="h-10 w-10 text-accent hover:scale-110 transition-transform duration-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient border-border hover:border-fitness-weight/50 hover:scale-105 transition-all duration-500 animate-in slide-in-from-left delay-1200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Current Weight</p>
                <p className="text-3xl font-bold text-fitness-weight">
                  {dailySummary.currentWeight ? `${dailySummary.currentWeight} kg` : 'No data'}
                </p>
              </div>
              <Scale className="h-10 w-10 text-fitness-weight hover:scale-110 transition-transform duration-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calories Chart */}
        <Card className="card-gradient border-border hover:border-primary/30 hover:shadow-lg transition-all duration-500 animate-in slide-in-from-bottom delay-1500">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold">Calories In vs Out</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={caloriesChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="date" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="caloriesIn" 
                  stroke="hsl(var(--fitness-calories))" 
                  strokeWidth={3}
                  name="Calories In"
                />
                <Line 
                  type="monotone" 
                  dataKey="caloriesOut" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  name="Calories Burned"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Workouts Chart */}
        <Card className="card-gradient border-border hover:border-accent/30 hover:shadow-lg transition-all duration-500 animate-in slide-in-from-bottom delay-1800">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold">Workout Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={workoutsChart}>
                <defs>
                  <linearGradient id="workoutGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="date" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value, name) => {
                    if (name === 'workouts') return [`${value} workout${value !== 1 ? 's' : ''}`, 'Workouts'];
                    if (name === 'calories') return [`${value} cal`, 'Calories Burned'];
                    return [value, name];
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="workouts"
                  stroke="hsl(var(--accent))"
                  strokeWidth={2}
                  fill="url(#workoutGradient)"
                  name="workouts"
                />
                <Area
                  type="monotone"
                  dataKey="calories"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fill="transparent"
                  strokeDasharray="5 5"
                  name="calories"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Weight Chart */}
      {weightChart.length > 0 && (
        <Card className="card-gradient border-border hover:border-fitness-weight/30 hover:shadow-lg transition-all duration-500 animate-in slide-in-from-bottom delay-2100">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold">Weight Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weightChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="date" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  domain={['dataMin - 1', 'dataMax + 1']}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="weight" 
                  stroke="hsl(var(--fitness-weight))" 
                  strokeWidth={3}
                  name="Weight (kg)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;