import React, { useState, useEffect } from 'react';
import { Translation } from '../types';
import { Button } from './Button';
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
    // Simulate loading
    setTimeout(() => {
        setStatus('ready');
    }, 2500);
  };

  const reset = () => {
    setStatus('planning');
    setSpecimenId(null);
    setLens(null);
  };

  // Scanning Animation Screen
  if (status === 'scanning') {
      return (
          <div className="flex flex-col items-center justify-center min-h-[500px]">
              <div className="relative w-64 h-64 rounded-full border-4 border-primary overflow-hidden bg-black mb-8 shadow-[0_0_50px_rgba(99,102,241,0.5)]">
                 <div className="absolute inset-0 bg-green-500/20 animate-pulse z-10"></div>
                 <div className="absolute top-0 w-full h-2 bg-green-400 shadow-[0_0_15px_#4ade80] animate-[float_2s_linear_infinite]" style={{ animation: 'scan 1.5s linear infinite' }}></div>
                 {selectedSpecimen && (
                     <img src={selectedSpecimen.image} className="w-full h-full object-cover opacity-50 blur-sm" alt="Scanning" />
                 )}
                 <style>{`
                    @keyframes scan {
                        0% { top: -10%; }
                        100% { top: 110%; }
                    }
                 `}</style>
              </div>
              <h2 className="text-2xl font-bold text-primary animate-pulse">{t.planner.scanning}</h2>
          </div>
      );
  }

  // Result Screen
  if (status === 'ready') {
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="glass-panel rounded-3xl p-8 md:p-12 text-center space-y-8 animate-in fade-in zoom-in duration-500">
          <div className="flex items-center justify-center gap-4 mb-6">
             <CheckCircle size={40} className="text-green-400" />
             <h2 className="text-3xl md:text-4xl font-bold text-green-400">{t.planner.result}</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
             {/* Simulated View */}
             <div className="relative group">
                <div className="w-64 h-64 mx-auto rounded-full border-[8px] border-slate-700 overflow-hidden shadow-inner bg-black relative">
                    <img 
                        src={selectedSpecimen?.image} 
                        alt="Simulated View" 
                        className="w-full h-full object-cover scale-150 group-hover:scale-[1.7] transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]"></div>
                </div>
                <p className="mt-4 text-sm text-slate-400 font-mono">{t.planner.previewLabel}: {selectedSpecimen?.name} @ {lens?.split(' ')[0]}</p>
             </div>

             <div className="text-left space-y-6">
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                    <h3 className="text-xl font-bold mb-2 text-secondary">{t.planner.compare}</h3>
                    <p className="text-slate-300">
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
    <div className="w-full max-w-6xl mx-auto p-4 space-y-8">
      <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
        {t.planner.title}
      </h2>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Col: Controls */}
        <div className="flex-1 space-y-6">
            {/* Specimen Selection */}
            <div className="glass-panel rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 mb-4">
                <div className="bg-secondary/20 p-2 rounded-lg"><Target className="text-secondary" /></div>
                <h3 className="text-xl font-bold">{t.planner.selectSpecimen}</h3>
            </div>
            <div className="grid grid-cols-1 gap-2">
                {t.planner.specimens.map((s) => (
                <button
                    key={s.id}
                    onClick={() => setSpecimenId(s.id)}
                    className={`w-full p-4 rounded-xl text-left transition-all flex items-center justify-between group ${
                    specimenId === s.id 
                    ? 'bg-gradient-to-r from-secondary to-cyan-600 text-white font-bold shadow-lg transform scale-[1.02]' 
                    : 'bg-white/5 hover:bg-white/10 text-slate-300'
                    }`}
                >
                    <span>{s.name}</span>
                    {specimenId === s.id && <CheckCircle size={18} />}
                </button>
                ))}
            </div>
            </div>

            {/* Lens Selection */}
            <div className="glass-panel rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 mb-4">
                <div className="bg-primary/20 p-2 rounded-lg"><ZoomIn className="text-primary" /></div>
                <h3 className="text-xl font-bold">{t.planner.selectLens}</h3>
            </div>
            <div className="flex flex-wrap gap-3">
                {t.planner.lenses.map((l) => (
                <button
                    key={l}
                    onClick={() => setLens(l)}
                    className={`flex-1 min-w-[120px] p-3 rounded-xl text-center transition-all ${
                    lens === l 
                    ? 'bg-gradient-to-r from-primary to-indigo-600 text-white font-bold shadow-lg transform scale-105' 
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5'
                    }`}
                >
                    {l}
                </button>
                ))}
            </div>
            </div>
        </div>

        {/* Right Col: Preview */}
        <div className="w-full lg:w-1/3">
             <div className="glass-panel rounded-3xl p-6 h-full flex flex-col items-center justify-center relative min-h-[300px]">
                 <h3 className="absolute top-6 left-6 text-sm font-bold text-slate-500 uppercase tracking-wider">{t.planner.previewLabel}</h3>
                 
                 <div className={`
                    w-48 h-48 rounded-full border-4 overflow-hidden shadow-2xl transition-all duration-500
                    ${(specimenId && lens) ? 'border-primary shadow-primary/30' : 'border-slate-700 opacity-50'}
                 `}>
                    {selectedSpecimen ? (
                        <div className="w-full h-full bg-black relative">
                            <img 
                                src={selectedSpecimen.image} 
                                alt="Preview" 
                                className="w-full h-full object-cover" 
                                style={{ 
                                    filter: lens?.includes('1200x') ? 'blur(1px) scale(3)' : lens?.includes('400x') ? 'scale(1.5)' : 'none',
                                    transition: 'filter 0.5s, transform 0.5s'
                                }}
                            />
                            {/* Microscope Overlay Effect */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/40 pointer-events-none"></div>
                        </div>
                    ) : (
                        <div className="w-full h-full bg-slate-900 flex items-center justify-center text-slate-600">
                            <Target size={40} />
                        </div>
                    )}
                 </div>

                 <div className="mt-8 w-full">
                    <Button 
                        size="lg" 
                        variant="accent" 
                        fullWidth
                        disabled={!specimenId || !lens}
                        onClick={handleLaunch}
                        className={(!specimenId || !lens) ? 'opacity-50 grayscale' : 'animate-bounce shadow-[0_0_20px_rgba(244,63,94,0.4)]'}
                    >
                        <Rocket className="mr-2" />
                        {t.planner.start}
                    </Button>
                 </div>
             </div>
        </div>
      </div>
    </div>
  );
};
