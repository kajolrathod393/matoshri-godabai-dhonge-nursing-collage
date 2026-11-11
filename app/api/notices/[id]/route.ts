import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getCollege } from "@/config";
import { getDb } from "@/lib/db";
import { noticeInput } from "@/lib/validation";
import { jsonError, parseId, requireAdmin, requireDb, validationError, withDbErrors } from "@/lib/api";

type Ctx = { params: Promise<{ id: string }> };

/** PATCH /api/notices/:id — admin: edit a notice or publish / unpublish it. */
export const PATCH = withDbErrors(async (req: Request, { params }: Ctx) => {
  const authError = await requireAdmin();
  if (authError) return authError;
  const id = parseId((await params).id);
  if (id === null) return jsonError(404, "Not found");

  const parsed = noticeInput.partial().safeParse(await req.json().catch(() => null));
  if (!parsed.success) return validationError(parsed.error);

  const dbError = requireDb();
  if (dbError) return dbError;

  const { date, ...rest } = parsed.data;
  const result = await getDb().notice.updateMany({
    where: { id, college: getCollege().id },
    data: { ...rest, ...(date ? { date: new Date(date) } : {}) },
  });
  if (result.count === 0) return jsonError(404, "Not found");
  revalidatePath("/");
  return NextResponse.json({ ok: true });
});

/** DELETE /api/notices/:id — admin. */
export const DELETE = withDbErrors(async (_req: Request, { params }: Ctx) => {
  const authError = await requireAdmin();
  if (authError) return authError;
  const id = parseId((await params).id);
  if (id === null) return jsonError(404, "Not found");

  const dbError = requireDb();
  if (dbError) return dbError;

  const result = await getDb().notice.deleteMany({ where: { id, college: getCollege().id } });
  if (result.count === 0) return jsonError(404, "Not found");
  revalidatePath("/");
  return NextResponse.json({ ok: true });
});
