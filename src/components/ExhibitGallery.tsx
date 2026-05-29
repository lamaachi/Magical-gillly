"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const frames = [
  { id: 1, label: "I" },
  { id: 2, label: "II" },
  { id: 3, label: "III" },
  { id: 4, label: "IV" },
  { id: 5, label: "V" },
  { id: 6, label: "VI" },
];

function GalleryFrame({ item, index }: { item: typeof frames[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.1"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [30, 0, 0, -15]);
  const scale = useTransform(scrollYProgress, [0, 0.15], [0.92, 1]);

  const aspectClasses = [
    "aspect-[3/4]", "aspect-[4/5]", "aspect-[5/4]",
    "aspect-[4/5]", "aspect-[3/4]", "aspect-[5/4]",
  ];

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, scale }}
      className="group frame-gold"
    >
      <div className={`relative overflow-hidden bg-surface ${aspectClasses[index]} border border-cream-faint/5`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className="text-5xl md:text-7xl text-cream-faint/20 select-none" style={{ fontFamily: "var(--font-display)", fontVariationSettings: "'SOFT' 80, 'WONK' 1" }}>
              {item.label}
            </span>
            <p className="text-[0.5rem] tracking-[0.3em] text-cream-faint/20 uppercase mt-2">
              Specimen
            </p>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-2 group-hover:translate-y-0">
          <div className="h-px bg-gold-faint/30 mb-2" />
          <p className="text-[0.5rem] tracking-[0.25em] text-cream/40 uppercase">Add your photograph</p>
        </div>

        <div className="absolute top-3 left-3 archival-label text-[0.45rem] py-1 px-2 border-cream-faint/10 bg-black/30">
          {item.label}
        </div>
      </div>
    </motion.div>
  );
}

export default function ExhibitGallery() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section ref={ref} className="exhibit bg-black flex-col">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <span className="lotus-mark" style={{ bottom: "10%", right: "5%", opacity: 0.015 }}>✦</span>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 py-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10 md:mb-16"
        >
          <span className="label-sm">Exhibit No. 3</span>
          <span className="ml-4 text-cream-faint/30 text-xs">—</span>
          <span className="ml-4 label-sm text-cream-dim/30">Archival Photographs</span>
          <h2 className="display-md text-cream mt-3" style={{ fontVariationSettings: "'SOFT' 80" }}>
            Still Frames
          </h2>
          <div className="rule-gold mt-4" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {frames.map((f, i) => (
            <GalleryFrame key={f.id} item={f} index={i} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-12 text-[0.55rem] tracking-[0.35em] text-cream-faint/30 uppercase"
        >
          Place your photographs within these frames
        </motion.p>
      </div>
    </section>
  );
}
