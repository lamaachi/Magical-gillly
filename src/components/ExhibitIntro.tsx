"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Phase = "lotus" | "subtitle" | "name" | "done";

export default function ExhibitIntro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<Phase>("lotus");
  const [exiting, setExiting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    let frame: number;

    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const petals: { angle: number; len: number; speed: number; phase: number }[] = [];
    for (let i = 0; i < 8; i++) {
      petals.push({
        angle: (i / 8) * Math.PI * 2,
        len: 35 + Math.random() * 25,
        speed: 0.15 + Math.random() * 0.2,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const particles: { x: number; y: number; size: number; alpha: number; speed: number }[] = [];
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * c.width,
        y: Math.random() * c.height,
        size: 0.5 + Math.random() * 1.5,
        alpha: Math.random() * 0.4,
        speed: 0.1 + Math.random() * 0.3,
      });
    }

    let t = 0;

    const draw = () => {
      t += 0.004;
      ctx.clearRect(0, 0, c.width, c.height);

      // ambient particles (gold dust)
      particles.forEach((p) => {
        p.y -= p.speed;
        if (p.y < -10) { p.y = c.height + 10; p.x = Math.random() * c.width; }
        const flicker = 0.3 + Math.sin(t * 2 + p.x) * 0.3;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(196, 154, 60, ${p.alpha * flicker})`;
        ctx.fill();
      });

      // lotus bloom
      const cx = c.width / 2;
      const cy = c.height / 2;
      const bloom = Math.min(t * 2.5, 1);
      const scale = bloom;
      const pulse = 1 + Math.sin(t * 1.2) * 0.015;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(scale * pulse, scale * pulse);
      ctx.globalAlpha = bloom * 0.5;

      for (const p of petals) {
        const a = p.angle + t * p.speed;
        ctx.save();
        ctx.rotate(a);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(6, -p.len * 0.45, 0, -p.len);
        ctx.quadraticCurveTo(-6, -p.len * 0.45, 0, 0);
        ctx.fillStyle = "rgba(196, 154, 60, 0.15)";
        ctx.fill();
        ctx.strokeStyle = "rgba(196, 154, 60, 0.06)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
        ctx.restore();
      }

      ctx.beginPath();
      ctx.arc(0, 0, 5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(196, 154, 60, 0.1)";
      ctx.fill();

      ctx.restore();
      frame = requestAnimationFrame(draw);
    };

    draw();
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", resize); };
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("subtitle"), 2200);
    const t2 = setTimeout(() => setPhase("name"), 4000);
    const t3 = setTimeout(() => { setExiting(true); setTimeout(onComplete, 1200); }, 7000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
          className="fixed inset-0 z-[9997] flex items-center justify-center bg-black"
        >
          <canvas ref={canvasRef} className="absolute inset-0" />

          <div className="relative z-10 text-center">
            <AnimatePresence mode="wait">
              {phase === "lotus" && (
                <motion.div
                  key="lotus"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <svg width="44" height="44" viewBox="0 0 100 100" fill="none" className="mx-auto">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <path
                        key={i}
                        d="M50 50 Q30 18 50 8 Q70 18 50 50Z"
                        fill="rgba(196,154,60,0.2)"
                        stroke="rgba(196,154,60,0.08)"
                        strokeWidth="0.5"
                        transform={`rotate(${i * 72}, 50, 50)`}
                      />
                    ))}
                    <circle cx="50" cy="50" r="3" fill="rgba(196,154,60,0.12)" />
                  </svg>
                </motion.div>
              )}

              {phase === "subtitle" && (
                <motion.div
                  key="sub"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
                >
                  <span className="label-sm text-cream-dim/60" style={{ letterSpacing: "0.35em" }}>
                    Some people arrive quietly
                  </span>
                </motion.div>
              )}

              {phase === "name" && (
                <motion.div
                  key="name"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, ease: [0.77, 0, 0.175, 1] }}
                >
                  <h1 className="display-xl text-cream mb-3" style={{ fontVariationSettings: "'SOFT' 95, 'WONK' 1" }}>
                    Donia
                  </h1>
                  <p className="text-arabic text-3xl sm:text-4xl text-gold/50 font-bold">
                    دنيا
                  </p>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.5, delay: 0.6, ease: [0.77, 0, 0.175, 1] }}
                    className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent mt-8 mx-auto origin-center"
                    style={{ width: "80px" }}
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
