import Link from "next/link"
import Image from "next/image"
import { Github, ExternalLink } from 'lucide-react'
import { Key } from "react"

// Project data
interface Project{
    id: string,
    name: string,
    description: string,
    image: string,
    tags: string[],
    github: string,
    liveUrl: string
}
const projects = [
  {
    id: "pharmaplan",
    name: "PharmaPlan",
    description: "A comprehensive health solution platform providing medical services and pharmaceutical products online.",
    image: "/projects/PharmaPlan.png",
    tags: ["Front-end", "React", "Tailwind CSS"],
    github: "https://github.com/Bas77/pharmaplan",
    liveUrl: "https://pharmaplan.vercel.app/",
  },
  {
    id: "data-viz",
    name: "Data Visualization Dashboard",
    description: "Interactive dashboard for visualizing complex datasets with customizable charts and filters.",
    image: "/images/projects/data-viz.png",
    tags: ["TypeScript", "D3.js", "Power BI"],
    github: "https://github.com/Bas77/data-viz",
    liveUrl: "https://data-viz-demo.vercel.app",
  },
  {
    id: "ai-chatbot",
    name: "AI Chatbot Assistant",
    description: "Intelligent conversational agent built with natural language processing to assist users with queries.",
    image: "/images/projects/ai-chatbot.png",
    tags: ["Python", "Machine Learning", "NLP"],
    github: "https://github.com/Bas77/ai-chatbot",
    liveUrl: "https://ai-chatbot-demo.vercel.app",
  },
  {
    id: "portfolio",
    name: "Personal Portfolio",
    description: "My personal portfolio website showcasing projects and skills, built with Next.js and Three.js.",
    image: "/images/projects/portfolio.png",
    tags: ["Next.js", "Three.js", "Tailwind CSS"],
    github: "https://github.com/Bas77/portfolio",
    liveUrl: "#",
  }
]

export default function ProjectsPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Projects</h1>
        <p className="text-gray-400 mb-12 max-w-2xl">
          A collection of my recent work and personal projects. Each project represents different skills and technologies I've worked with.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="bg-zinc-900/80 rounded-xl overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-all duration-300 group">
      {/* Project Name at the top */}
      <div className="p-5 border-b border-zinc-800">
        <h2 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
          {project.name}
        </h2>
      </div>
      
      {/* Project Image */}
      <div className="relative h-64 overflow-hidden">
        <Image 
          src={project.image || "/placeholder.svg"} 
          alt={project.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      
      {/* Project Details */}
      <div className="p-5">
        <p className="text-gray-300 mb-4">{project.description}</p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.map((tag: string, index: Key | null | undefined) => (
            <span 
              key={index} 
              className="px-3 py-1 text-sm rounded-full text-white"
              style={{ 
                backgroundColor: getTagColor(tag),
                boxShadow: `0 0 10px ${getTagColor(tag, 0.3)}`
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Links */}
        <div className="flex gap-4">
          <Link 
            href={project.github} 
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={18} />
            <span>Code</span>
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
      </div>
    </div>
  )
}

// Helper function to get tag colors
function getTagColor(tag: string, opacity = 1) {
  
  return {
      "Front-end": `rgba(79, 70, 229, ${opacity})`,
      "React": `rgba(20, 184, 166, ${opacity})`,
      "Tailwind CSS": `rgba(6, 182, 212, ${opacity})`,
      "TypeScript": `rgba(59, 130, 246, ${opacity})`,
      "D3.js": `rgba(249, 115, 22, ${opacity})`,
      "Power BI": `rgba(234, 179, 8, ${opacity})`,
      "Python": `rgba(59, 130, 246, ${opacity})`,
      "Machine Learning": `rgba(168, 85, 247, ${opacity})`,
      "NLP": `rgba(236, 72, 153, ${opacity})`,
      "Next.js": `rgba(0, 0, 0, ${opacity})`,
      "Three.js": `rgba(239, 68, 68, ${opacity})`,
  }[tag] || `rgba(107, 114, 128, ${opacity})`
}
