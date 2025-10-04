"use client";

import React, { useEffect, useMemo, useRef } from "react";

type Point = { x: number; y: number };
type Path = {
  points: Point[];
  segLens: number[];
  totalLen: number;
  speed: number;
  head: number;
  color: string;
  phase: number;
};

export default function NeonMazeBackground() {
  const baseRef = useRef<HTMLCanvasElement | null>(null);
  const animRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return (
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false
    );
  }, []);

  const neonColors = useMemo(
    () => [
      "rgba(0, 255, 255, 1)",
      "rgba(137, 207, 240, 1)",
      "rgba(120, 0, 255, 1)",
      "rgba(0, 175, 255, 1)",
    ],
    []
  );

  const pathsRef = useRef<Path[]>([]);

  function fitCanvas(canvas: HTMLCanvasElement) {
    const dpr = Math.max(1, Math.floor(window.devicePixelRatio || 1));
    const { clientWidth, clientHeight } = canvas;
    if (
      canvas.width !== clientWidth * dpr ||
      canvas.height !== clientHeight * dpr
    ) {
      canvas.width = clientWidth * dpr;
      canvas.height = clientHeight * dpr;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
  }

  function generatePaths(w: number, h: number): Path[] {
    const cell = Math.floor(Math.max(48, Math.min(96, Math.min(w, h) / 12)));
    const cols = Math.ceil(w / cell);
    const rows = Math.ceil(h / cell);

    const rnd = (min: number, max: number) => Math.random() * (max - min) + min;
    const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

    const count = Math.floor(cols * rows * 0.12) + 16;
    const maxSteps = Math.max(10, Math.floor((cols + rows) * 0.8));

    const paths: Path[] = [];

    for (let i = 0; i < count; i++) {
      const startCol = Math.floor(Math.random() * cols);
      const startRow = Math.floor(Math.random() * rows);

      const points: Point[] = [];
      let cx = startCol * cell + cell / 2;
      let cy = startRow * cell + cell / 2;
      points.push({ x: cx, y: cy });

      let dir: Point = pick([
        { x: 1, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: -1 },
      ]);

      const steps = Math.floor(rnd(maxSteps * 0.4, maxSteps));
      for (let s = 0; s < steps; s++) {
        if (Math.random() < 0.15) {
          dir = pick(
            dir.x !== 0
              ? [
                  { x: 0, y: 1 },
                  { x: 0, y: -1 },
                ]
              : [
                  { x: 1, y: 0 },
                  { x: -1, y: 0 },
                ]
          );
        }
        cx += dir.x * cell;
        cy += dir.y * cell;
        cx = Math.max(cell * 0.25, Math.min(w - cell * 0.25, cx));
        cy = Math.max(cell * 0.25, Math.min(h - cell * 0.25, cy));
        points.push({ x: cx, y: cy });
      }

      let total = 0;
      const segLens: number[] = [0];
      for (let p = 1; p < points.length; p++) {
        const dx = points[p].x - points[p - 1].x;
        const dy = points[p].y - points[p - 1].y;
        total += Math.hypot(dx, dy);
        segLens.push(total);
      }

      for (let p = 0; p < points.length; p++) {
        const jitter = Math.min(6, cell * 0.08);
        points[p].x += rnd(-jitter, jitter);
        points[p].y += rnd(-jitter, jitter);
      }

      paths.push({
        points,
        segLens,
        totalLen: total,
        speed: rnd(40, 95),
        head: Math.random() * total,
        color: pick(neonColors),
        phase: Math.random() * Math.PI * 2,
      });
    }

    return paths;
  }

  function drawStaticNetwork(ctx: CanvasRenderingContext2D, paths: Path[]) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.save();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(180, 220, 255, 0.06)";
    ctx.shadowColor = "transparent";
    ctx.beginPath();
    for (const path of paths) {
      const pts = path.points;
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
    }
    ctx.stroke();
    ctx.restore();
  }

  function strokePolylinePortion(
    ctx: CanvasRenderingContext2D,
    pts: Point[],
    segLens: number[],
    startD: number,
    endD: number
  ) {
    if (endD <= 0 || startD >= segLens[segLens.length - 1]) return;

    let i = 1;
    while (i < segLens.length && segLens[i] < startD) i++;
    let currD = startD;

    const moveToOffset = (
      from: Point,
      to: Point,
      distFromStart: number,
      segmentEnd: number
    ) => {
      const segLen = segmentEnd - (segLens[i - 1] ?? 0);
      const t =
        segLen === 0 ? 0 : (distFromStart - (segLens[i - 1] ?? 0)) / segLen;
      return {
        x: from.x + (to.x - from.x) * t,
        y: from.y + (to.y - from.y) * t,
      };
    };

    ctx.beginPath();

    while (i < segLens.length && currD < endD) {
      const segStartD = segLens[i - 1];
      const segEndD = segLens[i];
      const from = pts[i - 1];
      const to = pts[i];

      const drawStart = Math.max(currD, segStartD);
      const drawEnd = Math.min(endD, segEndD);

      if (drawEnd > drawStart) {
        const p0 =
          drawStart <= segStartD
            ? from
            : moveToOffset(from, to, drawStart, segEndD);
        const p1 =
          drawEnd >= segEndD ? to : moveToOffset(from, to, drawEnd, segEndD);
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
      }

      currD = segEndD;
      i++;
    }
    ctx.stroke();
  }

  useEffect(() => {
    if (!baseRef.current || !animRef.current) return;

    const base = baseRef.current;
    const anim = animRef.current;

    const handleResize = () => {
      fitCanvas(base);
      fitCanvas(anim);

      const baseCtx = base.getContext("2d")!;
      const animCtx = anim.getContext("2d")!;
      baseCtx.clearRect(0, 0, base.width, base.height);
      animCtx.clearRect(0, 0, anim.width, anim.height);

      const w = base.clientWidth;
      const h = base.clientHeight;
      pathsRef.current = generatePaths(w, h);
      drawStaticNetwork(baseCtx, pathsRef.current);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    let last = performance.now();

    const loop = (t: number) => {
      const ctx = anim.getContext("2d")!;
      const paths = pathsRef.current;
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;

      ctx.clearRect(0, 0, anim.width, anim.height);

      if (!prefersReducedMotion && !document.hidden) {
        for (const p of paths) {
          p.head = (p.head + p.speed * dt) % p.totalLen;
          const tailLen = 120;
          const start = p.head - tailLen;
          const end = p.head;

          const beat = 0.6 + 0.4 * Math.max(0, Math.sin(t / 300 + p.phase));
          const width = 1.2 + 1.8 * beat;

          ctx.save();
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.lineWidth = width;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 18 + 22 * beat;
          ctx.strokeStyle = p.color.replace(", 1)", `, ${0.65 + 0.25 * beat})`);

          if (start < 0) {
            strokePolylinePortion(
              ctx,
              p.points,
              p.segLens,
              p.totalLen + start,
              p.totalLen
            );
            strokePolylinePortion(ctx, p.points, p.segLens, 0, end);
          } else {
            strokePolylinePortion(ctx, p.points, p.segLens, start, end);
          }

          ctx.restore();
        }
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [prefersReducedMotion]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 bg-[#070B16] [background-image:radial-gradient(1200px_800px_at_70%_10%,rgba(80,120,255,0.10),transparent_60%),radial-gradient(800px_600px_at_20%_80%,rgba(0,200,255,0.08),transparent_60%)]"
    >
      <canvas ref={baseRef} className="absolute inset-0 h-full w-full" />
      <canvas ref={animRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
