import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const entryType = body.entryType || Math.floor(Math.random() * 6) + 1;

    const entryNames: Record<number, string> = {
      1: "Heavenly Light Descent",
      2: "Mystic Portal Vortex",
      3: "Celestial Orbital Flight",
      4: "Starlight Supernova Genesis",
      5: "Golden Phoenix Rise",
      6: "Diamond Butterfly Tempest",
    };

    return NextResponse.json(
      {
        success: true,
        angelType: entryType,
        entryName: entryNames[entryType] || "Heavenly Light Descent",
        music: "heavenly_choir_synth.mp3",
        animation: `entry${entryType}`,
        particles: true,
        crackers: true,
        timestamp: Date.now(),
      },
      {
        status: 200,
        headers: { "Cache-Control": "no-store, max-age=0" },
      }
    );
  } catch (error) {
    return NextResponse.json({ success: true, angelType: 1, timestamp: Date.now() }, { status: 200 });
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    angels: [
      { id: 1, name: "Celestial Seraph", entryType: 1, active: true },
      { id: 2, name: "Mystic Archangel", entryType: 2, active: true },
      { id: 3, name: "Rose Guardian", entryType: 3, active: true },
      { id: 4, name: "Starlight Spirit", entryType: 4, active: true },
      { id: 5, name: "Golden Phoenix", entryType: 5, active: true },
      { id: 6, name: "Crystal Butterfly", entryType: 6, active: true },
    ],
  });
}
