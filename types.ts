export type Language = 'zh' | 'en';

export type ViewState = 'home' | 'usage' | 'planner' | 'learn' | 'quiz' | 'gallery' | 'ar' | 'journal';

export interface NavTranslation {
  home: string;
  usage: string;
  planner: string;
  learn: string;
  quiz: string;
  gallery: string;
  ar: string;
  journal: string;
}

export interface HomeTranslation {
  welcome: string;
  cta: string;
  features: {
    usage: string;
    planner: string;
    learn: string;
    quiz: string;
    gallery: string;
  };
}

export interface UsageTranslation {
  title: string;
  steps: Array<{ title: string; desc: string; image: string; tip?: string }>;
  proTipLabel: string;
}

export interface PlannerTranslation {
  title: string;
  selectSpecimen: string;
  selectLens: string;
  previewLabel: string;
  start: string;
  scanning: string;
  result: string;
  compare: string;
  specimens: Array<{ id: string; name: string; images: { "100x": string; "400x": string; "1200x": string } }>;
  lenses: string[];
  focusTitle: string;
  coarseKnob: string;
  fineKnob: string;
  focusInstruction: string;
}

export interface JournalTranslation {
  title: string;
  drawHint: string;
  tools: {
    pen: string;
    eraser: string;
    text: string;
    clear: string;
    save: string;
    close: string;
    undo: string;
    colorSize: string; // New key
  };
  stamps: {
    label: string;
    items: {
      nucleus: string;
      cellWall: string;
      pointer: string;
      question: string;
      star: string;
    };
  };
  viewToggle: string;
  labReport: {
    title: string;
    date: string;
    specimen: string;
    magnification: string;
    scientist: string;
  };
  saveSuccess: string;
}

export interface LearnTranslation {
  title: string;
  didYouKnow: string;
  menu: {
    intro: string;
    types: string;
    magnification: string;
    parts: string;
    accessories: string;
    preparation: string;
    guide: string;
    diy: string;
    applications: string;
    maintenance: string;
  };
  intro: {
    title: string;
    content: string[];
  };
  types: {
    title: string;
    items: Array<{ name: string; desc: string }>;
  };
  magnification: {
    title: string;
    content: string[];
  };
  parts: {
    title: string;
    items: Array<{ name: string; desc: string; image: string; funFact: string }>;
  };
  accessories: {
    title: string;
    items: Array<{ name: string; desc: string }>;
  };
  preparation: {
    title: string;
    intro: string;
    steps: Array<{ title: string; desc: string }>;
  };
  guide: {
    title: string;
    intro: string;
    steps: Array<{ title: string; desc: string }>;
    tips: string[];
  };
  diy: {
    title: string;
    intro: string;
    projects: Array<{
      title: string;
      desc: string;
      materials: string[];
      steps: string[];
      note?: string;
    }>;
  };
  applications: {
    title: string;
    intro: string;
    fields: Array<{ title: string; desc: string }>;
  };
  maintenance: {
    title: string;
    content: string[];
  };
}

export interface GalleryTranslation {
  title: string;
  desc: string;
  items: Array<{ title: string; desc: string; image: string }>;
}

export interface QuizTranslation {
  title: string;
  start: string;
  loading: string;
  score: string;
  next: string;
  retry: string;
  perfect: string;
  good: string;
  tryAgain: string;
  resultTitle: string;
  enterName: string;
  download: string;
  certificate: string;
  certifiedBy: string;
  date: string;
  rules: {
    title: string;
    text: string[];
    startBtn: string;
  };
}

export interface ARTranslation {
  title: string;
  description: string;
  instruction: string;
  models: {
    astro: string;
    microscope: string;
  };
  upload: string;
}

export interface ChatTranslation {
  placeholder: string;
  thinking: string;
}

export interface Translation {
  title: string;
  subtitle: string;
  nav: NavTranslation;
  home: HomeTranslation;
  usage: UsageTranslation;
  planner: PlannerTranslation;
  learn: LearnTranslation;
  quiz: QuizTranslation;
  footer: {
    copyright: string;
    techSupport: string;
  };
  gallery: GalleryTranslation;
  ar: ARTranslation;
  journal: JournalTranslation;
  chat: ChatTranslation;
}

export interface QuizQuestion {
  question: { zh: string; en: string };
  options: { zh: string[]; en: string[] };
  correctAnswerIndex: number;
  explanation: { zh: string; en: string };
}
