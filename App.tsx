import React, { lazy, Suspense, useState } from 'react';
import { ViewState, Language } from './types';
import { TEXTS, IMAGES } from './constants';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { LoginGate } from './components/LoginGate';

const UsageGuide = lazy(() => import('./components/UsageGuide').then((module) => ({ default: module.UsageGuide })));
const Planner = lazy(() => import('./components/Planner').then((module) => ({ default: module.Planner })));
const LearningCenter = lazy(() => import('./components/LearningCenter').then((module) => ({ default: module.LearningCenter })));
const QuizArena = lazy(() => import('./components/QuizArena').then((module) => ({ default: module.QuizArena })));
const Gallery = lazy(() => import('./components/Gallery').then((module) => ({ default: module.Gallery })));
const ARLab = lazy(() => import('./components/ARLab').then((module) => ({ default: module.ARLab })));
const JournalCanvas = lazy(() => import('./components/JournalCanvas').then((module) => ({ default: module.JournalCanvas })));

const LoadingView = () => (
  <div role="status" className="flex min-h-[320px] items-center justify-center text-secondary">
    <span className="h-10 w-10 animate-spin rounded-full border-4 border-current border-t-transparent" />
    <span className="sr-only">Loading</span>
  </div>
);

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('zh'); // Default to Chinese
  const [view, setView] = useState<ViewState>('home');
  // Check auth state from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return localStorage.getItem('kr_microscope_auth') === 'true';
    } catch {
      return false;
    }
  });

  const t = TEXTS[lang];

  React.useEffect(() => {
    document.title = t.title;
  }, [t.title]);

  const toggleLang = () => {
    setLang(prev => prev === 'zh' ? 'en' : 'zh');
  };

  if (!isAuthenticated) {
    return (
      <LoginGate 
        t={t} 
        lang={lang} 
        onToggleLang={toggleLang} 
        onLogin={() => setIsAuthenticated(true)} 
      />
    );
  }

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
      case 'ar':
        return <ARLab t={t} />;
      case 'journal':
        return (
          <JournalCanvas 
            image={IMAGES.journal.background} 
            lens="400x"
            specimenName="Free Draw"
            t={t}
            onClose={() => setView('home')}
          />
        );
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
        <div className="noise-overlay absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"></div>
        
        <div className="container mx-auto px-4 py-8 relative z-10 flex-grow flex flex-col justify-center">
            <Suspense fallback={<LoadingView />}>
              {renderContent()}
            </Suspense>
        </div>
      </main>

      <Footer t={t} lang={lang} />
    </div>
  );
};

export default App;
