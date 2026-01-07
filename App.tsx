import React, { useState } from 'react';
import { ViewState, Language } from './types';
import { TEXTS } from './constants';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { UsageGuide } from './components/UsageGuide';
import { Planner } from './components/Planner';
import { LearningCenter } from './components/LearningCenter';
import { QuizArena } from './components/QuizArena';
import { Gallery } from './components/Gallery';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('zh'); // Default to Chinese
  const [view, setView] = useState<ViewState>('home');

  const t = TEXTS[lang];

  const toggleLang = () => {
    setLang(prev => prev === 'zh' ? 'en' : 'zh');
  };

  const renderContent = () => {
    switch (view) {
      case 'home':
        return <Hero t={t} onStart={() => setView('usage')} />;
      case 'usage':
        return <UsageGuide t={t} />;
      case 'planner':
        return <Planner t={t} />;
      case 'learn':
        return <LearningCenter t={t} />;
      case 'gallery':
        return <Gallery t={t} />;
      case 'quiz':
        return <QuizArena t={t} lang={lang} />;
      default:
        return <Hero t={t} onStart={() => setView('usage')} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-secondary/30 selection:text-secondary">
      <Header 
        t={t} 
        currentView={view} 
        onNavigate={setView} 
        lang={lang} 
        onToggleLang={toggleLang} 
      />
      
      <main className="flex-grow flex flex-col relative">
        {/* Subtle grid background overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
        
        <div className="container mx-auto px-4 py-8 relative z-10 flex-grow flex flex-col justify-center">
            {renderContent()}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
