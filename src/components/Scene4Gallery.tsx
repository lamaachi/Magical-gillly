"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const images = [
  { id: 1, label: "01", aspect: "4/5" },
  { id: 2, label: "02", aspect: "3/4" },
  { id: 3, label: "03", aspect: "5/4" },
  { id: 4, label: "04", aspect: "4/5" },
  { id: 5, label: "05", aspect: "3/4" },
  { id: 6, label: "06", aspect: "5/4" },
];

export default function Scene4Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [0, 1, 1]);

  return (
    <section ref={ref} className="scene bg-[#050505] flex-col">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-surface/30 to-transparent pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16">
        <motion.div style={{ opacity: headerOpacity }} className="mb-12 md:mb-16">
          <span className="text-subtitle block mb-3">
            Fragments of Us
          </span>
          <h2 className="text-huge text-cream leading-none">
            Still Frames
          </h2>
          <div className="border-line mt-4 w-32" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {images.map((img, i) => (
            <GalleryFrame key={img.id} img={img} index={i} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center mt-12 text-xs tracking-[0.3em] text-cream-faint uppercase"
        >
          Your images will appear here
        </motion.p>
      </div>
    </section>
  );
}

function GalleryFrame({
  img,
  index,
}: {
  img: { id: number; label: string; aspect: string };
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.1"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [40, 0, 0, -20]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.95]);
  const rotate = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? 2 : -2, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, scale, rotate }}
      className="group cursor-pointer"
    >
      <div
        className="relative overflow-hidden bg-dark-surface border border-white/5"
        style={{ aspectRatio: img.aspect }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className="text-6xl md:text-8xl font-display text-cream-faint select-none">
              {img.label}
            </span>
            <p className="text-xs tracking-widest text-cream-faint uppercase mt-2 font-body">
              Your photo
            </p>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-2 group-hover:translate-y-0">
          <div className="border-line mb-2" />
          <p className="text-xs tracking-[0.2em] text-cream/50 uppercase">
            Memory placeholder
          </p>
        </div>

        <div className="absolute top-3 left-3 w-6 h-6 border border-white/10 rounded-full flex items-center justify-center">
          <span className="text-[9px] text-cream-faint">{img.label}</span>
        </div>
      </div>
    </motion.div>
  );
}
