import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'zrerdn9o',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, interest, message, source } = body;

    if (!fullName || !email || !interest) {
      return NextResponse.json(
        { error: 'Please fill in all required fields.' },
        { status: 400 }
      );
    }

    await writeClient.create({
      _type: 'formSubmission',
      fullName,
      email,
      phone: phone || undefined,
      interest,
      message: message || undefined,
      source: source || 'homepage',
      submittedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Form submission error:', err);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again or call Jessica directly.' },
      { status: 500 }
    );
  }
}
