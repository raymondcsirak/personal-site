import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Simple in-memory store for rate limiting
const rateLimit = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 3600000; // 1 hour in milliseconds
const MAX_REQUESTS = 5; // Max 5 emails per hour per IP

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    minVersion: 'TLSv1.2'
  }
});

// Verify SMTP connection on startup
transporter.verify(function (error, success) {
  if (error) {
    console.error('SMTP connection error:', error);
  } else {
    console.log('SMTP server is ready to take our messages');
  }
});

function isBot(userAgent: string | null, email: string, message: string): boolean {
  if (!userAgent) return true;
  
  // Check for common bot signatures
  const botPatterns = [
    /bot/i, /crawler/i, /spider/i, /headless/i,
    /selenium/i, /puppet/i, /chrome-lighthouse/i
  ];
  
  if (botPatterns.some(pattern => pattern.test(userAgent))) {
    return true;
  }

  // Check for typical spam patterns
  const spamPatterns = [
    /<[^>]*>/, // HTML tags
    /\[url=/, // BBCode
    /\b(?:viagra|cialis|casino|poker|loan|crypto)\b/i, // Common spam words
    /https?:\/\//, // URLs in message
  ];

  if (spamPatterns.some(pattern => pattern.test(message))) {
    return true;
  }

  // Check for suspicious email patterns
  const suspiciousEmailPatterns = [
    /\d{8,}/, // Emails with long number sequences
    /[a-zA-Z0-9]{20,}/ // Very long random strings
  ];

  if (suspiciousEmailPatterns.some(pattern => pattern.test(email))) {
    return true;
  }

  return false;
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimit.get(ip);

  if (!record) {
    rateLimit.set(ip, { count: 1, timestamp: now });
    return true;
  }

  if (now - record.timestamp > RATE_LIMIT_WINDOW) {
    rateLimit.set(ip, { count: 1, timestamp: now });
    return true;
  }

  if (record.count >= MAX_REQUESTS) {
    return false;
  }

  record.count++;
  return true;
}

export async function POST(req: Request) {
  try {
    // Get IP address from headers
    const forwardedFor = req.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0] : 'unknown';
    
    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const { name, email, subject, message, honeypot } = await req.json();

    // Check honeypot field
    if (honeypot) {
      // Silently accept but don't send email
      return NextResponse.json({ success: true });
    }

    // Basic validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Bot detection
    const userAgent = req.headers.get('user-agent');
    if (isBot(userAgent, email, message)) {
      return NextResponse.json(
        { error: 'Invalid request' },
        { status: 403 }
      );
    }

    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      replyTo: `${name} <${email}>`,
      to: process.env.SMTP_TO_EMAIL,
      subject: `Contact Form: ${subject}`,
      text: `From: ${name} (${email})\n\n${message}`,
      html: `
        <div>
          <h2>New Contact Form Submission</h2>
          <p><strong>From:</strong> ${name} (${email})</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
} 