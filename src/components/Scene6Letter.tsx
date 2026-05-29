"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const letterEN = [
  { text: "My Donia," },
  { text: "In a world that rushes endlessly, you taught me the quiet art of staying." },
  { text: "Every breath I take carries your name, every silence holds your voice." },
  { text: "You are not just someone I love." },
  { text: "You are the person I was always meant to find." },
];

const letterAR = [
  { text: "يا دنيا" },
  { text: "في عالم يندفع بلا توقف، علمتني فن البقاء الهادئ." },
  { text: "كل نفس يأخذه يحمل اسمك، كل صمت يحمل صوتك." },
  { text: "أنتِ لستِ مجرد من أحب." },
  { text: "أنتِ الشخص الذي كنت دائماً مقدراً لي أن أجده." },
];

export default function Scene6Letter() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [40, 0, 0, -20]);

  return (
    <section ref={ref} className="scene bg-[#050505]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-surface/20 to-transparent pointer-events-none" />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-cream-faint to-transparent" />

      <motion.div
        style={{ opacity, y }}
        className="relative z-10 w-full max-w-3xl mx-auto px-6 py-16"
      >
        <div className="mb-12 md:mb-16">
          <span className="text-subtitle block mb-3">
            A Letter
          </span>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] text-cream leading-none font-bold">
            For You
          </h2>
          <div className="border-line mt-4 w-24" />
        </div>

        <div className="space-y-6 md:space-y-8">
          {letterEN.map((line, i) => (
            <motion.p
              key={`en-${i}`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-quote text-cream leading-tight"
            >
              {line.text}
            </motion.p>
          ))}
        </div>

        <div className="border-line my-12 md:my-16" />

        <div className="space-y-6 md:space-y-8 text-right" dir="rtl">
          {letterAR.map((line, i) => (
            <motion.p
              key={`ar-${i}`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: i * 0.15 + 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-arabic text-xl md:text-2xl text-purple/60 leading-relaxed"
            >
              {line.text}
            </motion.p>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 1 }}
          className="mt-16 md:mt-20 text-center"
        >
          <div className="border-line w-16 mx-auto mb-6" />
          <p className="text-xs tracking-[0.3em] text-cream-faint uppercase font-body">
            Youssef
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
