import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          300: "#FDE68A",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
        },
        angel: {
          white: "#FFFDF7",
          gold: "#FFD700",
          pink: "#FFB6C1",
          purple: "#9D4EDD",
          sky: "#0F172A",
          deepSky: "#030712",
        },
      },
      animation: {
        "float-slow": "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
        "spin-slow": "spin 20s linear infinite",
        "wing-flap": "wingFlap 2.5s ease-in-out infinite",
        "portal-spin": "portalSpin 12s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-15px) rotate(1deg)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.8", filter: "drop-shadow(0 0 15px rgba(255,215,0,0.6))" },
          "50%": { opacity: "1", filter: "drop-shadow(0 0 35px rgba(255,215,0,0.95))" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        wingFlap: {
          "0%, 100%": { transform: "rotateY(0deg) scale(1)" },
          "50%": { transform: "rotateY(25deg) scale(1.05)" },
        },
        portalSpin: {
          "0%": { transform: "rotate(0deg) scale(1)" },
          "50%": { transform: "rotate(180deg) scale(1.08)" },
          "100%": { transform: "rotate(360deg) scale(1)" },
        },
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #FFF5C0 0%, #FFD700 50%, #B8860B 100%)",
        "angel-gradient": "radial-gradient(circle at center, rgba(255,215,0,0.2) 0%, rgba(15,23,42,0.95) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
