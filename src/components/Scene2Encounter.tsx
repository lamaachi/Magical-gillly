"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Scene2Encounter() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const dateScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 1, 1, 0.8]);
  const dateOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.3, 0.7], [60, 0, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const lineWidth = useTransform(scrollYProgress, [0.2, 0.4], ["0%", "100%"]);

  return (
    <section ref={ref} className="scene bg-[#050505]">
      <div className="absolute inset-0 flex">
        <div className="hidden md:block w-2/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#0a0a0a] to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-purple/3 blur-[120px]" />
        </div>
        <div className="flex-1 relative" />
      </div>

      <motion.div
        style={{ opacity: dateOpacity, scale: dateScale }}
        className="relative z-10 px-6 md:px-16 w-full max-w-7xl mx-auto"
      >
        <div className="md:ml-auto md:w-3/5">
          <div className="mb-6 md:mb-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-start gap-3"
            >
              <span className="text-giant text-cream leading-none tracking-tighter">
                31
              </span>
              <span className="text-3xl md:text-5xl font-display text-cream-dim leading-none pt-2">
                .10.24
              </span>
            </motion.div>

            <motion.div
              style={{ scaleX: lineWidth }}
              className="h-px bg-gradient-to-r from-purple/40 via-cream-faint to-transparent mt-6 md:mt-8 origin-left"
            />
          </div>

          <motion.div
            style={{ y: textY, opacity: textOpacity }}
            className="space-y-6 mt-10"
          >
            <p className="text-quote text-cream leading-tight max-w-xl">
              The day destiny
              <br />
              <span className="italic text-purple">stopped being a word</span>
              <br />
              and became a person.
            </p>

            <div className="pt-4">
              <p className="text-arabic text-xl sm:text-2xl text-cream-dim leading-relaxed" dir="rtl">
                اليوم الذي توقف فيه القدر عن كونه مجرد
                <br />
                <span className="text-purple/70">كلمة</span>
                ، وأصبح إنساناً
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.8 }}
              className="pt-6"
            >
              <span className="text-xs tracking-[0.25em] text-cream-faint uppercase">
                Where our story began
              </span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
