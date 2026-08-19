import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import dbConnect from '@/lib/mongodb';
import Inquiry from '@/models/Inquiry';

// Force this route to run dynamically on the server.
export const dynamic = 'force-dynamic';

// Email validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      phone,
      company,
      service,
      budget,
      message,
      details,
      bookType,
      hasDesign,
      source,
      website, // Honeypot
    } = body;

    // =========================================================
    // 1. ANTI-SPAM HONEYPOT
    // =========================================================

    if (website && website.trim() !== '') {
      return NextResponse.json(
        {
          success: true,
          message: 'Inquiry submitted successfully!',
        },
        { status: 200 }
      );
    }

    // =========================================================
    // 2. INPUT VALIDATION
    // =========================================================

    const clientName = typeof name === 'string' ? name.trim() : '';
    const clientEmail = typeof email === 'string' ? email.trim() : '';
    const clientMessage =
      typeof (message || details) === 'string'
        ? (message || details).trim()
        : '';

    if (!clientName) {
      return NextResponse.json(
        {
          success: false,
          error: 'Full Name is required.',
        },
        { status: 400 }
      );
    }

    if (!clientEmail || !EMAIL_REGEX.test(clientEmail)) {
      return NextResponse.json(
        {
          success: false,
          error: 'A valid email address is required.',
        },
        { status: 400 }
      );
    }

    if (!clientMessage) {
      return NextResponse.json(
        {
          success: false,
          error: 'Project details or message is required.',
        },
        { status: 400 }
      );
    }

    if (clientName.length > 100) {
      return NextResponse.json(
        {
          success: false,
          error: 'Name must be under 100 characters.',
        },
        { status: 400 }
      );
    }

    if (clientEmail.length > 100) {
      return NextResponse.json(
        {
          success: false,
          error: 'Email must be under 100 characters.',
        },
        { status: 400 }
      );
    }

    if (clientMessage.length > 3000) {
      return NextResponse.json(
        {
          success: false,
          error: 'Message must be under 3000 characters.',
        },
        { status: 400 }
      );
    }

    // =========================================================
    // 3. CHECK REQUIRED SERVER ENVIRONMENT VARIABLES
    // =========================================================

    if (!process.env.MONGODB_URI) {
      console.error(
        '[CONTACT API] MONGODB_URI is missing from environment variables.'
      );

      return NextResponse.json(
        {
          success: false,
          error:
            'Database is not configured on the server. Please contact the administrator.',
        },
        { status: 500 }
      );
    }

    // =========================================================
    // 4. CONNECT TO MONGODB + SAVE INQUIRY
    // =========================================================

    let savedInquiry;

    try {
      await dbConnect();

      savedInquiry = await Inquiry.create({
        name: clientName,
        email: clientEmail,

        phone:
          typeof phone === 'string'
            ? phone.trim()
            : '',

        company:
          typeof company === 'string'
            ? company.trim()
            : '',

        service:
          typeof service === 'string' && service.trim()
            ? service.trim()
            : 'General Inquiry',

        message:
          typeof message === 'string'
            ? message.trim()
            : '',

        details:
          typeof details === 'string'
            ? details.trim()
            : '',

        budget:
          typeof budget === 'string'
            ? budget.trim()
            : '',

        bookType:
          typeof bookType === 'string'
            ? bookType.trim()
            : '',

        hasDesign:
          typeof hasDesign === 'string'
            ? hasDesign.trim()
            : '',

        source:
          typeof source === 'string' && source.trim()
            ? source.trim()
            : 'website_inquiry',
      });

      console.log(
        '[CONTACT API] Inquiry saved successfully:',
        savedInquiry._id.toString()
      );
    } catch (dbError) {
  console.error('========== MONGODB ERROR ==========');
  console.error('Name:', dbError?.name);
  console.error('Message:', dbError?.message);
  console.error('Code:', dbError?.code);
  console.error('CodeName:', dbError?.codeName);
  console.error('====================================');

  return NextResponse.json(
    {
      success: false,
      error: 'Database connection failed. Check Vercel function logs.',
    },
    { status: 500 }
  );
}

    // =========================================================
    // 5. RESEND CONFIGURATION
    // =========================================================

    const apiKey = process.env.RESEND_API_KEY;

    const recipientEmail =
      process.env.CONTACT_EMAIL ||
      'inamuafridi300@gmail.com';

    if (
      !apiKey ||
      apiKey === 'your_resend_api_key' ||
      apiKey === 're_123456789_example_key'
    ) {
      console.error(
        '[CONTACT API] RESEND_API_KEY is missing or invalid.'
      );

      return NextResponse.json(
        {
          success: false,
          error:
            'Your inquiry was saved, but the email notification service is not configured.',
          inquiryId: savedInquiry._id,
        },
        { status: 500 }
      );
    }

    // =========================================================
    // 6. PREPARE EMAIL DATA
    // =========================================================

    const resend = new Resend(apiKey);

    const submissionDate =
      new Date().toLocaleString('en-US', {
        timeZone: 'UTC',
        dateStyle: 'full',
        timeStyle: 'medium',
      }) + ' (UTC)';

    const selectedService =
      typeof service === 'string' && service.trim()
        ? service.trim()
        : 'General Inquiry';

    const clientPhone =
      typeof phone === 'string' && phone.trim()
        ? phone.trim()
        : 'Not provided';

    const clientBudget =
      typeof budget === 'string' && budget.trim()
        ? budget.trim()
        : null;

    const emailSubject =
      `New Service Inquiry: ${selectedService} - ${clientName}`;

    // =========================================================
    // 7. HTML EMAIL
    // =========================================================

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">

  <style>
    body {
      font-family:
        'Segoe UI',
        Tahoma,
        Geneva,
        Verdana,
        sans-serif;
      background-color: #f8fafc;
      margin: 0;
      padding: 20px;
      color: #1e293b;
    }

    .card {
      max-width: 600px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 16px;
      border: 1px solid #e2e8f0;
      overflow: hidden;
      box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05);
    }

    .header {
      background:
        linear-gradient(
          135deg,
          #1e3a8a,
          #3b82f6
        );
      padding: 30px 24px;
      color: #ffffff;
      text-align: center;
    }

    .header h1 {
      margin: 0;
      font-size: 22px;
      font-weight: 800;
      letter-spacing: -0.5px;
    }

    .header p {
      margin: 6px 0 0 0;
      font-size: 13px;
      opacity: 0.9;
    }

    .body {
      padding: 28px 24px;
    }

    .field-group {
      margin-bottom: 20px;
      padding-bottom: 16px;
      border-bottom: 1px solid #f1f5f9;
    }

    .field-group:last-child {
      border-bottom: none;
    }

    .label {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      font-weight: 700;
      color: #64748b;
      margin-bottom: 4px;
    }

    .value {
      font-size: 15px;
      font-weight: 600;
      color: #0f172a;
      line-height: 1.5;
    }

    .message-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 16px;
      font-size: 14px;
      color: #334155;
      line-height: 1.6;
      white-space: pre-wrap;
      margin-top: 6px;
    }

    .footer {
      background: #f1f5f9;
      padding: 16px 24px;
      font-size: 12px;
      color: #64748b;
      text-align: center;
      border-top: 1px solid #e2e8f0;
    }

    .badge {
      display: inline-block;
      background: #dbeafe;
      color: #1e40af;
      padding: 4px 12px;
      border-radius: 9999px;
      font-size: 12px;
      font-weight: 700;
    }
  </style>
