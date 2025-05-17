'use client'
import type React from "react"
// import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Navbar from "./component/navbar"
import { SettingsProvider } from "./context/settings-context"
import { SettingsButton } from "./component/settings-button"
import CursorSpotlight from "./component/cursor-spotlight"
import { SettingsSidebar } from "./component/settings-sidebar"
import PreloadModels from "./component/preloadModels"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

// export const metadata: Metadata = {
//   title: "Dominikus Sebastian Ramli | Software Developer",
//   description: "Personal portfolio of Dominikus Sebastian Ramli, Software Developer",
// }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="overflow-x-hidden">
        <SettingsProvider>
          <CursorSpotlight />
          <PreloadModels />
          <Navbar />
          <div id="settings-button-container" className="fixed top-4 right-4 z-50">
            <SettingsButton />
          </div>
          <SettingsSidebar />
          {children}
        </SettingsProvider>
      </body>
    </html>
  )
}
