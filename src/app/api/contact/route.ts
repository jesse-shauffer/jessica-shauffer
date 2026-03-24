import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';
import { Resend } from 'resend';

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'zrerdn9o',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const NOTIFY_EMAIL = process.env.FORM_NOTIFY_EMAIL || 'jesse@scalermarketing.com';

const interestLabels: Record<string, string> = {
  buying: 'Buying a home',
  selling: 'Selling my home',
  both: 'Buying and selling',
  investing: 'Investment property',
  vacation: 'Vacation home',
  commercial: 'Commercial property',
  other: 'Something else',
};

const sourceLabels: Record<string, string> = {
  homepage: 'Homepage',
  contact: 'Contact Page',
  buyers: 'Buyer\'s Guide',
  sellers: 'Seller\'s Guide',
};

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

    // Save to Sanity
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

    // Send email notification
    if (resend) {
      const sourceName = sourceLabels[source] || source || 'Website';
      const interestName = interestLabels[interest] || interest;

      await resend.emails.send({
        from: 'Jessica Shauffer Website <notifications@scalermarketing.com>',
        to: NOTIFY_EMAIL,
        subject: `New Lead: ${fullName} — ${interestName}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto;">
            <h2 style="color: #1a2744; margin-bottom: 4px;">New Consultation Request</h2>
            <p style="color: #6b7280; margin-top: 0;">From the <strong>${sourceName}</strong> page</p>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #6b7280; width: 120px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${fullName}</td></tr>
              <tr><td style="padding: 8px 0; color: #6b7280;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
              ${phone ? `<tr><td style="padding: 8px 0; color: #6b7280;">Phone</td><td style="padding: 8px 0;"><a href="tel:${phone}">${phone}</a></td></tr>` : ''}
              <tr><td style="padding: 8px 0; color: #6b7280;">Interest</td><td style="padding: 8px 0;">${interestName}</td></tr>
              ${message ? `<tr><td style="padding: 8px 0; color: #6b7280; vertical-align: top;">Message</td><td style="padding: 8px 0;">${message}</td></tr>` : ''}
            </table>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
            <p style="color: #9ca3af; font-size: 13px;">This lead was also saved to your <a href="https://www.jessicashauffer.com/studio">Sanity dashboard</a>.</p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Form submission error:', err);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again or call Jessica directly.' },
      { status: 500 }
    );
  }
}
