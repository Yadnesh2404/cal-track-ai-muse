import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Dumbbell, Clock, Flame, Trophy } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';
import SimpleInput from './SimpleInput';

const WorkoutForm = ({ onWorkoutAdded }) => {
  const [exerciseName, setExerciseName] = useState('');
  const [duration, setDuration] = useState('');
  const [calories, setCalories] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log('Attempting to save workout entry:', { 
        exercise_name: exerciseName, 
        duration: parseInt(duration), 
        calories: parseInt(calories) 
      });
      
      const { data, error } = await supabase
        .from('workouts')
        .insert([
          {
            exercise_name: exerciseName,
            duration: parseInt(duration),
            calories: parseInt(calories),
          },
        ])
        .select();

      if (error) {
        console.error('Workout save error:', error);
        throw error;
      }

      console.log('Workout entry successfully saved:', data);
      toast.success('Workout logged successfully! 💪');
      
      // Reset form
      setExerciseName('');
      setDuration('');
      setCalories('');

      // Notify parent component
      if (onWorkoutAdded) {
        onWorkoutAdded();
      }

    } catch (error) {
      console.error('Error adding workout:', error);
      toast.error('Failed to log workout', {
        description: error.message
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto card-gradient border-border hover:border-accent/50 hover:shadow-xl transition-all duration-500 animate-in zoom-in duration-1000">
      <CardContent className="p-8">
        <div className="flex items-center justify-center mb-8 animate-in slide-in-from-top duration-1000">
          <div className="fitness-gradient p-4 rounded-full hover:scale-110 transition-transform duration-500">
            <Dumbbell className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold ml-4 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">Log Workout</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-6">
            <div className="flex items-center space-x-4 animate-in slide-in-from-left duration-1000 delay-500">
              <div className="p-2 rounded-lg bg-accent/10">
                <Trophy className="h-6 w-6 text-accent" />
              </div>
              <SimpleInput
                label="Exercise Name"
                placeholder="e.g., Push-ups, Running, Squats"
                value={exerciseName}
                onChange={(e) => setExerciseName(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center space-x-4 animate-in slide-in-from-left duration-1000 delay-800">
              <div className="p-2 rounded-lg bg-primary/10">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <SimpleInput
                label="Duration (minutes)"
                type="number"
                placeholder="30"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
                min="1"
              />
            </div>

            <div className="flex items-center space-x-4 animate-in slide-in-from-left duration-1000 delay-1100">
              <div className="p-2 rounded-lg bg-fitness-calories/10">
                <Flame className="h-6 w-6 text-fitness-calories" />
              </div>
              <SimpleInput
                label="Calories Burned"
                type="number"
                placeholder="200"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                required
                min="1"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full fitness-gradient hover:fitness-glow hover:scale-105 transition-all duration-500 py-6 text-lg font-semibold shadow-lg hover:shadow-xl animate-in slide-in-from-bottom duration-1000 delay-1400"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <LoadingSpinner size="sm" className="mr-2" />
                Logging Workout...
              </div>
            ) : (
              <div className="flex items-center">
                <Dumbbell className="h-5 w-5 mr-2" />
                Log Workout
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default WorkoutForm;