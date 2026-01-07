import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-white/10 bg-slate-900/50 backdrop-blur-sm py-8">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-slate-500 text-sm">
          © {new Date().getFullYear()} KidRise Amazing Microscope. All rights reserved.
        </p>
        <div className="flex justify-center gap-4 mt-4">
           <a href="https://stemtoy.com.hk/products/kidrise-amazing-microscope" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-secondary transition-colors text-sm">
             Official Store
           </a>
        </div>
      </div>
    </footer>
  );
};
