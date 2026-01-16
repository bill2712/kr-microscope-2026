import React, { useState, useEffect, useRef } from 'react';
import { Translation, QuizQuestion, Language } from '../types';
import { QUIZ_QUESTIONS } from '../constants';
import { Button } from './Button';
import { Brain, Star, RefreshCw, Trophy, Download } from 'lucide-react';
// import html2canvas from 'html2canvas'; // Removing dependency for now, using print style

interface QuizArenaProps {
  t: Translation;
  lang: Language;
}

export const QuizArena: React.FC<QuizArenaProps> = ({ t, lang }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [userName, setUserName] = useState("");
  const certificateRef = useRef<HTMLDivElement>(null);

  const fetchQuestions = async () => {
    setLoading(true);
    setQuizComplete(false);
    setCurrentQIndex(0);
    setScore(0);
    setSelectedOption(null);
    setShowResult(false);
    setUserName("");
    
    // Simulate loading for effect
    setTimeout(() => {
        // Shuffle and pick 10 or 20? User said "Expand to 20", so let's use all 20 but shuffled.
        const shuffled = [...QUIZ_QUESTIONS].sort(() => 0.5 - Math.random());
        setQuestions(shuffled);
        setLoading(false);
    }, 800);
  };

  useEffect(() => {
    fetchQuestions();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const handleOptionClick = (index: number) => {
    if (showResult) return;
    setSelectedOption(index);
    setShowResult(true);
    if (index === questions[currentQIndex].correctAnswerIndex) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handleDownload = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6">
        <div className="relative w-24 h-24">
           <div className="absolute inset-0 border-4 border-secondary/30 rounded-full animate-ping"></div>
           <div className="absolute inset-0 border-4 border-t-secondary rounded-full animate-spin"></div>
           <Brain className="absolute inset-0 m-auto text-primary animate-pulse" size={32} />
        </div>
        <p className="text-xl font-bold text-slate-300 animate-pulse">{t.quiz.loading}</p>
      </div>
    );
  }

  // --- Scorecard & Certificate View ---
  if (quizComplete) {
    const isPass = score >= questions.length * 0.6; // 60% pass rate

    return (
      <div className="flex flex-col items-center w-full max-w-2xl mx-auto space-y-8 animate-in fade-in zoom-in duration-500">
        
        {/* Input Form (Hide when printing) */}
        <div className="print:hidden w-full space-y-6 glass-panel p-8 rounded-3xl text-center">
            <Trophy size={80} className={`mx-auto ${isPass ? 'text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.6)]' : 'text-slate-500'}`} />
            
            <div className="space-y-2">
                <h2 className="text-3xl md:text-4xl font-bold">{t.quiz.resultTitle}</h2>
                <div className="text-2xl font-mono text-primary">{score} / {questions.length}</div>
                <p className="text-lg text-slate-300">
                    {score === questions.length ? t.quiz.perfect : (score > questions.length/2 ? t.quiz.good : t.quiz.tryAgain)}
                </p>
            </div>

            {isPass && (
                <div className="space-y-4 pt-4 border-t border-white/10">
                    <label className="block text-sm text-slate-400">{t.quiz.enterName}</label>
                    <input 
                        type="text" 
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Your Name / 你的名字"
                        className="w-full max-w-sm px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none text-center text-lg"
                    />
                    <Button onClick={handleDownload} disabled={!userName.trim()} variant="primary" className="w-full max-w-sm mx-auto">
                        <Download className="mr-2" size={18} /> {t.quiz.download}
                    </Button>
                </div>
            )}

            <Button onClick={fetchQuestions} variant="secondary">
               <RefreshCw className="mr-2" size={18} /> {t.quiz.retry}
            </Button>
        </div>

        {/* Printable Certificate (Visible only when passing & name entered, designed for Print media) */}
        {isPass && userName && (
             <div id="certificate-area" className="hidden print:flex flex-col items-center justify-center p-12 border-8 border-double border-yellow-600 w-full h-full bg-white text-black text-center break-inside-avoid shadow-xl">
                 <div className="mb-8">
                     {/* Use simple text or an SVG/Image logo if available */}
                     <h1 className="text-5xl font-serif font-bold text-yellow-700 tracking-wider uppercase mb-2">Certificate</h1>
                     <h2 className="text-3xl font-serif text-yellow-600">{t.quiz.certificate}</h2>
                 </div>

                 <div className="my-10 space-y-4">
                     <p className="text-xl italic text-gray-600">This certifies that</p>
                     <p className="text-6xl font-script font-bold text-blue-900 my-4 border-b-2 border-slate-300 pb-2 inline-block min-w-[300px]">{userName}</p>
                     <p className="text-xl italic text-gray-600">has successfully completed the Microscope Mastery Quiz</p>
                     <p className="text-2xl font-bold text-gray-800 mt-4">Score: {score} / {questions.length}</p>
                 </div>

                 <div className="flex justify-between w-full mt-16 px-10">
                     <div className="text-center">
                         <div className="w-40 border-t border-black pt-2 font-bold">{t.quiz.certifiedBy}</div>
                     </div>
                     <div className="text-center">
                         <div className="w-40 border-t border-black pt-2 font-bold">{new Date().toLocaleDateString(lang === 'zh' ? 'zh-TW' : 'en-US')}</div>
                     </div>
                 </div>
                 
                 <div className="mt-8 text-xs text-slate-400">Kidrise Science Education</div>
             </div>
        )}
      </div>
    );
  }

  if (questions.length === 0) return null;

  const currentQ = questions[currentQIndex];

  return (
    <div className="w-full max-w-3xl mx-auto p-4 print:hidden">
      <div className="glass-panel rounded-3xl p-5 md:p-8 space-y-6">
        <div className="flex justify-between items-center text-slate-400 text-sm md:text-base">
           <span>Question {currentQIndex + 1} / {questions.length}</span>
           <div className="flex items-center gap-1 text-yellow-400">
             <Star size={16} fill="currentColor" />
             <span className="font-bold">{score}</span>
           </div>
        </div>

        <h3 className="text-xl md:text-2xl font-bold leading-snug">
            {currentQ.question[lang]}
        </h3>

        <div className="space-y-3">
          {currentQ.options[lang].map((option, idx) => {
             let btnClass = "w-full p-3 md:p-4 rounded-xl text-left font-semibold transition-all duration-200 border border-white/10 hover:bg-white/5 text-sm md:text-base ";
             
             if (showResult) {
                if (idx === currentQ.correctAnswerIndex) {
                    btnClass = "w-full p-4 rounded-xl text-left font-bold bg-green-500/80 text-white border-green-400 shadow-[0_0_15px_rgba(34,197,94,0.4)]";
                } else if (idx === selectedOption) {
                    btnClass = "w-full p-4 rounded-xl text-left bg-red-500/80 text-white border-red-400";
                } else {
                    btnClass += " opacity-50";
                }
             } else {
                btnClass += " bg-slate-800/50 hover:scale-[1.02] active:scale-[0.98]";
             }

             return (
               <button 
                 key={idx} 
                 onClick={() => handleOptionClick(idx)}
                 disabled={showResult}
                 className={btnClass}
               >
                 {option}
               </button>
             );
          })}
        </div>

        {showResult && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="bg-blue-900/40 p-4 rounded-xl border border-blue-500/30 mb-6">
                <p className="text-blue-200">
                    <strong className="block mb-1 text-blue-100">Explanation:</strong>
                    {currentQ.explanation[lang]}
                </p>
             </div>
             <Button fullWidth onClick={nextQuestion} variant="secondary">
               {t.quiz.next}
             </Button>
          </div>
        )}
      </div>
    </div>
  );
};
