import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Dumbbell, Clock, Flame } from 'lucide-react';

const WorkoutForm = ({ onWorkoutAdded }) => {
  const [formData, setFormData] = useState({
    exercise_name: '',
    duration: '',
    calories: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase
        .from('workouts')
        .insert([
          {
            exercise_name: formData.exercise_name,
            duration: parseInt(formData.duration),
            calories: parseInt(formData.calories)
          }
        ])
        .select();

      if (error) throw error;

      toast.success(`Workout logged: ${formData.exercise_name}`, {
        description: `${formData.duration} minutes • ${formData.calories} calories burned`
      });

      // Reset form
      setFormData({
        exercise_name: '',
        duration: '',
        calories: ''
      });

      // Notify parent component
      if (onWorkoutAdded) {
        onWorkoutAdded(data[0]);
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
    <Card className="card-gradient border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Dumbbell className="h-5 w-5 text-primary" />
          Log Workout
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="exercise_name">Exercise Name</Label>
            <Input
              id="exercise_name"
              name="exercise_name"
              type="text"
              placeholder="e.g., Push-ups, Running, Yoga"
              value={formData.exercise_name}
              onChange={handleChange}
              required
              className="bg-input border-border"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Duration (min)
              </Label>
              <Input
                id="duration"
                name="duration"
                type="number"
                min="1"
                placeholder="30"
                value={formData.duration}
                onChange={handleChange}
                required
                className="bg-input border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="calories" className="flex items-center gap-2">
                <Flame className="h-4 w-4" />
                Calories Burned
              </Label>
              <Input
                id="calories"
                name="calories"
                type="number"
                min="1"
                placeholder="300"
                value={formData.calories}
                onChange={handleChange}
                required
                className="bg-input border-border"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full fitness-gradient hover:fitness-glow transition-all duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging...' : 'Log Workout'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default WorkoutForm;