import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  const userId = searchParams.get("userId");

  if (!slug) return NextResponse.json({ error: "Slug required" }, { status: 400 });

  // 1. Get Totals
  const totalsResult = await sql`
    SELECT type, COUNT(*) as count 
    FROM user_votes 
    WHERE slug = ${slug} 
    GROUP BY type;
  `;

  // 2. Get User's current state (if userId provided)
  let userVotes: string[] = [];
  if (userId) {
    const userResult = await sql`
      SELECT type FROM user_votes WHERE slug = ${slug} AND user_id = ${userId}
    `;
    userVotes = userResult.rows.map(row => row.type);
  }

  // Format data
  const votes = { up: 0, down: 0, fire: 0 };
  totalsResult.rows.forEach(row => {
    // @ts-expect-error count is string from SQL
    votes[row.type] = parseInt(row.count);
  });

  return NextResponse.json({ ...votes, userState: userVotes });
}

export async function POST(req: NextRequest) {
  const { slug, type, userId } = await req.json();

  if (!slug || !type || !userId) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  if (type === 'fire') {
    // Check if exists
    const exists = await sql`SELECT * FROM user_votes WHERE slug=${slug} AND user_id=${userId} AND type='fire'`;
    
    // FIX: Use (exists.rowCount ?? 0) to handle potential null
    if ((exists.rowCount ?? 0) > 0) {
      // Toggle OFF
      await sql`DELETE FROM user_votes WHERE slug=${slug} AND user_id=${userId} AND type='fire'`;
    } else {
      // Toggle ON
      await sql`INSERT INTO user_votes (slug, user_id, type) VALUES (${slug}, ${userId}, 'fire')`;
    }
  } 
  else if (type === 'up' || type === 'down') {
    const opposite = type === 'up' ? 'down' : 'up';
    
    // Check if same type exists
    const sameExists = await sql`SELECT * FROM user_votes WHERE slug=${slug} AND user_id=${userId} AND type=${type}`;
    
    // FIX: Use (sameExists.rowCount ?? 0)
    if ((sameExists.rowCount ?? 0) > 0) {
      // Toggle OFF
      await sql`DELETE FROM user_votes WHERE slug=${slug} AND user_id=${userId} AND type=${type}`;
    } else {
      // Remove opposite if exists (Switch)
      await sql`DELETE FROM user_votes WHERE slug=${slug} AND user_id=${userId} AND type=${opposite}`;
      // Insert new
      await sql`INSERT INTO user_votes (slug, user_id, type) VALUES (${slug}, ${userId}, ${type})`;
    }
  }

  // Return new totals to update UI immediately
  // We re-use the GET logic logic by calling the URL internally or just re-calculating
  // For simplicity/speed here, we just return success, client re-fetches or relies on optimistic UI
  return NextResponse.json({ success: true });
}