import { Translation, Language } from './types';

// Image sources (using valid Unsplash IDs)
export const IMAGES = {
  usage: {
    setup: "/images/setup.png", // Locally generated
    slide: "/images/slide.png", // Locally generated
    focus: "/images/focus.png", // Locally generated
    observe: "/images/observe.png" // Locally generated
  },
  parts: {
    eyepiece: "/images/eyepiece.png",
    objective: "/images/objective.png",
    stage: "/images/stage.png",
    light: "/images/light.png",
    knob: "/images/knob.png",
    base: "/images/base.png",
    illumination_switch: "/images/illumination_switch.png",
    stage_clips: "/images/stage_clips.png",
    filter: "/images/filter.png",
    arm: "/images/arm.png",
    microscope: "/images/microscope.png",
    nosepiece: "/images/nosepiece.png",
    tube: "/images/tube.png"
  },
  specimens: {
    onion_100x: "/images/onion_100x.png",
    onion_400x: "/images/onion_400x.png",
    onion_1200x: "/images/onion_1200x.png",
    insect_100x: "/images/insect_100x.png",
    insect_400x: "/images/insect_400x.png",
    insect_1200x: "/images/insect_1200x.png",
    leaf_100x: "/images/leaf_100x.png",
    leaf_400x: "/images/leaf_400x.png",
    leaf_1200x: "/images/leaf_1200x.png",
    bacteria_100x: "/images/bacteria_100x.png",
    bacteria_400x: "/images/bacteria_400x.png",
    bacteria_1200x: "/images/bacteria_1200x.png",
    mold_100x: "/images/mold_100x.png",
    mold_400x: "/images/mold_400x.png",
    mold_1200x: "/images/mold_1200x.png",
    butterfly_100x: "/images/butterfly_100x.png",
    butterfly_400x: "/images/butterfly_400x.png",
    butterfly_1200x: "/images/butterfly_1200x.png",
    potato_starch_100x: "/images/potato_starch_100x.png",
    potato_starch_400x: "/images/potato_starch_400x.png",
    potato_starch_1200x: "/images/potato_starch_1200x.png",
    carrot_root_100x: "/images/carrot_root_100x.png",
    carrot_root_400x: "/images/carrot_root_400x.png",
    carrot_root_1200x: "/images/carrot_root_1200x.png",
    butterfly_leg_100x: "/images/butterfly_leg_100x.png",
    butterfly_leg_400x: "/images/butterfly_leg_400x.png",
    butterfly_leg_1200x: "/images/butterfly_leg_1200x.png",
    honeybee_leg_100x: "/images/honeybee_leg_100x.png",
    honeybee_leg_400x: "/images/honeybee_leg_400x.png",
    honeybee_leg_1200x: "/images/honeybee_leg_1200x.png",
    honeybee_wing_100x: "/images/honeybee_wing_100x.png",
    honeybee_wing_400x: "/images/honeybee_wing_400x.png",
    honeybee_wing_1200x: "/images/honeybee_wing_1200x.png",
    locust_wing_100x: "/images/locust_wing_100x.png",
    locust_wing_400x: "/images/locust_wing_400x.png",
    locust_wing_1200x: "/images/locust_wing_1200x.png",
    camellia_pollen_100x: "/images/camellia_pollen_100x.png",
    camellia_pollen_400x: "/images/camellia_pollen_400x.png",
    camellia_pollen_1200x: "/images/camellia_pollen_1200x.png",
    tulip_pollen_100x: "/images/tulip_pollen_100x.png",
    tulip_pollen_400x: "/images/tulip_pollen_400x.png",
    tulip_pollen_1200x: "/images/tulip_pollen_1200x.png",
    lily_pollen_100x: "/images/lily_pollen_100x.png",
    lily_pollen_400x: "/images/lily_pollen_400x.png",
    lily_pollen_1200x: "/images/lily_pollen_1200x.png",
    sunflower_pollen_100x: "/images/sunflower_pollen_100x.png",
    sunflower_pollen_400x: "/images/sunflower_pollen_400x.png",
    sunflower_pollen_1200x: "/images/sunflower_pollen_1200x.png",
    holly_leaf_100x: "/images/holly_leaf_100x.png",
    holly_leaf_400x: "/images/holly_leaf_400x.png",
    holly_leaf_1200x: "/images/holly_leaf_1200x.png",
    corn_stem_100x: "/images/corn_stem_100x.png",
    corn_stem_400x: "/images/corn_stem_400x.png",
    corn_stem_1200x: "/images/corn_stem_1200x.png",
    pigeon_feather_100x: "/images/pigeon_feather_100x.png",
    pigeon_feather_400x: "/images/pigeon_feather_400x.png",
    pigeon_feather_1200x: "/images/pigeon_feather_1200x.png",
    canary_feather_100x: "/images/canary_feather_100x.png",
    canary_feather_400x: "/images/canary_feather_400x.png",
    canary_feather_1200x: "/images/canary_feather_1200x.png",
    cat_hair_100x: "/images/cat_hair_100x.png",
    cat_hair_400x: "/images/cat_hair_400x.png",
    cat_hair_1200x: "/images/cat_hair_1200x.png",
    plankton_egg_100x: "/images/plankton_egg_100x.png",
    plankton_egg_400x: "/images/plankton_egg_400x.png",
    plankton_egg_1200x: "/images/plankton_egg_1200x.png",
    dandelion_fuzz_100x: "/images/dandelion_fuzz_100x.png",
    dandelion_fuzz_400x: "/images/dandelion_fuzz_400x.png",
    dandelion_fuzz_1200x: "/images/dandelion_fuzz_1200x.png",
    goldfish_scale_100x: "/images/goldfish_scale_100x.png",
    goldfish_scale_400x: "/images/goldfish_scale_400x.png",
    goldfish_scale_1200x: "/images/goldfish_scale_1200x.png"
  },
  gallery: {
    salt: "/images/salt.png",
    sand: "/images/sand.png",
    snow: "/images/snow.png",
    pollen: "/images/pollen.png", // Locally generated
    velcro: "/images/velcro.png", // Locally generated
    peacock: "/images/peacock.png", // Locally generated
    soap: "/images/soap.png", // Locally generated
    fabric: "/images/fabric.png", // Locally generated
    sugar: "/images/salt.png", // Reuse Salt
    strawberry: "/images/sand.png", // Reuse Sand
    chalk: "/images/chalk.png", // Locally generated
    hair: "/images/insect.png" // Reuse Insect
  },
  journal: {
    background: "/images/journal_bg.png" // Locally generated
  }
};

