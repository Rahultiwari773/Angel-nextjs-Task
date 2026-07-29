import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    sounds: [
      { id: "bgm", name: "Heavenly Choir Synth", type: "music" },
      { id: "bell", name: "Celestial Chime", type: "effect" },
      { id: "sparkle", name: "Magic Dust Run", type: "effect" },
      { id: "wing", name: "Feather Wing Swoosh", type: "effect" },
      { id: "crackers", name: "Firework Burst", type: "effect" },
      { id: "portal", name: "Dimensional Energy", type: "effect" },
    ],
  });
}
