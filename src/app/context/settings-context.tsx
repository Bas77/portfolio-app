"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Theme = "dark" | "light"

type SettingsContextType = {
  isSpotlightEnabled: boolean
  toggleSpotlight: () => void
  isSidebarOpen: boolean
  toggleSidebar: () => void
  theme: Theme
  toggleTheme: () => void
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [isSpotlightEnabled, setIsSpotlightEnabled] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [theme, setTheme] = useState<Theme>("dark")
  const [mounted, setMounted] = useState(false)

  const toggleSpotlight = () => {
    setIsSpotlightEnabled((prev) => !prev)
    // Save preference to localStorage only on client
    if (typeof window !== "undefined") {
      localStorage.setItem("spotlightEnabled", (!isSpotlightEnabled).toString())
    }
  }

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev)
  }

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)

    // Save theme preference to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme)

      // Apply theme to document
      if (newTheme === "dark") {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    }
  }

  // Load saved preferences on mount - client-side only
  useEffect(() => {
    setMounted(true)

    if (typeof window !== "undefined") {
      // Load spotlight preference
      const savedSpotlight = localStorage.getItem("spotlightEnabled")
      if (savedSpotlight !== null) {
        setIsSpotlightEnabled(savedSpotlight === "true")
      }

      // Load theme preference
      const savedTheme = localStorage.getItem("theme") as Theme | null
      if (savedTheme) {
        setTheme(savedTheme)

        // Apply theme to document
        if (savedTheme === "dark") {
          document.documentElement.classList.add("dark")
        } else {
          document.documentElement.classList.remove("dark")
        }
      } else {
        // Check system preference if no saved preference
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
        setTheme(prefersDark ? "dark" : "light")

        if (prefersDark) {
          document.documentElement.classList.add("dark")
        } else {
          document.documentElement.classList.remove("dark")
        }
      }
    }
  }, [])

  // Provide default values for server-side rendering to prevent hydration mismatch
  const value = {
    isSpotlightEnabled: mounted ? isSpotlightEnabled : true,
    toggleSpotlight,
    isSidebarOpen: mounted ? isSidebarOpen : false,
    toggleSidebar,
    theme: mounted ? theme : "dark",
    toggleTheme,
  }

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider")
  }
  return context
}