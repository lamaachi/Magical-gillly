"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const panels = [
  {
    en: "You entered my world not as a visitor — but as a place I had been searching for.",
    ar: "دخلتِ عالمي ليس كزائرة — بل كمكان كنت أبحث عنه",
  },
  {
    en: "Your presence is the only poetry my silence has ever known.",
    ar: "حضوركِ هو القصيدة الوحيدة التي عرفها صمتي",
  },
  {
    en: "Every moment with you feels like a quiet rebellion against the ordinary.",
    ar: "كل لحظة معكِ تشبه تمرداً هادئاً على العادي",
  },
];

function Panel({ item, index }: { item: typeof panels[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.15"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [40, 0, 0, -20]);
  const filterBlur = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [6, 0, 0, 3]);

  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, filter: filterBlur ? `blur(${filterBlur}px)` : "none" }}
      className={`flex ${isLeft ? "justify-start" : "justify-end"} py-12 md:py-16`}
    >
      <div className={`relative max-w-lg ${isLeft ? "md:pl-[8vw]" : "md:pr-[8vw]"} ${isLeft ? "" : "text-right"}`}>
        <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6 w-8 h-8 border-t border-l border-gold-faint/30" />
        <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 w-8 h-8 border-b border-r border-gold-faint/30" />

        <span className="label-sm text-cream-dim/20 mb-4 block" style={{ letterSpacing: "0.3em" }}>
          {String(index + 1).padStart(2, "0")}
        </span>

        <p className="body-lg text-cream leading-relaxed" style={{ fontFamily: "var(--font-display)", fontVariationSettings: "'SOFT' 70", fontSize: "clamp(1.2rem, 2.2vw, 1.6rem)", lineHeight: 1.3 }}>
          &ldquo;{item.en}&rdquo;
        </p>

        <div className="rule-gold my-6" style={{ marginLeft: isLeft ? "0" : "auto" }} />

        <p className="text-arabic text-base md:text-lg text-gold/40 leading-relaxed" dir="rtl">
          &ldquo;{item.ar}&rdquo;
        </p>

        <div className="rule-gold-long mt-6 opacity-20" />
      </div>
    </motion.div>
  );
}

export default function ExhibitLetters() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section ref={ref} className="exhibit bg-black flex-col">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <span className="lotus-mark" style={{ top: "20%", left: "5%", fontSize: "clamp(8rem, 20vw, 20rem)", opacity: 0.02 }}>✦</span>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-16 py-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8 md:mb-16"
        >
          <span className="label-sm">Exhibit No. 2</span>
          <span className="ml-4 text-cream-faint/30 text-xs">—</span>
          <span className="ml-4 label-sm text-cream-dim/30">Testimonies</span>
        </motion.div>

        <div className="space-y-8 md:space-y-4">
          {panels.map((panel, i) => (
            <Panel key={i} item={panel} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <span className="text-xs text-cream-faint/30 tracking-[0.3em] uppercase">— Three fragments —</span>
        </motion.div>
      </div>
    </section>
  );
}
