"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Star {
  x: number;
  y: number;
  size: number;
  phase: number;
  speed: number;
}

export default function Scene7Ending() {
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8], [0, 1, 1, 1]);
  const finalOpacity = useTransform(scrollYProgress, [0.5, 0.7, 1], [0, 1, 1]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const stars: Star[] = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height * 0.6,
      size: 0.3 + Math.random() * 1.5,
      phase: Math.random() * Math.PI * 2,
      speed: 0.2 + Math.random() * 0.5,
    }));

    let petals: { x: number; y: number; size: number; speedX: number; speedY: number; rotation: number; rotSpeed: number }[] = [];
    for (let i = 0; i < 6; i++) {
      petals.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 6 + Math.random() * 10,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: -0.3 - Math.random() * 0.4,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.01,
      });
    }

    let time = 0;

    const draw = () => {
      time += 0.005;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "rgba(5, 5, 5, 1)");
      gradient.addColorStop(0.4, "rgba(8, 8, 12, 1)");
      gradient.addColorStop(0.6, "rgba(10, 10, 16, 0.95)");
      gradient.addColorStop(0.75, "rgba(8, 8, 20, 0.9)");
      gradient.addColorStop(1, "rgba(5, 5, 15, 0.8)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach((s) => {
        const twinkle = Math.sin(time * s.speed * 5 + s.phase);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 240, 235, ${0.15 + Math.abs(twinkle) * 0.3})`;
        ctx.fill();
      });

      petals.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotSpeed;

        if (p.y < -20) {
          p.y = canvas.height + 20;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = 0.2;

        ctx.beginPath();
        ctx.ellipse(0, 0, p.size / 2, p.size / 4, 0, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(196, 160, 229, 0.3)";
        ctx.fill();

        ctx.restore();
      });

      const waterY = canvas.height * 0.78;
      for (let x = 0; x < canvas.width; x += 2) {
        const wave = Math.sin(x * 0.008 + time * 3) * 2 +
                     Math.sin(x * 0.015 + time * 2) * 1.5;
        ctx.fillStyle = `rgba(196, 160, 229, ${0.01 + Math.sin(x * 0.01 + time) * 0.005})`;
        ctx.fillRect(x, waterY + wave, 2, 2);
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section ref={ref} className="scene bg-[#050505] relative">
      <canvas ref={canvasRef} className="absolute inset-0" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div style={{ opacity: textOpacity }}>
          <p className="text-quote text-cream leading-tight mb-8 max-w-2xl mx-auto">
            Every beautiful moment
            <br />
            <span className="text-purple">begins with you</span>
          </p>

          <div className="border-line w-16 mx-auto mb-8" />

          <p className="text-arabic text-xl md:text-2xl text-cream-dim leading-relaxed mb-12" dir="rtl">
            كل لحظة جميلة
            <br />
            <span className="text-purple/70">تبدأ بك</span>
          </p>
        </motion.div>

        <motion.div
          style={{ opacity: finalOpacity }}
          className="mt-16 md:mt-24"
        >
          <div className="border-line w-24 mx-auto mb-8" />

          <p className="text-2xl md:text-4xl font-display text-cream tracking-[0.2em] uppercase mb-3">
            Youssef
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(196, 160, 229, 0.3)"
              strokeWidth="1"
              className="mx-auto mt-6"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>

          <p className="text-xs tracking-[0.4em] text-cream-faint uppercase mt-12 font-body">
            31.10.24 &mdash; Forever
          </p>
        </motion.div>
      </div>
    </section>
  );
}
