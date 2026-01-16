import React from 'react';
import { Translation, Language } from '../types';

interface FooterProps {
  t?: Translation; // Optional to minimize breakage if I forget to update App.tsx immediately, but I will update it.
  lang?: Language;
}

export const Footer: React.FC<FooterProps> = ({ t, lang = 'zh' }) => {
  const isEn = lang === 'en';
  const link = isEn ? "https://stemtoy.com.hk/en" : "https://stemtoy.com.hk/";
  
  // Fallback if t is not passed yet (though we will update App.tsx next)
  const copyright = t?.footer?.copyright || "© 2026 Kidrise STEM香港教育玩具";
  const support = t?.footer?.techSupport || "由 Kidrise童樂高飛 提供技術支援";

  return (
    <footer className="mt-20 border-t border-white/10 bg-slate-900/50 backdrop-blur-sm py-8">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4 text-slate-500 text-sm">
          <span>{copyright}</span>
          <span className="hidden md:inline">|</span>
          <a href={link} target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
            {support}
          </a>
        </div>
        <div className="flex justify-center gap-4 mt-4">
           <a href={link} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-secondary transition-colors text-xs uppercase tracking-wider">
             {isEn ? "Official Store" : "官方商店"}
           </a>
        </div>
      </div>
    </footer>
  );
};
