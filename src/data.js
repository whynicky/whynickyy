import {assetUrl} from './asset-url.js';
export const projects = [
  {
    "id": "whynicky-studio",
    "name": "WHYNICKY STUDIO",
    "cover": "/projects/whynicky-studio/gallery/landing.webp",
    "coverAspect": 1.5319148936170213,
    "tag": "Web · Fashion storefront",
    "headline": "An editorial storefront for a concept clothing label.",
    "description": "A concept fashion storefront for the Fault Lines collection, combining campaign imagery, a shoppable lookbook and detailed product pages.",
    "focus": "Design & frontend",
    "features": [
      "A responsive homepage with full-screen campaign photography, selected pieces, studio fittings and an editorial lookbook.",
      "A 24-piece catalog with category filters, sorting and search. Product pages include front, back, model and detail views, size guides and outfit pairings.",
      "A browser-based shopping bag with persistent selections and a checkout preview."
    ],
    "statement": "An editorial storefront for a concept clothing label.",
    "images": [
      "/projects/whynicky-studio/gallery/landing.webp",
      "/projects/whynicky-studio/gallery/lookbook.webp",
      "/projects/whynicky-studio/gallery/mobile-home.webp"
    ],
    "aspect": 1.5319148936170213,
    "imageAspects": [
      1.5319148936170213,
      1.5319148936170213,
      0.46208530805687204
    ],
    "notes": [
      "Concept storefront with illustrative products and prices. Ordering, payments and shipping are not enabled."
    ],
    "stack": [
      "HTML",
      "CSS",
      "JavaScript",
      "Node.js"
    ],
    "contribution": "My contribution: Visual design, frontend implementation, responsive layouts and shopping interactions.",
    "links": [
      "https://whynicky.github.io/WHYNICKY-STUDIO/",
      "https://github.com/whynicky/WHYNICKY-STUDIO"
    ],
    "portrait": false
  },
  {
    "id": "chatra",
    "cover": "/projects/chatra/gallery/landing.webp",
    "coverAspect": 1440 / 940,
    "name": "Chatra",
    "tag": "Web & mobile · Education",
    "headline": "A learning platform for schools.",
    "description": "A learning platform for students, teachers and administrators, connecting the daily work of a class across web and mobile.",
    "focus": "Nuxt",
    "features": [
      "Classes, assignments, messages, calendars and study tools in one role-aware workspace.",
      "Nuxt and Flutter clients share a FastAPI service, keeping authentication and learning workflows consistent."
    ],
    "statement": "A learning platform for schools.",
    "images": [
      "/projects/chatra/gallery/lectures.webp",
      "/projects/chatra/gallery/subjects-mobile.webp"
    ],
    "aspect": 1440 / 940,
    "imageAspects": [
      1440 / 940,
      390 / 844
    ],
    "notes": [],
    "stack": [
      "Nuxt",
      "Vue",
      "Flutter",
      "FastAPI",
      "PostgreSQL"
    ],
    "contribution": "My contribution: Frontend, product UI and integration, bringing a broad set of tools into one classroom.",
    "links": [
      "https://github.com/whynicky/Chatra-Frontend-New"
    ],
    "portrait": false
  },
  {
    "id": "soyle",
    "cover": "/projects/soyle/cover.webp",
    "coverSmall": "/projects/soyle/cover-small.webp",
    "coverWidth": 1600,
    "coverAspect": 4096 / 3203,
    "name": "Söyle",
    "tag": "Web · Family practice",
    "headline": "Speech practice for children and parents.",
    "description": "A shared practice space for children and parents, with focused activities for the child and a separate view of goals and progress for the family.",
    "focus": "Next.js",
    "features": [
      "Short exercises, AAC communication, observations and history in role-separated flows.",
      "An inspectable, rule-based next-step planner with predefined rules instead of generative advice."
    ],
    "statement": "Speech practice for children and parents.",
    "images": [
      "/projects/soyle/screen-1.webp",
      "/projects/soyle/screen-2.webp"
    ],
    "aspect": 1.44,
    "imageAspects": [
      1.44,
      1.6
    ],
    "notes": [
      "Working product for further validation; not a clinically validated service."
    ],
    "stack": [
      "Next.js",
      "React",
      "TypeScript",
      "FastAPI"
    ],
    "contribution": "My contribution: Product design and full-stack implementation, including accessible family interactions.",
    "links": [
      "https://github.com/whynicky/Soyle"
    ],
    "portrait": false
  },
  {
    "id": "digital-urpaq",
    "name": "Digital Urpaq",
    "tag": "Web · Extracurricular education",
    "headline": "Programme discovery for students.",
    "description": "A competition-built platform helping students discover programmes, with a wider service direction for applications, schedules and staff workflows.",
    "focus": "Nuxt",
    "features": [
      "Public entry, authentication and programme catalogue state.",
      "A FastAPI service foundation for a role-aware education platform."
    ],
    "statement": "Programme discovery for students.",
    "images": [
      "/projects/digital-urpaq/screen-1.webp"
    ],
    "aspect": 1.6012084592145015,
    "imageAspects": [
      1.6012084592145015
    ],
    "notes": [
      "The wider service journey is still in development; not every workflow is production-complete."
    ],
    "stack": [
      "Nuxt",
      "Vue",
      "TypeScript",
      "FastAPI"
    ],
    "contribution": "My contribution: Full-stack team implementation, with a focus on the product flow.",
    "links": [
      "https://github.com/whynicky/Digital-urpaq"
    ],
    "portrait": false
  },
  {
    "id": "freelanceos",
    "name": "FreelanceOS",
    "tag": "Mobile · Interface prototype",
    "headline": "A finance dashboard for freelancers.",
    "description": "A finance concept for freelancers that separates income from money available to spend, bringing the state of their work into one compact dashboard.",
    "focus": "Interface concept",
    "features": [
      "Cash flow: Tax reserves and expenses alongside project payments.",
      "At a glance: Financial summaries that connect the numbers."
    ],
    "statement": "A finance dashboard for freelancers.",
    "images": [
      "/projects/freelanceos/screen-1.webp"
    ],
    "aspect": 0.44882860665844637,
    "imageAspects": [
      0.44882860665844637
    ],
    "notes": [
      "Not a released finance app. No production backend or payment integration is claimed."
    ],
    "stack": [],
    "contribution": "Work shown: Product concept and dashboard interface prototype.",
    "links": [],
    "portrait": true
  },
  {
    "id": "rugpull-risk",
    "name": "RugPull Risk",
    "tag": "Web · Token analysis",
    "headline": "Token risk analysis in one workspace.",
    "description": "A token-scanning workspace that brings contract, on-chain, social and holder signals together, making scattered risk information easier to read.",
    "focus": "Nuxt 3",
    "features": [
      "A responsive Nuxt frontend organized around a token.",
      "Separate frontend and backend repositories for presenting and collecting signals."
    ],
    "statement": "Token risk analysis in one workspace.",
    "images": [
      "/projects/rugpull-risk/screen-1.webp"
    ],
    "aspect": 1.6666666666666667,
    "imageAspects": [
      1.6666666666666667
    ],
    "notes": [
      "Risk indicators are not a guarantee of safety or investment advice."
    ],
    "stack": [
      "Nuxt 3",
      "API integration"
    ],
    "contribution": "Work shown: The scanner interface and its API-connected frontend.",
    "links": [
      "https://github.com/whynicky/RugPull-Frontend",
      "https://github.com/whynicky/RugPull-Backend"
    ],
    "portrait": false
  },
  {
    "id": "forge",
    "cover": "/projects/forge/gallery/landing.webp",
    "coverAspect": 1440 / 940,
    "name": "FORGE",
    "tag": "Web · Product planning",
    "headline": "Business problems turned into task packs.",
    "description": "A working product that turns an unstructured business problem into a task pack a team can review and act on.",
    "focus": "Nuxt",
    "features": [
      "Explicit inputs, expected outcomes and acceptance criteria before handoff.",
      "Accounts, role-based access, persistent data and an activity dashboard."
    ],
    "statement": "Business problems turned into task packs.",
    "images": [
      "/projects/forge/screen-1.webp"
    ],
    "aspect": 1.440576230492197,
    "imageAspects": [
      1.440576230492197
    ],
    "notes": [],
    "stack": [
      "Nuxt",
      "Vue",
      "FastAPI"
    ],
    "contribution": "Work shown: A connected Nuxt and FastAPI platform, from problem definition to an agreed brief. A live product is available to explore.",
    "links": [
      "https://forge-ai-sana.vercel.app",
      "https://github.com/whynicky/FORGE"
    ],
    "portrait": false
  },
  {
    "id": "portfolio-v2",
    "name": "Portfolio v2",
    "cover": "/projects/portfolio-v2/gallery/landing.webp",
    "coverAspect": 1.5319148936170213,
    "tag": "Web · Design & creative development",
    "headline": "A portfolio built around motion and project imagery.",
    "description": "A personal portfolio bringing frontend work, project galleries, experience and credentials into one responsive website.",
    "focus": "JavaScript & WebGL",
    "features": [
      "A WebGL portrait, animated page transitions and three layouts for browsing projects.",
      "Project galleries support scrolling, touch gestures and keyboard navigation, with responsive images loaded as they approach the viewport.",
      "Dedicated pages for experience, process, credentials and contact."
    ],
    "statement": "A portfolio built around motion and project imagery.",
    "images": [
      "/projects/portfolio-v2/gallery/landing.webp"
    ],
    "aspect": 1.5319148936170213,
    "imageAspects": [
      1.5319148936170213
    ],
    "notes": [],
    "stack": [
      "JavaScript",
      "Vite",
      "Three.js",
      "GSAP",
      "Lenis"
    ],
    "contribution": "My contribution: Visual design, frontend development, animation and responsive implementation.",
    "links": [
      "https://whynicky.github.io/whynickyy/",
      "https://github.com/whynicky/whynickyy"
    ],
    "portrait": false
  },
  {
    "id": "portfolio",
    "cover": "/projects/portfolio/gallery/landing.webp",
    "coverAspect": 1440 / 940,
    "name": "Portfolio v1",
    "tag": "Web · Design & frontend",
    "headline": "A portfolio built with HTML, CSS and JavaScript.",
    "description": "A buildless, multi-page portfolio for presenting interfaces, explaining product decisions and connecting visitors to the work behind them.",
    "focus": "HTML",
    "features": [
      "Shared navigation, responsive layouts and theme support.",
      "Pixel identity, paper-inspired visuals and authentic product imagery."
    ],
    "statement": "A portfolio built with HTML, CSS and JavaScript.",
    "images": [
      "/projects/portfolio/gallery/landing.webp"
    ],
    "aspect": 1440 / 940,
    "imageAspects": [
      1440 / 940
    ],
    "notes": [],
    "stack": [
      "HTML",
      "CSS",
      "JavaScript"
    ],
    "contribution": "My contribution: Interface system, frontend implementation and motion: native scrolling, reduced-motion alternatives and readable content without scripts.",
    "links": [
      "https://github.com/whynicky/Portfolio"
    ],
    "portrait": false
  },
  {
    "id": "chatra-mobile",
    "cover": "/projects/chatra-mobile/screen-1.webp",
    "coverAspect": 600 / 1300,
    "name": "Chatra mobile",
    "tag": "Mobile · Flutter client",
    "headline": "Chatra’s classroom tools in a Flutter app.",
    "description": "Chatra’s authentication, classroom, messaging and learning workflows, adapted to a narrow, touch-first screen.",
    "focus": "Flutter",
    "features": [
      "Focused subject and class lists with persistent navigation.",
      "Provider for client state and Dio for data access, using the shared product service."
    ],
    "statement": "Chatra’s classroom tools in a Flutter app.",
    "images": [
      "/projects/chatra-mobile/screen-1.webp",
      "/projects/chatra-mobile/screen-2.webp"
    ],
    "aspect": 0.46153846153846156,
    "imageAspects": [
      0.46153846153846156,
      0.46153846153846156
    ],
    "notes": [],
    "stack": [
      "Flutter",
      "Provider",
      "Dio"
    ],
    "contribution": "Work shown: The platform-specific mobile interface, presented alongside the connected web and API system.",
    "links": [
      "https://github.com/whynicky/Chatra-app-IOS"
    ],
    "portrait": true
  }
].map(project => ({...project, images: project.images.map(assetUrl), cover: project.cover ? assetUrl(project.cover) : null, coverSmall: project.coverSmall ? assetUrl(project.coverSmall) : null}));
export const github="https://github.com/whynicky";
