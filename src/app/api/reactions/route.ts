import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) return NextResponse.json({ error: "Slug required" }, { status: 400 });

  try {
    // Attempt to get the row
    const result = await sql`SELECT * FROM reactions WHERE slug = ${slug}`;
    
    // If no row exists yet for this article, return zeros (Frontend handles the init)
    if (result.rowCount === 0) {
      return NextResponse.json({ up: 0, down: 0, fire: 0 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    return NextResponse.json({ error: "DB Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { slug, type } = await req.json();

  if (!slug || !['up', 'down', 'fire'].includes(type)) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  // UPSERT Logic: Insert if new, Update if exists.
  // This ensures we don't crash on the first ever vote.
  if (type === 'up') {
    await sql`
      INSERT INTO reactions (slug, up, down, fire) VALUES (${slug}, 1, 0, 0)
      ON CONFLICT (slug) DO UPDATE SET up = reactions.up + 1;
    `;
  } 
  else if (type === 'down') {
    await sql`
      INSERT INTO reactions (slug, up, down, fire) VALUES (${slug}, 0, 1, 0)
      ON CONFLICT (slug) DO UPDATE SET down = reactions.down + 1;
    `;
  } 
  else if (type === 'fire') {
    await sql`
      INSERT INTO reactions (slug, up, down, fire) VALUES (${slug}, 0, 0, 1)
      ON CONFLICT (slug) DO UPDATE SET fire = reactions.fire + 1;
    `;
  }

  // Return new state
  const result = await sql`SELECT * FROM reactions WHERE slug = ${slug}`;
  return NextResponse.json(result.rows[0]);
}