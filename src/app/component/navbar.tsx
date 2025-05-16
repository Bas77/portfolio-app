import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="flex items-center justify-center fixed top-5 left-0 right-0 z-50 w-full">
      <div className="flex items-center justify-between py-2 px-4 bg-black/80 backdrop-blur-md text-white rounded-full max-w-3xl absolute top-4 shadow-lg border border-zinc-800">
        <Link href="/" className="text-white text-sm py-1.5 px-3 rounded-full hover:bg-zinc-800 transition-colors">
          Home
        </Link>
        <Link
          href="/projects"
          className="text-white text-sm py-1.5 px-3 rounded-full hover:bg-zinc-800 transition-colors"
        >
          Projects
        </Link>
        <Link
          href="/contact"
          className="text-white text-sm py-1.5 px-3 rounded-full hover:bg-zinc-800 transition-colors"
        >
          Contact
        </Link>
      </div>
    </nav>
  )
}
