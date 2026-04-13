// ============================================================
// Portfolio Data — Tomas Kotik
// ============================================================

export const personal = {
  name: "Tomáš Kotík",
  alias: "Tomáš",
  tagline: "Webový vývojář",
  subtitle: "Student Creative Hill College",
  bio: "Specializuji se na vývoj webových aplikací a databázových řešení. Kombinuji moderní technologie s kreativním přístupem, aby vznikaly funkční a přehledné produkty.",
  bio2: "Jsem Tomáš Kotík, student Creative Hill College ve Zlíně. Zaměřuji se na programování, webdesign a databázové systémy. Mimo školu aktivně tvořím vlastní projekty a stále se posouvám dál.",
  email: "tomaskotik08@gmail.com",
  website: "tomaskotik.cz",
  location: "Zlín, Česká republika",
  avatar: "/Images/img.png",
  links: {
    github: "https://github.com/tomaskotikk",
    linkedin: "https://www.linkedin.com/in/tom%C3%A1%C5%A1-kot%C3%ADk-5a4b493aa/",
    facebook: "https://www.facebook.com/tomas.kotik.35/",
    instagram: "https://www.instagram.com/tomas.kotikk/",
  },
};

export const stats = [
  { label: "Projektů celkem", value: "14+", icon: "code", description: "Weby, aplikace a školní projekty" },
  { label: "Klientské weby", value: "3+", icon: "award", description: "Reálné projekty pro klienty" },
  { label: "Roky praxe", value: "3", icon: "globe", description: "Nepřetržitý růst" },
];

export const skills = ["React", "JavaScript", "Node.js", "Java Spring Boot", "MySQL", "PHP"];

