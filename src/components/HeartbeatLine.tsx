"use client";

import { useEffect, useRef } from "react";

export default function HeartbeatLine() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 100;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      time += 0.02;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const amplitude = 30;
      const frequency = 0.008;
      const baseY = canvas.height / 2;

      ctx.beginPath();
      ctx.moveTo(0, baseY);

      for (let x = 0; x <= canvas.width; x += 2) {
        let y = baseY;

        const normal = Math.sin(x * frequency + time * 2) * 10;

        const beatPhase = (x * 0.02 + time * 3) % (Math.PI * 2);
        let beat = 0;
        if (beatPhase > 0 && beatPhase < 0.3) {
          beat = -amplitude * 4;
        } else if (beatPhase > 0.3 && beatPhase < 0.4) {
          beat = amplitude * 3;
        } else if (beatPhase > 0.4 && beatPhase < 0.7) {
          beat = -amplitude * 3.5;
        } else if (beatPhase > 0.7 && beatPhase < 0.8) {
          beat = amplitude * 2;
        }

        y += normal + beat;
        ctx.lineTo(x, y);
      }

      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, "rgba(248, 180, 200, 0)");
      gradient.addColorStop(0.15, "rgba(248, 180, 200, 0.6)");
      gradient.addColorStop(0.5, "rgba(196, 160, 229, 0.8)");
      gradient.addColorStop(0.85, "rgba(248, 180, 200, 0.6)");
      gradient.addColorStop(1, "rgba(248, 180, 200, 0)");

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.shadowColor = "rgba(248, 180, 200, 0.5)";
      ctx.shadowBlur = 10;
      ctx.stroke();

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-[100px] opacity-60"
    />
  );
}
