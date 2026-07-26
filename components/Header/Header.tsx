"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAngelStore } from "../../store/useAngelStore";
import { soundEngine } from "../../lib/soundEngine";
import { Sliders, Shield, Volume2, VolumeX, Sparkles, Music } from "lucide-react";
import { motion } from "framer-motion";

export const Header: React.FC = () => {
  const { toggleSettingsDrawer, settings, toggleSetting } = useAngelStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleBgm = () => {
    if (settings.bgmEnabled) {
      soundEngine.stopBgm();
      toggleSetting("bgmEnabled");
    } else {
      toggleSetting("bgmEnabled");
      soundEngine.startBgm(settings.volume, true);
    }
  };

  return (
    <header className="fixed top-2 sm:top-3 left-1/2 -translate-x-1/2 z-40 max-w-5xl w-[95vw] sm:w-[92vw] px-3 sm:px-5 py-2 sm:py-2.5 rounded-2xl bg-slate-950/80 border border-amber-300/40 shadow-[0_0_25px_rgba(255,215,0,0.3)] backdrop-blur-xl flex items-center justify-between">
      {/* Brand Title */}
      <Link href="/" className="flex items-center space-x-2 group shrink-0">
        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 group-hover:rotate-45 transition-transform" />
        <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-100 tracking-wider text-base sm:text-lg md:text-xl">
          Angel Experience
        </span>
      </Link>

      {/* Action Controls */}
      <div className="flex items-center space-x-1.5 sm:space-x-3">
        {/* Soft Ambient BGM Toggle */}
        <button
          onClick={toggleBgm}
          className={`px-2.5 py-1.5 rounded-xl border text-xs font-semibold flex items-center space-x-1.5 transition-all ${
            settings.bgmEnabled
              ? "bg-amber-400/20 border-amber-300/70 text-amber-200 shadow-[0_0_12px_rgba(255,215,0,0.4)]"
              : "bg-slate-900/80 border-slate-700/60 text-slate-400 hover:text-amber-200"
          }`}
          title={settings.bgmEnabled ? "Pause Ambient Music" : "Play Ambient Music"}
        >
          {settings.bgmEnabled ? (
            <span className="flex items-end space-x-0.5 h-3.5 w-3 justify-center">
              <motion.span
                animate={{ height: ["20%", "100%", "40%", "80%", "20%"] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                className="w-0.5 bg-amber-300 rounded-full"
              />
              <motion.span
                animate={{ height: ["60%", "30%", "90%", "20%", "60%"] }}
                transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
                className="w-0.5 bg-yellow-200 rounded-full"
              />
              <motion.span
                animate={{ height: ["40%", "80%", "30%", "100%", "40%"] }}
                transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                className="w-0.5 bg-amber-400 rounded-full"
              />
            </span>
          ) : (
            <Music className="w-3.5 h-3.5" />
          )}
          <span className="hidden md:inline font-bold">
            {settings.bgmEnabled ? "BGM On" : "BGM Muted"}
          </span>
        </button>

        {/* Quick SFX Mute Toggle */}
        <button
          onClick={() => toggleSetting("sfxEnabled")}
          className="p-1.5 sm:p-2 rounded-xl bg-slate-900/80 border border-slate-700/60 text-amber-300 hover:border-amber-300 transition-colors"
          title={settings.sfxEnabled ? "Mute SFX" : "Unmute SFX"}
        >
          {settings.sfxEnabled ? (
            <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500" />
          )}
        </button>

        {/* Admin Panel Link */}
        <Link
          href="/admin"
          className="px-2.5 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700/60 text-amber-200 hover:border-amber-300 text-xs font-semibold flex items-center space-x-1 transition-colors"
        >
          <Shield className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">Admin</span>
        </Link>

        {/* Settings Drawer Button */}
        <button
          onClick={toggleSettingsDrawer}
          className="p-1.5 sm:p-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 hover:scale-105 transition-transform shadow-md font-bold"
          title="Open Settings"
        >
          <Sliders className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </div>
    </header>
  );
};
