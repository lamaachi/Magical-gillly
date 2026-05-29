"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

function LotusFlower({ index }: { index: number }) {
  const size = 40 + Math.random() * 60;
  const x = 10 + Math.random() * 80;
  const delay = Math.random() * 3;
  const duration = 4 + Math.random() * 3;

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${x}%`,
        bottom: `${-10 + Math.random() * 30}%`,
        width: size,
        height: size,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.6, 0.6, 0],
        scale: [0, 1, 1, 0],
        y: [0, -20 - Math.random() * 40, -40 - Math.random() * 60],
      }}
      transition={{
        duration: duration + 3,
        repeat: Infinity,
        delay: delay + index * 0.5,
        ease: "easeInOut",
      }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {[0, 1, 2, 3, 4].map((petal) => (
          <path
            key={petal}
            d="M50 50 Q30 20 50 5 Q70 20 50 50Z"
            fill={`hsla(${320 + Math.random() * 30}, 70%, 70%, ${0.15 + Math.random() * 0.2})`}
            transform={`rotate(${petal * 72}, 50, 50)`}
          />
        ))}
        <circle cx="50" cy="50" r="6" fill="rgba(212, 168, 67, 0.3)" />
      </svg>
    </motion.div>
  );
}

export default function LotusGarden() {
  const lotusCount = 12;
  const lotusRefs = useRef<number[]>(Array.from({ length: lotusCount }, (_, i) => i));

  return (
    <section
      id="lotus-garden"
      className="relative py-24 sm:py-32 px-4 overflow-hidden"
    >
      <div
        className="absolute inset-0 animate-water-shimmer"
        style={{
          background: "linear-gradient(135deg, rgba(10,10,18,1) 0%, rgba(18,18,30,1) 25%, rgba(26,26,46,1) 50%, rgba(18,18,30,1) 75%, rgba(10,10,18,1) 100%)",
        }}
      />

      {lotusRefs.current.map((i) => (
        <LotusFlower key={i} index={i} />
      ))}

      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-[0.03]">
          <defs>
            <pattern id="ripples" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="20" fill="none" stroke="white" strokeWidth="0.5" opacity="0.3">
                <animate attributeName="r" values="10;30;10" dur="4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.3;0;0.3" dur="4s" repeatCount="indefinite" />
              </circle>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ripples)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-soft-purple/60 mb-4 block font-serif">
            Lotus Garden
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gradient mb-6">
            Like a lotus, you bloom
          </h2>
          <p className="font-cormorant text-lg sm:text-xl text-cream/50 italic max-w-2xl mx-auto leading-relaxed">
            Beautiful, pure, and rising above everything — just like you, my love.
          </p>
          <p
            className="font-arabic text-lg sm:text-xl text-lotus-pink/60 leading-relaxed mt-4"
            dir="rtl"
          >
            جميلة، نقية، ترتفعين فوق كل شيء — تماماً مثلكِ يا حبيبتي
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-bg to-transparent z-10" />
    </section>
  );
}
