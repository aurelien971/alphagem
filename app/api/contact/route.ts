import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type Payload = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

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
  let body: Partial<Payload>;

  try {
    body = (await req.json()) as Partial<Payload>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const firstName = String(body.firstName ?? "").trim();
  const lastName = String(body.lastName ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!firstName || !lastName || !email || !message) {
    return NextResponse.json({ error: "Missing fields." }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email." }, { status: 400 });
  }

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  const to = process.env.CONTACT_TO_EMAIL || user;
  const from = process.env.CONTACT_FROM_EMAIL || user;

  if (!host || !user || !pass || !to || !from) {
    return NextResponse.json(
      { error: "Email server not configured. Set SMTP_* and CONTACT_* env vars." },
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  try {
    if (process.env.NODE_ENV !== "production") {
      await transporter.verify();
    }

    await transporter.sendMail({
      from: `Website Contact <${from}>`,
      to,
      replyTo: email,
      subject: `New message from ${firstName} ${lastName}`,
      text: `First name: ${firstName}\nLast name: ${lastName}\nEmail: ${email}\n\nMessage:\n${message}`,
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

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Email send failed:", e);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}