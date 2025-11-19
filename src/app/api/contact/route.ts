import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'edge';

// Simple in-memory store for rate limiting
// Note: In Edge runtime, this map will be per-isolate and not shared globally.
// For production, consider using Cloudflare KV or Durable Objects for rate limiting.
const rateLimit = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 3600000; // 1 hour in milliseconds
const MAX_REQUESTS = 5; // Max 5 emails per hour per IP



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

    // Send email using Resend
    const resend = new Resend(process.env.RESEND_API_KEY);
    const data = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>', // Use your verified domain in production
      to: 'raymondcsirak@gmail.com', // Replace with your email
      replyTo: `${name} <${email}>`,
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

    if (data.error) {
      console.error('Resend error:', data.error);
      return NextResponse.json(
        { error: 'Failed to send message' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
} 