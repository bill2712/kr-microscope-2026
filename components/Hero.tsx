import React from 'react';
import { Translation } from '../types';
import { Button } from './Button';
import { Microscope, Sparkles } from 'lucide-react';

interface HeroProps {
  t: Translation;
  onStart: () => void;
}

import { IMAGES } from '../constants';

export const Hero: React.FC<HeroProps> = ({ t, onStart }) => {
  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 py-8 md:p-4 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-primary/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '0s' }} />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-accent/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      
      {/* Ambient Glow behind the microscope */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-secondary/20 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />

      <div className="z-10 w-full max-w-4xl mx-auto flex flex-col items-center space-y-6 md:space-y-10">
        
        {/* Main Hero Image */}
        <div className="relative group perspective-1000">
          <div className="relative z-10 w-64 md:w-80 lg:w-96 animate-float transition-transform duration-500 ease-out group-hover:scale-105 group-hover:drop-shadow-[0_0_30px_rgba(6,182,212,0.6)]">
             <img 
               src="/kr-microscope-2026/images/transparent-mic.png" 
               alt="KidRise Microscope" 
               className="w-full h-auto object-contain drop-shadow-[0_0_50px_rgba(6,182,212,0.6)] animate-pulse-slow"
             />
             
             {/* Sparkles overlay */}
             <div className="absolute -top-4 -right-4 animate-pulse">
                <Sparkles className="text-yellow-400 w-8 h-8 md:w-10 md:h-10 drop-shadow-lg" />
             </div>
             <div className="absolute top-1/3 -left-6 animate-pulse" style={{ animationDelay: '1.5s' }}>
                <Sparkles className="text-cyan-300 w-4 h-4 md:w-6 md:h-6 drop-shadow-lg" />
             </div>
          </div>
          
          {/* Reflection/Ground effect */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 h-12 bg-black/20 blur-xl rounded-[100%]"></div>
        </div>

        <div className="space-y-4 max-w-2xl px-4">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-white to-purple-300 drop-shadow-sm leading-tight">
            {t.title}
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-slate-200 font-light tracking-wide max-w-xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        <div className="pt-2">
          <Button size="lg" onClick={onStart} className="mx-auto group shadow-xl shadow-secondary/20 hover:shadow-secondary/40 w-full xs:w-auto px-8 py-6 text-xl rounded-2xl border-secondary/50">
            {t.home.cta}
            <span className="group-hover:translate-x-1 transition-transform inline-block ml-2">➜</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
