require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);
const mongoose = require("mongoose");
const User = require("./models/User");
const SiteConfig = require("./models/SiteConfig");
const Banner = require("./models/Banner");
const Product = require("./models/Product");
const Section = require("./models/Section");

// ─── All products from the landing page ─────────────────────────────────────
const PRODUCTS = [
  // ── Mountain bikes ──────────────────────────────────────────────────────
  {
    name: "دراجة جبلية مقاس 26 ترينكس 21 سرعة + 5 هدايا",
    price: 1199,
    oldPrice: 1500,
    category: "mountain",
    badge: "الأكثر مبيعاً",
    isFeatured: true,
    isActive: true,
    order: 1,
    description:
      "دراجة جبلية TRINX مقاس 26، مصممة لعشاق المغامرات والطرق الوعرة. تجي بـ 21 سرعة مع هيكل قوي من الألمنيوم وفرامل ديسك تعطيك تحكم وثبات عالي. مناسبة للأعمار من 15 سنة وفوق وتتحمل وزن حتى 130 كيلو.",
    tags: [
      "21 سرعة",
      "SHIMANO",
      "فرامل ديسك",
      "هيكل ألمنيوم",
      "تتحمل حتى 130 كجم",
      "ضمان 5 سنوات",
      "مناسبة للجبال والطرق الوعرة",
    ],
    specs: [
      { label: "المقاس", value: "26 بوصة" },
      { label: "عدد السرعات", value: "21 سرعة" },
      { label: "الفرامل", value: "ديسك" },
      { label: "الهيكل", value: "ألمنيوم خفيف وقوي" },
      { label: "الغيارات", value: "SHIMANO" },
      { label: "التعليق", value: "مساعد أمامي مع تحكم يدوي" },
      { label: "اللون", value: "متعدد الألوان" },
      { label: "الوزن التقريبي", value: "13.5 كيلو" },
      { label: "التحمل", value: "حتى 130 كجم" },
      { label: "الطول المناسب", value: "من 145 سم وفوق" },
      { label: "الضمان", value: "5 سنوات على الهيكل من المصنع" },
    ],
    features: [
      "تصميم عصري وقوي",
      "سهلة في صيانة الكفرات الأمامية والخلفية (تحكمهم يدويًا)",
      "مناسبة للجنسين وللاستخدام في الجبال أو الطرق الوعرة",
      "مصممة في إيطاليا ومصنوعة في الصين",
      "تجي بحجم Large ومناسبة للكبار",
    ],
    whatsappMessage: "أريد الطلب: دراجة جبلية مقاس 26 ترينكس 21 سرعة",
    accentColor: "#C62839",
  },
  {
    name: "دراجة هوائية جبلية كفر عريض مقاس 26 للأوزان المرتفعة + 5 هدايا",
    price: 999,
    oldPrice: 1300,
    category: "mountain",
    badge: "عرض خاص",
    isFeatured: false,
    isActive: true,
    order: 2,
    description:
      "دراجة جبلية كفر عريض مقاس 26 – للطرق الوعرة والأوزان الثقيلة! مصممة تعيش معك وتتحمل، مهما كانت التضاريس أو الظروف!",
    tags: ["كفر عريض", "هيكل قوي", "مناسبة للرمال", "فرامل ديسك", "21 سرعة"],
    features: [
      "كفرات عريضة تعطيك ثبات عالي وتوازن حتى مع الوزن الثقيل",
      "تنفعك بالجبال، الرمل، الطرق الصعبة، وحتى بالبر",
      "مقاس 26 مثالي للي يحب التحدي والتحمل",
      "تتحمل كل الظروف الجوية والطبيعية، تمشي وين ما تبي",
    ],
    whatsappMessage: "أريد الطلب: دراجة هوائية جبلية كفر عريض مقاس 26",
    accentColor: "#C62839",
  },
  {
    name: "دراجة نسائية مقاس 24 ترينكس + 5 هدايا",
    price: 949,
    oldPrice: 1333,
    category: "mountain",
    badge: "الأكثر طلباً",
    isFeatured: false,
    isActive: true,
    order: 3,
    description:
      "دراجة TRINX مقاس 24 مصممة لعشاق المغامرات والرياضة من السيدات. تجي بسرعة واحدة مع هيكل قوي متميز وفرامل تعطيك تحكم وثبات عالي.",
    tags: [
      "مقاس 24",
      "تصميم نسائي",
      "ألوان متعددة",
      "خفيفة الوزن",
      "فرامل عالية",
    ],
    specs: [
      { label: "المقاس", value: "46 بوصة" },
      { label: "عدد السرعات", value: "سرعة واحدة" },
      { label: "اللون", value: "متعدد الألوان" },
      { label: "الوزن التقريبي", value: "12 كيلو" },
      { label: "التحمل", value: "حتى 120 كجم" },
      { label: "الطول المناسب", value: "لغاية 180 سم" },
    ],
    features: ["تصميم عصري وقوي", "مناسبة للسيدات من مختلف الأعمار"],
    whatsappMessage: "أريد الطلب: دراجة نسائية مقاس 24 ترينكس",
    accentColor: "#C62839",
  },
  {
    name: "دراجة رياضية قابلة للطي مقاس 26 + 5 هدايا",
    price: 999,
    oldPrice: 1300,
    category: "mountain",
    badge: "عرض محدود",
    isFeatured: false,
    isActive: true,
    order: 4,
    description: "دراجة مقاس 26 للخط الطويل والطلعات الثقيلة!",
    tags: [
      "21 سرعة شيمانو",
      "فرامل ديسك",
      "مساعد أمامي",
      "بدالات ألمنيوم",
      "أوزان حتى 120 كجم",
    ],
    specs: [
      { label: "المقاس", value: "26 بوصة" },
      { label: "عدد السرعات", value: "21 سرعة (7×3)" },
      { label: "ناقل السرعة", value: "شيمانو أصلي" },
      { label: "الفرامل", value: "ديسك قدام وورا" },
      { label: "المساعد", value: "أمامي" },
      { label: "البدالات والجنوط", value: "ألمنيوم خفيفة ومتينة" },
      { label: "الكرسي", value: "فخم ومريح" },
      { label: "الألوان", value: "أحمر / أسود / فضي / أزرق / أصفر" },
      { label: "التحمل", value: "حتى 120 كجم" },
      { label: "الطول المناسب", value: "لغاية 180 سم" },
    ],
    features: [
      "21 سرعة – قير شيمانو أصلي يبدل بسلاسة",
      "مساعد قدامي يعطيك راحة وثبات بالطريق",
      "فرامل ديسك قدام وورا توقف وأنت مرتاح",
      "بدالات ألمنيوم + جنوط ألمنيوم خفيفة ومتينة",
      "كرسي فخم ومريح حتى للطلعات الطويلة",
    ],
    whatsappMessage: "أريد الطلب: دراجة رياضية قابلة للطي مقاس 26",
    accentColor: "#C62839",
  },
  // ── Road bikes ───────────────────────────────────────────────────────────
  {
    name: "دراجة تيمبو الرياضية من ترينكس 21 سرعة + 5 هدايا",
    price: 1330,
    oldPrice: 1490,
    category: "road",
    badge: "عرض خاص",
    isFeatured: true,
    isActive: true,
    order: 1,
    description:
      "ترينكس تيمبو تناديك تعيش المغامرة، بهيكل سباق خفيف وقوي 700C، ونظام تروس شيمانو 21 سرعة، وكفرات CST 700c. مصممة عشان تعطيك أداء عالي مهما كانت الأجواء.",
    tags: [
      "هيكل ألمنيوم 6061",
      "21 سرعة شيمانو",
      "كفرات CST 700c",
      "فرامل قرص ميكانيكي",
      "مناسبة للجنسين",
    ],
    specs: [
      { label: "الإطار", value: "سبيكة ألمنيوم 6061" },
      { label: "الشوكة الأمامية", value: "ستيل قوي (Hi-Ten)" },
      { label: "المقود والجذع", value: "سبيكة ترينكس خفيفة" },
      { label: "العجلات", value: "جنوط مزدوجة 700C" },
      { label: "الكفرات", value: "CST 700c × 25c" },
      { label: "السلسلة", value: "KMC 7S" },
      { label: "عدد السرعات", value: "21 سرعة" },
      { label: "التروس الأمامي", value: "Shimano TZ510" },
      { label: "التروس الخلفي", value: "Shimano TZ500" },
      { label: "الكاسيت", value: "7 سرعات (28T-14)" },
      { label: "ناقل الحركة", value: "Shimano A050" },
      { label: "الفرامل", value: "قرص ميكانيكي ألمنيوم" },
      { label: "أذرع الفرامل", value: "Shimano" },
    ],
    features: [
      "شكل رياضي حديث مناسب للكبار من الجنسين",
      "حجم عجلات 700C لسرعة وسلاسة على الطريق",
      "تجيء معها جرس وقفل افتراضيًا",
      "مصنع: TRINX – جودة عالية وصناعة دقيقة",
    ],
    whatsappMessage: "أريد الطلب: دراجة تيمبو الرياضية من ترينكس 21 سرعة",
    accentColor: "#3B82F6",
  },
  {
    name: "دراجة رياضية قابلة للطي مقاس 26 طريق + 5 هدايا",
    price: 999,
    oldPrice: 1300,
    category: "road",
    badge: "عرض محدود",
    isFeatured: false,
    isActive: true,
    order: 2,
    description: "دراجة مقاس 26 للخط الطويل والطلعات الثقيلة!",
    tags: [
      "21 سرعة شيمانو",
      "فرامل ديسك",
      "مساعد أمامي",
      "بدالات ألمنيوم",
      "تحمل 120 كجم",
    ],
    specs: [
      { label: "المقاس", value: "26 بوصة" },
      { label: "عدد السرعات", value: "21 سرعة (7×3)" },
      { label: "ناقل السرعة", value: "شيمانو أصلي" },
      { label: "الفرامل", value: "ديسك قدام وورا" },
      { label: "المساعد", value: "أمامي" },
      { label: "البدالات والجنوط", value: "ألمنيوم خفيفة ومتينة" },
      { label: "الكرسي", value: "فخم ومريح" },
      { label: "الألوان", value: "أحمر / أسود / فضي / أزرق / أصفر" },
      { label: "التحمل", value: "حتى 120 كجم" },
      { label: "الطول المناسب", value: "لغاية 180 سم" },
    ],
    features: [
      "21 سرعة – قير شيمانو أصلي يبدل بسلاسة",
      "مساعد قدامي يعطيك راحة وثبات بالطريق",
      "فرامل ديسك قدام وورا توقف وأنت مرتاح",
      "بدالات ألمنيوم + جنوط ألمنيوم خفيفة ومتينة",
      "كرسي فخم ومريح حتى للطلعات الطويلة",
    ],
    whatsappMessage: "أريد الطلب: دراجة رياضية قابلة للطي مقاس 26 طريق",
    accentColor: "#3B82F6",
  },
  // ── Hybrid bikes ─────────────────────────────────────────────────────────
  {
    name: "دراجة هجين ترينكس مقاس 27 هيكل ألمنيوم 21 سرعة + 5 هدايا",
    price: 1349,
    oldPrice: 1929,
    category: "hybrid",
    badge: "قيمة ممتازة",
    isFeatured: true,
    isActive: true,
    order: 1,
    description:
      "دراجة هجينة سباق من ماركة TRINX بمقاس 520، مصنوعة من الألمنيوم خفيفة الوزن، ومزودة بـ 21 سرعة من SHIMANO. تعطيك تجربة قيادة سلسة واحترافية.",
    tags: [
      "هيكل ألمنيوم",
      "21 سرعة SHIMANO",
      "مقاس 700C*38",
      "تحمل 120 كجم",
      "مناسبة للجنسين",
    ],
    specs: [
      { label: "نوع الدراجة", value: "هجينة" },
      { label: "البراند", value: "TRINX" },
      { label: "مادة الإطار", value: "ألمنيوم" },
      { label: "عدد السرعات", value: "21 سرعة" },
      { label: "الكفرات", value: "700C×38" },
      { label: "نظام التعليق", value: "أمامي" },
      { label: "نوع الفرامل", value: "Coaster" },
      { label: "اللون", value: "فضي × برتقالي" },
      { label: "التحمل", value: "حتى 120 كجم" },
      { label: "الطول المناسب", value: "175 سم فأكثر" },
      { label: "وزن الدراجة", value: "13.5 كيلو" },
    ],
    features: [
      "قير 21 سرعة شيمانو – غيارات احترافية وسهلة الاستخدام",
      "تصميم عصري وقوي مناسب للكبار من الجنسين",
      "سهلة إخراج الكفر الأمامي والخلفي يدويًا",
      "مناسبة للمشاوير اليومية والطلعات الترفيهية",
      "تجي بفرمة تركيب كاملة",
    ],
    whatsappMessage: "أريد الطلب: دراجة هجين ترينكس مقاس 27",
    accentColor: "#10B981",
  },
  {
    name: "دراجة رياضية قابلة للطي مقاس 26 هجين + 5 هدايا",
    price: 999,
    oldPrice: 1300,
    category: "hybrid",
    badge: "عرض محدود",
    isFeatured: false,
    isActive: true,
    order: 2,
    description:
      "دراجة مقاس 26 للخط الطويل والطلعات الثقيلة! مناسبة للاستخدام اليومي والطرق المختلطة.",
    tags: [
      "21 سرعة شيمانو",
      "فرامل ديسك",
      "مساعد أمامي",
      "بدالات ألمنيوم",
      "تحمل 120 كجم",
    ],
    specs: [
      { label: "المقاس", value: "26 بوصة" },
      { label: "عدد السرعات", value: "21 سرعة (7×3)" },
      { label: "ناقل السرعة", value: "شيمانو أصلي" },
      { label: "الفرامل", value: "ديسك قدام وورا" },
      { label: "المساعد", value: "أمامي" },
      { label: "البدالات والجنوط", value: "ألمنيوم خفيفة ومتينة" },
      { label: "الكرسي", value: "فخم ومريح" },
      { label: "الألوان", value: "أحمر / أسود / فضي / أزرق / أصفر" },
      { label: "التحمل", value: "حتى 120 كجم" },
      { label: "الطول المناسب", value: "لغاية 180 سم" },
    ],
    features: [
      "21 سرعة – قير شيمانو أصلي يبدل بسلاسة",
      "مساعد قدامي يعطيك راحة وثبات بالطريق",
      "فرامل ديسك قدام وورا توقف وأنت مرتاح",
      "بدالات ألمنيوم + جنوط ألمنيوم خفيفة ومتينة",
      "كرسي فخم ومريح حتى للطلعات الطويلة",
    ],
    whatsappMessage: "أريد الطلب: دراجة رياضية قابلة للطي مقاس 26 هجين",
    accentColor: "#10B981",
  },
];

