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

  // Ensure client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  // Debug hover events
  // const particlesLoaded = useCallback(() => {
  //   console.log("Particles loaded");
  // }, []);

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

      {/* Subtle gray particles with higher z-index for interactivity */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        // loaded={particlesLoaded}
        className="absolute w-full h-full pointer-events-auto z-[-9]"
        options={{
          fullScreen: { enable: false },
          background: { color: "transparent" },
          fpsLimit: 60,
          particles: {
            number: { value: 50, density: { enable: true, value_area: 800 } },
            color: { value: "#4B4B4B" }, // Subtle gray
            links: {
              enable: true,
              color: "#4B4B4B",
              distance: 150,
              opacity: 0.2, // Increased opacity for visibility
              width: 1, // Slightly thicker lines
            },
            move: {
              enable: true,
              speed: 0.5, // Slightly faster for better responsiveness
              outModes: { default: "out" },
            },
            size: { value: { min: 0.5, max: 2 } }, // Slightly larger particles
            opacity: { value: 0.3 }, // Slightly more visible
          },
          interactivity: {
            detectsOn: "window", // Changed to window for better event detection
            events: {
              onHover: { enable: true, mode: "grab" },
              onClick: { enable: false },
              resize: { enable: true, delay: 0.5 },
            },
            modes: {
              grab: {
                distance: 200, // Increased distance for stronger effect
                links: { opacity: 0.5 }, // Higher opacity for grab lines
              },
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
}