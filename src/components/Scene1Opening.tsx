"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Phase = "lotus" | "line1" | "line2" | "name" | "done";

export default function Scene1Opening({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<Phase>("lotus");
  const [exit, setExit] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let frame: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const petals: { angle: number; radius: number; length: number; speed: number; phase: number }[] = [];
    for (let i = 0; i < 8; i++) {
      petals.push({
        angle: (i / 8) * Math.PI * 2,
        radius: 30 + Math.random() * 20,
        length: 40 + Math.random() * 30,
        speed: 0.2 + Math.random() * 0.3,
        phase: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;

    const draw = () => {
      time += 0.008;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const pulse = 1 + Math.sin(time * 2) * 0.03;
      const opacity = Math.min(1, time * 2);

      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(pulse, pulse);
      ctx.globalAlpha = opacity * 0.6;

      for (const p of petals) {
        const a = p.angle + time * p.speed;
        ctx.save();
        ctx.rotate(a);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        const cpX = p.radius * 0.3;
        const cpY = -p.length * 0.5;
        const endX = 0;
        const endY = -p.length;
        ctx.quadraticCurveTo(cpX, cpY, endX, endY);
        ctx.quadraticCurveTo(-cpX, cpY, 0, 0);
        ctx.fillStyle = "rgba(196, 160, 229, 0.25)";
        ctx.fill();
        ctx.strokeStyle = "rgba(196, 160, 229, 0.08)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
        ctx.restore();
      }

      ctx.beginPath();
      ctx.arc(0, 0, 4, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(212, 168, 67, 0.15)";
      ctx.fill();

      ctx.restore();

      frame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("line1"), 2000);
    const t2 = setTimeout(() => setPhase("line2"), 4000);
    const t3 = setTimeout(() => setPhase("name"), 5500);
    const t4 = setTimeout(() => {
      setExit(true);
      setTimeout(onComplete, 1200);
    }, 8000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!exit && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9997] flex items-center justify-center bg-[#050505]"
        >
          <canvas ref={canvasRef} className="absolute inset-0" />

          <div className="relative z-10 text-center">
            <AnimatePresence mode="wait">
              {phase === "lotus" && (
                <motion.div
                  key="lotus"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  className="lotus-glow"
                >
                  <svg width="48" height="48" viewBox="0 0 100 100" fill="none" className="mx-auto">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <path
                        key={i}
                        d="M50 50 Q30 15 50 5 Q70 15 50 50Z"
                        fill="rgba(196, 160, 229, 0.3)"
                        stroke="rgba(245, 240, 235, 0.1)"
                        strokeWidth="0.5"
                        transform={`rotate(${i * 72}, 50, 50)`}
                      />
                    ))}
                    <circle cx="50" cy="50" r="4" fill="rgba(212, 168, 67, 0.2)" />
                  </svg>
                </motion.div>
              )}

              {phase === "line1" && (
                <motion.div
                  key="line1"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="text-subtitle tracking-[0.3em] text-cream-dim">
                    Some people arrive quietly
                  </p>
                </motion.div>
              )}

              {phase === "line2" && (
                <motion.div
                  key="line2"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="text-subtitle tracking-[0.3em] text-cream-dim">
                    and change everything
                  </p>
                </motion.div>
              )}

              {phase === "name" && (
                <motion.div
                  key="name"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h1 className="text-huge text-cream mb-3 leading-none">
                    Donia
                  </h1>
                  <p className="text-arabic text-3xl sm:text-4xl text-purple/60 font-bold" dir="rtl">
                    دنيا
                  </p>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="h-px bg-gradient-to-r from-transparent via-cream-faint to-transparent mt-8 mx-auto"
                    style={{ width: "120px", transformOrigin: "center" }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
