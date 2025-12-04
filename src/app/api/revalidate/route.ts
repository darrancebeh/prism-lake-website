import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import crypto from 'crypto';

export const runtime = 'nodejs';

// 1. Define the shape of the data we expect from GitHub
interface GitHubCommit {
  added: string[];
  modified: string[];
  removed: string[];
}

interface GitHubWebhookPayload {
  commits?: GitHubCommit[];
}

export async function POST(req: NextRequest) {
  try {
    const textBody = await req.text();
    const signature = req.headers.get('x-hub-signature-256');
    const secret = process.env.REVALIDATION_SECRET;

    if (!secret || !signature) {
      return NextResponse.json({ message: 'Missing secret' }, { status: 401 });
    }

    const hmac = crypto.createHmac('sha256', secret);
    const digest = 'sha256=' + hmac.update(textBody).digest('hex');
    
    const signatureBuffer = Buffer.from(signature);
    const digestBuffer = Buffer.from(digest);

    if (signatureBuffer.length !== digestBuffer.length || 
        !crypto.timingSafeEqual(signatureBuffer, digestBuffer)) {
      return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });
    }

    // 2. Apply the type to the parsed JSON
    const payload = JSON.parse(textBody) as GitHubWebhookPayload;

    // 3. No more 'any' - TypeScript knows 'c' is a GitHubCommit
    const affectedFiles: string[] = payload.commits?.flatMap((c) => [
      ...c.added, ...c.modified, ...c.removed
    ]) || [];

    const hasContentChanges = affectedFiles.some((file) => 
      file.startsWith('content/') && file.endsWith('.mdx')
    );

    if (!hasContentChanges) {
      return NextResponse.json({ message: 'No MDX changes detected' });
    }

    revalidateTag('research-content');
    
    console.log(`✅ Cache purged. Changed files: ${affectedFiles.length}`);
    
    return NextResponse.json({ 
      revalidated: true, 
      now: Date.now(),
      files: affectedFiles.length
    });
    
  } catch (error) {
    console.error('Revalidation Error:', error);
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}