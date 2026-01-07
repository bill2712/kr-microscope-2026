import React, { useState } from 'react';
import { Translation } from '../types';
import { Button } from './Button';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface UsageGuideProps {
  t: Translation;
}

export const UsageGuide: React.FC<UsageGuideProps> = ({ t }) => {
  const [step, setStep] = useState(0);
  const totalSteps = t.usage.steps.length;

  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps - 1));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  return (
    <div className="w-full max-w-5xl mx-auto p-4 space-y-8">
      <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-8 drop-shadow-sm">
        {t.usage.title}
      </h2>

      <div className="flex flex-col md:flex-row gap-8 items-center">
        {/* Image Section */}
        <div className="w-full md:w-1/2 relative group">
           <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
           <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              <img 
                src={t.usage.steps[step].image} 
                alt={t.usage.steps[step].title}
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
              />
           </div>
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2 space-y-6">
           <div className="glass-panel rounded-3xl p-8 relative overflow-hidden min-h-[300px] flex flex-col justify-between">
              
              <div>
                <div className="flex justify-between items-center mb-4">
                    <span className="bg-primary/20 text-primary border border-primary/30 px-3 py-1 rounded-full text-sm font-bold">
                        Step {step + 1}
                    </span>
                    <div className="flex space-x-1">
                        {t.usage.steps.map((_, idx) => (
                            <div key={idx} className={`h-2 w-2 rounded-full transition-all ${idx === step ? 'bg-secondary w-6' : 'bg-slate-600'}`} />
                        ))}
                    </div>
                </div>

                <h3 className="text-3xl font-bold mb-4 text-white">{t.usage.steps[step].title}</h3>
                <p className="text-xl text-slate-300 leading-relaxed">
                  {t.usage.steps[step].desc}
                </p>
              </div>

              {t.usage.steps[step].tip && (
                  <div className="mt-6 bg-yellow-400/10 border border-yellow-400/20 p-4 rounded-xl">
                      <p className="text-yellow-200 font-medium flex items-center gap-2">
                          <span className="text-xl">💡</span> 
                          {t.usage.steps[step].tip}
                      </p>
                  </div>
              )}
           </div>

           <div className="flex justify-between gap-4">
            <Button 
                onClick={prevStep} 
                disabled={step === 0} 
                variant="glass"
                className={step === 0 ? 'opacity-50 cursor-not-allowed' : ''}
            >
              <ChevronLeft /> Prev
            </Button>
            <Button 
                onClick={nextStep} 
                disabled={step === totalSteps - 1}
                variant="secondary"
                fullWidth
                className={step === totalSteps - 1 ? 'opacity-50 cursor-not-allowed' : ''}
            >
               Next <ChevronRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
