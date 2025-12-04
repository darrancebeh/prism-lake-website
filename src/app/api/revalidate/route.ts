import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import crypto from 'crypto';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface GitHubCommit {
  added: string[];
  modified: string[];
  removed: string[];
}

interface GitHubWebhookPayload {
  commits?: GitHubCommit[];
  ref?: string;
}

export async function POST(req: NextRequest) {
  try {
    console.log('🔔 Webhook POST received');
    
    const textBody = await req.text();
    const signature = req.headers.get('x-hub-signature-256');
    const secret = process.env.REVALIDATION_SECRET;

    if (!secret) {
      console.error('❌ REVALIDATION_SECRET not configured');
      return NextResponse.json(
        { message: 'Server configuration error' }, 
        { status: 500 }
      );
    }

    if (!signature) {
      console.error('❌ No signature provided');
      return NextResponse.json(
        { message: 'No signature provided' }, 
        { status: 401 }
      );
    }

    // Verify HMAC signature
    const hmac = crypto.createHmac('sha256', secret);
    const digest = 'sha256=' + hmac.update(textBody).digest('hex');
    
    const signatureBuffer = Buffer.from(signature);
    const digestBuffer = Buffer.from(digest);

    if (signatureBuffer.length !== digestBuffer.length || 
        !crypto.timingSafeEqual(signatureBuffer, digestBuffer)) {
      console.error('❌ Invalid signature');
      return NextResponse.json(
        { message: 'Invalid signature' }, 
        { status: 401 }
      );
    }

    console.log('✅ Signature verified');

    const payload = JSON.parse(textBody) as GitHubWebhookPayload;

    const affectedFiles: string[] = payload.commits?.flatMap((c) => [
      ...c.added, 
      ...c.modified, 
      ...c.removed
    ]) || [];

    console.log('📁 Files changed:', affectedFiles);

    const hasContentChanges = affectedFiles.some((file) => 
      file.startsWith('content/') || 
      file.includes('.mdx') ||
      file.includes('.md')
    );

    if (!hasContentChanges) {
      console.log('ℹ️ No content changes detected');
      return NextResponse.json({ 
        message: 'No content changes detected',
        revalidated: false 
      });
    }

    // Revalidate paths
    console.log('🔄 Revalidating...');
    revalidatePath('/research', 'page');
    revalidatePath('/research/[slug]', 'page');
    revalidatePath('/', 'page');
    
    console.log('✅ Revalidation complete');
    
    return NextResponse.json({ 
      revalidated: true, 
      timestamp: Date.now(),
      filesChanged: affectedFiles.length,
      files: affectedFiles
    }, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
  } catch (error) {
    console.error('❌ Revalidation error:', error);
    return NextResponse.json({ 
      message: 'Error revalidating',
      error: String(error)
    }, { status: 500 });
  }
}

// GET handler for health check
export async function GET() {
  return NextResponse.json({ 
    message: 'Webhook endpoint active',
    status: 'ok',
    timestamp: Date.now()
  }, { 
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    }
  });
}