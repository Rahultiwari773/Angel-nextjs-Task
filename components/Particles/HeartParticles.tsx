"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAngelStore } from "../../store/useAngelStore";

interface FloatingHeart {
  id: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  color: string;
}

export const HeartParticles: React.FC = () => {
  const { stage, angelPos } = useAngelStore();
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  useEffect(() => {
    if (stage === "reacting") {
      const colors = ["#EC4899", "#F43F5E", "#E11D48", "#FB7185", "#F472B6", "#FFD700"];
      const newHearts: FloatingHeart[] = Array.from({ length: 15 }, (_, i) => ({
        id: `heart-${Date.now()}-${i}`,
        x: angelPos.x + (Math.random() * 160 - 80),
        y: angelPos.y + (Math.random() * 100 - 50),
        scale: Math.random() * 0.8 + 0.6,
        rotation: Math.random() * 40 - 20,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));

      setHearts((prev) => [...prev, ...newHearts]);

      const timer = setTimeout(() => {
        setHearts((prev) => prev.filter((h) => !newHearts.some((nh) => nh.id === h.id)));
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [stage, angelPos]);

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      <AnimatePresence>
        {hearts.map((h) => (
          <motion.div
            key={h.id}
            initial={{ opacity: 1, y: h.y, x: h.x, scale: 0.3, rotate: h.rotation }}
            animate={{
              opacity: 0,
              y: h.y - 180 - Math.random() * 60,
              x: h.x + (Math.random() * 80 - 40),
              scale: h.scale,
              rotate: h.rotation + Math.random() * 30 - 15,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.2, ease: "easeOut" }}
            style={{ position: "absolute" }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill={h.color}
              className="drop-shadow-[0_0_12px_rgba(244,63,94,0.8)]"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
