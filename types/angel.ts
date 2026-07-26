export type EntryType = 1 | 2 | 3 | 4 | 5 | 6;

export type AngelStage = 
  | "dark_intro"
  | "ready"
  | "calling"
  | "entering"
  | "present"
  | "reacting";

export interface EntryStyleInfo {
  type: EntryType;
  name: string;
  shortName: string;
  icon: string;
  description: string;
  greeting: string;
  themeColor: string;
}

export interface RoseItem {
  id: string;
  name: string;
  color: string; // CSS or Hex color
  glowColor: string;
  description: string;
  iconSymbol: string;
}

export interface ActiveFlyingRose {
  id: string;
  color: string;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  controlX: number;
  controlY: number;
  progress: number; // 0 to 1
  speed: number;
  item?: RoseItem;
}

export interface AppSettings {
  bgmEnabled: boolean;
  sfxEnabled: boolean;
  crackersEnabled: boolean;
  starsEnabled: boolean;
  particlesEnabled: boolean;
  volume: number; // 0 to 1
  animationSpeed: number; // 0.5 to 2.0
  themeMode: "dark" | "light";
}

export interface AngelCallResponse {
  success: boolean;
  angelType: EntryType;
  entryName: string;
  music: string;
  animation: string;
  particles: boolean;
  crackers: boolean;
  timestamp: string;
}

export interface SystemLog {
  id: string;
  timestamp: string;
  action: string;
  details: string;
  type: "info" | "rose" | "entry" | "setting";
}

