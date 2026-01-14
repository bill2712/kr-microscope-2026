import React, { useState } from 'react';
import { Translation } from '../types';
import { Upload, Camera, Box, RotateXc } from 'lucide-react';
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
  const [modelType, setModelType] = useState<'astro' | 'duck' | 'avocado' | 'cell' | 'detailedCell' | 'custom'>('astro');
  const [customSrc, setCustomSrc] = useState<string | null>(null);

  // Pre-defined trustworthy models
  // Pre-defined trustworthy models
  const MODELS = {
    astro: {
      src: "https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb",
      iosSrc: "https://modelviewer.dev/shared-assets/models/Astronaut.usdz"
    },
    duck: {
      src: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF-Binary/Duck.glb",
      iosSrc: "" // TODO: specific USDZ link needed for iOS
    },
    avocado: {
      src: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Avocado/glTF-Binary/Avocado.glb",
      iosSrc: "" // TODO: specific USDZ link needed for iOS
    },
    cell: {
      src: "/kr-microscope-2026/models/cell-model.glb",
      iosSrc: ""
    },
    detailedCell: {
      src: "/kr-microscope-2026/models/detailed-cell.glb",
      iosSrc: ""
    }
  };

  const getCurrentModel = () => {
    if (modelType === 'custom') {
      return {
        src: customSrc || MODELS.astro.src,
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
              className="absolute bottom-8 right-8 bg-white text-black px-6 py-3 rounded-full font-bold shadow-lg flex items-center gap-2 transform transition hover:scale-105 active:scale-95 z-20"
            >
              <Camera size={20} />
              View in your space
            </button>
         </model-viewer>
      </div>

      {/* UI Overlay - Top Left Info */}
      <div className="absolute top-6 left-6 z-10 pointer-events-none">
        <div className="bg-black/40 backdrop-blur-md border border-white/10 p-4 rounded-2xl">
           <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
             {t.ar.title}
           </h2>
           <p className="text-slate-300 text-sm max-w-xs mt-1">
             {t.ar.description}
           </p>
        </div>
      </div>

      {/* UI Overlay - Bottom Center Controls */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 w-full max-w-4xl px-4">
        <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 p-2 rounded-2xl flex items-center gap-2 shadow-xl overflow-x-auto">
           
           {/* Model Buttons */}
           <button 
             onClick={() => setModelType('astro')}
             className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
               modelType === 'astro' 
               ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
               : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
             }`}
           >
             <Box size={18} />
             Astronaut
           </button>

           <button 
             onClick={() => setModelType('duck')}
             className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
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
             className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
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
             className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
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
             className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
               modelType === 'detailedCell' 
               ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/30' 
               : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
             }`}
           >
             <Box size={18} />
             Detailed
           </button>

           <div className="w-px h-8 bg-white/10 mx-1"></div>

           {/* Upload Button */}
           <label className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap ${
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
        
        {/* Instruction Note */}
        <div className="mt-4 text-center">
            <p className="text-xs text-slate-500 font-mono bg-black/50 inline-block px-3 py-1 rounded-full border border-white/5">
              ℹ️ {t.ar.instruction}
            </p>
        </div>
      </div>

    </div>
  );
};
