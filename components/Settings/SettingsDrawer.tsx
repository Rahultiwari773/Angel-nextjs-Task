"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAngelStore } from "../../store/useAngelStore";
import { soundEngine } from "../../lib/soundEngine";
import {
  Volume2,
  VolumeX,
  Sparkles,
  Music,
  Zap,
  Sun,
  Moon,
  X,
  Sliders,
  Flame,
} from "lucide-react";

export const SettingsDrawer: React.FC = () => {
  const {
    settings,
    isSettingsOpen,
    toggleSettingsDrawer,
    toggleSetting,
    setVolume,
    setAnimationSpeed,
    setThemeMode,
  } = useAngelStore();

  const handleBgmToggle = () => {
    toggleSetting("bgmEnabled");
    if (!settings.bgmEnabled) {
      soundEngine.startBgm(settings.volume, true);
    } else {
      soundEngine.stopBgm();
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    soundEngine.updateBgmVolume(val, settings.bgmEnabled);
  };

  return (
    <AnimatePresence>
      {isSettingsOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSettingsDrawer}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 z-50 w-full max-w-md h-full p-6 bg-slate-950/90 border-l border-amber-300/40 shadow-[0_0_60px_rgba(255,215,0,0.5)] backdrop-blur-2xl text-slate-100 flex flex-col justify-between overflow-y-auto"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center space-x-2 text-amber-300 font-bold text-xl">
                  <Sliders className="w-5 h-5" />
                  <span>Celestial Settings</span>
                </div>
                <button
                  onClick={toggleSettingsDrawer}
                  className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Toggles Group */}
              <div className="mt-6 space-y-5">
                {/* BGM Toggle */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center space-x-3">
                    <Music className="w-5 h-5 text-amber-400" />
                    <div>
                      <p className="font-semibold text-sm">Background Music</p>
                      <p className="text-xs text-slate-400">Heavenly choir ambient audio</p>
                    </div>
                  </div>
                  <button
                    onClick={handleBgmToggle}
                    className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                      settings.bgmEnabled ? "bg-amber-400" : "bg-slate-700"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                        settings.bgmEnabled ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                {/* SFX Toggle */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center space-x-3">
                    {settings.sfxEnabled ? (
                      <Volume2 className="w-5 h-5 text-amber-400" />
                    ) : (
                      <VolumeX className="w-5 h-5 text-slate-500" />
                    )}
                    <div>
                      <p className="font-semibold text-sm">Sound Effects</p>
                      <p className="text-xs text-slate-400">Bell, wing flap, rose swoosh</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleSetting("sfxEnabled")}
                    className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                      settings.sfxEnabled ? "bg-amber-400" : "bg-slate-700"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                        settings.sfxEnabled ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                {/* Fireworks / Crackers Toggle */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center space-x-3">
                    <Flame className="w-5 h-5 text-amber-400" />
                    <div>
                      <p className="font-semibold text-sm">Fireworks & Crackers</p>
                      <p className="text-xs text-slate-400">Particle explosion effects</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleSetting("crackersEnabled")}
                    className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                      settings.crackersEnabled ? "bg-amber-400" : "bg-slate-700"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                        settings.crackersEnabled ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                {/* Stars Toggle */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center space-x-3">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <div>
                      <p className="font-semibold text-sm">Twinkling Stars</p>
                      <p className="text-xs text-slate-400">3D celestial starfield</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleSetting("starsEnabled")}
                    className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                      settings.starsEnabled ? "bg-amber-400" : "bg-slate-700"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                        settings.starsEnabled ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                {/* Golden Particles Toggle */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center space-x-3">
                    <Zap className="w-5 h-5 text-amber-400" />
                    <div>
                      <p className="font-semibold text-sm">Golden Particles</p>
                      <p className="text-xs text-slate-400">Floating sparkle streams</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleSetting("particlesEnabled")}
                    className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                      settings.particlesEnabled ? "bg-amber-400" : "bg-slate-700"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                        settings.particlesEnabled ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                {/* Master Volume Slider */}
                <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">Master Volume</span>
                    <span className="text-xs text-amber-400 font-mono">
                      {Math.round(settings.volume * 100)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={settings.volume}
                    onChange={handleVolumeChange}
                    className="w-full accent-amber-400 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Animation Speed Selector */}
                <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <span className="text-sm font-semibold">Animation Speed</span>
                  <div className="flex items-center space-x-2 pt-1">
                    {[0.5, 1.0, 1.5, 2.0].map((speed) => (
                      <button
                        key={speed}
                        onClick={() => setAnimationSpeed(speed)}
                        className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          settings.animationSpeed === speed
                            ? "bg-amber-400 text-slate-950 shadow-md"
                            : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                        }`}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>
                </div>

                {/* Light / Dark Mode Toggle */}
                <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                  <span className="text-sm font-semibold">Heavenly Theme</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setThemeMode("dark")}
                      className={`p-2 rounded-xl text-xs flex items-center space-x-1 ${
                        settings.themeMode === "dark"
                          ? "bg-amber-400 text-slate-950 font-bold"
                          : "bg-slate-800 text-slate-300"
                      }`}
                    >
                      <Moon className="w-4 h-4" />
                      <span>Night</span>
                    </button>
                    <button
                      onClick={() => setThemeMode("light")}
                      className={`p-2 rounded-xl text-xs flex items-center space-x-1 ${
                        settings.themeMode === "light"
                          ? "bg-amber-400 text-slate-950 font-bold"
                          : "bg-slate-800 text-slate-300"
                      }`}
                    >
                      <Sun className="w-4 h-4" />
                      <span>Day</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 text-center">
              <p className="text-xs text-slate-500">Angel Entry Experience v1.0 • Enterprise Edition</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
