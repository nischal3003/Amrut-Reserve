"use client";

import { useEffect, useRef } from "react";

/**
 * Generative forest-green lattice backdrop for the hero.
 *
 * A grid of nodes (spacing ~46px) connected by thin ivory links. Nodes are
 * spring-anchored to their rest position; the pointer pushes nearby nodes,
 * a click emits an expanding shockwave, and brass pulses periodically travel
 * along links.
 *
 * Rendered on a continuous requestAnimationFrame loop, DPR-aware, and resized
 * via ResizeObserver + window resize. Respects prefers-reduced-motion by
 * painting a single static frame instead of animating.
 */

const FOREST_BG = "#20392c";
const IVORY_RGB = "245, 240, 230";
const BRASS_RGB = "169, 139, 93";
const SPACING = 46;
const SPRING_K = 32;
const DAMPING = 0.8;

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  col: number;
  row: number;
  tension: number;
};

type Pulse = { fromNode: number; toNode: number; progress: number; speed: number };
type Shockwave = { x: number; y: number; radius: number; maxRadius: number; power: number };

export function HeroLattice() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const dims = { width: 0, height: 0, cols: 0, rows: 0 };
    let nodes: Node[] = [];
    const pulses: Pulse[] = [];
    const shockwaves: Shockwave[] = [];
    const pointer = {
      x: -2000,
      y: -2000,
      prevX: -2000,
      prevY: -2000,
      vx: 0,
      vy: 0,
      radius: 150,
      isDown: false,
    };

    const buildLattice = (width: number, height: number) => {
      const cols = Math.ceil(width / SPACING) + 1;
      const rows = Math.ceil(height / SPACING) + 1;
      const built: Node[] = [];
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const x = c * SPACING;
          const y = r * SPACING;
          built.push({ x, y, vx: 0, vy: 0, baseX: x, baseY: y, col: c, row: r, tension: 0 });
        }
      }
      dims.width = width;
      dims.height = height;
      dims.cols = cols;
      dims.rows = rows;
      nodes = built;
    };

    const applySize = () => {
      const rect = container.getBoundingClientRect();
      const width = rect.width > 0 ? rect.width : window.innerWidth || 1440;
      const height = rect.height > 0 ? rect.height : window.innerHeight || 900;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      buildLattice(width, height);
    };

    // Tensioned links (rare) are drawn individually since their glow varies;
    // resting links are batched into one path per frame to avoid thousands
    // of separate stroke() calls, which was the main source of jank.
    const drawTensionedLink = (n1: Node, n2: Node, glow: number) => {
      ctx.strokeStyle = `rgba(${IVORY_RGB}, ${Math.min(1, 0.18 + glow * 0.6)})`;
      ctx.lineWidth = 0.7 + glow * 1.1;
      ctx.beginPath();
      ctx.moveTo(n1.x, n1.y);
      ctx.lineTo(n2.x, n2.y);
      ctx.stroke();
    };

    const paintFrame = (dt: number) => {
      const { width, height, cols, rows } = dims;

      pointer.vx = (pointer.x - pointer.prevX) / (dt * 1000 || 1);
      pointer.vy = (pointer.y - pointer.prevY) / (dt * 1000 || 1);
      pointer.prevX = pointer.x;
      pointer.prevY = pointer.y;
      const mouseSpeed = Math.sqrt(pointer.vx * pointer.vx + pointer.vy * pointer.vy);

      ctx.fillStyle = FOREST_BG;
      ctx.fillRect(0, 0, width, height);

      // Advance shockwaves
      for (let s = shockwaves.length - 1; s >= 0; s--) {
        const sw = shockwaves[s];
        sw.radius += 380 * dt;
        sw.power *= Math.pow(0.12, dt);
        if (sw.radius > sw.maxRadius || sw.power < 0.01) shockwaves.splice(s, 1);
      }

      // Integrate node physics
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const dx = pointer.x - n.x;
        const dy = pointer.y - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < pointer.radius && dist > 0) {
          const ratio = 1 - dist / pointer.radius;
          const force = ratio * (650 + mouseSpeed * 70 + (pointer.isDown ? 1100 : 0));
          const angle = Math.atan2(dy, dx);
          n.vx -= Math.cos(angle) * force * dt;
          n.vy -= Math.sin(angle) * force * dt;
          n.tension = Math.min(1, n.tension + ratio * 0.5);
        }
        for (let s = 0; s < shockwaves.length; s++) {
          const sw = shockwaves[s];
          const swDx = n.x - sw.x;
          const swDy = n.y - sw.y;
          const swDist = Math.sqrt(swDx * swDx + swDy * swDy);
          const delta = Math.abs(swDist - sw.radius);
          if (delta < 50) {
            const force = (1 - delta / 50) * sw.power * 2200;
            const angle = Math.atan2(swDy, swDx);
            n.vx += Math.cos(angle) * force * dt;
            n.vy += Math.sin(angle) * force * dt;
            n.tension = 1.0;
          }
        }
        const hx = n.baseX - n.x;
        const hy = n.baseY - n.y;
        n.vx += hx * SPRING_K * dt;
        n.vy += hy * SPRING_K * dt;
        // Damping is normalized to elapsed time so the motion feels the
        // same at 60Hz and 144Hz — without this it over-damps (feels
        // sticky/laggy) on high refresh-rate displays.
        const frameDamping = Math.pow(DAMPING, dt * 60);
        n.vx *= frameDamping;
        n.vy *= frameDamping;
        n.x += n.vx * dt * 60;
        n.y += n.vy * dt * 60;
        n.tension = Math.max(0, n.tension - dt * 0.9);
      }

      // Spawn brass pulses along links
      if (Math.random() < 0.12 && nodes.length > 0 && pulses.length < 16) {
        const fromIdx = Math.floor(Math.random() * nodes.length);
        const fromNode = nodes[fromIdx];
        const dirs = [
          { dc: 1, dr: 0 },
          { dc: -1, dr: 0 },
          { dc: 0, dr: 1 },
          { dc: 0, dr: -1 },
        ];
        const dir = dirs[Math.floor(Math.random() * dirs.length)];
        const targetCol = fromNode.col + dir.dc;
        const targetRow = fromNode.row + dir.dr;
        if (targetCol >= 0 && targetCol < cols && targetRow >= 0 && targetRow < rows) {
          const toIdx = targetCol * rows + targetRow;
          if (toIdx >= 0 && toIdx < nodes.length) {
            pulses.push({ fromNode: fromIdx, toNode: toIdx, progress: 0, speed: 1.4 + Math.random() * 1.8 });
          }
        }
      }

      // Draw links (right + down neighbours). Resting links share one path;
      // tensioned links are rare and drawn separately for their glow.
      const tensionedLinks: [Node, Node, number][] = [];
      ctx.strokeStyle = `rgba(${IVORY_RGB}, 0.06)`;
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const idx = c * rows + r;
          const n = nodes[idx];
          if (!n) continue;
          const neighbours = [];
          if (c < cols - 1) neighbours.push(nodes[(c + 1) * rows + r]);
          if (r < rows - 1) neighbours.push(nodes[c * rows + (r + 1)]);
          for (const n2 of neighbours) {
            if (!n2) continue;
            const dx = n.x - n2.x;
            const dy = n.y - n2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const stretch = Math.abs(dist - SPACING) / SPACING;
            const tensioned = n.tension > 0.05 || n2.tension > 0.05 || stretch > 0.1;
            if (tensioned) {
              tensionedLinks.push([n, n2, Math.max(n.tension, n2.tension, stretch * 2)]);
            } else {
              ctx.moveTo(n.x, n.y);
              ctx.lineTo(n2.x, n2.y);
            }
          }
        }
      }
      ctx.stroke();
      for (const [n1, n2, glow] of tensionedLinks) drawTensionedLink(n1, n2, glow);

      // Draw + advance pulses
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p];
        pulse.progress += dt * pulse.speed;
        const n1 = nodes[pulse.fromNode];
        const n2 = nodes[pulse.toNode];
        if (!n1 || !n2 || pulse.progress >= 1) {
          if (n2) n2.tension = Math.min(1, n2.tension + 0.3);
          pulses.splice(p, 1);
          continue;
        }
        const px = n1.x + (n2.x - n1.x) * pulse.progress;
        const py = n1.y + (n2.y - n1.y) * pulse.progress;
        ctx.fillStyle = `rgb(${BRASS_RGB})`;
        ctx.beginPath();
        ctx.arc(px, py, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    let animId = 0;
    let lastTime = performance.now();
    const render = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.033);
      lastTime = now;
      paintFrame(dt);
      animId = requestAnimationFrame(render);
    };

    // Pointer handlers
    const onMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };
    const onDown = (e: PointerEvent) => {
      pointer.isDown = true;
      const rect = container.getBoundingClientRect();
      shockwaves.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        radius: 8,
        maxRadius: 380,
        power: 1.1,
      });
    };
    const onUp = () => {
      pointer.isDown = false;
    };
    const onLeave = () => {
      pointer.x = -2000;
      pointer.y = -2000;
      pointer.isDown = false;
    };

    applySize();

    const ro = new ResizeObserver(applySize);
    ro.observe(container);
    window.addEventListener("resize", applySize);
    container.addEventListener("pointermove", onMove);
    container.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    container.addEventListener("pointerleave", onLeave);

    if (reduceMotion) {
      paintFrame(0.016);
    } else {
      animId = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      window.removeEventListener("resize", applySize);
      container.removeEventListener("pointermove", onMove);
      container.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      container.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden cursor-crosshair"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />
    </div>
  );
}
