"use client";

type Track = {
  id: string;
  className: string;
  style: React.CSSProperties;
  scaleX?: number;
};

const tracks: Track[] = [
  {
    id: "northbound",
    className: "sleigh-glide-right",
    style: { top: "12%", left: "-30%", width: "40%" },
  },
  {
    id: "southbound",
    className: "sleigh-glide-left",
    style: { top: "26%", right: "-35%", width: "42%" },
    scaleX: -1,
  },
  {
    id: "crescent",
    className: "sleigh-glide-arc",
    style: { top: "6%", left: "15%", width: "38%" },
  },
];

export default function SleighSky() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[45vh] overflow-visible"
    >
      {tracks.map((track) => (
        <div
          key={track.id}
          className={`absolute flex items-center justify-center opacity-80 ${track.className}`}
          style={track.style}
        >
          <SleighFigure className="h-full w-full" scaleX={track.scaleX ?? 1} />
        </div>
      ))}
    </div>
  );
}

function SleighFigure({
  className,
  scaleX = 1,
}: {
  className?: string;
  scaleX?: number;
}) {
  return (
    <svg
      className={`text-red-200 ${className ?? ""}`}
      viewBox="0 0 420 120"
      preserveAspectRatio="xMidYMid meet"
      style={{ transform: `scaleX(${scaleX})` }}
    >
      <defs>
        <linearGradient id="sleigh-body" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffb3b3" />
          <stop offset="100%" stopColor="#f472b6" />
        </linearGradient>
        <linearGradient id="reindeer-coat" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#facc15" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
      </defs>

      <g fill="url(#reindeer-coat)" stroke="#fde68a" strokeWidth="2">
        {Array.from({ length: 4 }, (_, index) => {
          const offset = index * 95;
          const antlerY = 30 - index * 2;
          return (
            <g key={index} transform={`translate(${40 + offset}, 10)`}>
              <path d="M20 55 Q5 45 12 30 Q25 5 55 15 Q70 20 68 35 Q65 50 47 56 Z" />
              <circle cx="60" cy="24" r="10" fill="#fff7ed" />
              <circle cx="63" cy="22" r="3" fill="#1e293b" />
              <path
                d={`M70 ${antlerY} Q65 ${antlerY - 20} 80 ${antlerY - 28}`}
                stroke="#fde68a"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d={`M70 ${antlerY} Q73 ${antlerY - 14} 88 ${antlerY - 18}`}
                stroke="#fde68a"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M10 60 Q38 70 68 58"
                stroke="#7f1d1d"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
              />
            </g>
          );
        })}
      </g>

      <g transform="translate(55, 35)">
        <path
          d="M320 40 Q350 62 392 52 Q398 65 390 74 Q352 100 302 94 Z"
          fill="url(#sleigh-body)"
          stroke="#fee2e2"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M278 60 Q300 105 356 108 Q320 120 276 112 Z"
          fill="#fecaca"
          stroke="#fee2e2"
          strokeWidth="4"
        />
        <rect
          x="300"
          y="18"
          width="24"
          height="24"
          rx="6"
          fill="#1f2937"
          stroke="#e2e8f0"
          strokeWidth="3"
        />
        <circle cx="312" cy="12" r="12" fill="#fde68a" />
        <path
          d="M256 60 Q286 68 324 60"
          stroke="#fef2f2"
          strokeWidth="7"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M256 60 Q210 34 188 30"
          stroke="#fef2f2"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M188 30 Q170 20 150 24"
          stroke="#fef2f2"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
