import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const logoFile = formData.get('logoFile') as File | null;

    // Parse all non-file fields
    const data: Record<string, any> = {};
    for (const [key, value] of formData.entries()) {
      if (key !== 'logoFile') {
        if (key === 'kundenquellen' || key === 'plattformen' || key === 'tags') {
          data[key] = formData.getAll(key);
        } else if (key === 'dsgvoConsent') {
          data[key] = value === 'true';
        } else {
          data[key] = value;
        }
      }
    }

    console.log('New Onboarding Submission:', JSON.stringify({ ...data, logoFile: !!logoFile }, null, 2));

    const contactId = data.contactId;
    const GHL_API_KEY = process.env.GHL_API_KEY;
    const GHL_WEBHOOK_URL = process.env.GHL_WEBHOOK_URL;

    // ── 1. Logo Upload via GHL API (only thing webhook can't do) ──
    let logoUrl = '';
    if (logoFile && logoFile.size > 0 && GHL_API_KEY) {
      if (logoFile.size > 10 * 1024 * 1024) {
        return NextResponse.json({ success: false, error: 'Die Datei ist zu groß (max. 10MB).' }, { status: 400 });
      }
      try {
        if (contactId) {
          const uploadForm = new FormData();
          uploadForm.append('file', logoFile, logoFile.name);
          uploadForm.append('field_id', 'OLLdZ5h1LnTtzPTm7j9x');

          const uploadRes = await fetch(
            `https://services.leadconnectorhq.com/contacts/${contactId}/upload-custom-files`,
            {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${GHL_API_KEY}`,
                Version: '2021-07-28',
              },
              body: uploadForm,
            }
          );

          if (uploadRes.ok) {
            const uploadData = await uploadRes.json();
            logoUrl = uploadData?.url || '';
            console.log('Logo uploaded to GHL:', logoUrl);
          } else {
            console.error('GHL Logo Upload Error:', await uploadRes.text());
          }
        }
      } catch (uploadError) {
        console.error('GHL Logo Upload Catch Error:', uploadError);
      }
    }

    // ── 2. All form data via GHL Inbound Webhook ──
    if (GHL_WEBHOOK_URL) {
      try {
        const webhookPayload = {
          ...data,
          logoUrl, // include URL if upload succeeded
          submittedAt: new Date().toISOString(),
        };

        const webhookRes = await fetch(GHL_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(webhookPayload),
        });

        if (!webhookRes.ok) {
          console.error('GHL Webhook Error:', await webhookRes.text());
        } else {
          console.log('GHL Webhook Success');
        }
      } catch (webhookError) {
        console.error('GHL Webhook Catch Error:', webhookError);
      }
    }

    return NextResponse.json({ success: true, message: 'Data received' }, { status: 200 });
  } catch (error) {
    console.error('Onboarding API Error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
