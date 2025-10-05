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

export default function NeonMazeBackground({
  isDark = true,
}: {
  isDark?: boolean;
}) {
  const baseRef = useRef<HTMLCanvasElement | null>(null);
  const animRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return (
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false
    );
  }, []);

  // Dark mode uses deep navy with electric blue/cyan pulses.
  // Light mode: keep canvas transparent so page stays clean.
  const neonColors = useMemo(
    () => [
      "rgba(0, 170, 255, 1)", // electric blue
      //   "rgba(0, 200, 255, 1)", // cyan
      //   "rgba(90, 120, 255, 1)", // bluish purple
      "rgba(255, 60, 200, 1)", // neon pink
    ],
    []
  );

  const pathsRef = useRef<Path[]>([]);
  const staticSegmentsRef = useRef<{ a: Point; b: Point }[]>([]);
  const lastSizeRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const blurOverlayRef = useRef<HTMLDivElement | null>(null);
  const maskCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const lastMaskUpdateRef = useRef<number>(0);

  // Creative, spaced orthogonal paths in separated regions (no collisions)
  function buildFixedPaths(
    w: number,
    h: number,
    heroRect?: DOMRect | null
  ): Path[] {
    const margin = Math.max(32, Math.min(w, h) * 0.05);
    const gutter = Math.max(16, Math.min(w, h) * 0.02);
    // Reserve a left corridor exclusively for the underline path
    const leftCorridorX2 = margin + Math.max(160, w * 0.22);
    // Five non-overlapping horizontal bands kept near the top so they follow while scrolling
    const regions: { x1: number; y1: number; x2: number; y2: number }[] = [
      {
        x1: leftCorridorX2 + gutter,
        y1: h * 0.12,
        x2: w - margin,
        y2: h * 0.2,
      },
      {
        x1: leftCorridorX2 + gutter,
        y1: h * 0.22,
        x2: w - margin,
        y2: h * 0.3,
      },
      {
        x1: leftCorridorX2 + gutter,
        y1: h * 0.3,
        x2: w - margin,
        y2: h * 0.38,
      },
      {
        x1: leftCorridorX2 + gutter,
        y1: h * 0.38,
        x2: w - margin,
        y2: h * 0.46,
      },
      {
        x1: leftCorridorX2 + gutter,
        y1: h * 0.46,
        x2: w - margin,
        y2: h * 0.54,
      },
    ];

    // Force color mixing per side: left (idx 0,2) => [pink, blue], right (idx 1,3) => [blue, pink]
    const regionColors = [
      neonColors[0], // band 1 blue
      neonColors[1], // band 2 pink
      neonColors[0], // band 3 blue
      neonColors[1], // band 4 pink
      neonColors[0], // band 5 blue
    ];

    const paths: Path[] = [];

    // Optional anchored path under the hero name as the 1st path
    if (heroRect) {
      const step = Math.max(12, Math.min(w, h) / 42);
      const snap = (v: number, st: number) => Math.round(v / st) * st;
      const underlineY = snap(heroRect.bottom + 16, step);
      const startX = snap(Math.max(margin, heroRect.left) + 2, step);
      const endX = snap(Math.min(leftCorridorX2 - 4, heroRect.right) - 2, step);

      const points: Point[] = [];
      points.push({ x: startX, y: underlineY });
      points.push({ x: endX, y: underlineY }); // underline segment

      // drop down first, but keep underline within the top corridor
      let x = endX;
      let y = snap(Math.min(h * 0.2, underlineY + step * 3), step);
      points.push({ x, y });

      // Continue serpentine primarily downward within the reserved left corridor
      const segments = 36; // TUNABLE: underline path complexity/length
      let goRight = Math.random() < 0.5;
      for (let s = 0; s < segments; s++) {
        x = goRight
          ? snap(leftCorridorX2 - step * 0.5, step)
          : snap(margin + step * 0.5, step);
        points.push({ x, y });
        const downStride = 0.8 + Math.random() * 0.8; // small movement to keep near top
        y = snap(Math.min(h * 0.22, y + step * downStride), step);
        points.push({ x, y });
        goRight = !goRight;
      }

      let total = 0;
      const segLens: number[] = [0];
      for (let i = 1; i < points.length; i++) {
        const dx = points[i].x - points[i - 1].x;
        const dy = points[i].y - points[i - 1].y;
        total += Math.hypot(dx, dy);
        segLens.push(total);
      }

      paths.push({
        points,
        segLens,
        totalLen: total,
        speed: 62, // TUNABLE: underline speed (faster)
        head: Math.min(180, total), // start ahead so it's visible immediately
        color: neonColors[1], // pink underline by default
        phase: Math.random() * Math.PI * 2,
      });
    }

    regions.forEach((r, idx) => {
      const snap = (v: number, step: number) => Math.round(v / step) * step;
      // TUNABLE: decrease step for tighter, more frequent turns; increase for smoother, fewer turns
      // Smaller step + more segments = longer paths with more bends
      const step = Math.max(10, Math.min(r.x2 - r.x1, r.y2 - r.y1) / 22);

      const points: Point[] = [];
      let x = snap(r.x1 + step * 0.5, step);
      let y = snap((r.y1 + r.y2) / 2, step);
      points.push({ x, y });

      // TUNABLE: increase segments to turn more often and lengthen the route
      const segments = 32;
      let horizRight = idx % 2 === 0;
      let vertDown = idx % 2 !== 0;

      for (let s = 0; s < segments; s++) {
        x = horizRight
          ? snap(r.x2 - step * 0.5, step)
          : snap(r.x1 + step * 0.5, step);
        points.push({ x, y });
        const boundTarget = vertDown ? r.y2 - step * 0.5 : r.y1 + step * 0.5;
        y = snap(boundTarget, step);
        points.push({ x, y });
        horizRight = !horizRight;
        vertDown = !vertDown;
      }

      let total = 0;
      const segLens: number[] = [0];
      for (let i = 1; i < points.length; i++) {
        const dx = points[i].x - points[i - 1].x;
        const dy = points[i].y - points[i - 1].y;
        total += Math.hypot(dx, dy);
        segLens.push(total);
      }

      paths.push({
        points,
        segLens,
        totalLen: total,
        // TUNABLE: increase speed for faster movement (pixels per second)
        speed: 38 + idx * 4.5,
        head: Math.random() * total,
        // Use forced region color to guarantee one blue & one pink on each side
        color: regionColors[idx % regionColors.length],
        phase: Math.random() * Math.PI * 2,
      });
    });

    return paths;
  }

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
    // --- Build a randomized maze (DFS backtracker) on a coarse grid ---
    const gStep = Math.max(40, Math.min(w, h) / 18);
    const gc = Math.max(8, Math.floor((w - gStep) / gStep));
    const gr = Math.max(6, Math.floor((h - gStep) / gStep));
    const visited: boolean[][] = Array.from({ length: gr }, () =>
      Array(gc).fill(false)
    );
    const edges: Record<string, boolean> = {};
    const inb = (c: number, r: number) => c >= 0 && r >= 0 && c < gc && r < gr;
    const key = (a: number, b: number, c: number, d: number) =>
      `${a},${b}-${c},${d}`;

    function carve(c: number, r: number) {
      visited[r][c] = true;
      const dirs = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ].sort(() => Math.random() - 0.5);
      for (const [dc, dr] of dirs) {
        const nc = c + dc,
          nr = r + dr;
        if (inb(nc, nr) && !visited[nr][nc]) {
          edges[key(c, r, nc, nr)] = true;
          edges[key(nc, nr, c, r)] = true;
          carve(nc, nr);
        }
      }
    }
    carve(Math.floor(gc / 2), Math.floor(gr / 2));

    // Build a long path by random walk constrained to carved edges
    function longWalk(
      startC: number,
      startR: number,
      maxHops: number
    ): Point[] {
      const pts: Point[] = [];
      let c = startC,
        r = startR;
      const toPx = (cc: number, rr: number) => ({
        x: Math.round(gStep * 0.5 + cc * gStep),
        y: Math.round(gStep * 0.5 + rr * gStep),
      });
      pts.push(toPx(c, r));
      let lastDc = 0,
        lastDr = 0;
      for (let i = 0; i < maxHops; i++) {
        const opts = [
          [1, 0],
          [-1, 0],
          [0, 1],
          [0, -1],
        ].filter(([dc, dr]) => edges[key(c, r, c + dc, r + dr)]);
        // bias to continue straight; consider more options to increase turn rate
        opts.sort(
          (a, b) =>
            (b[0] === lastDc && b[1] === lastDr ? 1 : 0) -
            (a[0] === lastDc && a[1] === lastDr ? 1 : 0)
        );
        if (!opts.length) break;
        const [dc, dr] =
          opts[Math.floor(Math.random() * Math.min(3, opts.length))];
        c += dc;
        r += dr;
        lastDc = dc;
        lastDr = dr;
        pts.push(toPx(c, r));
      }
      // compress collinear points
      const out: Point[] = [];
      for (let i = 0; i < pts.length; i++) {
        if (i > 0 && i < pts.length - 1) {
          const a = pts[i - 1],
            b = pts[i],
            cpt = pts[i + 1];
          if ((a.x === b.x && b.x === cpt.x) || (a.y === b.y && b.y === cpt.y))
            continue;
        }
        out.push(pts[i]);
      }
      return out;
    }

    const paths: Path[] = [];
    staticSegmentsRef.current = [];
    // draw faint entire maze network segments
    for (let rr = 0; rr < gr; rr++) {
      for (let cc = 0; cc < gc; cc++) {
        const a = {
          x: Math.round(gStep * 0.5 + cc * gStep),
          y: Math.round(gStep * 0.5 + rr * gStep),
        };
        for (const [dc, dr] of [
          [1, 0],
          [0, 1],
        ] as const) {
          const nc = cc + dc,
            nr = rr + dr;
          if (inb(nc, nr) && edges[key(cc, rr, nc, nr)]) {
            const b = {
              x: Math.round(gStep * 0.5 + nc * gStep),
              y: Math.round(gStep * 0.5 + nr * gStep),
            };
            staticSegmentsRef.current.push({ a, b });
          }
        }
      }
    }

    // add 5 long walks for neon pulses spanning across (6 total incl. underline)
    const starts: [number, number][] = [
      [0, 0],
      [gc - 1, Math.floor(gr / 2)],
      [Math.floor(gc / 2), gr - 1],
      [gc - 1, 0],
      [Math.floor(gc / 3), Math.floor(gr * 0.25)],
    ];
    starts.forEach((s, idx) => {
      // longer walks for longer visible lines
      const walk = longWalk(s[0], s[1], Math.floor((gc + gr) * 2.2));
      let total = 0;
      const segLens = [0];
      for (let i = 1; i < walk.length; i++) {
        total += Math.hypot(
          walk[i].x - walk[i - 1].x,
          walk[i].y - walk[i - 1].y
        );
        segLens.push(total);
      }
      if (total < 10) return;
      paths.push({
        points: walk,
        segLens,
        totalLen: total,
        // brighter & faster pulses on maze walks
        speed: rnd(20, 32),
        head: Math.random() * total,
        color: neonColors[idx % neonColors.length],
        phase: Math.random() * Math.PI * 2,
      });
    });

    return paths;
  }

  function drawStaticNetwork(ctx: CanvasRenderingContext2D, paths: Path[]) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.save();
    ctx.lineWidth = 1;
    ctx.strokeStyle = isDark
      ? "rgba(120, 140, 170, 0.08)"
      : "rgba(30, 40, 80, 0.12)"; // faint carved path with more contrast in light
    ctx.shadowColor = "transparent";
    // draw entire maze network for richer pattern
    ctx.beginPath();
    for (const seg of staticSegmentsRef.current) {
      ctx.moveTo(seg.a.x, seg.a.y);
      ctx.lineTo(seg.b.x, seg.b.y);
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
    const root = base.parentElement as HTMLDivElement | null;

    const handleResize = () => {
      fitCanvas(base);
      fitCanvas(anim);

      if (!maskCanvasRef.current) {
        maskCanvasRef.current = document.createElement("canvas");
      }
      const mw = base.clientWidth;
      const mh = base.clientHeight;
      if (
        maskCanvasRef.current.width !== mw ||
        maskCanvasRef.current.height !== mh
      ) {
        maskCanvasRef.current.width = mw;
        maskCanvasRef.current.height = mh;
      }

      const baseCtx = base.getContext("2d")!;
      const animCtx = anim.getContext("2d")!;
      baseCtx.clearRect(0, 0, base.width, base.height);
      animCtx.clearRect(0, 0, anim.width, anim.height);

      const w = base.clientWidth;
      const h = base.clientHeight;
      // Regenerate only on significant size changes to avoid mobile scroll re-randomizing
      const last = lastSizeRef.current;
      const widthChanged = Math.abs(w - last.w) > 24;
      const heightChanged = Math.abs(h - last.h) > 160; // ignore small URL-bar jitters
      if (!pathsRef.current.length || widthChanged || heightChanged) {
        const hero = document.getElementById("hero-name");
        const rect = hero ? hero.getBoundingClientRect() : null;
        pathsRef.current = buildFixedPaths(w, h, rect);
        lastSizeRef.current = { w, h };
      }
      drawStaticNetwork(baseCtx, pathsRef.current);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    // Fade lines out as user scrolls past the first viewport, restore when scrolling up
    const onScroll = () => {
      const y = window.scrollY || 0;
      const vh = window.innerHeight || 1;
      const fade = Math.max(0, Math.min(1, 1 - y / vh));
      if (root) root.style.opacity = String(fade);
      if (blurOverlayRef.current) {
        // keep a subtle frost even as fading
        const blurPx = 8 + 6 * fade; // 14px at top → 8px at bottom of first screen
        blurOverlayRef.current.style.backdropFilter = `blur(${blurPx}px)`;
        (blurOverlayRef.current.style as any).WebkitBackdropFilter = `blur(${blurPx}px)`;
        blurOverlayRef.current.style.opacity = String(fade);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    let last = performance.now();

    const loop = (t: number) => {
      const ctx = anim.getContext("2d")!;
      const mctx = maskCanvasRef.current?.getContext("2d") || null;
      const paths = pathsRef.current;
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;

      ctx.clearRect(0, 0, anim.width, anim.height);
      if (mctx && maskCanvasRef.current) {
        mctx.clearRect(
          0,
          0,
          maskCanvasRef.current.width,
          maskCanvasRef.current.height
        );
      }

      if (!prefersReducedMotion && !document.hidden) {
        for (const p of paths) {
          p.head = (p.head + p.speed * dt) % p.totalLen;
          // TUNABLE: tailLen controls the visible length of each neon pulse
          const tailLen = 340; // longer visible neon segment
          const start = p.head - tailLen;
          const end = p.head;

          const beat = 0.45 + 0.25 * Math.max(0, Math.sin(t / 700 + p.phase));
          const width = 1.0 + 0.6 * beat;

          // Frosted/glow effect: draw blurred passes behind, then crisp core
          // TUNABLE: adjust blur and alpha to increase/decrease frosted look
          const frostedPasses = [
            { blur: 0, alpha: 0.0 },
            { blur: 0, alpha: 0.0 },
          ];

          for (const pass of frostedPasses) {
            ctx.save();
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.lineWidth = width * 1.5;
            ctx.filter = `blur(${pass.blur}px)`;
            ctx.globalAlpha = pass.alpha;
            ctx.strokeStyle = p.color;
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 0;

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

          // Core neon stroke
          ctx.save();
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.lineWidth = width;
          ctx.filter = "none";
          ctx.globalAlpha = 1;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 14 + 16 * beat;
          // brighten core opacity
          ctx.strokeStyle = p.color.replace(", 1)", `, ${0.8 + 0.2 * beat})`);

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

          // Update mask for true backdrop blur over lines
          if (mctx) {
            mctx.save();
            mctx.lineCap = "round";
            mctx.lineJoin = "round";
            mctx.lineWidth = Math.max(10, width * 6);
            mctx.strokeStyle = "rgba(255,255,255,1)";

            if (start < 0) {
              strokePolylinePortion(
                mctx,
                p.points,
                p.segLens,
                p.totalLen + start,
                p.totalLen
              );
              strokePolylinePortion(mctx, p.points, p.segLens, 0, end);
            } else {
              strokePolylinePortion(mctx, p.points, p.segLens, start, end);
            }
            mctx.restore();
          }
        }

        // Throttle applying mask image to the overlay element
        const now = performance.now();
        if (
          blurOverlayRef.current &&
          maskCanvasRef.current &&
          now - lastMaskUpdateRef.current > 80
        ) {
          const url = maskCanvasRef.current.toDataURL("image/png");
          const el = blurOverlayRef.current;
          el.style.webkitMaskImage = `url(${url})`;
          (el.style as any).maskImage = `url(${url})`;
          el.style.webkitMaskSize = "100% 100%";
          (el.style as any).maskSize = "100% 100%";
          el.style.webkitMaskRepeat = "no-repeat";
          (el.style as any).maskRepeat = "no-repeat";
          lastMaskUpdateRef.current = now;
        }
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", onScroll as any);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [prefersReducedMotion]);

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-0 -z-10 ${
        isDark ? "bg-black" : "bg-transparent"
      }`}
    >
      <canvas ref={baseRef} className="absolute inset-0 h-full w-full" />
      <canvas ref={animRef} className="absolute inset-0 h-full w-full" />
      {/* Backdrop blur overlay that only blurs where mask is drawn */}
      <div
        ref={blurOverlayRef}
        className="absolute inset-0"
        style={{
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          // mask is applied dynamically each frame from maskCanvas
        }}
      />
    </div>
  );
}
