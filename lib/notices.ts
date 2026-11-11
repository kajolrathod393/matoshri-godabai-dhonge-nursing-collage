import mgdconNotices from "@/data/mgdcon/notices.json";
import { getDb, isDbConfigured } from "./db";

export type Notice = {
  /** Set when the notice comes from the database. */
  id?: number;
  /** ISO date, e.g. "2026-11-11". */
  date: string;
  title: string;
  titleMr: string;
  /** URL or path to a PDF under /public. Optional. */
  link?: string;
};

/** Fallback notices used when no database is configured (or it is unreachable). */
const jsonNoticesByCollege: Record<string, Notice[]> = {
  mgdcon: mgdconNotices as Notice[],
};

function newestFirst(list: Notice[], limit: number) {
  return list
    .filter((n) => !Number.isNaN(Date.parse(n.date)))
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
    .slice(0, limit);
}

/**
 * The newest `limit` published notices, newest first.
 * Reads the database when DATABASE_URL is set, otherwise data/<college>/notices.json.
 */
export async function getLatestNotices(collegeId: string, limit = 5): Promise<Notice[]> {
  if (isDbConfigured()) {
    try {
      const rows = await getDb().notice.findMany({
        where: { college: collegeId, published: true },
        orderBy: [{ date: "desc" }, { id: "desc" }],
        take: limit,
      });
      return rows.map((n) => ({
        id: n.id,
        date: n.date.toISOString().slice(0, 10),
        title: n.title,
        titleMr: n.titleMr,
        link: n.link,
      }));
    } catch (err) {
      // A warning (not an error) so the dev overlay does not pop up; run `npm run db:check` for details.
      console.warn(
        "[notices] Database not reachable, showing notices from the JSON file. Run `npm run db:check` to see why.",
        (err as Error).message?.split("\n").pop(),
      );
    }
  }
  return newestFirst(jsonNoticesByCollege[collegeId] ?? [], limit);
}

/** Notices from the JSON file, used by the seed script. */
export function getJsonNotices(collegeId: string): Notice[] {
  return jsonNoticesByCollege[collegeId] ?? [];
}
