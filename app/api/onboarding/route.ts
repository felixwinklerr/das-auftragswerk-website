import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const logoFile = formData.get('logoFile') as File | null;
    let fileDataUri = '';
    
    if (logoFile && logoFile.size > 0) {
      if (logoFile.size > 10 * 1024 * 1024) {
         return NextResponse.json({ success: false, error: 'Die Datei ist zu groß (max. 10MB).' }, { status: 400 });
      }
      const buffer = await logoFile.arrayBuffer();
      const base64 = Buffer.from(buffer).toString('base64');
      fileDataUri = `data:${logoFile.type};base64,${base64}`;
    }
    
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
    
    console.log('New Onboarding Submission (Parsed):', JSON.stringify({ ...data, logoFile: !!logoFile }, null, 2));

    const contactId = data.contactId;

    // Call GHL API directly if Key is present
    const GHL_API_KEY = process.env.GHL_API_KEY;
    if (GHL_API_KEY) {
      try {
        const customFields = [
          { id: '9fBZvRBvkGzEwFlRSJHS', field_value: data.auftragswert || '' },
          { id: 'iAFXo9XTCd11rIcAX2Cq', field_value: data.anfragenProWoche || '' },
          { id: '7A4soLvaCr1hWrUIBgTa', field_value: data.antwortGeschwindigkeit || '' },
          { id: 'ugfjETLEhK8sc1sOqjdV', field_value: data.neukundenZiel || '' },
          { id: 'OzFSYZUq0oEdRmDF27Ih', field_value: data.einzugsgebiet || '' },
          { id: 'ONveioGj7QlNzqF9Mvv9', field_value: data.crm || '' },
          { id: '170vrsvUo6IWX0haQuQY', field_value: data.googleBusiness || '' },
          { id: 'LEtLfwnC1cnIOytobIqZ', field_value: data.bewertungen || '' },
          { id: 'OLLdZ5h1LnTtzPTm7j9x', field_value: fileDataUri || '' },
          { id: 'ulLVknNoe2uWZl9O6B1B', field_value: data.ansprechperson || '' },
          { id: 'NYchMpCBcURll9yaMDEH', field_value: data.plattformen && Array.isArray(data.plattformen) ? data.plattformen.join(', ') : '' },
          { id: '6Qtfi5kJzVeRz2EOOq53', field_value: JSON.stringify(data) },
        ].filter(f => f.field_value !== '');

        const payload: any = {
          customFields,
          tags: data.tags || ['fragebogen-erhalten']
        };

        if (data.email) {
          payload.email = data.email;
        }

        const endpoint = contactId 
          ? `https://services.leadconnectorhq.com/contacts/${contactId}`
          : `https://services.leadconnectorhq.com/contacts/upsert`;
          
        const method = contactId ? 'PUT' : 'POST';

        const ghlResponse = await fetch(endpoint, {
          method,
          headers: {
            'Authorization': `Bearer ${GHL_API_KEY}`,
            'Version': '2021-07-28',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (!ghlResponse.ok) {
          console.error('GHL API Error Response:', await ghlResponse.text());
        } else {
          console.log('GHL API Success');
        }
      } catch (apiError) {
        console.error('GHL API Catch Error:', apiError);
      }
    }

    // Forward to GHL Inbound Webhook if configured
    const GHL_WEBHOOK_URL = process.env.GHL_WEBHOOK_URL;
    if (GHL_WEBHOOK_URL) {
      try {
        await fetch(GHL_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...data, fileDataUri }),
        });
      } catch (webhookError) {
        console.error('GHL Webhook Error:', webhookError);
      }
    }

    return NextResponse.json({ success: true, message: 'Data received' }, { status: 200 });
  } catch (error) {
    console.error('Onboarding API Error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
