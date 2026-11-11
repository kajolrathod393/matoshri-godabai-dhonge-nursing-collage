/**
 * Checks the database connection and prints the real error if it fails.
 * Run with: npm run db:check
 */
import "dotenv/config";
import { createConnection } from "mariadb";
import { connectionOptions } from "../lib/db";

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("✗ DATABASE_URL is not set. Copy .env.example to .env and fill it in.");
    process.exit(1);
  }

  const opts = connectionOptions(url);
  console.log(`Connecting to ${opts.host}:${opts.port} as ${opts.user}`);
  console.log(`Database: ${opts.database || "(none)"}  ·  Secure (TLS): ${opts.ssl ? "yes" : "no"}`);

  try {
    const conn = await createConnection(opts);
    const [row] = await conn.query("SELECT VERSION() AS version, DATABASE() AS db");
    console.log(`✓ Connected. Server version: ${row.version}. Current database: ${row.db}`);
    const tables = await conn.query("SHOW TABLES");
    console.log(`  Tables: ${tables.map((t: Record<string, string>) => Object.values(t)[0]).join(", ") || "(none yet — run npm run db:deploy)"}`);
    await conn.end();
  } catch (err) {
    const e = err as { code?: string; message?: string };
    console.error(`✗ Could not connect: ${e.code ?? ""} ${e.message ?? err}`);
    if (e.message?.includes("Unknown database")) {
      console.error(`  → Create the database first. In TiDB SQL Editor run: CREATE DATABASE ${opts.database};`);
    } else if (e.message?.includes("Access denied")) {
      console.error("  → Username or password in DATABASE_URL is wrong.");
    } else if (e.message?.includes("insecure transport") || e.message?.includes("SSL")) {
      console.error("  → Add ?sslaccept=strict at the end of DATABASE_URL.");
    } else if (e.code === "ER_CONNECTION_TIMEOUT" || e.code === "ETIMEDOUT" || e.code === "ENOTFOUND") {
      console.error("  → Check the HOST and PORT (4000 for TiDB), and that your internet / firewall allows port 4000.");
    }
    process.exit(1);
  }
}

main();
