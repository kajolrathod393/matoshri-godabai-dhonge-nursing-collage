import { NextResponse } from "next/server";
import { getCollege } from "@/config";
import { getDb } from "@/lib/db";
import { enquiryInput } from "@/lib/validation";
import { EnquiryStatus } from "@/lib/generated/prisma/enums";
import {
  clientIp,
  jsonError,
  rateLimited,
  requireAdmin,
  requireDb,
  validationError,
  withDbErrors,
} from "@/lib/api";

/** POST /api/enquiries — public admission enquiry form. */
export const POST = withDbErrors(async (req: Request) => {
  if (rateLimited(`enquiry:${clientIp(req)}`)) {
    return jsonError(429, "Too many requests. Please call the office.");
  }

  const parsed = enquiryInput.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return validationError(parsed.error);

  // Bots fill the hidden "website" field: pretend success, store nothing.
  if (parsed.data.website) return NextResponse.json({ ok: true }, { status: 201 });

  const dbError = requireDb();
  if (dbError) return dbError;

  const { website: _honeypot, ...data } = parsed.data;
  const enquiry = await getDb().enquiry.create({ data: { ...data, college: getCollege().id } });
  return NextResponse.json({ ok: true, id: enquiry.id }, { status: 201 });
});

/** GET /api/enquiries?status=new — admin only, newest first. */
export const GET = withDbErrors(async (req: Request) => {
  const authError = await requireAdmin();
  if (authError) return authError;
  const dbError = requireDb();
  if (dbError) return dbError;

  const status = new URL(req.url).searchParams.get("status");
  const validStatus = status && status in EnquiryStatus ? (status as EnquiryStatus) : undefined;

  const enquiries = await getDb().enquiry.findMany({
    where: { college: getCollege().id, ...(validStatus ? { status: validStatus } : {}) },
    orderBy: { createdAt: "desc" },
    take: 500,
  });
  return NextResponse.json({ ok: true, enquiries });
});
