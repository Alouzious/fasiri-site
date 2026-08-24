"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { KenteMark } from "../KenteMark";
import { LANGS } from "../../data/languages";

const FLOATING_LANGS = LANGS; // all languages

const POSITIONS = [
  { top: "2%", left: "34%" }, { top: "4%", left: "64%" }, { top: "10%", left: "4%" },
  { top: "12%", left: "84%" }, { top: "18%", left: "48%" }, { top: "22%", left: "22%" },
  { top: "26%", left: "72%" }, { top: "32%", left: "2%" }, { top: "34%", left: "58%" },
  { top: "40%", left: "36%" }, { top: "44%", left: "80%" }, { top: "50%", left: "14%" },
  { top: "54%", left: "62%" }, { top: "60%", left: "40%" }, { top: "66%", left: "6%" },
  { top: "70%", left: "70%" }, { top: "78%", left: "30%" }, { top: "84%", left: "54%" },
];

const CYCLE_MS = 10000;   // full loop length
const REVEAL_MS = 2600;   // how long the logo stays visible
const SWAP_MS = 3200;     // how often badges swap positions while floating

function FloatingBadge({
  name,
  posIndex,
  delay,
  converging,
}: {
  name: string;
  posIndex: number;
  delay: number;
  converging: boolean;
}) {
  const pos = POSITIONS[posIndex];

  return (
    <motion.span
      animate={
        converging
          ? { opacity: 0, scale: 0.4, top: "50%", left: "50%" }
          : { opacity: 1, top: pos.top, left: pos.left, scale: 1 }
      }
      initial={{ opacity: 0, top: pos.top, left: pos.left, scale: 0.8 }}
      transition={
        converging
          ? { duration: 0.7, ease: "easeIn" }
          : { duration: 1.4, ease: "easeInOut", delay: converging ? 0 : delay }
      }
      className="absolute bg-white shadow-sm border border-line text-ink-2 text-[11px] font-semibold px-2.5 py-1 rounded-md whitespace-nowrap"
    >
      {name}
    </motion.span>
  );
}

export function Hero() {
  const [phase, setPhase] = useState<"floating" | "reveal">("floating");
  const [shift, setShift] = useState(0);

  // Swap positions periodically while floating
  useEffect(() => {
    if (phase !== "floating") return;
    const id = setInterval(() => {
      setShift((s) => s + 1);
    }, SWAP_MS);
    return () => clearInterval(id);
  }, [phase]);

  // Reveal cycle
  useEffect(() => {
    const toReveal = setTimeout(() => setPhase("reveal"), CYCLE_MS - REVEAL_MS);
    const backToFloat = setTimeout(() => setPhase("floating"), CYCLE_MS);
    return () => {
      clearTimeout(toReveal);
      clearTimeout(backToFloat);
    };
  }, [phase === "floating" ? 0 : 1]);

  return (
    <section className="relative bg-surface2 overflow-hidden py-20 px-6">
      <div className="relative max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-display text-4xl lg:text-5xl font-extrabold text-ink-1 leading-tight mb-5"
          >
            African language<br />
            AI, <span className="italic text-brand-gold">one API away.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="text-ink-2 text-base max-w-lg mb-6"
          >
            Translate, transcribe, and synthesise speech across 19+ African languages.
            Sunbird AI, Khaya AI and HuggingFace unified behind a single, consistent interface.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {["Translation", "🎙 Speech-to-Text", "🔊 Text-to-Speech"].map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-3 py-1.5 rounded-full bg-white border border-line text-ink-2"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="flex items-center gap-4 mb-10"
          >
            <a
              href="https://fasiri-bu9u.onrender.com/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-green text-white no-underline font-semibold text-sm px-5 py-3 rounded-lg hover:bg-brand-green-dark transition-colors flex items-center gap-2"
            >
              ⚡ Generate Free Key
            </a>
            <a
              href="https://umarkhemis.github.io/fasiri"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-1 no-underline font-semibold text-sm flex items-center gap-1.5 hover:text-brand-green transition-colors"
            >
              📖 Read the docs
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex gap-10 pt-6 border-t border-line"
          >
            <div>
              <div className="font-display italic text-2xl font-bold text-ink-1">19+</div>
              <div className="text-xs text-ink-3">African languages</div>
            </div>
            <div>
              <div className="font-display italic text-2xl font-bold text-ink-1">3</div>
              <div className="text-xs text-ink-3">AI providers, 1 API</div>
            </div>
            <div>
              <div className="font-display italic text-2xl font-bold text-ink-1">Free</div>
              <div className="text-xs text-ink-3">to start, no card</div>
            </div>
          </motion.div>
        </div>

        {/* Right column: map + interchanging badges + logo reveal */}
        <div className="relative h-[460px]">
          <div
            className="absolute inset-0 opacity-60 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#94a3b8 1.2px, transparent 1.2px)",
              backgroundSize: "9px 9px",
              WebkitMaskImage: "url(/africa-map.svg)",
              maskImage: "url(/africa-map.svg)",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskPosition: "center",
              WebkitMaskSize: "contain",
              maskSize: "contain",
            }}
          />

          {FLOATING_LANGS.map((lang, i) => (
            <FloatingBadge
              key={lang.code}
              name={lang.name}
              posIndex={(i + shift) % POSITIONS.length}
              delay={0.03 * i}
              converging={phase === "reveal"}
            />
          ))}

          <AnimatePresence>
            {phase === "reveal" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.3, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.15, filter: "blur(6px)" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div className="flex items-center gap-1">
                  <KenteMark size={30} />
                  <span
                    className="font-display italic text-2xl font-bold text-ink-1 -ml-0.5"
                  >
                    asiri
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}