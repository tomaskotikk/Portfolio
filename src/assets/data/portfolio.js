// ============================================================
// Portfolio Data - Tomas Kotik
// ============================================================

export const personal = {
  name: 'Tomáš Kotík',
  alias: 'Tomáš',
  tagline: {
    cs: 'Webový vývojář',
    en: 'Web Developer',
  },
  subtitle: {
    cs: 'Student Creative Hill College',
    en: 'Creative Hill College Student',
  },
  bio: {
    cs: 'Specializuji se na vývoj webových aplikací a databázových řešení. Kombinuji moderní technologie s kreativním přístupem, aby vznikaly funkční a přehledné produkty.',
    en: 'I specialize in web applications and database solutions. I combine modern technologies with a creative mindset to build clear, practical products.',
  },
  bio2: {
    cs: 'Jsem Tomáš Kotík, student Creative Hill College ve Zlíně. Zaměřuji se na programování, webdesign a databázové systémy. Mimo školu aktivně tvořím vlastní projekty a stále se posouvám dál.',
    en: 'I am Tomas Kotik, a student at Creative Hill College in Zlin. I focus on programming, web design, and database systems. Outside school, I actively build my own projects and keep improving.',
  },
  email: 'tomaskotik08@gmail.com',
  website: 'tomaskotik.cz',
  location: {
    cs: 'Zlín, Česká republika',
    en: 'Zlin, Czech Republic',
  },
  avatar: '/Images/img.png',
  links: {
    github: 'https://github.com/tomaskotikk',
    linkedin: 'https://www.linkedin.com/in/tom%C3%A1%C5%A1-kot%C3%ADk-5a4b493aa/',
    facebook: 'https://www.facebook.com/tomas.kotik.35/',
    instagram: 'https://www.instagram.com/tomas.kotikk/',
  },
};

export const stats = [
  {
    label: { cs: 'Projektů celkem', en: 'Total Projects' },
    value: '14+',
    icon: 'code',
    description: { cs: 'Weby, aplikace a školní projekty', en: 'Websites, apps, and school projects' },
  },
  {
    label: { cs: 'Klientske weby', en: 'Client Websites' },
    value: '3+',
    icon: 'award',
    description: { cs: 'Reálné projekty pro klienty', en: 'Real-world client work' },
  },
  {
    label: { cs: 'Roky praxe', en: 'Years of Practice' },
    value: '3',
    icon: 'globe',
    description: { cs: 'Nepřetržitý růst', en: 'Continuous growth' },
  },
];

export const skills = ['React', 'JavaScript', 'Next.js', 'Node.js', 'Python', 'Java', 'MySQL', 'Supabase'];

