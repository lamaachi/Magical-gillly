"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const letterContent = {
  en: "My dearest Donia,\n\nFrom the moment our paths crossed, I knew something extraordinary had happened. You walked into my life and brought colors I never knew existed. Every laugh we share, every glance, every quiet moment — they are all treasures I hold close to my heart.\n\nYou are my peace in a chaotic world, my joy in moments of sadness, and my home wherever I go. With you, I've learned what it means to love and be loved completely.\n\nNo matter where life takes us, I only know that every beautiful moment begins with you.\n\nForever yours,\nYoussef",
  ar: "حبيبتي دنيا،\n\nمنذ أن تقاطعت مساراتنا، عرفت أن شيئاً استثنائياً قد حدث. دخلتِ حياتي وجلبتِ معكِ ألواناً لم أعرف بوجودها من قبل. كل ضحكة نشاركها، كل نظرة، كل لحظة هادئة — كلها كنوز أحتفظ بها قريباً من قلبي.\n\nأنتِ سلامي في عالم مضطرب، فرحي في لحظات الحزن، ووطني أينما ذهبت. معكِ تعلمت معنى أن أحب وأن أكون محبوباً بالكامل.\n\nلا يهم أين تأخذنا الحياة، كل ما أعرفه أن كل لحظة جميلة تبدأ بكِ.\n\nإلى الأبد ملككِ،\nيوسف",
};

export default function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => setShowContent(true), 1000);
  };

  return (
    <section
      id="love-letter"
      className="relative py-24 sm:py-32 px-4"
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-soft-purple/60 mb-4 block font-serif">
            A Letter for You
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gradient mb-4">
            Words from the Heart
          </h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-lotus-pink/40 to-soft-purple/40 mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div
            className={`glass rounded-2xl p-8 sm:p-12 md:p-16 transition-all duration-1000 ${
              isOpen ? "min-h-[300px]" : "cursor-pointer min-h-[200px] flex items-center justify-center"
            }`}
            onClick={!isOpen ? handleOpen : undefined}
          >
            {!isOpen ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
              >
                <motion.div
                  animate={{ rotate: [0, -5, 5, -5, 0], y: [0, -4, 4, -4, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <svg
                    className="w-16 h-16 mx-auto text-lotus-pink/40 mb-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z" />
                  </svg>
                </motion.div>
                <p className="font-handwritten text-xl sm:text-2xl text-cream/60">
                  Open your letter ❤️
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: showContent ? 1 : 0 }}
                transition={{ duration: 1 }}
                className="space-y-8"
              >
                <div className="text-center mb-8">
                  <svg
                    className="w-8 h-8 mx-auto text-lotus-pink/40"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>

                <div className="space-y-6">
                  {letterContent.en.split("\n").map((line, i) => (
                    <motion.p
                      key={`en-${i}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
                      className={`font-serif text-base sm:text-lg leading-relaxed text-cream/80 ${
                        line.startsWith("Forever") || line.startsWith("Youssef")
                          ? "text-lotus-pink/70 mt-6 italic"
                          : ""
                      }`}
                    >
                      {line}
                    </motion.p>
                  ))}
                </div>

                <div className="border-t border-white/10 pt-8 mt-8">
                  <div className="space-y-6" dir="rtl">
                    {letterContent.ar.split("\n").map((line, i) => (
                      <motion.p
                        key={`ar-${i}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.5 + i * 0.15 }}
                        className={`font-arabic text-base sm:text-lg leading-loose text-lotus-pink/70 text-right ${
                          line.startsWith("إلى") || line.startsWith("يوسف")
                            ? "text-soft-purple/70 mt-6 italic"
                            : ""
                        }`}
                      >
                        {line}
                      </motion.p>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {isOpen && showContent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.5 }}
              className="text-center mt-8"
            >
              <button
                onClick={() => {
                  setIsOpen(false);
                  setShowContent(false);
                }}
                className="text-xs text-cream/30 hover:text-lotus-pink/50 transition-colors font-cormorant tracking-wider uppercase"
              >
                ✦ Close letter ✦
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
