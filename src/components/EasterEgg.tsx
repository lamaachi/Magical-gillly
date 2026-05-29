"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const konami = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "b", "a",
];

export default function EasterEgg() {
  const [keys, setKeys] = useState<string[]>([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      setKeys((prev) => {
        const next = [...prev, e.key].slice(-10);
        if (next.join(",") === konami.join(",")) {
          setShow(true);
          setTimeout(() => setShow(false), 5000);
        }
        return next;
      });
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-dark-bg/90 backdrop-blur-sm"
        >
          <div className="text-center space-y-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <svg className="w-20 h-20 mx-auto text-lotus-pink" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </motion.div>
            <p className="font-handwritten text-3xl text-gradient">
              I love you, Donia! ❤️
            </p>
            <p className="font-arabic text-xl text-soft-purple/70">
              أحبكِ يا دنيا
            </p>
            <p className="text-xs text-cream/30 font-cormorant mt-4">
              ✦ You found a secret message ✦
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