export const techStack = [
  {
    category: { cs: 'Front-End', en: 'Front-End' },
    techs: [
      { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'ReactJS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
      { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
      { name: 'Vite', icon: 'https://vitejs.dev/logo.svg' },
    ],
  },
  {
    category: { cs: 'Back-End', en: 'Back-End' },
    techs: [
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
      { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
      { name: 'Java Spring Boot', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
    ],
  },
  {
    category: { cs: 'Databáze', en: 'Databases' },
    techs: [
      { name: 'Supabase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg' },
      { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
      { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
      { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    ],
  },
  {
    category: { cs: 'Hry', en: 'Games' },
    techs: [
      { name: 'Unity Engine', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg' },
    ],
  },
  {
    category: { cs: 'Nástroje', en: 'Tools' },
    techs: [
      { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
      { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
    ],
  },
];

export const projects = [
  {
    id: 1,
    title: 'TeamPulse',
    description: {
      cs: 'Aplikace pro správu sportovních týmů, hráčů a týmové agendy.',
      en: 'An app for managing sports teams, players, and team operations.',
    },
    extendedDescription: {
      cs: 'Školní projekt zaměřený na přehlednou správu týmů, hráčů a událostí na jednom místě. Důraz byl kladen na jednoduchost použití, jasný tok dat a praktické funkce pro každodenní provoz.',
      en: 'A school project focused on clear team, player, and event management in one place. The focus was simplicity, clean data flow, and practical day-to-day features.',
    },
    tags: ['School', 'Web App', 'Management'],
    category: 'school',
    image: '/Images/preview.png',
    liveUrl: 'https://teampulse.tomaskotik.cz/index.html',
    detailUrl: '#',
    status: 'Deployed',
    color: '#0066FF',
  },
  {
    id: 2,
    title: 'Žabčíková - Účetnictví',
    description: {
      cs: 'Oficiální web Žabčíková - Účetnictví přímo ve Zlíně. Moderní, responzivní a čistý design.',
      en: 'Official website for Zabcikova Accounting in Zlin. Modern, responsive, and clean design.',
    },
    extendedDescription: {
      cs: 'Klientská realizace postavená na čisté prezentaci služeb, snadné orientaci návštěvníka a plynulém mobilním zážitku.',
      en: 'A client project built around clear service presentation, easy navigation, and a smooth mobile experience.',
    },
    tags: ['Client', 'Responsive', 'Booking'],
    category: 'client',
    image: '/Images/ucetnictvi.png',
    liveUrl: 'https://zabcikova.cz/',
    detailUrl: '#',
    status: 'Deployed',
    color: '#10B981',
  },
  {
    id: 3,
    title: 'Kostkopark',
    description: {
      cs: 'Oficiální web dětské herny ve Zlíně s moderním responzivním designem a rezervačním systémem.',
      en: 'Official website for a children play center in Zlin with a modern responsive design and booking system.',
    },
    extendedDescription: {
      cs: 'Klientská realizace postavená na čisté prezentaci služeb, snadné orientaci návštěvníka a plynulém mobilním zážitku.',
      en: 'A client project built around clear service presentation, easy navigation, and a smooth mobile experience.',
    },
    tags: ['Client', 'Responsive', 'Booking'],
    category: 'client',
    image: '/Images/kostkopark.png',
    liveUrl: 'https://kostkopark.cz',
    detailUrl: '#',
    status: 'Deployed',
    color: '#10B981',
  },
  {
    id: 4,
    title: 'Rugby Camp',
    description: {
      cs: 'Oficiální web letního rugby kempu s informacemi, přihláškou a galerií.',
      en: 'Official summer rugby camp website with information, registration, and gallery.',
    },
    extendedDescription: {
      cs: 'Zakázkový web orientovaný na rychlý přístup k informacím, jednoduchou registraci a bezproblémové fungování na mobilu i desktopu.',
      en: 'A custom website focused on fast access to information, easy registration, and smooth mobile and desktop use.',
    },
    tags: ['Client', 'Landing', 'Mobile'],
    category: 'client',
    image: '/Images/rugby.jpg',
    liveUrl: 'https://rugbykemp.cz',
    detailUrl: '#',
    status: 'Deployed',
    color: '#0EA5E9',
  },
  {
    id: 5,
    title: 'SHARE IT App',
    description: {
      cs: 'Webová aplikace pro správu a sdílení předplatných s rolemi uživatelů.',
      en: 'A web app for managing and sharing subscriptions with user roles.',
    },
    extendedDescription: {
      cs: 'Školní full-stack projekt zaměřený na databázovou logiku, uživatelské role a praktický workflow pro sdílení předplatných služeb.',
      en: 'A school full-stack project focused on database logic, user roles, and practical subscription-sharing workflows.',
    },
    tags: ['School', 'Database', 'Web App'],
    category: 'school',
    image: '/Images/company.jpg',
    liveUrl: 'https://github.com/tomaskotikk/ShareIT',
    detailUrl: '#',
    status: 'Developing',
    color: '#6366F1',
  },
  {
    id: 6,
    title: '3D Game - Seal',
    description: {
      cs: 'Klauzurní multiplayer hra pro 2 hráče na téma náhodného slova Tuleň.',
      en: 'A final-term multiplayer game for 2 players based on the random theme word Seal.',
    },
    extendedDescription: {
      cs: 'Školní 3D projekt s důrazem na herní mechaniky, logiku multiplayeru a celkový zážitek ze souboje dvou hráčů.',
      en: 'A school 3D project focused on gameplay mechanics, multiplayer logic, and overall duel experience.',
    },
    tags: ['School', '3D', 'Game'],
    category: 'school',
    image: '/Images/tulen.webp',
    liveUrl: 'https://github.com/tomaskotikk/Klauzury-3D-Tulen',
    detailUrl: '#',
    status: 'Deployed',
    color: '#8B5CF6',
  },
  {
    id: 7,
    title: 'Impostor Game',
    description: {
      cs: 'Prohlížečová zábavná hra s přáteli, kde hledáte impostora.',
      en: 'A fun browser game with friends where you try to find the impostor.',
    },
    extendedDescription: {
      cs: 'Zábavná sociální hra do prohlížeče se sadou tematických kategorií. Důraz byl na jednoduchost ovládání a rychlý start hry.',
      en: 'A social browser game with themed categories. The focus was easy controls and quick game start.',
    },
    tags: ['Fun', 'Browser Game', 'JavaScript'],
    category: 'fun',
    image: '/Images/impostor-img.png',
    liveUrl: 'https://impostor.tomaskotik.cz/',
    detailUrl: '#',
    status: 'Deployed',
    color: '#F59E0B',
  },
  {
    id: 8,
    title: 'QR Payment Generator',
    description: {
      cs: 'Web pro generování QR plateb pro osobní účet.',
      en: 'A web tool for generating QR payments for personal banking.',
    },
    extendedDescription: {
      cs: 'Nástroj pro rychlé vytvoření QR plateb kompatibilních s českými bankami, s jednoduchým a rychlým formulářovým postupem.',
      en: 'A tool for quickly creating QR payments compatible with Czech banks using a simple and fast form flow.',
    },
    tags: ['Fun', 'Fintech', 'Web Tool'],
    category: 'fun',
    image: '/Images/qr.png',
    liveUrl: 'https://qr-kody.vercel.app/',
    detailUrl: '#',
    status: 'Deployed',
    color: '#14B8A6',
  },
  {
    id: 9,
    title: 'Objective Tennis Counter',
    description: {
      cs: 'Program pro počítání skóre v tenise s konzolovým rozhraním.',
      en: 'A console app for counting and managing tennis score.',
    },
    extendedDescription: {
      cs: 'Školní aplikace zaměřená na logiku bodování, stav zápasu a přehledný výpis aktuálního stavu hry.',
      en: 'A school app focused on scoring logic, match state, and clear game status output.',
    },
    tags: ['School', 'Java', 'Console'],
    category: 'school',
    image: '/Images/State.jpg',
    liveUrl: 'https://github.com/tomaskotikk/Objective-Tenis-Counter-Computer',
    detailUrl: '#',
    status: 'Deployed',
    color: '#3B82F6',
  },
  {
    id: 10,
    title: 'Java Bank System',
    description: {
      cs: 'Program simulující funkce banky: výběry, vklady, kontokorent a úvěr.',
      en: 'A program that simulates bank features: withdrawals, deposits, overdraft, and loan.',
    },
    extendedDescription: {
      cs: 'Školní projekt s bankovní logikou, validacemi vstupu a jednoduše ovladatelným konzolovým rozhraním.',
      en: 'A school project with banking logic, input validation, and an easy-to-use console interface.',
    },
    tags: ['School', 'Java', 'Finance'],
    category: 'school',
    image: '/Images/Bank.jpg',
    liveUrl: 'https://github.com/tomaskotikk/Bank-System-Java',
    detailUrl: '#',
    status: 'Deployed',
    color: '#2563EB',
  },
  {
    id: 11,
    title: 'Hunger Games 2D',
    description: {
      cs: 'Pixelová 2D hra inspirovaná Hunger Games, klauzurní práce.',
      en: 'A pixel-art 2D game inspired by Hunger Games, created as a final-term project.',
    },
    extendedDescription: {
      cs: 'Herní projekt zaměřený na arénu přežití, plynulé ovládání a stylizované 2D zpracování.',
      en: 'A game project focused on survival arena gameplay, smooth controls, and stylized 2D visuals.',
    },
    tags: ['School', '2D', 'Game'],
    category: 'school',
    image: '/Images/HungerGames.png',
    liveUrl: 'https://github.com/tomaskotikk/Hunger-Games-2D',
    detailUrl: '#',
    status: 'Deployed',
    color: '#EF4444',
  },
  {
    id: 12,
    title: 'Discord Login',
    description: {
      cs: 'Moderní přihlašovací stránka inspirovaná Discordem s animacemi.',
      en: 'A modern Discord-inspired login page with animations.',
    },
    extendedDescription: {
      cs: 'Cvičný frontend projekt orientovaný na čistý vizuál, responzivitu a jemné animační efekty.',
      en: 'A frontend practice project focused on clean visuals, responsiveness, and subtle animations.',
    },
    tags: ['Fun', 'UI', 'Frontend'],
    category: 'fun',
    image: '/Images/discord.jpg',
    liveUrl: 'https://github.com/tomaskotikk/Discord-Login',
    detailUrl: '#',
    status: 'Deployed',
    color: '#7C3AED',
  },
  {
    id: 13,
    title: 'State API',
    description: {
      cs: 'Projekt využívající API pro informace o státech světa.',
      en: 'A project that uses an API to display information about countries around the world.',
    },
    extendedDescription: {
      cs: 'Školní projekt s REST API a databázovým backendem zaměřený na načítání, zpracování a zobrazení dat.',
      en: 'A school project with REST API and database backend focused on loading, processing, and presenting data.',
    },
    tags: ['School', 'API', 'Backend'],
    category: 'school',
    image: '/Images/State.jpg',
    liveUrl: 'https://github.com/tomaskotikk/state-api',
    detailUrl: '#',
    status: 'Deployed',
    color: '#06B6D4',
  },
  {
    id: 14,
    title: 'Typing Effect',
    description: {
      cs: 'Animovaný efekt psaní textu v JavaScriptu pro webové stránky.',
      en: 'An animated JavaScript typing effect for websites.',
    },
    extendedDescription: {
      cs: 'Malý cvičný projekt se zaměřením na plynulou animaci, časování a snadnou implementaci do libovolného webu.',
      en: 'A small practice project focused on smooth animation timing and easy integration into any website.',
    },
    tags: ['Fun', 'JavaScript', 'Animation'],
    category: 'fun',
    image: '/Images/TypingEffect.jpg',
    liveUrl: 'https://github.com/tomaskotikk/Typing-Text-Effect-Javascript',
    detailUrl: '#',
    status: 'Deployed',
    color: '#22C55E',
  },
  {
    id: 15,
    title: 'SQLite Application',
    description: {
      cs: 'Databázová aplikace ve SQLite s CRUD operacemi.',
      en: 'A SQLite database application with CRUD operations.',
    },
    extendedDescription: {
      cs: 'Školní konzolová aplikace zaměřená na správu dat, validace vstupu a základní databázové operace.',
      en: 'A school console app focused on data management, input validation, and basic database operations.',
    },
    tags: ['School', 'SQLite', 'CRUD'],
    category: 'school',
    image: '/Images/Sql-Lite.jpg',
    liveUrl: 'https://github.com/tomaskotikk/SQL-Lite---Application',
    detailUrl: '#',
    status: 'Deployed',
    color: '#84CC16',
  },
];

export const academic = {
  degree: {
    cs: 'Střední škola',
    en: 'High School',
  },
  major: {
    cs: 'Vývoj multimediálních aplikací a počítačových her',
    en: 'Multimedia Applications and Game Development',
  },
  institution: {
    cs: 'Creative Hill College, Zlin',
    en: 'Creative Hill College, Zlin',
  },
  period: {
    cs: '2023 - současnost',
    en: '2023 - present',
  },
  timeline: [
    {
      id: '01',
      year: { cs: '1. ročník', en: 'Year 1' },
      title: { cs: 'Základy', en: 'Foundations' },
      focus: { cs: 'Programovací základy', en: 'Programming fundamentals' },
      concepts: {
        cs: ['OOP', 'Algoritmy', 'Základy webu'],
        en: ['OOP', 'Algorithms', 'Web fundamentals'],
      },
      stack: ['Java', 'HTML', 'CSS'],
      project: {
        cs: 'První školní projekty zaměřené na logiku programu a frontendové základy.',
        en: 'First school projects focused on programming logic and front-end basics.',
      },
      icon: 'code',
    },
    {
      id: '02',
      year: { cs: '2. ročník', en: 'Year 2' },
      title: { cs: 'Systémy a databáze', en: 'Systems and Databases' },
      focus: { cs: 'Datová architektura', en: 'Data architecture' },
      concepts: {
        cs: ['SQL', 'Návrh databází', 'Integrace systémů'],
        en: ['SQL', 'Database design', 'Systems integration'],
      },
      stack: ['Java', 'MySQL', 'JavaScript'],
      project: {
        cs: 'Objective Tennis Counter a Java Bank System jako praktické školní projekty.',
        en: 'Objective Tennis Counter and Java Bank System as practical school projects.',
      },
      icon: 'database',
    },
    {
      id: '03',
      year: { cs: '3. ročník', en: 'Year 3' },
      title: { cs: 'Reálné projekty a praxe', en: 'Real Projects and Practice' },
      focus: { cs: 'Webové aplikace', en: 'Web applications' },
      concepts: {
        cs: ['Zakázková dodávka', 'Responsive UI', 'Deploy'],
        en: ['Client delivery', 'Responsive UI', 'Deployment'],
      },
      stack: ['React', 'Node.js', 'Vite', 'GitHub'],
      project: {
        cs: 'TeamPulse a klientské weby včetně Kostkopark a Rugby Kemp.',
        en: 'TeamPulse and client websites including Kostkopark and Rugby Camp.',
      },
      internship: {
        cs: 'Praxe v roce 2025 byla hodnocena jako Firma roku.',
        en: 'The 2025 internship was recognized as Company of the Year.',
      },
      status: { cs: 'Aktivní', en: 'Active' },
      icon: 'layers',
    },
    {
      id: '04',
      year: { cs: 'Studium a růst', en: 'Study and Growth' },
      title: { cs: 'Profesní růst', en: 'Professional Growth' },
      focus: { cs: 'Nepřetržitý vývoj', en: 'Continuous development' },
      status: { cs: 'Stavím a učím se', en: 'Building and learning' },
      deepDives: {
        cs: ['Moderní React', 'Backend architektura', 'Kvalitní UX'],
        en: ['Modern React', 'Backend architecture', 'Quality UX'],
      },
      goal: {
        cs: 'Propojit školní znalosti s reálnými klientskými a produkčními projekty.',
        en: 'Connect school knowledge with real client and production projects.',
      },
      icon: 'activity',
    },
    {
      id: '05',
      year: { cs: 'Praxe', en: 'Internship' },
      title: { cs: 'Monet+', en: 'Monet+' },
      focus: { cs: 'Firemní praxe', en: 'Company practice' },
      internship: {
        cs: '2 týdny na praxích ve firmě Monet+.',
        en: '2 weeks of internship practice at Monet+.',
      },
      status: { cs: 'Dokončeno', en: 'Completed' },
      icon: 'layers',
    },
  ],
};

export const navLinks = {
  cs: [
    { label: 'Domů', href: '#home' },
    { label: 'O mně', href: '#about' },
    { label: 'Vzdělání', href: '#academic' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Kontakt', href: '#contact' },
  ],
  en: [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Education', href: '#academic' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Contact', href: '#contact' },
  ],
};
