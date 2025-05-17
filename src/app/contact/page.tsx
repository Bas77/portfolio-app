'use client'

import { useEffect, useRef, useState } from 'react'

export default function SnapScroll() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const sectionRefs = useRef<HTMLElement[]>([])
  const [scrolling, setScrolling] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let currentIndex = 0
    let touchStartY = 0

    function scrollToSection(index: number) {
      if (scrolling || index < 0 || index >= sectionRefs.current.length) return
      setScrolling(true)
      const targetY = sectionRefs.current[index].offsetTop

      smoothScrollTo(targetY, 700, () => setScrolling(false))
      currentIndex = index
    }

    function onWheel(e: WheelEvent) {
      if (scrolling) return
      if (e.deltaY > 20) {
        scrollToSection(currentIndex + 1)
      } else if (e.deltaY < -20) {
        scrollToSection(currentIndex - 1)
      }
    }

    function onTouchStart(e: TouchEvent) {
      touchStartY = e.touches[0].clientY
    }

    function onTouchEnd(e: TouchEvent) {
      const touchEndY = e.changedTouches[0].clientY
      const delta = touchStartY - touchEndY
      if (scrolling || Math.abs(delta) < 50) return

      if (delta > 0) {
        scrollToSection(currentIndex + 1)
      } else {
        scrollToSection(currentIndex - 1)
      }
    }

    container.addEventListener('wheel', onWheel, { passive: true })
    container.addEventListener('touchstart', onTouchStart, { passive: true })
    container.addEventListener('touchend', onTouchEnd, { passive: true })

    return () => {
      container.removeEventListener('wheel', onWheel)
      container.removeEventListener('touchstart', onTouchStart)
      container.removeEventListener('touchend', onTouchEnd)
    }
  }, [scrolling])

  function smoothScrollTo(targetY: number, duration = 700, callback?: () => void) {
    const startY = window.scrollY
    const diff = targetY - startY
    let startTime: number | null = null

    function step(currentTime: number) {
      if (!startTime) startTime = currentTime
      const progress = currentTime - startTime
      const percent = Math.min(progress / duration, 1)

      const eased = percent < 0.5
        ? 2 * percent * percent
        : -1 + (4 - 2 * percent) * percent

      window.scrollTo(0, startY + diff * eased)

      if (progress < duration) {
        requestAnimationFrame(step)
      } else if (callback) {
        callback()
      }
    }

    requestAnimationFrame(step)
  }

  return (
    <div ref={containerRef} className="snap-container">
      {['red', 'blue', 'green'].map((color, i) => (
        <section
          key={i}
        //   ref={(el) => el && (sectionRefs.current[i] = el)}
          className="snap-section"
          style={{
            background: color,
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3rem',
            color: 'white',
          }}
        >
          Section {i + 1}
        </section>
      ))}
    </div>
  )
}
