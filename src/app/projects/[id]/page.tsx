"use client"

import { useParams, notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Github, ExternalLink, Calendar, Code } from "lucide-react"
import { Key } from "react"

// Project data - in a real app, this would come from a database or API
const projectsData = {
  pharmaplan: {
    name: "PharmaPlan",
    description:
      "A comprehensive health solution platform providing medical services and pharmaceutical products online.",
    longDescription:
      "PharmaPlan is a pioneering online platform at the forefront of digital healthcare solutions. It seamlessly connects patients with healthcare providers and pharmaceutical services in one integrated ecosystem. The platform features an intuitive user interface that allows users to schedule appointments, consult with healthcare professionals, order prescription medications, and access personalized health information securely.",
    image: "/projects/PharmaPlan.png",
    tags: ["Front-end", "React"],
    github: "https://github.com/Bas77/pharmaplan",
    liveUrl: "https://pharmaplan.vercel.app/",
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
  },
  "data-viz": {
    name: "Data Visualization Dashboard",
    description: "Interactive dashboard for visualizing complex datasets with customizable charts and filters.",
    longDescription:
      "The Data Visualization Dashboard is a powerful tool designed to transform complex datasets into intuitive, interactive visual representations. Built with modern web technologies, it enables users to explore data through customizable charts, graphs, and maps. The dashboard supports real-time data updates and features advanced filtering capabilities to help users extract meaningful insights efficiently.",
    image: "/images/projects/data-viz.png",
    tags: ["TypeScript", "D3.js", "Power BI"],
    github: "https://github.com/Bas77/data-viz",
    liveUrl: "https://data-viz-demo.vercel.app",
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
  },
  "ai-chatbot": {
    name: "AI Chatbot Assistant",
    description:
      "Intelligent conversational agent built with natural language processing to assist users with queries.",
    longDescription:
      "The AI Chatbot Assistant is an advanced conversational agent powered by natural language processing and machine learning algorithms. It's designed to understand user queries, provide relevant information, and assist with various tasks through a natural, conversational interface. The chatbot continuously learns from interactions to improve its responses and can be integrated into websites, applications, or messaging platforms.",
    image: "/images/projects/ai-chatbot.png",
    tags: ["Python", "Machine Learning", "NLP"],
    github: "https://github.com/Bas77/ai-chatbot",
    liveUrl: "https://ai-chatbot-demo.vercel.app",
    date: "January 2024",
    features: [
      "Natural language understanding and processing",
      "Context-aware conversations",
      "Multi-language support",
      "Integration with knowledge bases",
      "Sentiment analysis for improved responses",
    ],
    technologies: [
      "Python for backend logic",
      "TensorFlow for machine learning models",
      "NLTK and spaCy for NLP",
      "FastAPI for API endpoints",
      "WebSockets for real-time communication",
    ],
  },
  portfolio: {
    name: "Personal Portfolio",
    description: "My personal portfolio website showcasing projects and skills, built with Next.js and Three.js.",
    longDescription:
      "This personal portfolio website serves as a digital showcase of my skills, projects, and professional journey. Built with Next.js and enhanced with Three.js for interactive elements, it features a modern, responsive design that highlights my work effectively. The site includes sections for projects, skills, and contact information, with special attention to user experience and performance optimization.",
    image: "/images/projects/portfolio.png",
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
  },
} as const

export default function ProjectDetail() {
  const { id } = useParams()
  if(!id){
    notFound()
  }
  const projectId = typeof id === "string" ? id : id[0]
  let project = null;
  if (projectId in projectsData) {
  project = projectsData[projectId as keyof typeof projectsData];
  // project is now safe to use
} else {
  notFound();
}

  if (!project) {
    notFound()
  }

  return (
    <div className="regular-page min-h-screen pt-24 pb-16 px-4 sm:px-6 md:px-8 lg:px-16">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/projects"
          className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Projects
        </Link>

        <h1 className="text-4xl font-bold mb-4">{project.name}</h1>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag: string, index: Key | null | undefined) => (
            <span
              key={index}
              className="px-3 py-1 text-sm rounded-full text-white"
              style={{
                backgroundColor: getTagColor(tag),
                boxShadow: `0 0 10px ${getTagColor(tag, 0.3)}`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="relative h-[400px] w-full rounded-xl overflow-hidden mb-8 border border-zinc-800">
          <Image src={project.image || "/placeholder.svg"} alt={project.name} fill className="object-cover" />
        </div>

        <div className="flex flex-wrap gap-6 mb-8">
          <div className="flex items-center text-gray-400">
            <Calendar size={18} className="mr-2" />
            <span>{project.date}</span>
          </div>

          <Link
            href={project.github}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={18} />
            <span>View Code</span>
          </Link>

          <Link
            href={project.liveUrl}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink size={18} />
            <span>Live Demo</span>
          </Link>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-gray-300 leading-relaxed">{project.longDescription}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Features</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              {project.features.map((feature: string, index: Key) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Technologies Used</h2>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech: string, index: Key) => (
                <div key={index} className="flex items-center bg-zinc-800 px-4 py-2 rounded-lg">
                  <Code size={16} className="mr-2 text-blue-400" />
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

// Helper function to get tag colors
function getTagColor(tag: string, opacity = 1) {

  return {
      "Front-end": `rgba(79, 70, 229, ${opacity})`,
      React: `rgba(20, 184, 166, ${opacity})`,
      "Tailwind CSS": `rgba(6, 182, 212, ${opacity})`,
      TypeScript: `rgba(59, 130, 246, ${opacity})`,
      "D3.js": `rgba(249, 115, 22, ${opacity})`,
      "Power BI": `rgba(234, 179, 8, ${opacity})`,
      Python: `rgba(59, 130, 246, ${opacity})`,
      "Machine Learning": `rgba(168, 85, 247, ${opacity})`,
      NLP: `rgba(236, 72, 153, ${opacity})`,
      "Next.js": `rgba(0, 0, 0, ${opacity})`,
      "Three.js": `rgba(239, 68, 68, ${opacity})`,
  }[tag] || `rgba(107, 114, 128, ${opacity})`
}
