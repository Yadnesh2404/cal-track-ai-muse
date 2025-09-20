import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dumbbell, Utensils, Scale, TrendingUp } from 'lucide-react';

const EmptyState = ({ type, onAction }) => {
  const configs = {
    dashboard: {
      icon: TrendingUp,
      title: "Welcome to CalTrack!",
      description: "Start tracking your fitness journey by logging your first workout, meal, or weight entry.",
      actionText: "Get Started",
      suggestions: [
        { icon: Dumbbell, text: "Log your first workout", action: () => onAction('workout') },
        { icon: Utensils, text: "Track a meal", action: () => onAction('diet') },
        { icon: Scale, text: "Record your weight", action: () => onAction('weight') }
      ]
    },
    workouts: {
      icon: Dumbbell,
      title: "No workouts logged yet",
      description: "Start building your fitness routine by logging your first workout session.",
      actionText: "Log First Workout",
      tips: ["Track duration and calories burned", "Be consistent with your routine", "Every workout counts!"]
    },
    diet: {
      icon: Utensils,
      title: "No meals tracked today",
      description: "Keep track of your nutrition by logging your meals and snacks.",
      actionText: "Log First Meal",
      tips: ["Include all meals and snacks", "Estimate calories accurately", "Stay mindful of your intake"]
    },
    weight: {
      icon: Scale,
      title: "No weight entries yet",
      description: "Monitor your progress by regularly tracking your weight.",
      actionText: "Record Weight",
      tips: ["Weigh yourself at the same time daily", "Track weekly averages", "Focus on trends, not daily fluctuations"]
    }
  };

  const config = configs[type] || configs.dashboard;
  const Icon = config.icon;

  return (
    <Card className="card-gradient border-border">
      <CardContent className="p-8 text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="fitness-gradient p-4 rounded-full">
            <Icon className="h-8 w-8 text-white" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">{config.title}</h3>
            <p className="text-muted-foreground max-w-md">{config.description}</p>
          </div>

          {config.suggestions && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-md">
              {config.suggestions.map((suggestion, index) => {
                const SuggestionIcon = suggestion.icon;
                return (
                  <Button
                    key={index}
                    variant="outline"
                    onClick={suggestion.action}
                    className="flex flex-col items-center gap-2 h-auto p-4 hover:bg-primary/5"
                  >
                    <SuggestionIcon className="h-5 w-5" />
                    <span className="text-xs text-center">{suggestion.text}</span>
                  </Button>
                );
              })}
            </div>
          )}

          {config.tips && (
            <div className="space-y-2 max-w-md">
              <h4 className="font-medium text-sm">Quick Tips:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                {config.tips.map((tip, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EmptyState;
