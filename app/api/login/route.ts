import { NextRequest, NextResponse } from "next/server";

const PASSWORD = process.env.DASHBOARD_PASSWORD || "1234";

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  if (password !== PASSWORD) {
    return NextResponse.json({ error: "wrong" }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set("motus_auth", PASSWORD, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  return res;
}
