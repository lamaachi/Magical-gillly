"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Ripple {
  x: number;
  y: number;
  id: number;
}

interface Lotus {
  x: number;
  y: number;
  size: number;
  speedY: number;
}

export default function Scene5Lotus() {
  const ref = useRef<HTMLDivElement>(null);
  const waterRef = useRef<HTMLCanvasElement>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const rippleId = useRef(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [30, 0, 0, -20]);

  const addRipple = useCallback((e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const id = rippleId.current++;
    setRipples((prev) => [...prev.slice(-8), { x: e.clientX - rect.left, y: e.clientY - rect.top, id }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 3000);
  }, []);

  useEffect(() => {
    const canvas = waterRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const resize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const lotuses: Lotus[] = Array.from({ length: 5 }, (_, i) => ({
      x: 0.1 + Math.random() * 0.8,
      y: 0.3 + Math.random() * 0.5,
      size: 20 + Math.random() * 30,
      speedY: 0.05 + Math.random() * 0.1,
    }));

    let time = 0;

    const draw = () => {
      time += 0.005;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "rgba(5, 5, 5, 1)");
      gradient.addColorStop(0.3, "rgba(10, 10, 15, 0.95)");
      gradient.addColorStop(0.5, "rgba(13, 13, 20, 0.9)");
      gradient.addColorStop(0.7, "rgba(10, 10, 15, 0.95)");
      gradient.addColorStop(1, "rgba(5, 5, 5, 1)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let x = 0; x < canvas.width; x += 80) {
        for (let y = canvas.height * 0.3; y < canvas.height * 0.8; y += 80) {
          const waveX = Math.sin(x * 0.02 + time * 2) * 2;
          const waveY = Math.sin(y * 0.02 + time * 1.5) * 2;
          ctx.fillStyle = "rgba(196, 160, 229, 0.015)";
          ctx.beginPath();
          ctx.arc(x + waveX, y + waveY, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      lotuses.forEach((l) => {
        const x = l.x * canvas.width;
        const y = l.y * canvas.height + Math.sin(time * l.speedY * 10 + l.x) * 5;

        ctx.save();
        ctx.translate(x, y);
        ctx.globalAlpha = 0.3;
        ctx.scale(l.size / 50, l.size / 50);

        for (let i = 0; i < 5; i++) {
          const angle = (i / 5) * Math.PI * 2 + Math.sin(time * 0.5 + i) * 0.05;
          ctx.save();
          ctx.rotate(angle);
          ctx.beginPath();
          ctx.ellipse(0, -20, 6, 20, 0, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(196, 160, 229, 0.3)";
          ctx.fill();
          ctx.strokeStyle = "rgba(196, 160, 229, 0.05)";
          ctx.lineWidth = 0.5;
          ctx.stroke();
          ctx.restore();
        }

        ctx.beginPath();
        ctx.arc(0, 0, 3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(212, 168, 67, 0.15)";
        ctx.fill();

        ctx.restore();
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      ref={ref}
      className="scene bg-[#050505] relative overflow-hidden cursor-crosshair"
      onMouseMove={addRipple}
    >
      <canvas ref={waterRef} className="absolute inset-0" />

      {ripples.map((r) => (
        <div
          key={r.id}
          className="ripple"
          style={{ left: r.x, top: r.y, width: 20, height: 20 }}
        />
      ))}

      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="relative z-10 text-center px-6 max-w-3xl mx-auto"
      >
        <span className="text-subtitle block mb-6">
          Lotus
        </span>

        <p className="text-quote text-cream leading-tight mb-6">
          Like the lotus,
          <br />
          <span className="text-purple">you rise</span> from the depths
          <br />
          and bloom untouched.
        </p>

        <div className="border-line w-16 mx-auto my-6" />

        <p className="text-arabic text-xl md:text-2xl text-cream-dim leading-relaxed" dir="rtl">
          كزهرة اللوتس،
          <br />
          <span className="text-purple/70">ترتفعين</span> من الأعماق
          <br />
          وتتفتحين نقية
        </p>
      </motion.div>
    </section>
  );
}