export const techStack = [
  {
    category: "Front-End",
    techs: [
      { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "ReactJS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "Vite", icon: "https://vitejs.dev/logo.svg" },
    ]
  },
  {
    category: "Back-End",
    techs: [
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
      { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
      { name: "Java Spring Boot", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
      { name: "Supabase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg" },
    ]
  },
  {
    category: "Databáze",
    techs: [
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    ]
  },
  {
    category: "Nástroje",
    techs: [
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
    ]
  }
];

export const projects = [
  {
    id: 1,
    title: "TeamPulse",
    description: "Aplikace pro spravu sportovnich tymu, hracu a tymove agendy.",
    extendedDescription: "Skolni projekt zamereny na prehlednou spravu tymu, hracu a udalosti na jednom miste. Draz byl kladen na jednoduchost pouziti, jasny tok dat a prakticke funkce pro kazdodenni provoz.",
    tags: ["Skola", "Web App", "Management"],
    category: "school",
    image: "/Images/preview.png",
    liveUrl: "https://teampulse.tomaskotik.cz/index.html",
    detailUrl: "#",
    status: "Deployed",
    color: "#0066FF",
  },
  
  {
    id: 2,
    title: "Žabčíková - Učetnictví",
    description: "Oficiální web Žabčíková - Účetnictví přímo ve Zlíně. Moderní responzivní jednoduchý design s respozivním řešením.",
    extendedDescription: "Klientska realizace postavena na ciste prezentaci sluzeb, snadne orientaci navstevnika a plynulem mobilnim zazitku.",
    tags: ["Zakazka", "Responsive", "Rezervace"],
    category: "client",
    image: "/Images/ucetnictvi.png",
    liveUrl: "https://zabcikova.cz/",
    detailUrl: "#",
    status: "Deployed",
    color: "#10B981",
  },
  {
    id: 3,
    title: "Kostkopark",
    description: "Oficiální web dětské herny ve Zlíně s moderním responzivním designem a rezervačním systémem.",
    extendedDescription: "Klientska realizace postavena na ciste prezentaci sluzeb, snadne orientaci navstevnika a plynulem mobilnim zazitku.",
    tags: ["Zakazka", "Responsive", "Rezervace"],
    category: "client",
    image: "/Images/kostkopark.png",
    liveUrl: "https://kostkopark.cz",
    detailUrl: "#",
    status: "Deployed",
    color: "#10B981",
  },
  {
    id: 4,
    title: "Rugby Kemp",
    description: "Oficialni web letniho rugby kempu s informacemi, prihlaskou a galerii.",
    extendedDescription: "Zakazkovy web orientovany na rychly pristup k informacim, jednoduchou registraci a bezproblemove fungovani na mobilu i desktopu.",
    tags: ["Zakazka", "Landing", "Mobile"],
    category: "client",
    image: "/Images/rugby.jpg",
    liveUrl: "https://rugbykemp.cz",
    detailUrl: "#",
    status: "Deployed",
    color: "#0EA5E9",
  },
  {
    id: 5,
    title: "Aplikace SHARE IT",
    description: "Webova aplikace pro spravu a sdileni predplatnych s rolemi uzivatelu.",
    extendedDescription: "Skolni full-stack projekt zamereny na databazovou logiku, uzivatelske role a prakticky workflow pro sdileni predplatnych sluzeb.",
    tags: ["Skola", "Databaze", "Web App"],
    category: "school",
    image: "/Images/company.jpg",
    liveUrl: "https://github.com/tomaskotikk/ShareIT",
    detailUrl: "#",
    status: "Developing",
    color: "#6366F1",
  },
  {
    id: 6,
    title: "3D Hra - Tulen",
    description: "Klauzurni multiplayer hra pro 2 hrace na tema nahodneho slova Tulen.",
    extendedDescription: "Skolni 3D projekt s durazem na herni mechaniku, logiku multiplayeru a celkovy zazitek ze souboje dvou hracu.",
    tags: ["Skola", "3D", "Game"],
    category: "school",
    image: "/Images/coding.jpg",
    liveUrl: "https://github.com/tomaskotikk/Klauzury-3D-Tulen",
    detailUrl: "#",
    status: "Deployed",
    color: "#8B5CF6",
  },
  {
    id: 7,
    title: "Impostor Game",
    description: "Prohlizecova zabavna hra s prateli, kde hledate impostora.",
    extendedDescription: "Zabavna socialni hra do prohlizece se sadou tematickych kategorii. Dural se na jednoduchost ovladani a rychly start hry.",
    tags: ["Zabava", "Browser Game", "JavaScript"],
    category: "fun",
    image: "/Images/impostor-img.png",
    liveUrl: "https://impostor.tomaskotik.cz/",
    detailUrl: "#",
    status: "Deployed",
    color: "#F59E0B",
  },
  {
    id: 8,
    title: "QR Platba Generator",
    description: "Web pro generovani QR plateb pro osobni ucet.",
    extendedDescription: "Nastroj pro rychle vytvoreni QR plateb kompatibilnich s ceskymi bankami, s jednoduchym a rychlym formularovym postupem.",
    tags: ["Zabava", "Fintech", "Web Tool"],
    category: "fun",
    image: "/Images/Bank.jpg",
    liveUrl: "https://qr-kody.vercel.app/",
    detailUrl: "#",
    status: "Deployed",
    color: "#14B8A6",
  },
  {
    id: 9,
    title: "Objective Tennis Counter",
    description: "Program pro pocitani skore v tenise s konzolovym rozhranim.",
    extendedDescription: "Skolni aplikace zamerena na logiku bodovani, stav zapasu a prehledny vypis aktualniho stavu hry.",
    tags: ["Skola", "Java", "Console"],
    category: "school",
    image: "/Images/State.jpg",
    liveUrl: "https://github.com/tomaskotikk/Objective-Tenis-Counter-Computer",
    detailUrl: "#",
    status: "Deployed",
    color: "#3B82F6",
  },
  {
    id: 10,
    title: "Java Bank System",
    description: "Program simulujici funkce banky: vybery, vklady, kontokorent a uver.",
    extendedDescription: "Skolni projekt s bankovni logikou, validacemi vstupu a jednoduse ovladatelnym konzolovym rozhranim.",
    tags: ["Skola", "Java", "Finance"],
    category: "school",
    image: "/Images/Bank.jpg",
    liveUrl: "https://github.com/tomaskotikk/Bank-System-Java",
    detailUrl: "#",
    status: "Deployed",
    color: "#2563EB",
  },
  {
    id: 11,
    title: "Hunger Games 2D",
    description: "Pixelova 2D hra inspirovana Hunger Games, klauzurni prace.",
    extendedDescription: "Herni projekt zamereny na arenu preziti, plynule ovladani a stylizovane 2D zpracovani.",
    tags: ["Skola", "2D", "Game"],
    category: "school",
    image: "/Images/HungerGames.png",
    liveUrl: "https://github.com/tomaskotikk/Hunger-Games-2D",
    detailUrl: "#",
    status: "Deployed",
    color: "#EF4444",
  },
  {
    id: 12,
    title: "Discord Login",
    description: "Moderni prihlasovaci stranka inspirovana Discordem s animacemi.",
    extendedDescription: "Cvicny frontend projekt orientovany na cisty vizual, responzivitu a jemne animacni efekty.",
    tags: ["Zabava", "UI", "Frontend"],
    category: "fun",
    image: "/Images/discord.jpg",
    liveUrl: "https://github.com/tomaskotikk/Discord-Login",
    detailUrl: "#",
    status: "Deployed",
    color: "#7C3AED",
  },
  {
    id: 13,
    title: "State API",
    description: "Projekt vyuzivajici API pro informace o statech sveta.",
    extendedDescription: "Skolni projekt s REST API a databazovym backendem zamereny na nacitani, zpracovani a zobrazeni dat.",
    tags: ["Skola", "API", "Backend"],
    category: "school",
    image: "/Images/State.jpg",
    liveUrl: "https://github.com/tomaskotikk/state-api",
    detailUrl: "#",
    status: "Deployed",
    color: "#06B6D4",
  },
  {
    id: 14,
    title: "Typing Effect",
    description: "Animovany efekt psani textu v JavaScriptu pro webove stranky.",
    extendedDescription: "Maly cvicny projekt s fokusen na plynulou animaci, casovani a snadnou implementaci do libovolneho webu.",
    tags: ["Zabava", "JavaScript", "Animation"],
    category: "fun",
    image: "/Images/TypingEffect.jpg",
    liveUrl: "https://github.com/tomaskotikk/Typing-Text-Effect-Javascript",
    detailUrl: "#",
    status: "Deployed",
    color: "#22C55E",
  },
  {
    id: 15,
    title: "SQLite Application",
    description: "Databazova aplikace ve SQLite s CRUD operacemi.",
    extendedDescription: "Skolni konzolova aplikace zamerena na spravu dat, validace vstupu a zakladni databazove operace.",
    tags: ["Skola", "SQLite", "CRUD"],
    category: "school",
    image: "/Images/Sql-Lite.jpg",
    liveUrl: "https://github.com/tomaskotikk/SQL-Lite---Application",
    detailUrl: "#",
    status: "Deployed",
    color: "#84CC16",
  },
];

export const academic = {
  degree: "Střední škola",
  major: "Vývoj multimediálních aplikací a počítačových her",
  institution: "Creative Hill College, Zlín",
  period: "2023 — současnost",
  timeline: [
    {
      id: "01",
      year: "1. ročník",
      title: "Základy",
      focus: "Programovací základy",
      concepts: ["OOP", "Algoritmy", "Základy webu"],
      stack: ["Java", "HTML", "CSS"],
      project: "První školní projekty zaměřené na logiku programu a frontendové základy.",
      icon: "code"
    },
    {
      id: "02",
      year: "2. ročník",
      title: "Systémy a databáze",
      focus: "Datová architektura",
      concepts: ["SQL", "Návrh databází", "Integrace systémů"],
      stack: ["Java", "MySQL", "JavaScript"],
      project: "Objective Tennis Counter a Java Bank System jako praktické školní projekty.",
      icon: "database"
    },
    {
      id: "03",
      year: "3. ročník",
      title: "Realné projekty a praxe",
      focus: "Webové aplikace",
      concepts: ["Zakázková dodávka", "Responsive UI", "Deploy"],
      stack: ["React", "Node.js", "Vite", "GitHub"],
      project: "TeamPulse a klientské weby včetně Kostkopark a Rugby Kemp.",
      internship: "Praxe v roce 2025 byla hodnocena jako Firma roku.",
      status: "Aktivní",
      icon: "layers"
    },
    {
      id: "04",
      year: "Aktuálně",
      title: "Profesní růst",
      focus: "Nepřetržitý vývoj",
      status: "Stavím a učím se",
      deepDives: ["Moderní React", "Backend architektura", "Kvalitní UX"],
      goal: "Propojit školní znalosti s reálnými klientskými a produkčními projekty.",
      icon: "activity"
    }
  ]
};

export const navLinks = [
  { label: "Domů", href: "#home" },
  { label: "O mně", href: "#about" },
  { label: "Vzdělání", href: "#academic" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Kontakt", href: "#contact" },
];


