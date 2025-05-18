'use client'
import Link from "next/link"
import { Github, Linkedin } from "lucide-react"
import { TechCard } from "./component/tech-card"
import Image from "next/image"
import { Whatsapp } from "./component/icons/whatsapp"
import { useEffect } from "react"
import { div } from "framer-motion/client"
    
export default function Home() {
  useEffect(() => {
    // Import Lenis dynamically to avoid SSR issues
    const initLenis = async () => {
      const Lenis = (await import("lenis")).default
      const Snap = (await import("lenis/snap")).default
      const wrapper = document.getElementById('lenis-wrapper')
      const content = document.getElementById('lenis-content')

    // ✅ Check they both exist before proceeding
    if (!(wrapper instanceof HTMLElement) || !(content instanceof HTMLElement)) {
      console.warn('Lenis wrapper or content not found.')
      return
    }
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        wheelMultiplier: 50,
        touchMultiplier: 50,
        wrapper: wrapper as HTMLElement,
        content: content as HTMLElement,
      })

      function raf(time: number) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }

      requestAnimationFrame(raf)

      const snap = new Snap(lenis, {
        velocityThreshold: 1
      })

      const sectionHeight = window.innerHeight
      snap.add(0)
      snap.add(sectionHeight)
      snap.add(sectionHeight * 2)
    }

    initLenis()
  }, [])
  return (
    <div id='lenis-wrapper' className="h-screen w-screen overflow-y-auto overflow-x-hidden">
    <div id='lenis-content' className="will-change-transform">
      <div className="snap-container caret-transparent" >
      {/* Hero Section */}
      <section id="hero" className="snap-section relative z-10 px-4 sm:px-6 md:px-8 lg:px-16" >
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 ml-0 md:ml-20">
            <div className="w-48 h-48 rounded-full bg-zinc-800 overflow-hidden flex-shrink-0">
              {/* Placeholder for profile image */}
              <Image src="/picture-placeholder.jpg" alt='' width={500} height={500} className="w-full h-full"/>
            </div>

            <div className="md:mt-4 cursor-default">
              <h1 className="text-4xl font-bold mb-1  hover:text-blue-500 transition text-center sm:text-left">Dominikus Sebastian Ramli</h1>
              <h2 className="text-x sm:text-xl text-gray-400 mb-4 text-center sm:text-left">Aspiring Software Developer & Data Analyst</h2>

              <p className="text-gray-300 max-w-lg mb-6 text-center sm:text-left">
                Undergraduate Computer Science student passionate about learning, problem-solving, and web development.
                 Specializing in modern web technologies and frameworks.
              </p>

              <div className="flex gap-6 justify-center sm:justify-start transition-colors">
                <Link
                  href="https://github.com/Bas77"
                  className="group relative z-20 bg-zinc-800 p-3 rounded-full hover:bg-zinc-700 transition-colors"
                >
                   <div className="absolute inset-0 rounded-full border-2 border-white opacity-0 group-hover:opacity-25 group-hover:animate-spin pointer-events-none transition-opacity" />
                  <Github size={24} className="text-gray-400 group-hover:text-white transition-colors" />
                </Link>

                <Link
                  href="https://www.linkedin.com/in/dominikus-sebastian-ramli-95a3952b8/"
                  className="group relative z-20 bg-zinc-800 p-3 rounded-full hover:bg-zinc-700 transition-colors"
                >
                  <div className="absolute inset-0 rounded-full border-2 border-white opacity-0 group-hover:opacity-25 group-hover:animate-pulse pointer-events-none transition" />
                  <Linkedin size={24} className="text-gray-400 group-hover:text-white transition-colors" />
                </Link>

                <Link
                  href="https://wa.me/6282110855768?text=Hey%2C%20I%27ve%20checked%20out%20your%20website%21"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative z-20 bg-zinc-800 p-3 rounded-full hover:bg-zinc-700 transition-colors"
                >
                  <div className="absolute inset-0 rounded-full border-2 border-white opacity-0 group-hover:opacity-25 group-hover:animate-pulse pointer-events-none transition" />
                  <Whatsapp  className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                </Link>
              </div>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <Link href="#technologies" className="text-gray-400 hover:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section id="technolgies" className="snap-section relative z-10 px-4 sm:px-6 md:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 relative inline-block">
            Technologies
            <span className="absolute bottom-[-8px] left-0 w-full h-1 bg-blue-500"></span>
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <TechCard
              name="Python"
              icon="https://api.iconify.design/vscode-icons:file-type-python.svg"
              color="59, 130, 246"
              description="A versatile programming language used for web development, data analysis, AI, and automation."
            />
            <TechCard
              name="CSS"
              icon="https://api.iconify.design/vscode-icons:file-type-css2.svg"
              color="14, 165, 233"
              description="Cascading Style Sheets for designing and styling web applications with precision."
            />
            <TechCard
              name="React"
              icon="https://api.iconify.design/vscode-icons:file-type-reactjs.svg"
              color="20, 184, 166"
              description="A JavaScript library for building user interfaces with reusable components."
            />
            <TechCard
              name="Tailwind CSS"
              icon="https://api.iconify.design/vscode-icons:file-type-tailwind.svg"
              color="6, 182, 212"
              description="A utility-first CSS framework for rapidly building custom user interfaces."
            />
            <TechCard
              name="Power BI"
              icon="https://api.iconify.design/logos:microsoft-power-bi.svg"
              color="234, 179, 8"
              description="A business analytics tool to visualize data with interactive dashboards and reports."
            />
            <TechCard
              name="HTML"
              icon="https://api.iconify.design/vscode-icons:file-type-html.svg"
              color="239, 68, 68"
              description="The standard markup language for creating web pages and applications."
            />
            <TechCard
              name="TypeScript"
              icon="https://api.iconify.design/vscode-icons:file-type-typescript-official.svg"
              color="59, 130, 246"
              description="A strongly typed programming language that builds on JavaScript for safer code."
            />
            <TechCard
              name="Supabase"
              icon="https://api.iconify.design/material-icon-theme:supabase.svg"
              color="16, 185, 129"
              description="An open-source Firebase alternative that offers a full Postgres backend, RESTful APIs, and more"
            />
            {/* lol */}
            {/* <TechCard
              name="V0"
              icon="/skills/v0.png"
              color="0, 0, 0"
              description="A preprocessor scripting language that extends CSS with variables, nesting, and more."
              experience="4+ years"
            /> */}
          </div>
        </div>
      </section>
      </div>
    </div>
    </div>
    
  )
}
