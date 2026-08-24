"use client";

// Words that stream along each flow line. Feel free to swap for any
// language set — order doesn't matter, they're distributed across paths.
const WORDS = ["Luganda", "Swahili", "Twi", "Runyankole", "Kinyarwanda", "Acholi", "Yoruba", "Hausa"];

// Four curved paths, all starting near the tablet (bottom-left) and
// converging on a single point on the right (the "unified API" node).
const PATHS = [
  "M 40,210 C 150,150 280,110 430,130",
  "M 40,210 C 150,180 280,130 430,132",
  "M 40,210 C 150,220 280,160 430,128",
  "M 40,210 C 150,245 280,180 430,134",
];

// Stagger multiple words per path so the stream feels continuous rather
// than one word looping alone.
const STREAMS = PATHS.flatMap((d, pathIndex) =>
  [0, 1].map((slot) => ({
    d,
    word: WORDS[(pathIndex * 2 + slot) % WORDS.length],
    dur: 4.5 + pathIndex * 0.4,
    begin: slot * 2.3 + pathIndex * 0.5,
  }))
);

export function HeroCanvas() {
  return (
    <div className="relative w-full min-h-[320px] flex items-center justify-center">
      {/* Swap this for the illustrated figure — image goes in /public,
          e.g. /public/hero-figure.png — sizing/position is handled below. */}
      <div className="absolute left-0 bottom-0 w-[42%] max-w-[220px] pointer-events-none" aria-hidden="true">
        <img
          src="/hero-figure.png"
          alt=""
          className="w-full h-auto block drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      </div>

      <svg className="w-full h-full overflow-visible" viewBox="0 0 460 260" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <defs>
          <linearGradient id="beamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0" />
            <stop offset="50%" stopColor="#fde68a" stopOpacity="1" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
          </linearGradient>
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Static guide lines */}
        {PATHS.map((d, i) => (
          <path key={`guide-${i}`} d={d} fill="none" stroke="rgba(200,134,10,0.18)" strokeWidth={1} />
        ))}

        {/* Traveling light beams along each guide line — .flow-beam (globals.css) sets stroke: url(#beamGradient) */}
        {PATHS.map((d, i) => (
          <path
            key={`beam-${i}`}
            d={d}
            className="flow-beam animate-flow-beam"
            fill="none"
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeDasharray="40 360"
            style={{ animationDelay: `${i * 0.6}s` }}
          />
        ))}

        {/* Words streaming toward the convergence point */}
        {STREAMS.map((s, i) => (
          <g key={i}>
            <text className="flow-word text-[13px] font-semibold" textAnchor="middle" dy="-6">
              {s.word}
              <animateMotion
                path={s.d}
                dur={`${s.dur}s`}
                begin={`${s.begin}s`}
                repeatCount="indefinite"
                keyPoints="0;1"
                keyTimes="0;1"
                calcMode="linear"
              />
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.75;1" dur={`${s.dur}s`} begin={`${s.begin}s`} repeatCount="indefinite" />
            </text>
          </g>
        ))}

        {/* Convergence node */}
        <circle cx="430" cy="130" r="5" className="flow-node" filter="url(#softGlow)" />
        <circle cx="430" cy="130" r="12" className="flow-node-pulse animate-flow-pulse" />
      </svg>
    </div>
  );
}