</head>

<body>

  <div class="card">

    <div class="header">
      <h1>BigTeeWise Digital</h1>
      <p>New Client Inquiry Received</p>
    </div>

    <div class="body">

      <div class="field-group">
        <div class="label">Client Name</div>
        <div class="value">
          ${escapeHtml(clientName)}
        </div>
      </div>

      <div class="field-group">
        <div class="label">Client Email</div>

        <div class="value">
          <a
            href="mailto:${escapeHtml(clientEmail)}"
            style="color:#2563eb;text-decoration:none;"
          >
            ${escapeHtml(clientEmail)}
          </a>
        </div>
      </div>

      <div class="field-group">
        <div class="label">Phone / WhatsApp</div>

        <div class="value">
          ${escapeHtml(clientPhone)}
        </div>
      </div>

      <div class="field-group">
        <div class="label">Selected Service</div>

        <div class="value">
          <span class="badge">
            ${escapeHtml(selectedService)}
          </span>
        </div>
      </div>

      ${
        clientBudget
          ? `
      <div class="field-group">
        <div class="label">Budget Range</div>

        <div class="value">
          ${escapeHtml(clientBudget)}
        </div>
      </div>
      `
          : ''
      }

      ${
        bookType
          ? `
      <div class="field-group">
        <div class="label">Book Genre / Type</div>

        <div class="value">
          ${escapeHtml(bookType)}
        </div>
      </div>
      `
          : ''
      }

      ${
        hasDesign
          ? `
      <div class="field-group">
        <div class="label">Design Status</div>

        <div class="value">
          ${escapeHtml(hasDesign)}
        </div>
      </div>
      `
          : ''
      }

      <div class="field-group">
        <div class="label">
          Client Message / Project Details
        </div>

        <div class="message-box">
          ${escapeHtml(clientMessage)}
        </div>
      </div>

      <div class="field-group">
        <div class="label">
          Submission Date & Time
        </div>

        <div
          class="value"
          style="font-size:13px;color:#64748b;"
        >
          ${submissionDate}
        </div>
      </div>

    </div>

    <div class="footer">
      Sent automatically via BigTeeWise Digital Backend.
      You can reply directly to this email to respond to
      ${escapeHtml(clientName)}.
    </div>

  </div>

