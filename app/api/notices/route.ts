import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getCollege } from "@/config";
import { getDb } from "@/lib/db";
import { noticeInput } from "@/lib/validation";
import { getLatestNotices } from "@/lib/notices";
import { isAdmin } from "@/lib/auth";
import { requireAdmin, requireDb, validationError, withDbErrors } from "@/lib/api";

/**
 * GET /api/notices — public: latest published notices (database or JSON fallback).
 * GET /api/notices?all=1 — admin: every notice, including unpublished.
 */
export const GET = withDbErrors(async (req: Request) => {
  const college = getCollege();
  const all = new URL(req.url).searchParams.get("all") === "1";

  if (all && (await isAdmin())) {
    const dbError = requireDb();
    if (dbError) return dbError;
    const notices = await getDb().notice.findMany({
      where: { college: college.id },
      orderBy: [{ date: "desc" }, { id: "desc" }],
    });
    return NextResponse.json({ ok: true, notices });
  }

  const notices = await getLatestNotices(college.id, 20);
  return NextResponse.json({ ok: true, notices });
});

/** POST /api/notices — admin: add a notice. */
export const POST = withDbErrors(async (req: Request) => {
  const authError = await requireAdmin();
  if (authError) return authError;

  const parsed = noticeInput.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return validationError(parsed.error);

  const dbError = requireDb();
  if (dbError) return dbError;

  const notice = await getDb().notice.create({
    data: { ...parsed.data, date: new Date(parsed.data.date), college: getCollege().id },
  });
  revalidatePath("/");
  return NextResponse.json({ ok: true, id: notice.id }, { status: 201 });
});
