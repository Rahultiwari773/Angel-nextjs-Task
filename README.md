# Angel Entry Experience ❤️✨

> A production-ready, enterprise-grade romantic interactive web application built with **Next.js 15 App Router**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, **GSAP**, **Three.js**, **Web Audio API Synthesizer**, **Zustand**, and **Node.js Express / MongoDB API**.

---

## 🌟 Overview & Aesthetic Design

The **Angel Entry Experience** transforms the screen into a fantasy heaven-themed realm complete with:
- **Celestial Background**: Glowing moon, ethereal moving clouds, aurora borealis rays, light beam shaders, and a 3D twinkling depth starfield.
- **Dynamic 3D/Canvas Angel**: Vector & particle celestial Angel with animated wing flaps, glowing halo, eye blinking, smiling expressions, dress physics, and soft ground reflection.
- **4 Cinematic Random Entry Sequences**:
  1. **Heavenly Descent**: Descends from the sky with wing flap sparkles, light ray burst, and cloud dispersion.
  2. **Ethereal Portal**: Swirling purple dimensional magic portal opens as the Angel steps forth with golden aura & dust.
  3. **Orbital Flight**: Swoops around the screen in an orbital arc with a glittering particle ribbon trail before landing.
  4. **Constellation Genesis**: Constellation stars converge into a golden supernova flash with subtle camera shockwave.
- **Interactive Rose Launch System**:
  - Bottom glassmorphic bar presenting 10 distinct rose varieties (Red, Pink, White, Golden, Blue, Purple, Emerald, Rose Gold, Cosmic Violet, Starlight White).
  - Bezier curved flight trajectories with particle trails towards the Angel position.
  - Heart explosion particle burst, Angel smile & wave reactions, and dialogue whispers.
  - Supports single, double, and burst rose launches.
- **Fireworks Engine & Web Audio Synthesizer**:
  - Canvas 2D/3D particle gravity physics fireworks with multi-color bursts (Gold, Blue, Pink, Purple) and synchronized audio pops.
  - Integrated Web Audio synthesizer for choir ambient chords, bell chimes, wing swooshes, and spell sparkles with zero missing file dependencies.
- **Control & Admin Suite**:
  - Real-time Settings Panel (BGM, SFX, Crackers, Stars, Particles, Volume, Animation Speed, Light/Dark Mode).
  - Admin Dashboard (`/admin`) for telemetry metrics, preset testing, live audit logs, and REST API controllers.

---

## 🏗️ Folder Structure

```
project/
├── app/
│   ├── admin/             # Admin Dashboard Page
│   ├── api/               # Next.js API Routes (Angel, Rose, Settings, Logs)
│   ├── globals.css        # Tailwind & Global Styles
│   ├── layout.tsx         # Root Layout with SEO, OpenGraph, JSON-LD
│   └── page.tsx           # Main Landing Page
├── components/
│   ├── Angel/             # Angel Canvas & Avatar Vector Components
│   ├── AngelEntry/        # Entry Sequence Manager (4 Cinematic Types)
│   ├── AngelController/   # Call My Angel ❤️ Button
│   ├── Background/        # Heaven Background, Moon, Cloud & Ray Shaders
│   ├── Crackers/          # Fireworks Physics Canvas Engine
│   ├── Header/            # Navigation Header & Quick Controls
│   ├── Loading/           # Heaven Progress Loading Screen
│   ├── Particles/         # Golden Sparkles & Heart Particle Explosions
│   ├── Rose/              # Fixed Rose Bar & Bezier Flying Rose
│   ├── Settings/          # Glassmorphic Settings Control Drawer
│   └── Stars/             # 3D Depth Twinkling StarField Canvas
├── backend/
│   ├── config/            # Database Connection
│   ├── controllers/       # Express Controllers
│   ├── middleware/        # Security & Helmet Configuration
│   ├── models/            # Mongoose Schemas (Angel, RoseHistory, Setting, Log, User)
│   ├── routes/            # REST API Routes
│   └── server.js          # Express Standalone Backend Server
├── lib/
│   └── soundEngine.ts     # Web Audio API Synthesizer & Howler Manager
├── store/
│   └── useAngelStore.ts   # Zustand State Management & Logging
├── types/
│   └── angel.ts           # TypeScript Type Definitions
├── Dockerfile             # Multi-stage Next.js Docker Setup
├── docker-compose.yml     # App + Backend + MongoDB Orchestration
├── next.config.js         # Next.js Configuration
├── tailwind.config.ts     # Custom Design Tokens & Keyframe Animations
└── package.json           # Dependencies & NPM Scripts
```

---

## ⚡ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Next.js Frontend
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Run Standalone Backend Server (Optional)
```bash
npm run server
```
Runs Express REST API on `http://localhost:5000`.

### 4. Run Docker Container
```bash
docker-compose up --build
```

---

## 📡 REST API Documentation

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/angel/call` | Triggers random or specified Angel entry sequence |
| `GET` | `/api/angel/list` | Returns list of available Angel presets |
| `GET` | `/api/angel/random` | Returns a random entry type ID (1-4) |
| `POST` | `/api/rose/send` | Registers a rose launch event with start coordinates |
| `GET` | `/api/settings` | Returns active application settings |
| `PUT` | `/api/settings` | Updates global volume, animation speed, or feature toggles |
| `GET` | `/api/logs` | Fetches real-time system audit logs |

---

## 🔒 Security & Performance

- **Helmet Security Headers**: Protection against XSS, clickjacking, and mime sniffing.
- **Express Rate Limiting**: Max 200 requests per 15-minute window per IP.
- **60 FPS Hardware Acceleration**: Canvas particle rendering optimized with `requestAnimationFrame`.
- **Responsive Layout**: Designed for Mobile, Tablet, and Desktop displays.

---

## 📄 License
MIT License - Created for Angel Entry Experience Enterprise Web App.
