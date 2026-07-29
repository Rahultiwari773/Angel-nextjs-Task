import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    return NextResponse.json(
      {
        success: true,
        message: "Rose sent to Angel successfully",
        data: body,
        timestamp: Date.now(),
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    return NextResponse.json({ success: true, timestamp: Date.now() }, { status: 200 });
  }
}
