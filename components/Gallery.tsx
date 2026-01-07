import React, { useState } from 'react';
import { Translation } from '../types';
import { X, ZoomIn } from 'lucide-react';

interface GalleryProps {
  t: Translation;
}

export const Gallery: React.FC<GalleryProps> = ({ t }) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-8">
      <div className="text-center space-y-4 mb-10">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500">
            {t.gallery.title}
        </h2>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            {t.gallery.desc}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {t.gallery.items.map((item, index) => (
          <div 
            key={index}
            onClick={() => setSelectedImage(index)}
            className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer shadow-lg border border-white/10"
          >
            <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform">
                <h3 className="text-2xl font-bold text-white mb-1">{item.title}</h3>
                <div className="flex items-center text-secondary text-sm font-bold uppercase tracking-wider gap-2">
                    <ZoomIn size={14} /> Tap to zoom
                </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
            <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            >
                <X size={32} />
            </button>

            <div className="max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col md:flex-row">
                <div className="md:w-2/3 h-64 md:h-[500px]">
                    <img 
                        src={t.gallery.items[selectedImage].image} 
                        className="w-full h-full object-cover" 
                        alt={t.gallery.items[selectedImage].title} 
                    />
                </div>
                <div className="md:w-1/3 p-8 flex flex-col justify-center bg-slate-800">
                    <h3 className="text-3xl font-bold text-white mb-4">{t.gallery.items[selectedImage].title}</h3>
                    <div className="w-12 h-1 bg-secondary mb-6 rounded-full"></div>
                    <p className="text-lg text-slate-300 leading-relaxed">
                        {t.gallery.items[selectedImage].desc}
                    </p>
                    <div className="mt-8 pt-6 border-t border-white/10">
                         <span className="text-sm text-slate-500 font-mono">Magnification: 400x - 1200x</span>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};
