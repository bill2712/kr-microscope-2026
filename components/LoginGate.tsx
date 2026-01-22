import React, { useState } from 'react';
import { Translation } from '../types';
import { Microscope, Lock, ArrowRight, AlertCircle } from 'lucide-react';

interface LoginGateProps {
  t: Translation;
  onLogin: () => void;
}

export const LoginGate: React.FC<LoginGateProps> = ({ t, onLogin }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const [isShake, setIsShake] = useState(false);

  // Hardcoded valid codes - can be updated or expanded
  const VALID_CODES = ['STEM2026', 'KIDRISE', 'MICRO', 'SCIENCE'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = code.trim().toUpperCase();
    
    if (VALID_CODES.includes(cleanCode)) {
      // Save auth state
      localStorage.setItem('kr_microscope_auth', 'true');
      onLogin();
    } else {
      setError(true);
      setIsShake(true);
      setTimeout(() => setIsShake(false), 500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-accent/20 rounded-full blur-[120px] animate-pulse delay-700"></div>

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
          <div className="flex flex-col items-center text-center space-y-6">
            
            {/* Logo/Icon */}
            <div className="w-20 h-20 bg-gradient-to-br from-secondary to-accent rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 group hover:rotate-6 transition-transform">
              <Lock className="w-10 h-10 text-white" />
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-white tracking-tight">
                {t.login.title}
              </h1>
              <p className="text-white/70 text-sm leading-relaxed">
                {t.login.desc}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="w-full space-y-4">
              <div className={`relative transition-transform ${isShake ? 'animate-shake' : ''}`}>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    setError(false);
                  }}
                  placeholder={t.login.placeholder}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all text-center tracking-widest text-lg uppercase font-mono"
                  autoFocus
                />
              </div>

              {error && (
                <div className="flex items-center justify-center space-x-2 text-red-400 text-sm bg-red-400/10 py-2 rounded-lg animate-fade-in">
                  <AlertCircle size={14} />
                  <span>{t.login.error}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-secondary/20 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2 group"
              >
                <span>{t.login.submit}</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="text-white/30 text-xs">
              Powered by Kidrise Science
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
        }
      `}</style>
    </div>
  );
};
