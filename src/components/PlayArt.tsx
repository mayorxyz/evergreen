import React from 'react';

// Deterministic pseudo-random from seed
function seededRandom(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return () => {
    hash = (hash * 1664525 + 1013904223) & 0x7fffffff;
    return hash / 0x7fffffff;
  };
}

// Palette entries reference theme tokens so art stays visible in both themes
const PALETTES: Record<string, string[]> = {
  default: ['var(--color-pink)', 'var(--color-yellow)', 'var(--color-purple)', 'var(--color-orange)'],
  warm: ['var(--color-orange)', 'var(--color-yellow)', 'var(--color-red)', 'var(--color-pink)'],
  cool: ['var(--color-blue)', 'var(--color-purple)', 'var(--color-mint)', 'var(--color-yellow)'],
  mint: ['var(--color-mint)', 'var(--color-blue)', 'var(--color-purple)', 'var(--color-yellow)'],
};

type PlayArtProps = {
  seed?: string;
  kind?: 'blocks' | 'confetti' | 'avatar' | 'chart';
  palette?: string;
  width?: number;
  height?: number;
  className?: string;
};

export function PlayArt({
  seed = 'default',
  kind = 'blocks',
  palette = 'default',
  width = 320,
  height = 200,
  className = '',
}: PlayArtProps) {
  const rand = seededRandom(seed);
  const colors = PALETTES[palette] || PALETTES.default;

  if (kind === 'blocks') {
    return (
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className={className} aria-hidden>
        <rect width={width} height={height} fill="var(--color-page)" />
        {Array.from({ length: 12 }).map((_, i) => {
          const size = 16 + rand() * 24;
          const x = rand() * (width - size);
          const y = rand() * (height - size);
          const color = colors[Math.floor(rand() * colors.length)];
          const rotation = (rand() - 0.5) * 20;
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width={size}
              height={size}
              rx={3}
              fill={color}
              opacity={0.7 + rand() * 0.3}
              transform={`rotate(${rotation} ${x + size / 2} ${y + size / 2})`}
            />
          );
        })}
      </svg>
    );
  }

  if (kind === 'confetti') {
    return (
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className={className} aria-hidden>
        <rect width={width} height={height} fill="var(--color-page)" />
        {Array.from({ length: 20 }).map((_, i) => {
          const x = rand() * width;
          const y = rand() * height;
          const color = colors[Math.floor(rand() * colors.length)];
          const shape = Math.floor(rand() * 3);
          if (shape === 0) {
            return <circle key={i} cx={x} cy={y} r={2 + rand() * 4} fill={color} opacity={0.8} />;
          } else if (shape === 1) {
            const size = 4 + rand() * 6;
            return (
              <polygon
                key={i}
                points={`${x},${y - size} ${x - size},${y + size} ${x + size},${y + size}`}
                fill={color}
                opacity={0.8}
                transform={`rotate(${rand() * 360} ${x} ${y})`}
              />
            );
          } else {
            const cp1x = x + (rand() - 0.5) * 20;
            const cp1y = y + (rand() - 0.5) * 20;
            const cp2x = x + (rand() - 0.5) * 20;
            const cp2y = y + (rand() - 0.5) * 20;
            return (
              <path
                key={i}
                d={`M${x},${y} Q${cp1x},${cp1y} ${cp2x},${cp2y}`}
                stroke={color}
                strokeWidth={1.5}
                fill="none"
                opacity={0.8}
              />
            );
          }
        })}
      </svg>
    );
  }

  if (kind === 'avatar') {
    const bg = colors[Math.floor(rand() * colors.length)];
    const accent = colors[Math.floor(rand() * colors.length)];
    const size = Math.min(width, height);
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={className} aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={size / 2} fill={bg} />
        <circle cx={size / 2} cy={size * 0.38} r={size * 0.18} fill={accent} opacity={0.6} />
        <ellipse cx={size / 2} cy={size * 0.75} rx={size * 0.28} ry={size * 0.2} fill={accent} opacity={0.4} />
      </svg>
    );
  }

  if (kind === 'chart') {
    return (
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className={className} aria-hidden>
        <rect width={width} height={height} fill="var(--color-page)" />
        {[0.25, 0.5, 0.75].map((p, i) => (
          <line key={i} x1={0} y1={height * p} x2={width} y2={height * p} stroke="var(--color-ink)" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.15" />
        ))}
        <path
          d={Array.from({ length: 10 }).map((_, i) => {
            const x = (i / 9) * width;
            const y = height * 0.3 + rand() * height * 0.5;
            return `${i === 0 ? 'M' : 'L'}${x},${y}`;
          }).join(' ')}
          fill="none"
          stroke="var(--color-ink)"
          strokeWidth="2"
        />
        {Array.from({ length: 10 }).map((_, i) => {
          const x = (i / 9) * width;
          const y = height * 0.3 + seededRandom(seed + i)() * height * 0.5;
          const color = colors[Math.floor(rand() * colors.length)];
          return <circle key={i} cx={x} cy={y} r="3" fill={color} />;
        })}
      </svg>
    );
  }

  return null;
}
