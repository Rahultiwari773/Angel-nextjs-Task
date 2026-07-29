import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    logs: [
      {
        id: "log-1",
        timestamp: new Date().toLocaleTimeString(),
        action: "System Active",
        details: "Celestial API server running normally",
        type: "info",
      },
    ],
  });
}
