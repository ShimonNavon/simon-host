export type ProjectCategory = "products" | "communities" | "business" | "platform";

export type PortfolioItem = {
  slug: string;
  name: string;
  eyebrow: string;
  category: ProjectCategory;
  url?: string;
  githubUrl?: string;
  repoVisibility: "public" | "private";
  summary: string;
  story: string;
  role: string;
  stack: string[];
  image: string;
  imageAlt: string;
  featuredRank?: number;
  caseStudySlug?: string;
};

export const PROJECT_CATEGORIES: {
  id: ProjectCategory;
  number: string;
  title: string;
  description: string;
}[] = [
  {
    id: "products",
    number: "01",
    title: "מוצרים ומערכות",
    description: "מערכות עם משתמשים, הרשאות, נתונים ותהליכים אמיתיים — לא רק דף יפה.",
  },
  {
    id: "communities",
    number: "02",
    title: "קהילות ומדיה",
    description: "מקומות שבהם אנשים קוראים, צופים, נרשמים ומשתתפים.",
  },
  {
    id: "business",
    number: "03",
    title: "אתרים לעסקים ומותגים",
    description: "אתרים שמסבירים עסק מהר, נראים מדויק ומובילים לפעולה.",
  },
  {
    id: "platform",
    number: "04",
    title: "תשתית ומוצר בבעלותי",
    description: "אותה יד שבונה את המוצר גם יודעת לפרוס, לגבות ולתחזק אותו.",
  },
];

/**
 * Public proof only. Private repositories intentionally have no GitHub URL;
 * screenshots come only from pages that anyone can open without credentials.
 */
