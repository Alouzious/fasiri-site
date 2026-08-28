"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Languages, Mic, Cpu } from "lucide-react";
import { PROVIDERS } from "../../data/providers";

const ICONS: Record<string, React.ElementType> = {
  sunbird: Languages,
  khaya: Mic,
  huggingface: Cpu,
};

function ProviderRow({
  provider,
  index,
  total,
  rotate,
  reduceMotion,
}: {
  provider: (typeof PROVIDERS)[number];
  index: number;
  total: number;
  rotate: ReturnType<typeof useTransform<number, number>>;
  reduceMotion: boolean;
}) {
  const Icon = ICONS[provider.id] ?? Languages;
  const reversed = index % 2 === 1;
  const label = String(index + 1).padStart(2, "0");
  const isEven = index % 2 === 0;

  const iconBlock = (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.3 }}
      whileHover={reduceMotion ? undefined : { scale: 1.04 }}
      className="group relative shrink-0 w-[200px] h-[200px] md:w-[220px] md:h-[220px] flex items-center justify-center"
    >
      {/* signature move: the ring draws itself in as it enters view, like a pen stroke */}
      <svg
        viewBox="0 0 220 220"
        className="absolute inset-0 w-full h-full -rotate-90"
      >
        <motion.circle
          cx="110"
          cy="110"
          r="108"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-white/25 transition-colors duration-300 group-hover:text-brand-green/60"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
        />
      </svg>

      {/* dashed ring, tied to scroll position — spins continuously once drawn */}
      <motion.div
        style={reduceMotion ? undefined : { rotate }}
        className="absolute inset-[10px] rounded-full border border-dashed border-white/10 transition-colors duration-300 group-hover:border-brand-green/40"
      />

      {/* solid center */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-[130px] h-[130px] md:w-[140px] md:h-[140px] rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center
                   transition-all duration-300 ease-out
                   group-hover:border-brand-green/50 group-hover:bg-brand-green/[0.08]
                   group-hover:shadow-[0_0_40px_-8px_theme(colors.brand-green/50%)]"
      >
        <Icon
          size={30}
          strokeWidth={1.5}
          className="text-brand-green transition-transform duration-300 group-hover:scale-110"
        />
      </motion.div>

      {/* small accent badge sitting on the ring */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.35, delay: 0.95 }}
        className="absolute top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black border border-white/15 flex items-center justify-center text-[10px] font-mono font-semibold text-brand-green
                   transition-all duration-300 group-hover:scale-110 group-hover:border-brand-green/60 group-hover:shadow-[0_0_20px_-4px_theme(colors.brand-green/70%)]"
        style={{ [reversed ? "left" : "right"]: -4 } as React.CSSProperties}
      >
        {provider.langs.length}
      </motion.div>
    </motion.div>
  );

  const textBlock = (
    <motion.div
      initial={{ opacity: 0, x: reversed ? 24 : -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className={`max-w-md ${reversed ? "md:text-right" : "text-left"}`}
    >
      <span className="block font-mono text-xs tracking-wider text-brand-green/70 mb-2">
        {label}
      </span>
      <h3 className="text-2xl font-bold text-white mb-3">{provider.name}</h3>
      <p className="text-[15px] leading-relaxed text-white/60 mb-4">
        {provider.description}
      </p>
      <div
        className={`flex flex-wrap gap-2 ${
          reversed ? "md:justify-end" : ""
        }`}
      >
        {provider.capabilities.map((c) => (
          <span
            key={c}
            className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/70
                       transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-green/40 hover:text-brand-green hover:bg-brand-green/[0.08]"
          >
            {c}
          </span>
        ))}
      </div>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className={`group/row relative flex flex-col md:flex-row items-center gap-8 md:gap-16 px-6 md:px-10 py-14 md:py-16 border-t border-white/10
                  ${index === total - 1 ? "border-b" : ""}
                  ${isEven ? "bg-white/[0.015]" : "bg-transparent"}
                  transition-colors duration-300 hover:bg-white/[0.03]`}
    >
      {!reversed && iconBlock}
      {textBlock}
      {reversed && iconBlock}
    </motion.div>
  );
}

export function ProvidersSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduceMotion = Boolean(useReducedMotion());

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // One continuous rotation value shared by every ring in the section —
  // as you scroll from the first provider to the last, it turns several
  // full rotations, so the motion reads as one system carrying through
  // the whole section rather than independent spins.
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 1080]);

  return (
    <section
      id="providers"
      ref={sectionRef}
      className="relative py-20 px-6 bg-black overflow-hidden"
    >
      {/* faint ambient glow, kept subtle so the black stays black */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(600px circle at 50% 0%, theme(colors.brand-green/8%), transparent 70%)",
        }}
      />

      <div className="relative max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-4"
        >
          <span className="inline-block font-mono text-xs tracking-wider text-brand-green/70 mb-3">
            PROVIDER NETWORK
          </span>
          <h2 className="text-3xl font-bold text-white mb-3">
            Best-in-class AI, unified
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Fasiri routes each request to the provider with the deepest
            expertise for that language. If one fails, the next takes over.
          </p>
        </motion.div>

        <div>
          {PROVIDERS.map((p, i) => (
            <ProviderRow
              key={p.id}
              provider={p}
              index={i}
              total={PROVIDERS.length}
              rotate={rotate}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}