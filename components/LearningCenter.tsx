import React, { useState } from 'react';
import { Translation } from '../types';
import { Lightbulb, Info, BookOpen, Microscope, ZoomIn, Layers, Wrench, ClipboardList, Settings, ChevronRight } from 'lucide-react';

interface LearningCenterProps {
  t: Translation;
}

type SectionKey = keyof Translation['learn']['menu'];

export const LearningCenter: React.FC<LearningCenterProps> = ({ t }) => {
  const [activeSection, setActiveSection] = useState<SectionKey>('intro');
  const [activePart, setActivePart] = useState<number | null>(null);

  React.useEffect(() => {
    setActivePart(null);
  }, [activeSection]);

  const menuIcons: Record<SectionKey, React.ReactNode> = {
    intro: <BookOpen size={20} />,
    types: <Microscope size={20} />,
    magnification: <ZoomIn size={20} />,
    parts: <Layers size={20} />,
    accessories: <Wrench size={20} />,
    preparation: <ClipboardList size={20} />,
    guide: <BookOpen size={20} />,
    diy: <Lightbulb size={20} />,
    applications: <Microscope size={20} />,
    maintenance: <Settings size={20} />,
  };

  const renderContent = () => {
    const data = t.learn;
    
    switch (activeSection) {
      case 'intro':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="glass-panel p-8 rounded-3xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-10 opacity-10">
                  <BookOpen size={200} />
               </div>
               <h3 className="text-3xl font-bold text-secondary mb-6 relative z-10">{data.intro.title}</h3>
               <div className="prose prose-invert max-w-none relative z-10">
                  {data.intro.content.map((paragraph, idx) => (
                    <p key={idx} className="text-lg text-slate-200 leading-relaxed mb-4">{paragraph}</p>
                  ))}
               </div>
            </div>
          </div>
        );

      case 'types':
        return (
           <div className="grid gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-3xl font-bold text-secondary mb-2">{data.types.title}</h3>
              {data.types.items.map((item, idx) => (
                  <div key={idx} className="glass-panel p-6 rounded-2xl border-l-4 border-secondary hover:bg-white/5 transition-colors">
                      <h4 className="text-xl font-bold text-white mb-2">{item.name}</h4>
                      <p className="text-slate-300">{item.desc}</p>
                  </div>
              ))}
           </div>
        );

      case 'magnification':
        return (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="glass-panel p-8 rounded-3xl relative overflow-hidden bg-gradient-to-br from-indigo-900/40 to-purple-900/40">
                   <h3 className="text-3xl font-bold text-secondary mb-6">{data.magnification.title}</h3>
                   <div className="space-y-4">
                      {data.magnification.content.map((text, idx) => (
                          <div key={idx} className="flex gap-4">
                              <div className="w-1 h-full min-h-[1.5rem] bg-pink-500 rounded-full mt-2"></div>
                              <p className="text-lg text-slate-200">{text}</p>
                          </div>
                      ))}
                   </div>
                </div>
            </div>
        );

      case 'parts':
         return (
            <div className="space-y-8 animate-in fade-in zoom-in duration-500">
                <div className="flex justify-between items-center">
                    <h3 className="text-3xl font-bold text-secondary">{data.parts.title}</h3>
                    <span className="text-slate-400 text-sm italic hidden md:block">{t.learn.didYouKnow}</span>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 items-start">
                    {/* Parts List */}
                    <div className="space-y-4">
                        {data.parts.items.map((part, index) => (
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
                                        w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-colors
                                        ${activePart === index ? 'bg-secondary text-white' : 'bg-slate-700 text-slate-400'}
                                    `}>
                                        {index + 1}
                                    </div>
                                    <h3 className="text-xl font-bold flex-grow text-white">{part.name}</h3>
                                    {activePart === index && <Info className="text-secondary animate-pulse" size={20} />}
                                </div>
                                
                                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activePart === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="p-4 pt-0">
                                        <div className="rounded-xl overflow-hidden mb-4 h-48 w-full bg-black/20">
                                            <img src={part.image} alt={part.name} className="w-full object-cover" />
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

                    {/* Desktop Visual */}
                    <div className="hidden lg:block sticky top-24">
                        <div className="glass-panel rounded-3xl p-8 flex flex-col items-center justify-center min-h-[500px] text-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
                            
                            {activePart !== null ? (
                                <div className="animate-in fade-in zoom-in duration-500 space-y-6 relative z-10 w-full">
                                     <div className="w-full h-96 rounded-2xl overflow-hidden shadow-2xl bg-black/40 backdrop-blur-sm border border-white/10">
                                         <img 
                                            src={data.parts.items[activePart].image} 
                                            className="w-full h-full object-cover" 
                                            alt={data.parts.items[activePart].name} 
                                         />
                                     </div>
                                     <h3 className="text-3xl font-bold text-secondary">{data.parts.items[activePart].name}</h3>
                                     <p className="text-xl text-slate-300 max-w-md mx-auto">{data.parts.items[activePart].desc}</p>
                                </div>
                            ) : (
                                <div className="opacity-50 space-y-4 z-10">
                                    <div className="w-40 h-64 border-2 border-dashed border-slate-500 rounded-xl mx-auto flex items-center justify-center">
                                        <Layers size={48} className="text-slate-500" />
                                    </div>
                                    <p className="text-xl text-slate-400">Select a part to view details</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
         );

      case 'accessories':
        return (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-3xl font-bold text-secondary">{data.accessories.title}</h3>
                <div className="grid md:grid-cols-2 gap-4">
                    {data.accessories.items.map((item, idx) => (
                        <div key={idx} className="glass-panel p-5 rounded-xl hover:bg-white/10 transition-all flex gap-4 items-start">
                            <div className="bg-secondary/20 p-3 rounded-lg text-secondary">
                                <Wrench size={24} />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-white">{item.name}</h4>
                                <p className="text-slate-300 text-sm mt-1">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );

      case 'preparation':
        return (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="glass-panel p-6 rounded-2xl bg-orange-500/10 border-orange-500/20 mb-6">
                    <h3 className="text-2xl font-bold text-orange-300 mb-2">{data.preparation.title}</h3>
                    <p className="text-orange-100">{data.preparation.intro}</p>
                </div>

                <div className="space-y-4">
                    {data.preparation.steps.map((step, idx) => (
                        <div key={idx} className="flex gap-4 items-start">
                            <div className="flex flex-col items-center">
                                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center font-bold text-black border-2 border-orange-300 z-10">
                                    {idx + 1}
                                </div>
                                {idx !== data.preparation.steps.length - 1 && (
                                    <div className="w-0.5 h-full bg-slate-700 my-2"></div>
                                )}
                            </div>
                            <div className="glass-panel p-5 rounded-xl flex-grow pb-8 relative top-[-10px]">
                                <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
                                <p className="text-slate-300">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );

      case 'guide':
        return (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="glass-panel p-6 rounded-2xl bg-sky-500/10 border-sky-500/20 mb-8">
                     <h3 className="text-3xl font-bold text-sky-400 mb-4">{data.guide.title}</h3>
                     <p className="text-lg text-sky-100">{data.guide.intro}</p>
                </div>

                <div className="space-y-12 pl-4 border-l-2 border-slate-700/50">
                    {data.guide.steps.map((step, idx) => (
                        <div key={idx} className="relative pl-8">
                             <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-sky-500 border-4 border-slate-900 shadow-[0_0_10px_rgba(14,165,233,0.5)]"></div>
                             <h4 className="text-xl font-bold text-white mb-2">{step.title}</h4>
                             <p className="text-slate-300 leading-relaxed">{step.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="grid md:grid-cols-3 gap-4 mt-8">
                    {data.guide.tips.map((tip, idx) => (
                        <div key={idx} className="glass-panel p-4 rounded-xl bg-yellow-500/5 border-yellow-500/10">
                            <div className="text-yellow-400 mb-2"><Lightbulb size={20} /></div>
                            <p className="text-sm text-yellow-100/80">{tip}</p>
                        </div>
                    ))}
                </div>
            </div>
        );

      case 'diy':
         return (
             <div className="space-y-8 animate-in fade-in zoom-in duration-500">
                  <div className="text-center max-w-2xl mx-auto mb-8">
                      <h3 className="text-3xl font-bold text-secondary mb-3">{data.diy.title}</h3>
                      <p className="text-slate-400 italic">"{data.diy.intro}"</p>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {data.diy.projects.map((project, idx) => (
                          <div key={idx} className="glass-panel p-6 rounded-2xl hover:bg-white/5 transition-all group flex flex-col h-full border border-white/5 hover:border-secondary/50">
                              <div className="flex justify-between items-start mb-4">
                                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center text-white shadow-lg">
                                      <Lightbulb size={24} />
                                  </div>
                                  <span className="text-xs font-bold text-slate-500 bg-black/30 px-2 py-1 rounded">Exp #{idx + 1}</span>
                              </div>
                              
                              <h4 className="text-xl font-bold text-white mb-2 group-hover:text-secondary transition-colors">{project.title}</h4>
                              <p className="text-slate-400 text-sm mb-4 flex-grow">{project.desc}</p>
                              
                              <div className="space-y-4 pt-4 border-t border-white/5">
                                  <div>
                                      <h5 className="text-xs font-bold text-slate-500 uppercase mb-2">Materials</h5>
                                      <div className="flex flex-wrap gap-2">
                                          {project.materials.map((mat, i) => (
                                              <span key={i} className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded-md">{mat}</span>
                                          ))}
                                      </div>
                                  </div>
                                  
                                  {project.note && (
                                     <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                                         <p className="text-xs text-blue-200">ℹ️ {project.note}</p>
                                     </div>
                                  )}
                              </div>
                          </div>
                      ))}
                  </div>
             </div>
         );

      case 'applications':
          return (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="mb-6">
                      <h3 className="text-3xl font-bold text-secondary mb-2">{data.applications.title}</h3>
                      <p className="text-lg text-slate-300">{data.applications.intro}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                      {data.applications.fields.map((field, idx) => (
                          <div key={idx} className="glass-panel p-6 rounded-2xl flex gap-4 items-start hover:bg-white/5 transition-all">
                              <div className="w-12 h-12 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center flex-shrink-0">
                                  <Microscope size={24} />
                              </div>
                              <div>
                                  <h4 className="text-xl font-bold text-white mb-2">{field.title}</h4>
                                  <p className="text-slate-300">{field.desc}</p>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          );

      case 'maintenance':
        return (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="glass-panel p-8 rounded-3xl border border-green-500/30 bg-green-900/10">
                   <div className="flex items-center gap-4 mb-6">
                       <Settings className="text-green-400" size={32} />
                       <h3 className="text-3xl font-bold text-green-400">{data.maintenance.title}</h3>
                   </div>
                   <div className="space-y-6">
                      {data.maintenance.content.map((text, idx) => (
                          <div key={idx} className="flex gap-4 p-4 rounded-xl bg-black/20 border border-white/5">
                              <div className="text-green-500 text-xl">✓</div>
                              <p className="text-lg text-slate-200">{text}</p>
                          </div>
                      ))}
                   </div>
                </div>
            </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400 inline-block">
            {t.learn.title}
        </h2>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="md:w-64 flex-shrink-0">
             <div className="glass-panel rounded-2xl p-2 sticky top-24 overflow-x-auto md:overflow-visible flex md:block gap-2 no-scrollbar">
                {(Object.keys(t.learn.menu) as SectionKey[]).map((key) => (
                    <button
                        key={key}
                        onClick={() => setActiveSection(key)}
                        className={`
                            flex items-center gap-3 w-full p-3 rounded-xl text-left transition-all duration-300 whitespace-nowrap
                            ${activeSection === key 
                                ? 'bg-secondary text-white shadow-lg shadow-cyan-500/20' 
                                : 'text-slate-400 hover:bg-white/5 hover:text-white'}
                        `}
                    >
                        {menuIcons[key]}
                        <span className="font-bold">{t.learn.menu[key]}</span>
                        {activeSection === key && <ChevronRight className="ml-auto hidden md:block" size={16} />}
                    </button>
                ))}
             </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-grow min-h-[600px]">
             {renderContent()}
          </div>
      </div>
    </div>
  );
};
