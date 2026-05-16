import { NextRequest, NextResponse } from "next/server";
import { sendTelegramResult } from "@/lib/telegram";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await sendTelegramResult(body);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
