"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAngelStore } from "../../store/useAngelStore";
import { soundEngine } from "../../lib/soundEngine";
import { Music, Volume2, VolumeX, Play, Pause } from "lucide-react";

export const BgmPlayer: React.FC = () => {
  const { settings, toggleSetting } = useAngelStore();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Sync BGM state on load or settings change
  useEffect(() => {
    if (!isMounted) return;
    if (settings.bgmEnabled) {
      soundEngine.startBgm(settings.volume, true);
      setIsPlaying(true);
    } else {
      soundEngine.stopBgm();
      setIsPlaying(false);
    }
  }, [settings.bgmEnabled, settings.volume, isMounted]);

  const toggleBgm = () => {
    if (settings.bgmEnabled) {
      soundEngine.stopBgm();
      toggleSetting("bgmEnabled");
      setIsPlaying(false);
    } else {
      toggleSetting("bgmEnabled");
      soundEngine.startBgm(settings.volume, true);
      setIsPlaying(true);
    }
  };

  if (!isMounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="fixed bottom-24 sm:bottom-28 right-4 sm:right-6 z-40 px-3.5 py-2.5 rounded-2xl bg-slate-950/85 border border-amber-300/40 shadow-[0_0_30px_rgba(255,215,0,0.25)] backdrop-blur-xl flex items-center space-x-3 text-amber-100 max-w-[90vw] sm:max-w-xs select-none"
    >
      {/* Equalizer Visualizer Bars */}
      <div className="flex items-end space-x-0.5 h-4 w-4 justify-center">
        {isPlaying ? (
          <>
            <motion.span
              animate={{ height: ["20%", "100%", "40%", "80%", "20%"] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 bg-amber-400 rounded-full"
            />
            <motion.span
              animate={{ height: ["60%", "30%", "90%", "20%", "60%"] }}
              transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
              className="w-1 bg-yellow-300 rounded-full"
            />
            <motion.span
              animate={{ height: ["40%", "80%", "30%", "100%", "40%"] }}
              transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
              className="w-1 bg-amber-500 rounded-full"
            />
          </>
        ) : (
          <Music className="w-4 h-4 text-amber-300/40" />
        )}
      </div>

      {/* Track Label */}
      <div className="flex flex-col text-left flex-1 min-w-0">
        <div className="flex items-center space-x-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300/80">
            Soft Ambient BGM
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>
        <span className="text-xs font-semibold text-amber-100 truncate">
          Heavenly Serenade 🎵
        </span>
      </div>

      {/* Play/Pause Button */}
      <button
        onClick={toggleBgm}
        className="p-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 hover:scale-105 transition-transform font-bold shadow-md flex items-center justify-center"
        title={isPlaying ? "Pause Light BGM" : "Play Soft BGM"}
      >
        {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
      </button>
    </motion.div>
  );
};
