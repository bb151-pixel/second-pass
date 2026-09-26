import { validAccessCode } from "@/lib/access";

export async function POST(req: Request) {
  const { code } = (await req.json().catch(() => ({}))) as { code?: string };
  return Response.json({ ok: validAccessCode(code) }, { status: validAccessCode(code) ? 200 : 401 });
}