// ─── Sections data (EXACT content from landing page components) ──────────────
const SECTIONS = [
  {
    key: "warranty",
    title: "ضمان ذهبي",
    subtitle: "نضمن لك جودة كل دراجة قبل ما توصلك",
    isActive: true,
    content: {
      badgeText: "ضمانك معنا مكفول",
      periodTitle: "7 أيام",
      periodSubtitle: "ضمان كامل",
      periodDescription: "من تاريخ الاستلام",
      warrantyIncludes: [
        "إصلاح الأعطال البسيطة الناتجة عن عيوب التصنيع",
        "إمكانية الاستبدال أو الاسترجاع في حال ثبوت وجود عيب تصنيع",
      ],
      warrantyConditions: [
        "أن تكون الدراجة جديدة ولم يتم استخدامها",
        "توفر العلبة الأصلية والكرتون وجميع الإكسسوارات",
        "وجود عيب تصنيع أو خطأ في الطلب",
        "عدم تعرض الدراجة لأي حوادث أو سوء استخدام",
      ],
      cards: [
        {
          icon: "🛡️",
          title: "ضمان ذهبي 7 أيام",
          description:
            "إذا لاحظت أي عيب في أول 7 أيام من استلام دراجتك، نضمن إصلاحها أو استبدالها فوراً بدون أسئلة",
        },
        {
          icon: "🔧",
          title: "صيانة مجانية سنة",
          description:
            "فريق صيانة محترف يتابعك لمدة سنة كاملة، جاهزين دايمًا للمساعدة والصيانة الدورية",
        },
        {
          icon: "🏆",
          title: "ضمان هيكل TRINX",
          description:
            "دراجات TRINX تجي بضمان 5 سنوات على الهيكل من المصنع، ثقة وجودة مضمونة",
        },
        {
          icon: "📦",
          title: "تغليف احترافي آمن",
          description:
            "كل دراجة تُغلّف بعناية في صندوق مقوى خاص عشان تصلك سليمة ومحمية 100%",
        },
      ],
    },
  },
  {
    key: "gifts",
    title: "5 هدايا مجانية مع كل دراجة 🎁",
    subtitle: "اطلب الحين واحصل عليها",
    isActive: true,
    content: {
      badgeText: "هدايا مجانية",
      centerTitle: "5 هدايا",
      centerSubtitle: "مجانية",
      items: [
        {
          icon: "💧",
          name: "زمزمية ماء",
          desc: "زمزمية رياضية عالية الجودة",
          color: "#3B82F6",
        },
        {
          icon: "🎒",
          name: "شنطة جوال",
          desc: "مقاومة للمطر وخفيفة الوزن",
          color: "#10B981",
        },
        {
          icon: "🔐",
          name: "قفل TRINX",
          desc: "قفل أمان احترافي للدراجة",
          color: "#F59E0B",
        },
        {
          icon: "💡",
          name: "إضاءة للدراجة",
          desc: "مصباح LED لرؤية أوضح ليلاً",
          color: "#EAB308",
        },
        {
          icon: "✨",
          name: "هدية مفاجأة",
          desc: "هدية إضافية ستعجبك!",
          color: "#C62839",
        },
      ],
    },
  },
  {
    key: "trust",
    title: "ليش تختار الفارس؟",
    subtitle: "متجر سعودي موثق بخدمة احترافية",
    isActive: true,
    content: {
      badgeText: "ثق فينا",
      items: [
        {
          icon: "✅",
          title: "متجر سعودي موثق",
          desc: "متجر سعودي مرخص وموثوق منذ سنوات",
          color: "#10B981",
        },
        {
          icon: "🏆",
          title: "جودة عالية",
          desc: "دراجات TRINX العالمية الاحترافية",
          color: "#D4AF37",
        },
        {
          icon: "💰",
          title: "أسعار قوية",
          desc: "أفضل الأسعار بأعلى مستوى جودة",
          color: "#C62839",
        },
        {
          icon: "🚚",
          title: "شحن سريع",
          desc: "توصيل خلال 2-5 أيام لكل مناطق المملكة",
          color: "#3B82F6",
        },
        {
          icon: "💬",
          title: "دعم واتساب",
          desc: "فريق دعم متاح للرد على استفساراتك",
          color: "#25D366",
        },
        {
          icon: "🏷️",
          title: "عروض حصرية",
          desc: "خصومات وعروض موسمية على أفضل الموديلات",
          color: "#8B5CF6",
        },
      ],
    },
  },
  {
    key: "testimonials",
    title: "آراء عملائنا",
    subtitle: "تقييمات حقيقية من عملاء حقيقيين",
    isActive: true,
    content: {
      badgeText: "تقييمات موثوقة",
      items: [
        {
          name: "ناصر الشهري",
          city: "الرياض",
          stars: 5,
          text: "تعامل راقي والدراجات نظيفة وحالتها ممتازة بصراحة",
        },
        {
          name: "عبدالله الغامدي",
          city: "جدة",
          stars: 5,
          text: "جربت أتعامل معهم أكثر من مرة وخدمتهم بالتوصيل والصيانة ممتازة",
        },
        {
          name: "فيصل القحطاني",
          city: "الدمام",
          stars: 5,
          text: "ولدي له فترة يستخدم الدراجة الجبلية وما شاء الله ممتازة معه",
        },
        {
          name: "خالد العتيبي",
          city: "مكة المكرمة",
          stars: 5,
          text: "بيض الله وجه أبو فارس، ما قصر بالتوصيل والمتابعة الله يعطيه العافية",
        },
      ],
    },
  },
  {
    key: "faq",
    title: "الأسئلة الشائعة",
    subtitle: "إجابات على أكثر الأسئلة التي يسألنا عنها عملاؤنا",
    isActive: true,
    content: {
      items: [
        {
          question: "هل يوجد توصيل داخل المملكة؟",
          answer:
            "نعم! نوصّل لجميع مناطق المملكة العربية السعودية. التوصيل سريع وآمن خلال 2-5 أيام عمل حسب موقعك.",
        },
        {
          question: "هل الدراجة تأتي مركبة؟",
          answer:
            "تأتي الدراجة شبه مركبة بنسبة 90%. فقط بعض الأجزاء البسيطة تحتاج تركيب مثل المقود والمقعد، ويرفق معها دليل التركيب.",
        },
        {
          question: "ما هي مدة الضمان؟",
          answer:
            "نقدم الضمان الذهبي لأول 7 أيام من تاريخ الاستلام، يشمل استبدال أو إصلاح أي عيب تصنيع. الدراجات TRINX تأتي بضمان إضافي على الهيكل.",
        },
        {
          question: "هل يمكن اختيار اللون؟",
          answer:
            "نعم، بعض الموديلات متوفرة بألوان متعددة. يمكنك ذكر اللون المطلوب عند التواصل معنا عبر واتساب وسنؤكد لك التوفر.",
        },
        {
          question: "كيف أطلب الدراجة؟",
          answer:
            "الطلب سهل جداً! اضغط على زر اطلب الآن عبر واتساب واختر دراجتك، وسيتواصل معك فريقنا لإتمام الطلب والشحن.",
        },
        {
          question: "ما هي الهدايا المجانية؟",
          answer:
            "مع كل دراجة تحصل على 5 هدايا مجانية: زمزمية ماء + شنطة جوال مقاومة للمطر + قفل TRINX + إضاءة للدراجة + هدية مفاجأة إضافية!",
        },
      ],
    },
  },
  {
    key: "cta",
    title: "جاهز تبدأ مشوارك الجديد؟",
    subtitle: "تواصل معنا الآن عبر واتساب واحصل على أفضل عرض",
    isActive: true,
    content: {
      badgeText: "عرض محدود الوقت",
      buttonText: "اطلب الآن عبر واتساب 🚀",
      buttonLink:
        "https://wa.me/966502631984?text=مرحباً، أريد طلب دراجة من متجر الفارس",
      features: [
        { icon: "🚚", text: "توصيل مجاني" },
        { icon: "🛡️", text: "ضمان 7 أيام" },
        { icon: "🎁", text: "5 هدايا مجانية" },
      ],
    },
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");

  // ── Admin user ─────────────────────────────────────────────────────────
  const existing = await User.findOne({ email: "admin@alfaris.sa" });
  if (!existing) {
    await User.create({
      name: "Super Admin",
      email: "admin@alfaris.sa",
      password: "Admin@123456",
      role: "superadmin",
    });
    console.log("✅ Superadmin created: admin@alfaris.sa / Admin@123456");
  } else {
    console.log("ℹ️  Superadmin already exists");
  }

  // ── Site config ────────────────────────────────────────────────────────
  await SiteConfig.findOneAndUpdate(
    {},
    {
      siteName: "متجر برو بايك الفارس",
      siteTagline: "أفضل دراجات TRINX في المملكة",
      whatsappNumber: "966502631984",
      whatsappMessage: "مرحباً، أريد الاستفسار عن الدراجات",
      announcements: [
        { icon: "🚚", text: "شحن سريع داخل المملكة" },
        { icon: "🛡️", text: "ضمان ذهبي لأول 7 أيام" },
        { icon: "🎁", text: "5 هدايا مجانية مع كل دراجة" },
        { icon: "✅", text: "متجر سعودي موثق" },
      ],
      navLinks: [
        { label: "الرئيسية", href: "#hero" },
        { label: "العروض", href: "#mountain-bikes" },
        { label: "الدراجات", href: "#mountain-bikes" },
        { label: "الضمان الذهبي", href: "#warranty" },
        { label: "من نحن", href: "#why-us" },
        { label: "تواصل معنا", href: "#footer" },
      ],
      hero: {
        title: "دراجات TRINX الأصلية",
        subtitle: "جودة عالمية، أسعار مناسبة، توصيل سريع لجميع مناطق المملكة",
        ctaText: "اطلب الآن عبر واتساب",
        ctaLink:
          "https://wa.me/966502631984?text=مرحباً، أريد طلب دراجة من متجر الفارس",
      },
      colors: {
        primary: "#C62839",
        secondary: "#1F304A",
        accent: "#F59E0B",
        background: "#0D1117",
      },
      seo: {
        title: "متجر برو بايك الفارس - دراجات TRINX الأصلية في المملكة",
        description:
          "اشتري أفضل دراجات TRINX الجبلية والطريق والهجينة في المملكة العربية السعودية. توصيل مجاني وضمان ذهبي وأسعار تنافسية.",
        keywords:
          "دراجات, TRINX, دراجات جبلية, دراجات طريق, دراجات هجينة, المملكة العربية السعودية, الفارس",
      },
      footer: {
        description:
          "وجهتك لعالم الدراجات الهوائية بمختلف أنواعها. نقدم أفضل الدراجات العالمية بأسعار منافسة مع ضمان ذهبي وشحن سريع.",
        email: "bikealfaris@gmail.com",
        phone: "+966502631984",
        address: "المملكة العربية السعودية",
        quickLinks: [
          { label: "من نحن", href: "#why-us" },
          { label: "سياسة الخصوصية", href: "#" },
          { label: "الشروط والأحكام", href: "#" },
          { label: "سياسة الاستبدال والاسترجاع", href: "#warranty" },
          { label: "الأسئلة الشائعة", href: "#faq" },
        ],
        socialLinks: {
          instagram: "",
          twitter: "",
          snapchat: "",
          tiktok: "",
        },
        copyrightText: "© 2026 متجر برو بايك الفارس. جميع الحقوق محفوظة.",
      },
    },
    { upsert: true, new: true },
  );
  console.log("✅ Site config seeded");

  // ── Banners ────────────────────────────────────────────────────────────
  const defaultBanners = [
    {
      key: "mountain-bike-banner",
      label: "دراجات جبلية",
      category: "mountain",
      accentColor: "#C62839",
      order: 1,
    },
    {
      key: "road-bike-banner",
      label: "دراجات طريق",
      category: "road",
      accentColor: "#3B82F6",
      order: 2,
    },
    {
      key: "hybrid-bike-banner",
      label: "دراجات هجين",
      category: "hybrid",
      accentColor: "#10B981",
      order: 3,
    },
  ];
  for (const b of defaultBanners) {
    await Banner.findOneAndUpdate({ key: b.key }, b, {
      upsert: true,
      new: true,
    });
  }
  console.log("✅ Banners seeded");

  // ── Products ───────────────────────────────────────────────────────────
  const existingProducts = await Product.countDocuments();
  if (existingProducts === 0) {
    await Product.insertMany(PRODUCTS);
    console.log(`✅ ${PRODUCTS.length} products seeded`);
  } else {
    console.log(`ℹ️  Products already exist (${existingProducts}), skipping`);
  }

  // ── Sections ───────────────────────────────────────────────────────────
  for (const s of SECTIONS) {
    await Section.findOneAndUpdate({ key: s.key }, s, {
      upsert: true,
      new: true,
    });
  }
  console.log(`✅ ${SECTIONS.length} sections seeded`);

  await mongoose.disconnect();
  console.log("✅ Done! All data seeded successfully.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
