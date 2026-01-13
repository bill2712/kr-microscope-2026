import { Translation, Language } from './types';

// Image sources (using valid Unsplash IDs)
const IMAGES = {
  usage: {
    setup: "/kr-microscope-2026/images/setup.png", // Locally generated
    slide: "/kr-microscope-2026/images/slide.png", // Locally generated
    focus: "/kr-microscope-2026/images/focus.png", // Locally generated
    observe: "/kr-microscope-2026/images/observe.png" // Locally generated
  },
  parts: {
    eyepiece: "/kr-microscope-2026/images/eyepiece.png", // Locally generated
    objective: "/kr-microscope-2026/images/objective.png", // Locally generated
    stage: "/kr-microscope-2026/images/stage.png", // Locally generated
    light: "/kr-microscope-2026/images/light.png", // Locally generated
    knob: "/kr-microscope-2026/images/knob.png" // Locally generated
  },
  specimens: {
    onion: "/kr-microscope-2026/images/onion.png", // Locally generated
    insect: "/kr-microscope-2026/images/insect.png", // Locally generated
    leaf: "/kr-microscope-2026/images/leaf.png", // Locally generated
    bacteria: "/kr-microscope-2026/images/bacteria.png", // Locally generated
    mold: "/kr-microscope-2026/images/mold.png", // Locally generated
    butterfly: "/kr-microscope-2026/images/butterfly.png" // Locally generated
  },
  gallery: {
    salt: "/kr-microscope-2026/images/salt.png",
    sand: "/kr-microscope-2026/images/sand.png",
    snow: "/kr-microscope-2026/images/snow.png",
    pollen: "/kr-microscope-2026/images/pollen.png", // Locally generated
    velcro: "/kr-microscope-2026/images/velcro.png", // Locally generated
    peacock: "https://images.unsplash.com/photo-1542152396-857e5bb68c83?auto=format&fit=crop&w=600&q=80", // Placeholder
    soap: "https://images.unsplash.com/photo-1698224520977-ef5724b10461?auto=format&fit=crop&w=600&q=80", // Placeholder
    fabric: "https://images.unsplash.com/photo-1528459801411-197ee4a17926?auto=format&fit=crop&w=600&q=80", // Placeholder
    sugar: "/kr-microscope-2026/images/salt.png", // Reuse Salt
    strawberry: "/kr-microscope-2026/images/sand.png", // Reuse Sand
    chalk: "https://images.unsplash.com/photo-1456428746243-a4118f780875?auto=format&fit=crop&w=600&q=80", // Placeholder
    hair: "/kr-microscope-2026/images/insect.png" // Reuse Insect
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
      gallery: "微觀畫廊",
      ar: "AR 實驗室"
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
          title: "1. 準備基地 (Setup)", 
          desc: "首先，找到一個平穩、明亮的桌面。將顯微鏡輕輕放下，安裝好電池，並按下底部的開關打開 LED 光源。就像是為你的太空船準備發射平台一樣！", 
          image: IMAGES.usage.setup,
          tip: "桌面要保持整潔，這樣你的手臂才有地方支撐，觀察起來更穩定！"
        },
        { 
          title: "2. 鎖定目標 (Specimen)", 
          desc: "取出載玻片標本（小心玻璃！），將它放在載物台上。用金屬夾子把它固定住，確保標本正好位於中間通光孔的上方。", 
          image: IMAGES.usage.slide,
          tip: "如果標本不在正中間，你只會看到白白的光喔！"
        },
        { 
          title: "3. 尋找影像 (Focus)", 
          desc: "這是最關鍵的一步！先選用『最短』的物鏡（低倍）。眼睛看著目鏡，手慢慢轉動『粗準焦螺旋』。千萬不要太快，要像忍者一樣輕輕轉動，直到模糊的影子出現！", 
          image: IMAGES.usage.focus,
          tip: "一定要從低倍鏡開始找，不然在大海撈針！"
        },
        { 
          title: "4. 清晰鎖定 (Detail)", 
          desc: "當你看到影像後，改用『細準焦螺旋』微調，讓畫面變得像高清電視一樣銳利。如果想看更清楚，可以轉動轉盤換成更長的物鏡（高倍），再次微調焦距。", 
          image: IMAGES.usage.observe,
          tip: "換高倍鏡時，要從側面看，小心鏡頭不要撞破玻片！"
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
      compare: "現在，請透過你的顯微鏡觀察，看看是否和圖片一樣？嘗試畫下你看到的樣子！",
      specimens: [
        { id: "onion", name: "洋蔥表皮細胞 (Onion Cells)", image: IMAGES.specimens.onion },
        { id: "insect", name: "蜻蜓複眼與翅膀 (Dragonfly)", image: IMAGES.specimens.insect },
        { id: "leaf", name: "植物葉片氣孔 (Leaf Stomata)", image: IMAGES.specimens.leaf },
        { id: "bacteria", name: "細菌世界 (Bacteria)", image: IMAGES.specimens.bacteria },
        { id: "mold", name: "真菌孢子 (Mold Spores)", image: IMAGES.specimens.mold },
        { id: "butterfly", name: "蝴蝶鱗片 (Butterfly Scale)", image: IMAGES.specimens.butterfly }
      ],
      lenses: ["100x (偵察模式 - 找目標)", "400x (觀察模式 - 看結構)", "1200x (探索模式 - 看細節)"],
      focusTitle: "調整焦距 (Focusing)",
      coarseKnob: "粗調節輪 (Coarse)",
      fineKnob: "細調節輪 (Fine)",
      focusInstruction: "先轉動粗調節輪找到大概影像，再用細調節輪讓畫面變清楚！",
    },
    journal: {
      title: "觀察日記 (Observation Journal)",
      drawHint: "畫下你的發現！(Draw what you see!)",
      tools: {
        pen: "畫筆",
        eraser: "橡皮擦",
        clear: "清除",
        save: "保存日記",
        close: "關閉",
      },
      saveSuccess: "日記已保存！",
    },
    learn: {
      title: "顯微鏡構造大解密",
      didYouKnow: "你知道嗎？",
      parts: [
        { 
          name: "目鏡 (Eyepiece)", 
          desc: "這是你的觀察窗口，通常標有 10x 或 20x。就像望遠鏡的窺視孔，負責把物鏡放大的影像再放大一次送到你眼睛裡。", 
          image: IMAGES.parts.eyepiece,
          funFact: "如果不乾淨，千萬不要用手擦，要用專用的拭鏡紙喔！"
        },
        { 
          name: "物鏡 (Objective Lens)", 
          desc: "最靠近標本的鏡頭組。通常有 10x, 40x, 60x 三種。鏡頭越長，倍率越大，但也離標本越近，使用要很小心。", 
          image: IMAGES.parts.objective,
          funFact: "科學家有時候會滴油在鏡頭上（油鏡）來看得更清楚！"
        },
        { 
          name: "載物台 (Stage)", 
          desc: "這是標本的表演舞台。平台要是黑色的，這樣透明的標本才比較明顯。上面的彈簧夾是用來抓住調皮的玻片的。", 
          image: IMAGES.parts.stage,
          funFact: "高級顯微鏡的載物台可以前後左右移動，像飛機駕駛艙一樣！"
        },
        { 
          name: "反光鏡/光源 (Light Source)", 
          desc: "光線是顯微鏡的靈魂！LED 燈從下方發出光，穿過通光孔，再穿過標本，最後進入你的眼睛。", 
          image: IMAGES.parts.light,
          funFact: "如果要觀察不透明的石頭，光就要從上面照下來（實體顯微鏡）。"
        },
        { 
          name: "準焦螺旋 (Focus Knobs)", 
          desc: "這是控制清晰度的方向盤。粗調節輪（大顆）用來快速找到影像，細調節輪（小顆）用來讓影像變得銳利清晰。", 
          image: IMAGES.parts.knob,
          funFact: "操作口訣：先粗後細，低倍找目標，高倍看細節。"
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
        { title: "花粉粒", desc: "這些帶刺的小球就是讓你打噴嚏的元兇！", image: IMAGES.gallery.pollen },
        { title: "魔鬼氈", desc: "原來是無數的小勾子勾住了毛圈圈。", image: IMAGES.gallery.velcro },
        { title: "孔雀羽毛", desc: "閃耀著彩虹般的光芒，結構非常精細。", image: IMAGES.gallery.peacock },
        { title: "肥皂泡", desc: "擠在一起變成了好玩的幾何形狀。", image: IMAGES.gallery.soap },
        { title: "衣服纖維", desc: "像繩子一樣一上一下編織在一起。", image: IMAGES.gallery.fabric },
        { title: "糖晶體", desc: "跟鹽長得有點像，但形狀不太一樣喔。", image: IMAGES.gallery.sugar },
        { title: "草莓表面", desc: "那些種子放大看就像巨大的岩石。", image: IMAGES.gallery.strawberry },
        { title: "粉筆", desc: "其實是由幾百萬年前海洋生物的殼變成的！", image: IMAGES.gallery.chalk },
        { title: "頭髮", desc: "表面這層鱗片，保護著你的頭髮。", image: IMAGES.gallery.hair },
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
    ar: {
      title: "AR 虛擬實驗室",
      description: "將巨大的微生物或太空人帶入你的房間！",
      instruction: "使用手機瀏覽時，點擊右下角的 AR 按鈕，就可以將模型放置在真實環境中喔！",
      models: {
        astro: "小小太空人 (Astronaut)",
        microscope: "虛擬顯微鏡 (Microscope)"
      }
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
      gallery: "Gallery",
      ar: "AR Lab"
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
          desc: "Find a flat, stable table with good light. Place your microscope gently, insert batteries, and switch on the bottom LED light. Prepare for launch!", 
          image: IMAGES.usage.setup,
          tip: "Keep your desk clear so your arms can rest comfortably!"
        },
        { 
          title: "2. Lock Target", 
          desc: "Take a slide (careful, it's glass!) and place it on the stage. Use the metal clips to hold it tight. Make sure the specimen is exactly over the light hole.", 
          image: IMAGES.usage.slide,
          tip: "If the specimen isn't centered, you'll only see bright white light!"
        },
        { 
          title: "3. First Sight (Focus)", 
          desc: "This is the key step! Start with the SHORTEST lens (lowest power). Look through the eyepiece and slowly turn the LARGE knob. Be gentle like a ninja until a blurry image appears!", 
          image: IMAGES.usage.focus,
          tip: "Always start with the lowest power, or you'll get lost properly!"
        },
        { 
          title: "4. Sharp Focus", 
          desc: "Once you see a blur, use the SMALL knob to make it sharp like an HD TV. To zoom in more, rotate to a longer lens (higher power) and adjust focus again.", 
          image: IMAGES.usage.observe,
          tip: "When switching to high power, watch from the side so the lens doesn't hit the slide!"
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
      compare: "Now, look through your real microscope. Does it look like this? Try drawing what you see!",
      specimens: [
        { id: "onion", name: "Onion Cells", image: IMAGES.specimens.onion },
        { id: "insect", name: "Dragonfly Wing", image: IMAGES.specimens.insect },
        { id: "leaf", name: "Plant Stomata", image: IMAGES.specimens.leaf },
        { id: "bacteria", name: "Bacteria World", image: IMAGES.specimens.bacteria },
        { id: "mold", name: "Fungi Spores", image: IMAGES.specimens.mold },
        { id: "butterfly", name: "Butterfly Scales", image: IMAGES.specimens.butterfly }
      ],
      lenses: ["100x (Scout Mode)", "400x (Observe Mode)", "1200x (Detail Mode)"],
      focusTitle: "Adjust Focus",
      coarseKnob: "Coarse Knob",
      fineKnob: "Fine Knob",
        focusInstruction: "Turn Coarse first to find the image, then Fine to make it sharp!",
    },
    journal: {
      title: "Observation Journal",
      drawHint: "Draw what you see!",
      tools: {
        pen: "Pen",
        eraser: "Eraser",
        clear: "Clear",
        save: "Save Journal",
        close: "Close",
      },
      saveSuccess: "Journal Saved!",
    },
    learn: {
      title: "Microscope Parts Decoded",
      didYouKnow: "Did You Know?",
      parts: [
        { 
          name: "Eyepiece", 
          desc: "This is your window to the micro world, usually magnifying 10x or 20x. It's like a telescope's peephole that magnifies the image from the objective lens.", 
          image: IMAGES.parts.eyepiece,
          funFact: "Never wipe it with your shirt; use special lens paper!"
        },
        { 
          name: "Objective Lens", 
          desc: "The lenses closest to the object. Usually come in 10x, 40x, and 60x. The longer the lens, the stronger the zoom, but it sits closer to the slide.", 
          image: IMAGES.parts.objective,
          funFact: "Scientists sometimes put oil between the lens and slide (oil immersion) for super clarity!"
        },
        { 
          name: "Stage", 
          desc: "The black platform where your slide performs. It needs to be dark so transparent specimens stand out. The clips hold the slide in place.", 
          image: IMAGES.parts.stage,
          funFact: "Advanced stages can move left, right, forward, and back precisely!"
        },
        { 
          name: "Light Source", 
          desc: "Light is the soul of the microscope! The LED shines up through the hole, through the specimen, and into your eye.", 
          image: IMAGES.parts.light,
          funFact: "To see opaque rocks, you need light shining from above (Stereo Microscope)."
        },
        { 
          name: "Focus Knobs", 
          desc: "The steering wheels. Large knob (Coarse) for finding the image fast, Small knob (Fine) for making it crystal clear.", 
          image: IMAGES.parts.knob,
          funFact: "Rule of thumb: Coarse then Fine, Low power then High power."
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
        { title: "Pollen Grains", desc: "Spiky balls that make you sneeze!", image: IMAGES.gallery.pollen },
        { title: "Velcro", desc: "Hooks and loops holding together.", image: IMAGES.gallery.velcro },
        { title: "Peacock Feather", desc: "Shining with rainbow colors.", image: IMAGES.gallery.peacock },
        { title: "Soap Foam", desc: "geometric bubbles sharing walls.", image: IMAGES.gallery.soap },
        { title: "Fabric", desc: "Threads woven over and under.", image: IMAGES.gallery.fabric },
        { title: "Sugar", desc: "Similar to salt but different shape.", image: IMAGES.gallery.sugar },
        { title: "Strawberry", desc: "The seeds look like huge rocks.", image: IMAGES.gallery.strawberry },
        { title: "Chalk", desc: "Made of tiny ancient sea shells!", image: IMAGES.gallery.chalk },
        { title: "Hair", desc: "Covered in tiny scales like a pinecone.", image: IMAGES.gallery.hair },
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
    ar: {
      title: "AR Virtual Lab",
      description: "Bring giant microbes or astronauts into your room!",
      instruction: "On mobile, tap the AR button in the corner to place the model in your real world!",
      models: {
        astro: "Astronaut",
        microscope: "Virtual Microscope"
      }
    },
  },
};
