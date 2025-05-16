"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type SettingsContextType = {
  isSpotlightEnabled: boolean
  toggleSpotlight: () => void
  isSidebarOpen: boolean
  toggleSidebar: () => void
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [isSpotlightEnabled, setIsSpotlightEnabled] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSpotlight = () => {
    setIsSpotlightEnabled((prev) => !prev)
    // Save preference to localStorage
    localStorage.setItem("spotlightEnabled", (!isSpotlightEnabled).toString())
  }

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev)
  }

  // Load saved preferences on mount
  useEffect(() => {
    const savedSpotlight = localStorage.getItem("spotlightEnabled")
    if (savedSpotlight !== null) {
      setIsSpotlightEnabled(savedSpotlight === "true")
    }
  }, [])

  return (
    <SettingsContext.Provider value={{ isSpotlightEnabled, toggleSpotlight, isSidebarOpen, toggleSidebar }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider")
  }
  return context
}
