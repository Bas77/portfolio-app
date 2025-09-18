"use client";

// import Image from "next/image";
import { WaifuCarousel } from "../component/waifu-carousel"; // Import the new carousel component
import GachaBallPhysics from "../component/gacha-balls";

// A reusable card component for showcasing games, styled like your TechCard.

interface GachaGame {
  name: string;
  imageSrc: string;
}

export default function About() {
  // --- Data for your Gacha Games ---
  const gachaGames: GachaGame[] = [
  { name: 'Game 1', imageSrc: "/fun/games/1.png" },
  { name: 'Game 2', imageSrc: "/fun/games/2.png" },
  { name: 'Game 2', imageSrc: "/fun/games/3.png" },
  { name: 'Game 2', imageSrc: "/fun/games/4.png" },
  { name: 'Game 2', imageSrc: "/fun/games/5.png" },
  { name: 'Game 2', imageSrc: "/fun/games/6.png" },
  { name: 'Game 2', imageSrc: "/fun/games/7.png" },
  { name: 'Game 2', imageSrc: "/fun/games/8.png" },
  { name: 'Game 2', imageSrc: "/fun/games/9.png" },
];

  // --- Data for your Favorite Characters (Waifus) ---
  // IMPORTANT: You need to create `faceSrc` (cropped face) and `fullSrc` (full body) images for each!
  const favoriteCharacters = [
    {
        name: "Skadi", 
        subtitle: "Arknights",
        faceSrc: "/fun/chars/profile/Skadi.png", 
        fullSrc: "/fun/chars/full/Skadi.webp",
    },
    {
        name: "Manhattan Cafe", 
        subtitle: "Uma Musume",
        faceSrc: "/fun/chars/profile/Manhattan.png", 
        fullSrc: "/fun/chars/full/Manhattan.webp",
    },
    {
        name: "Yoru", 
        subtitle: "VALORANT",
        faceSrc: "/fun/chars/profile/Yoru.png", 
        fullSrc: "/fun/chars/full/Yoru.png",
    }
  ];

  return (
    // <div
    //   id="lenis-wrapper"
    //   className="h-screen w-screen overflow-y-auto overflow-x-hidden"
    // >
    //   <div
    //     id="lenis-content"
    //     className="will-change-transform overflow-x-hidden"
    //   >
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 md:px-8 lg:px-16 caret-transparent">
        <div className="max-w-6xl mx-auto mt-13 sm:mt-17">
          <header className="text-center mb-12 sm:mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">About Me</h1>
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
              Some personal stuff
            </p>
          </header>

        {/* Gacha Games Section */}
        <GachaBallPhysics gachaGames={gachaGames} />

        {/* Favorite Characters Section - Now using the Carousel */}
        <section id="favorite-characters" className="py-8">
          <h2 className="text-3xl font-bold mb-8 relative inline-block">
            Favorite Characters
            <span className="absolute bottom-[-8px] left-0 w-1/2 h-1 bg-blue-500"></span>
          </h2>
          {/* Render the WaifuCarousel here */}
          <div className="flex justify-center">
            <WaifuCarousel waifus={favoriteCharacters} />
          </div>
        </section>
      </div>
      </div>
    // </div>
    // </div>
  );
}