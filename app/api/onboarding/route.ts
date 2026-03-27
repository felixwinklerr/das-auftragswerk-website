import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Log it to console (we'll add GHL webhook later)
    console.log('New Onboarding Submission:', JSON.stringify(data, null, 2));
    
    // Placeholder GHL_WEBHOOK_URL env var that we can configure later
    const GHL_WEBHOOK_URL = process.env.GHL_WEBHOOK_URL;
    if (GHL_WEBHOOK_URL) {
      // await fetch(GHL_WEBHOOK_URL, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // });
    }

    return NextResponse.json({ success: true, message: 'Data received' }, { status: 200 });
  } catch (error) {
    console.error('Onboarding API Error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
