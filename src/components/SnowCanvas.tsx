"use client";

import { useEffect, useRef } from "react";

type Snowflake = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  swaySeed: number;
  swaySpeed: number;
};

type TreeState = {
  center: number;
  baseWidth: number;
  height: number;
  trunkHeight: number;
  layers: number;
  snow: Float32Array;
  snowTargets: Float32Array;
};

const GROUND_SEGMENTS = 220;

export default function SnowCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    let animationId = 0;
    let width = canvas.clientWidth;
    let height = canvas.clientHeight;
    let devicePixelRatio = window.devicePixelRatio || 1;

    const flakes: Snowflake[] = [];
    let groundSnow = new Float32Array(GROUND_SEGMENTS).fill(0);
    let groundContour = new Float32Array(GROUND_SEGMENTS).fill(0);
    let trees: TreeState[] = [];

    const treeBlueprints = [
      { centerRatio: 0.18, widthRatio: 0.24, heightRatio: 0.52, trunk: 70, layers: 4 },
      { centerRatio: 0.5, widthRatio: 0.3, heightRatio: 0.62, trunk: 80, layers: 5 },
      { centerRatio: 0.78, widthRatio: 0.22, heightRatio: 0.48, trunk: 60, layers: 4 },
    ] as const;

    const random = () => Math.random();

    const maxFlakes = () => Math.floor(220 + width * 0.18);

    const groundBaseHeight = () => Math.min(160, height * 0.24);

    const recalcContour = () => {
      groundContour = new Float32Array(GROUND_SEGMENTS);
      for (let i = 0; i < GROUND_SEGMENTS; i++) {
        const ratio = i / (GROUND_SEGMENTS - 1);
        const gentleWave = Math.sin(ratio * Math.PI) * 18;
        const subtleRipples = Math.sin((ratio + 0.25) * 3 * Math.PI) * 6;
        const breezy = Math.sin((ratio * 5 + 1.2) * Math.PI) * 3;
        groundContour[i] = 14 + gentleWave + subtleRipples + breezy;
      }
    };

    const surfaceSample = (ratio: number, samples: Float32Array) => {
      const maxIndex = samples.length - 1;
      const exact = ratio * maxIndex;
      const left = Math.floor(exact);
      const right = Math.min(maxIndex, left + 1);
      const mix = exact - left;
      const leftValue = samples[left] ?? 0;
      const rightValue = samples[right] ?? 0;
      return leftValue * (1 - mix) + rightValue * mix;
    };

    const surfaceYAt = (x: number) => {
      if (width === 0) {
        return height;
      }

      const ratio = Math.min(1, Math.max(0, x / width));
      const base = surfaceSample(ratio, groundContour);
      const snow = surfaceSample(ratio, groundSnow);
      return height - groundBaseHeight() + 12 - base - snow;
    };

    const resetScene = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      devicePixelRatio = window.devicePixelRatio || 1;

      canvas.width = Math.max(1, Math.floor(width * devicePixelRatio));
      canvas.height = Math.max(1, Math.floor(height * devicePixelRatio));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(1, 0, 0, 1, 0, 0);
      context.scale(devicePixelRatio, devicePixelRatio);

      groundSnow = new Float32Array(GROUND_SEGMENTS).fill(0);
      recalcContour();

      trees = treeBlueprints.map((blueprint) => ({
        center: blueprint.centerRatio * width,
        baseWidth: blueprint.widthRatio * width,
        height: Math.max(height * blueprint.heightRatio, 160),
        trunkHeight: blueprint.trunk,
        layers: blueprint.layers,
        snow: new Float32Array(blueprint.layers).fill(0),
        snowTargets: new Float32Array(blueprint.layers).fill(0),
      }));

      flakes.length = 0;
      const initialCount = maxFlakes();
      for (let i = 0; i < initialCount; i++) {
        flakes.push(makeFlake(true));
      }
    };

    const makeFlake = (randomizeY = false): Snowflake => ({
      x: random() * width,
      y: randomizeY ? random() * height : -random() * height * 0.2,
      vx: -0.15 + random() * 0.3,
      vy: 0.55 + random() * 0.65,
      radius: 1.2 + random() * 2.2,
      swaySeed: random() * Math.PI * 2,
      swaySpeed: 0.6 + random() * 0.9,
    });

    const smoothGround = () => {
      for (let i = 1; i < groundSnow.length - 1; i++) {
        const left = groundSnow[i - 1];
        const current = groundSnow[i];
        const right = groundSnow[i + 1];
        groundSnow[i] = current * 0.7 + (left + right) * 0.15;
      }
    };

    let wind = 0;
    let windTarget = 0;

    const updateFlakes = (elapsed: number) => {
      const desiredCount = maxFlakes();
      if (flakes.length < desiredCount) {
        const needed = desiredCount - flakes.length;
        for (let i = 0; i < needed; i++) {
          flakes.push(makeFlake());
        }
      } else if (flakes.length > desiredCount) {
        flakes.splice(desiredCount);
      }

      if (Math.random() < 0.002) {
        windTarget = (-0.45 + Math.random() * 0.9) * 0.6;
      }
      wind += (windTarget - wind) * 0.003;

      const maxGroundRise = groundBaseHeight() * 0.95;

      flakes.forEach((flake, index) => {
        flake.vy += 0.003;
        flake.vy = Math.min(flake.vy, 1.4);
        flake.x += flake.vx + wind * 1.6 + Math.sin(elapsed * flake.swaySpeed + flake.swaySeed) * 0.45;
        flake.y += flake.vy;

        if (flake.x < -40) {
          flake.x = width + 15;
        } else if (flake.x > width + 40) {
          flake.x = -15;
        }

        let settled = false;
        const groundSurface = surfaceYAt(flake.x);
        if (flake.y >= groundSurface - flake.radius * 0.6) {
          const ratio = Math.min(1, Math.max(0, flake.x / width));
          const position = ratio * (GROUND_SEGMENTS - 1);
          const leftIndex = Math.floor(position);
          const rightIndex = Math.min(GROUND_SEGMENTS - 1, leftIndex + 1);
          const mix = position - leftIndex;
          const addition = flake.radius * (1.4 - mix * 0.3);
          groundSnow[leftIndex] = Math.min(
            maxGroundRise,
            groundSnow[leftIndex] + addition,
          );
          groundSnow[rightIndex] = Math.min(
            maxGroundRise,
            groundSnow[rightIndex] + addition * 0.65,
          );
          settled = true;
        } else {
          for (const tree of trees) {
            const baseY = surfaceYAt(tree.center);
            const topY = baseY - tree.height;
            if (flake.y < topY || flake.y > baseY + tree.trunkHeight) {
              continue;
            }

            const heightRatio = Math.min(0.999, Math.max(0, (flake.y - topY) / tree.height));
            const taper = 1 - heightRatio * 0.78;
            const halfWidth = (tree.baseWidth * taper) / 2;

            if (Math.abs(flake.x - tree.center) <= halfWidth + 6) {
              const layerHeight = tree.height / tree.layers;
              const rawLayer = Math.floor(heightRatio * tree.layers);
              const layerIndex = Math.max(
                0,
                Math.min(tree.layers - 1, rawLayer),
              );
              const snowCap =
                tree.snow[layerIndex] > 0
                  ? tree.snow[layerIndex] / (layerHeight * 0.9)
                  : 0;
              const adjustedRatio = heightRatio - snowCap * 0.16;

              if (adjustedRatio <= (layerIndex + 1) / tree.layers) {
                const layerMax = layerHeight * 0.8;
                tree.snowTargets[layerIndex] = Math.min(
                  layerMax,
                  tree.snowTargets[layerIndex] + flake.radius * 3.4,
                );
                settled = true;
                break;
              }
            }
          }
        }

        if (settled || flake.y > height + 30) {
          flakes[index] = makeFlake();
        }
      });

      smoothGround();

      trees.forEach((tree) => {
        for (let layer = 0; layer < tree.layers; layer++) {
          const current = tree.snow[layer];
          const target = tree.snowTargets[layer];
          tree.snow[layer] = current + (target - current) * 0.05;
        }
      });
    };

    const drawScene = () => {
      context.clearRect(0, 0, width, height);

      const gradient = context.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, "rgba(17, 24, 39, 0.9)");
      gradient.addColorStop(0.55, "rgba(15, 23, 42, 0.6)");
      gradient.addColorStop(1, "rgba(15, 23, 42, 0)");
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);

      drawGround(context);
      drawTrees(context);
      drawFlakes(context);
    };

    const drawGround = (ctx: CanvasRenderingContext2D) => {
      const base = groundBaseHeight();

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineTo(0, surfaceYAt(0));

      for (let i = 1; i < GROUND_SEGMENTS; i++) {
        const x = (i / (GROUND_SEGMENTS - 1)) * width;
        ctx.lineTo(x, surfaceYAt(x));
      }

      ctx.lineTo(width, height);
      ctx.closePath();

      const snowGradient = ctx.createLinearGradient(
        0,
        height - base - 180,
        0,
        height,
      );
      snowGradient.addColorStop(0, "rgba(248, 250, 252, 0.94)");
      snowGradient.addColorStop(0.65, "rgba(241, 245, 249, 0.85)");
      snowGradient.addColorStop(1, "rgba(203, 213, 225, 0.65)");

      ctx.fillStyle = snowGradient;
      ctx.shadowColor = "rgba(148, 163, 184, 0.6)";
      ctx.shadowBlur = 20;
      ctx.fill();
      ctx.restore();
    };

    const drawTrees = (ctx: CanvasRenderingContext2D) => {
      trees.forEach((tree, index) => {
        const groundSurface = surfaceYAt(tree.center);
        const trunkWidth = Math.max(12, tree.baseWidth * 0.08);

        ctx.save();
        ctx.fillStyle = "#3f2d1c";
        const trunkX = tree.center - trunkWidth / 2;
        const trunkY = groundSurface;
        const radius = 6;
        ctx.beginPath();
        ctx.moveTo(trunkX + radius, trunkY);
        ctx.lineTo(trunkX + trunkWidth - radius, trunkY);
        ctx.quadraticCurveTo(
          trunkX + trunkWidth,
          trunkY,
          trunkX + trunkWidth,
          trunkY + radius,
        );
        ctx.lineTo(trunkX + trunkWidth, trunkY + tree.trunkHeight - radius);
        ctx.quadraticCurveTo(
          trunkX + trunkWidth,
          trunkY + tree.trunkHeight,
          trunkX + trunkWidth - radius,
          trunkY + tree.trunkHeight,
        );
        ctx.lineTo(trunkX + radius, trunkY + tree.trunkHeight);
        ctx.quadraticCurveTo(
          trunkX,
          trunkY + tree.trunkHeight,
          trunkX,
          trunkY + tree.trunkHeight - radius,
        );
        ctx.lineTo(trunkX, trunkY + radius);
        ctx.quadraticCurveTo(trunkX, trunkY, trunkX + radius, trunkY);
        ctx.closePath();
        ctx.fill();

        const layerHeight = tree.height / tree.layers;
        for (let layer = 0; layer < tree.layers; layer++) {
          const topY = groundSurface - (layer + 1) * layerHeight;
          const bottomY =
            groundSurface - layer * layerHeight + layerHeight * 0.2;
          const progress = layer / tree.layers;
          const factor = 1 - progress * 0.78;
          const halfWidth = (tree.baseWidth * factor) / 2;
          const hueShift = index === 1 ? 15 : 0;

          ctx.beginPath();
          ctx.moveTo(tree.center, topY - 12);
          ctx.lineTo(tree.center - halfWidth, bottomY);
          ctx.lineTo(tree.center + halfWidth, bottomY);
          ctx.closePath();
          ctx.fillStyle = `hsla(${150 + hueShift}, 38%, ${
            28 - layer * 3
          }%, 0.92)`;
          ctx.fill();

          const snowDepth = tree.snow[layer];
          if (snowDepth > 2) {
            const leftEdge = tree.center - halfWidth + 12;
            const rightEdge = tree.center + halfWidth - 12;
            const crestY = topY - snowDepth * 0.55;

            ctx.beginPath();
            ctx.moveTo(leftEdge, topY + 14);
            ctx.quadraticCurveTo(tree.center, crestY, rightEdge, topY + 14);
            ctx.quadraticCurveTo(
              tree.center,
              crestY + snowDepth * 0.36,
              leftEdge,
              topY + 14,
            );
            ctx.fillStyle = "rgba(255, 255, 255, 0.94)";
            ctx.shadowColor = "rgba(148, 163, 184, 0.75)";
            ctx.shadowBlur = 12;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }

        ctx.restore();
      });
    };

    const drawFlakes = (ctx: CanvasRenderingContext2D) => {
      ctx.save();
      ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
      ctx.shadowColor = "rgba(148, 163, 184, 0.8)";
      ctx.shadowBlur = 6;

      flakes.forEach((flake) => {
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();
    };

    const tick = () => {
      const elapsed = performance.now() / 1000;
      updateFlakes(elapsed);
      drawScene();
      animationId = requestAnimationFrame(tick);
    };

    resetScene();
    tick();

    const resizeObserver = new ResizeObserver(() => {
      resetScene();
    });
    resizeObserver.observe(canvas);

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        animationId = requestAnimationFrame(tick);
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 -z-20 h-full w-full"
    />
  );
}
