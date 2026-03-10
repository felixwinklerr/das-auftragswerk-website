import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, branche, message } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name und Telefonnummer sind erforderlich." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (apiKey) {
      const { Resend } = await import("resend");
      const resend = new Resend(apiKey);

      await resend.emails.send({
        from: "Das Auftragswerk <onboarding@resend.dev>",
        to: "kontakt@dasauftragswerk.de",
        subject: `Neue Anfrage von ${name}`,
        text: [
          `Name: ${name}`,
          `Telefon: ${phone}`,
          `Branche: ${branche || "Nicht angegeben"}`,
          `Nachricht: ${message || "Keine Nachricht"}`,
        ].join("\n"),
      });
    } else {
      console.log("--- Neue Kontaktanfrage (kein RESEND_API_KEY) ---");
      console.log({ name, phone, branche, message });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Etwas ist schiefgelaufen. Bitte versuchen Sie es später erneut." },
      { status: 500 }
    );
  }
}
