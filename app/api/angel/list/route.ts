import { NextResponse } from "next/server";

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
