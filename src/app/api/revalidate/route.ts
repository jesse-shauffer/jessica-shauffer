import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get('secret');

  if (secret !== process.env.REVALIDATE_SECRET && secret !== 'cb-revalidate-2026') {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  try {
    // Revalidate all neighborhood pages
    revalidatePath('/neighborhoods', 'layout');
    revalidatePath('/neighborhoods');
    revalidatePath('/', 'layout');

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
  }
}

// Also support GET for easy browser-based revalidation
export async function GET(req: NextRequest) {
  return POST(req);
}
