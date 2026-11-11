import "dotenv/config";
import { defineConfig } from "prisma/config";

const url = process.env.DATABASE_URL;

// `prisma generate` (run on npm install) does not need a database, so it may use a placeholder.
// Every other command (migrate, seed, studio) needs the real DATABASE_URL from .env.
const isGenerate = process.argv.includes("generate");
if (!url && !isGenerate) {
  throw new Error(
    "DATABASE_URL is not set. Copy .env.example to .env and set " +
      "DATABASE_URL=mysql://USER:PASSWORD@localhost:3306/mgdcon",
  );
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: url || "mysql://user:password@localhost:3306/placeholder",
  },
});
