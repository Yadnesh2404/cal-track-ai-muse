import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
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

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const today = new Date();
      const sevenDaysAgo = subDays(today, 6);

      // Fetch data for the past 7 days
      const [workoutsRes, dietRes, weightRes] = await Promise.all([
        supabase
          .from('workouts')
          .select('*')
          .gte('created_at', sevenDaysAgo.toISOString())
          .order('created_at', { ascending: true }),
        supabase
          .from('diet')
          .select('*')
          .gte('created_at', sevenDaysAgo.toISOString())
          .order('created_at', { ascending: true }),
        supabase
          .from('weight')
          .select('*')
          .gte('created_at', sevenDaysAgo.toISOString())
          .order('created_at', { ascending: false })
      ]);

      if (workoutsRes.error) throw workoutsRes.error;
      if (dietRes.error) throw dietRes.error;
      if (weightRes.error) throw weightRes.error;

      const workouts = workoutsRes.data || [];
      const diet = dietRes.data || [];
      const weights = weightRes.data || [];

      // Calculate daily summary (today only)
      const todayWorkouts = workouts.filter(w => isToday(new Date(w.created_at)));
      const todayDiet = diet.filter(d => isToday(new Date(d.created_at)));
      
      const dailySummary = {
        totalCaloriesConsumed: todayDiet.reduce((sum, meal) => sum + meal.calories, 0),
        totalCaloriesBurned: todayWorkouts.reduce((sum, workout) => sum + workout.calories, 0),
        totalWorkouts: todayWorkouts.length,
        currentWeight: weights.length > 0 ? weights[0].weight : 0
      };

      // Prepare chart data for past 7 days
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = subDays(today, 6 - i);
        return format(date, 'MMM dd');
      });

      // Calories chart data
      const caloriesChart = last7Days.map(dateStr => {
        const date = new Date(dateStr + `, ${today.getFullYear()}`);
        const dayWorkouts = workouts.filter(w => 
          format(new Date(w.created_at), 'MMM dd') === dateStr
        );
        const dayDiet = diet.filter(d => 
          format(new Date(d.created_at), 'MMM dd') === dateStr
        );

        return {
          date: dateStr,
          caloriesIn: dayDiet.reduce((sum, meal) => sum + meal.calories, 0),
          caloriesOut: dayWorkouts.reduce((sum, workout) => sum + workout.calories, 0)
        };
      });

      // Workouts chart data
      const workoutsChart = last7Days.map(dateStr => {
        const dayWorkouts = workouts.filter(w => 
          format(new Date(w.created_at), 'MMM dd') === dateStr
        );

        return {
          date: dateStr,
          workouts: dayWorkouts.length
        };
      });

      // Weight chart data (only for days with weight entries)
      const weightChart = weights
        .filter(w => last7Days.includes(format(new Date(w.created_at), 'MMM dd')))
        .map(w => ({
          date: format(new Date(w.created_at), 'MMM dd'),
          weight: w.weight
        }))
        .reverse(); // Reverse to show chronologically

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
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="card-gradient border-border animate-pulse">
              <CardContent className="p-6">
                <div className="h-20 bg-muted rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const { dailySummary, caloriesChart, workoutsChart, weightChart } = dashboardData;

  return (
    <div className="space-y-6">
      {/* Daily Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="card-gradient border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Calories In</p>
                <p className="text-2xl font-bold text-fitness-calories">{dailySummary.totalCaloriesConsumed}</p>
              </div>
              <Flame className="h-8 w-8 text-fitness-calories" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Calories Burned</p>
                <p className="text-2xl font-bold text-primary">{dailySummary.totalCaloriesBurned}</p>
              </div>
              <Target className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Workouts Today</p>
                <p className="text-2xl font-bold text-accent">{dailySummary.totalWorkouts}</p>
              </div>
              <Activity className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Current Weight</p>
                <p className="text-2xl font-bold text-fitness-weight">
                  {dailySummary.currentWeight ? `${dailySummary.currentWeight} kg` : 'No data'}
                </p>
              </div>
              <Scale className="h-8 w-8 text-fitness-weight" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calories Chart */}
        <Card className="card-gradient border-border">
          <CardHeader>
            <CardTitle>Calories In vs Out (7 Days)</CardTitle>
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
        <Card className="card-gradient border-border">
          <CardHeader>
            <CardTitle>Workouts Per Day (7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={workoutsChart}>
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
                <Bar 
                  dataKey="workouts" 
                  fill="hsl(var(--accent))"
                  radius={[4, 4, 0, 0]}
                  name="Workouts"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Weight Chart */}
      {weightChart.length > 0 && (
        <Card className="card-gradient border-border">
          <CardHeader>
            <CardTitle>Weight Trend (7 Days)</CardTitle>
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