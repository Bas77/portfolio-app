'use client'
import Link from "next/link"
import Image from "next/image"
import { Github, ExternalLink, Smartphone, Globe } from 'lucide-react'
import { Key, useEffect, useRef } from "react"
import { useSettings } from "../context/settings-context"
import { motion } from "framer-motion"

// Project data
interface Project{
    id: string,
    name: string,
    description: string,
    image: string,
    tags: string[],
    github: string,
    liveUrl: string
    type: string
}
const projects = [
  {
    id: "pharmaplan",
    name: "PharmaPlan",
    description: "A comprehensive health solution platform providing medical services and pharmaceutical products online.",
    image: "/projects/PharmaPlan/PharmaPlan.png",
    tags: ["Front-end", "React", "SASS CSS"],
    github: "https://github.com/Bas77/pharmaplan",
    liveUrl: "https://pharmaplan.vercel.app/",
    type: "web"
  },
  {
    id: "theknowledgecache",
    name: "The Knowledge Cache",
    description: "A flashcard learning app with full CRUD functionality powered by Supabase. Users can create, edit, delete, and review personalized flashcard sets.",
    image: "/projects/KnowledgeCache/KnowledgeCache.jpg",
    tags: ["Full-stack", "React Native", "Supabase", "CRUD"],
    github: "https://github.com/Bas77/data-viz",
    liveUrl: "https://data-viz-demo.vercel.app",
    type: "mobile"
  },
  {
    id: "portfolio",
    name: "Personal Portfolio",
    description: "My personal portfolio website showcasing projects and skills, built with Next.js and Three.js.",
    image: "/projects/Portfolio/Portfolio.png",
    tags: ["Next.js", "Tailwind CSS"],
    github: "https://github.com/Bas77/portfolio",
    liveUrl: "#",
    type: "web"
  }
]

export default function ProjectsPage() {
  const {isLenisEnabled} = useSettings()
  const lenisRef = useRef<any>(null)
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    let raf: (time: number) => void;

    const initLenis = async () => {
      const Lenis = (await import("lenis")).default;

      const wrapper = document.getElementById("lenis-wrapper");
      const content = document.getElementById("lenis-content");

      // We probably don't need this
      if (!(wrapper instanceof HTMLElement) || !(content instanceof HTMLElement)) {
        console.warn("Lenis wrapper or content not found.");
        return;
      }

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        wrapper,
        content,
      });

      lenisRef.current = lenis;

      // RAF with conditional enable check
      raf = (time: number) => {
        if (isLenisEnabled && lenisRef.current) {
          lenisRef.current.raf(time);
        }
        animationFrameRef.current = requestAnimationFrame(raf);
      };
      animationFrameRef.current = requestAnimationFrame(raf);


      // Cleanup function
      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        lenis.destroy?.();
      };
    };

    if (isLenisEnabled) {
      const cleanupPromise = initLenis();
      return () => {
        cleanupPromise.then((cleanup) => {
          if (typeof cleanup === "function") cleanup();
        });
      };
    } else {
      // Disable Lenis manually if already running
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      if (lenisRef.current?.destroy) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    }
  }, [isLenisEnabled]);

    
  return (
    <div id='lenis-wrapper' className="h-screen w-screen overflow-y-auto overflow-x-hidden">
    <div id='lenis-content' className="will-change-transform"></div>
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 md:px-8 lg:px-16 caret-transparent ">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Projects</h1>
        <p className="text-gray-400 mb-12 max-w-2xl">
          A collection of my recent work and personal projects. Each project represents different skills and technologies I&apos;ve worked with.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
      <motion.footer
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mt-20 py-10 border-t border-zinc-800 text-center text-zinc-500 text-sm"
      >
        <p>You've reached the end</p>
        <p className="mt-2">Scroll back up to explore more projects!</p>
        {/* <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="mt-4 px-4 py-2 text-sm text-white bg-zinc-800 rounded hover:bg-zinc-700 transition"
        >
           Back to Top ↑
        </button> */}
      </motion.footer>
    </div>
    </div>
    
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="bg-zinc-900/80 rounded-xl overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-all duration-300 group h-full flex flex-col">
      {/* Project Name at the top */}
      <div className="p-5 border-b border-zinc-800 flex justify-between items-center">
        <div className="flex items-center gap-2">
          {project.type === "mobile" ? (
            <Smartphone size={18} className="text-purple-400" />
          ) : (
            <Globe size={18} className="text-blue-400" />
          )}
          <h2 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{project.name}</h2>
        </div>
      </div>
      
      {/* Project Image */}
       <div className="relative h-64 overflow-hidden">
        {project.type === "mobile" ? (
          <div className="w-full h-full flex justify-center items-center bg-gradient-to-b from-zinc-900 to-black">
            <div className="relative w-[140px] h-[280px]">
              {/* Phone Frame */}
              <div className="absolute inset-0 rounded-[24px] border-[6px] border-zinc-800 bg-black z-10"></div>
              {/* Screen Content */}
              <div className="absolute inset-[6px] rounded-[18px] overflow-hidden z-20">
                <Image src={project.image || "/placeholder.svg"} alt={project.name} fill className="object-cover" />
              </div>
              {/* Notch */}
              <div className="absolute top-[6px] left-1/2 transform -translate-x-1/2 w-[50px] h-[15px] bg-zinc-800 rounded-b-xl z-30"></div>
            </div>
          </div>
        ) : (
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex-grow" />
      {/* Project Details */}
      <div className="p-5" >
        <div className="flex justify-center">
          <p className="text-gray-300 mb-4 ">{project.description}</p>
        </div>
        <div className="flex-grow" />
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
        <div className="flex justify-between  items-center">
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
          <Link
            href={`/projects/${project.id}`}
            className="bg-zinc-800 hover:bg-zinc-700 text-gray-300 hover:text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-1 text-sm font-medium border border-zinc-700 hover:border-zinc-600 group"
          >
            <span>View More</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-1 transform group-hover:translate-x-1 transition-transform duration-300"
            >
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
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
