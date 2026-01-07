import React from 'react';
import { Translation, ViewState, Language } from '../types';
import { Microscope, Globe } from 'lucide-react';

interface HeaderProps {
  t: Translation;
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  lang: Language;
  onToggleLang: () => void;
}

export const Header: React.FC<HeaderProps> = ({ t, currentView, onNavigate, lang, onToggleLang }) => {
  const navItems: { id: ViewState; label: string }[] = [
    { id: 'usage', label: t.nav.usage },
    { id: 'planner', label: t.nav.planner },
    { id: 'learn', label: t.nav.learn },
    { id: 'gallery', label: t.nav.gallery },
    { id: 'quiz', label: t.nav.quiz },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-slate-900/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer group" 
          onClick={() => onNavigate('home')}
        >
          <div className="bg-gradient-to-br from-primary to-purple-600 p-2 rounded-lg group-hover:rotate-12 transition-transform">
             <Microscope size={24} className="text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight hidden md:block bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 group-hover:to-white transition-colors">
            KidRise
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-1 bg-white/5 p-1 rounded-full border border-white/10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                currentView === item.id 
                ? 'bg-secondary text-white shadow-lg' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Language Toggle */}
        <button 
          onClick={onToggleLang}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
        >
          <Globe size={18} className="text-secondary" />
          <span className="font-bold text-sm">{lang === 'zh' ? 'EN' : '中'}</span>
        </button>
      </div>

      {/* Mobile Nav (Simple horizontal scroll) */}
      <div className="md:hidden overflow-x-auto pb-2 px-4 no-scrollbar">
        <div className="flex gap-2">
            {navItems.map((item) => (
                <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all border ${
                    currentView === item.id 
                    ? 'bg-secondary/20 border-secondary text-secondary' 
                    : 'bg-white/5 border-transparent text-slate-400'
                }`}
                >
                {item.label}
                </button>
            ))}
        </div>
      </div>
    </header>
  );
};
