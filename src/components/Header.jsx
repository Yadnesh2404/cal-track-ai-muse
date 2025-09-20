import React from 'react';
import { Activity } from 'lucide-react';

const Header = () => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="fitness-gradient p-2 rounded-lg fitness-glow">
            <Activity className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              CalTrack
            </h1>
            <p className="text-sm text-muted-foreground">
              Your personal health & fitness companion
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;