"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAngelStore } from "../../store/useAngelStore";
import { soundEngine } from "../../lib/soundEngine";
import {
  Shield,
  Activity,
  Music,
  Sparkles,
  Flame,
  ArrowLeft,
  Terminal,
  Settings,
  Heart,
  CheckCircle2,
} from "lucide-react";

export default function AdminPage() {
  const { logs, settings, toggleSetting, setVolume, triggerFireworksBurst } = useAngelStore();
  const [activeTab, setActiveTab] = useState<"dashboard" | "angels" | "sounds" | "logs">("dashboard");

  const handleTestSound = (type: string) => {
    switch (type) {
      case "bell":
        soundEngine.playBell(settings.volume, true);
        break;
      case "sparkle":
        soundEngine.playMagicSparkle(settings.volume, true);
        break;
      case "wing":
        soundEngine.playWingFlap(settings.volume, true);
        break;
      case "crackers":
        soundEngine.playCrackersPop(settings.volume, true);
        break;
      case "portal":
        soundEngine.playPortalSound(settings.volume, true);
        break;
      case "whisper":
        soundEngine.playAngelWhisper(settings.volume, true);
        break;
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 p-4 md:p-8 flex flex-col items-center">
      <div className="max-w-6xl w-full">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <Link
              href="/"
              className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-400 text-amber-300 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center space-x-2">
                <Shield className="w-6 h-6 text-amber-400" />
                <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-400">
                  Angel Admin Dashboard
                </h1>
              </div>
              <p className="text-xs text-slate-400">
                System telemetry, preset controllers, and real-time event logs
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center space-x-2 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
            {(["dashboard", "angels", "sounds", "logs"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                  activeTab === tab
                    ? "bg-amber-400 text-slate-950 shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab 1: Dashboard Overview */}
        {activeTab === "dashboard" && (
          <div className="mt-8 space-y-6">
            {/* Stat Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400 uppercase font-semibold">Active Entry Sequences</p>
                  <h3 className="text-2xl font-extrabold text-amber-300 mt-1">4 Types</h3>
                </div>
                <Sparkles className="w-8 h-8 text-amber-400 opacity-80" />
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400 uppercase font-semibold">Roses Catalog</p>
                  <h3 className="text-2xl font-extrabold text-rose-400 mt-1">10 Varieties</h3>
                </div>
                <Heart className="w-8 h-8 text-rose-400 opacity-80" />
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400 uppercase font-semibold">Sound Synthesizer</p>
                  <h3 className="text-2xl font-extrabold text-emerald-400 mt-1">Active</h3>
                </div>
                <Music className="w-8 h-8 text-emerald-400 opacity-80" />
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400 uppercase font-semibold">Logged Actions</p>
                  <h3 className="text-2xl font-extrabold text-cyan-400 mt-1">{logs.length} Events</h3>
                </div>
                <Activity className="w-8 h-8 text-cyan-400 opacity-80" />
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 space-y-4">
              <h3 className="text-lg font-bold text-amber-200 flex items-center space-x-2">
                <Flame className="w-5 h-5 text-amber-400" />
                <span>Live Test Controllers</span>
              </h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => triggerFireworksBurst()}
                  className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:scale-105 transition-transform"
                >
                  Trigger Firework Burst 🎆
                </button>
                <button
                  onClick={() => handleTestSound("bell")}
                  className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-amber-200 font-semibold text-xs hover:border-amber-300"
                >
                  Test Bell Chime 🔔
                </button>
                <button
                  onClick={() => handleTestSound("portal")}
                  className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-purple-300 font-semibold text-xs hover:border-purple-400"
                >
                  Test Portal Energy 🌀
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Angels Entry Types */}
        {activeTab === "angels" && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { id: 1, name: "Heavenly Descent", desc: "Descends from sky with white wings and golden ray particles" },
              { id: 2, name: "Ethereal Portal", desc: "Purple dimensional portal opens, angel steps forth with aura" },
              { id: 3, name: "Orbital Flight", desc: "Swoops in a full circle leaving particle ribbon trails before landing" },
              { id: 4, name: "Constellation Genesis", desc: "Stars converge into a golden supernova flash with camera shake" },
            ].map((entry) => (
              <div
                key={entry.id}
                className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg text-amber-300">
                    Type {entry.id}: {entry.name}
                  </h3>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
                <p className="text-xs text-slate-400">{entry.desc}</p>
                <div className="pt-2 flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span>Status: Operational</span>
                  <span>FPS: 60 Target</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Sound Synthesizer Testing */}
        {activeTab === "sounds" && (
          <div className="mt-8 p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
            <h3 className="text-lg font-bold text-amber-200">Web Audio Synthesizer Testing Suite</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { name: "Heavenly Bell", key: "bell" },
                { name: "Magic Sparkle", key: "sparkle" },
                { name: "Wing Flap", key: "wing" },
                { name: "Crackers Pop", key: "crackers" },
                { name: "Portal Hum", key: "portal" },
                { name: "Angel Whisper", key: "whisper" },
              ].map((s) => (
                <button
                  key={s.key}
                  onClick={() => handleTestSound(s.key)}
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-400 text-left transition-all"
                >
                  <p className="font-bold text-sm text-slate-200">{s.name}</p>
                  <p className="text-[10px] text-amber-400 font-mono mt-1">Play Audio Node 🔊</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Live Activity Logs */}
        {activeTab === "logs" && (
          <div className="mt-8 p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex items-center space-x-2 text-amber-300 font-bold text-sm">
              <Terminal className="w-4 h-4" />
              <span>Real-Time Audit Trail</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl font-mono text-xs max-h-96 overflow-y-auto space-y-2 border border-slate-900">
              {logs.map((log) => (
                <div key={log.id} className="flex items-start space-x-3 text-slate-300 border-b border-slate-900/60 pb-1.5">
                  <span className="text-amber-400/80">{log.timestamp}</span>
                  <span className="text-emerald-400 font-bold">[{log.type.toUpperCase()}]</span>
                  <span className="font-semibold text-slate-100">{log.action}:</span>
                  <span className="text-slate-400">{log.details}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
