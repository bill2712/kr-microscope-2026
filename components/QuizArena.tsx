import React, { useState, useEffect } from 'react';
import { Translation, QuizQuestion, Language } from '../types';
import { generateQuiz } from '../services/geminiService';
import { Button } from './Button';
import { Brain, Star, RefreshCw, Trophy } from 'lucide-react';

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

  const fetchQuestions = async () => {
    setLoading(true);
    setQuizComplete(false);
    setCurrentQIndex(0);
    setScore(0);
    setSelectedOption(null);
    setShowResult(false);
    try {
      const qs = await generateQuiz(lang);
      setQuestions(qs);
    } catch (e) {
      console.error(e);
      // Fallback handled in service, but alert here if needed
    } finally {
      setLoading(false);
    }
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

  if (quizComplete) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-8 glass-panel p-8 rounded-3xl animate-float">
        <Trophy size={80} className="text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.6)]" />
        <h2 className="text-4xl font-bold">{t.quiz.score}: {score} / {questions.length}</h2>
        <p className="text-xl text-slate-300">
            {score === questions.length ? t.quiz.perfect : (score > 0 ? t.quiz.good : t.quiz.tryAgain)}
        </p>
        <Button onClick={fetchQuestions} variant="primary" size="lg">
           <RefreshCw className="mr-2" /> {t.quiz.retry}
        </Button>
      </div>
    );
  }

  if (questions.length === 0) return null;

  const currentQ = questions[currentQIndex];

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div className="glass-panel rounded-3xl p-6 md:p-8 space-y-6">
        <div className="flex justify-between items-center text-slate-400">
           <span>Question {currentQIndex + 1} / {questions.length}</span>
           <div className="flex items-center gap-1 text-yellow-400">
             <Star size={16} fill="currentColor" />
             <span className="font-bold">{score}</span>
           </div>
        </div>

        <h3 className="text-2xl font-bold leading-snug">{currentQ.question}</h3>

        <div className="space-y-3">
          {currentQ.options.map((option, idx) => {
             let btnClass = "w-full p-4 rounded-xl text-left font-semibold transition-all duration-200 border border-white/10 hover:bg-white/5 ";
             
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
                    {currentQ.explanation}
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
