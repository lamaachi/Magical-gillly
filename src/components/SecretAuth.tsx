"use client";

import { FormEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";

const BIRTHDAY = { day: 27, month: 1, year: 2006 };

function buildSecretCode({ day, month, year }: { day: number; month: number; year: number }) {
  return `${String(day).padStart(2, "0")}${String(month).padStart(2, "0")}${String(year)}`;
}

const SECRET_CODE = buildSecretCode(BIRTHDAY);

export default function SecretAuth({ onAuthorized }: { onAuthorized: () => void }) {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "error">("idle");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (code.trim() === SECRET_CODE) {
      onAuthorized();
    } else {
      setStatus("error");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-dark-bg/95 px-4"
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="glass-strong w-full max-w-md rounded-[32px] border border-lotus-pink/20 p-8 shadow-2xl shadow-black/40"
      >
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center rounded-full bg-lotus-pink/10 p-4 mb-4 text-lotus-pink shadow-lg shadow-lotus-pink/10">
            <span className="text-3xl">🌸</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-cream mb-2">Love Secret</h1>
          <p className="text-sm sm:text-base text-cream/60 font-arabic leading-relaxed">
            Give me a kiss, I will give u the code.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm text-cream/60">Type the secret code</span>
            <input
              type="password"
              value={code}
              onChange={(event) => {
                setCode(event.target.value);
                setStatus("idle");
              }}
              placeholder="Enter the secret code"
              className="mt-2 w-full rounded-3xl border border-lotus-pink/20 bg-[#11121e] px-4 py-3 text-cream outline-none focus:border-lotus-pink/40 focus:ring-2 focus:ring-lotus-pink/10"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-3xl bg-gradient-to-r from-lotus-pink to-soft-purple px-6 py-3 text-sm font-semibold text-dark-bg transition hover:scale-[1.01]"
          >
            Unlock with love
          </button>

          {status === "error" && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center text-sm text-lotus-pink font-semibold"
            >
              This is only for my baby girl.
            </motion.p>
          )}

          <p className="text-center text-xs uppercase tracking-[0.2em] text-cream/40 mt-2">
            Keep this page secret — only the one who knows the date can enter.
          </p>
        </form>
      </motion.div>
    </motion.div>
  );
}
