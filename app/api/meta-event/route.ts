import { NextRequest, NextResponse } from "next/server";

const PIXEL_ID = "2120755065444667";
const CAPI_URL = `https://graph.facebook.com/v19.0/${PIXEL_ID}/events`;

export async function POST(req: NextRequest) {
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;

  // Silently skip if token not configured
  if (!accessToken) {
    return NextResponse.json({ ok: false, reason: "token_missing" });
  }

  try {
    const body = await req.json();
    const { event_name, event_id, source_url, user_data } = body;

    if (!event_name || !event_id) {
      return NextResponse.json({ ok: false, reason: "missing_fields" }, { status: 400 });
    }

    // Enrich with server-side IP (bypasses ad blockers for CAPI)
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      undefined;

    const ua = req.headers.get("user-agent") || user_data?.client_user_agent || "";

    const payload: Record<string, unknown> = {
      data: [
        {
          event_name,
          event_time: Math.floor(Date.now() / 1000),
          event_id,
          event_source_url: source_url,
          action_source: "website",
          user_data: {
            client_ip_address: ip,
            client_user_agent: ua,
            ...(user_data?.fbp ? { fbp: user_data.fbp } : {}),
            ...(user_data?.fbc ? { fbc: user_data.fbc } : {}),
          },
        },
      ],
    };

    // Optional: test event code for Meta Events Manager verification
    if (process.env.META_TEST_EVENT_CODE) {
      payload.test_event_code = process.env.META_TEST_EVENT_CODE;
    }

    const res = await fetch(`${CAPI_URL}?access_token=${accessToken}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Meta CAPI error response:", data);
      return NextResponse.json({ ok: false, meta: data }, { status: 502 });
    }

    return NextResponse.json({ ok: true, meta: data });
  } catch (error) {
    console.error("Meta CAPI route error:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
