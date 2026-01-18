import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ short: string }> },
) {
  const { short } = await params;

  if (!short)
    return NextResponse.json({ error: "missing_short" }, { status: 400 });

  try {
    const found = await prisma.url.findUnique({ where: { shortUrl: short } });
    if (!found) {
      return NextResponse.json({ notFound: true }, { status: 404 });
    }
    const actualUrl = found.actualUrl as string;
    return NextResponse.json({ actualUrl });
  } catch (e) {
    return NextResponse.json(
      { error: "internal_error", detail: (e as Error)?.message },
      { status: 500 },
    );
  }
}
