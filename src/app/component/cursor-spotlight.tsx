"use client"

import { useCursorSpotlight } from "../hooks/use-cursor-spotlight"
import { useEffect, useState } from "react"

export default function CursorSpotlight() {
  const { position, isActive } = useCursorSpotlight()
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    // Fade in the effect after component mounts
    if (isActive) {
      const timer = setTimeout(() => setOpacity(1), 500)
      return () => clearTimeout(timer)
    }
  }, [isActive])

  if (!isActive) return null

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
      style={{ opacity }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, rgba(59, 130, 246, 0.15), rgba(29, 78, 216, 0.05) 40%, transparent 80%)`,
          transition: "background 0.15s ease",
        }}
      />
    </div>
  )
}
