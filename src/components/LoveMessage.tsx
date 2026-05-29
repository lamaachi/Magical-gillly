"use client";

import { motion } from "framer-motion";
import HeartbeatLine from "./HeartbeatLine";

const messages = [
  {
    en: "You came into my life quietly... yet you became the most beautiful part of it.",
    ar: "منذ أن عرفتكِ، وأصبحتِ أجمل صدفة كتبها القدر في حياتي",
  },
  {
    en: "Every moment with you feels like a dream I never want to wake up from.",
    ar: "كل لحظة معكِ كأنها حلم لا أريد الاستيقاظ منه أبداً",
  },
  {
    en: "Your smile is the sun that lights up my darkest days.",
    ar: "ابتسامتكِ هي الشمس التي تنير أظلم أيامي",
  },
  {
    en: "In your eyes, I found my home.",
    ar: "في عينيكِ وجدت وطني",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.3 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

export default function LoveMessage() {
  return (
    <section
      id="love-message"
      className="relative py-24 sm:py-32 px-4"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-soft-purple/60 mb-4 block font-serif">
            Love Letters
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gradient mb-4">
            Words from my heart
          </h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-lotus-pink/40 to-soft-purple/40 mx-auto" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-8 sm:space-y-12"
        >
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`glass rounded-2xl p-6 sm:p-8 max-w-lg ${
                  i % 2 === 0 ? "sm:ml-8" : "sm:mr-8"
                }`}
                style={{
                  animation: "pulse-glow 3s ease-in-out infinite",
                  animationDelay: `${i * 0.5}s`,
                }}
              >
                <p className="font-serif text-lg sm:text-xl leading-relaxed text-cream/90 mb-4 italic">
                  &ldquo;{msg.en}&rdquo;
                </p>
                <p
                  className="font-arabic text-lg sm:text-xl leading-loose text-lotus-pink/80 text-right"
                  dir="rtl"
                >
                  &ldquo;{msg.ar}&rdquo;
                </p>
                {i < messages.length - 1 && (
                  <div className="mt-4 pt-4 border-t border-white/5">
                    <svg
                      className={`w-4 h-4 text-lotus-pink/40 ${i % 2 === 0 ? "" : "ml-auto"}`}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16"
        >
          <HeartbeatLine />
        </motion.div>
      </div>
    </section>
  );
}
