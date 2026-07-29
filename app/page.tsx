"use client";

import React from "react";
import { HeavenLoading } from "../components/Loading/HeavenLoading";
import { Header } from "../components/Header/Header";
import { HeavenBackground } from "../components/Background/HeavenBackground";
import { StarField } from "../components/Stars/StarField";
import { GoldenParticles } from "../components/Particles/GoldenParticles";
import { FireworksCanvas } from "../components/Crackers/FireworksCanvas";
import { HeartParticles } from "../components/Particles/HeartParticles";
import { FeatherParticles } from "../components/Particles/FeatherParticles";
import { EntrySequenceManager } from "../components/AngelEntry/EntrySequenceManager";
import { CallAngelButton } from "../components/AngelController/CallAngelButton";
import { RoseBar } from "../components/Rose/RoseBar";
import { SettingsDrawer } from "../components/Settings/SettingsDrawer";
import { EntryStyleModal } from "../components/AngelController/EntryStyleModal";

export default function Home() {
  return (
    <main className="relative min-h-screen h-full w-full overflow-y-auto flex flex-col justify-between items-center select-none scrollbar-thin scrollbar-thumb-amber-400/60 scrollbar-track-slate-950">
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
      <FeatherParticles />

      {/* Central Interactive Content Area (Full Celestial Angel Body & Control Action Bar) */}
      <div className="relative z-20 flex-1 w-full max-w-4xl mx-auto flex flex-col items-center justify-between pt-14 xs:pt-16 sm:pt-20 pb-28 xs:pb-32 sm:pb-36 px-3 my-auto min-h-[calc(100dvh-120px)]">
        {/* Entry Sequence & Full Angel Body Visual */}
        <div className="flex-1 flex flex-col items-center justify-center w-full my-auto">
          <EntrySequenceManager />
        </div>

        {/* Control Action Bar (Cleanly aligned below Angel without overlapping) */}
        <div className="w-full flex justify-center shrink-0 pt-1 sm:pt-3">
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
