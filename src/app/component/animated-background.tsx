"use client";

import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useCallback, useEffect, useState } from "react";
import { Engine } from "tsparticles-engine";
import { useSettings } from "../context/settings-context";

export default function AnimatedBackground() {
  const { isBackgroundEnabled } = useSettings();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Ensure client-side mounting and detect mobile device
  useEffect(() => {
    setMounted(true);
    // Detect mobile device using user agent or touch capability
    const isMobileDevice =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      window.matchMedia("(max-width: 768px)").matches ||
      "ontouchstart" in window;
    setIsMobile(isMobileDevice);
    console.log("Device detected:", isMobileDevice ? "Mobile" : "Desktop");
  }, []);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  // Only render when mounted and isBackgroundEnabled is true
  if (!mounted || !isBackgroundEnabled) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-auto">
      {/* Pitch-black animated gradient */}
      <motion.div
        className="absolute inset-0 z-[-11]"
        style={{
          background:
            "linear-gradient(120deg, #000000 0%, #010101 35%, #020203 70%, #000000 100%)",
          backgroundSize: "300% 300%",
        }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Subtle gray particles */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        className="absolute w-full h-full pointer-events-auto z-[-9]"
        options={{
          fullScreen: { enable: false },
          background: { color: "transparent" },
          fpsLimit: 60,
          particles: {
            number: { value: isMobile ? 100 : 50, density: { enable: true, value_area: 800 } }, // Fewer particles on mobile
            color: { value: "#4B4B4B" },
            links: {
              enable: true,
              color: "#4B4B4B",
              distance: 150,
              opacity: isMobile ? 0.5 : 0.2, // Stronger opacity on mobile
              width: isMobile ? 1.5 : 1, // Thicker lines on mobile
            },
            move: {
              enable: true,
              speed: 0.5,
              outModes: { default: "out" },
            },
            size: { value: { min: 0.5, max: 2 } },
            opacity: { value: isMobile ? 0.5 : 0.3 }, // Stronger particle opacity on mobile
          },
          interactivity: {
            detectsOn: "window",
            events: {
              onHover: { enable: !isMobile, mode: "grab" }, // Grab mode for desktop only
              onClick: { enable: isMobile, mode: "repulse" }, // Push mode for mobile
              resize: { enable: true, delay: 0.5 },
            },
            modes: {
              grab: {
                distance: 200,
                links: { opacity: isMobile ? 0.8 : 0.5 }, // Stronger grab links on mobile (if used)
              },
              push: {
                quantity: 4, // Add 4 particles on tap
              },
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
}