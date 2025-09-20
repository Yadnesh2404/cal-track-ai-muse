import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Dumbbell, Utensils, Scale, BarChart3, Zap, Target, TrendingUp, Heart, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: BarChart3,
      title: 'Smart Dashboard',
      description: 'Visualize your progress with interactive charts and real-time analytics',
      color: 'text-primary'
    },
    {
      icon: Dumbbell,
      title: 'Workout Tracking',
      description: 'Log exercises, duration, and calories burned with detailed categorization',
      color: 'text-accent'
    },
    {
      icon: Utensils,
      title: 'Nutrition Logging',
      description: 'Track meals, calories, and maintain a healthy diet with meal categorization',
      color: 'text-fitness-calories'
    },
    {
      icon: Scale,
      title: 'Weight Monitoring',
      description: 'Monitor your weight trends and progress over time with helpful tips',
      color: 'text-fitness-weight'
    }
  ];

  const stats = [
    { label: 'Active Users', value: '10K+', icon: Heart },
    { label: 'Workouts Logged', value: '50K+', icon: Dumbbell },
    { label: 'Calories Tracked', value: '2M+', icon: Zap },
    { label: 'Success Rate', value: '95%', icon: Target }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10"></div>
        <div className="relative container mx-auto px-4 py-20 animate-in fade-in duration-1500">
          <div className="text-center space-y-8">
            {/* Logo and Branding */}
            <div className="flex justify-center animate-in zoom-in duration-1000 delay-500">
              <div className="fitness-gradient p-4 rounded-2xl fitness-glow hover:scale-105 transition-transform duration-300">
                <Activity className="h-16 w-16 text-white" />
              </div>
            </div>
            
            <div className="space-y-6 animate-in slide-in-from-bottom duration-1200 delay-700">
              <Badge variant="outline" className="px-4 py-2 text-sm hover:bg-primary/10 transition-colors duration-200">
                <Star className="h-4 w-4 mr-2 animate-pulse" />
                Your Personal Fitness Companion
              </Badge>
              
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-fitness-calories bg-clip-text text-transparent animate-in slide-in-from-left duration-1500 delay-900">
                CalTrack
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-in slide-in-from-right duration-1500 delay-1100">
                Transform your fitness journey with intelligent tracking, personalized insights, and motivational guidance. 
                Track workouts, monitor nutrition, and achieve your wellness goals with ease.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in slide-in-from-bottom duration-1500 delay-1300">
              <Button 
                size="lg" 
                className="fitness-gradient hover:fitness-glow hover:scale-105 transition-all duration-300 px-8 py-6 text-lg shadow-lg hover:shadow-xl"
                onClick={() => navigate('/dashboard')}
              >
                <TrendingUp className="h-5 w-5 mr-2" />
                Start Tracking Now
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-6 text-lg hover:bg-primary/10 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
                onClick={() => navigate('/dashboard')}
              >
                View Dashboard
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="card-gradient border-border text-center hover:border-primary/50 hover:scale-105 transition-all duration-500 animate-in fade-in-50 slide-in-from-bottom" style={{animationDelay: `${index * 200}ms`, animationDuration: '1000ms'}}>
                  <CardContent className="p-6">
                    <Icon className="h-8 w-8 mx-auto mb-3 text-primary hover:text-accent transition-colors duration-200" />
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need for Your Fitness Journey
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              CalTrack provides comprehensive tools to help you track, analyze, and improve your health and fitness goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="card-gradient border-border hover:border-primary/50 hover:scale-105 hover:shadow-lg transition-all duration-500 group animate-in fade-in-50 slide-in-from-bottom" style={{animationDelay: `${index * 300}ms`, animationDuration: '1200ms'}}>
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="mb-4">
                      <Icon className={`h-12 w-12 mx-auto ${feature.color} group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-200">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom duration-1500">
            <h2 className="text-3xl md:text-4xl font-bold animate-in slide-in-from-left duration-1200">
              Ready to Transform Your Fitness Journey?
            </h2>
            <p className="text-lg text-muted-foreground animate-in slide-in-from-right duration-1200 delay-400">
              Join thousands of users who have already started their transformation with CalTrack. 
              Start tracking your progress today and see the difference.
            </p>
            <Button 
              size="lg" 
              className="fitness-gradient hover:fitness-glow hover:scale-105 transition-all duration-500 px-8 py-6 text-lg shadow-lg hover:shadow-xl animate-in zoom-in duration-1000 delay-800"
              onClick={() => navigate('/dashboard')}
            >
              <Activity className="h-5 w-5 mr-2" />
              Get Started Free
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
