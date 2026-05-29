"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ExhibitDate() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [60, 0, 0, -30]);

  return (
    <section ref={ref} className="exhibit bg-black">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <span className="lotus-mark" style={{ bottom: "-5%", right: "-5%", transform: "rotate(15deg)" }}>✦</span>
        <span className="lotus-mark" style={{ top: "-8%", left: "-3%", transform: "rotate(-30deg)", fontSize: "8rem", opacity: 0.025 }}>✦</span>
      </div>

      <motion.div
        style={{ opacity, y }}
        className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-16"
      >
        <div className="md:max-w-3xl md:ml-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="label-sm">Exhibit No. 1</span>
            <span className="ml-4 text-cream-faint/30 text-xs">—</span>
            <span className="ml-4 label-sm text-cream-dim/30">The Origin</span>
          </motion.div>

          <div className="mt-8 md:mt-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex items-start gap-4"
            >
              <span className="display-xl text-cream leading-none" style={{ fontSize: "clamp(5rem, 16vw, 14rem)", fontVariationSettings: "'SOFT' 90, 'WONK' 1" }}>
                31
              </span>
              <span className="display-lg text-gold/50 leading-none pt-2" style={{ fontVariationSettings: "'SOFT' 60" }}>
                .10.24
              </span>
            </motion.div>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.77, 0, 0.175, 1] }}
              className="rule-gold-long mt-8 origin-left"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-10 md:mt-14 max-w-xl"
          >
            <p className="body-lg text-cream-dim leading-relaxed">
              The precise coordinates of a beginning.
              <br />
              <span className="text-cream/40">A date that ceased to be ordinary</span>
              <br />
              and became&nbsp;
              <span className="text-gold" style={{ fontVariationSettings: "'SOFT' 80", fontFamily: "var(--font-display)" }}>
                significant.
              </span>
            </p>

            <div className="mt-8 pt-8 border-t border-cream-faint/20">
              <p className="text-arabic text-lg md:text-xl text-gold/40 leading-relaxed" dir="rtl">
                إحداثيات البداية
                <br />
                <span className="text-cream-dim/30">تاريخ توقف عن أن يكون عادياً</span>
                <br />
                وأصبح&nbsp;
                <span className="text-gold/60">مهمّاً</span>
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mt-10"
            >
              <span className="archival-label text-[0.55rem]">
                <span className="w-2 h-px bg-gold/40 inline-block" />
                Accession date: 31 October 2024
                <span className="w-2 h-px bg-gold/40 inline-block" />
              </span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
