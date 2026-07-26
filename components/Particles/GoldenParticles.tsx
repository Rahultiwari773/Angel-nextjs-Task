"use client";

import React, { useEffect, useRef } from "react";
import { useAngelStore } from "../../store/useAngelStore";

interface Sparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  maxAlpha: number;
  pulseSpeed: number;
}

export const GoldenParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const settings = useAngelStore((state) => state.settings);

  useEffect(() => {
    if (!settings.particlesEnabled) return;
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

    const sparkles: Sparkle[] = Array.from({ length: 120 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4 * settings.animationSpeed,
      vy: (-Math.random() * 0.6 - 0.2) * settings.animationSpeed,
      size: Math.random() * 2.5 + 1,
      alpha: Math.random(),
      maxAlpha: Math.random() * 0.7 + 0.3,
      pulseSpeed: Math.random() * 0.03 + 0.01,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      sparkles.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.alpha += s.pulseSpeed;

        if (s.alpha > s.maxAlpha || s.alpha < 0.1) {
          s.pulseSpeed = -s.pulseSpeed;
        }

        if (s.y < -10) {
          s.y = height + 10;
          s.x = Math.random() * width;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, s.alpha));
        ctx.fillStyle = "#FFD700";
        ctx.shadowColor = "#FBBF24";
        ctx.shadowBlur = 10;

        // Draw 4-point star shape
        ctx.beginPath();
        const r = s.size;
        ctx.moveTo(s.x, s.y - r * 2);
        ctx.lineTo(s.x + r * 0.5, s.y - r * 0.5);
        ctx.lineTo(s.x + r * 2, s.y);
        ctx.lineTo(s.x + r * 0.5, s.y + r * 0.5);
        ctx.lineTo(s.x, s.y + r * 2);
        ctx.lineTo(s.x - r * 0.5, s.y + r * 0.5);
        ctx.lineTo(s.x - r * 2, s.y);
        ctx.lineTo(s.x - r * 0.5, s.y - r * 0.5);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [settings.particlesEnabled, settings.animationSpeed]);

  if (!settings.particlesEnabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-5"
    />
  );
};
