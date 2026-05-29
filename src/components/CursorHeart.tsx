"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Trail {
  id: number;
  x: number;
  y: number;
  scale: number;
}

export default function CursorHeart() {
  const [trails, setTrails] = useState<Trail[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let counter = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const pos = { x: e.clientX, y: e.clientY };
      setMousePos(pos);
      setGlowPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.1,
        y: prev.y + (pos.y - prev.y) * 0.1,
      }));

      counter++;
      if (counter % 6 === 0) {
        const id = Date.now() + Math.random();
        setTrails((prev) => [...prev.slice(-15), { id, x: pos.x, y: pos.y, scale: 0.4 + Math.random() * 0.6 }]);
        setTimeout(() => {
          setTrails((prev) => prev.filter((t) => t.id !== id));
        }, 1200);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <motion.div
        className="fixed pointer-events-none z-[9999] w-32 h-32 rounded-full"
        style={{
          left: glowPos.x - 64,
          top: glowPos.y - 64,
          background: "radial-gradient(circle, rgba(248,180,200,0.12) 0%, transparent 70%)",
        }}
      />
      <AnimatePresence>
        {trails.map((trail) => (
          <motion.div
            key={trail.id}
            className="fixed pointer-events-none z-[9998]"
            initial={{ x: trail.x - 6, y: trail.y - 6, opacity: 0.6, scale: trail.scale }}
            animate={{ y: trail.y - 30, opacity: 0, scale: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#f8b4c8">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
}
