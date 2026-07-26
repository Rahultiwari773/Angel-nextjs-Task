import { NextResponse } from "next/server";

let currentSettings = {
  bgmEnabled: true,
  sfxEnabled: true,
  crackersEnabled: true,
  starsEnabled: true,
  particlesEnabled: true,
  volume: 0.8,
  animationSpeed: 1.0,
  themeMode: "dark",
};

export async function GET() {
  return NextResponse.json({
    success: true,
    settings: currentSettings,
  });
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    currentSettings = { ...currentSettings, ...body };
    return NextResponse.json({
      success: true,
      message: "Settings updated",
      settings: currentSettings,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update settings" }, { status: 400 });
  }
}
