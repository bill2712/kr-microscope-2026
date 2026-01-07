import React from 'react';
import { Translation } from '../types';
import { Button } from './Button';
import { Microscope, Sparkles } from 'lucide-react';

interface HeroProps {
  t: Translation;
  onStart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ t, onStart }) => {
  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center text-center p-4 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-primary/30 rounded-full blur-xl animate-float" style={{ animationDelay: '0s' }} />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/30 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-accent/30 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }} />

      <div className="z-10 max-w-2xl mx-auto space-y-8">
        <div className="flex justify-center mb-6">
          <div className="relative bg-gradient-to-br from-white/10 to-white/5 p-8 rounded-full border border-white/20 shadow-[0_0_50px_rgba(99,102,241,0.3)] animate-float">
             <Microscope size={80} className="text-secondary drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]" />
             <Sparkles className="absolute -top-2 -right-2 text-yellow-400 animate-pulse" size={32} />
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-white to-purple-300 drop-shadow-sm">
          {t.title}
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-200 font-light tracking-wide">
          {t.subtitle}
        </p>

        <div className="pt-8">
          <Button size="lg" onClick={onStart} className="mx-auto group">
            {t.home.cta}
            <span className="group-hover:translate-x-1 transition-transform">➜</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
