import React, { useState, useEffect, useRef } from 'react';
import { Translation, QuizQuestion, Language } from '../types';
import { QUIZ_QUESTIONS } from '../constants';
import { Button } from './Button';
import { PageHeader } from './PageHeader';
import { Brain, Star, RefreshCw, Trophy, Download, Play, CheckCircle2 } from 'lucide-react';
// import html2canvas from 'html2canvas'; // Removing dependency for now, using print style

interface QuizArenaProps {
  t: Translation;
  lang: Language;
}

type GameState = 'intro' | 'loading' | 'playing' | 'result';

export const QuizArena: React.FC<QuizArenaProps> = ({ t, lang }) => {
  const [gameState, setGameState] = useState<GameState>('intro');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);



  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [userName, setUserName] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const certificateRef = useRef<HTMLDivElement>(null);

  const startQuiz = async () => {
    setGameState('loading');
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
        setGameState('playing');
    }, 800);
  };

  useEffect(() => {
    // Reset to intro if lang changes
    setGameState('intro');
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
      setGameState('result');
    }
  };

  const handleDownload = () => {
    window.print();
  };

  // --- 1. Intro View ---
  if (gameState === 'intro') {
      return (
          <div className="w-full max-w-3xl mx-auto p-4 min-h-[600px] flex flex-col items-center">
              <PageHeader title={t.quiz.title} subtitle={t.quiz.rules.title} />
              
              <div className="glass-panel p-8 md:p-12 rounded-3xl w-full text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/30">
                      <Trophy className="text-white" size={40} />
                  </div>
                  
                  <div className="space-y-4 text-left md:text-center max-w-lg mx-auto">
                      {t.quiz.rules.text.map((line, idx) => (
                          <div key={idx} className="flex gap-3 items-start md:justify-center">
                              <CheckCircle2 className="text-green-400 shrink-0 mt-1" size={20} />
                              <p className="text-lg text-slate-200">{line}</p>
                          </div>
                      ))}
                  </div>

                  <div className="pt-4">
                      <Button onClick={startQuiz} size="lg" className="w-full md:w-auto px-12 py-6 text-xl shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
                          <Play className="mr-2 fill-current" /> {t.quiz.rules.startBtn}
                      </Button>
                  </div>
              </div>
          </div>
      );
  }

  // --- 2. Loading View ---
  if (gameState === 'loading') {
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

  // --- 3. Result View ---
  if (gameState === 'result') {
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
                <div className="space-y-4 max-w-md mx-auto pt-4 bg-white/5 p-6 rounded-2xl border border-white/10">
                    <label className="block text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">{t.quiz.enterName}</label>
                    <input 
                        type="text" 
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Your Name..."
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-center text-xl text-white focus:ring-2 focus:ring-primary outline-none"
                    />
                    <Button onClick={handleDownload} disabled={!userName.trim()} fullWidth variant="accent">
                        <Download size={20} className="mr-2" /> {t.quiz.download}
                    </Button>
                </div>
            )}
            
            <div className="pt-8 border-t border-white/10">
                <Button variant="outline" onClick={startQuiz}>
                    <RefreshCw size={20} className="mr-2" /> {t.quiz.retry}
                </Button>
            </div>
        </div>

        {/* --- Hidden Certificate (Only visible in Print) --- */}
        <div className="certificate-container hidden print:flex print:visible fixed inset-0 z-[9999] bg-white text-black flex-col items-center justify-center p-0 m-0 w-[297mm] h-[210mm] overflow-hidden">
             {/* Certificate Border */}
             <div className="w-[280mm] h-[190mm] border-[8px] border-double border-slate-800 relative p-12 flex flex-col items-center bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]">
                 
                 {/* Corner Ornaments */}
                 <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 border-amber-600"></div>
                 <div className="absolute top-4 right-4 w-16 h-16 border-t-4 border-r-4 border-amber-600"></div>
                 <div className="absolute bottom-4 left-4 w-16 h-16 border-b-4 border-l-4 border-amber-600"></div>
                 <div className="absolute bottom-4 right-4 w-16 h-16 border-b-4 border-r-4 border-amber-600"></div>

                 <div className="text-center space-y-6 z-10">
                     <div className="flex items-center justify-center gap-4 mb-4 opacity-80">
                         <Star size={32} className="text-amber-500 fill-amber-500" />
                         <span className="text-xl tracking-[0.3em] font-serif font-bold text-slate-600 uppercase">Certificate of Achievement</span>
                         <Star size={32} className="text-amber-500 fill-amber-500" />
                     </div>
                     
                     <h1 className="text-6xl font-serif font-bold text-slate-900 mb-2">{t.quiz.certificate}</h1>
                     
                     <p className="text-xl text-slate-600 italic mt-8">This certifies that</p>
                     
                     <div className="text-5xl font-script text-amber-700 border-b-2 border-slate-300 pb-2 px-12 min-w-[400px]">
                         {userName || "Future Scientist"}
                     </div>
                     
                     <p className="text-lg text-slate-600 mt-4 max-w-2xl mx-auto leading-relaxed">
                         has successfully completed the Microscopy Challenge with a score of <strong>{Math.round((score/questions.length)*100)}%</strong>, demonstrating excellent knowledge of the Micro World.
                     </p>
                 </div>

                 <div className="absolute bottom-16 w-full flex justify-between px-24 items-end">
                     <div className="text-center">
                         <div className="w-48 border-b border-slate-400 mb-2"></div>
                         <p className="text-sm font-bold uppercase text-slate-500 tracking-wider">{t.quiz.date}</p>
                         <p className="font-mono text-lg">{new Date().toLocaleDateString()}</p>
                     </div>
                     
                     <div className="flex flex-col items-center">
                          {/* Professional Seal */}
                          <div className="relative w-32 h-32 rotate-12 drop-shadow-xl">
                              <svg viewBox="0 0 200 200" className="w-full h-full">
                                  {/* Outer Jagged Edge */}
                                  <path d="M100 0 L108 8 L120 2 L125 12 L138 10 L140 22 L152 24 L150 36 L162 42 L158 52 L168 60 L160 70 L170 80 L160 90 L168 100 L160 110 L170 120 L160 130 L168 140 L158 148 L162 158 L150 164 L152 176 L140 178 L138 190 L125 188 L120 198 L108 192 L100 200 L92 192 L80 198 L75 188 L62 190 L60 178 L48 176 L50 164 L38 158 L42 148 L32 140 L40 130 L30 120 L40 110 L32 100 L40 90 L30 80 L40 70 L32 60 L42 52 L38 42 L50 36 L48 24 L60 22 L62 10 L75 12 L80 2 L92 8 Z" fill="#b45309" stroke="#78350f" strokeWidth="2" />
                                  <circle cx="100" cy="100" r="75" fill="#d97706" stroke="#92400e" strokeWidth="2" />
                                  <circle cx="100" cy="100" r="65" fill="none" stroke="#fcd34d" strokeWidth="1" strokeDasharray="4 4" />
                                  
                                  {/* Text Path */}
                                  <path id="curve" d="M 50 100 A 50 50 0 1 1 150 100" fill="none" />
                                  <text fontSize="18" fontFamily="serif" fontWeight="bold" fill="#78350f">
                                      <textPath href="#curve" startOffset="50%" textAnchor="middle">KIDRISE SCIENCE</textPath>
                                  </text>
                                  
                                  <text x="100" y="145" fontSize="14" fontFamily="serif" fontWeight="bold" fill="#78350f" textAnchor="middle">OFFICIAL</text>
                                  
                                  {/* Star Icon */}
                                  <path d="M100 65 L108 85 L130 85 L112 100 L118 120 L100 108 L82 120 L88 100 L70 85 L92 85 Z" fill="#fcd34d" stroke="#b45309" strokeWidth="1" />
                              </svg>
                          </div>
                     </div>

                     <div className="text-center">
                         <div className="w-48 border-b border-slate-400 mb-2 font-script text-2xl text-slate-800">
                              Kidrise Team
                         </div>
                         <p className="text-sm font-bold uppercase text-slate-500 tracking-wider">{t.quiz.certifiedBy}</p>
                     </div>
                 </div>
             </div>
        </div>

      </div>
    );
  }

  // --- 4. Playing View (Default) ---
  const currentQ = questions[currentQIndex];

  return (
    <>
      <style>
        {`
          @media print {
            @page { margin: 0; size: landscape; }
            body * {
              visibility: hidden;
            }
            .certificate-container, .certificate-container * {
              visibility: visible;
            }
            .certificate-container {
              position: fixed;
              left: 0;
              top: 0;
              width: 100vw;
              height: 100vh;
              z-index: 9999;
              display: flex !important;
              align-items: center;
              justify-content: center;
              background: white;
            }
            /* Explicitly hide header and footer */
            header, footer, .site-header, .site-footer {
              display: none !important;
            }
          }
        `}
      </style>
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6 animate-in slide-in-from-right-8 duration-500">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
          <div>
             <h2 className="text-2xl font-bold text-secondary">{t.quiz.title}</h2>
             <div className="flex gap-2 mt-1">
                 {questions.map((_, i) => (
                     <div key={i} className={`h-1.5 w-4 rounded-full transition-colors ${i === currentQIndex ? 'bg-secondary' : i < currentQIndex ? 'bg-secondary/50' : 'bg-slate-700'}`}></div>
                 ))}
             </div>
          </div>
          <div className="text-right">
              <span className="text-sm text-slate-400">Score</span>
              <div className="text-2xl font-mono font-bold text-primary">{score}</div>
          </div>
      </div>

      {/* Question Card */}
      <div className="glass-panel p-6 md:p-10 rounded-3xl min-h-[300px] flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
              <Brain size={150} />
          </div>
          
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 relative z-10 leading-snug">
              {lang === 'zh' ? currentQ.question.zh : currentQ.question.en}
          </h3>

          <div className="grid md:grid-cols-2 gap-4 relative z-10">
              {(lang === 'zh' ? currentQ.options.zh : currentQ.options.en).map((option, idx) => {
                  let stateStyle = 'bg-white/5 border-white/10 hover:bg-white/10 hover:scale-[1.02]';
                  if (showResult) {
                      if (idx === currentQ.correctAnswerIndex) stateStyle = 'bg-green-500/20 border-green-500 text-green-300 ring-1 ring-green-500';
                      else if (idx === selectedOption) stateStyle = 'bg-red-500/20 border-red-500 text-red-300';
                      else stateStyle = 'opacity-50';
                  } else if (selectedOption === idx) {
                      stateStyle = 'bg-primary/20 border-primary';
                  }

                  return (
                      <button
                          key={idx}
                          onClick={() => handleOptionClick(idx)}
                          disabled={showResult}
                          className={`
                              p-6 rounded-xl text-left border transition-all duration-300
                              ${stateStyle}
                          `}
                      >
                          <div className="flex items-center gap-3">
                              <div className={`
                                  w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                                  ${stateStyle.includes('green') ? 'bg-green-500 text-black' : 'bg-slate-800 text-slate-400'}
                              `}>
                                  {String.fromCharCode(65 + idx)}
                              </div>
                              <span className="text-lg font-medium">{option}</span>
                          </div>
                      </button>
                  );
              })}
          </div>

          {showResult && (
              <div className="mt-8 p-4 rounded-xl bg-blue-900/20 border border-blue-500/30 animate-in fade-in slide-in-from-bottom-2">
                  <div className="flex gap-3">
                      <div className="shrink-0 pt-1 text-blue-400"><Brain size={24}/></div>
                      <div>
                          <p className="font-bold text-blue-300 mb-1">Explanation</p>
                          <p className="text-blue-100/90">{lang === 'zh' ? currentQ.explanation.zh : currentQ.explanation.en}</p>
                      </div>
                  </div>
              </div>
          )}
      </div>

      {/* Footer Controls */}
      <div className="flex justify-end pt-4">
          <Button 
            onClick={nextQuestion} 
            disabled={!showResult}
            className="px-8 shadow-xl"
            size="lg"
          >
             {currentQIndex < questions.length - 1 ? t.quiz.next : "See Results"}
          </Button>
      </div>

    </div>
    </>
  );
};