// --- Text Content (Bilingual) ---
export const TEXTS: Record<Language, Translation> = {
  zh: {
    title: "Kidrise 顯微鏡探秘",
    subtitle: "開啟你的科學探索之旅！",
    nav: {
      home: "首頁",
      usage: "使用教學",
      planner: "實驗室",
      learn: "構造百科",
      quiz: "小測驗",
      gallery: "微觀畫廊",
      ar: "AR 實驗室",
      journal: "觀察日記"
    },
    quiz: {
      title: "小小科學家挑戰賽",
      start: "開始出題",
      loading: "準備題目中...",
      score: "目前積分",
      next: "下一題",
      retry: "再玩一次",
      perfect: "太強了！你是未來的諾貝爾獎得主！",
      good: "很棒喔！你對顯微鏡很了解！",
      tryAgain: "加油！多看幾次教學再來挑戰！",
      resultTitle: "成績單",
      enterName: "輸入你的名字：",
      download: "下載成績單",
      certificate: "顯微鏡大師證書",
      certifiedBy: "Kidrise頒發",
      date: "日期",
      rules: {
        title: "挑戰說明",
        text: [
          "在這個測驗中，你將回答 20 條關於顯微鏡和科學的問題。",
          "如果你能獲得 60% 或以上的分數（答對 12 題），",
          "你將獲得一張 Kidrise 頒發的「顯微鏡大師證書」！"
        ],
        startBtn: "開始挑戰"
      }
    },
    footer: {
      copyright: "© 2026 Kidrise STEM香港教育玩具",
      techSupport: "由 Kidrise童樂高飛 提供技術支援"
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
        { 
            id: "onion", 
            name: "洋蔥表皮細胞 (Onion Cells)", 
            images: { "100x": IMAGES.specimens.onion_100x, "400x": IMAGES.specimens.onion_400x, "1200x": IMAGES.specimens.onion_1200x } 
        },
        { 
            id: "insect", 
            name: "蜻蜓複眼與翅膀 (Dragonfly)", 
            images: { "100x": IMAGES.specimens.insect_100x, "400x": IMAGES.specimens.insect_400x, "1200x": IMAGES.specimens.insect_1200x }
        },
        { 
            id: "leaf", 
            name: "植物葉片氣孔 (Leaf Stomata)", 
            images: { "100x": IMAGES.specimens.leaf_100x, "400x": IMAGES.specimens.leaf_400x, "1200x": IMAGES.specimens.leaf_1200x }
        },
        { 
            id: "bacteria", 
            name: "細菌世界 (Bacteria)", 
            images: { "100x": IMAGES.specimens.bacteria_100x, "400x": IMAGES.specimens.bacteria_400x, "1200x": IMAGES.specimens.bacteria_1200x }
        },
        { 
            id: "mold", 
            name: "真菌孢子 (Mold Spores)", 
            images: { "100x": IMAGES.specimens.mold_100x, "400x": IMAGES.specimens.mold_400x, "1200x": IMAGES.specimens.mold_1200x }
        },
        { 
            id: "butterfly", 
            name: "蝴蝶鱗片 (Butterfly Scale)", 
            images: { "100x": IMAGES.specimens.butterfly_100x, "400x": IMAGES.specimens.butterfly_400x, "1200x": IMAGES.specimens.butterfly_1200x }
        },
        { id: "potato_starch", name: "馬鈴薯澱粉 (Potato Starch)", images: { "100x": IMAGES.specimens.potato_starch_100x, "400x": IMAGES.specimens.potato_starch_400x, "1200x": IMAGES.specimens.potato_starch_1200x } },
        { id: "carrot_root", name: "胡蘿蔔根 (Carrot Root)", images: { "100x": IMAGES.specimens.carrot_root_100x, "400x": IMAGES.specimens.carrot_root_400x, "1200x": IMAGES.specimens.carrot_root_1200x } },
        { id: "butterfly_leg", name: "蝴蝶腳 (Butterfly Leg)", images: { "100x": IMAGES.specimens.butterfly_leg_100x, "400x": IMAGES.specimens.butterfly_leg_400x, "1200x": IMAGES.specimens.butterfly_leg_1200x } },
        { id: "honeybee_leg", name: "蜜蜂腳 (Honeybee Leg)", images: { "100x": IMAGES.specimens.honeybee_leg_100x, "400x": IMAGES.specimens.honeybee_leg_400x, "1200x": IMAGES.specimens.honeybee_leg_1200x } },
        { id: "honeybee_wing", name: "蜜蜂翅膀 (Honeybee Wing)", images: { "100x": IMAGES.specimens.honeybee_wing_100x, "400x": IMAGES.specimens.honeybee_wing_400x, "1200x": IMAGES.specimens.honeybee_wing_1200x } },
        { id: "locust_wing", name: "蝗蟲翅膀 (Locust Wing)", images: { "100x": IMAGES.specimens.locust_wing_100x, "400x": IMAGES.specimens.locust_wing_400x, "1200x": IMAGES.specimens.locust_wing_1200x } },
        { id: "camellia_pollen", name: "山茶花粉 (Camellia Pollen)", images: { "100x": IMAGES.specimens.camellia_pollen_100x, "400x": IMAGES.specimens.camellia_pollen_400x, "1200x": IMAGES.specimens.camellia_pollen_1200x } },
        { id: "tulip_pollen", name: "鬱金香花粉 (Tulip Pollen)", images: { "100x": IMAGES.specimens.tulip_pollen_100x, "400x": IMAGES.specimens.tulip_pollen_400x, "1200x": IMAGES.specimens.tulip_pollen_1200x } },
        { id: "lily_pollen", name: "百合花粉 (Lily Pollen)", images: { "100x": IMAGES.specimens.lily_pollen_100x, "400x": IMAGES.specimens.lily_pollen_400x, "1200x": IMAGES.specimens.lily_pollen_1200x } },
        { id: "sunflower_pollen", name: "向日葵花粉 (Sunflower Pollen)", images: { "100x": IMAGES.specimens.sunflower_pollen_100x, "400x": IMAGES.specimens.sunflower_pollen_400x, "1200x": IMAGES.specimens.sunflower_pollen_1200x } },
        { id: "holly_leaf", name: "冬青葉脈 (Holly Leaf)", images: { "100x": IMAGES.specimens.holly_leaf_100x, "400x": IMAGES.specimens.holly_leaf_400x, "1200x": IMAGES.specimens.holly_leaf_1200x } },
        { id: "corn_stem", name: "玉米莖 (Corn Stem)", images: { "100x": IMAGES.specimens.corn_stem_100x, "400x": IMAGES.specimens.corn_stem_400x, "1200x": IMAGES.specimens.corn_stem_1200x } },
        { id: "pigeon_feather", name: "鴿子羽毛 (Pigeon Feather)", images: { "100x": IMAGES.specimens.pigeon_feather_100x, "400x": IMAGES.specimens.pigeon_feather_400x, "1200x": IMAGES.specimens.pigeon_feather_1200x } },
        { id: "canary_feather", name: "金絲雀羽毛 (Canary Feather)", images: { "100x": IMAGES.specimens.canary_feather_100x, "400x": IMAGES.specimens.canary_feather_400x, "1200x": IMAGES.specimens.canary_feather_1200x } },
        { id: "cat_hair", name: "貓毛 (Cat Hair)", images: { "100x": IMAGES.specimens.cat_hair_100x, "400x": IMAGES.specimens.cat_hair_400x, "1200x": IMAGES.specimens.cat_hair_1200x } },
        { id: "plankton_egg", name: "浮游生物卵 (Plankton Egg)", images: { "100x": IMAGES.specimens.plankton_egg_100x, "400x": IMAGES.specimens.plankton_egg_400x, "1200x": IMAGES.specimens.plankton_egg_1200x } },
        { id: "dandelion_fuzz", name: "蒲公英絨毛 (Dandelion Fuzz)", images: { "100x": IMAGES.specimens.dandelion_fuzz_100x, "400x": IMAGES.specimens.dandelion_fuzz_400x, "1200x": IMAGES.specimens.dandelion_fuzz_1200x } },
        { id: "goldfish_scale", name: "金魚鱗片 (Goldfish Scale)", images: { "100x": IMAGES.specimens.goldfish_scale_100x, "400x": IMAGES.specimens.goldfish_scale_400x, "1200x": IMAGES.specimens.goldfish_scale_1200x } }
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
        text: "文字",
        clear: "清除",
        save: "保存日記",
        close: "關閉",
        undo: "復原",
        colorSize: "顏色與大小",
      },
      stamps: {
        label: "貼紙工具",
        items: {
          nucleus: "細胞核",
          cellWall: "細胞壁",
          pointer: "箭頭",
          question: "這是什麼？",
          star: "重要發現",
        }
      },
      viewToggle: "切換視野 (圓形/全屏)",
      labReport: {
        title: "Kidrise 科學實驗報告",
        date: "觀察日期",
        specimen: "觀察樣本",
        magnification: "放大倍率",
        scientist: "小小科學家",
      },
      saveSuccess: "日記已保存！",
    },
    login: {
      title: "產品啟用",
      desc: "請輸入包裝盒或說明書上的產品啟用碼以開始使用。",
      placeholder: "輸入啟用碼",
      submit: "開始探索",
      error: "啟用碼無效，請檢查包裝盒上的代碼。"
    },
    learn: {
      title: "顯微鏡小百科",
      didYouKnow: "你知道嗎？",
      menu: {
        intro: "顯微鏡介紹",
        types: "顯微鏡種類",
        magnification: "放大倍數",
        parts: "構造解密",
        accessories: "配件",
        preparation: "樣本製作",
        guide: "如何觀察",
        diy: "DIY 實驗",
        applications: "應用領域",
        maintenance: "保養維護"
      },
      intro: {
        title: "顯微鏡介紹",
        content: [
           "最著名且最常見的顯微鏡是透射光顯微鏡，利用光線通過薄透的物體進行觀察。顯微鏡下部產生的光被向上引導到載物台，投射到待觀測物體上。這樣你就可以研究葉片的橫切面或微生物了。"
        ]
      },
      types: {
         title: "顯微鏡種類",
         items: [
            { name: "透射光顯微鏡 (Transmitted Light)", desc: "利用光線通過薄透的物體進行觀察，適合觀察葉片橫切面或微生物。" },
            { name: "反射光顯微鏡 (Reflected Light)", desc: "可以觀察不透明的固體物質，例如硬幣或晶體。它的照明燈安裝在載物台的斜上方，光線從上方照射在物體上。" },
            { name: "帶坐標台顯微鏡 (Mechanical Stage)", desc: "超高品質的顯微鏡一般帶有一個坐標台。這樣就可以將玻片標本夾在上面，通過調校滾花輪以毫米級的精度在兩個方向上移動。" }
         ]
      },
      magnification: {
         title: "放大倍數有多高？",
         content: [
             "物鏡和目鏡都有放大倍數。將這兩個數直接相乘就可以得到總放大倍數。例如，目鏡的放大倍數為 10倍，物鏡為 20 倍，則總放大倍數為 200 倍。",
             "具有出色分辨率的超精密顯微鏡甚至可以達到 1500 倍甚至 2000 倍的放大倍數。但在一般觀察中，400 至 600 倍的顯微鏡就足以讓我們看到激動人心的微觀世界了。"
         ]
      },
      parts: {
        title: "顯微鏡構造",
        items: [
          { 
            name: "目鏡 (Eyepiece)", 
            desc: "接近眼睛的透鏡。許多顯微鏡只有一個目鏡，雙目顯微鏡則有兩個，可以雙眼同時觀察。", 
            image: IMAGES.parts.eyepiece,
            funFact: "如果不乾淨，千萬不要用手擦，要用專用的拭鏡紙喔！"
          },
          { 
            name: "鏡筒 (Body Tube)", 
            desc: "安裝透鏡，防止橫向外部光干擾，連接目鏡與物鏡。", 
            image: IMAGES.parts.tube, 
            funFact: "它是光線的隧道！"
          },
          { 
            name: "鏡臂 (Arm)", 
            desc: "連接鏡筒與底座，也是手拿顯微鏡時應該握住的地方。", 
            image: IMAGES.parts.arm, 
            funFact: "這是顯微鏡的『脊椎』。"
          },
          { 
            name: "物鏡 (Objective Lens)", 
            desc: "靠近待觀測物體的透鏡組，通常有多個不同倍率可以切換。", 
            image: IMAGES.parts.objective,
            funFact: "鏡頭越長倍率越大，但也離標本越近，要小心碰撞！"
          },
          { 
             name: "物鏡轉換器 (Nosepiece)",
             desc: "轉動它可以將不同放大倍數的物鏡調整到工作位置。",
             image: IMAGES.parts.nosepiece,
             funFact: "轉動時會聽到『咔』一聲，表示定位完成了。"
          },
          { 
            name: "載物台 (Stage)", 
            desc: "用於放置物體或玻片標本。中央有個通光孔，讓光線通過。", 
            image: IMAGES.parts.stage,
            funFact: "有些高級載物台可以精確移動標本位置。"
          },
          { 
            name: "壓片夾 (Stage Clips)", 
            desc: "固定載玻片，防止標本移動。", 
            image: IMAGES.parts.stage_clips,
            funFact: "一定要夾緊，不然看著看著標本就跑了！"
          },
          { 
             name: "濾光片 (Filter Disc)", 
             desc: "位於載物台下方，透過旋轉不同大小的光圈或顏色濾片來調節光線強度與對比度。", 
             image: IMAGES.parts.filter, 
             funFact: "標本太亮或太暗時，轉動它可以獲得最佳畫面。"
          },
          { 
            name: "準焦螺旋 (Focus Knobs)", 
            desc: "調節載物台上下移動，從而調節清晰度。", 
            image: IMAGES.parts.knob,
            funFact: "先用粗螺旋找目標，再用細螺旋調清楚。"
          },
          { 
            name: "光源 (Light Source)", 
            desc: "產生光束，在透射模式下將光束透射到物體上。", 
            image: IMAGES.parts.light,
            funFact: "對於顏色太淺的標本，可以用濾光片增加對比度。"
          },
          { 
             name: "照明開關 (Illumination Switch)", 
             desc: "控制光源的開關。", 
             image: IMAGES.parts.illumination_switch, 
             funFact: "記得用完要關燈省電喔！"
          },
          { 
             name: "底座 (Base)", 
             desc: "支撐整台顯微鏡，內藏電池盒。", 
             image: IMAGES.parts.base, 
             funFact: "这是顯微鏡的『腳』，要放平穩。"
          },
          {
             name: "顯微鏡全貌 (Microscope)",
             desc: "這就是我們要學習的神奇工具！",
             image: IMAGES.parts.microscope,
             funFact: "它能帶你看見微觀世界！"
          }
        ]
      },
      accessories: {
        title: "常用配件",
        items: [
            { name: "載玻片與蓋玻片", desc: "載玻片是放置對象的玻璃片；蓋玻片極薄，覆蓋在對象上防止變乾。" },
            { name: "鑷子", desc: "可以更好地抓取細小物體。" },
            { name: "滴管", desc: "用來將液體或着色劑滴到載玻片上。" },
            { name: "培養皿", desc: "有助於發現合適的樣本，也可以直接放在反射光顯微鏡下觀察。" },
            { name: "解剖針", desc: "提取特別小的物體，或是利用它們調節載玻片上樣本的位置。" },
            { name: "剪刀與刀片", desc: "用於精細切割樣本。手術刀或剃鬚刀片非常鋒利，使用時要小心！" }
        ]
      },
      preparation: {
        title: "樣本製作與處理",
        intro: "在使用透射光顯微鏡時，正確的樣本處理非常重要。",
        steps: [
            { title: "1. 固體與液體", desc: "固體物質（如昆蟲腿）用鑷子放到載玻片上；液體物質（如池塘水）用滴管滴在載玻片上。" },
            { title: "2. 樣本保存", desc: "液體樣本存放在密封玻璃瓶；乾燥樣本放在信封；昆蟲放入盒子保存。" },
            { title: "3. 染色增強", desc: "使用染色溶液和液體著色劑，可以使樣本的部分結構更加清晰。" },
            { title: "4. 清潔與吸乾", desc: "利用濾紙或廚房用紙吸乾載玻片上多餘的液體。" },
            { title: "5. 切片技巧", desc: "使用小剪刀或手術刀對樣本進行剪切。注意安全！" }
        ]
      },
      guide: {
        title: "如何正確觀察",
        intro: "顯微鏡的操作非常簡單，但是要確保物鏡不觸碰到載玻片。",
        steps: [
            { title: "1. 初次觀察", desc: "將一根頭髮或羽毛放在載玻片上的水滴中，蓋上蓋玻片。用濾紙吸乾多餘水分。" },
            { title: "2. 設置物鏡", desc: "選擇倍數最小的物鏡，轉動對準通光孔（聽到『吧嗒』聲）。將鏡頭調節到距離載物台約 1cm 處。" },
            { title: "3. 放置標本", desc: "將載玻片固定在載物台上，標本對準通光孔。從側面觀察，縮小物鏡與載物台的距離至 1-2mm。切記不要碰到蓋玻片！" },
            { title: "4. 調節焦距", desc: "通過目鏡觀察，緩慢加大距離，直到聚焦。移動載玻片尋找感興趣的部分（注意影像是顛倒的）。" },
            { title: "5. 提高倍率", desc: "如果發現有趣的部位，轉動物鏡轉換器切換更高倍數。記得從側面檢查以防碰撞。" }
        ],
        tips: [
            "眼液中的黑點：有時眼前會掠過黑點，這是眼液陰影，不用擔心。",
            "左右顛倒：顯微鏡下看到的圖像是上下左右顛倒的。",
            "側面檢查：切換高倍鏡時，這一步非常重要，可以防止鏡頭壓碎玻片。"
        ]
      },
      diy: {
        title: "DIY 手工製作實驗",
        intro: "「你只有畫下來，才證明你看到了！」準備一本觀察日記吧。",
        projects: [
            {
                title: "池塘裏的草履蟲",
                desc: "在池塘水或魚池中尋找這些單細胞生物。",
                materials: ["池塘水", "棉花纖維 (可選)", "載玻片"],
                steps: ["取一滴池塘水滴在載玻片上。", "放入幾絲棉花纖維可以限制它們亂動。", "蓋上蓋玻片進行觀察。"],
                note: "可以看到內部的食物泡和推動它們前進的纖維（纖毛）。"
            },
            {
                title: "綠色水藻 (水綿)",
                desc: "春天常見的絲狀綠藻，含有美麗的螺旋狀葉綠體。",
                materials: ["水藻", "鑷子/剪刀", "解剖針"],
                steps: ["用鑷子取一小塊水藻。", "放入載玻片上的水滴中。", "用解剖針攤開，蓋上蓋玻片。"],
                note: "葉綠素幫助植物進行光合作用。"
            },
            {
                title: "洋蔥表皮細胞",
                desc: "觀察植物細胞結構的經典實驗。",
                materials: ["洋蔥", "手術刀/鑷子", "碘酒/藍墨水"],
                steps: ["切開洋蔥，撕下一層極薄的透明表皮。", "放入水滴中展平。", "蓋上蓋玻片。", "滴一滴染色劑在邊緣，用濾紙吸引流過標本。"],
                note: "染色後可以清晰看到細胞壁和細胞核。"
            },
            {
                title: "澱粉顆粒偵探",
                desc: "不同植物（馬鈴薯、香蕉、粟米）的澱粉粒形狀都不一樣喔！",
                materials: ["馬鈴薯/香蕉", "手術刀", "碘酒"],
                steps: ["刮取少量果肉汁液。", "塗在載玻片上。", "滴入碘酒染色（澱粉會變藍紫色）。"],
                note: "比較看看小麥、豌豆和馬鈴薯的澱粉有什麼不同？"
            },
            {
                title: "結晶體召喚術",
                desc: "讓鹽、糖或維他命C在載玻片上重新結晶。",
                materials: ["食鹽/糖", "温水", "載玻片"],
                steps: ["將食鹽溶於温水。", "滴一滴在載玻片上（不用蓋玻片）。", "放置一夜讓水分蒸發。"],
                note: "你會看到規則的立方體晶體。可以用濾光片觀察邊角。"
            },
            {
                title: "蜂蜜花粉分析",
                desc: "偵測蜂蜜是由哪些花朵釀成的。",
                materials: ["蜂蜜", "温水", "小瓶子"],
                steps: ["蜂蜜温水1:2混合溶解。", "靜置兩天讓花粉沉澱。", "吸取底部沉澱物觀察。"]
            },
            {
                title: "頭髮與纖維",
                desc: "像法醫一樣分析房間裏的灰塵和衣物纖維。",
                materials: ["透明膠帶", "頭髮", "衣物纖維"],
                steps: ["用膠帶黏起地上的灰塵。", "或取一根頭髮放在載玻片上。", "對比不同人的頭髮截面。"],
                note: "亞洲人的頭髮截面較圓，歐洲人較橢圓。"
            }
        ]
      },
      applications: {
        title: "顯微鏡的應用領域",
        intro: "顯微鏡是科學和技術領域的多功能工具。",
        fields: [
            { title: "醫學 (Medicine)", desc: "檢測血液、尿液中的細菌或病毒，協助醫生診斷疾病（如昏睡病）。" },
            { title: "食品檢驗 (Food Safety)", desc: "檢查食物是否含有害蟲（如豬肉中的旋毛蟲）或細菌。" },
            { title: "環境保護 (Environment)", desc: "通過水中的微生物（如渦蟲）種類來判斷水質污染程度。" },
            { title: "地質學 (Geology)", desc: "利用偏振光觀察岩石切片，研究地球的歷史與形成。" },
            { title: "考古學 (Archaeology)", desc: "分析土壤中的花粉了解古代氣候；檢查木乃伊了解古人的飲食與健康。" },
            { title: "古生物學 (Paleontology)", desc: "清理化石時避免損壞；甚至能在恐龍骨骼中發現細胞殘留！" },
            { title: "高科技 (Technology)", desc: "開發新材料、檢查芯片電路，或分析金屬部件的微小裂紋（如飛機事故調查）。" }
        ]
      },
      maintenance: {
        title: "顯微鏡保養",
        content: [
            "顯微鏡是一種靈敏的光學儀器。在不使用時，最好將它放到包裝盒中，或者用塑料袋套上，防止灰塵及污垢侵襲。",
            "即使目鏡和物鏡始終固定，仍難免會有灰塵。這時應使用柔軟、乾淨的超細纖維清潔布擦拭，恢復目鏡的潔淨。"
        ]
      }
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
    ar: {
      title: "AR 虛擬實驗室",
      description: "將巨大的微生物或太空人帶入你的房間！",
      instruction: "使用手機瀏覽時，點擊右下角的 AR 按鈕，就可以將模型放置在真實環境中喔！",
      models: {
        astro: "小小太空人 (Astronaut)",
        microscope: "虛擬顯微鏡 (Microscope)"
      },
      upload: "上傳模型 (.glb)"
    },
    chat: {
      placeholder: "Send a message...",
      thinking: "Thinking...",
    }
  },
  en: {
    title: "Kidrise Microscope Adventure",
    subtitle: "Start Your Scientific Journey!",
    nav: {
      home: "Home",
      usage: "Guide",
      planner: "Lab",
      learn: "Parts",
      quiz: "Quiz",
      gallery: "Gallery",
      ar: "AR Lab",
      journal: "Journal"
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
        { 
            id: "onion", 
            name: "Onion Cells", 
            images: { "100x": IMAGES.specimens.onion_100x, "400x": IMAGES.specimens.onion_400x, "1200x": IMAGES.specimens.onion_1200x }
        },
        { 
            id: "insect", 
            name: "Dragonfly Wing", 
            images: { "100x": IMAGES.specimens.insect_100x, "400x": IMAGES.specimens.insect_400x, "1200x": IMAGES.specimens.insect_1200x }
        },
        { 
            id: "leaf", 
            name: "Plant Stomata", 
            images: { "100x": IMAGES.specimens.leaf_100x, "400x": IMAGES.specimens.leaf_400x, "1200x": IMAGES.specimens.leaf_1200x }
        },
        { 
            id: "bacteria", 
            name: "Bacteria World", 
            images: { "100x": IMAGES.specimens.bacteria_100x, "400x": IMAGES.specimens.bacteria_400x, "1200x": IMAGES.specimens.bacteria_1200x }
        },
        { 
            id: "mold", 
            name: "Fungi Spores", 
            images: { "100x": IMAGES.specimens.mold_100x, "400x": IMAGES.specimens.mold_400x, "1200x": IMAGES.specimens.mold_1200x }
        },
        { 
            id: "butterfly", 
            name: "Butterfly Scales", 
            images: { "100x": IMAGES.specimens.butterfly_100x, "400x": IMAGES.specimens.butterfly_400x, "1200x": IMAGES.specimens.butterfly_1200x }
        },
        { id: "potato_starch", name: "Potato Starch", images: { "100x": IMAGES.specimens.potato_starch_100x, "400x": IMAGES.specimens.potato_starch_400x, "1200x": IMAGES.specimens.potato_starch_1200x } },
        { id: "carrot_root", name: "Carrot Root", images: { "100x": IMAGES.specimens.carrot_root_100x, "400x": IMAGES.specimens.carrot_root_400x, "1200x": IMAGES.specimens.carrot_root_1200x } },
        { id: "butterfly_leg", name: "Butterfly Leg", images: { "100x": IMAGES.specimens.butterfly_leg_100x, "400x": IMAGES.specimens.butterfly_leg_400x, "1200x": IMAGES.specimens.butterfly_leg_1200x } },
        { id: "honeybee_leg", name: "Honeybee Leg", images: { "100x": IMAGES.specimens.honeybee_leg_100x, "400x": IMAGES.specimens.honeybee_leg_400x, "1200x": IMAGES.specimens.honeybee_leg_1200x } },
        { id: "honeybee_wing", name: "Honeybee Wing", images: { "100x": IMAGES.specimens.honeybee_wing_100x, "400x": IMAGES.specimens.honeybee_wing_400x, "1200x": IMAGES.specimens.honeybee_wing_1200x } },
        { id: "locust_wing", name: "Locust Wing", images: { "100x": IMAGES.specimens.locust_wing_100x, "400x": IMAGES.specimens.locust_wing_400x, "1200x": IMAGES.specimens.locust_wing_1200x } },
        { id: "camellia_pollen", name: "Camellia Pollen", images: { "100x": IMAGES.specimens.camellia_pollen_100x, "400x": IMAGES.specimens.camellia_pollen_400x, "1200x": IMAGES.specimens.camellia_pollen_1200x } },
        { id: "tulip_pollen", name: "Tulip Pollen", images: { "100x": IMAGES.specimens.tulip_pollen_100x, "400x": IMAGES.specimens.tulip_pollen_400x, "1200x": IMAGES.specimens.tulip_pollen_1200x } },
        { id: "lily_pollen", name: "Lily Pollen", images: { "100x": IMAGES.specimens.lily_pollen_100x, "400x": IMAGES.specimens.lily_pollen_400x, "1200x": IMAGES.specimens.lily_pollen_1200x } },
        { id: "sunflower_pollen", name: "Sunflower Pollen", images: { "100x": IMAGES.specimens.sunflower_pollen_100x, "400x": IMAGES.specimens.sunflower_pollen_400x, "1200x": IMAGES.specimens.sunflower_pollen_1200x } },
        { id: "holly_leaf", name: "Veins of Holly Leaf", images: { "100x": IMAGES.specimens.holly_leaf_100x, "400x": IMAGES.specimens.holly_leaf_400x, "1200x": IMAGES.specimens.holly_leaf_1200x } },
        { id: "corn_stem", name: "Corn Stem", images: { "100x": IMAGES.specimens.corn_stem_100x, "400x": IMAGES.specimens.corn_stem_400x, "1200x": IMAGES.specimens.corn_stem_1200x } },
        { id: "pigeon_feather", name: "Pigeon Feather", images: { "100x": IMAGES.specimens.pigeon_feather_100x, "400x": IMAGES.specimens.pigeon_feather_400x, "1200x": IMAGES.specimens.pigeon_feather_1200x } },
        { id: "canary_feather", name: "Canary Feather", images: { "100x": IMAGES.specimens.canary_feather_100x, "400x": IMAGES.specimens.canary_feather_400x, "1200x": IMAGES.specimens.canary_feather_1200x } },
        { id: "cat_hair", name: "Cat Hair", images: { "100x": IMAGES.specimens.cat_hair_100x, "400x": IMAGES.specimens.cat_hair_400x, "1200x": IMAGES.specimens.cat_hair_1200x } },
        { id: "plankton_egg", name: "Plankton Egg", images: { "100x": IMAGES.specimens.plankton_egg_100x, "400x": IMAGES.specimens.plankton_egg_400x, "1200x": IMAGES.specimens.plankton_egg_1200x } },
        { id: "dandelion_fuzz", name: "Dandelion Fuzz", images: { "100x": IMAGES.specimens.dandelion_fuzz_100x, "400x": IMAGES.specimens.dandelion_fuzz_400x, "1200x": IMAGES.specimens.dandelion_fuzz_1200x } },
        { id: "goldfish_scale", name: "Goldfish Scale", images: { "100x": IMAGES.specimens.goldfish_scale_100x, "400x": IMAGES.specimens.goldfish_scale_400x, "1200x": IMAGES.specimens.goldfish_scale_1200x } }
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
        text: "Text",
        clear: "Clear",
        save: "Save Journal",
        close: "Close",
        undo: "Undo",
        colorSize: "Color & Size",
      },
      stamps: {
        label: "Stamps",
        items: {
          nucleus: "Nucleus",
          cellWall: "Cell Wall",
          pointer: "Pointer",
          question: "What is this?",
          star: "Discovery",
        }
      },
      viewToggle: "Toggle View (Circle/Full)",
      labReport: {
        title: "Kidrise Science Lab Report",
        date: "Date",
        specimen: "Specimen",
        magnification: "Magnification",
        scientist: "Scientist",
      },
      saveSuccess: "Journal Saved!",
    },
    login: {
      title: "Product Activation",
      desc: "Please enter the activation code found on the package or manual.",
      placeholder: "Enter Code",
      submit: "Start Exploring",
      error: "Invalid code, please check the code on the box."
    },
    learn: {
      title: "Microscope Encyclopedia",
      didYouKnow: "Did You Know?",
      menu: {
        intro: "Introduction",
        types: "Types",
        magnification: "Magnification",
        parts: "Parts",
        accessories: "Accessories",
        preparation: "Slide Prep",
        guide: "How to Observe",
        diy: "DIY Experiments",
        applications: "Applications",
        maintenance: "Maintenance"
      },
      intro: {
        title: "Introduction",
        content: [
           "The most famous and common microscope is the Transmission Light Microscope, which uses light passing through a thin object for observation. Light generated at the bottom is guided upwards to the stage and projected onto the object. This allows you to study cross-sections of leaves or microorganisms."
        ]
      },
      types: {
         title: "Types of Microscopes",
         items: [
            { name: "Transmitted Light", desc: "Uses light passing through thin objects. Perfect for observing leaf cross-sections or microbes." },
            { name: "Reflected Light", desc: "For observing opaque solids like coins or crystals. The light source is mounted obliquely above the stage, shining from above." },
            { name: "Mechanical Stage", desc: "High-quality microscopes often have a mechanical stage. This allows you to clamp the slide and move it with millimeter precision in two directions using knurled knobs." }
         ]
      },
      magnification: {
         title: "How High is the Magnification?",
         content: [
             "Both the objective and eyepiece have magnification powers. Multiply them together to get the total magnification. For example, a 10x eyepiece and 20x objective give a total of 200x.",
             "Super-precision microscopes can reach 1500x or even 2000x. However, for general observation, 400x to 600x is enough to reveal the exciting micro world."
         ]
      },
      parts: {
        title: "Microscope Structure",
        items: [
          { 
            name: "Eyepiece", 
            desc: "The lens closest to the eye. Many microscopes have one, but binocular ones have two for viewing with both eyes.", 
            image: IMAGES.parts.eyepiece,
            funFact: "If dirty, never wipe with hands; use special lens paper!"
          },
          { 
            name: "Body Tube", 
            desc: "Holds the lenses and prevents external light interference.", 
            image: IMAGES.parts.tube,
            funFact: "Connects the eyepiece to the objective lenses."
          },
          { 
            name: "Arm", 
            desc: "Connects the tube to the base. Hold this part when carrying the microscope.", 
            image: IMAGES.parts.arm,
            funFact: "This is the 'backbone' of the microscope."
          },
          { 
            name: "Objective Lens", 
            desc: "The lens group near the object. Usually has multiple magnifications to switch between.", 
            image: IMAGES.parts.objective,
            funFact: "Longer lenses have higher power but sit closer to the specimen!"
          },
          { 
             name: "Nosepiece",
             desc: "Rotate this to switch different objective lenses into the working position.",
             image: IMAGES.parts.nosepiece,
             funFact: "You'll hear a 'click' when it's locked in place."
          },
          { 
            name: "Stage", 
            desc: "Used to place objects or slides. Has a hole in the center for light to pass through.", 
            image: IMAGES.parts.stage,
            funFact: "Some advanced stages can move the specimen precisely."
          },
          { 
             name: "Stage Clips", 
             desc: "Holds the slide in place so it doesn't move.", 
             image: IMAGES.parts.stage_clips,
             funFact: "Make sure they are tight, or your specimen might run away!"
          },
          { 
             name: "Filter Disc", 
             desc: "Located under the stage. Rotate to change hole size or color filters to adjust contrast.", 
             image: IMAGES.parts.filter, 
             funFact: "Use this when the image is too bright or too dim."
          },
          { 
            name: "Focus Knobs", 
            desc: "Moves the stage up and down to adjust clarity.", 
            image: IMAGES.parts.knob,
            funFact: "Use the coarse knob to find the target, then fine knob to sharpen."
          },
          { 
            name: "Light Source", 
            desc: "Generates a beam of light that projects onto the object in transmission mode.", 
            image: IMAGES.parts.light,
            funFact: "For very pale specimens, color filters increase contrast."
          },
          { 
             name: "Illumination Switch", 
             desc: "Turns the light source on and off.", 
             image: IMAGES.parts.illumination_switch, 
             funFact: "Remember to turn it off to save batteries!"
          },
          { 
             name: "Base", 
             desc: "Supports the entire microscope and houses the battery compartment.", 
             image: IMAGES.parts.base, 
             funFact: "This is the 'foot' of the microscope. Keep it flat!"
          },
          {
             name: "Microscope",
             desc: "The amazing tool we are learning about!",
             image: IMAGES.parts.microscope,
             funFact: "It opens up the micro world for you to see!"
          }
        ]
      },
      accessories: {
        title: "Common Accessories",
        items: [
            { name: "Slides & Cover Slips", desc: "Slides hold the object; Cover slips are very thin and cover the object to prevent drying." },
            { name: "Tweezers", desc: "For grabbing tiny objects better." },
            { name: "Dropper", desc: "For dripping liquids or stains onto the slide." },
            { name: "Petri Dish", desc: "Helps find suitable specimens or for viewing directly under reflected light." },
            { name: "Dissecting Needle", desc: "For extracting tiny objects or adjusting samples on the slide." },
            { name: "Scissors & Blades", desc: "For fine cutting of samples. Scalpels and razor blades are very sharp, use with care!" }
        ]
      },
      preparation: {
        title: "Sample Preparation",
        intro: "Correct sample preparation is crucial for transmitted light microscopy.",
        steps: [
            { title: "1. Solids & Liquids", desc: "Place solids (like insect legs) with tweezers; drip liquids (like pond water) with a dropper." },
            { title: "2. Storage", desc: "Store liquids in sealed jars, dry samples in envelopes, and insects in boxes." },
            { title: "3. Staining", desc: "Use staining solutions to make parts of the specimen clearer." },
            { title: "4. Cleaning", desc: "Use filter paper to soak up excess liquid from the slide." },
            { title: "5. Cutting", desc: "Use small scissors or a scalpel to cut samples. Be careful!" }
        ]
      },
      guide: {
        title: "How to Observe",
        intro: "Microscope operation is simple, but ensure the objective lens never touches the slide.",
        steps: [
            { title: "1. First Look", desc: "Place a hair or feather in a water drop on a slide, cover with a slip. Dry excess water." },
            { title: "2. Set Objective", desc: "Select the lowest power lens, align with the light hole (click sound). Adjust lens to ~1cm above stage." },
            { title: "3. Place Specimen", desc: "Fix slide on stage, center specimen. Watch from SIDE, lower lens to 1-2mm above slide. Must not touch!" },
            { title: "4. Focus", desc: "Look through eyepiece, slowly INCREASE distance until focused. Move slide to find interesting parts (image is inverted)." },
            { title: "5. Zoom In", desc: "To see more detail, switch to a higher power lens. Always check from the side to avoid collision." }
        ],
        tips: [
            "Floating Dots: Black dots in your vision are just shadows in your eye fluid, don't worry.",
            "Inverted Image: The image you see is flipped left-right and up-down.",
            "Side Check: Crucial when switching lenses to prevent breaking slides."
        ]
      },
      diy: {
        title: "DIY Experiments",
        intro: "'You only saw it if you drew it!' Keep an observation journal.",
        projects: [
            {
                title: "Pond Life (Paramecium)",
                desc: "Find these single-celled creatures in pond water.",
                materials: ["Pond water", "Cotton fibers", "Slide"],
                steps: ["Put a drop of pond water on a slide.", "Add cotton fibers to trap them.", "Cover and observe."],
                note: "Look for food vacuoles and cilia (moving hairs)."
            },
            {
                title: "Green Algae (Spirogyra)",
                desc: " filamentous green algae found in spring.",
                materials: ["Algae", "Tweezers", "Needle"],
                steps: ["Take a small piece of algae.", "Place in water drop on slide.", "Spread with needle and cover."],
                note: "Chlorophyll spirals help photosynthesis."
            },
            {
                title: "Onion Cells",
                desc: "Classic experiment to see plant cells.",
                materials: ["Onion", "Scalpel", "Iodine/Ink"],
                steps: ["Peel a thin transparent layer from onion.", "Place flat in water.", "Cover.", "Add stain to edge and draw through with filter paper."],
                note: "Staining reveals cell walls and nuclei clearly."
            },
            {
                title: "Starch Detective",
                desc: "Potato, banana, and corn starch look different!",
                materials: ["Potato/Banana", "Scalpel", "Iodine"],
                steps: ["Scrape some juice/pulp.", "Smear on slide.", "Add iodine (turns starch blue-black)."],
                note: "Compare shapes of starch grains from different plants."
            },
            {
                title: "Crystal Magic",
                desc: "Regrow crystals of salt, sugar, or Vitamin C.",
                materials: ["Salt/Sugar", "Warm water", "Slide"],
                steps: ["Dissolve salt in warm water.", "Place a drop on slide (no cover).", "Let dry overnight."],
                note: "You'll see perfect cubic crystals form."
            },
            {
                title: "Honey Pollen Analysis",
                desc: "Discover which flowers the bees visited.",
                materials: ["Honey", "Warm water", "Jar"],
                steps: ["Mix honey and water (1:2).", "Let sit for 2 days.", "Pipette sediment from bottom to observe."]
            },
            {
                title: "Fibers & Forensics",
                desc: "Analyze dust and clothes like a detective.",
                materials: ["Tape", "Hair", "Fabric fibers"],
                steps: ["Use tape to pick up dust.", "Or place hair on slide.", "Compare cross-sections."],
                note: "Asian hair is rounder; European hair is more oval."
            }
        ]
      },
      applications: {
        title: "Real World Applications",
        intro: "Microscopes are essential tools in science and technology.",
        fields: [
            { title: "Medicine", desc: "Detecting bacteria/viruses in blood or urine to diagnose diseases." },
            { title: "Food Safety", desc: "Checking for parasites (like Trichinella in pork) or bacteria in restaurants." },
            { title: "Environment", desc: "Judging water pollution by the types of microorganisms present." },
            { title: "Geology", desc: "Using polarized light to study rock sections and Earth's history." },
            { title: "Archaeology", desc: "Analyzing pollen in soil or Mummy stomach contents to understand the past." },
            { title: "Paleontology", desc: "Cleaning fossils carefully and finding ancient cells in dinosaur bones." },
            { title: "Technology", desc: "Developing new materials, checking chips, or investigating metal fatigue." }
        ]
      },
      maintenance: {
        title: "Microscope Maintenance",
        content: [
            "A microscope is a sensitive optical instrument. When not in use, keep it in its box or covered with a plastic bag to prevent dust.",
            "Even if lenses are fixed, dust happens. Use a soft, clean microfiber cloth to wipe the eyepiece clean."
        ]
      }
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
      title: "Scientific Challenge",
      start: "Start Quiz",
      loading: "Preparing Questions...",
      score: "Score",
      next: "Next Question",
      retry: "Play Again",
      perfect: "Amazing! Future Nobel Prize Winner!",
      good: "Great job! You know your microscope!",
      tryAgain: "Keep going! Review the guide and try again!",
      resultTitle: "Scorecard",
      enterName: "Enter Your Name:",
      download: "Download Certificate",
      certificate: "Master Microscopist Certificate",
      certifiedBy: "Certified by Kidrise Science",
      date: "Date",
      rules: {
        title: "Challenge Rules",
        text: [
          "In this quiz, you will answer 20 questions about microscopes and science.",
          "If you score 60% or higher (12+ correct),",
          "you will earn a 'Master Microscopist Certificate' from Kidrise!"
        ],
        startBtn: "Start Challenge"
      }
    },
    footer: {
      copyright: "© 2026 Kidrise STEM Hong Kong Educational Toy",
      techSupport: "Technical Support by Kidrise"
    },
    ar: {
      title: "AR Virtual Lab",
      description: "Bring giant microbes or astronauts into your room!",
      instruction: "On mobile, tap the AR button in the corner to place the model in your real world!",
      models: {
        astro: "Astronaut",
        microscope: "Virtual Microscope"
      },
      upload: "Upload Model (.glb)"
    },
    chat: {
        placeholder: "Send a message...",
        thinking: "Thinking...",
      }
  },
};

