"use client";

import React, { useEffect, useRef } from "react";
import { useAngelStore } from "../../store/useAngelStore";
import { soundEngine } from "../../lib/soundEngine";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  decay: number;
  color: string;
  size: number;
  trail: { x: number; y: number }[];
}

interface Rocket {
  x: number;
  y: number;
  targetY: number;
  vy: number;
  color: string;
}

export const FireworksCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { settings, fireworksTrigger } = useAngelStore();

  const prevTrigger = useRef(fireworksTrigger);

  useEffect(() => {
    if (!settings.crackersEnabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const colors = [
      "#FFD700", // Gold
      "#38BDF8", // Blue
      "#EC4899", // Pink
      "#A855F7", // Purple
      "#F43F5E", // Rose
      "#6366F1", // Indigo
    ];

    const rockets: Rocket[] = [];
    const particles: Particle[] = [];

    const createBurst = (x: number, y: number, color: string) => {
      const particleCount = 80;
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5);
        const speed = (Math.random() * 6 + 2) * settings.animationSpeed;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          decay: Math.random() * 0.015 + 0.01,
          color,
          size: Math.random() * 2.5 + 1,
          trail: [],
        });
      }
      soundEngine.playCrackersPop(settings.volume, settings.sfxEnabled);
    };

    // Auto launcher
    const launchRandomRocket = () => {
      const x = Math.random() * (width - 200) + 100;
      const targetY = Math.random() * (height * 0.4) + height * 0.1;
      const color = colors[Math.floor(Math.random() * colors.length)];
      rockets.push({
        x,
        y: height,
        targetY,
        vy: - (Math.random() * 4 + 8) * settings.animationSpeed,
        color,
      });
    };

    // Check if store requested trigger
    if (fireworksTrigger > prevTrigger.current) {
      prevTrigger.current = fireworksTrigger;
      for (let k = 0; k < 4; k++) {
        setTimeout(launchRandomRocket, k * 200);
      }
    }

    const render = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
      ctx.fillRect(0, 0, width, height);

      // Render Rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.y += r.vy;
        ctx.fillStyle = r.color;
        ctx.beginPath();
        ctx.arc(r.x, r.y, 3, 0, Math.PI * 2);
        ctx.fill();

        if (r.y <= r.targetY) {
          createBurst(r.x, r.y, r.color);
          rockets.splice(i, 1);
        }
      }

      // Render Burst Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08; // Gravity
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.alpha -= p.decay;

        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 4) p.trail.shift();

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;

        // Trail line
        ctx.beginPath();
        if (p.trail.length > 1) {
          ctx.moveTo(p.trail[0].x, p.trail[0].y);
          for (let t = 1; t < p.trail.length; t++) {
            ctx.lineTo(p.trail[t].x, p.trail[t].y);
          }
        }
        ctx.strokeStyle = p.color;
        ctx.lineWidth = p.size;
        ctx.stroke();

        // Main particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [settings.crackersEnabled, settings.animationSpeed, fireworksTrigger, settings.volume, settings.sfxEnabled]);

  if (!settings.crackersEnabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-10"
    />
  );
};
