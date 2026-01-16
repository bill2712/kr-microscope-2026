import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  className?: string; // Allow override
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, className = "" }) => {
  return (
    <div className={`text-center mb-8 md:mb-12 animate-in fade-in slide-in-from-top-4 duration-700 ${className}`}>
      <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 inline-block mb-3 drop-shadow-sm">
        {title}
      </h1>
      {subtitle && (
        <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className="h-1 w-24 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent mx-auto mt-4 rounded-full"></div>
    </div>
  );
};
