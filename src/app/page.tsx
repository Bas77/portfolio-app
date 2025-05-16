import Link from "next/link"
import { Github, Linkedin, Twitter } from "lucide-react"
import { TechCard } from "./component/tech-card"
import Image from "next/image"
export default function Home() {
  return (
    <div className="snap-container">
      {/* Hero Section */}
      <section id="hero" className="snap-section relative z-10 px-4 sm:px-6 md:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 ml-0 md:ml-20">
            <div className="w-48 h-48 rounded-full bg-zinc-800 overflow-hidden flex-shrink-0">
              {/* Placeholder for profile image */}
              <Image src="/picture-placeholder.jpg" alt='' width={500} height={500} className="w-full h-full"/>
            </div>

            <div className="md:mt-4">
              <h1 className="text-4xl font-bold mb-1">Dominikus Sebastian Ramli</h1>
              <h2 className="text-xl text-gray-400 mb-4">Software Developer</h2>

              <p className="text-gray-300 max-w-lg mb-6">
                Passionate developer focused on creating elegant solutions to complex problems. Specializing in web
                technologies and modern frameworks.
              </p>

              <div className="flex gap-6">
                <Link
                  href="https://github.com"
                  className="relative z-20 bg-zinc-800 p-3 rounded-full hover:bg-zinc-700 transition-colors"
                >
                  <Github size={24} className="text-gray-400 hover:text-white" />
                </Link>

                <Link
                  href="https://linkedin.com"
                  className="relative z-20 bg-zinc-800 p-3 rounded-full hover:bg-zinc-700 transition-colors"
                >
                  <Linkedin size={24} className="text-gray-400 hover:text-white" />
                </Link>

                <Link
                  href="https://twitter.com"
                  className="relative z-20 bg-zinc-800 p-3 rounded-full hover:bg-zinc-700 transition-colors"
                >
                  <Twitter size={24} className="text-gray-400 hover:text-white" />
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
      <section id="technologies" className="snap-section relative z-10 px-4 sm:px-6 md:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 relative inline-block">
            Technologies
            <span className="absolute bottom-[-8px] left-0 w-full h-1 bg-blue-500"></span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <TechCard name="Python" icon="🐍" color="bg-blue-900" />
            <TechCard name="CSS" icon="🎨" color="bg-blue-800" />
            <TechCard name="React" icon="⚛️" color="bg-blue-900" />
            <TechCard name="Tailwind CSS" icon="🌊" color="bg-blue-800" />
            <TechCard name="JavaScript" icon="📜" color="bg-blue-900" />
            <TechCard name="HTML" icon="📄" color="bg-blue-800" />
            <TechCard name="TypeScript" icon="🔷" color="bg-blue-900" />
            <TechCard name="Sass CSS" icon="💅" color="bg-blue-800" />
          </div>
        </div>
      </section>
    </div>
  )
}
