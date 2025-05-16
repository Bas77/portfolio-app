import { useState, useEffect } from "react"

export function useCursorSpotlight() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    // Don't run on server
    if (typeof window === "undefined") return

    // Set active after component mounts to prevent hydration issues
    setIsActive(true)

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return { position, isActive }
}
