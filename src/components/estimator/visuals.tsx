// Live, schematic drawings for the planner (not to scale beyond proportions).

export function CarportVisual({ rows, baysPerRow, style }: { rows: number; baysPerRow: number; style: "standard" | "cantilever" }) {
  const bayW = 56, bayD = 96, pad = 18, gap = rows === 2 ? 6 : 0;
  const W = baysPerRow * bayW + pad * 2;
  const H = rows * bayD + gap + pad * 2;
  const postsPerLine = Math.ceil(baysPerRow / 2) + 1;
  const postXs = Array.from({ length: postsPerLine }, (_, i) => pad + (i * (baysPerRow * bayW)) / (postsPerLine - 1));
  const lines: number[] =
    style === "standard"
      ? Array.from({ length: rows }, (_, r) => [pad + r * (bayD + gap), pad + r * (bayD + gap) + bayD]).flat()
      : rows === 2
        ? [pad + bayD + gap / 2]
        : [pad];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="size-full" role="img" aria-label={`Top view: ${rows} row(s) of ${baysPerRow} bays`}>
      <defs>
        <linearGradient id="canopy" x1="0" x2="1">
          <stop offset="0" stopColor="var(--color-logo-cyan)" stopOpacity="0.28" />
          <stop offset="1" stopColor="var(--color-logo-blue)" stopOpacity="0.28" />
        </linearGradient>
      </defs>
      {Array.from({ length: rows }, (_, r) => {
        const y = pad + r * (bayD + gap);
        return (
          <g key={r}>
            <rect x={pad} y={y} width={baysPerRow * bayW} height={bayD} rx="6" fill="url(#canopy)" stroke="var(--color-logo-blue)" strokeWidth="1.5" />
            {Array.from({ length: baysPerRow }, (_, b) => {
              const x = pad + b * bayW;
              const carY = r === 0 ? y + 14 : y + bayD - 14 - 64;
              return (
                <g key={b}>
                  {b > 0 && <line x1={x} y1={y + 6} x2={x} y2={y + bayD - 6} stroke="var(--color-logo-blue)" strokeOpacity="0.35" strokeDasharray="4 4" />}
                  <rect x={x + 12} y={carY} width={bayW - 24} height={64} rx="9" fill="var(--color-ink)" fillOpacity="0.85" />
                  <rect x={x + 16} y={r === 0 ? carY + 10 : carY + 40} width={bayW - 32} height={14} rx="3" fill="white" fillOpacity="0.35" />
                </g>
              );
            })}
          </g>
        );
      })}
      {lines.map((ly, li) => postXs.map((px, pi) => <circle key={`${li}-${pi}`} cx={px} cy={ly} r="4.5" fill="var(--color-magenta)" stroke="white" strokeWidth="1.5" />))}
    </svg>
  );
}

export function TilesVisual({ length, width }: { length: number; width: number }) {
  const maxW = 320, maxH = 220;
  const s = Math.min(maxW / length, maxH / width);
  const w = length * s, h = width * s;
  // draw every tile (0.5 m) while that stays legible, otherwise every whole metre
  const stepM = w / (length / 0.5) >= 6 ? 0.5 : Math.max(1, Math.ceil(length / 40));
  const vx = Array.from({ length: Math.floor(length / stepM) }, (_, i) => (i + 1) * stepM * s).filter((x) => x < w - 0.5);
  const hy = Array.from({ length: Math.floor(width / stepM) }, (_, i) => (i + 1) * stepM * s).filter((y) => y < h - 0.5);
  const ox = (maxW - w) / 2 + 30, oy = (maxH - h) / 2 + 12;
  return (
    <svg viewBox={`0 0 ${maxW + 60} ${maxH + 44}`} className="size-full" role="img" aria-label={`Floor plan ${length} by ${width} metres`}>
      <rect x={ox} y={oy} width={w} height={h} rx="4" fill="var(--color-logo-blue)" fillOpacity="0.14" stroke="var(--color-logo-blue)" strokeWidth="1.5" />
      {vx.map((x) => <line key={`v${x}`} x1={ox + x} y1={oy} x2={ox + x} y2={oy + h} stroke="var(--color-logo-blue)" strokeOpacity="0.3" />)}
      {hy.map((y) => <line key={`h${y}`} x1={ox} y1={oy + y} x2={ox + w} y2={oy + y} stroke="var(--color-logo-blue)" strokeOpacity="0.3" />)}
      <text x={ox + w / 2} y={oy + h + 22} textAnchor="middle" className="fill-ink text-[12px] font-semibold">{length} m</text>
      <text x={ox - 10} y={oy + h / 2} textAnchor="middle" transform={`rotate(-90 ${ox - 10} ${oy + h / 2})`} className="fill-ink text-[12px] font-semibold">{width} m</text>
    </svg>
  );
}

