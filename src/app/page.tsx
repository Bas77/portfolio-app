import Link from "next/link"
import { Github, Linkedin } from "lucide-react"
import { TechCard } from "./component/tech-card"
import Image from "next/image"
import { JSX, SVGProps } from "react"
export const Whatsapp = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" {...props}>
    <path fill="currentColor" d="M16.6 14c-.2-.1-1.5-.7-1.7-.8c-.2-.1-.4-.1-.6.1c-.2.2-.6.8-.8 1c-.1.2-.3.2-.5.1c-.7-.3-1.4-.7-2-1.2c-.5-.5-1-1.1-1.4-1.7c-.1-.2 0-.4.1-.5c.1-.1.2-.3.4-.4c.1-.1.2-.3.2-.4c.1-.1.1-.3 0-.4c-.1-.1-.6-1.3-.8-1.8c-.1-.7-.3-.7-.5-.7h-.5c-.2 0-.5.2-.6.3c-.6.6-.9 1.3-.9 2.1c.1.9.4 1.8 1 2.6c1.1 1.6 2.5 2.9 4.2 3.7c.5.2.9.4 1.4.5c.5.2 1 .2 1.6.1c.7-.1 1.3-.6 1.7-1.2c.2-.4.2-.8.1-1.2l-.4-.2m2.5-9.1C15.2 1 8.9 1 5 4.9c-3.2 3.2-3.8 8.1-1.6 12L2 22l5.3-1.4c1.5.8 3.1 1.2 4.7 1.2c5.5 0 9.9-4.4 9.9-9.9c.1-2.6-1-5.1-2.8-7m-2.7 14c-1.3.8-2.8 1.3-4.4 1.3c-1.5 0-2.9-.4-4.2-1.1l-.3-.2l-3.1.8l.8-3l-.2-.3c-2.4-4-1.2-9 2.7-11.5S16.6 3.7 19 7.5c2.4 3.9 1.3 9-2.6 11.4"></path>
</svg>
    )

export const v0 = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
	<rect width="24" height="24" fill="none" />
	<path fill="currentColor" d="M14.066 6.028v2.22h5.729q.075-.001.148.005l-5.853 5.752a2 2 0 0 1-.024-.309V8.247h-2.353v5.45c0 2.322 1.935 4.222 4.258 4.222h5.675v-2.22h-5.675q-.03 0-.059-.003l5.729-5.629q.006.082.006.166v5.465H24v-5.465a4.204 4.204 0 0 0-4.205-4.205zM0 8.245l8.28 9.266c.839.94 2.396.346 2.396-.914V8.245H8.19v5.44l-4.86-5.44Z" />
</svg>
)
    
export default function Home() {
  return (
    <div className="snap-container">
      {/* Hero Section */}
      <section id="hero" className="snap-section relative z-10 px-4 sm:p  x-6 md:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 ml-0 md:ml-20">
            <div className="w-48 h-48 rounded-full bg-zinc-800 overflow-hidden flex-shrink-0">
              {/* Placeholder for profile image */}
              <Image src="/picture-placeholder.jpg" alt='' width={500} height={500} className="w-full h-full"/>
            </div>

            <div className="md:mt-4 cursor-default select-none">
              <h1 className="text-4xl font-bold mb-1  hover:text-blue-500 transition text-center sm:text-left">Dominikus Sebastian Ramli</h1>
              <h2 className="text-xl text-gray-400 mb-4 text-center sm:text-left">Aspiring Software Developer & Data Analyst</h2>

              <p className="text-gray-300 max-w-lg mb-6">
                Undergraduate Computer Science student passionate about learning, problem-solving, and web development.
                 Specializing in modern web technologies and frameworks.
              </p>

              <div className="flex gap-6">
                <Link
                  href="https://github.com/Bas77"
                  className="relative z-20 bg-zinc-800 p-3 rounded-full hover:bg-zinc-700 transition-colors"
                >
                  <Github size={24} className="text-gray-400 hover:text-white" />
                </Link>

                <Link
                  href="https://www.linkedin.com/in/dominikus-sebastian-ramli-95a3952b8/"
                  className="relative z-20 bg-zinc-800 p-3 rounded-full hover:bg-zinc-700 transition-colors"
                >
                  <Linkedin size={24} className="text-gray-400 hover:text-white" />
                </Link>

                <Link
                  href="https://wa.me/6282110855768?text=Hey%2C%20I%27ve%20checked%20out%20your%20website%21"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-20 bg-zinc-800 p-3 rounded-full hover:bg-zinc-700 transition-colors"
                >
                  <Whatsapp  className="text-gray-400 hover:text-white" />
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
            <TechCard
              name="Python"
              icon="https://api.iconify.design/vscode-icons:file-type-python.svg"
              color="59, 130, 246"
              description="A versatile programming language used for web development, data analysis, AI, and automation."
              experience="4+ years"
            />
            <TechCard
              name="CSS"
              icon="https://api.iconify.design/vscode-icons:file-type-css2.svg"
              color="14, 165, 233"
              description="Cascading Style Sheets for designing and styling web applications with precision."
              experience="5+ years"
            />
            <TechCard
              name="React"
              icon="https://api.iconify.design/vscode-icons:file-type-reactjs.svg"
              color="20, 184, 166"
              description="A JavaScript library for building user interfaces with reusable components."
              experience="3+ years"
            />
            <TechCard
              name="Tailwind CSS"
              icon="https://api.iconify.design/vscode-icons:file-type-tailwind.svg"
              color="6, 182, 212"
              description="A utility-first CSS framework for rapidly building custom user interfaces."
              experience="2+ years"
            />
            <TechCard
              name="JavaScript"
              icon="https://api.iconify.design/vscode-icons:file-type-js-official.svg"
              color="234, 179, 8"
              description="The programming language of the web, enabling interactive and dynamic content."
              experience="5+ years"
            />
            <TechCard
              name="HTML"
              icon="https://api.iconify.design/vscode-icons:file-type-html.svg"
              color="239, 68, 68"
              description="The standard markup language for creating web pages and applications."
              experience="6+ years"
            />
            <TechCard
              name="TypeScript"
              icon="https://api.iconify.design/vscode-icons:file-type-typescript-official.svg"
              color="59, 130, 246"
              description="A strongly typed programming language that builds on JavaScript for safer code."
              experience="3+ years"
            />
            <TechCard
              name="Sass CSS"
              icon="https://api.iconify.design/vscode-icons:file-type-scss.svg"
              color="236, 72, 153"
              description="A preprocessor scripting language that extends CSS with variables, nesting, and more."
              experience="4+ years"
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
  )
}
