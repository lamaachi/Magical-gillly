"use client";

import { useState, useEffect } from "react";

export default function Countdown() {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    const startDate = new Date(2024, 9, 31);
    const update = () => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();
      setDays(Math.floor(diff / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((diff / (1000 * 60 * 60)) % 24));
      setMinutes(Math.floor((diff / (1000 * 60)) % 60));
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-soft-purple/60 mb-2 font-serif">
        Days Since We Met
      </p>
      <div className="flex items-center justify-center gap-4">
        <div className="text-center">
          <span className="block text-3xl sm:text-4xl font-serif font-bold text-gradient-pink">
            {days}
          </span>
          <span className="text-[10px] uppercase tracking-widest text-cream/40">
            Days
          </span>
        </div>
        <span className="text-lotus-pink/40 text-2xl font-light">:</span>
        <div className="text-center">
          <span className="block text-2xl sm:text-3xl font-serif font-bold text-cream/70">
            {String(hours).padStart(2, "0")}
          </span>
          <span className="text-[10px] uppercase tracking-widest text-cream/40">
            Hrs
          </span>
        </div>
        <span className="text-lotus-pink/40 text-2xl font-light">:</span>
        <div className="text-center">
          <span className="block text-2xl sm:text-3xl font-serif font-bold text-cream/70">
            {String(minutes).padStart(2, "0")}
          </span>
          <span className="text-[10px] uppercase tracking-widest text-cream/40">
            Min
          </span>
        </div>
      </div>
    </div>
  );
}
