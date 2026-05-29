"use client";

import { FormEvent, useEffect, useState } from "react";
import { motion, AnimatePresence, keyframes } from "framer-motion";

const SESSION_KEY = "secretAuth_v1";

// Dynamic code generator based on the formula provided by the user:
// format: hour + 21/01/2006 + minute
function computeDynamicCode(date = new Date()) {
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  return `${hour}27012006${minute}`;
}

// Floating petal positions — seeded so they don't re-randomize on render
const PETALS = [
  { id: 1, left: "8%",  delay: 0,   dur: 7,  size: 18, emoji: "🌸" },
  { id: 2, left: "22%", delay: 1.2, dur: 9,  size: 14, emoji: "🌷" },
  { id: 3, left: "40%", delay: 0.5, dur: 8,  size: 20, emoji: "🌸" },
  { id: 4, left: "60%", delay: 2,   dur: 6,  size: 12, emoji: "🌺" },
  { id: 5, left: "75%", delay: 0.8, dur: 10, size: 16, emoji: "🌸" },
  { id: 6, left: "88%", delay: 1.6, dur: 7,  size: 14, emoji: "🌷" },
  { id: 7, left: "15%", delay: 3,   dur: 8,  size: 10, emoji: "💮" },
  { id: 8, left: "52%", delay: 2.5, dur: 9,  size: 11, emoji: "🌸" },
];

