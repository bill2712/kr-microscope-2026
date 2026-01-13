import React, { useState } from 'react';
import { Translation } from '../types';
import { Button } from './Button';
import { Badge, Box } from 'lucide-react';
import '@google/model-viewer';

// Declare model-viewer as an intrinsic element for TS
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        src: string;
        poster?: string;
        alt: string;
        'ar'?: boolean;
        'ar-modes'?: string;
        'camera-controls'?: boolean;
        'shadow-intensity'?: string;
        'auto-rotate'?: boolean;
      }, HTMLElement>;
    }
  }
}

interface ARLabProps {
  t: Translation;
}

export const ARLab: React.FC<ARLabProps> = ({ t }) => {
  const [model, setModel] = useState<'astro' | 'microscope'>('astro');

  // Using public reliable Models from Google's model-viewer examples
  const MODELS = {
    astro: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
    microscope: "https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb" // Temporarily using Neil Armstrong as "Microscope" placeholder is hard to find reliably without CORS issues.
    // Ideally we would host a microscope.glb in our public folder. 
    // For "Big Microbes", maybe a weird alien blob? 
    // Let's use "NeilArmstrong.glb" as placeholder for now or swap if we find better.
  };
  
  // Let's try to find a bug-like model if possible, or just stick to Astronaut for the "Wow" factor proof.
  
  return (
    <div className="w-full min-h-[calc(100vh-80px)] flex flex-col items-center bg-slate-950 text-white p-4 md:p-8">
      
      {/* Header */}
      <div className="text-center mb-8 max-w-2xl animate-in slide-in-from-top-4 duration-700">
        <Badge className="w-16 h-16 text-purple-400 mb-4 mx-auto animate-bounce" />
        <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
          {t.ar.title}
        </h2>
        <p className="text-slate-400 text-lg md:text-xl">
           {t.ar.description}
        </p>
      </div>

      {/* Main AR Viewer Card */}
      <div className="relative w-full max-w-4xl h-[60vh] md:h-[600px] bg-slate-900 rounded-3xl overflow-hidden border border-slate-700 shadow-2xl flex flex-col md:flex-row">
        
        {/* Controls Sidebar */}
        <div className="p-6 bg-slate-800/50 backdrop-blur-md border-b md:border-b-0 md:border-r border-slate-700 flex flex-col gap-6 md:w-64 z-10">
            <div>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Box size={20} className="text-purple-400"/> {t.planner.selectSpecimen}
                </h3>
                <div className="space-y-3">
                    <button 
                        onClick={() => setModel('astro')}
                        className={`w-full p-4 rounded-xl text-left transition-all border ${
                            model === 'astro' 
                            ? 'bg-purple-600/20 border-purple-500 text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.3)]' 
                            : 'bg-slate-700/50 border-transparent hover:bg-slate-700 text-slate-400'
                        }`}
                    >
                        <div className="font-bold">{t.ar.models.astro}</div>
                    </button>

                    <button 
                        onClick={() => setModel('microscope')}
                        className={`w-full p-4 rounded-xl text-left transition-all border ${
                            model === 'microscope' 
                            ? 'bg-purple-600/20 border-purple-500 text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.3)]' 
                            : 'bg-slate-700/50 border-transparent hover:bg-slate-700 text-slate-400'
                        }`}
                    >
                         {/* Swapping label just for the demo if using Neil Armstrong, but let's keep it abstract */}
                        <div className="font-bold">Moon Walker</div> 
                    </button>
                </div>
            </div>

            <div className="mt-auto bg-blue-900/30 p-4 rounded-xl border border-blue-500/30">
                <p className="text-sm text-blue-200 leading-relaxed">
                   ℹ️ {t.ar.instruction}
                </p>
            </div>
        </div>

        {/* 3D Viewer Area */}
        <div className="flex-1 relative bg-gradient-to-br from-slate-900 to-black">
             {/* 
                model-viewer attributes:
                alt: Accessibility text
                src: Path to .glb file
                ar: Enables AR
                ar-modes: Prioritize WebXR ('webxr'), fallback to SceneViewer ('scene-viewer'), then QuickLook ('quick-look')
                camera-controls: Allows mouse/touch interaction
                auto-rotate: Spins model automatically
                shadow-intensity: Rendering quality
             */}
             <model-viewer
                src={MODELS[model]}
                alt={`A 3D model of ${model}`}
                ar
                ar-modes="webxr scene-viewer quick-look"
                camera-controls
                auto-rotate
                shadow-intensity="1"
                style={{ width: '100%', height: '100%' } as React.CSSProperties}
             >
                 {/* Custom AR Button slot */}
                 <button slot="ar-button" className="absolute bottom-6 right-6 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold shadow-lg transform transition hover:scale-105 active:scale-95 flex items-center gap-2 z-20">
                    <Box size={20} />
                    View in your space
                 </button>
             </model-viewer>
        </div>

      </div>

    </div>
  );
};
