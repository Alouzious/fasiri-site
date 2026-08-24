export function QBar({ score }: { score: number }) {
  const pct = Math.round(score * 100);
  const color = score >= 0.85 ? "#2D7D46" : score >= 0.7 ? "#C8860A" : "#B91C1C";
  return (
    <div className="flex items-center gap-2 mt-2">
      <div className="flex-1 h-0.5 bg-line rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-[width] duration-500 ease-in-out"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <span className="text-[11px] text-ink-3 shrink-0">{pct}% quality</span>
    </div>
  );
}
