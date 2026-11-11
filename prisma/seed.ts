/**
 * Copies the notices from data/<college>/notices.json into the database.
 * Run with: npm run db:seed   (skips notices that already exist with the same date and title)
 */
import "dotenv/config";
import { getDb } from "../lib/db";
import { getJsonNotices } from "../lib/notices";

async function main() {
  const college = process.env.COLLEGE ?? "mgdcon";
  const db = getDb();
  let added = 0;

  for (const n of getJsonNotices(college)) {
    const date = new Date(n.date);
    const exists = await db.notice.findFirst({ where: { college, date, title: n.title } });
    if (exists) continue;
    await db.notice.create({
      data: { college, date, title: n.title, titleMr: n.titleMr ?? "", link: n.link ?? "" },
    });
    added++;
  }

  console.log(`Seeded ${added} notice(s) for "${college}".`);
  await db.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
