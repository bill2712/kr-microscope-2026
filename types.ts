export type Language = 'zh' | 'en';

export type ViewState = 'home' | 'usage' | 'planner' | 'learn' | 'quiz' | 'gallery' | 'ar' | 'journal';

export interface Translation {
  title: string;
  subtitle: string;
  nav: {
    home: string;
    usage: string;
    planner: string;
    learn: string;
    quiz: string;
    gallery: string;
    ar: string;
    journal: string;
  };
  home: {
    welcome: string;
    cta: string;
    features: {
      usage: string;
      planner: string;
      learn: string;
      quiz: string;
      gallery: string;
    };
  };
  usage: {
    title: string;
    steps: Array<{ title: string; desc: string; image: string; tip?: string }>;
    proTipLabel: string;
  };
  planner: {
    title: string;
    selectSpecimen: string;
    selectLens: string;
    previewLabel: string;
    start: string;
    scanning: string;
    result: string;
    compare: string;
    specimens: Array<{ id: string; name: string; image: string }>;
    lenses: string[];
    focusTitle: string;
    coarseKnob: string;
    fineKnob: string;
    focusInstruction: string;
  };
  journal: {
    title: string;
    drawHint: string;
    tools: {
      pen: string;
      eraser: string;
      text: string;
      clear: string;
      save: string;
      close: string;
    };
    saveSuccess: string;
  };
  learn: {
    title: string;
    didYouKnow: string;
    parts: Array<{ name: string; desc: string; image: string; funFact: string }>;
  };
  gallery: {
    title: string;
    desc: string;
    items: Array<{ title: string; desc: string; image: string }>;
  };
  quiz: {
    title: string;
    start: string;
    loading: string;
    score: string;
    next: string;
    retry: string;
    perfect: string;
    good: string;
    tryAgain: string;
  };
  ar: {
    title: string;
    description: string;
    instruction: string;
    models: {
      astro: string;
      microscope: string;
    };
    upload: string;
  };
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface QuizResponse {
  questions: QuizQuestion[];
}
