"use client";

import Image from "next/image";
import { useState } from "react";

interface Waifu {
  name: string;
  subtitle: string; // e.g., The game a character is from
  faceSrc: string; // Path to the face snippet image
  fullSrc: string; // Path to the full character image
}

interface WaifuCarouselProps {
  waifus: Waifu[];
}

export const WaifuCarousel = ({ waifus }: WaifuCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentWaifu = waifus[currentIndex];

  if (!currentWaifu) {
    return <div className="text-gray-400 text-center py-8">No waifus to display!</div>;
  }

  return (
    // Main container now has no borders, increased vertical padding
    <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between p-8 md:p-12 transition-all duration-300 w-full">

      {/* Left Section: Face Thumbnails, Name, Game */}
      {/* Changed alignment: flex-col for vertical stacking, justify-center for vertical centering,
          items-center for horizontal centering on small, lg:items-start for left-align on large */}
      <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left lg:w-1/2 xl:w-2/5 lg:pr-12 mb-8 lg:mb-0">
        {/* Top Section: Face Thumbnails for Navigation */}
        <div className="flex justify-center lg:justify-start items-end space-x-2 mb-8 w-full overflow-x-auto no-scrollbar pb-2">
          {waifus.map((waifu, index) => (
            <button
              key={waifu.name}
              onClick={() => setCurrentIndex(index)}
              className={`relative rounded-full flex-shrink-0 transition-all duration-300 ease-in-out ${
                index === currentIndex
                  ? "w-28 h-28 border-4 border-blue-500 shadow-xl" // Slightly larger active face
                  : "w-20 h-20 border-2 border-zinc-700 hover:border-blue-400/70" // Slightly larger inactive face
              }`}
              aria-label={`Select ${waifu.name}`}
            >
              <Image
                src={waifu.faceSrc}
                alt={`${waifu.name}'s face`}
                fill
                className="object-cover rounded-full"
                sizes="(max-width: 768px) 80px, 112px"
                priority={index === currentIndex}
              />
            </button>
          ))}
        </div>

        {/* Middle Section: Name and Game - Now Dominant, Left-Aligned, and Vertically Centered */}
        <div className="mb-4 lg:mb-0 w-full flex-column justify-center items-center">
          <h3 className="text-6xl md:text-4xl font-extrabold text-white mb-2 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] leading-tight">
            {currentWaifu.name}
          </h3>
          <p className="text-3xl md:text-4xl text-blue-400 font-semibold mb-4 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
            {currentWaifu.subtitle}
          </p>
        </div>
      </div>

      {/* Right Section: Full Character Image - BIGGER */}
      {/* Takes up more space, no rounded corners, no borders */}
      <div className="relative w-full lg:w-1/2 xl:w-3/5 flex justify-center items-center overflow-hidden">
        <div className="relative w-full aspect-[9/16] max-h-[80vh]"> {/* Wrapper with aspect ratio */}
          <Image
            src={currentWaifu.fullSrc}
            alt={currentWaifu.name}
            fill
            // The image will now be contained within the predictable aspect-ratio box
            className="object-contain transition-all duration-500 ease-in-out"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </div>
  );
};