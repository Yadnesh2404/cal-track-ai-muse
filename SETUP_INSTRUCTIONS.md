# CalTrack Setup Instructions

## 🚀 Quick Setup

CalTrack is ready to run! Follow these steps to get started:

### 1. Supabase Database Setup

You need to create three tables in your Supabase database:

#### `workouts` table:
```sql
CREATE TABLE workouts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  exercise_name TEXT NOT NULL,
  duration INTEGER NOT NULL,
  calories INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### `diet` table:
```sql
CREATE TABLE diet (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  meal_name TEXT NOT NULL,
  calories INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### `weight` table:
```sql
CREATE TABLE weight (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  weight NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2. Configure API Keys

#### Supabase Configuration:
- Update `src/services/supabaseClient.js` with your actual Supabase credentials
- Replace the placeholder URL and key with your project's values

#### LLM API Key (Optional):
- For AI motivational messages, add your OpenAI API key in the MotivationalCard component
- Or use the input field in the app to enter your key temporarily
- The app works with fallback motivational messages if no API key is provided

### 3. Features Overview

#### ✅ Logging Forms:
- **Workout Form**: Log exercise name, duration (minutes), and calories burned
- **Diet Form**: Log meal name and calories consumed  
- **Weight Form**: Log current weight in kg

#### 📊 Dashboard:
- **Daily Summary Cards**: Today's calories in/out, workouts, and current weight
- **Calories Chart**: 7-day trend of calories consumed vs burned
- **Workouts Chart**: Bar chart showing daily workout frequency
- **Weight Chart**: Line chart tracking weight changes over time

#### 🤖 AI Motivation:
- Personalized motivational messages based on daily stats
- Fallback messages when API is unavailable
- Configurable API key input

### 4. Usage Tips

1. **Start with the Dashboard** to see your overview
2. **Log activities throughout the day** using the navigation tabs
3. **Check your progress** with the visual charts
4. **Get motivated** with AI-powered messages based on your activity

### 5. Customization

The app uses a dark fitness theme with:
- **Colors**: Dark backgrounds with green/blue accents
- **Animations**: Smooth transitions and hover effects
- **Responsive**: Works on desktop and mobile devices

### 6. Troubleshooting

- Ensure Supabase tables are created correctly
- Check that your Supabase URL and anon key are valid
- For AI features, verify your OpenAI API key has sufficient credits
- All data refreshes automatically when new entries are added

### 7. Future Enhancements

Consider adding:
- Goal setting and progress tracking
- Exercise library with preset workouts
- Meal planning and nutrition breakdown
- Social features and workout sharing
- Wearable device integration

---

**CalTrack** - Your personal health & fitness companion! 💪