// --- Quiz Questions Data ---
export const QUIZ_QUESTIONS = [
  {
    question: { zh: "顯微鏡的哪個部分是你眼睛看的地方？", en: "Which part of the microscope do you look through?" },
    options: { zh: ["目鏡", "物鏡", "載物台", "反光鏡"], en: ["Eyepiece", "Objective Lens", "Stage", "Mirror"] },
    correctAnswerIndex: 0,
    explanation: { zh: "目鏡是位於顯微鏡頂端的鏡頭，你的眼睛通過它來觀察。", en: "The eyepiece is the lens at the top that you look through." }
  },
  {
    question: { zh: "如果你想看更清楚，應該調節什麼？", en: "What should you adjust to make the image clearer?" },
    options: { zh: ["反光鏡", "準焦螺旋", "底座", "鏡臂"], en: ["Mirror", "Focus Knob", "Base", "Arm"] },
    correctAnswerIndex: 1,
    explanation: { zh: "準焦螺旋用來調整焦距，讓影像從模糊變清晰。", en: "Focus knobs move the stage to bring the image into sharp focus." }
  },
  {
    question: { zh: "我們把標本放在什麼上面？", en: "What do we place the specimen on?" },
    options: { zh: ["載玻片", "蓋玻片", "培養皿", "試管"], en: ["Slide", "Cover slip", "Petri dish", "Test tube"] },
    correctAnswerIndex: 0,
    explanation: { zh: "標本通常放置在長方形的玻璃載玻片上。", en: "Specimens are placed on a glass slide to be viewed." }
  },
  {
    question: { zh: "顯微鏡下的字母 'e' 會變成什麼樣子？", en: "What happens to the letter 'e' under a microscope?" },
    options: { zh: ["變成 'a'", "上下顛倒，左右相反", "變小了", "沒有變化"], en: ["Becomes 'a'", "Upside down and reversed", "Smaller", "No change"] },
    correctAnswerIndex: 1,
    explanation: { zh: "顯微鏡的光學原理會讓影像上下顛倒、左右相反，看起來像 'ə'。", en: "The microscope lens inverts the image, making it appear upside down and backwards." }
  },
  {
    question: { zh: "哪一種顯微鏡可以看到細胞內部的細節？", en: "Which microscope lets you see inside a cell?" },
    options: { zh: ["放大鏡", "透射光顯微鏡", "望遠鏡", "潛望鏡"], en: ["Magnifying Glass", "Transmission Light Microscope", "Telescope", "Periscope"] },
    correctAnswerIndex: 1,
    explanation: { zh: "透射光顯微鏡讓光穿過薄薄的標本，所以能看到內部構造。", en: "Light passes through the thin specimen, revealing internal structures." }
  },
  {
    question: { zh: "洋蔥表皮細胞看起來像什麼？", en: "What do onion skin cells look like?" },
    options: { zh: ["圓形的小球", "整齊排列的磚塊", "長長的麵條", "不規則的碎屑"], en: ["Round balls", "Bricks in a wall", "Long noodles", "Random dust"] },
    correctAnswerIndex: 1,
    explanation: { zh: "植物細胞有細胞壁，所以會像磚牆一樣整齊排列。", en: "Plant cells have cell walls, making them look like organized bricks." }
  },
  {
    question: { zh: "為什麼看標本時要先用『低倍鏡』？", en: "Why start with the 'Lowest Power' lens?" },
    options: { zh: ["因為它最便宜", "比較容易找到目標", "看得最清楚", "不怕弄壞"], en: ["It's cheapest", "Easier to find the target", "Clearer image", "Won't break"] },
    correctAnswerIndex: 1,
    explanation: { zh: "低倍鏡視野比較廣，像是在地圖上先找到大城市，再慢慢放大看街道。", en: "Low power gives a wider view, making it easier to find your specimen first." }
  },
  {
    question: { zh: "如果標本太厚，光線透不過去，會看到什麼？", en: "If the specimen is too thick, what will you see?" },
    options: { zh: ["七彩的光芒", "漆黑一片", "非常清楚", "看到骨頭"], en: ["Rainbows", "Darkness", "Very clear", "Bones"] },
    correctAnswerIndex: 1,
    explanation: { zh: "透射顯微鏡需要光穿過標本，如果不透光，就只能看到黑影。", en: "Light needs to pass through! If it's too thick, it blocks the light." }
  },
  {
    question: { zh: "『蓋玻片』的主要功能是什麼？", en: "What is the main job of a 'Cover Slip'?" },
    options: { zh: ["壓平標本並保護鏡頭", "把標本染色", "放大影像", "讓標本變輕"], en: ["Flatten specimen & protect lens", "Color the specimen", "Magnify image", "Make it lighter"] },
    correctAnswerIndex: 0,
    explanation: { zh: "蓋玻片可以讓標本平整，也能防止物鏡碰到水或標本。", en: "It creates a flat surface for viewing and keeps the lens clean." }
  },
  {
    question: { zh: "蜜蜂的腳上為什麼有很多毛？", en: "Why do honeybee legs have hairs?" },
    options: { zh: ["保暖", "收集花粉", "好看", "嚇跑敵人"], en: ["Stay warm", "Collect pollen", "Look cool", "Scare enemies"] },
    correctAnswerIndex: 1,
    explanation: { zh: "那些毛像小籃子一樣，可以黏住並收集花粉帶回家。", en: "The hairs act like baskets to trap and carry pollen." }
  },
  {
    question: { zh: "顯微鏡下的『鹽巴』是什麼形狀？", en: "What shape is salt under a microscope?" },
    options: { zh: ["圓形", "正方形/立方體", "三角形", "星形"], en: ["Circle", "Square/Cube", "Triangle", "Star"] },
    correctAnswerIndex: 1,
    explanation: { zh: "食鹽的晶體結構是規則的立方體。", en: "Salt crystals form perfect little cubes." }
  },
  {
    question: { zh: "蝴蝶翅膀上的顏色是怎麼來的？", en: "Where does butterfly wing color come from?" },
    options: { zh: ["顏料", "無數的小鱗片", "血液", "陽光反射"], en: ["Paint", "Tiny scales", "Blood", "Sun reflection"] },
    correctAnswerIndex: 1,
    explanation: { zh: "蝴蝶翅膀覆蓋著成千上萬的小鱗片，它們反射光線產生顏色。", en: "Wings are covered in thousands of tiny scales that reflect light." }
  },
  {
    question: { zh: "如果不小心把水滴到顯微鏡上，該怎麼辦？", en: "What if you spill water on the microscope?" },
    options: { zh: ["假裝沒看到", "用火烤乾", "立即擦乾", "放到太陽下曬"], en: ["Ignore it", "Burn it dry", "Wipe immediately", "Sunbathe it"] },
    correctAnswerIndex: 2,
    explanation: { zh: "水會生鏽或讓鏡頭發霉，要馬上用乾布擦乾淨。", en: "Water causes rust or mold! Wipe it dry right away." }
  },
  {
    question: { zh: "我們用什麼來調節光線的亮度？", en: "What do we use to adjust light brightness?" },
    options: { zh: ["濾光片/光圈", "載物台", "目鏡", "底座"], en: ["Filter/Diaphragm", "Stage", "Eyepiece", "Base"] },
    correctAnswerIndex: 0,
    explanation: { zh: "載物台下的濾光片或光圈可以控制通光量。", en: "The filter disc or diaphragm under the stage controls light intensity." }
  },
  {
    question: { zh: "植物葉片上的『氣孔』像什麼？", en: "What do plant 'Stomata' look like?" },
    options: { zh: ["閉上的眼睛", "小嘴巴", "甜甜圈", "以上皆是"], en: ["Closed eyes", "Little mouths", "Donuts", "All of the above"] },
    correctAnswerIndex: 3,
    explanation: { zh: "氣孔是兩半月形細胞組成的，看起來像嘴巴或眼睛。", en: "They look like tiny mouths that open and close to breathe." }
  },
  {
    question: { zh: "『染色』可以幫助我們看到什麼？", en: "What does 'Staining' help us see?" },
    options: { zh: ["細胞核", "細菌", "澱粉顆粒", "以上皆是"], en: ["Nucleus", "Bacteria", "Starch", "All of the above"] },
    correctAnswerIndex: 3,
    explanation: { zh: "染色劑會附著在特定的構造上，讓透明的標本變得清楚。", en: "Dyes stick to specific parts, making transparent things visible." }
  },
  {
    question: { zh: "世界上第一個看到細菌的人是誰？", en: "Who was the first person to see bacteria?" },
    options: { zh: ["愛因斯坦", "雷文霍克", "達爾文", "牛頓"], en: ["Einstein", "Leeuwenhoek", "Darwin", "Newton"] },
    correctAnswerIndex: 1,
    explanation: { zh: "雷文霍克磨製了高品質的鏡片，第一次發現了微觀生物。", en: "Antonie van Leeuwenhoek made powerful lenses and discovered 'animalcules'!" }
  },
  {
    question: { zh: "拿顯微鏡的正確姿勢是？", en: "What is the correct way to carry a microscope?" },
    options: { zh: ["單手抓鏡筒", "雙手捧著底座", "一手握鏡臂，一手托底座", "拎著電線"], en: ["Grab the tube", "Hold the base", "One hand on Arm, one on Base", "Carry by cord"] },
    correctAnswerIndex: 2,
    explanation: { zh: "這樣最穩固，不會摔壞精密的儀器。", en: "This is the safest grip to prevent dropping it." }
  },
  {
    question: { zh: "如果鏡頭髒了，要用什麼擦？", en: "What do you use to clean a dirty lens?" },
    options: { zh: ["衛生紙", "衣角", "拭鏡紙", "手指"], en: ["Tissue", "Shirt", "Lens Paper", "Finger"] },
    correctAnswerIndex: 2,
    explanation: { zh: "一般的紙或布會刮傷鏡頭，只能用專用的拭鏡紙。", en: "Regular paper scratches glass! Always use special lens paper." }
  },
  {
    question: { zh: "10倍目鏡 x 40倍物鏡 = 多少倍？", en: "10x Eyepiece * 40x Objective = ?" },
    options: { zh: ["50倍", "400倍", "140倍", "4000倍"], en: ["50x", "400x", "140x", "4000x"] },
    correctAnswerIndex: 1,
    explanation: { zh: "放大倍率是相乘的：10 x 40 = 400。", en: "Magnification multiplies: 10 times 40 equals 400." }
  }
];


