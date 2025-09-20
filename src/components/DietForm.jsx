import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Utensils, Flame } from 'lucide-react';

const DietForm = ({ onDietAdded }) => {
  const [formData, setFormData] = useState({
    meal_name: '',
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
        .from('diet')
        .insert([
          {
            meal_name: formData.meal_name,
            calories: parseInt(formData.calories)
          }
        ])
        .select();

      if (error) throw error;

      toast.success(`Meal logged: ${formData.meal_name}`, {
        description: `${formData.calories} calories consumed`
      });

      // Reset form
      setFormData({
        meal_name: '',
        calories: ''
      });

      // Notify parent component
      if (onDietAdded) {
        onDietAdded(data[0]);
      }

    } catch (error) {
      console.error('Error adding meal:', error);
      toast.error('Failed to log meal', {
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
          <Utensils className="h-5 w-5 text-fitness-calories" />
          Log Diet
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="meal_name">Meal Name</Label>
            <Input
              id="meal_name"
              name="meal_name"
              type="text"
              placeholder="e.g., Grilled Chicken Salad, Oatmeal"
              value={formData.meal_name}
              onChange={handleChange}
              required
              className="bg-input border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="calories" className="flex items-center gap-2">
              <Flame className="h-4 w-4" />
              Calories
            </Label>
            <Input
              id="calories"
              name="calories"
              type="number"
              min="1"
              placeholder="350"
              value={formData.calories}
              onChange={handleChange}
              required
              className="bg-input border-border"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-fitness-calories hover:bg-fitness-calories/90 transition-all duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging...' : 'Log Diet'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DietForm;