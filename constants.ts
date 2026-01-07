import { Translation, Language } from './types';

// Image sources (using Unsplash for high quality placeholders)
const IMAGES = {
  usage: {
    setup: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=600&q=80",
    slide: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80",
    focus: "https://images.unsplash.com/photo-1581093588401-fbb07362f705?auto=format&fit=crop&w=600&q=80",
    observe: "https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&w=600&q=80"
  },
  parts: {
    eyepiece: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=400&q=80",
    objective: "https://plus.unsplash.com/premium_photo-1673984534729-fa89e3e3b793?auto=format&fit=crop&w=400&q=80",
    stage: "https://images.unsplash.com/photo-1628519639536-e8a0961858c9?auto=format&fit=crop&w=400&q=80",
    light: "https://images.unsplash.com/photo-1524317926105-0e1f72782cc4?auto=format&fit=crop&w=400&q=80",
    knob: "https://images.unsplash.com/photo-1575503801440-664421b8b7d4?auto=format&fit=crop&w=400&q=80"
  },
  specimens: {
    onion: "https://images.unsplash.com/photo-1615967657121-68ac1b52f750?auto=format&fit=crop&w=500&q=80",
    insect: "https://images.unsplash.com/photo-1563521230891-b380f3054c6d?auto=format&fit=crop&w=500&q=80",
    leaf: "https://images.unsplash.com/photo-1524230659092-07f99a75c013?auto=format&fit=crop&w=500&q=80",
    hair: "https://images.unsplash.com/photo-1632757529341-9d95f68c347f?auto=format&fit=crop&w=500&q=80",
    fiber: "https://images.unsplash.com/photo-1618331835717-801e976710b2?auto=format&fit=crop&w=500&q=80"
  },
  gallery: {
    salt: "https://images.unsplash.com/photo-1616782531383-7e3e9d4d2f1f?auto=format&fit=crop&w=600&q=80",
    sand: "https://plus.unsplash.com/premium_photo-1669835787688-662580556f08?auto=format&fit=crop&w=600&q=80",
    snow: "https://images.unsplash.com/photo-1551240899-236b33464629?auto=format&fit=crop&w=600&q=80"
  }
};

