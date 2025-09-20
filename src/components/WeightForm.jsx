import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Scale, TrendingUp, Target } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';
import SimpleInput from './SimpleInput';

const WeightForm = ({ onWeightAdded }) => {
  const [weight, setWeight] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log('Attempting to save weight entry:', { weight: parseFloat(weight) });
      
      const { data, error } = await supabase
        .from('weight')
        .insert([
          {
            weight: parseFloat(weight)
          }
        ])
        .select();

      if (error) {
        console.error('Weight save error:', error);
        throw error;
      }

      console.log('Weight entry successfully saved:', data);
      toast.success(`Weight logged: ${weight} kg`, {
        description: 'Weight tracking updated'
      });

      // Reset form
      setWeight('');

      // Notify parent component
      if (onWeightAdded) {
        onWeightAdded();
      }

    } catch (error) {
      console.error('Error adding weight:', error);
      toast.error('Failed to log weight', {
        description: error.message
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto card-gradient border-border hover:border-fitness-weight/50 hover:shadow-xl transition-all duration-500 animate-in zoom-in duration-1000">
      <CardContent className="p-8">
        <div className="flex items-center justify-center mb-8 animate-in slide-in-from-top duration-1000">
          <div className="fitness-gradient p-4 rounded-full hover:scale-110 transition-transform duration-500">
            <Scale className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold ml-4 bg-gradient-to-r from-fitness-weight to-primary bg-clip-text text-transparent">Track Weight</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center space-x-4 animate-in slide-in-from-left duration-1000 delay-500">
            <div className="p-2 rounded-lg bg-fitness-weight/10">
              <Scale className="h-6 w-6 text-fitness-weight" />
            </div>
            <SimpleInput
              label="Weight (kg)"
              type="number"
              step="0.1"
              placeholder="70.5"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
              min="1"
            />
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Target className="h-4 w-4" />
              Weight Tracking Tips
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Weigh yourself at the same time each day</li>
              <li>• Focus on weekly trends, not daily fluctuations</li>
              <li>• Track consistently for best results</li>
            </ul>
          </div>

          <Button 
            type="submit" 
            className="w-full fitness-gradient hover:fitness-glow hover:scale-105 transition-all duration-500 py-6 text-lg font-semibold shadow-lg hover:shadow-xl animate-in slide-in-from-bottom duration-1000 delay-800"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <LoadingSpinner size="sm" className="mr-2" />
                Saving Weight...
              </div>
            ) : (
              <div className="flex items-center">
                <Scale className="h-5 w-5 mr-2" />
                Save Weight
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default WeightForm;