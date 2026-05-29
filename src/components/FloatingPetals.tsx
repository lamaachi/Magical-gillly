"use client";

import { useEffect, useState } from "react";

interface Petal {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  duration: number;
  delay: number;
  opacity: number;
  sway: number;
}

export default function FloatingPetals({ count = 15 }: { count?: number }) {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const generated: Petal[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 12 + Math.random() * 20,
      rotation: Math.random() * 360,
      duration: 10 + Math.random() * 20,
      delay: Math.random() * 15,
      opacity: 0.15 + Math.random() * 0.25,
      sway: 5 + Math.random() * 15,
    }));
    setPetals(generated);
  }, [count]);

  if (petals.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.x}%`,
            top: `${petal.y}%`,
            width: `${petal.size}px`,
            height: `${petal.size}px`,
            opacity: petal.opacity,
            animation: `
              float-petal-${petal.id % 5} ${petal.duration}s ease-in-out ${petal.delay}s infinite,
              sway-petal ${petal.duration * 0.5}s ease-in-out ${petal.delay}s infinite
            `,
          }}
        >
          <svg
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            style={{ transform: `rotate(${petal.rotation}deg)` }}
          >
            <path
              d="M20 2C20 2 12 10 12 18C12 24 16 28 20 30C24 28 28 24 28 18C28 10 20 2 20 2Z"
              fill="url(#petalGradient)"
              opacity="0.8"
            />
            <defs>
              <linearGradient id="petalGradient" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#f8b4c8" />
                <stop offset="1" stopColor="#c4a0e5" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      ))}
      <style jsx>{`
        @keyframes float-petal-0 {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-30vh) translateX(10px); }
          50% { transform: translateY(-60vh) translateX(-5px); }
          75% { transform: translateY(-30vh) translateX(8px); }
        }
        @keyframes float-petal-1 {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-25vh) translateX(-8px); }
          50% { transform: translateY(-55vh) translateX(12px); }
          75% { transform: translateY(-35vh) translateX(-6px); }
        }
        @keyframes float-petal-2 {
          0%, 100% { transform: translateY(0) translateX(0); }
          33% { transform: translateY(-40vh) translateX(15px); }
          66% { transform: translateY(-20vh) translateX(-10px); }
        }
        @keyframes float-petal-3 {
          0%, 100% { transform: translateY(0) translateX(0); }
          20% { transform: translateY(-20vh) translateX(-12px); }
          40% { transform: translateY(-50vh) translateX(8px); }
          60% { transform: translateY(-30vh) translateX(-4px); }
          80% { transform: translateY(-10vh) translateX(6px); }
        }
        @keyframes float-petal-4 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-45vh) translateX(20px); }
        }
        @keyframes sway-petal {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
      `}</style>
    </div>
  );
}
