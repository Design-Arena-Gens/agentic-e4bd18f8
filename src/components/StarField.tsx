"use client";

import { useState } from "react";

type Star = {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  blur: number;
};

const STAR_COUNT = 140;

const createStars = () => {
  const random = mulberry32(917_513);
  return Array.from({ length: STAR_COUNT }, (_, id) => ({
    id,
    left: random() * 100,
    top: random() * 85,
    size: 1.5 + random() * 2.2,
    duration: 2.4 + random() * 6,
    delay: random() * 8,
    blur: random() * 0.8,
  }));
};

export default function StarField() {
  const [stars] = useState<Star[]>(createStars);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {stars.map((star) => (
        <span
          key={star.id}
          className="star-sparkle absolute rounded-full"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            filter: `blur(${star.blur}px)`,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
