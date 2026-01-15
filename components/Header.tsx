import React from 'react';
import { createPortal } from 'react-dom';
import { Translation, ViewState, Language } from '../types';
import { Microscope, Globe, Menu, X } from 'lucide-react';

interface HeaderProps {
  t: Translation;
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  lang: Language;
  onToggleLang: () => void;
}

export const Header: React.FC<HeaderProps> = ({ t, currentView, onNavigate, lang, onToggleLang }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navItems: { id: ViewState; label: string }[] = [
    { id: 'usage', label: t.nav.usage },
    { id: 'planner', label: t.nav.planner },
    { id: 'learn', label: t.nav.learn },
    { id: 'gallery', label: t.nav.gallery },
    { id: 'quiz', label: t.nav.quiz },
    { id: 'ar', label: t.nav.ar },
    { id: 'journal', label: t.nav.journal },
  ];

  const handleNavigate = (id: ViewState) => {
    onNavigate(id);
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-[100] w-full backdrop-blur-lg bg-slate-900/90 border-b border-white/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 md:h-16 flex items-center justify-between">
        
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer group z-50 relative" 
          onClick={() => handleNavigate('home')}
        >
          <img src={`${import.meta.env.BASE_URL}images/kidrise-logo_new.png`} alt="Logo" className="w-8 h-8 md:w-10 md:h-10 object-contain group-hover:rotate-12 transition-transform" />
          <span className="font-bold text-lg md:text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 group-hover:to-white transition-colors">
            Kidrise 顯微鏡探秘
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

        {/* Right Actions */}
        <div className="flex items-center gap-2 z-50 relative">
            {/* Language Toggle */}
            <button 
            onClick={onToggleLang}
            className="flex items-center gap-2 px-3 py-1.5 md:py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors active:scale-95"
            >
            <Globe size={16} className="text-secondary md:w-[18px] md:h-[18px]" />
            <span className="font-bold text-xs md:text-sm">{lang === 'zh' ? 'EN' : '中'}</span>
            </button>

            {/* Mobile Menu Button */}
            <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 active:bg-white/10"
            >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {isMenuOpen && createPortal(
        <div className="fixed inset-0 top-[56px] z-[9999] bg-black opacity-100 border-t border-white/10 flex flex-col p-4 md:hidden" style={{ backgroundColor: '#020617' }}>
            <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => handleNavigate(item.id)}
                        className={`p-4 rounded-xl text-left font-bold text-lg transition-all flex items-center justify-between group ${
                            currentView === item.id
                            ? 'bg-secondary/20 text-secondary border border-secondary/50' 
                            : 'bg-white/5 text-slate-300 border border-white/5 active:bg-white/10'
                        }`}
                    >
                        <span>{item.label}</span>
                        {currentView === item.id && <div className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_10px_#06b6d4]"></div>}
                    </button>
                ))}
            </nav>
            
            <div className="mt-auto pt-6 pb-8 text-center text-slate-500 text-sm">
                KidRise Microscope Explorer
            </div>
        </div>,
        document.body
      )}
    </header>
  );
};
