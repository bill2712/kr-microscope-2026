import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Translation } from '../types';

interface FirstRunGuideProps {
  t: Translation;
  onComplete: () => void;
}

export const FirstRunGuide: React.FC<FirstRunGuideProps> = ({ t, onComplete }) => {
  const [step, setStep] = useState(0);
  const current = t.onboarding.steps[step];
  const isLast = step === t.onboarding.steps.length - 1;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onComplete();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onComplete]);

  return createPortal(
    <div className="fixed inset-0 z-[300] grid place-items-center bg-slate-950/90 p-4 backdrop-blur-md">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="first-run-title"
        className="w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl"
      >
        <div className="h-1.5 bg-white/5" aria-hidden="true">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 transition-[width] duration-300"
            style={{ width: `${((step + 1) / t.onboarding.steps.length) * 100}%` }}
          />
        </div>
        <div className="p-6 sm:p-8">
          <div className="mb-6 flex items-center justify-between gap-4">
            <span className="text-sm font-bold text-cyan-300">
              {t.onboarding.stepLabel} {step + 1}/{t.onboarding.steps.length}
            </span>
            <button type="button" onClick={onComplete} className="min-h-11 rounded-xl px-3 text-sm font-semibold text-slate-300 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400">
              {t.onboarding.skip}
            </button>
          </div>
          <div className="mb-5 text-6xl" aria-hidden="true">{current.icon}</div>
          <h2 id="first-run-title" className="text-2xl font-black text-white sm:text-3xl">{current.title}</h2>
          <p className="mt-3 text-base leading-7 text-slate-300 sm:text-lg">{current.desc}</p>
          <div className="mt-8 flex gap-3">
            {step > 0 && (
              <button type="button" onClick={() => setStep((value) => value - 1)} className="min-h-12 flex-1 rounded-xl border border-white/10 bg-white/5 px-4 font-bold text-white hover:bg-white/10">
                {t.onboarding.back}
              </button>
            )}
            <button
              type="button"
              autoFocus
              onClick={() => isLast ? onComplete() : setStep((value) => value + 1)}
              className="min-h-12 flex-1 rounded-xl bg-cyan-500 px-4 font-black text-slate-950 shadow-lg shadow-cyan-500/20 hover:bg-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {isLast ? t.onboarding.finish : t.onboarding.next}
            </button>
          </div>
        </div>
      </section>
    </div>,
    document.body,
  );
};
