import { NextResponse } from "next/server";

export async function GET() {
  const randomType = Math.floor(Math.random() * 6) + 1;
  return NextResponse.json({
    success: true,
    angelType: randomType,
  });
}
