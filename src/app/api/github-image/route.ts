import { NextRequest, NextResponse } from 'next/server';

const REPO_OWNER = process.env.GITHUB_REPO_OWNER;
const REPO_NAME = process.env.GITHUB_REPO_NAME;
const TOKEN = process.env.GITHUB_VAULT_TOKEN;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const path = searchParams.get('path');

  if (!path) {
    return NextResponse.json({ error: 'Missing path parameter' }, { status: 400 });
  }

  if (!TOKEN) {
    return NextResponse.json({ error: 'GitHub vault token not configured' }, { status: 500 });
  }

  try {
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${cleanPath}`;
    
    console.log('🖼️ Fetching image:', url);

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        Accept: 'application/vnd.github.v3.raw',
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      console.error('GitHub API error:', response.status, await response.text());
      return NextResponse.json({ error: 'Failed to fetch image' }, { status: response.status });
    }

    const imageBuffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'image/png';

    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600, s-maxage=3600, immutable',
      },
    });
  } catch (error) {
    console.error('Error fetching GitHub image:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}