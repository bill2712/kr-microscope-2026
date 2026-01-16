import React, { useState } from 'react';
import { Translation } from '../types';
import { Upload, Camera, Box } from 'lucide-react';
import '@google/model-viewer';

// Type definitions for model-viewer to avoid TS errors
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
        'slot'?: string;
      }, HTMLElement>;
    }
  }
}

interface ARLabProps {
  t: Translation;
}

export const ARLab: React.FC<ARLabProps> = ({ t }) => {
  const [modelType, setModelType] = useState<'neil' | 'astro' | 'duck' | 'avocado' | 'cell' | 'detailedCell' | 'bacteria' | 'virus' | 'yeast' | 'custom'>('neil');
  const [customSrc, setCustomSrc] = useState<string | null>(null);

  // Local trustworthy models
  const MODELS = {
    neil: {
      src: "/models/NeilArmstrong.glb",
      iosSrc: "/models/NeilArmstrong.usdz"
    },
    astro: {
      src: "/models/Astronaut.glb",
      iosSrc: "/models/Astronaut.usdz"
    },
    duck: {
      src: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF-Binary/Duck.glb",
      iosSrc: "" 
    },
    avocado: {
      src: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Avocado/glTF-Binary/Avocado.glb",
      iosSrc: "" 
    },
    cell: {
      src: "/models/cell-model.glb",
      iosSrc: "/models/cell-model.usdz"
    },
    detailedCell: {
      src: "/models/detailed-cell.glb",
      iosSrc: "/models/detailed-cell.usdz"
    },
    bacteria: {
      src: "/models/bacteria_model.glb",
      iosSrc: "/models/bacteria_model.glb.usdz"
    },
    virus: {
      src: "/models/covid_19_virus.glb",
      iosSrc: "/models/covid_19_virus.usdz"
    },
    yeast: {
      src: "/models/yeast_fungi.glb",
      iosSrc: "/models/yeast_fungi.glb.usdz"
    }
  };

  const getCurrentModel = () => {
    if (modelType === 'custom') {
      return {
        src: customSrc || MODELS.neil.src,
        iosSrc: ''
      };
    }
    return MODELS[modelType];
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomSrc(url);
      setModelType('custom');
    }
  };

  return (
    <div className="flex flex-col w-full h-[calc(100vh-80px)] bg-black relative overflow-hidden rounded-3xl border border-slate-800 shadow-2xl">
      
      {/* 3D Viewport - Absolute Fill */}
      <div className="absolute inset-0 z-0">
         <model-viewer
            src={getCurrentModel().src}
            ios-src={getCurrentModel().iosSrc}
            poster="https://modelviewer.dev/assets/poster-astronaut.png"
            alt="A 3D model for AR"
            shadow-intensity="1"
            camera-controls
            auto-rotate
            ar
            ar-modes="webxr scene-viewer quick-look"
            style={{ width: '100%', height: '100%' }}
         >
            {/* Custom AR Button */}
            <button 
              slot="ar-button" 
              className="absolute top-4 right-4 md:top-6 md:right-6 bg-white text-black px-4 py-2 md:px-6 md:py-3 rounded-full font-bold shadow-lg flex items-center gap-2 transform transition hover:scale-105 active:scale-95 z-20 text-sm md:text-base"
            >
              <Camera size={18} className="md:w-5 md:h-5" />
              View in your space
            </button>
         </model-viewer>
      </div>

      {/* UI Overlay - Top Left Info */}
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 pointer-events-none max-w-[200px] md:max-w-xs">
        <div className="bg-black/40 backdrop-blur-md border border-white/10 p-3 md:p-4 rounded-2xl pointer-events-auto">
           <h2 className="text-xl md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400">
             {t.ar.title}
           </h2>
           <p className="text-slate-300 text-xs md:text-sm mt-1">
             {t.ar.description}
           </p>
           {/* Instruction Note Moved Here */}
           <div className="mt-2 md:mt-3 inline-block">
              <p className="text-[10px] md:text-xs text-slate-400 font-mono bg-white/5 inline-block px-2 py-1 rounded-lg border border-white/5">
                ℹ️ {t.ar.instruction}
              </p>
           </div>
        </div>
      </div>

      {/* UI Overlay - Bottom Center Controls */}
      <div className="absolute bottom-8 md:bottom-6 left-1/2 -translate-x-1/2 z-10 w-full max-w-4xl px-4 pointer-events-none">
        <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 p-2 rounded-2xl flex items-center gap-2 shadow-xl overflow-x-auto pointer-events-auto no-scrollbar touch-manipulation">
           {/* ... buttons ... */}
           <button 
             onClick={() => setModelType('neil')}
             className={`flex-none py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap active:scale-95 ${
               modelType === 'neil' 
               ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
               : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
             }`}
           >
             <Box size={18} />
             Neil
           </button>

           <button 
             onClick={() => setModelType('astro')}
             className={`flex-none py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap active:scale-95 ${
               modelType === 'astro' 
               ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
               : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
             }`}
           >
             <Box size={18} />
             Suit
           </button>

           <button 
             onClick={() => setModelType('duck')}
             className={`flex-none py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap active:scale-95 ${
               modelType === 'duck' 
               ? 'bg-yellow-600 text-white shadow-lg shadow-yellow-500/30' 
               : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
             }`}
           >
             <Box size={18} />
             Duck
           </button>

           <button 
             onClick={() => setModelType('avocado')}
             className={`flex-none py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap active:scale-95 ${
               modelType === 'avocado' 
               ? 'bg-green-600 text-white shadow-lg shadow-green-500/30' 
               : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
             }`}
           >
             <Box size={18} />
             Avocado
           </button>

           <button 
             onClick={() => setModelType('cell')}
             className={`flex-none py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap active:scale-95 ${
               modelType === 'cell' 
               ? 'bg-rose-600 text-white shadow-lg shadow-rose-500/30' 
               : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
             }`}
           >
             <Box size={18} />
             Cell
           </button>

           <button 
             onClick={() => setModelType('detailedCell')}
             className={`flex-none py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap active:scale-95 ${
               modelType === 'detailedCell' 
               ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/30' 
               : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
             }`}
           >
             <Box size={18} />
             Detailed
           </button>

           <button 
             onClick={() => setModelType('bacteria')}
             className={`flex-none py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap active:scale-95 ${
               modelType === 'bacteria' 
               ? 'bg-lime-600 text-white shadow-lg shadow-lime-500/30' 
               : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
             }`}
           >
             <Box size={18} />
             Bacteria
           </button>

           <button 
             onClick={() => setModelType('virus')}
             className={`flex-none py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap active:scale-95 ${
               modelType === 'virus' 
               ? 'bg-red-600 text-white shadow-lg shadow-red-500/30' 
               : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
             }`}
           >
             <Box size={18} />
             Virus
           </button>

           <button 
             onClick={() => setModelType('yeast')}
             className={`flex-none py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap active:scale-95 ${
               modelType === 'yeast' 
               ? 'bg-amber-600 text-white shadow-lg shadow-amber-500/30' 
               : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
             }`}
           >
             <Box size={18} />
             Yeast
           </button>

           <div className="w-px h-8 bg-white/10 mx-1 flex-none"></div>

           {/* Upload Button */}
           <label className={`flex-none py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap active:scale-95 ${
               modelType === 'custom' 
               ? 'bg-fuchsia-600 text-white shadow-lg shadow-fuchsia-500/30' 
               : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
             }`}>
             <Upload size={18} />
             {t.ar.upload || 'Upload'}
             <input 
               type="file" 
               accept=".glb,.gltf" 
               className="hidden" 
               onChange={handleFileUpload} 
             />
           </label>

        </div>
      </div>

    </div>
  );
};