export function GutterVisual({ storeys, roof, downpipes }: { storeys: number; roof: "gable" | "hip"; downpipes: number }) {
  const W = 360, groundY = 250, storeyH = 54, houseW = 220, x0 = (W - houseW) / 2;
  const top = groundY - storeys * storeyH;
  const eaveY = top;
  const roofH = 58;
  const over = 14;
  // Viewed from the eave (long) side, where the gutters run: a gable roof reads as a
  // sloped band up to a full-length ridge; a hip roof as a trapezoid (ridge set in).
  const inset = roof === "gable" ? 8 : 70;
  const roofPath = `M ${x0 - over} ${eaveY} L ${x0 - over + inset} ${eaveY - roofH} L ${x0 + houseW + over - inset} ${eaveY - roofH} L ${x0 + houseW + over} ${eaveY} Z`;
  // front elevation shows the downpipes on this face (about half of them)
  const visible = Math.max(2, Math.ceil(downpipes / 2));
  const pipeXs = Array.from({ length: visible }, (_, i) => x0 - over + 8 + (i * (houseW + 2 * over - 16)) / (visible - 1));
  return (
    <svg viewBox={`0 0 ${W} 270`} className="size-full" role="img" aria-label={`Eave-side elevation: ${storeys} storey ${roof} roof with gutters and downpipes`}>
      <path d={roofPath} fill="var(--color-ink)" fillOpacity="0.85" />
      <text x="10" y="18" className="fill-muted-foreground text-[10px] font-medium tracking-wider uppercase">Eave-side view</text>
      {Array.from({ length: storeys }, (_, s) => (
        <g key={s}>
          <rect x={x0} y={top + s * storeyH} width={houseW} height={storeyH} fill="var(--color-logo-blue)" fillOpacity={0.1 + s * 0.04} stroke="var(--color-logo-blue)" strokeOpacity="0.5" />
          {[0.18, 0.5, 0.82].map((f) => (
            <rect key={f} x={x0 + houseW * f - 14} y={top + s * storeyH + 14} width="28" height="24" rx="3" fill="white" stroke="var(--color-logo-blue)" strokeOpacity="0.4" />
          ))}
        </g>
      ))}
      {/* gutter along the eave */}
      <rect x={x0 - over} y={eaveY - 3} width={houseW + 2 * over} height="7" rx="3.5" fill="var(--color-magenta)" />
      {pipeXs.map((px) => <rect key={px} x={px - 3} y={eaveY + 2} width="6" height={groundY - eaveY - 2} rx="3" fill="var(--color-magenta)" fillOpacity="0.8" />)}
      <line x1="10" y1={groundY} x2={W - 10} y2={groundY} stroke="var(--color-ink)" strokeOpacity="0.3" strokeWidth="2" />
      {/* height marker */}
      <line x1={W - 22} y1={eaveY} x2={W - 22} y2={groundY} stroke="var(--color-ink)" strokeOpacity="0.4" strokeDasharray="3 3" />
      <text x={W - 28} y={(eaveY + groundY) / 2} textAnchor="end" className="fill-ink text-[11px] font-semibold">≈{storeys * 3} m</text>
    </svg>
  );
}
