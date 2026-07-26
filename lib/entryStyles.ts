import { EntryStyleInfo, EntryType } from "../types/angel";

export const ALL_ENTRY_STYLES: EntryStyleInfo[] = [
  {
    type: 1,
    name: "Heavenly Light Descent",
    shortName: "Heavenly Light",
    icon: "✨",
    description: "Graceful vertical descent inside a glowing pillar of divine light",
    greeting: "I have descended from the heavens for you! ✨",
    themeColor: "from-amber-300 via-yellow-400 to-amber-500",
  },
  {
    type: 2,
    name: "Mystic Portal Vortex",
    shortName: "Ethereal Portal",
    icon: "🌀",
    description: "Emerging through a cosmic purple and gold swirling void portal",
    greeting: "Stepping through the portal to your heart! 💖",
    themeColor: "from-purple-500 via-fuchsia-400 to-amber-300",
  },
  {
    type: 3,
    name: "Celestial Orbital Flight",
    shortName: "Orbital Flight",
    icon: "💫",
    description: "Sweeping figure-8 flight with glittering golden ribbon trails",
    greeting: "Orbital celestial grace, just for you! 🌹",
    themeColor: "from-cyan-400 via-sky-300 to-amber-300",
  },
  {
    type: 4,
    name: "Starlight Supernova Genesis",
    shortName: "Supernova Genesis",
    icon: "⭐",
    description: "Converging starlight supernova shockwave revealing angel spirit",
    greeting: "Born from the starlight of your love! ⭐",
    themeColor: "from-yellow-200 via-amber-400 to-yellow-500",
  },
  {
    type: 5,
    name: "Golden Phoenix Rise",
    shortName: "Phoenix Rise",
    icon: "🔥",
    description: "Rising upward with divine golden flame wings & sacred warmth",
    greeting: "Rising like a golden phoenix to bring you magic! 🔥",
    themeColor: "from-amber-500 via-orange-400 to-yellow-300",
  },
  {
    type: 6,
    name: "Diamond Butterfly Tempest",
    shortName: "Butterfly Tempest",
    icon: "🦋",
    description: "Spiral swarm of radiant crystal butterflies bursting into starlight",
    greeting: "Fluttering in a wave of diamond butterflies for you! 🦋",
    themeColor: "from-pink-400 via-fuchsia-300 to-cyan-300",
  },
];

export function getEntryStyleInfo(type: EntryType): EntryStyleInfo {
  return ALL_ENTRY_STYLES.find((s) => s.type === type) || ALL_ENTRY_STYLES[0];
}
