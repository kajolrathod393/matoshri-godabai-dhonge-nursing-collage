import { NextResponse } from "next/server";
import { getDb, isDbConfigured } from "@/lib/db";
import { isAuthConfigured } from "@/lib/auth";

export const dynamic = "force-dynamic";

/** GET /api/health — quick check that the server, database and admin login are set up. */
export async function GET() {
  let database: "not-configured" | "connected" | "error" = "not-configured";
  if (isDbConfigured()) {
    try {
      await getDb().$queryRaw`SELECT 1`;
      database = "connected";
    } catch (err) {
      console.error("Health check: database error", err);
      database = "error";
    }
  }
  return NextResponse.json({ ok: true, database, adminLogin: isAuthConfigured() });
}
