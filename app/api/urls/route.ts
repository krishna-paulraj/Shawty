import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../lib/prisma";
import { randomBytes } from "crypto";

function generateCode(len: number = 6): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
  const bytes = randomBytes(len);
  let code = "";
  for (let i = 0; i < len; i++) {
    code += chars[bytes[i] % chars.length];
  }
  return code;
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const url = data?.url;
    if (typeof url !== "string" || url.trim() === "") {
      return NextResponse.json({ error: "url_required" }, { status: 400 });
    }
    try {
      new URL(url);
    } catch {
      return NextResponse.json({ error: "invalid_url" }, { status: 400 });
    }

    const origin =
      process.env.NEXT_PUBLIC_URL ?? req.nextUrl?.origin ?? "http://localhost";

    // Check if URL already exists
    const existing = await prisma.url.findFirst({ where: { actualUrl: url } });
    if (existing) {
      const shortFull = `${origin.replace(/\/+$/, "")}/${existing.shortUrl}`;
      const createdAt = (existing.createdAt as Date).toISOString();
      console.log("Returning existing URL:", existing.shortUrl);
      await prisma.$disconnect();
      return NextResponse.json({
        actual_url: url,
        short_url: existing.shortUrl,
        short_full: shortFull,
        created_at: createdAt,
      });
    }

    let shortCode = generateCode(6);
    let created: Url | null = null;

    for (let attempt = 0; attempt < 5; attempt++) {
      try {
        created = await prisma.url.create({
          data: { actualUrl: url, shortUrl: shortCode },
        });
        console.log("Created URL:", created);
        break;
      } catch (err: any) {
        if (err.code === "P2002") {
          shortCode = generateCode(6);
          continue;
        } else {
          return NextResponse.json(
            { error: "db_error", detail: err?.message },
            { status: 500 },
          );
        }
      }
    }

    if (!created) {
      return NextResponse.json(
        { error: "could_not_generate_short" },
        { status: 500 },
      );
    }

    const shortFull = `${origin.replace(/\/+$/, "")}/${created.shortUrl}`;
    const createdAt = (created.createdAt as Date).toISOString();

    console.log("Returning response for URL:", created.shortUrl);
    await prisma.$disconnect();
    return NextResponse.json({
      actual_url: url,
      short_url: created.shortUrl,
      short_full: shortFull,
      created_at: createdAt,
    });
  } catch {
    await prisma.$disconnect();
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
}
