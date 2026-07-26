"use client";

import React from "react";
import { HeavenLoading } from "../components/Loading/HeavenLoading";
import { Header } from "../components/Header/Header";
import { HeavenBackground } from "../components/Background/HeavenBackground";
import { StarField } from "../components/Stars/StarField";
import { GoldenParticles } from "../components/Particles/GoldenParticles";
import { FireworksCanvas } from "../components/Crackers/FireworksCanvas";
import { HeartParticles } from "../components/Particles/HeartParticles";
import { EntrySequenceManager } from "../components/AngelEntry/EntrySequenceManager";
import { CallAngelButton } from "../components/AngelController/CallAngelButton";
import { RoseBar } from "../components/Rose/RoseBar";
import { SettingsDrawer } from "../components/Settings/SettingsDrawer";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden flex flex-col justify-between items-center py-6">
      {/* Loading Screen */}
      <HeavenLoading />

      {/* Header Bar */}
      <Header />

      {/* Background Visual Layers */}
      <HeavenBackground />
      <StarField />
      <GoldenParticles />
      <FireworksCanvas />
      <HeartParticles />

      {/* Central Interactive Content Area */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen w-full pt-20 pb-36 px-4">
        {/* Entry Sequence & Angel Visual */}
        <EntrySequenceManager />

        {/* Center Call Angel Button */}
        <div className="mt-4 md:mt-6">
          <CallAngelButton />
        </div>
      </div>

      {/* Bottom Fixed Rose Bar */}
      <RoseBar />

      {/* Slide-out Settings Control Drawer */}
      <SettingsDrawer />
    </main>
  );
}
