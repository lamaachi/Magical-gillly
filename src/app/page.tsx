"use client";

import { useState } from "react";
import IntroScreen from "@/components/IntroScreen";
import FloatingPetals from "@/components/FloatingPetals";
import Sparkles from "@/components/Sparkles";
import CursorHeart from "@/components/CursorHeart";
import MusicPlayer from "@/components/MusicPlayer";
import EasterEgg from "@/components/EasterEgg";
import HeroSection from "@/components/HeroSection";
import LoveMessage from "@/components/LoveMessage";
import Timeline from "@/components/Timeline";
import Gallery from "@/components/Gallery";
import LotusGarden from "@/components/LotusGarden";
import LoveLetter from "@/components/LoveLetter";
import EndingScene from "@/components/EndingScene";

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      {!introComplete && <IntroScreen onComplete={() => setIntroComplete(true)} />}

      <main className="relative min-h-screen">
        <FloatingPetals count={20} />
        <Sparkles count={40} />
        <CursorHeart />

        <HeroSection />

        <div className="relative z-10">
          <LoveMessage />
          <Timeline />
          <Gallery />
          <LotusGarden />
          <LoveLetter />
        </div>

        <EndingScene />
        <MusicPlayer />
        <EasterEgg />
      </main>
    </>
  );
}
