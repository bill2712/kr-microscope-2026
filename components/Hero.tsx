import React from 'react';
import { BookOpen, CheckCircle2, History, LockKeyhole, Microscope, PlayCircle, SlidersHorizontal, Sparkles, Trophy } from 'lucide-react';
import { AchievementId, ExperienceMode, Language, Translation, ViewState } from '../types';
import { DeviceReadiness } from './DeviceReadiness';

interface HeroProps {
  t: Translation;
  lang: Language;
  mode: ExperienceMode;
  lastView: ViewState | null;
  achievements: AchievementId[];
  onNavigate: (view: ViewState) => void;
  onModeChange: (mode: ExperienceMode) => void;
  onReplayGuide: () => void;
}

export const Hero: React.FC<HeroProps> = ({ t, lang, mode, lastView, achievements, onNavigate, onModeChange, onReplayGuide }) => {
  const lastLabel = lastView ? t.nav[lastView as keyof Translation['nav']] : null;
  const resumeDescription = lastLabel
    ? t.home.tasks.resume.desc.replace('{page}', lastLabel)
    : t.home.tasks.resume.empty;
  const achievementCopy = lang === 'zh'
    ? {
        title: '小科學家任務', count: `${achievements.length}/10 已完成`, unlocked: '已完成', locked: '未完成', next: '下一個任務', complete: '全部任務完成！',
        items: { onboarding: '完成首次導覽', guide: '閱讀使用指南', planner: '建立觀察任務', focus: '成功完成對焦', journal: '儲存觀察日記', pdf: '匯出 PDF 報告', learn: '探索學習中心', quiz: '完成知識測驗', gallery: '瀏覽標本圖鑑', ar: '開啟 AR 實驗室' },
      }
    : {
        title: 'Junior scientist missions', count: `${achievements.length}/10 complete`, unlocked: 'Complete', locked: 'Not complete', next: 'Next mission', complete: 'All missions complete!',
        items: { onboarding: 'Complete the first tour', guide: 'Read the usage guide', planner: 'Create an observation mission', focus: 'Focus successfully', journal: 'Save an observation journal', pdf: 'Export a PDF report', learn: 'Explore the learning centre', quiz: 'Complete the knowledge quiz', gallery: 'Browse the specimen gallery', ar: 'Open the AR lab' },
      };
  const achievementIds = Object.keys(achievementCopy.items) as AchievementId[];
  const nextAchievement = achievementIds.find((id) => !achievements.includes(id));
  const progress = Math.round((achievements.length / achievementIds.length) * 100);

  const tasks = [
    {
      id: 'observe',
      icon: Microscope,
      title: t.home.tasks.observe.title,
      desc: t.home.tasks.observe.desc,
      action: t.home.tasks.observe.action,
      accent: 'from-cyan-500/20 to-blue-600/10 border-cyan-400/30',
      onClick: () => onNavigate('planner'),
      disabled: false,
    },
    {
      id: 'learn',
      icon: BookOpen,
      title: t.home.tasks.learn.title,
      desc: t.home.tasks.learn.desc,
      action: t.home.tasks.learn.action,
      accent: 'from-indigo-500/20 to-purple-600/10 border-indigo-400/30',
      onClick: () => onNavigate('usage'),
      disabled: false,
    },
    {
      id: 'resume',
      icon: History,
      title: t.home.tasks.resume.title,
      desc: resumeDescription,
      action: t.home.tasks.resume.action,
      accent: 'from-rose-500/15 to-amber-500/10 border-rose-400/25',
      onClick: () => lastView && onNavigate(lastView),
      disabled: !lastView,
    },
  ];

  return (
    <section className="relative mx-auto flex min-h-[calc(100vh-9rem)] w-full max-w-6xl items-center overflow-hidden px-1 py-6 sm:px-4">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute left-[8%] top-[12%] h-32 w-32 rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="absolute bottom-[10%] right-[8%] h-40 w-40 rounded-full bg-indigo-500/15 blur-3xl" />
      </div>

      <div className="relative z-10 grid w-full items-center gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="text-center lg:text-left">
          <div className="relative mx-auto w-44 sm:w-56 lg:mx-0 lg:w-64">
            <img src="/images/transparent-mic.png" alt="KidRise Microscope" className="h-auto w-full object-contain drop-shadow-[0_0_35px_rgba(6,182,212,0.45)]" />
            <Sparkles className="absolute right-0 top-5 h-7 w-7 text-yellow-300" aria-hidden="true" />
          </div>
          <p className="mt-2 text-sm font-black uppercase tracking-[0.2em] text-cyan-300">{t.home.welcome}</p>
          <h1 className="mt-3 text-4xl font-black leading-tight text-white sm:text-5xl">{t.title}</h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-300 lg:mx-0 sm:text-lg">{t.home.prompt}</p>

          <div className="mt-6 inline-flex rounded-2xl border border-white/10 bg-slate-900/70 p-1" aria-label={t.home.beginner}>
            {(['beginner', 'advanced'] as ExperienceMode[]).map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={mode === item}
                onClick={() => onModeChange(item)}
                className={`min-h-11 rounded-xl px-4 text-sm font-bold transition-colors ${mode === item ? 'bg-cyan-500 text-slate-950' : 'text-slate-300 hover:bg-white/10'}`}
              >
                {item === 'beginner' ? t.home.beginner : t.home.advanced}
              </button>
            ))}
          </div>
          <p className="mt-2 text-sm text-slate-400">{mode === 'beginner' ? t.home.beginnerDesc : t.home.advancedDesc}</p>
        </div>

        <div>
          <div className="grid gap-3 sm:grid-cols-2">
            {tasks.map((task, index) => {
              const Icon = task.icon;
              return (
                <button
                  key={task.id}
                  type="button"
                  disabled={task.disabled}
                  onClick={task.onClick}
                  className={`group min-h-44 rounded-2xl border bg-gradient-to-br p-5 text-left shadow-lg transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0 ${task.accent} ${index === 0 ? 'sm:col-span-2' : ''}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-cyan-200"><Icon size={24} /></span>
                    {!task.disabled && <PlayCircle className="text-white/40 transition-transform group-hover:translate-x-1 group-hover:text-white" size={22} />}
                  </div>
                  <h2 className="mt-4 text-xl font-black text-white">{task.title}</h2>
                  <p className="mt-1 min-h-10 text-sm leading-5 text-slate-300">{task.desc}</p>
                  <span className="mt-3 inline-block text-sm font-bold text-cyan-300">{task.action} →</span>
                </button>
              );
            })}
          </div>
          <button type="button" onClick={onReplayGuide} className="mx-auto mt-5 flex min-h-11 items-center gap-2 rounded-xl px-4 text-sm font-bold text-slate-300 hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
            <SlidersHorizontal size={17} /> {t.home.replayGuide}
          </button>
          <section className="mt-3 rounded-2xl border border-white/10 bg-slate-900/55 p-4 text-left" aria-labelledby="microscope-achievements-title">
            <div className="flex items-center justify-between gap-3">
              <h2 id="microscope-achievements-title" className="flex items-center gap-2 text-sm font-black text-white"><Trophy className="text-amber-300" size={18} /> {achievementCopy.title}</h2>
              <span className="text-xs font-bold text-cyan-300">{achievementCopy.count}</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
              <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-2 text-xs text-slate-300"><span className="font-bold text-amber-200">{nextAchievement ? `${achievementCopy.next}:` : ''}</span> {nextAchievement ? achievementCopy.items[nextAchievement] : achievementCopy.complete}</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {achievementIds.map((id) => {
                const unlocked = achievements.includes(id);
                return (
                  <div key={id} className={`flex min-h-11 items-center gap-2 rounded-xl border px-3 py-2 text-xs font-bold ${unlocked ? 'border-emerald-400/25 bg-emerald-500/10 text-emerald-100' : 'border-white/5 bg-white/[0.03] text-slate-500'}`} title={unlocked ? achievementCopy.unlocked : achievementCopy.locked}>
                    {unlocked ? <CheckCircle2 size={16} /> : <LockKeyhole size={16} />}
                    <span>{achievementCopy.items[id]}</span>
                  </div>
                );
              })}
            </div>
          </section>
          <DeviceReadiness lang={lang} />
        </div>
      </div>
    </section>
  );
};
