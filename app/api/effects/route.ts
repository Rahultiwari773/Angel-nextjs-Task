import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    effects: [
      { id: "stars", name: "Twinkling 3D Starfield", status: "active" },
      { id: "particles", name: "Golden Sparkles Stream", status: "active" },
      { id: "fireworks", name: "Canvas Physics Crackers", status: "active" },
      { id: "aurora", name: "Ethereal Heavenly Rays", status: "active" },
    ],
  });
}
