"use client";

import { motion } from "framer-motion";

const events = [
  {
    date: "31/10/2024",
    title: "The Day We Met",
    description: "The day destiny introduced us. Everything changed from that moment.",
    ar: "اليوم الذي عرّفنا فيه القدر. كل شيء تغير منذ تلك اللحظة.",
  },
  {
    date: "Coming Soon",
    title: "Our First Memory",
    description: "A moment I will cherish forever...",
    ar: "لحظة سأعتز بها إلى الأبد...",
    placeholder: true,
  },
  {
    date: "Coming Soon",
    title: "Another Beautiful Moment",
    description: "Adding more memories together...",
    ar: "نضيف المزيد من الذكريات معاً...",
    placeholder: true,
  },
  {
    date: "Coming Soon",
    title: "Our Story Continues",
    description: "Every day with you is a new page in our beautiful story.",
    ar: "كل يوم معكِ صفحة جديدة في قصتنا الجميلة.",
    placeholder: true,
  },
];

export default function Timeline() {
  return (
    <section
      id="timeline"
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
            Our Story
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gradient mb-4">
            The Journey of Us
          </h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-lotus-pink/40 to-soft-purple/40 mx-auto" />
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-lotus-pink/30 via-soft-purple/30 to-transparent sm:-translate-x-px" />

          <div className="space-y-12 sm:space-y-16">
            {events.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                className={`relative flex items-start gap-6 sm:gap-0 ${
                  i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                }`}
              >
                <div className="hidden sm:block sm:w-1/2" />

                <div className="relative z-10 flex-shrink-0">
                  <div
                    className={`w-3 h-3 rounded-full border-2 ${
                      event.placeholder
                        ? "border-cream/20 bg-dark-bg"
                        : "border-lotus-pink bg-lotus-pink shadow-lg shadow-lotus-pink/30"
                    }`}
                  />
                </div>

                <div
                  className={`glass rounded-xl p-6 sm:p-8 flex-1 sm:w-1/2 ${
                    i % 2 === 0 ? "sm:mr-8" : "sm:ml-8"
                  }`}
                >
                  <span className="text-xs uppercase tracking-widest text-lotus-pink/60 font-serif">
                    {event.date}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold text-cream mt-2 mb-3">
                    {event.title}
                  </h3>
                  <p className="font-cormorant text-base sm:text-lg text-cream/60 leading-relaxed">
                    {event.description}
                  </p>
                  <p
                    className="font-arabic text-base sm:text-lg text-lotus-pink/60 leading-relaxed mt-3 text-right"
                    dir="rtl"
                  >
                    {event.ar}
                  </p>
                  {event.placeholder && (
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <div className="flex items-center gap-2 text-xs text-cream/30">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6l4 2" />
                        </svg>
                        Photos coming soon
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
