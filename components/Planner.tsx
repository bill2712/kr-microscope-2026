import React, { useState, useEffect } from 'react';
import { Translation } from '../types';
import { Button } from './Button';
import { FocusSimulator } from './FocusSimulator';
import { PageHeader } from './PageHeader';
import { Rocket, Target, ZoomIn, CheckCircle, RotateCcw } from 'lucide-react';

interface PlannerProps {
  t: Translation;
}

export const Planner: React.FC<PlannerProps> = ({ t }) => {
  const [specimenId, setSpecimenId] = useState<string | null>(null);
  const [lens, setLens] = useState<string | null>(null);
  const [status, setStatus] = useState<'planning' | 'scanning' | 'ready'>('planning');

  const selectedSpecimen = t.planner.specimens.find(s => s.id === specimenId);

  const handleLaunch = () => {
    setStatus('scanning');
    // REMOVED: Auto-timeout. Now relies on user completing the simulation.
    // setTimeout(() => {
    //     setStatus('ready');
    // }, 2500);
  };

  const handleFocusComplete = () => {
    setStatus('ready');
  };

  const reset = () => {
    setStatus('planning');
    setSpecimenId(null);
    setLens(null);
  };

  // Scanning / Focus Simulation Screen
  if (status === 'scanning') {
      return (
          <div className="flex flex-col items-center justify-center min-h-[500px] w-full animate-in fade-in duration-500">
              {selectedSpecimen ? (
                  <FocusSimulator 
                    image={
                        lens?.includes('100x') ? selectedSpecimen.images["100x"] :
                        lens?.includes('400x') ? selectedSpecimen.images["400x"] :
                        lens?.includes('1200x') ? selectedSpecimen.images["1200x"] :
                        selectedSpecimen.images["400x"]
                    } 
                    lens={lens || '400x'} 
                    onSuccess={handleFocusComplete} 
                    t={t}
                />
              ) : (
                <div className="text-red-500">Error: No specimen selected</div>
              )}
          </div>
      );
  }

  // Result Screen
  if (status === 'ready') {
    return (
      <div className="w-full max-w-4xl mx-auto p-4 md:p-6">
        <div className="glass-panel rounded-3xl p-6 md:p-12 text-center space-y-6 md:space-y-8 animate-in fade-in zoom-in duration-500">
          <div className="flex items-center justify-center gap-4 mb-4 md:mb-6">
             <CheckCircle size={32} className="text-green-400 md:w-10 md:h-10" />
             <h2 className="text-2xl md:text-4xl font-bold text-green-400">{t.planner.result}</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
             {/* Simulated View */}
             <div className="relative group">
                <div className="w-56 h-56 md:w-64 md:h-64 mx-auto rounded-full border-[6px] md:border-[8px] border-slate-700 overflow-hidden shadow-inner bg-black relative">
                    <img 
                        src={
                            lens?.includes('100x') ? selectedSpecimen?.images["100x"] :
                            lens?.includes('400x') ? selectedSpecimen?.images["400x"] :
                            lens?.includes('1200x') ? selectedSpecimen?.images["1200x"] :
                            selectedSpecimen?.images["400x"]
                        } 
                        alt="Simulated View" 
                        className="w-full h-full object-cover scale-150 group-hover:scale-[1.7] transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]"></div>
                </div>
                <p className="mt-4 text-xs md:text-sm text-slate-400 font-mono">{t.planner.previewLabel}: {selectedSpecimen?.name} @ {lens?.split(' ')[0]}</p>
             </div>

             <div className="text-left space-y-4 md:space-y-6">
                <div className="bg-white/5 p-4 md:p-6 rounded-2xl border border-white/10">
                    <h3 className="text-lg md:text-xl font-bold mb-2 text-secondary">{t.planner.compare}</h3>
                    <p className="text-sm md:text-base text-slate-300">
                        1. Put the <strong>{selectedSpecimen?.name}</strong> slide on. <br/>
                        2. Switch to <strong>{lens}</strong>. <br/>
                        3. Focus until it looks sharp like the picture!
                    </p>
                </div>
                <Button onClick={reset} variant="primary" size="lg" fullWidth>
                    <RotateCcw size={20} className="mr-2" /> Start New Mission
                </Button>
             </div>
          </div>
        </div>
      </div>
    );
  }

  // Selection Screen
  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6 md:space-y-8">
      <PageHeader title={t.planner.title} />

      <div className="flex flex-col-reverse lg:flex-row gap-6 md:gap-8">
        
        {/* Left Col: Controls (Bottom on mobile, Left on desktop) */}
        <div className="flex-1 space-y-6">
            {/* Specimen Selection */}
            <div className="glass-panel rounded-2xl p-4 md:p-6 space-y-3 md:space-y-4">
            <div className="flex items-center gap-2 mb-2">
                <div className="bg-secondary/20 p-1.5 md:p-2 rounded-lg"><Target className="text-secondary" size={18} /></div>
                <h3 className="text-base md:text-xl font-bold">{t.planner.selectSpecimen}</h3>
            </div>
            {/* Horizontal Scroll layout for specimens on mobile, grid on desktop */}
            <div className="flex overflow-x-auto pb-4 gap-3 snap-x lg:grid lg:grid-cols-3 lg:gap-3 lg:pb-0 scrollbar-hide">
                {t.planner.specimens.map((s) => (
                <button
                    key={s.id}
                    onClick={() => setSpecimenId(s.id)}
                    className={`min-w-[140px] lg:w-full p-2 md:p-3 rounded-xl text-left transition-all flex flex-col md:flex-row items-start md:items-center justify-between group active:scale-[0.98] h-full snap-start border border-transparent ${
                    specimenId === s.id 
                    ? 'bg-gradient-to-r from-secondary to-cyan-600 text-white font-bold shadow-lg transform scale-[1.02]' 
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/5'
                    }`}
                >
                    <span className="text-xs md:text-sm leading-tight whitespace-normal">{s.name}</span>
                    {specimenId === s.id && <CheckCircle size={14} className="mt-1 md:mt-0 opacity-80" />}
                </button>
                ))}
            </div>
            </div>

            {/* Lens Selection */}
            <div className="glass-panel rounded-2xl p-4 md:p-6 space-y-3 md:space-y-4">
            <div className="flex items-center gap-2 mb-2">
                <div className="bg-primary/20 p-1.5 md:p-2 rounded-lg"><ZoomIn className="text-primary" size={18} /></div>
                <h3 className="text-base md:text-xl font-bold">{t.planner.selectLens}</h3>
            </div>
            {/* Horizontal scroll for lens on mobile */}
            <div className="flex overflow-x-auto pb-2 gap-2 md:gap-3 snap-x flex-nowrap lg:flex-wrap scrollbar-hide">
                {t.planner.lenses.map((l) => (
                <button
                    key={l}
                    onClick={() => setLens(l)}
                    className={`min-w-[80px] md:min-w-[100px] flex-shrink-0 p-2 md:p-3 rounded-xl text-center transition-all text-xs md:text-base active:scale-[0.98] snap-start border border-transparent ${
                    lens === l 
                    ? 'bg-gradient-to-r from-primary to-indigo-600 text-white font-bold shadow-lg transform scale-105' 
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/5'
                    }`}
                >
                    {l}
                </button>
                ))}
            </div>
            </div>
        </div>

        {/* Right Col: Preview (Top on mobile, Right on desktop) */}
        <div className="w-full lg:w-96 shrink-0">
             <div className="glass-panel rounded-3xl p-4 md:p-6 h-auto lg:h-full flex flex-row lg:flex-col items-center gap-4 lg:gap-6 relative sticky top-[80px] z-10 lg:static"> 
                 {/* Mobile: Horizontal layout for preview card to save space? Actually let's keep it clean but smaller */}
                 
                 <div className="hidden lg:block absolute top-6 left-6 text-sm font-bold text-slate-500 uppercase tracking-wider">{t.planner.previewLabel}</div>
                 
                 <div className={`
                    w-48 h-48 md:w-64 md:h-64 lg:w-96 lg:h-96 rounded-full border-[3px] md:border-4 overflow-hidden shadow-2xl transition-all duration-500 shrink-0
                    ${(specimenId && lens) ? 'border-primary shadow-primary/30' : 'border-slate-700 opacity-50'}
                 `}>
                    {selectedSpecimen ? (
                        <div className="w-full h-full bg-black relative">
                            <img 
                                src={
                                    lens?.includes('100x') ? selectedSpecimen.images["100x"] :
                                    lens?.includes('400x') ? selectedSpecimen.images["400x"] :
                                    lens?.includes('1200x') ? selectedSpecimen.images["1200x"] :
                                    selectedSpecimen.images["400x"] // Default fallback
                                }
                                alt="Preview" 
                                className="w-full h-full object-cover animate-in fade-in duration-500" 
                            />
                            {/* Microscope Overlay Effect */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/40 pointer-events-none"></div>
                        </div>
                    ) : (
                        <div className="w-full h-full bg-slate-900 flex items-center justify-center text-slate-600">
                            <Target size={24} className="md:w-10 md:h-10" />
                        </div>
                    )}
                 </div>

                 <div className="flex-1 w-full flex flex-col gap-2">
                    <h3 className="lg:hidden text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{t.planner.previewLabel}</h3>
                    <div className="text-sm text-slate-300 mb-2 min-h-[1.5em]">
                        {selectedSpecimen ? (
                            <span>{selectedSpecimen.name} <span className="text-secondary">@ {lens || '?'}</span></span>
                        ) : (
                            <span className="text-slate-500 italic">Select a specimen...</span>
                        )}
                    </div>

                    <Button 
                        size={window.innerWidth < 768 ? "sm" : "lg"}
                        variant="accent" 
                        fullWidth
                        disabled={!specimenId || !lens}
                        onClick={handleLaunch}
                        className={(!specimenId || !lens) ? 'opacity-50 grayscale' : 'animate-bounce shadow-[0_0_20px_rgba(244,63,94,0.4)]'}
                    >
                        <Rocket className="mr-2 w-4 h-4 md:w-5 md:h-5" />
                        {t.planner.start}
                    </Button>
                 </div>
             </div>
        </div>
      </div>
    </div>
  );
};
