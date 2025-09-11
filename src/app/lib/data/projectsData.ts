export interface BaseProject {
  id: string
  name: string
  description: string
  longDescription: string
  image: string
  screenshots?: string[]
  tags: string[]
  github: string
  date: string
  features: string[]
  technologies: string[]
  type: "web" | "mobile"
}

export interface WebProject extends BaseProject {
  type: "web"
  liveUrl: string
}

export interface MobileProject extends BaseProject {
  type: "mobile"
  platforms?: ("iOS" | "Android")[]
  apkLink?: string
  playStore?: string
}

export type Project = WebProject | MobileProject

export type ProjectsData = {
  [key: string]: Project
}

export const projectsData: ProjectsData = {
  pharmaplan: {
    id: "pharmaplan",
    name: "PharmaPlan",
    description:
      "A comprehensive health solution platform providing medical services and pharmaceutical products online.",
    longDescription:
      "PharmaPlan is a pioneering online platform at the forefront of digital healthcare solutions. It seamlessly connects patients with healthcare providers and pharmaceutical services in one integrated ecosystem. The platform features an intuitive user interface that allows users to schedule appointments, consult with healthcare professionals, order prescription medications, and access personalized health information securely.",
    image: "/projects/PharmaPlan/PharmaPlan.png",
    screenshots: [
      "/projects/PharmaPlan/PharmaPlan.png",
      "/projects/PharmaPlan/PharmaPlan-login.png",
      "/projects/PharmaPlan/PharmaPlan-planner.png",
      "/projects/PharmaPlan/PharmaPlan-medicine.png",
    ],
    tags: ["Front-end", "React", "Tailwind CSS"],
    github: "https://github.com/Bas77/pharmaplan",
    liveUrl: "https://pharmaplan.vercel.app/",
    date: "June 2024",
    features: [
      "Implements React Hooks like useState and useEffect for state and lifecycle management",
      "Responsive design for all devices",
    ],
    technologies: [
      "Figma for early design prototype",
      "React.js for frontend development",
      "SASS CSS for styling",
    ],
    type: "web",
  },
  theknowledgecache: {
    id: "theknowledgecache",
    name: "The Knowledge Cache",
    description:
      "A flashcard learning app with full CRUD functionality powered by Supabase. Users can create, edit, delete, and review personalized flashcard sets.",
    longDescription:
      "A flashcard learning app with full CRUD functionality powered by Supabase. Users can create, edit, delete, and review personalized flashcard sets",
    image: "/projects/KnowledgeCache/KnowledgeCache.jpg",
    screenshots: [
      "/projects/KnowledgeCache/KnowledgeCache.jpg",
      "/projects/KnowledgeCache/KnowledgeCache-flashcard.jpg",
      "/projects/KnowledgeCache/KnowledgeCache-learn.jpg",
      "/projects/KnowledgeCache/KnowledgeCache-profile.jpg",
    ],
    tags: ["React Native", "Supabase", "CRUD"],
    github: "https://github.com/Bas77/the-knowledge-cache",
    apkLink: "https://expo.dev/accounts/bas77/projects/the-knowledge-cache/builds/8f6d938b-adbc-4294-a97f-3e7e93fe275f",
    date: "February 2025",
    features: [
      "Authentication and role-based access control using Supabase Auth",
      "Full CRUD operations on flashcards via Supabase Database (PostgreSQL)",
      "Clean mobile-first UI with animated transitions and dark mode support",
      "Navigation with stack/tab integration using React Navigation",
    ],
    technologies: [
      "React Native with TypeScript",
      "Expo for cross-platform development and builds",
      "Supabase for authentication and cloud database (PostgreSQL)",
      "React Navigation for routing and screen transitions",
    ],
    type: "mobile",
  },
  portfolio: {
    id: "portfolio",
    name: "Personal Portfolio",
    description: "My personal portfolio website showcasing projects and skills, built with Next.js.",
    longDescription:
      "My personal portfolio website showcasing projects and skills, built with Next.js.",
    image: "/projects/Portfolio/Portfolio.png",
    screenshots: [
      "/projects/Portfolio/Portfolio.png",
      "/projects/Portfolio/Portfolio-projects.png",
    ],
    tags: ["Next.js", "Tailwind CSS"],
    github: "https://github.com/Bas77/portfolio-app",
    liveUrl: "#",
    date: "April 2025",
    features: [
      "Public message board powered by Firebase for real-time community interaction",
      "Settings context for managing user preferences, such as theme and background toggles",
      "Clean mobile-first UI with animated transitions and dark mode support",
      "Navigation with stack/tab integration using React Navigation",
    ],
    technologies: [
      "Next.js with TypeScript",
      "Tailwind CSS for styling",
      "React Navigation for routing and screen transitions",
    ],
    type: "web",
  },
  threejstest: {
    id: "threejstest",
    name: "Text Particle Animation",
    description: "A website where I test the functionality of Three.js. These particles respond to user input like mouse movement or clicking.",
    longDescription:
      "A website where I test the functionality of Three.js. These particles respond to user input like mouse movement or clicking.",
    image: "/projects/TextParticle/TextParticle.png",
    screenshots: [
      "/projects/TextParticle/TextParticle.png",
    ],
    tags: ["Three.js"],
    github: "https://github.com/Bas77/threejs-text-particle",
    liveUrl: "https://bas77-threejs-test.vercel.app",
    date: "April 2025",
    features: [
      "Authentication and role-based access control using Supabase Auth",
      "Full CRUD operations on flashcards via Supabase Database (PostgreSQL)",
      "Clean mobile-first UI with animated transitions and dark mode support",
      "Navigation with stack/tab integration using React Navigation",
    ],
    technologies: [
      "Three.js for particle rendering",
    ],
    type: "web",
  },
  binuschessclub: {
    id: "binuschessclub",
    name: "BINUS Chess Club Website",
    description: "A modern, responsive web application developed for Bina Nusantara University’s collegiate chess club.",
    longDescription:
      "An official website for BINUS' collegiate chess club.",
    image: "/projects/BCC/BCC.png",
    screenshots: [
      "/projects/BCC/BCC.png",
      "/projects/BCC/BCC-About.png",
      "/projects/BCC/BCC-Teams.png",
      "/projects/BCC/BCC-Events.png",
    ],
    tags: ["React Native", "Tailwind CSS"],
    github: "https://github.com/mzf11125/binus-chess-knight-club",
    liveUrl: "https://www.binuschess.club/",
    date: "July 2025",
    features: [
      "Navigation with stack/tab integration using React Navigation",
    ],
    technologies: [
      "Next.js with TypeScript",
      "Lovable for assisting with automation tasks",
    ],
    type: "web",
  },
}

