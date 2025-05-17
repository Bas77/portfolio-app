"use client"

import { useEffect } from "react"
import Lenis from "@studio-freight/lenis"

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      // smooth: true,
      wheelMultiplier: 100
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Simulate snap scrolling
    let scrollTimeout: NodeJS.Timeout

    const onScroll = () => {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        const sections = Array.from(document.querySelectorAll(".snap-section"))
        const scrollY = window.scrollY
        const closest = sections.reduce((prev, curr) => {
          const currOffset = Math.abs(curr.getBoundingClientRect().top)
          const prevOffset = Math.abs(prev.getBoundingClientRect().top)
          return currOffset < prevOffset ? curr : prev
        })

        lenis.scrollTo(closest as HTMLElement, {
          offset: 0,
          duration: 1.2,
          easing: (t) => t * (2 - t), // easeOutQuad
        })
      }, 100)
    }

    window.addEventListener("scroll", onScroll)

    return () => {
      window.removeEventListener("scroll", onScroll)
      lenis.destroy()
    }
  }, [])

  return null
}
