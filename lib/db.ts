import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "./generated/prisma/client";

/**
 * Prisma client for the college database (MySQL / MariaDB).
 *
 * DATABASE_URL format: mysql://USER:PASSWORD@HOST:3306/DATABASE
 * Add "?sslaccept=strict" for cloud databases that require TLS (TiDB Cloud, Azure, AWS RDS ...).
 *
 * To use SQL Server instead: set provider = "sqlserver" in prisma/schema.prisma,
 * install @prisma/adapter-mssql and create `new PrismaMssql(...)` below.
 */

/** True when a database connection string is configured. */
export function isDbConfigured() {
  return !!process.env.DATABASE_URL;
}

/** Cloud MySQL hosts that always require an encrypted (TLS) connection. */
const TLS_HOSTS = [".tidbcloud.com", ".aivencloud.com", ".rds.amazonaws.com", ".database.azure.com"];

/** Turns DATABASE_URL into connection options for the MariaDB/MySQL driver. */
export function connectionOptions(url: string) {
  const u = new URL(url);
  const sslParam = u.searchParams.get("ssl") ?? u.searchParams.get("sslaccept") ?? u.searchParams.get("ssl-mode");
  const sslOff = !!sslParam && ["false", "0", "disabled"].includes(sslParam.toLowerCase());
  const useSsl = !sslOff && (!!sslParam || TLS_HOSTS.some((h) => u.hostname.endsWith(h)));
  return {
    host: u.hostname,
    port: Number(u.port || 3306),
    user: decodeURIComponent(u.username),
    password: decodeURIComponent(u.password),
    database: decodeURIComponent(u.pathname.replace(/^\//, "")),
    // Cloud databases can be far away (e.g. Singapore): allow time for the first TLS handshake.
    connectTimeout: 20000,
    ...(useSsl ? { ssl: { rejectUnauthorized: true, minVersion: "TLSv1.2" as const } } : {}),
  };
}

function createAdapter(url: string) {
  return new PrismaMariaDb({
    ...connectionOptions(url),
    connectionLimit: 5,
    acquireTimeout: 25000,
  });
}

// Reuse one client across hot reloads (dev) and warm serverless invocations (Vercel).
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export function getDb(): PrismaClient {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  globalForPrisma.prisma ??= new PrismaClient({ adapter: createAdapter(url) });
  return globalForPrisma.prisma;
}
