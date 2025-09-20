import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Brain, Sparkles, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

// LLM API Configuration - Remove hardcoded key for security
const LLM_API_KEY = "";

const MotivationalCard = ({ dailyStats }) => {
  const [motivationalMessage, setMotivationalMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState(LLM_API_KEY);
  const [showApiInput, setShowApiInput] = useState(false);

  const generateMotivationalMessage = async (stats) => {
    setIsLoading(true);
    try {
      // If no API key is provided, use fallback messages immediately
      if (!apiKey || apiKey.trim() === '') {
        generateFallbackMessage(stats);
        return;
      }

      const prompt = `User burned ${stats.caloriesBurned} calories today, ate ${stats.caloriesConsumed} calories, completed ${stats.workouts} workout(s), and weighs ${stats.weight}kg. Generate a short, encouraging motivational message (max 20 words) that acknowledges their progress and motivates them to continue their fitness journey.`;

      // This is a placeholder for the actual LLM API call
      // In a real implementation, you would call your preferred LLM API here
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a motivational fitness coach. Generate short, encouraging messages.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 50,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate motivational message');
      }

      const data = await response.json();
      const message = data.choices[0]?.message?.content?.trim() || 'Keep pushing forward! Every step counts on your fitness journey! 💪';
      
      setMotivationalMessage(message);

    } catch (error) {
      console.error('Error generating motivational message:', error);
      generateFallbackMessage(stats);
    } finally {
      setIsLoading(false);
    }
  };

  const generateFallbackMessage = (stats) => {
    // Enhanced fallback motivational messages based on user stats
    const fallbackMessages = [
      stats.caloriesBurned > 300 ? "Amazing calorie burn today! You're on fire! 🔥" : "Every step forward is progress! Keep going! 💪",
      stats.workouts > 0 ? "Consistency is key! Great job staying active today! ⭐" : "Tomorrow is a fresh start for your fitness goals! 🌟",
      stats.caloriesConsumed > 0 ? "Fuel your body, fuel your dreams! Keep tracking! 📊" : "Small steps lead to big transformations! 🚀",
      "Your dedication today shapes your stronger tomorrow! 💫",
      "Progress over perfection - you're doing great! 🎯",
      stats.caloriesBurned > stats.caloriesConsumed ? "Great calorie deficit! You're crushing your goals! 🏆" : "Balance is key! Keep tracking your journey! ⚖️",
      stats.workouts >= 2 ? "Multiple workouts today? You're unstoppable! 🚀" : "One workout at a time builds lasting habits! 💪"
    ];
    
    const randomMessage = fallbackMessages[Math.floor(Math.random() * fallbackMessages.length)];
    setMotivationalMessage(randomMessage);
  };

  useEffect(() => {
    if (dailyStats && Object.keys(dailyStats).length > 0) {
      generateMotivationalMessage(dailyStats);
    }
  }, [dailyStats, apiKey]);

  const handleRefresh = () => {
    if (dailyStats) {
      generateMotivationalMessage(dailyStats);
    }
  };

  return (
    <Card className="card-gradient border-border animate-float">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-accent" />
            AI Motivation
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              disabled={isLoading}
              className="h-8 w-8 p-0"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowApiInput(!showApiInput)}
              className="h-8 w-8 p-0"
            >
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {showApiInput && (
          <div className="space-y-3 mb-4 p-3 bg-muted rounded-lg">
            <Label htmlFor="apiKey" className="text-sm">
              LLM API Key (Optional - for personalized messages)
            </Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="Enter your OpenAI API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="bg-input border-border text-sm"
            />
            <p className="text-xs text-muted-foreground">
              Leave empty to use fallback motivational messages
            </p>
          </div>
        )}
        
        <div className="flex items-start gap-3">
          <div className="animate-pulse-glow rounded-full p-2 bg-accent/20">
            <Sparkles className="h-4 w-4 text-accent" />
          </div>
          <div className="flex-1">
            {isLoading ? (
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded animate-pulse"></div>
                <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
              </div>
            ) : (
              <p className="text-foreground font-medium leading-relaxed">
                {motivationalMessage || "Start logging your activities to get personalized motivation! 🚀"}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MotivationalCard;