"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAngelStore } from "../../store/useAngelStore";
import { ALL_ENTRY_STYLES } from "../../lib/entryStyles";
import { soundEngine } from "../../lib/soundEngine";
import { Sparkles, X, Check, Shuffle } from "lucide-react";
import { EntryType } from "../../types/angel";

export const EntryStyleModal: React.FC = () => {
  const {
    isStyleModalOpen,
    toggleStyleModal,
    activeEntryType,
    selectedEntryType,
    setSelectedEntryType,
    callAngel,
    settings,
  } = useAngelStore();

  if (!isStyleModalOpen) return null;

  const handleSelectStyle = (type: EntryType | "random") => {
    setSelectedEntryType(type);
    soundEngine.playMagicSparkle(settings.volume, settings.sfxEnabled);
    if (type !== "random") {
      callAngel(type);
    }
    toggleStyleModal(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        {/* Backdrop click to close */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0"
          onClick={() => toggleStyleModal(false)}
        />

        {/* Modal Dialog Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="relative z-10 w-full max-w-xl rounded-3xl bg-slate-950/95 border-2 border-amber-400/50 shadow-[0_0_60px_rgba(255,215,0,0.4)] p-5 sm:p-6 text-slate-100 flex flex-col max-h-[85vh] overflow-hidden"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between border-b border-amber-400/20 pb-4 mb-4">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-xl bg-amber-400/20 border border-amber-300/50 text-amber-300">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300">
                  Select Angel Entry Style
                </h3>
                <p className="text-xs text-amber-200/60 font-medium">
                  Choose your favorite celestial arrival or auto-cycle on press!
                </p>
              </div>
            </div>

            <button
              onClick={() => toggleStyleModal(false)}
              className="p-2 rounded-full bg-slate-900 border border-slate-700/80 text-amber-200 hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Modal Body - 6 Styles Grid */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin scrollbar-thumb-amber-400/30">
            {/* Auto-Cycle / Random Mode Option */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => handleSelectStyle("random")}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                selectedEntryType === "random"
                  ? "bg-gradient-to-r from-amber-400/20 via-yellow-400/10 to-amber-500/20 border-amber-300 shadow-[0_0_20px_rgba(255,215,0,0.3)]"
                  : "bg-slate-900/80 border-slate-800 hover:border-amber-400/50"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-300/50 flex items-center justify-center text-xl text-amber-300">
                  <Shuffle className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-extrabold text-sm sm:text-base text-amber-200">
                      Auto-Cycle / Random Mode
                    </span>
                    {selectedEntryType === "random" && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-400 text-slate-950 font-black">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-amber-200/60 font-medium">
                    Automatically changes to the next entry way on every button press!
                  </p>
                </div>
              </div>

              {selectedEntryType === "random" && (
                <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
                  <Check className="w-4 h-4" />
                </div>
              )}
            </motion.div>

            {/* 6 Entry Styles Cards */}
            {ALL_ENTRY_STYLES.map((style) => {
              const isSelected = selectedEntryType === style.type;
              const isActiveNow = activeEntryType === style.type;

              return (
                <motion.div
                  key={style.type}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleSelectStyle(style.type)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected || isActiveNow
                      ? "bg-gradient-to-r from-amber-400/20 via-yellow-400/10 to-amber-500/20 border-amber-300 shadow-[0_0_20px_rgba(255,215,0,0.3)]"
                      : "bg-slate-900/80 border-slate-800 hover:border-amber-400/50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-950 border border-amber-300/40 flex items-center justify-center text-2xl shadow-inner">
                      {style.icon}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-extrabold text-sm sm:text-base text-amber-200">
                          {style.type}. {style.name}
                        </span>
                        {isActiveNow && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-400 text-slate-950 font-black">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-amber-200/60 font-medium">
                        {style.description}
                      </p>
                    </div>
                  </div>

                  {(isSelected || isActiveNow) && (
                    <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Modal Footer */}
          <div className="mt-4 pt-3 border-t border-amber-400/20 flex justify-end">
            <button
              onClick={() => toggleStyleModal(false)}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs sm:text-sm hover:scale-105 transition-transform shadow-md"
            >
              Done ✨
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
