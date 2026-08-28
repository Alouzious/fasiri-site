"use client";

import { motion } from "framer-motion";
import { Languages, Mic, Volume2, Sparkles, Cpu, Layers } from "lucide-react";
import { KenteMark } from "../KenteMark";

/**
 * Flow-diagram layout, same idea as: request-type nodes -> SOURCE ->
 * FASIRI routing/verification layer -> ROUTED -> provider nodes.
 * All coordinates live in a fixed 1000x460 space so the SVG connector
 * lines and the absolutely-positioned HTML nodes always line up,
 * regardless of how much the container is scaled by CSS.
 */

const VB_W = 1000;
const VB_H = 460;

const LEFT_X = 140;
const RIGHT_X = 860;
const NODE_Y = [70, 230, 390];

const SOURCE_PT = { x: 330, y: 230 };
const VERIFIED_PT = { x: 670, y: 230 };
const CIRCLE_R = 95;
const CIRCLE = { x: 500, y: 230 };

// Brand palette — muted, not neon
const BRAND_GREEN = "#1F7A4D";
const BRAND_GOLD = "#C99A3E";

const REQUEST_NODES = [
  { icon: Languages, label: "Translation" },
  { icon: Mic, label: "Speech-to-Text" },
  { icon: Volume2, label: "Text-to-Speech" },
];

const PROVIDER_NODES = [
  { icon: Sparkles, label: "Sunbird AI" },
  { icon: Cpu, label: "Khaya AI" },
  { icon: Layers, label: "HuggingFace" },
];

function pct(x: number, y: number) {
  return { left: `${(x / VB_W) * 100}%`, top: `${(y / VB_H) * 100}%` };
}

function Node({
  x,
  y,
  icon: Icon,
  label,
  align,
  delay,
}: {
  x: number;
  y: number;
  icon: React.ElementType;
  label: string;
  align: "left" | "right";
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: align === "left" ? -16 : 16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      style={{ ...pct(x, y), transform: "translate(-50%, -50%)" }}
      className="absolute flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-3 backdrop-blur-sm w-[172px] transition-colors hover:border-white/[0.16] hover:bg-white/[0.04]"
    >
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#1F7A4D]/15">
        <Icon size={13} className="text-[#3fa579]" strokeWidth={2} />
      </div>
      <span className="text-[11px] font-medium tracking-wide text-neutral-300 whitespace-nowrap">
        {label}
      </span>
    </motion.div>
  );
}

/** A dot that travels once along an SVG path, looping forever. */
function FlowDot({
  path,
  color = BRAND_GREEN,
  dur = "5s",
  begin = "0s",
  r = 2.75,
}: {
  path: string;
  color?: string;
  dur?: string;
  begin?: string;
  r?: number;
}) {
  return (
    <circle r={r} fill={color}>
      <animateMotion path={path} dur={dur} begin={begin} repeatCount="indefinite" />
      <animate
        attributeName="opacity"
        values="0;0.85;0.85;0"
        keyTimes="0;0.06;0.9;1"
        dur={dur}
        begin={begin}
        repeatCount="indefinite"
      />
    </circle>
  );
}

