"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { isMobile } from 'react-device-detect';
type SettingsContextType = {
  isSpotlightEnabled: boolean
  toggleSpotlight: () => void
  isSidebarOpen: boolean
  toggleSidebar: () => void
  isLenisEnabled: boolean
  toggleLenis: () => void
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [isSpotlightEnabled, setIsSpotlightEnabled] = useState(true)
  const [isLenisEnabled, setIsLenisEnabled] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  const toggleSpotlight = () => {
    setIsSpotlightEnabled((prev) => !prev)
    console.log("Spotlight: ", isSpotlightEnabled )
    // Save preference to localStorage only on client
    if (typeof window !== "undefined") {
      localStorage.setItem("spotlightEnabled", (!isSpotlightEnabled).toString())
    }
  }

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev)
  }

  const toggleLenis = () => {
    setIsLenisEnabled((prev) => !prev)
    console.log("Lenis:", isLenisEnabled )
    // Save preference to localStorage only on client
    if (typeof window !== "undefined") {
      localStorage.setItem("lenisEnabled", (!isLenisEnabled).toString())
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

      // Load lenis preference
      const savedLenis = localStorage.getItem('lenisEnabled')
      if (savedLenis !== null) {
        setIsLenisEnabled(savedLenis === "true")
      } else {
        // Disable Lenis on mobile devices by default
        // const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
        if (isMobile) {
          console.log('isMobile: ', isMobile);
          setIsLenisEnabled(false)
          localStorage.setItem("lenisEnabled", "false")
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
    isLenisEnabled: mounted ? isLenisEnabled : false,
    toggleLenis,
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