export default function SecretAuth({ onAuthorized }: { onAuthorized: () => void }) {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "pulse">("idle");
  const [heartbeat, setHeartbeat] = useState(false);

  useEffect(() => {
    // Check sessionStorage for existing valid authorization (30-minute TTL)
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { expiresAt: number } | null;
        if (parsed?.expiresAt && parsed.expiresAt > Date.now()) {
          // eslint-disable-next-line no-console
          console.info("[SecretAuth] restored session auth, expiresAt:", new Date(parsed.expiresAt).toISOString());
          onAuthorized();
          return;
        } else {
          sessionStorage.removeItem(SESSION_KEY);
        }
      }
    } catch (e) {
      // ignore storage errors
    }

    const logCode = () => {
      const expected = computeDynamicCode();
      // eslint-disable-next-line no-console
      console.info("[SecretAuth] current test code:", expected);
    };
    logCode();
    const id = setInterval(logCode, 60_000);
    return () => clearInterval(id);
  }, []);

  // Trigger heartbeat on error for extra drama
  useEffect(() => {
    if (status === "error") {
      setHeartbeat(true);
      const t = setTimeout(() => setHeartbeat(false), 800);
      return () => clearTimeout(t);
    }
  }, [status]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const expected = computeDynamicCode();
    if (code.trim() === expected) {
      // Save a 30-minute session token so the page remains unlocked for 30 minutes
      try {
        const expiresAt = Date.now() + 30 * 60 * 1000;
        sessionStorage.setItem(SESSION_KEY, JSON.stringify({ expiresAt }));
        // eslint-disable-next-line no-console
        console.info("[SecretAuth] saved session auth, expiresAt:", new Date(expiresAt).toISOString());
      } catch (e) {
        // ignore storage errors
      }
      onAuthorized();
    } else {
      setStatus("error");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 60% 20%, #2d0a1f 0%, #0e0614 40%, #050208 100%)",
      }}
    >
      {/* ── Ambient glow blobs ── */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{ zIndex: 0 }}
      >
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "15%",
            width: 340,
            height: 340,
            borderRadius: "50%",
            background: "radial-gradient(circle, #ff6b9d33 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "15%",
            right: "10%",
            width: 280,
            height: 280,
            borderRadius: "50%",
            background: "radial-gradient(circle, #c084fc22 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, #ff6b9d0a 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      {/* ── Floating petals ── */}
      {PETALS.map((p) => (
        <motion.span
          key={p.id}
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-40px",
            left: p.left,
            fontSize: p.size,
            zIndex: 1,
            userSelect: "none",
          }}
          animate={{
            y: ["0vh", "110vh"],
            rotate: [0, 360],
            opacity: [0, 0.7, 0.7, 0],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {p.emoji}
        </motion.span>
      ))}

      {/* ── Card ── */}
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: 440,
          margin: "0 16px",
          borderRadius: 36,
          border: "1px solid rgba(255,107,157,0.18)",
          padding: "40px 36px",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
          backdropFilter: "blur(24px)",
          boxShadow:
            "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,107,157,0.06) inset, 0 1px 0 rgba(255,255,255,0.08) inset",
        }}
      >
        {/* corner sparkles */}
        {["top-3 left-4", "top-3 right-4", "bottom-3 left-4", "bottom-3 right-4"].map(
          (pos, i) => (
            <motion.span
              key={i}
              aria-hidden="true"
              className={`absolute ${pos} text-[10px] opacity-40`}
              animate={{ opacity: [0.2, 0.7, 0.2], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 2 + i * 0.4, repeat: Infinity, delay: i * 0.5 }}
            >
              ✦
            </motion.span>
          )
        )}

        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          {/* beating heart icon */}
          <motion.div
            animate={
              heartbeat
                ? { scale: [1, 1.4, 0.9, 1.2, 1], rotate: [-5, 5, -3, 3, 0] }
                : { scale: [1, 1.08, 1] }
            }
            transition={
              heartbeat
                ? { duration: 0.7, ease: "easeOut" }
                : { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 72,
              height: 72,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(255,107,157,0.2) 0%, rgba(255,107,157,0.05) 70%)",
              border: "1px solid rgba(255,107,157,0.25)",
              fontSize: 32,
              marginBottom: 16,
              boxShadow: "0 0 32px rgba(255,107,157,0.15)",
            }}
          >
            💝
          </motion.div>

          <h1
            style={{
              fontFamily: "'Playfair Display', 'Georgia', serif",
              fontSize: "clamp(1.75rem, 5vw, 2.25rem)",
              fontWeight: 700,
              background: "linear-gradient(135deg, #fce4f0 30%, #ff6b9d 70%, #c084fc 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.01em",
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            Love Secret
          </h1>

          {/* decorative line */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              justifyContent: "center",
              margin: "12px 0 8px",
            }}
          >
            <div
              style={{
                height: 1,
                width: 40,
                background:
                  "linear-gradient(to right, transparent, rgba(255,107,157,0.4))",
              }}
            />
            <span style={{ fontSize: 10, color: "rgba(255,107,157,0.5)" }}>♥</span>
            <div
              style={{
                height: 1,
                width: 40,
                background:
                  "linear-gradient(to left, transparent, rgba(255,107,157,0.4))",
              }}
            />
          </div>

          <p
            style={{
              fontSize: "0.875rem",
              color: "rgba(252,228,240,0.55)",
              lineHeight: 1.6,
              margin: 0,
              fontStyle: "italic",
            }}
          >
            Give me a kiss, I will give u the code 🌸
          </p>
        </div>

        {/* ── Form ── */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <label style={{ display: "block" }}>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: "0.75rem",
                color: "rgba(252,228,240,0.5)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              🔑 Secret Code
            </span>
            <div style={{ position: "relative" }}>
              <input
                type="password"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setStatus("idle");
                }}
                placeholder="Enter our little secret…"
                style={{
                  width: "100%",
                  padding: "13px 44px 13px 18px",
                  borderRadius: 24,
                  border: `1px solid ${status === "error" ? "rgba(255,107,157,0.5)" : "rgba(255,107,157,0.15)"}`,
                  background: "rgba(255,255,255,0.04)",
                  color: "#fce4f0",
                  fontSize: "0.9rem",
                  outline: "none",
                  letterSpacing: "0.1em",
                  boxShadow:
                    status === "error"
                      ? "0 0 0 3px rgba(255,107,157,0.12)"
                      : "0 0 0 0px transparent",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(255,107,157,0.45)";
                  e.target.style.boxShadow = "0 0 0 3px rgba(255,107,157,0.08)";
                }}
                onBlur={(e) => {
                  if (status !== "error") {
                    e.target.style.borderColor = "rgba(255,107,157,0.15)";
                    e.target.style.boxShadow = "0 0 0 0px transparent";
                  }
                }}
              />
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  right: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: 16,
                  opacity: 0.4,
                  pointerEvents: "none",
                }}
              >
                🌷
              </span>
            </div>
          </label>

          {/* Submit button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02, boxShadow: "0 8px 32px rgba(255,107,157,0.35)" }}
            whileTap={{ scale: 0.97 }}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: 24,
              border: "none",
              background: "linear-gradient(135deg, #ff6b9d 0%, #e879a0 40%, #a855f7 100%)",
              color: "#1a0010",
              fontSize: "0.9rem",
              fontWeight: 700,
              letterSpacing: "0.05em",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              boxShadow: "0 4px 24px rgba(255,107,157,0.25)",
              transition: "box-shadow 0.2s",
            }}
          >
            <span>💖</span>
            Unlock with Love
            <span>💖</span>
          </motion.button>

          {/* Error message */}
          <AnimatePresence>
            {status === "error" && (
              <motion.div
                key="err"
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{
                  textAlign: "center",
                  padding: "10px 16px",
                  borderRadius: 16,
                  background: "rgba(255,107,157,0.08)",
                  border: "1px solid rgba(255,107,157,0.2)",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    color: "#ff6b9d",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                  }}
                >
                  <span>🫶</span>
                  This is only for my baby girl.
                  <span>🫶</span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer hint */}
          <p
            style={{
              textAlign: "center",
              fontSize: "0.68rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(252,228,240,0.28)",
              margin: "4px 0 0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            <span style={{ fontSize: 10 }}>🔒</span>
            Only the one who knows the date can enter
            <span style={{ fontSize: 10 }}>🔒</span>
          </p>
        </form>
      </motion.div>
    </motion.div>
  );
}