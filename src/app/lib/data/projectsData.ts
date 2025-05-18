// lib/data/projectsData.ts

export const projectsData = {
  pharmaplan: {
    id: "pharmaplan",
    name: "PharmaPlan",
    description:
      "A comprehensive health solution platform providing medical services and pharmaceutical products online.",
    longDescription:
      "PharmaPlan is a pioneering online platform at the forefront of digital healthcare solutions. It seamlessly connects patients with healthcare providers and pharmaceutical services in one integrated ecosystem. The platform features an intuitive user interface that allows users to schedule appointments, consult with healthcare professionals, order prescription medications, and access personalized health information securely.",
    image: "/images/projects/pharmaplan.png",
    screenshots: [
      "/images/projects/pharmaplan.png",
      "/images/projects/pharmaplan-dashboard.png",
      "/images/projects/pharmaplan-appointments.png",
      "/images/projects/pharmaplan-profile.png",
    ],
    tags: ["Front-end", "React", "Tailwind CSS"],
    github: "https://github.com/Bas77/pharmaplan",
    liveUrl: "https://pharmaplan-demo.vercel.app",
    date: "March 2023",
    features: [
      "User-friendly appointment scheduling system",
      "Secure patient-doctor communication portal",
      "Integrated prescription management",
      "Personalized health recommendations",
      "Responsive design for all devices",
    ],
    technologies: [
      "React.js for frontend development",
      "Tailwind CSS for styling",
      "Node.js backend with Express",
      "MongoDB for database management",
      "JWT for authentication",
    ],
    type: "web",
  },
  theknowledgecache: {
    id: "theknowledgecache",
    name: "Data Visualization Dashboard",
    description: "Interactive dashboard for visualizing complex datasets with customizable charts and filters.",
    longDescription:
      "A flashcard learning app with full CRUD functionality powered by Supabase. Users can create, edit, delete, and review personalized flashcard sets",
    image: "/images/projects/data-viz.png",
    screenshots: [
      "/images/projects/data-viz.png",
      "/images/projects/data-viz-charts.png",
      "/images/projects/data-viz-filters.png",
      "/images/projects/data-viz-reports.png",
    ],
    tags: ["TypeScript", "D3.js", "Power BI"],
    github: "https://github.com/Bas77/data-viz",
    appStore: "https://apps.apple.com/app/fittrack",
    playStore: "https://play.google.com/store/apps/details?id=com.bas77.fittrack",
    date: "November 2023",
    features: [
      "Interactive data visualization components",
      "Real-time data updates and streaming",
      "Advanced filtering and search capabilities",
      "Export functionality for reports",
      "Customizable dashboard layouts",
    ],
    technologies: [
      "TypeScript for type-safe code",
      "D3.js for custom visualizations",
      "React for UI components",
      "Redux for state management",
      "Power BI integration for advanced analytics",
    ],
    type: "mobile",
  },
  "fitness-tracker": {
    id: "fitness-tracker",
    name: "FitTrack",
    description: "A fitness tracking mobile app that helps users monitor workouts, nutrition, and health goals.",
    longDescription:
      "FitTrack is a comprehensive fitness tracking mobile application designed to help users achieve their health and fitness goals. The app provides detailed tracking for workouts, nutrition, and overall health metrics in an intuitive interface. Users can create custom workout plans, log their daily activities, track calorie intake, and monitor progress over time with visual charts and statistics.",
    image: "/images/projects/fitness-app.png",
    screenshots: [
      "/images/projects/fitness-app-1.png",
      "/images/projects/fitness-app-2.png",
      "/images/projects/fitness-app-3.png",
    ],
    tags: ["React Native", "Mobile", "Firebase"],
    github: "https://github.com/Bas77/fittrack",
    appStore: "https://apps.apple.com/app/fittrack",
    playStore: "https://play.google.com/store/apps/details?id=com.bas77.fittrack",
    date: "June 2023",
    features: [
      "Personalized workout planning and tracking",
      "Nutrition diary with calorie and macro tracking",
      "Progress visualization with charts and graphs",
      "Goal setting and achievement tracking",
      "Social sharing and community challenges",
      "Integration with health devices and wearables",
    ],
    technologies: [
      "React Native for cross-platform development",
      "Firebase for backend and authentication",
      "Redux for state management",
      "Victory Charts for data visualization",
      "Native device APIs for health data integration",
    ],
    type: "mobile",
    platforms: ["iOS", "Android"],
  },
  portfolio: {
    id: "portfolio",
    name: "Personal Portfolio",
    description: "My personal portfolio website showcasing projects and skills, built with Next.js and Three.js.",
    longDescription:
      "This personal portfolio website serves as a digital showcase of my skills, projects, and professional journey. Built with Next.js and enhanced with Three.js for interactive elements, it features a modern, responsive design that highlights my work effectively. The site includes sections for projects, skills, and contact information, with special attention to user experience and performance optimization.",
    image: "/images/projects/portfolio.png",
    screenshots: [
      "/images/projects/portfolio.png",
      "/images/projects/portfolio-projects.png",
      "/images/projects/portfolio-skills.png",
      "/images/projects/portfolio-contact.png",
    ],
    tags: ["Next.js", "Three.js", "Tailwind CSS"],
    github: "https://github.com/Bas77/portfolio",
    liveUrl: "#",
    date: "April 2024",
    features: [
      "Interactive 3D elements and animations",
      "Responsive design for all screen sizes",
      "Dark mode and accessibility features",
      "Project showcase with detailed information",
      "Contact form with validation",
    ],
    technologies: [
      "Next.js for server-side rendering",
      "Three.js for 3D graphics and animations",
      "Tailwind CSS for styling",
      "Framer Motion for transitions",
      "Vercel for deployment and hosting",
    ],
    type: "web",
  },
} as const;

export type ProjectId = keyof typeof projectsData;
export type Project = (typeof projectsData)[ProjectId];