export const TEXTS: Record<Language, Translation> = {
  zh: {
    title: "KidRise 顯微鏡探秘",
    subtitle: "開啟你的科學探索之旅！",
    nav: {
      home: "首頁",
      usage: "使用教學",
      planner: "實驗室",
      learn: "構造百科",
      quiz: "小測驗",
      gallery: "微觀畫廊"
    },
    home: {
      welcome: "歡迎來到微觀世界",
      cta: "開始探險",
      features: {
        usage: "一步步學會操作",
        planner: "規劃觀察任務",
        learn: "顯微鏡構造解密",
        quiz: "挑戰科學知識",
        gallery: "欣賞驚奇照片"
      },
    },
    usage: {
      title: "如何成為顯微鏡大師",
      proTipLabel: "💡 專家小撇步",
      steps: [
        { 
          title: "1. 準備基地", 
          desc: "將顯微鏡放置在平穩的桌面上，安裝好電池，打開底部的LED光源。", 
          image: IMAGES.usage.setup,
          tip: "確保桌面沒有雜物，光線充足！"
        },
        { 
          title: "2. 鎖定目標", 
          desc: "取出載玻片標本，將其固定在載物台上，確保標本位於通光孔正中央。", 
          image: IMAGES.usage.slide,
          tip: "夾子要夾緊，不然標本會跑掉喔！"
        },
        { 
          title: "3. 尋找影像", 
          desc: "先用低倍物鏡觀察，轉動粗準焦螺旋，直到看到模糊的影像。", 
          image: IMAGES.usage.focus,
          tip: "眼睛看目鏡時，不要貼得太緊。"
        },
        { 
          title: "4. 清晰鎖定", 
          desc: "慢慢轉動細準焦螺旋，直到影像變得清晰。可以切換高倍率看得更仔細！", 
          image: IMAGES.usage.observe,
          tip: "換高倍率時要小心鏡頭不要撞到玻片！"
        },
      ],
    },
    planner: {
      title: "實驗任務控制中心",
      selectSpecimen: "1. 選擇觀察目標",
      selectLens: "2. 選擇放大倍率",
      previewLabel: "預期視野",
      start: "啟動觀察任務",
      scanning: "正在掃描標本...",
      result: "任務完成！",
      compare: "現在，請透過你的顯微鏡觀察，看看是否和圖片一樣？",
      specimens: [
        { id: "onion", name: "洋蔥表皮細胞", image: IMAGES.specimens.onion },
        { id: "insect", name: "昆蟲翅膀", image: IMAGES.specimens.insect },
        { id: "hair", name: "頭髮", image: IMAGES.specimens.hair },
        { id: "leaf", name: "植物葉片氣孔", image: IMAGES.specimens.leaf },
        { id: "fiber", name: "衣服纖維", image: IMAGES.specimens.fiber }
      ],
      lenses: ["100x (低倍 - 搜尋用)", "400x (中倍 - 觀察用)", "1200x (高倍 - 細節用)"],
    },
    learn: {
      title: "顯微鏡構造大解密",
      didYouKnow: "你知道嗎？",
      parts: [
        { 
          name: "目鏡 (Eyepiece)", 
          desc: "這是你的觀察窗口。有些目鏡本身就有10倍或20倍的放大功能喔！", 
          image: IMAGES.parts.eyepiece,
          funFact: "顯微鏡的總放大倍率 = 目鏡倍率 × 物鏡倍率。"
        },
        { 
          name: "物鏡 (Objective Lens)", 
          desc: "最靠近標本的鏡頭。通常有三個不同長度的鏡頭，越長的倍率越高。", 
          image: IMAGES.parts.objective,
          funFact: "世界上最強的光學顯微鏡可以看到細菌！"
        },
        { 
          name: "載物台 (Stage)", 
          desc: "這是標本的表演舞台。上面的夾子負責把載玻片抓得緊緊的。", 
          image: IMAGES.parts.stage,
          funFact: "載物台中間有個洞，叫做'通光孔'。"
        },
        { 
          name: "反光鏡/光源 (Light)", 
          desc: "就像手電筒一樣，從下面打光穿過標本，這樣我們才看得到透明的東西。", 
          image: IMAGES.parts.light,
          funFact: "以前的顯微鏡是用鏡子反射太陽光的喔！"
        },
        { 
          name: "準焦螺旋 (Focus Knobs)", 
          desc: "這是控制清晰度的方向盤。粗的調大距離，細的調精確度。", 
          image: IMAGES.parts.knob,
          funFact: "操作口訣：先粗後細，由低倍到高倍。"
        },
      ],
    },
    gallery: {
      title: "微觀世界畫廊",
      desc: "看看這些平常不起眼的東西，在顯微鏡下是多麼美麗！",
      items: [
        { title: "食鹽晶體", desc: "看起來像是一顆顆透明的正方體寶石！", image: IMAGES.gallery.salt },
        { title: "海邊的沙子", desc: "每一粒沙子都像是一塊獨特的彩色岩石。", image: IMAGES.gallery.sand },
        { title: "雪花", desc: "完美的六角形結構，沒有兩片雪花是完全一樣的。", image: IMAGES.gallery.snow },
        { title: "洋蔥細胞", desc: "像磚塊一樣整齊排列，中間的小點是細胞核。", image: IMAGES.specimens.onion },
        { title: "葉脈", desc: "植物運送水分的高速公路，錯綜複雜。", image: IMAGES.specimens.leaf },
      ]
    },
    quiz: {
      title: "小小科學家挑戰賽",
      start: "開始出題",
      loading: "AI 博士正在思考題目...",
      score: "目前積分",
      next: "下一題",
      retry: "重新挑戰",
      perfect: "太強了！你是未來的諾貝爾獎得主！",
      good: "很棒喔！你對顯微鏡很了解！",
      tryAgain: "加油！多看幾次教學再來挑戰！",
    },
  },
  en: {
    title: "KidRise Microscope Adventure",
    subtitle: "Start Your Scientific Journey!",
    nav: {
      home: "Home",
      usage: "Guide",
      planner: "Lab",
      learn: "Parts",
      quiz: "Quiz",
      gallery: "Gallery"
    },
    home: {
      welcome: "Welcome to the Micro World",
      cta: "Start Adventure",
      features: {
        usage: "Step-by-step Guide",
        planner: "Mission Planner",
        learn: "Microscope Parts",
        quiz: "Science Quiz",
        gallery: "Amazing Photos"
      },
    },
    usage: {
      title: "Mastering the Microscope",
      proTipLabel: "💡 Pro Tip",
      steps: [
        { 
          title: "1. Base Setup", 
          desc: "Place on a flat table, check batteries, and turn on the bottom LED light.", 
          image: IMAGES.usage.setup,
          tip: "Clear your desk for a stable view!"
        },
        { 
          title: "2. Lock Target", 
          desc: "Place the slide on the stage. Use clips to hold it. Center the specimen over the light.", 
          image: IMAGES.usage.slide,
          tip: "Be gentle with the glass slides."
        },
        { 
          title: "3. First Sight", 
          desc: "Start with the lowest power (shortest lens). Turn the big knob until you see something.", 
          image: IMAGES.usage.focus,
          tip: "Don't let the lens touch the slide!"
        },
        { 
          title: "4. Sharp Focus", 
          desc: "Turn the small knob slowly to make it clear. Switch to longer lenses for more zoom!", 
          image: IMAGES.usage.observe,
          tip: "Close one eye or keep both open, whichever is comfortable."
        },
      ],
    },
    planner: {
      title: "Mission Control Center",
      selectSpecimen: "1. Select Target",
      selectLens: "2. Select Zoom Level",
      previewLabel: "Expected View",
      start: "Launch Mission",
      scanning: "Scanning Specimen...",
      result: "Mission Accomplished!",
      compare: "Now, look through your real microscope. Does it look like this?",
      specimens: [
        { id: "onion", name: "Onion Cells", image: IMAGES.specimens.onion },
        { id: "insect", name: "Insect Wing", image: IMAGES.specimens.insect },
        { id: "hair", name: "Human Hair", image: IMAGES.specimens.hair },
        { id: "leaf", name: "Plant Stomata", image: IMAGES.specimens.leaf },
        { id: "fiber", name: "Fabric Fiber", image: IMAGES.specimens.fiber }
      ],
      lenses: ["100x (Low - Scout)", "400x (Medium - Observe)", "1200x (High - Detail)"],
    },
    learn: {
      title: "Microscope Parts Decoded",
      didYouKnow: "Did You Know?",
      parts: [
        { 
          name: "Eyepiece", 
          desc: "The window you look through. It usually magnifies 10x or 20x by itself!", 
          image: IMAGES.parts.eyepiece,
          funFact: "Total Zoom = Eyepiece Zoom × Objective Zoom."
        },
        { 
          name: "Objective Lens", 
          desc: "Lenses closest to the object. The longer the lens, the stronger the zoom.", 
          image: IMAGES.parts.objective,
          funFact: "The strongest microscopes can see bacteria!"
        },
        { 
          name: "Stage", 
          desc: "The platform for your slide. Clips hold it tight so it doesn't move.", 
          image: IMAGES.parts.stage,
          funFact: "The hole in the center allows light to pass through."
        },
        { 
          name: "Light Source", 
          desc: "Like a flashlight beaming up through the specimen so you can see details.", 
          image: IMAGES.parts.light,
          funFact: "Old microscopes used mirrors to reflect sunlight."
        },
        { 
          name: "Focus Knobs", 
          desc: "The steering wheel for clarity. Big knob for fast movement, small for precise.", 
          image: IMAGES.parts.knob,
          funFact: "Always focus with low power first!"
        },
      ],
    },
    gallery: {
      title: "Micro World Gallery",
      desc: "Discover how everyday objects look amazing under zoom!",
      items: [
        { title: "Salt Crystals", desc: "Look like transparent cubic gems!", image: IMAGES.gallery.salt },
        { title: "Beach Sand", desc: "Every grain is like a unique colorful rock.", image: IMAGES.gallery.sand },
        { title: "Snowflake", desc: "Perfect hexagonal ice crystals.", image: IMAGES.gallery.snow },
        { title: "Onion Cells", desc: "Like a brick wall. The dot is the nucleus.", image: IMAGES.specimens.onion },
        { title: "Leaf Veins", desc: "The highway system for plants.", image: IMAGES.specimens.leaf },
      ]
    },
    quiz: {
      title: "Young Scientist Quiz",
      start: "New Challenge",
      loading: "AI Professor is thinking...",
      score: "Score",
      next: "Next",
      retry: "Play Again",
      perfect: "Amazing! Future Nobel Prize winner!",
      good: "Great job! You know your stuff!",
      tryAgain: "Keep learning and try again!",
    },
  },
};
