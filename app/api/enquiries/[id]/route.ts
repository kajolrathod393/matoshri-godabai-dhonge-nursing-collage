import { NextResponse } from "next/server";
import { getCollege } from "@/config";
import { getDb } from "@/lib/db";
import { enquiryUpdate } from "@/lib/validation";
import { jsonError, parseId, requireAdmin, requireDb, validationError, withDbErrors } from "@/lib/api";

type Ctx = { params: Promise<{ id: string }> };

/** PATCH /api/enquiries/:id — admin: update status / office notes. */
export const PATCH = withDbErrors(async (req: Request, { params }: Ctx) => {
  const authError = await requireAdmin();
  if (authError) return authError;
  const id = parseId((await params).id);
  if (id === null) return jsonError(404, "Not found");

  const parsed = enquiryUpdate.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return validationError(parsed.error);

  const dbError = requireDb();
  if (dbError) return dbError;

  const result = await getDb().enquiry.updateMany({
    where: { id, college: getCollege().id },
    data: parsed.data,
  });
  if (result.count === 0) return jsonError(404, "Not found");
  return NextResponse.json({ ok: true });
});

/** DELETE /api/enquiries/:id — admin. */
export const DELETE = withDbErrors(async (_req: Request, { params }: Ctx) => {
  const authError = await requireAdmin();
  if (authError) return authError;
  const id = parseId((await params).id);
  if (id === null) return jsonError(404, "Not found");

  const dbError = requireDb();
  if (dbError) return dbError;

  const result = await getDb().enquiry.deleteMany({ where: { id, college: getCollege().id } });
  if (result.count === 0) return jsonError(404, "Not found");
  return NextResponse.json({ ok: true });
});
