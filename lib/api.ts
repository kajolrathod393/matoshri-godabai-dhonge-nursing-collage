import { NextResponse } from "next/server";
import type { ZodError } from "zod";
import { isAdmin } from "./auth";
import { isDbConfigured } from "./db";

/** Small helpers shared by the route handlers in app/api. */

export function jsonError(status: number, error: string, details?: unknown) {
  return NextResponse.json({ ok: false, error, details }, { status });
}

export function validationError(err: ZodError) {
  return jsonError(400, "Invalid input", err.flatten().fieldErrors);
}

/** Returns a 503 response if no database is configured, otherwise null. */
export function requireDb() {
  return isDbConfigured() ? null : jsonError(503, "Database is not configured");
}

/** Returns a 401 response if the request is not from a logged-in admin, otherwise null. */
export async function requireAdmin() {
  return (await isAdmin()) ? null : jsonError(401, "Not logged in");
}

/** Wraps a route handler so database errors return a clean 503 instead of a crash page. */
export function withDbErrors<A extends unknown[]>(handler: (...args: A) => Promise<Response>) {
  return async (...args: A) => {
    try {
      return await handler(...args);
    } catch (err) {
      console.error("API error:", err);
      return jsonError(503, "Database error. Please try again later.");
    }
  };
}

/** Parses a numeric route id ("12" → 12). Returns null for anything else. */
export function parseId(id: string) {
  return /^\d{1,10}$/.test(id) ? Number(id) : null;
}

/** Best-effort in-memory rate limit (per server instance) for public forms. */
const hits = new Map<string, number[]>();
export function rateLimited(key: string, max = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > max;
}

export function clientIp(req: Request) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}
