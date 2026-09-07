import React, { lazy, Suspense, useState } from 'react';
import { ViewState, Language, ExperienceMode, AchievementId } from './types';
import { TEXTS, IMAGES } from './constants';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { LoginGate } from './components/LoginGate';
import { FirstRunGuide } from './components/FirstRunGuide';
import { InstallAppPrompt } from './components/InstallAppPrompt';

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
  const [mode, setMode] = useState<ExperienceMode>(() => {
    try {
      return localStorage.getItem('kr_microscope_mode') === 'advanced' ? 'advanced' : 'beginner';
    } catch {
      return 'beginner';
    }
  });
  const [lastView, setLastView] = useState<ViewState | null>(() => {
    try {
      const stored = localStorage.getItem('kr_microscope_last_view') as ViewState | null;
      return stored && stored !== 'home' ? stored : null;
    } catch {
      return null;
    }
  });
  const [showFirstRunGuide, setShowFirstRunGuide] = useState(() => {
    try {
      return localStorage.getItem('kr_microscope_onboarding_complete') !== 'true';
    } catch {
      return true;
    }
  });
  const [achievements, setAchievements] = useState<AchievementId[]>(() => {
    const valid: AchievementId[] = ['onboarding', 'guide', 'planner', 'focus', 'journal', 'pdf', 'learn', 'quiz', 'gallery', 'ar'];
    try {
      const raw = localStorage.getItem('kr_microscope_achievements');
      if (raw) {
        const stored = JSON.parse(raw);
        if (Array.isArray(stored)) {
          const isLegacyProgress = stored.every((item) => ['guide', 'observe', 'journal'].includes(item));
          if (isLegacyProgress) {
            const migratedLegacy: AchievementId[] = [];
            if (localStorage.getItem('kr_microscope_onboarding_complete') === 'true') migratedLegacy.push('onboarding');
            if (stored.includes('observe')) migratedLegacy.push('planner');
            if (stored.includes('guide') && !migratedLegacy.includes('onboarding')) migratedLegacy.push('guide');
            return migratedLegacy;
          }
          const migrated = stored.map((item) => item === 'observe' ? 'planner' : item);
          return migrated.filter((item): item is AchievementId => valid.includes(item));
        }
      }
    } catch {
      // Infer a small amount of progress for returning users below.
    }
    const inferred: AchievementId[] = [];
    try {
      if (localStorage.getItem('kr_microscope_onboarding_complete') === 'true') inferred.push('onboarding');
      const previous = localStorage.getItem('kr_microscope_last_view');
      if (previous && valid.includes(previous as AchievementId)) inferred.push(previous as AchievementId);
    } catch {
      // Start with an empty in-memory progress list.
    }
    return inferred;
  });
  // Check auth state from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return localStorage.getItem('kr_microscope_auth') === 'true';
    } catch {
      return false;
    }
  });

  const t = TEXTS[lang];

  const unlockAchievement = (achievement: AchievementId) => {
    setAchievements((current) => {
      if (current.includes(achievement)) return current;
      const next = [...current, achievement];
      try {
        localStorage.setItem('kr_microscope_achievements', JSON.stringify(next));
      } catch {
        // The achievement still lasts for this visit.
      }
      return next;
    });
  };

  React.useEffect(() => {
    document.title = t.title;
  }, [t.title]);

  const toggleLang = () => {
    setLang(prev => prev === 'zh' ? 'en' : 'zh');
  };

  const navigate = (nextView: ViewState) => {
    setView(nextView);
    const pageAchievements: Partial<Record<ViewState, AchievementId>> = {
      usage: 'guide', planner: 'planner', learn: 'learn', gallery: 'gallery', ar: 'ar',
    };
    const pageAchievement = pageAchievements[nextView];
    if (pageAchievement) unlockAchievement(pageAchievement);
    if (nextView !== 'home') {
      setLastView(nextView);
      try {
        localStorage.setItem('kr_microscope_last_view', nextView);
      } catch {
        // Storage can be unavailable in privacy-restricted browsers.
      }
    }
  };

  const changeMode = (nextMode: ExperienceMode) => {
    setMode(nextMode);
    try {
      localStorage.setItem('kr_microscope_mode', nextMode);
    } catch {
      // Keep the in-memory preference for this visit.
    }
  };

  const completeFirstRunGuide = () => {
    setShowFirstRunGuide(false);
    unlockAchievement('onboarding');
    try {
      localStorage.setItem('kr_microscope_onboarding_complete', 'true');
    } catch {
      // The guide still closes even when persistence is unavailable.
    }
  };

  if (!isAuthenticated) {
    return (
      <>
        <LoginGate
          t={t}
          lang={lang}
          onToggleLang={toggleLang}
          onLogin={() => setIsAuthenticated(true)}
        />
        <InstallAppPrompt lang={lang} visible={false} />
      </>
    );
  }

  const renderContent = () => {
    switch (view) {
      case 'home':
        return <Hero t={t} lang={lang} mode={mode} lastView={lastView} achievements={achievements} onNavigate={navigate} onModeChange={changeMode} onReplayGuide={() => setShowFirstRunGuide(true)} />;
      case 'usage':
        return <UsageGuide t={t} />;
      case 'planner':
        return <Planner t={t} onFocusAchieved={() => unlockAchievement('focus')} onJournalSaved={() => unlockAchievement('journal')} onPdfExported={() => unlockAchievement('pdf')} />;
      case 'learn':
        return <LearningCenter t={t} />;
      case 'gallery':
        return <Gallery t={t} />;
      case 'quiz':
        return <QuizArena t={t} lang={lang} onComplete={() => unlockAchievement('quiz')} />;
      case 'ar':
        return <ARLab t={t} />;
      case 'journal':
        return (
          <JournalCanvas 
            image={IMAGES.journal.background} 
            lens="400x"
            specimenName="Free Draw"
            t={t}
            onClose={() => navigate('home')}
            onJournalSaved={() => unlockAchievement('journal')}
            onPdfExported={() => unlockAchievement('pdf')}
          />
        );
      default:
        return <Hero t={t} lang={lang} mode={mode} lastView={lastView} achievements={achievements} onNavigate={navigate} onModeChange={changeMode} onReplayGuide={() => setShowFirstRunGuide(true)} />;
    }
  };

  return (
    <>
    <div className="min-h-screen flex flex-col font-sans selection:bg-secondary/30 selection:text-secondary">
      <Header 
        t={t} 
        currentView={view} 
        onNavigate={navigate}
        lang={lang} 
        onToggleLang={toggleLang}
        mode={mode}
        onToggleMode={() => changeMode(mode === 'beginner' ? 'advanced' : 'beginner')}
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
      {showFirstRunGuide && <FirstRunGuide t={t} onComplete={completeFirstRunGuide} />}
    </div>
    <InstallAppPrompt lang={lang} />
    </>
  );
};

export default App;
