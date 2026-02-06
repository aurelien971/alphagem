import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type Payload = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

const CONTACT_RECIPIENTS = [
  "aureliennicolle@me.com",
];

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(req: Request) {
  console.log("---- /api/contact POST called ----");

  let body: Partial<Payload>;

  try {
    body = (await req.json()) as Partial<Payload>;
    console.log("Parsed body:", body);
  } catch (err) {
    console.error("Failed to parse JSON:", err);
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const firstName = String(body.firstName ?? "").trim();
  const lastName = String(body.lastName ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();

  console.log("Sanitized payload:", { firstName, lastName, email, message });

  if (!firstName || !lastName || !email || !message) {
    console.error("Missing fields");
    return NextResponse.json({ error: "Missing fields." }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    console.error("Invalid email format:", email);
    return NextResponse.json({ error: "Invalid email." }, { status: 400 });
  }

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.CONTACT_FROM_EMAIL || user;

  console.log("SMTP ENV:", {
    host,
    port,
    user,
    passExists: Boolean(pass),
    from,
    to: CONTACT_RECIPIENTS,
  });

  if (!host || !user || !pass || !from || !CONTACT_RECIPIENTS.length) {
    console.error("SMTP misconfiguration");
    return NextResponse.json(
      { error: "Email server not configured." },
      { status: 500 }
    );
  }

  console.log("Creating transporter…");

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: false,
    auth: { user, pass },
    requireTLS: true,
    tls: { minVersion: "TLSv1.2" },
  });

  try {
    console.log("Verifying transporter…");
    await transporter.verify();
    console.log("Transporter verified OK");

    console.log("Sending email…");

    const info = await transporter.sendMail({
      from: `Website Contact <${from}>`,
      to: CONTACT_RECIPIENTS,
      replyTo: email,
      subject: `New message from ${firstName} ${lastName}`,
      text: `First name: ${firstName}
Last name: ${lastName}
Email: ${email}

Message:
${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>New contact form message</h2>
          <p><strong>First name:</strong> ${escapeHtml(firstName)}</p>
          <p><strong>Last name:</strong> ${escapeHtml(lastName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Message:</strong></p>
          <pre style="white-space: pre-wrap; background: #f5f5f5; padding: 12px; border-radius: 10px;">${escapeHtml(
            message
          )}</pre>
        </div>
      `,
    });

    console.log("Email sent successfully:", {
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
      response: info.response,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("EMAIL SEND FAILED");
    console.error("Error message:", err?.message);
    console.error("Error code:", err?.code);
    console.error("Error response:", err?.response);
    console.error("Full error:", err);

    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}