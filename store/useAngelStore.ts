import { create } from "zustand";
import {
  AngelStage,
  EntryType,
  ActiveFlyingRose,
  AppSettings,
  SystemLog,
  RoseItem,
} from "../types/angel";

interface AngelStoreState {
  stage: AngelStage;
  activeEntryType: EntryType;
  selectedEntryType: EntryType | "random";
  angelPos: { x: number; y: number };
  flyingRoses: ActiveFlyingRose[];
  appliedRoses: RoseItem[];
  settings: AppSettings;
  logs: SystemLog[];
  isSettingsOpen: boolean;
  isStyleModalOpen: boolean;
  fireworksTrigger: number; // Increment to burst fireworks
  reactionMessage: string | null;

  // Actions
  setStage: (stage: AngelStage) => void;
  setEntryType: (entryType: EntryType) => void;
  setSelectedEntryType: (mode: EntryType | "random") => void;
  toggleStyleModal: (open?: boolean) => void;
  setAngelPos: (pos: { x: number; y: number }) => void;
  callAngel: (overrideType?: EntryType) => Promise<EntryType>;
  launchRose: (rose: RoseItem | string, startX: number, startY: number) => void;
  applyRoseToAngel: (rose: RoseItem) => void;
  removeAppliedRose: (id: string) => void;
  clearAppliedRoses: () => void;
  updateRoseProgress: (id: string, delta: number) => void;
  removeRose: (id: string) => void;
  toggleSetting: (key: keyof AppSettings) => void;
  setVolume: (val: number) => void;
  setAnimationSpeed: (speed: number) => void;
  setThemeMode: (mode: "dark" | "light") => void;
  setAvatarMode: (mode: "real" | "vector") => void;
  toggleSettingsDrawer: () => void;
  triggerFireworksBurst: () => void;
  addLog: (action: string, details: string, type?: SystemLog["type"]) => void;
  setReactionMessage: (msg: string | null) => void;
}

