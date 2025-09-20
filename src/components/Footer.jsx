import React from 'react';
import { Activity, Heart, Github, Twitter, Mail, Shield, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/30 backdrop-blur-sm mt-12">
      <div className="container mx-auto px-4 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="fitness-gradient p-2 rounded-lg">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                CalTrack
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your personal health & fitness companion. Track workouts, monitor nutrition, and achieve your wellness goals with intelligent insights.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Heart className="h-4 w-4 text-red-500" />
              <span>Made with passion for fitness</span>
            </div>
          </div>

          {/* Features Section */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Features</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-primary transition-colors cursor-pointer">
                📊 Dashboard Analytics
              </li>
              <li className="hover:text-primary transition-colors cursor-pointer">
                💪 Workout Tracking
              </li>
              <li className="hover:text-primary transition-colors cursor-pointer">
                🍎 Nutrition Logging
              </li>
              <li className="hover:text-primary transition-colors cursor-pointer">
                ⚖️ Weight Monitoring
              </li>
              <li className="hover:text-primary transition-colors cursor-pointer">
                🤖 AI Motivation
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Button variant="ghost" size="sm" className="h-auto p-0 text-muted-foreground hover:text-primary">
                  <Info className="h-3 w-3 mr-2" />
                  About CalTrack
                </Button>
              </li>
              <li>
                <Button variant="ghost" size="sm" className="h-auto p-0 text-muted-foreground hover:text-primary">
                  <Shield className="h-3 w-3 mr-2" />
                  Privacy Policy
                </Button>
              </li>
              <li>
                <Button variant="ghost" size="sm" className="h-auto p-0 text-muted-foreground hover:text-primary">
                  <Mail className="h-3 w-3 mr-2" />
                  Support
                </Button>
              </li>
            </ul>
          </div>

          {/* Connect Section */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Connect</h4>
            <p className="text-sm text-muted-foreground">
              Follow us for updates and fitness tips
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © {currentYear} CalTrack. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Built with React & Supabase</span>
            <span>•</span>
            <span>v1.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
