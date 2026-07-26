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
      // Auto-cycle through the 6 entry ways on each button press!
      nextEntry = ((activeEntryType % 6) + 1) as EntryType;
    }

    set({
      stage: "calling",
      activeEntryType: nextEntry,
      fireworksTrigger: get().fireworksTrigger + 1,
    });

    get().addLog("Call Angel Triggered", `Initiating entry sequence Style ${nextEntry}`, "entry");

    // Call backend API in background
    try {
      await fetch("/api/angel/call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entryType: nextEntry }),
      });
    } catch {
      // Graceful fallback
    }

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

    // Control point for Bezier curve trajectory
    const controlX = (startX + angelPos.x) / 2 + (Math.random() * 200 - 100);
    const controlY = Math.min(startX, angelPos.y) - 150 - Math.random() * 100;

    const newRose: ActiveFlyingRose = {
      id,
      color,
      startX,
      startY,
      targetX: angelPos.x,
      targetY: angelPos.y,
      controlX,
      controlY,
      progress: 0,
      speed: 0.015 * get().settings.animationSpeed,
      item,
    };

    set((state) => ({
      flyingRoses: [...state.flyingRoses, newRose],
    }));

    // If item was passed, also apply it directly to Angel so it appears on Angel immediately/upon selection
    if (item) {
      get().applyRoseToAngel(item);
    }

    get().addLog("Rose Launched", `Color: ${color}`, "rose");

    // Async server notification
    fetch("/api/rose/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ color, startX, startY }),
    }).catch(() => {});
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
