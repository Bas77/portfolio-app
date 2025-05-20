"use client"

import { X } from "lucide-react"
import { useSettings } from "../context/settings-context"
import { useEffect } from "react"
import Link from "next/link"

export function SettingsSidebar() {
  const { isSidebarOpen, toggleSidebar, isSpotlightEnabled, toggleSpotlight, isLenisEnabled, toggleLenis } = useSettings()

  // Close sidebar on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSidebarOpen) {
        toggleSidebar()
      }
    }

    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [isSidebarOpen, toggleSidebar])

  // Prevent scrolling when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isSidebarOpen])

  return (
    <>
      {/* Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-[#121212] shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
        data-testid='settings-sidebar'
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <Link className="text-xl font-bold text-white cursor-help" href='/models' passHref>Settings</Link>
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-full hover:bg-zinc-800 text-gray-400 hover:text-white transition-colors"
              aria-label="Close settings"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-200">Visual Effects</h3>

              <div className="flex items-center justify-between">
                <label htmlFor="spotlight-toggle" className="text-gray-300 cursor-pointer">
                  Cursor Spotlight
                </label>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                  <input
                    type="checkbox"
                    id="spotlight-toggle"
                    className="absolute w-0 h-0 opacity-0"
                    checked={isSpotlightEnabled}
                    onChange={toggleSpotlight}
                  />
                  <label
                    htmlFor="spotlight-toggle"
                    className={`absolute inset-0 cursor-pointer rounded-full transition-colors duration-300 ${
                      isSpotlightEnabled ? "bg-blue-600" : "bg-zinc-700"
                    }`}
                  >
                    <span
                      className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                        isSpotlightEnabled ? "transform translate-x-6" : ""
                      }`}
                    />
                  </label>
                </div>
              </div>

              <p className="text-xs text-gray-500">
                Enables a subtle glow effect that follows your cursor on the background.
              </p>
            </div>

          </div>

          <div className="space-y-6 mt-10">
            <div className="space-y-4">

              <div className="flex items-center justify-between">
                <label htmlFor="lenis-toggle" className="text-gray-300 cursor-pointer">
                  Lenis Scrolling
                </label>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                  <input
                    type="checkbox"
                    id="lenis-toggle"
                    className="absolute w-0 h-0 opacity-0"
                    checked={isLenisEnabled}
                    onChange={toggleLenis}
                  />
                  <label
                    htmlFor="lenis-toggle"
                    className={`absolute inset-0 cursor-pointer rounded-full transition-colors duration-300 ${
                      isLenisEnabled ? "bg-blue-600" : "bg-zinc-700"
                    }`}
                  >
                    <span
                      className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                        isLenisEnabled ? "transform translate-x-6" : ""
                      }`}
                    />
                  </label>
                </div>
              </div>

              <p className="text-xs text-gray-500">
                Enables buttery-smooth scrolling for a more fluid browsing experience. IMPORTANT: Broken in some mobile browsers
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
