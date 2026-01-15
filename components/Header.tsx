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
    { id: 'ar', label: t.nav.ar },
    { id: 'journal', label: t.nav.journal },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-slate-900/90 border-b border-white/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 md:h-16 flex items-center justify-between">
        
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer group" 
          onClick={() => onNavigate('home')}
        >
          <div className="bg-gradient-to-br from-primary to-purple-600 p-1.5 md:p-2 rounded-lg group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
             <Microscope size={20} className="text-white md:w-6 md:h-6" />
          </div>
          <span className="font-bold text-lg md:text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 group-hover:to-white transition-colors">
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
          className="flex items-center gap-2 px-3 py-1.5 md:py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors active:scale-95"
        >
          <Globe size={16} className="text-secondary md:w-[18px] md:h-[18px]" />
          <span className="font-bold text-xs md:text-sm">{lang === 'zh' ? 'EN' : '中'}</span>
        </button>
      </div>

      {/* Mobile Nav (Horizontal Scroll) */}
      <div className="md:hidden relative border-t border-white/5 bg-slate-900/50 backdrop-blur-md">
        {/* Fog fade on right to indicate scroll */}
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-900 to-transparent pointer-events-none z-10"></div>
        
        <div className="overflow-x-auto pb-0 pt-0 px-2 no-scrollbar flex items-center h-12">
           <div className="flex gap-2 pr-8"> 
               {navItems.map((item) => (
                   <button
                   key={item.id}
                   onClick={() => onNavigate(item.id)}
                   className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all border ${
                       currentView === item.id 
                       ? 'bg-secondary/20 border-secondary text-secondary shadow-sm' 
                       : 'bg-transparent border-transparent text-slate-400 active:text-white'
                   }`}
                   >
                   {item.label}
                   </button>
               ))}
           </div>
        </div>
      </div>
    </header>
  );
};