export const useAngelStore = create<AngelStoreState>((set, get) => ({
  stage: "present",
  activeEntryType: 1,
  selectedEntryType: "random",
  angelPos: { x: typeof window !== "undefined" ? window.innerWidth / 2 : 600, y: typeof window !== "undefined" ? window.innerHeight / 2 - 40 : 350 },
  flyingRoses: [],
  appliedRoses: [],
  settings: {
    bgmEnabled: true,
    sfxEnabled: true,
    crackersEnabled: true,
    starsEnabled: true,
    particlesEnabled: true,
    avatarMode: "real",
    volume: 0.8,
    animationSpeed: 1.0,
    themeMode: "dark",
  },
  logs: [
    {
      id: "log-1",
      timestamp: new Date().toLocaleTimeString(),
      action: "System Initialized",
      details: "Angel Entry Experience environment active with 6 entry styles",
      type: "info",
    },
  ],
  isSettingsOpen: false,
  isStyleModalOpen: false,
  fireworksTrigger: 0,
  reactionMessage: null,

  setStage: (stage) => set({ stage }),
  setEntryType: (activeEntryType) => set({ activeEntryType }),
  setSelectedEntryType: (selectedEntryType) => set({ selectedEntryType }),
  toggleStyleModal: (open) =>
    set((state) => ({
      isStyleModalOpen: open !== undefined ? open : !state.isStyleModalOpen,
    })),
  setAngelPos: (angelPos) => set({ angelPos }),

  callAngel: async (overrideType?: EntryType) => {
    let nextEntry: EntryType;
    const { selectedEntryType, activeEntryType } = get();

    if (overrideType) {
      nextEntry = overrideType;
    } else if (selectedEntryType !== "random") {
      nextEntry = selectedEntryType;
    } else {
      nextEntry = ((activeEntryType % 6) + 1) as EntryType;
    }

    // Instantly update state for 0ms UI lag
    set({
      stage: "calling",
      activeEntryType: nextEntry,
      fireworksTrigger: get().fireworksTrigger + 1,
    });

    get().addLog("Call Angel Triggered", `Initiating entry sequence Style ${nextEntry}`, "entry");

    // Non-blocking background API notification with 3s timeout
    setTimeout(() => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      fetch("/api/angel/call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entryType: nextEntry }),
        signal: controller.signal,
      })
        .catch(() => {})
        .finally(() => clearTimeout(timeoutId));
    }, 0);

    return nextEntry;
  },

  applyRoseToAngel: (roseItem: RoseItem) => {
    set({
      appliedRoses: [roseItem], // Single selection mode: replace previous rose
    });
    get().addLog("Rose Applied", `Applied ${roseItem.name} onto Angel`, "rose");
  },

  removeAppliedRose: (id: string) => {
    set((state) => ({
      appliedRoses: state.appliedRoses.filter((r) => r.id !== id),
    }));
  },

  clearAppliedRoses: () => {
    set({ appliedRoses: [] });
    get().addLog("Roses Cleared", "Cleared all applied roses from Angel", "rose");
  },

  launchRose: (roseInput: RoseItem | string, startX: number, startY: number) => {
    const { angelPos } = get();
    const id = `rose-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    
    const isObject = typeof roseInput === "object";
    const color = isObject ? roseInput.color : roseInput;
    const item = isObject ? roseInput : undefined;

    const screenWidth = typeof window !== "undefined" ? window.innerWidth : 800;
    const screenHeight = typeof window !== "undefined" ? window.innerHeight : 600;

    // Guaranteed exact middle-center of screen trajectory ("only middle of center through way")
    const midX = screenWidth / 2;
    const actualStartY = screenHeight - 80;
    const targetX = midX;
    const targetY = angelPos.y || screenHeight * 0.38;
    const controlX = midX;
    const controlY = (actualStartY + targetY) / 2;

    const newRose: ActiveFlyingRose = {
      id,
      color,
      startX: midX,
      startY: actualStartY,
      targetX,
      targetY,
      controlX,
      controlY,
      progress: 0,
      speed: 0.0045 * get().settings.animationSpeed, // Slow motion ~3.5s graceful vertical ascent
      item,
    };

    set((state) => ({
      flyingRoses: [...state.flyingRoses, newRose],
    }));

    get().addLog("Rose Launched", `Color: ${color}`, "rose");

    // Non-blocking background API fetch with 3s timeout
    setTimeout(() => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      fetch("/api/rose/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ color, startX, startY }),
        signal: controller.signal,
      })
        .catch(() => {})
        .finally(() => clearTimeout(timeoutId));
    }, 0);
  },

  updateRoseProgress: (id, delta) => {
    set((state) => {
      const updated = state.flyingRoses.map((rose) => {
        if (rose.id === id) {
          const nextProg = rose.progress + rose.speed * delta;
          return { ...rose, progress: Math.min(nextProg, 1) };
        }
        return rose;
      });
      return { flyingRoses: updated };
    });
  },

  removeRose: (id) => {
    set((state) => ({
      flyingRoses: state.flyingRoses.filter((r) => r.id !== id),
    }));
  },

  toggleSetting: (key) => {
    set((state) => {
      const updated = {
        ...state.settings,
        [key]: !state.settings[key],
      };
      return { settings: updated };
    });
    get().addLog("Setting Changed", `Toggled ${key}`, "setting");
  },

  setVolume: (volume) => {
    set((state) => ({
      settings: { ...state.settings, volume },
    }));
  },

  setAnimationSpeed: (animationSpeed) => {
    set((state) => ({
      settings: { ...state.settings, animationSpeed },
    }));
  },

  setThemeMode: (themeMode) => {
    set((state) => ({
      settings: { ...state.settings, themeMode },
    }));
  },

  setAvatarMode: (avatarMode) => {
    set((state) => ({
      settings: { ...state.settings, avatarMode },
    }));
    get().addLog("Avatar Mode Changed", `Switched to ${avatarMode} Angel visual mode`, "setting");
  },

  toggleSettingsDrawer: () => set((state) => ({ isSettingsOpen: !state.isSettingsOpen })),

  triggerFireworksBurst: () => set((state) => ({ fireworksTrigger: state.fireworksTrigger + 1 })),

  addLog: (action, details, type = "info") => {
    const newLog: SystemLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toLocaleTimeString(),
      action,
      details,
      type,
    };
    set((state) => ({
      logs: [newLog, ...state.logs.slice(0, 49)], // Keep last 50 logs
    }));
  },

  setReactionMessage: (msg) => set({ reactionMessage: msg }),
}));
