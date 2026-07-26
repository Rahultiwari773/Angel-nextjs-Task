"use client";

import React from "react";
import Link from "next/link";
import { useAngelStore } from "../../store/useAngelStore";
import { Sliders, Shield, Volume2, VolumeX, Sparkles } from "lucide-react";

export const Header: React.FC = () => {
  const { toggleSettingsDrawer, settings, toggleSetting } = useAngelStore();

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-40 max-w-5xl w-[94vw] px-5 py-3 rounded-2xl bg-slate-950/60 border border-amber-300/30 shadow-[0_0_30px_rgba(255,215,0,0.3)] backdrop-blur-xl flex items-center justify-between">
      {/* Brand Title */}
      <Link href="/" className="flex items-center space-x-2 group">
        <Sparkles className="w-5 h-5 text-amber-400 group-hover:rotate-45 transition-transform" />
        <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 tracking-wider text-lg md:text-xl">
          Angel Experience
        </span>
      </Link>

      {/* Action Buttons */}
      <div className="flex items-center space-x-3">
        {/* Quick Audio Mute Toggle */}
        <button
          onClick={() => toggleSetting("sfxEnabled")}
          className="p-2 rounded-xl bg-slate-900/80 border border-slate-700/60 text-amber-300 hover:border-amber-300 transition-colors"
          title={settings.sfxEnabled ? "Mute SFX" : "Unmute SFX"}
        >
          {settings.sfxEnabled ? (
            <Volume2 className="w-4 h-4" />
          ) : (
            <VolumeX className="w-4 h-4 text-slate-500" />
          )}
        </button>

        {/* Admin Panel Link */}
        <Link
          href="/admin"
          className="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700/60 text-amber-200 hover:border-amber-300 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
        >
          <Shield className="w-4 h-4 text-amber-400" />
          <span className="hidden sm:inline">Admin</span>
        </Link>

        {/* Settings Drawer Button */}
        <button
          onClick={toggleSettingsDrawer}
          className="p-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 hover:scale-105 transition-transform shadow-md font-bold"
          title="Open Settings"
        >
          <Sliders className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
