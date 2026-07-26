import { NextResponse } from "next/server";

const systemLogs = [
  { id: "1", timestamp: new Date().toISOString(), action: "System Boot", details: "Angel Entry Experience initialized", type: "info" },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    logs: systemLogs,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newLog = {
      id: String(Date.now()),
      timestamp: new Date().toISOString(),
      action: body.action || "User Action",
      details: body.details || "",
      type: body.type || "info",
    };
    systemLogs.unshift(newLog);
    return NextResponse.json({ success: true, log: newLog });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create log" }, { status: 400 });
  }
}
