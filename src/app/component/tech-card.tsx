"use client"

import { useState } from "react"
import Image from "next/image"
interface TechCardProps {
  name: string
  icon: string
  color: string
  description: string
  experience?: string
}

export function TechCard({ name, icon, color, description, experience }: TechCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="bg-[#121212] rounded-xl p-4 flex items-center gap-4 transition-all duration-300 relative group"
      style={{
        boxShadow: isHovered ? `0 0 20px 0 rgba(${color}, 0.3)` : "none",
        transform: isHovered ? "translateY(-2px)" : "translateY(0)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-8 h-8 flex items-center justify-center text-2xl" style={{ color: `rgb(${color})` }}>
        <Image src={icon} alt='' width={500} height={500} className="w-full h-full object-contain"/>
      </div>
      <span className="text-white font-medium">{name}</span>

      {/* Dark Gray Stylized Tooltip */}
      <div className="absolute opacity-0 group-hover:opacity-100 bottom-full left-1/2 transform -translate-x-1/2 mb-2 transition-all duration-300 pointer-events-none z-50">
        <div
          className="relative px-4 py-3 rounded-lg max-w-xs w-64 text-sm text-white shadow-xl"
          style={{
            background: "#121212",
            backdropFilter: "blur(10px)",
            // borderLeft: `3px solid rgb(${color})`,
            transform: isHovered ? "translateY(0) scale(1)" : "translateY(10px) scale(0.95)",
            transformOrigin: "bottom center",
            boxShadow: `0 4px 20px rgba(0, 0, 0, 0.8), 0 0 10px rgba(${color}, 0.2)`,
          }}
        >
          <div className="font-bold mb-1" style={{ color: `rgb(${color})` }}>
            {name}
          </div>
          <p className="text-gray-300 text-xs">{description}</p>

          {experience && (
            <div className="mt-2 pt-2 border-t border-gray-800">
              <div className="text-xs font-medium text-gray-300">
                Experience: <span className="text-white">{experience}</span>
              </div>
            </div>
          )}

          {/* Tooltip Arrow */}
          <div
            className="absolute w-4 h-4 bottom-[-7px] left-1/2 transform -translate-x-1/2 rotate-45"
            style={{ background: "#121212" }}
          ></div>
        </div>
      </div>
    </div>
  )
}
