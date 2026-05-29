"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroScreen({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState<"for" | "heart" | "donia" | "complete">("for");
  const [showContent, setShowContent] = useState(true);

  useEffect(() => {
    const t1 = setTimeout(() => setStage("heart"), 1200);
    const t2 = setTimeout(() => setStage("donia"), 2400);
    const t3 = setTimeout(() => {
      setStage("complete");
      setShowContent(false);
      setTimeout(onComplete, 800);
    }, 3600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {showContent && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9997] flex items-center justify-center bg-dark-bg"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center"
          >
            <AnimatePresence mode="wait">
              {stage === "for" && (
                <motion.div
                  key="for"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="text-3xl sm:text-5xl md:text-6xl font-handwritten text-cream/80">
                    For
                  </span>
                </motion.div>
              )}

              {stage === "heart" && (
                <motion.div
                  key="heart"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.5 }}
                  transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
                >
                  <svg
                    className="w-16 h-16 sm:w-20 sm:h-20 mx-auto"
                    viewBox="0 0 24 24"
                    fill="#f8b4c8"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </motion.div>
              )}

              {stage === "donia" && (
                <motion.div
                  key="donia"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="text-3xl sm:text-5xl md:text-6xl font-handwritten text-gradient">
                    Donia ❤️
                  </span>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="h-[1px] bg-gradient-to-r from-transparent via-lotus-pink/50 to-transparent mt-4 mx-auto max-w-[200px]"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
