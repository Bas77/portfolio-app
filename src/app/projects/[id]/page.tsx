"use client"

import { useParams, notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { ArrowLeft, Github, ExternalLink, Calendar, Code, Smartphone, Globe } from "lucide-react"
// import type { WebProject, MobileProject, ProjectsData } from "../../types/project"
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
// Project data - in a real app, this would come from a database or API
const projectsData: ProjectsData = {
  pharmaplan: {
    id: "pharmaplan",
    name: "PharmaPlan",
    description:
      "A comprehensive health solution platform providing medical services and pharmaceutical products online.",
    longDescription:
      "PharmaPlan is a pioneering online platform at the forefront of digital healthcare solutions. It seamlessly connects patients with healthcare providers and pharmaceutical services in one integrated ecosystem. The platform features an intuitive user interface that allows users to schedule appointments, consult with healthcare professionals, order prescription medications, and access personalized health information securely.",
    image: "/images/projects/pharmaplan.png",
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
    description: "A flashcard learning app with full CRUD functionality powered by Supabase. Users can create, edit, delete, and review personalized flashcard sets.",
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
    github: "https://github.com/Bas77/data-viz",
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
    id: "portolio",
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
      "Lorem ipsum for lorem ipsum",
    ],
    type: "web",
  },
}

export default function ProjectDetail() {
  const { id } = useParams()
  if(!id){
    notFound()
  }
  const projectId = typeof id === "string" ? id : id[0]

  const project = projectsData[projectId]

  if (!project) {
    notFound()
  }

  // Render different layouts based on project type
  return project.type === "mobile" ? (
    <MobileAppDetail project={project as MobileProject} />
  ) : (
    <WebProjectDetail project={project as WebProject} />
  )
}

interface WebProjectDetailProps {
  project: WebProject
}

