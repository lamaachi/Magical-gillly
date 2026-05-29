"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Countdown from "./Countdown";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrolled = window.scrollY;
      const rate = scrolled * 0.4;
      containerRef.current.style.transform = `translateY(${rate}px)`;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        ref={containerRef}
        className="absolute inset-0 transition-transform duration-100 ease-out"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: "url('/moments/lotus.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/80 via-dark-bg/90 to-dark-bg/95" />
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-10 left-10 w-36 h-36 rounded-full border border-lotus-pink/20 opacity-60" />
          <div className="absolute bottom-10 right-10 w-44 h-44 rounded-full border border-soft-purple/20 opacity-60" />
          <svg className="absolute left-1/2 top-1/4 w-52 -translate-x-1/2 opacity-10" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="80" stroke="#f8b4c8" strokeWidth="1.5" />
            <path d="M100 20 C80 60 60 60 50 90 C30 130 80 150 100 130 C120 150 170 130 150 90 C140 60 120 60 100 20 Z" stroke="#f8b4c8" strokeWidth="1.2" fill="none" />
          </svg>
        </div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-lotus-pink/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-soft-purple/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-8"
          >
            <svg
              className="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-lotus-pink animate-heartbeat"
              viewBox="0 0 128 128"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M64 12c-10 10-22 18-36 20 0 0 20 8 32 28 12-20 32-28 32-28C86 30 74 22 64 12Z" fill="#f8b4c8" />
              <path d="M64 12c10 10 22 18 36 20 0 0-20 8-32 28-12-20-32-28-32-28C42 30 54 22 64 12Z" fill="#f8b4c8" />
              <path d="M64 34c-14 14-30 28-30 46 0 14 11 26 26 26h8c15 0 26-12 26-26 0-18-16-32-30-46Z" fill="#ffffff" fillOpacity="0.1" />
              <circle cx="64" cy="74" r="6" fill="#d4a843" />
            </svg>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.45 }}
            className="font-arabic text-2xl sm:text-3xl text-lotus-pink/70 italic mb-4"
            dir="rtl"
          >
            إلى أجمل روح
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6"
          >
            <span className="text-gradient">To the most beautiful soul</span>
            <br />
            <span className="text-cream">Donia</span>
            <span className="text-lotus-pink"> ❤️</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="font-cormorant text-lg sm:text-xl md:text-2xl text-cream/60 italic max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Since 31 October 2024, my world changed forever
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="glass inline-block px-8 py-4 rounded-2xl"
          >
            <Countdown />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="mt-16"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg className="w-6 h-6 mx-auto text-lotus-pink/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-bg to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 2 }}
      />
    </section>
  );
}
