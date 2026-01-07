import React, { useState } from 'react';
import { Translation } from '../types';
import { Lightbulb, Info } from 'lucide-react';

interface LearningCenterProps {
  t: Translation;
}

export const LearningCenter: React.FC<LearningCenterProps> = ({ t }) => {
  const [activePart, setActivePart] = useState<number | null>(null);

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400 mb-10">
        {t.learn.title}
      </h2>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
         {/* Parts List */}
         <div className="space-y-4">
            {t.learn.parts.map((part, index) => (
                <div 
                    key={index}
                    onClick={() => setActivePart(index === activePart ? null : index)}
                    className={`
                        glass-panel rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer border border-white/5
                        ${activePart === index ? 'bg-white/10 ring-2 ring-secondary scale-[1.02]' : 'hover:bg-white/5'}
                    `}
                >
                    <div className="p-4 flex items-center gap-4">
                        <div className={`
                            w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg
                            ${activePart === index ? 'bg-secondary text-white' : 'bg-slate-700 text-slate-400'}
                        `}>
                            {index + 1}
                        </div>
                        <h3 className="text-xl font-bold flex-grow">{part.name}</h3>
                        {activePart === index && <Info className="text-secondary animate-pulse" size={20} />}
                    </div>
                    
                    {/* Expanded Content */}
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activePart === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="p-4 pt-0">
                            <div className="rounded-xl overflow-hidden mb-4 h-48 w-full">
                                <img src={part.image} alt={part.name} className="w-full h-full object-cover" />
                            </div>
                            <p className="text-lg text-slate-200 mb-4">{part.desc}</p>
                            
                            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 flex gap-3">
                                <Lightbulb className="text-yellow-400 flex-shrink-0" />
                                <div>
                                    <span className="text-xs font-bold text-blue-300 uppercase tracking-wide">{t.learn.didYouKnow}</span>
                                    <p className="text-sm text-blue-100 italic">{part.funFact}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
         </div>

         {/* Visual Graphic Side (Sticky on Desktop) */}
         <div className="hidden lg:block sticky top-24">
            <div className="glass-panel rounded-3xl p-8 flex flex-col items-center justify-center min-h-[500px] text-center relative overflow-hidden">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
                
                {activePart !== null ? (
                    <div className="animate-in fade-in zoom-in duration-500 space-y-6">
                         <div className="w-64 h-64 rounded-full border-4 border-secondary/50 p-1 mx-auto shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                             <img 
                                src={t.learn.parts[activePart].image} 
                                className="w-full h-full object-cover rounded-full" 
                                alt={t.learn.parts[activePart].name} 
                             />
                         </div>
                         <h3 className="text-3xl font-bold text-secondary">{t.learn.parts[activePart].name}</h3>
                         <p className="text-xl text-slate-300 max-w-md mx-auto">{t.learn.parts[activePart].desc}</p>
                    </div>
                ) : (
                    <div className="opacity-50 space-y-4">
                        <div className="w-40 h-64 border-2 border-dashed border-slate-500 rounded-xl mx-auto flex items-center justify-center">
                            <span className="text-slate-500">Select a part</span>
                        </div>
                        <p className="text-xl text-slate-400">Click on a number to learn more!</p>
                    </div>
                )}
            </div>
         </div>
      </div>
    </div>
  );
};
