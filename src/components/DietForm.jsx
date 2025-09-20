import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Utensils, Flame, Apple } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';
import SimpleInput from './SimpleInput';

const DietForm = ({ onDietAdded }) => {
  const [mealName, setMealName] = useState('');
  const [calories, setCalories] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log('Attempting to save diet entry:', { meal_name: mealName, calories: parseInt(calories) });
      
      const { data, error } = await supabase
        .from('diet')
        .insert([
          {
            meal_name: mealName,
            calories: parseInt(calories),
          },
        ])
        .select();

      if (error) {
        console.error('Diet save error:', error);
        throw error;
      }

      console.log('Diet entry successfully saved:', data);
      toast.success('Meal logged successfully! 🍽️');
      
      // Reset form
      setMealName('');
      setCalories('');
      
      // Trigger refresh in parent component
      if (onDietAdded) {
        onDietAdded();
      }
    } catch (error) {
      console.error('Error adding meal:', error);
      toast.error('Failed to log meal. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto card-gradient border-border hover:border-fitness-calories/50 hover:shadow-xl transition-all duration-500 animate-in zoom-in duration-1000">
      <CardContent className="p-8">
        <div className="flex items-center justify-center mb-8 animate-in slide-in-from-top duration-1000">
          <div className="fitness-gradient p-4 rounded-full hover:scale-110 transition-transform duration-500">
            <Utensils className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold ml-4 bg-gradient-to-r from-fitness-calories to-accent bg-clip-text text-transparent">Log Meal</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-6">
            <div className="flex items-center space-x-4 animate-in slide-in-from-left duration-1000 delay-500">
              <div className="p-2 rounded-lg bg-fitness-calories/10">
                <Utensils className="h-6 w-6 text-fitness-calories" />
              </div>
              <SimpleInput
                label="Meal Name"
                type="text"
                placeholder="e.g., Grilled Chicken Salad, Oatmeal"
                value={mealName}
                onChange={(e) => setMealName(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center space-x-4 animate-in slide-in-from-left duration-1000 delay-800">
              <div className="p-2 rounded-lg bg-accent/10">
                <Flame className="h-6 w-6 text-accent" />
              </div>
              <SimpleInput
                label="Calories"
                type="number"
                placeholder="350"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                required
                min="1"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full fitness-gradient hover:fitness-glow hover:scale-105 transition-all duration-500 py-6 text-lg font-semibold shadow-lg hover:shadow-xl animate-in slide-in-from-bottom duration-1000 delay-1100"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <LoadingSpinner size="sm" className="mr-2" />
                Logging Meal...
              </div>
            ) : (
              <div className="flex items-center">
                <Utensils className="h-5 w-5 mr-2" />
                Log Meal
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DietForm;