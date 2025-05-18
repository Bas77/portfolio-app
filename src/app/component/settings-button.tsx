"use client"

import { Settings } from "lucide-react"
import { useSettings } from "../context/settings-context"

export function SettingsButton() {
  const { toggleSidebar } = useSettings()

  return (
    <button
      onClick={toggleSidebar}
      className="fixed top-4 z-50 p-2 rounded-full bg-zinc-800 text-gray-300 hover:bg-zinc-700 hover:text-white transition-colors shadow-lg settings-button-right"
      style={{
        position: "fixed",
        top: "1rem",
        right: "1rem",
        left: "auto",
      }}
      data-testid='settings-button'
      aria-label="Settings"
    >
      <Settings size={20} />
    </button>
  )
}

export default SettingsButton
