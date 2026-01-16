// app/api/contact/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type Body = { name: string; email: string; message: string };

export async function POST(req: Request) {
  let body: Body;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields." }, { status: 400 });
  }

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  const to = process.env.CONTACT_TO ?? "contact@alphagem.net";
  const from = process.env.CONTACT_FROM ?? user;

  if (!host || !user || !pass || !from) {
    return NextResponse.json(
      { error: "Email server not configured. Set SMTP_* env vars." },
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
    await transporter.sendMail({
      from: `Alphagem Website <${from}>`,
      to,
      replyTo: email,
      subject: `New contact form message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>New contact form message</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Message:</strong></p>
          <pre style="white-space: pre-wrap; background: #f5f5f5; padding: 12px; border-radius: 8px;">${escapeHtml(
            message
          )}</pre>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}