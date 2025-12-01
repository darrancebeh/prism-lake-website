import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { slug } = await req.json();

  if (!slug) {
    return NextResponse.json({ error: "Slug required" }, { status: 400 });
  }

  try {
    // Upsert Logic: Increment the count for the given slug, creating the row if it doesn't exist.
    const result = await sql`
      INSERT INTO views (slug, count)
      VALUES (${slug}, 1)
      ON CONFLICT (slug) DO UPDATE 
      SET count = views.count + 1
      RETURNING count;
    `;

    // The result.rows[0].count will be the new total count
    return NextResponse.json({ views: result.rows[0].count });
    
  } catch (error) {
    console.error("View tracking error:", error);
    return NextResponse.json({ error: "Failed to update view count" }, { status: 500 });
  }
}