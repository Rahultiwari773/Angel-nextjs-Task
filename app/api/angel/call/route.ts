import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const entryType = body.entryType || Math.floor(Math.random() * 4) + 1;

    const entryNames: Record<number, string> = {
      1: "Heavenly Descent",
      2: "Ethereal Portal",
      3: "Orbital Flight",
      4: "Constellation Genesis",
    };

    return NextResponse.json({
      success: true,
      angelType: entryType,
      entryName: entryNames[entryType] || "Heavenly Descent",
      music: "heavenly_choir_synth.mp3",
      animation: `entry${entryType}`,
      particles: true,
      crackers: true,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid Request" }, { status: 400 });
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
    ],
  });
}
