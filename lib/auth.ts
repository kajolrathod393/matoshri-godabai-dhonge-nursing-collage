import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/**
 * Minimal admin login for the college office.
 * One shared password (ADMIN_PASSWORD) and an HMAC-signed, httpOnly session cookie.
 * Replace with a full user system (e.g. Auth.js) if several staff accounts are needed.
 */
export const SESSION_COOKIE = "admin_session";
const SESSION_HOURS = 12;

function secret() {
  const s = process.env.AUTH_SECRET;
  if (!s || s.length < 32) throw new Error("AUTH_SECRET must be set (at least 32 characters)");
  return s;
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

export function isAuthConfigured() {
  return !!process.env.ADMIN_PASSWORD && (process.env.AUTH_SECRET?.length ?? 0) >= 32;
}

export function checkPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  // Compare HMACs so the comparison takes the same time whatever the input length.
  return safeEqual(sign(`pw:${password}`), sign(`pw:${expected}`));
}

export function createSessionToken() {
  const expires = Date.now() + SESSION_HOURS * 60 * 60 * 1000;
  const payload = `admin.${expires}`;
  return { token: `${payload}.${sign(payload)}`, expires: new Date(expires) };
}

export function verifySessionToken(token: string | undefined) {
  if (!token || !isAuthConfigured()) return false;
  const lastDot = token.lastIndexOf(".");
  if (lastDot < 0) return false;
  const payload = token.slice(0, lastDot);
  const signature = token.slice(lastDot + 1);
  if (!safeEqual(signature, sign(payload))) return false;
  const expires = Number(payload.split(".")[1]);
  return Number.isFinite(expires) && expires > Date.now();
}

/** For server components and route handlers. */
export async function isAdmin() {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}
