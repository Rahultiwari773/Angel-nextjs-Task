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
import { EntryStyleModal } from "../components/AngelController/EntryStyleModal";

export default function Home() {
  return (
    <main className="relative min-h-screen sm:h-screen sm:h-[100dvh] w-full overflow-y-auto sm:overflow-hidden flex flex-col justify-between items-center select-none">
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

      {/* Central Interactive Content Area (Fits 100% Single Screen Viewport) */}
      <div className="relative z-20 flex-1 w-full max-w-5xl mx-auto flex flex-col items-center justify-center pt-12 sm:pt-14 pb-20 sm:pb-24 px-2 overflow-visible my-auto">
        {/* Entry Sequence & Angel Visual */}
        <EntrySequenceManager />

        {/* Center Call Angel Button & Active Style Badge */}
        <div className="mt-1 sm:mt-1.5 w-full flex justify-center shrink-0">
          <CallAngelButton />
        </div>
      </div>

      {/* Entry Style Selector Modal Dialog */}
      <EntryStyleModal />

      {/* Bottom Fixed Rose Bar */}
      <RoseBar />

      {/* Slide-out Settings Control Drawer */}
      <SettingsDrawer />
    </main>
  );
}