export const PORTFOLIO: PortfolioItem[] = [
  {
    slug: "bama",
    name: "BAMA",
    eyebrow: "שוק וובינרים בעברית",
    category: "products",
    url: "https://webinars.navonsimon.com/",
    githubUrl: "https://github.com/ShimonNavon/webinars",
    repoVisibility: "public",
    summary: "מקום אחד לגלות וובינרים, להתאים תוכן לפי תחומי עניין ולהירשם.",
    story: "חיברתי חוויית חיפוש בעברית, מערכת הרשמה וזרימת לידים למוצר תוכן אחד שנוח להפעיל ולתחזק.",
    role: "אפיון, פיתוח full-stack, פריסה ותפעול",
    stack: ["React", "Vite", "Django", "PostgreSQL", "Workers"],
    image: "/projects/bama.webp",
    imageAlt: "עמוד הבית הציבורי של BAMA עם חיפוש וובינרים בעברית",
    featuredRank: 1,
    caseStudySlug: "building-bama-webinar-marketplace",
  },
  {
    slug: "the-craft",
    name: "The Craft / CUTPOINT",
    eyebrow: "קהילה מקצועית למעצבי שיער",
    category: "products",
    url: "https://barbers.navonsimon.com/",
    githubUrl: "https://github.com/ShimonNavon/barbers",
    repoVisibility: "public",
    summary: "מוצר קהילתי בעברית עם הרשמה, סינון מקצועי וכניסה לחברים.",
    story: "בניתי מסלול הצטרפות שמסביר את הערך, אוסף מועמדים ושומר את פרטי הקהילה מאחורי אזור חברים.",
    role: "פיתוח full-stack, בסיס נתונים ותשתית",
    stack: ["Django", "DRF", "PostgreSQL", "Valkey", "Docker"],
    image: "/projects/the-craft.webp",
    imageAlt: "עמוד ההצטרפות הציבורי לקהילת CUTPOINT למעצבי שיער",
    featuredRank: 2,
    caseStudySlug: "building-the-craft-community",
  },
  {
    slug: "rescue-alert",
    name: "Rescue Alert System",
    eyebrow: "מערכת התראות למתנדבי חירום",
    category: "products",
    url: "https://rescue-alert-system-malachim-badrachim.navonsimon.com/",
    githubUrl: "https://github.com/ShimonNavon/rescue-alert-system",
    repoVisibility: "public",
    summary: "מערכת קוד פתוח שמחברת אירוע, מיקום ומתנדבים זמינים בזמן אמת.",
    story: "המערכת מתכננת זרימה מהקמת אירוע, דרך איתור מגיבים קרובים ועד קבלה או דחייה של ההתראה.",
    role: "ארכיטקטורה, backend, אפליקציית מובייל ותשתית",
    stack: ["Django", "PostGIS", "Flutter", "Firebase", "Docker"],
    image: "/projects/rescue-alert.webp",
    imageAlt: "המחשה ציבורית של מערכת Rescue Alert ושל אפליקציית המתנדבים",
    featuredRank: 3,
    caseStudySlug: "building-rescue-alert-system",
  },
  {
    slug: "kehila-budget",
    name: "Kehila Budget Manager",
    eyebrow: "ניהול תקציב לקהילה",
    category: "products",
    url: "https://chabad-mb.navonsimon.com/",
    repoVisibility: "private",
    summary: "מערכת עבודה בעברית לניהול תקציב, הוצאות והרשאות במקום אחד.",
    story: "הפכתי תהליך כספי שחי בין אנשים וקבצים לזרימה ברורה עם משתמשים, נתונים ומעקב.",
    role: "אפיון, פיתוח full-stack, הרשאות ופריסה",
    stack: ["React", "Django", "DRF", "PostgreSQL", "Docker"],
    image: "/projects/kehila-budget.webp",
    imageAlt: "מסך הכניסה הציבורי למערכת ניהול התקציב של הקהילה",
    caseStudySlug: "building-kehila-budget-manager",
  },
  {
    slug: "vivian-nfc",
    name: "Vivian NFC",
    eyebrow: "פלטפורמת פריטי אספנות חכמים",
    category: "products",
    url: "https://vivian-smart-collectible-cards.navonsimon.com/",
    repoVisibility: "private",
    summary: "אתר מוצר עתידני שמחבר כרטיסי NFC, תוכן דיגיטלי וקהילות אוהדים.",
    story: "יצרתי חוויית מוצר מהירה ותנועתית לצד API ומסד נתונים שאפשר להרחיב למערכת מלאה.",
    role: "frontend, API, בסיס נתונים ופריסה",
    stack: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL", "Framer Motion"],
    image: "/projects/vivian-nfc.webp",
    imageAlt: "עמוד הבית הכהה של Vivian לפלטפורמת כרטיסי אספנות חכמים",
    featuredRank: 4,
    caseStudySlug: "building-vivian-nfc-platform",
  },
  {
    slug: "yc-lobbying",
    name: "YC Lobbying",
    eyebrow: "אתר תדמית למשרד יחסי ממשל",
    category: "products",
    url: "https://yclobbying.com/",
    githubUrl: "https://github.com/ShimonNavon/Official-YC-Lobbying-Website",
    repoVisibility: "public",
    summary: "אתר עברי מלא למשרד יחסי ממשל, עם תוכן, שירותים וזרימת פניות.",
    story: "חיברתי ממשק עריכה, API ואתר ציבורי שמספר סיפור מקצועי ויכול לגדול עם העסק.",
    role: "פיתוח full-stack, מערכת תוכן ופריסה",
    stack: ["React", "Vite", "Django", "DRF", "PostgreSQL"],
    image: "/projects/yc-lobbying.webp",
    imageAlt: "עמוד הבית הציבורי של YC יחסי ממשל ולובינג",
    caseStudySlug: "building-yc-lobbying-platform",
  },
  {
    slug: "cutpoint",
    name: "CUTPOINT Community",
    eyebrow: "רשת חברתית מקצועית בעברית",
    category: "communities",
    url: "https://social.navonsimon.com/",
    repoVisibility: "private",
    summary: "מרחב קהילתי לשאלות, תגובות ושיתוף ניסיון בין אנשי מקצוע.",
    story: "הפרויקט כולל פיד, משתמשים ושיחות בתוך מוצר עברי שמאוחסן ומתוחזק אצלי.",
    role: "פיתוח המוצר, נתונים, פריסה ותפעול",
    stack: ["Web App", "PostgreSQL", "Docker", "Linux"],
    image: "/projects/cutpoint.webp",
    imageAlt: "עמוד הקהילה הציבורי של CUTPOINT בעברית",
  },
  {
    slug: "screening-room",
    name: "Screening Room",
    eyebrow: "ספריית וידאו עצמאית",
    category: "communities",
    url: "https://videos.navonsimon.com/",
    repoVisibility: "private",
    summary: "חדר הקרנה בדפדפן שמגיש סרטים וקבצי וידאו בלי פלטפורמה חיצונית.",
    story: "בניתי שרת Go קטן שמבין בקשות Range כדי לאפשר קפיצה והמשך צפייה בצורה טבעית.",
    role: "פיתוח backend, ממשק ופריסה",
    stack: ["Go", "HTTP Range", "HTML", "Docker"],
    image: "/projects/screening-room.webp",
    imageAlt: "עמוד חדר ההקרנה עם ספריית סרטים בעברית",
  },
  {
    slug: "panim",
    name: "פנים אל פנים",
    eyebrow: "דף השקה לאפליקציית היכרויות",
    category: "communities",
    url: "https://panim.navonsimon.com/",
    repoVisibility: "private",
    summary: "דף הרשמה לבטא שמציג רעיון של שיחת וידאו קצרה לפני ההתכתבות.",
    story: "הדף מתרגם רעיון מוצר למשפט אחד, המחשה ברורה ורשימת המתנה שאפשר למדוד.",
    role: "קונספט, frontend, API ופריסה",
    stack: ["HTML", "CSS", "Node.js", "Express", "PostgreSQL"],
    image: "/projects/panim.webp",
    imageAlt: "עמוד ההשקה הבורדו של אפליקציית פנים אל פנים",
  },
  {
    slug: "mazkeret-news",
    name: "מזכרת בתיה",
    eyebrow: "אתר חדשות מקומי",
    category: "communities",
    url: "https://mazkeret.navonsimon.com/",
    repoVisibility: "private",
    summary: "אב-טיפוס לאתר חדשות, אירועים, עסקים ומודעות לקהילה מקומית.",
    story: "בניתי שפה מערכתית רגועה ומבנה תוכן שמאפשר לתושב להבין מהר מה חדש ליד הבית.",
    role: "עיצוב, פיתוח ופריסה",
    stack: ["Web", "Responsive UI", "Content Design", "Linux"],
    image: "/projects/mazkeret-news.webp",
    imageAlt: "עמוד הבית הציבורי של אתר החדשות המקומי מזכרת בתיה",
  },
  {
    slug: "mia-dynamics",
    name: "MIA Dynamics",
    eyebrow: "אתר מוצר לרכב חשמלי",
    category: "business",
    url: "https://mia-dynamics.navonsimon.com/",
    githubUrl: "https://github.com/ShimonNavon/mia-dynamics",
    repoVisibility: "public",
    summary: "חוויית מותג טכנית לרכב שטח חשמלי עם מסר חד וקטלוג דגמים.",
    story: "האתר משתמש בקצב, טיפוגרפיה ונתוני מוצר כדי להסביר טכנולוגיה מורכבת בלי מצגת ארוכה.",
    role: "עיצוב ופיתוח frontend, תוכן ופריסה",
    stack: ["React", "TypeScript", "Responsive UI", "Docker"],
    image: "/projects/mia-dynamics.webp",
    imageAlt: "עמוד הבית השחור והירוק של MIA Dynamics",
  },
  {
    slug: "inner-form",
    name: "מאיה אורן — Inner Form",
    eyebrow: "אתר לשיטת אימון גוף ונפש",
    category: "business",
    url: "https://inner-form.navonsimon.com/",
    githubUrl: "https://github.com/ShimonNavon/inner-form",
    repoVisibility: "public",
    summary: "אתר עברי רך וממוקד שמסביר שיטה אישית ומוביל למפגש היכרות.",
    story: "העיצוב נותן לטקסט ולנשימה מקום, תוך שמירה על מסלול ברור מהיכרות ליצירת קשר.",
    role: "עיצוב, פיתוח ופריסה",
    stack: ["React", "TypeScript", "Responsive UI", "Docker"],
    image: "/projects/inner-form.webp",
    imageAlt: "עמוד הבית הבהיר של מאיה אורן ושיטת Inner Form",
  },
  {
    slug: "benny-fluman",
    name: "בני פלומן",
    eyebrow: "אתר ליועץ עסקי",
    category: "business",
    url: "https://benny-fluman.navonsimon.com/",
    githubUrl: "https://github.com/ShimonNavon/benny-fluman",
    repoVisibility: "public",
    summary: "אתר תדמית שמציג ניסיון, שיטה והצעת ערך לבעלי עסקים.",
    story: "בניתי היררכיית תוכן שקטה ובטוחה שמובילה משאלה עסקית לשיחת היכרות.",
    role: "עיצוב, פיתוח ופריסה",
    stack: ["React", "Responsive UI", "SEO", "Docker"],
    image: "/projects/benny-fluman.webp",
    imageAlt: "עמוד הבית הציבורי של היועץ העסקי בני פלומן",
  },
  {
    slug: "consulting",
    name: "Simon Systems Consulting",
    eyebrow: "אתר ייעוץ backend ו-AI",
    category: "business",
    url: "https://consulting.navonsimon.com/",
    githubUrl: "https://github.com/ShimonNavon/consulting",
    repoVisibility: "public",
    summary: "אתר שירות באנגלית לחברות שצריכות להפוך בעיה עסקית למערכת עובדת.",
    story: "דף חד ומבוסס-מערכת שמציג תהליך עבודה, יכולות וזמינות בלי קישוטים מיותרים.",
    role: "אסטרטגיה, עיצוב, פיתוח ופריסה",
    stack: ["HTML", "CSS", "JavaScript", "Linux"],
    image: "/projects/consulting.webp",
    imageAlt: "עמוד הבית של Simon Systems Consulting באנגלית",
  },
  {
    slug: "arvatz",
    name: "Arvatz Jewelry",
    eyebrow: "חנות תכשיטים מקוונת",
    category: "business",
    url: "https://arvatz.navonsimon.com/",
    repoVisibility: "private",
    summary: "חנות מסחר מלאה לתכשיטים עם קטלוג, חיפוש, סל וחשבון לקוח.",
    story: "החנות מראה שאני יודע להחזיק גם אתרי מסחר ותוכן קיימים בסביבה מנוהלת ובטוחה.",
    role: "אירוח, העברה ותפעול שוטף",
    stack: ["E-commerce", "WordPress", "Managed Hosting", "Backups"],
    image: "/projects/arvatz.webp",
    imageAlt: "עמוד הבית השחור של חנות התכשיטים Arvatz",
  },
  {
    slug: "simon-host",
    name: "Simon Host",
    eyebrow: "הפלטפורמה שאתם נמצאים בה",
    category: "platform",
    url: "https://simonhost.navonsimon.com/",
    githubUrl: "https://github.com/ShimonNavon/simon-host",
    repoVisibility: "public",
    summary: "אתר, מערכת לידים, בדיקת דומיין ותוכן SEO שרצים על התשתית שלי.",
    story: "המוצר הזה מחבר React, API, אוטומציית פריסה, ניטור וגיבויים — והוא גם חלון הראווה שלהם.",
    role: "מוצר, עיצוב, פיתוח, DevOps ותפעול",
    stack: ["React", "Django", "PostgreSQL", "CI/CD", "Docker"],
    image: "/projects/simon-host.webp",
    imageAlt: "עמוד הבית הכחול והכתום של Simon Host",
  },
];

export const FEATURED_PROJECTS = PORTFOLIO.filter(
  (project): project is PortfolioItem & { featuredRank: number } => project.featuredRank !== undefined
).sort((a, b) => a.featuredRank - b.featuredRank);

export function projectPath(project: PortfolioItem): string | undefined {
  return project.caseStudySlug ? `/blog/${project.caseStudySlug}` : undefined;
}

export function findProject(slug: string): PortfolioItem | undefined {
  return PORTFOLIO.find((project) => project.slug === slug);
}
