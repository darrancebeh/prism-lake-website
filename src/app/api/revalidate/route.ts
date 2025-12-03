// src/app/api/revalidate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import crypto from 'crypto';

// Specify Node.js runtime (important for crypto module)
export const runtime = 'nodejs';

// Type definitions for GitHub webhook payload
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
    // 1. Get the raw body (needed for HMAC verification)
    const textBody = await req.text();
    
    // 2. Get GitHub's signature and your secret
    const signature = req.headers.get('x-hub-signature-256');
    const secret = process.env.REVALIDATION_SECRET;

    // 3. Security validation
    if (!secret || !signature) {
      console.error('❌ Missing secret or signature');
      return NextResponse.json({ message: 'Missing secret or signature' }, { status: 401 });
    }

    // 4. Verify HMAC SHA-256 signature
    const hmac = crypto.createHmac('sha256', secret);
    const digest = 'sha256=' + hmac.update(textBody).digest('hex');

    // Use timing-safe comparison to prevent timing attacks
    const signatureBuffer = Buffer.from(signature);
    const digestBuffer = Buffer.from(digest);

    if (signatureBuffer.length !== digestBuffer.length || 
        !crypto.timingSafeEqual(signatureBuffer, digestBuffer)) {
      console.error('❌ Invalid signature');
      return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });
    }

    // 5. Parse payload and check affected files
    const payload = JSON.parse(textBody) as GitHubWebhookPayload;
    
    const affectedFiles = payload.commits?.flatMap((c) => [
      ...c.added,
      ...c.modified,
      ...c.removed
    ]) || [];

    console.log('📁 Files changed:', affectedFiles);

    const hasContentChanges = affectedFiles.some((file: string) => 
      file.startsWith('content/posts/') || file.startsWith('content/flash-updates/')
    );

    if (!hasContentChanges) {
      console.log('ℹ️ No content changes detected, skipping revalidation');
      return NextResponse.json({ 
        message: 'No content changes detected',
        revalidated: false 
      });
    }

    // 6. Revalidate cache
    revalidatePath('/research', 'page');
    revalidatePath('/research/[slug]', 'page');
    
    console.log('✅ Cache revalidated successfully');
    
    return NextResponse.json({ 
      revalidated: true, 
      timestamp: Date.now(),
      filesChanged: affectedFiles.length 
    });
    
  } catch (error) {
    console.error('❌ Revalidation error:', error);
    return NextResponse.json({ 
      message: 'Error revalidating',
      error: String(error)
    }, { status: 500 });
  }
}

// GET handler for testing
export async function GET() {
  return NextResponse.json({ 
    message: 'Webhook endpoint is active. Use POST method.',
    status: 'ok' 
  }, { status: 200 });
}