</body>
</html>
`;

    // =========================================================
    // 8. PLAIN TEXT EMAIL
    // =========================================================

    const textContent = `
NEW BIGTEEWISE DIGITAL INQUIRY

Client Name: ${clientName}
Client Email: ${clientEmail}
Phone/WhatsApp: ${clientPhone}
Service Needed: ${selectedService}
${
  clientBudget
    ? `Budget Range: ${clientBudget}\n`
    : ''
}${
  bookType
    ? `Book Genre/Type: ${bookType}\n`
    : ''
}${
  hasDesign
    ? `Design Status: ${hasDesign}\n`
    : ''
}

Message/Details:
${clientMessage}

Submission Timestamp:
${submissionDate}

Reply to this email directly to answer ${clientName}.
`.trim();

    // =========================================================
    // 9. RESEND SENDER
    // =========================================================

    const senderEmail =
      process.env.SENDER_EMAIL ||
      'BigTeeWise Inquiries <onboarding@resend.dev>';

    // =========================================================
    // 10. SEND EMAIL
    // =========================================================

    let emailData;

    try {
      emailData = await resend.emails.send({
        from: senderEmail,
        to: [recipientEmail],
        reply_to: clientEmail,
        subject: emailSubject,
        html: htmlContent,
        text: textContent,
      });
    } catch (resendError) {
      console.error('[CONTACT API] Resend Exception:', {
        name: resendError?.name,
        message: resendError?.message,
      });

      return NextResponse.json(
        {
          success: false,
          error:
            'Your inquiry was saved, but we could not send the email notification.',
          inquiryId: savedInquiry._id,
        },
        { status: 500 }
      );
    }

    // =========================================================
    // 11. CHECK RESEND RESPONSE
    // =========================================================

    if (emailData?.error) {
      console.error('[CONTACT API] Resend API Error:', {
        message: emailData.error.message,
        name: emailData.error.name,
      });

      return NextResponse.json(
        {
          success: false,
          error:
            'Your inquiry was saved, but the email notification could not be sent.',
          inquiryId: savedInquiry._id,
        },
        { status: 500 }
      );
    }

    // =========================================================
    // 12. SUCCESS
    // =========================================================

    console.log(
      '[CONTACT API] Inquiry completed successfully:',
      savedInquiry._id.toString()
    );

    return NextResponse.json(
      {
        success: true,
        message:
          'Your inquiry has been successfully saved and sent to BigTeeWise Digital!',
        inquiryId: savedInquiry._id,
      },
      { status: 200 }
    );
  } catch (error) {
    // =========================================================
    // GLOBAL ERROR
    // =========================================================

    console.error('[CONTACT API] Unexpected Error:', {
      name: error?.name,
      message: error?.message,
      stack: error?.stack,
    });

    return NextResponse.json(
      {
        success: false,
        error:
          'An unexpected server error occurred. Please try again later.',
      },
      { status: 500 }
    );
  }
}

// =============================================================
// HTML ESCAPE HELPER
// =============================================================

function escapeHtml(str) {
  if (typeof str !== 'string') {
    return '';
  }

  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}