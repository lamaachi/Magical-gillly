"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const lines = [
  {
    en: "You entered my world not as a visitor — but as a place I had been searching for.",
    ar: "دخلتِ عالمي ليس كزائرة — بل كمكان كنت أبحث عنه",
  },
  {
    en: "Every moment with you feels like a quiet rebellion against the ordinary.",
    ar: "كل لحظة معكِ تشبه تمرداً هادئاً على العادي",
  },
  {
    en: "Your presence is the only poetry my silence has ever known.",
    ar: "حضوركِ هو القصيدة الوحيدة التي عرفها صمتي",
  },
];

export default function Scene3Narrative() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 0.03, 0.03, 0]);

  return (
    <section ref={ref} className="scene bg-[#050505] flex-col gap-0 relative">
      <motion.div
        style={{ opacity: bgOpacity }}
        className="absolute inset-0 bg-gradient-to-b from-purple/5 via-transparent to-purple/5 pointer-events-none"
      />

      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cream-faint to-transparent hidden md:block" style={{ left: "8vw" }} />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-16 py-16">
        {lines.map((line, i) => (
          <NarrativeBlock key={i} line={line} index={i} />
        ))}
      </div>
    </section>
  );
}

function NarrativeBlock({
  line,
  index,
}: {
  line: { en: string; ar: string };
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [40, 0, 0, -20]);
  const blur = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [6, 0, 0, 3]);

  const alignRight = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, filter: blur ? `blur(${blur}px)` : "none" }}
      className={`py-16 md:py-24 flex ${alignRight ? "md:justify-start md:pl-[12vw]" : "md:justify-end md:pr-[12vw]"}`}
    >
      <div className={`max-w-lg ${alignRight ? "" : "md:text-right"}`}>
        <span className="text-7xl md:text-9xl font-display text-cream-faint absolute -mt-12 md:-mt-16 -ml-4 select-none leading-none">
          &ldquo;
        </span>
        <p className="text-quote text-cream leading-tight relative z-10">
          {line.en}
        </p>
        <div className="border-line my-6 w-16" />
        <p
          className="text-arabic text-lg md:text-xl text-purple/60 leading-relaxed"
          dir="rtl"
        >
          {line.ar}
        </p>
        <p className="text-xs tracking-[0.3em] text-cream-faint uppercase mt-6">
          — {index + 1}
        </p>
      </div>
    </motion.div>
  );
}