// Helper function to get tag colors
export function getTagColor(tag: string, opacity = 1): string {
  const colors: Record<string, string> = {
    "Front-end": `rgba(79, 70, 229, ${opacity})`,
    React: `rgba(20, 184, 166, ${opacity})`,
    "React Native": `rgba(20, 184, 166, ${opacity})`,
    "Tailwind CSS": `rgba(6, 182, 212, ${opacity})`,
    TypeScript: `rgba(59, 130, 246, ${opacity})`,
    "D3.js": `rgba(249, 115, 22, ${opacity})`,
    "Power BI": `rgba(234, 179, 8, ${opacity})`,
    Python: `rgba(59, 130, 246, ${opacity})`,
    "Machine Learning": `rgba(168, 85, 247, ${opacity})`,
    NLP: `rgba(236, 72, 153, ${opacity})`,
    "Next.js": `rgba(0, 0, 0, ${opacity})`,
    "Three.js": `rgba(239, 68, 68, ${opacity})`,
    Mobile: `rgba(139, 92, 246, ${opacity})`,
    Flutter: `rgba(14, 165, 233, ${opacity})`,
    Firebase: `rgba(249, 115, 22, ${opacity})`,
    CRUD: `rgba(150, 114, 128, ${opacity})`,
    Supabase: `rgba(16, 185, 129, ${opacity})`,
    "Full-stack": `rgba(99, 102, 241, ${opacity})`,
    "SASS CSS": `rgba(232, 116, 156, ${opacity})`,
  }
  return colors[tag] || `rgba(107, 114, 128, ${opacity})`
}