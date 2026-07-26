import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { color, startX, startY } = body;

    return NextResponse.json({
      success: true,
      message: "Rose sent to Angel successfully",
      data: {
        color,
        startX,
        startY,
        receivedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to process rose send" }, { status: 400 });
  }
}
