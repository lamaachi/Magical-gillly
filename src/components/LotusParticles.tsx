"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Lotus {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotSpeed: number;
  opacity: number;
  petalCount: number;
}

export default function LotusParticles({ count = 6 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const lotusRef = useRef<Lotus[]>([]);

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

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouse);

    lotusRef.current = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 20 + Math.random() * 40,
      speedX: (Math.random() - 0.5) * 0.15,
      speedY: (Math.random() - 0.5) * 0.15,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.002,
      opacity: 0.08 + Math.random() * 0.12,
      petalCount: 5 + Math.floor(Math.random() * 3),
    }));

    const drawLotus = (l: Lotus) => {
      const { x, y, size, rotation, opacity, petalCount } = l;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = opacity;

      for (let i = 0; i < petalCount; i++) {
        const angle = (i / petalCount) * Math.PI * 2;
        ctx.save();
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.ellipse(0, -size * 0.35, size * 0.12, size * 0.35, 0, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(196, 160, 229, 0.6)";
        ctx.fill();
        ctx.strokeStyle = "rgba(196, 160, 229, 0.1)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
        ctx.restore();
      }

      ctx.beginPath();
      ctx.arc(0, 0, size * 0.06, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(212, 168, 67, 0.3)";
      ctx.fill();

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      lotusRef.current.forEach((l) => {
        const dx = mx - l.x;
        const dy = my - l.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 200 && dist > 0) {
          const force = (200 - dist) / 200 * 0.5;
          l.x -= (dx / dist) * force;
          l.y -= (dy / dist) * force;
        }

        l.x += l.speedX;
        l.y += l.speedY;
        l.rotation += l.rotSpeed;

        if (l.x < -50) l.x = canvas.width + 50;
        if (l.x > canvas.width + 50) l.x = -50;
        if (l.y < -50) l.y = canvas.height + 50;
        if (l.y > canvas.height + 50) l.y = -50;

        drawLotus(l);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
    />
  );
}