function WebProjectDetail({ project }: WebProjectDetailProps) {
  const [activeScreenshot, setActiveScreenshot] = useState(0)
  const screenshots = project.screenshots || [project.image]

  return (
    <div className="regular-page min-h-screen pt-24 pb-16 px-4 sm:px-6 md:px-8 lg:px-16">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/projects"
          className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Projects
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <Globe size={20} className="text-blue-400" />
          <h1 className="text-4xl font-bold">{project.name}</h1>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag, index) => (
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

        {/* Screenshot Gallery */}
        <div className="mb-12">
          {/* Main Screenshot Display */}
          <div className="relative h-[500px] w-full rounded-xl overflow-hidden mb-4 border border-zinc-800 bg-zinc-900">
            <Image
              src={screenshots[activeScreenshot] || "/placeholder.svg"}
              alt={`${project.name} screenshot ${activeScreenshot + 1}`}
              fill
              className="object-contain"
            />
          </div>

          {/* Screenshot Thumbnails */}
          {screenshots.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
              {screenshots.map((screenshot, index) => (
                <button
                  key={index}
                  onClick={() => setActiveScreenshot(index)}
                  className={`relative w-32 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                    activeScreenshot === index ? "border-blue-500 scale-105" : "border-zinc-700"
                  }`}
                >
                  <Image
                    src={screenshot || "/placeholder.svg"}
                    alt={`${project.name} thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
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
              {project.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Technologies Used</h2>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech, index) => (
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

interface MobileAppDetailProps {
  project: MobileProject
}

function MobileAppDetail({ project }: MobileAppDetailProps) {
  const [activeScreenshot, setActiveScreenshot] = useState(0)
  const screenshots = project.screenshots || [project.image]

  return (
    <div className="regular-page min-h-screen pt-24 pb-16 px-4 sm:px-6 md:px-8 lg:px-16">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/projects"
          className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Projects
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <Smartphone size={20} className="text-purple-400" />
          <h1 className="text-4xl font-bold">{project.name}</h1>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag, index) => (
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

        {/* Mobile App Showcase */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            {/* Main Phone Display */}
            <div className="relative w-[280px] h-[560px] flex-shrink-0">
              {/* Phone Frame */}
              <div className="absolute inset-0 rounded-[36px] border-[12px] border-zinc-800 bg-black z-10 shadow-lg"></div>

              {/* Screen Content */}
              <div className="absolute inset-[12px] rounded-[24px] overflow-hidden z-20">
                <Image
                  src={screenshots[activeScreenshot] || "/placeholder.svg"}
                  alt={`${project.name} screenshot ${activeScreenshot + 1}`}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Notch */}
              {/* <div className="absolute top-[12px] left-1/2 transform -translate-x-1/2 w-[120px] h-[30px] bg-zinc-800 rounded-b-xl z-30"></div> */}

              {/* Home Indicator */}
              {/* <div className="absolute bottom-[22px] left-1/2 transform -translate-x-1/2 w-[100px] h-[5px] bg-zinc-600 rounded-full z-30"></div> */}
            </div>

            {/* App Details */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-4">About the App</h2>
              <p className="text-gray-300 leading-relaxed mb-6">{project.longDescription}</p>

              {/* App Store Links */}
              <div className="flex flex-wrap gap-4 mb-8">
                {project.apkLink && (
                  <Link
                    href={project.apkLink}
                    className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 border border-zinc-700"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M4.42 20.1c.14.08.31.11.49.11.34 0 .69-.11.98-.31l8.49-4.7-2.2-2.2-7.76 7.1Zm-.01-16.2c-.02.34.11.69.34.98l7.76 7.07 2.2-2.2-8.49-4.7c-.29-.2-.64-.31-.98-.31-.18 0-.35.03-.49.11l-.34.19v-1.14Z" />
                      <path d="M20.04 10.35 18.3 9.36l-2.25 2.25 2.25 2.25 1.74-.99c.52-.29.84-.84.84-1.43s-.32-1.14-.84-1.43v-.66Z" />
                      <path d="m4.75 4.88 7.75 7.07 2.2-2.2-8.49-4.7c-.29-.2-.64-.31-.98-.31-.18 0-.35.03-.49.11l.01.03Z" />
                    </svg>
                    <span>APK Install</span>
                  </Link>
                )}

                {project.playStore && (
                  <Link
                    href={project.playStore}
                    className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 border border-zinc-700"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M4.42 20.1c.14.08.31.11.49.11.34 0 .69-.11.98-.31l8.49-4.7-2.2-2.2-7.76 7.1Zm-.01-16.2c-.02.34.11.69.34.98l7.76 7.07 2.2-2.2-8.49-4.7c-.29-.2-.64-.31-.98-.31-.18 0-.35.03-.49.11l-.34.19v-1.14Z" />
                      <path d="M20.04 10.35 18.3 9.36l-2.25 2.25 2.25 2.25 1.74-.99c.52-.29.84-.84.84-1.43s-.32-1.14-.84-1.43v-.66Z" />
                      <path d="m4.75 4.88 7.75 7.07 2.2-2.2-8.49-4.7c-.29-.2-.64-.31-.98-.31-.18 0-.35.03-.49.11l.01.03Z" />
                    </svg>
                    <span>Play Store</span>
                  </Link>
                )}

                <Link
                  href={project.github}
                  className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 border border-zinc-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={18} />
                  <span>View Code</span>
                </Link>
              </div>

              {/* Screenshot Navigation */}
              {screenshots.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-3">App Screenshots</h3>
                  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
                    {screenshots.map((screenshot, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveScreenshot(index)}
                        className={`relative w-16 h-32 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                          activeScreenshot === index ? "border-purple-500 scale-105" : "border-zinc-700"
                        }`}
                      >
                        <Image
                          src={screenshot || "/placeholder.svg"}
                          alt={`${project.name} thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Features</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              {project.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Technologies Used</h2>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech: string, index) => (
                <div key={index} className="flex items-center bg-zinc-800 px-4 py-2 rounded-lg">
                  <Code size={16} className="mr-2 text-purple-400" />
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
function getTagColor(tag: string, opacity = 1): string {
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
    "CRUD": `rgba(150, 114, 128, ${opacity})`,        
    "Supabase": `rgba(16, 185, 129, ${opacity})`, 
    "Full-stack": `rgba(99, 102, 241, ${opacity})`, 
  }

  return colors[tag] || `rgba(107, 114, 128, ${opacity})`
}
