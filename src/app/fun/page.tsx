"use client";

import Image from "next/image";
import { WaifuCarousel } from "../component/waifu-carousel"; // Import the new carousel component

// A reusable card component for showcasing games, styled like your TechCard.
interface HobbyCardProps {
  name: string;
  subtitle?: string; // e.g., The game a character is from
  imageSrc: string;
}

const HobbyCard = ({ name, subtitle, imageSrc }: HobbyCardProps) => {
  return (
    <div className="bg-[#121212] rounded-xl border border-zinc-800 hover:border-blue-500/50 transition-all duration-300 overflow-hidden flex flex-col group">
      <div className="w-full h-48 relative overflow-hidden">
        <Image
          src={imageSrc}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white">{name}</h3>
        {subtitle && (
          <p className="text-sm text-blue-400 font-medium mb-2">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

// --- Your Page Component ---
export default function FunPage() {
  // --- Data for your Gacha Games ---
  const gachaGames = [
    {
      name: "Genshin Impact",
      imageSrc: "/images/games/genshin-impact.jpg", // Example path
      description: "An open-world action RPG with a massive world to explore, elemental combat, and a compelling story.",
    },
    {
      name: "Honkai: Star Rail",
      imageSrc: "/images/games/honkai-star-rail.jpg", // Example path
      description: "A space fantasy RPG with strategic turn-based combat, memorable characters, and a journey across the stars.",
    },
    {
      name: "Arknights",
      imageSrc: "/images/games/arknights.jpg", // Example path
      description: "A tactical tower defense game featuring a unique art style, deep strategy, and a dystopian world.",
    },
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
        faceSrc: "/fun/chars/profile/Manhattan.jpg", 
        fullSrc: "/fun/chars/full/Manhattan.webp",
    }
  ];

  return (
    <main className="min-h-screen caret-transparent px-4 sm:px-6 md:px-8 lg:px-16 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <h1 className="text-4xl font-bold mb-4 relative inline-block">
          Hobbies & Fun Stuff
          <span className="absolute bottom-[-8px] left-0 w-1/2 h-1 bg-blue-500"></span>
        </h1>
        <p className="text-gray-400 text-lg mb-12">
          Beyond the code, here&aposs a look at the games and hobbies that keep me inspired.
        </p>

        {/* Gacha Games Section */}
        <section id="gacha-games" className="mb-16">
          <h2 className="text-3xl font-bold mb-8 relative inline-block">
            My Gacha Lineup
            <span className="absolute bottom-[-8px] left-0 w-1/2 h-1 bg-blue-500"></span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gachaGames.map((game) => (
              <HobbyCard
                key={game.name}
                name={game.name}
                imageSrc={game.imageSrc}
              />
            ))}
          </div>
        </section>

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
    </main>
  );
}