import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Scale } from 'lucide-react';

const WeightForm = ({ onWeightAdded }) => {
  const [weight, setWeight] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase
        .from('weight')
        .insert([
          {
            weight: parseFloat(weight)
          }
        ])
        .select();

      if (error) throw error;

      toast.success(`Weight logged: ${weight} kg`, {
        description: 'Weight tracking updated'
      });

      // Reset form
      setWeight('');

      // Notify parent component
      if (onWeightAdded) {
        onWeightAdded(data[0]);
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
    <Card className="card-gradient border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Scale className="h-5 w-5 text-fitness-weight" />
          Log Weight
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              name="weight"
              type="number"
              step="0.1"
              min="1"
              placeholder="70.5"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
              className="bg-input border-border"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-fitness-weight hover:bg-fitness-weight/90 transition-all duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging...' : 'Log Weight'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default WeightForm;