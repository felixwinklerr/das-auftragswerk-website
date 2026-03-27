import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    console.log('New Onboarding Submission:', JSON.stringify(data, null, 2));

    // Forward to GHL Inbound Webhook if configured
    const GHL_WEBHOOK_URL = process.env.GHL_WEBHOOK_URL;
    if (GHL_WEBHOOK_URL) {
      try {
        await fetch(GHL_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
      } catch (webhookError) {
        // Log but don't fail the user submission
        console.error('GHL Webhook Error:', webhookError);
      }
    }

    return NextResponse.json({ success: true, message: 'Data received' }, { status: 200 });
  } catch (error) {
    console.error('Onboarding API Error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