export function HowItWorks() {
  const leftPaths = NODE_Y.map(
    (y) => `M ${LEFT_X + 95},${y} L ${SOURCE_PT.x - 20},${y} L ${SOURCE_PT.x},${SOURCE_PT.y}`
  );
  const rightPaths = NODE_Y.map(
    (y) => `M ${VERIFIED_PT.x},${VERIFIED_PT.y} L ${RIGHT_X - 95 - 20},${y} L ${RIGHT_X - 95},${y}`
  );

  // Dot now arcs around the TOP rim of the Fasiri circle instead of
  // cutting straight through the middle — enters on the left edge,
  // sweeps over the top, exits on the right edge.
  const throughCircle = `M ${SOURCE_PT.x},${SOURCE_PT.y} L ${CIRCLE.x - CIRCLE_R},${CIRCLE.y} A ${CIRCLE_R},${CIRCLE_R} 0 0 1 ${CIRCLE.x + CIRCLE_R},${CIRCLE.y} L ${VERIFIED_PT.x},${VERIFIED_PT.y}`;
  const throughCircleReverse = `M ${SOURCE_PT.x},${SOURCE_PT.y} L ${CIRCLE.x - CIRCLE_R},${CIRCLE.y} A ${CIRCLE_R},${CIRCLE_R} 0 0 0 ${CIRCLE.x + CIRCLE_R},${CIRCLE.y} L ${VERIFIED_PT.x},${VERIFIED_PT.y}`;

  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-black py-24 px-6 text-center text-white"
    >
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_50%_15%,rgba(31,122,77,0.06),transparent_55%)]" />

      <div className="relative max-w-[1100px] mx-auto">
        <h2 className="font-display text-[30px] font-extrabold tracking-tight mb-3">
          One API, routed across three providers
        </h2>
        <p className="mx-auto mb-16 max-w-[560px] text-sm leading-relaxed text-neutral-400">
          Every request is routed, verified, and monitored through Fasiri&apos;s
          core layer before it ever reaches a provider. You just write the code.
        </p>

        {/* Mobile fallback: simple stacked summary */}
        <div className="md:hidden flex flex-col gap-3 text-left max-w-sm mx-auto">
          {REQUEST_NODES.map((n) => (
            <div
              key={n.label}
              className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-3"
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#1F7A4D]/15">
                <n.icon size={14} className="text-[#3fa579]" />
              </div>
              <span className="text-sm text-neutral-200">{n.label}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 justify-center py-3 text-[#3fa579] text-[11px] font-mono uppercase tracking-widest">
            ↓ Fasiri routing layer ↓
          </div>
          {PROVIDER_NODES.map((n) => (
            <div
              key={n.label}
              className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-3"
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#1F7A4D]/15">
                <n.icon size={14} className="text-[#3fa579]" />
              </div>
              <span className="text-sm text-neutral-200">{n.label}</span>
            </div>
          ))}
        </div>

        {/* Desktop flow diagram */}
        <div
          className="hidden md:block relative mx-auto w-full"
          style={{ aspectRatio: `${VB_W} / ${VB_H}` }}
        >
          <svg
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* cluster circles — more visible now */}
            <circle cx={LEFT_X + 45} cy={230} r={190} fill="none" stroke="rgba(255,255,255,0.16)" strokeDasharray="2 6" />
            <circle cx={RIGHT_X - 45} cy={230} r={190} fill="none" stroke="rgba(255,255,255,0.16)" strokeDasharray="2 6" />

            {[...leftPaths, ...rightPaths].map((d, i) => (
              <path key={i} d={d} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth={1.25} />
            ))}
            {/* straight connector lines to/from the circle, drawn under the ring */}
            <path d={`M ${SOURCE_PT.x},${SOURCE_PT.y} L ${CIRCLE.x - CIRCLE_R},${CIRCLE.y}`} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth={1.25} />
            <path d={`M ${CIRCLE.x + CIRCLE_R},${CIRCLE.y} L ${VERIFIED_PT.x},${VERIFIED_PT.y}`} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth={1.25} />

            {[SOURCE_PT, VERIFIED_PT].map((p, i) => (
              <rect
                key={i}
                x={p.x - 5}
                y={p.y - 5}
                width={10}
                height={10}
                fill="#000"
                stroke={`${BRAND_GREEN}99`}
                strokeWidth={1}
              />
            ))}

            {/* outer dashed ring — now visibly rotating */}
            <circle
              cx={CIRCLE.x}
              cy={CIRCLE.y}
              r={CIRCLE_R + 28}
              fill="none"
              stroke={`${BRAND_GREEN}70`}
              strokeWidth={1.25}
              strokeDasharray="1 7"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from={`0 ${CIRCLE.x} ${CIRCLE.y}`}
                to={`360 ${CIRCLE.x} ${CIRCLE.y}`}
                dur="18s"
                repeatCount="indefinite"
              />
            </circle>

            {/* solid center ring — clearly visible */}
            <circle
              cx={CIRCLE.x}
              cy={CIRCLE.y}
              r={CIRCLE_R}
              fill="#050505"
              stroke="rgba(255,255,255,0.22)"
              strokeWidth={1.25}
            />

            {leftPaths.map((d, i) => (
              <FlowDot key={`l${i}`} path={d} dur="5s" begin={`${i * 1.1}s`} />
            ))}
            {rightPaths.map((d, i) => (
              <FlowDot key={`r${i}`} path={d} dur="5s" begin={`${3 + i * 1.1}s`} />
            ))}

            {/* dots that sweep the rim as they cross through the circle */}
            <FlowDot path={throughCircle} color={BRAND_GOLD} dur="4.5s" begin="0.4s" r={3} />
            <FlowDot path={throughCircleReverse} color={BRAND_GOLD} dur="4.5s" begin="2.6s" r={3} />
          </svg>

          {/* thin breathing ring, unlabeled */}
          <motion.div
            className="absolute rounded-full border"
            style={{
              ...pct(CIRCLE.x, CIRCLE.y),
              width: CIRCLE_R * 1.35,
              height: CIRCLE_R * 1.35,
              transform: "translate(-50%, -50%)",
              borderColor: `${BRAND_GREEN}40`,
            }}
            animate={{ opacity: [0.35, 0.7, 0.35], scale: [0.97, 1.02, 0.97] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* center logo only — no surrounding labels */}
          <div
            className="absolute flex items-center gap-1"
            style={{ ...pct(CIRCLE.x, CIRCLE.y), transform: "translate(-50%, -50%)" }}
          >
            <KenteMark size={26} />
            <span className="font-display italic text-lg font-bold text-white -ml-0.5">
              asiri
            </span>
          </div>

          <span
            className="absolute font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500"
            style={{ ...pct(LEFT_X, 8), transform: "translate(-50%, 0)" }}
          >
            Your request
          </span>
          <span
            className="absolute font-mono text-[10px] uppercase tracking-[0.25em] text-[#3fa579]"
            style={{ ...pct(RIGHT_X, 8), transform: "translate(-50%, 0)" }}
          >
            Providers
          </span>

          {REQUEST_NODES.map((n, i) => (
            <Node key={n.label} x={LEFT_X} y={NODE_Y[i]} icon={n.icon} label={n.label} align="left" delay={0.1 * i} />
          ))}
          {PROVIDER_NODES.map((n, i) => (
            <Node key={n.label} x={RIGHT_X} y={NODE_Y[i]} icon={n.icon} label={n.label} align="right" delay={0.1 * i} />
          ))}
        </div>
      </div>
    </section>
  );
}