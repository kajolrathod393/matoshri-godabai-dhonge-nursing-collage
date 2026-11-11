import { NextResponse } from "next/server";
import { z } from "zod";
import { SESSION_COOKIE, checkPassword, createSessionToken, isAuthConfigured } from "@/lib/auth";
import { clientIp, jsonError, rateLimited } from "@/lib/api";

const body = z.object({ password: z.string().min(1).max(200) });

/** POST /api/admin/login — sets the admin session cookie. */
export async function POST(req: Request) {
  if (!isAuthConfigured()) return jsonError(503, "Admin login is not configured");
  if (rateLimited(`login:${clientIp(req)}`, 10, 15 * 60 * 1000)) {
    return jsonError(429, "Too many attempts. Try again later.");
  }

  const parsed = body.safeParse(await req.json().catch(() => null));
  if (!parsed.success || !checkPassword(parsed.data.password)) {
    return jsonError(401, "Wrong password");
  }

  const { token, expires } = createSessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires,
  });
  return res;
}
