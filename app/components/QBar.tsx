export function QBar({ score }: { score: number }) {
  const pct   = Math.round(score * 100);
  const color = score >= 0.85 ? "#2D7D46" : score >= 0.70 ? "#C8860A" : "#B91C1C";
  return (
    <div className="qbar-wrap">
      <div className="qbar-track">
        <div className="qbar-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="qbar-label">{pct}% quality</span>
    </div>
  );
}
