"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const galleryImages = [
  {
    src: "/moments/us1.jpeg",
    alt: "Our first memory together",
    caption: "Our first memory",
  },
  {
    src: "/moments/us2.jpeg",
    alt: "Our second memory together",
    caption: "Our second memory",
  },
];

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="relative py-24 sm:py-32 px-4"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-soft-purple/60 mb-4 block font-serif">
            Our Gallery
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gradient mb-4">
            Precious Moments
          </h2>
          <p className="font-cormorant text-lg text-cream/50 italic">
            A collection of our beautiful memories together
          </p>
          <div className="w-16 h-[1px] bg-gradient-to-r from-lotus-pink/40 to-soft-purple/40 mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {galleryImages.map((image, i) => (
            <motion.div
              key={image.src}
              initial={{ opacity: 0, y: 40, rotate: i % 2 === 0 ? -2 : 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="polaroid rounded-lg cursor-pointer group overflow-hidden"
              style={{
                animation: `polaroid-float ${4 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
              }}
            >
              <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-dark-surface">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <p className="text-center text-xs text-cream/30 mt-3 font-cormorant italic">
                {image.caption}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-12 text-sm text-cream/30 font-cormorant italic"
        >
          ✦ More photos to be added ✦
        </motion.p>
      </div>
    </section>
  );
}
