import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) return NextResponse.json({ error: "Slug required" }, { status: 400 });

  // Fetch comments (newest first)
  const result = await sql`
    SELECT id, author_name, role, text, created_at 
    FROM comments 
    WHERE slug = ${slug} 
    ORDER BY created_at DESC 
    LIMIT 50;
  `;

  return NextResponse.json(result.rows);
}

export async function POST(req: NextRequest) {
  const { slug, name, text, role } = await req.json();

  if (!text || !slug) return NextResponse.json({ error: "Missing data" }, { status: 400 });

  // Insert Comment
  const result = await sql`
    INSERT INTO comments (slug, author_name, text, role)
    VALUES (${slug}, ${name}, ${text}, ${role})
    RETURNING *;
  `;

  return NextResponse.json(result.rows[0]);
}