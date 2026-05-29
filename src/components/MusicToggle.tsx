"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const a = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
    a.loop = true;
    a.volume = 0.15;
    ref.current = a;
    setVisible(true);
    return () => { a.pause(); a.src = ""; };
  }, []);

  const toggle = () => {
    if (!ref.current) return;
    if (playing) ref.current.pause();
    else ref.current.play().catch(() => {});
    setPlaying(!playing);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggle}
          className="fixed bottom-8 right-8 z-50 w-9 h-9 flex items-center justify-center cursor-pointer border border-gold-faint bg-black/40 hover:bg-gold-faint/10 transition-all duration-500"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(196,154,60,0.6)" strokeWidth="1.5">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(196,154,60,0.6)" strokeWidth="1.5">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          )}
        </motion.button>
      )}
    </AnimatePresence>
  );
}
