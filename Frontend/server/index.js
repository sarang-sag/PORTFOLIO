const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Gmail Transporter configuration
const GMAIL_USER = 'sarangsag86@gmail.com';
const GMAIL_PASS = 'ojpj gcqo nvml fyqt';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS
  }
});

// Verify SMTP connection on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Gmail Transporter Error:', error);
  } else {
    console.log('✅ Gmail Transporter is ready to send emails');
  }
});

// API Endpoint to send emails
app.post('/api/send-email', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields (name, email, subject, message)'
      });
    }

    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium'
    });

    // 1. Mail to Sarang V (Inquiry Notification)
    const adminMailOptions = {
      from: `"Portfolio Contact Form" <${GMAIL_USER}>`,
      to: GMAIL_USER,
      replyTo: email,
      subject: `📬 Portfolio Inquiry: ${subject} (from ${name})`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0f172a; color: #f8fafc; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1);">
          <div style="background: linear-gradient(135deg, #00f2fe 0%, #4facfe 100%); padding: 24px; color: #0f172a;">
            <h2 style="margin: 0; font-size: 22px; font-weight: 700;">New Inquiry Received!</h2>
            <p style="margin: 4px 0 0 0; font-size: 14px; opacity: 0.9;">Portfolio Contact Form Submission</p>
          </div>
          <div style="padding: 24px;">
            <div style="margin-bottom: 16px; padding: 12px; background: rgba(255,255,255,0.05); border-radius: 8px;">
              <p style="margin: 0 0 8px 0; font-size: 14px; color: #94a3b8;">Sender Details:</p>
              <p style="margin: 0 0 4px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 0 0 4px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #00f2fe;">${email}</a></p>
              <p style="margin: 0;"><strong>Received:</strong> ${timestamp}</p>
            </div>
            
            <div style="margin-bottom: 16px;">
              <p style="margin: 0 0 6px 0; font-size: 14px; color: #94a3b8;">Subject:</p>
              <p style="margin: 0; font-size: 16px; font-weight: 600; color: #38bdf8;">${subject}</p>
            </div>

            <div>
              <p style="margin: 0 0 6px 0; font-size: 14px; color: #94a3b8;">Message:</p>
              <div style="background: rgba(15, 23, 42, 0.9); padding: 16px; border-radius: 8px; border-left: 4px solid #00f2fe; white-space: pre-wrap; font-size: 15px; line-height: 1.6; color: #e2e8f0;">
${message}
              </div>
            </div>
          </div>
          <div style="padding: 16px 24px; background-color: #090d16; text-align: center; font-size: 12px; color: #64748b;">
            Sent automatically from your Portfolio Web App
          </div>
        </div>
      `
    };

    // 2. Auto-reply Mail to Inquirer (Thank You & Contact Back Soon)
    const userReplyMailOptions = {
      from: `"Sarang V" <${GMAIL_USER}>`,
      to: email,
      subject: `Thank you for getting in touch, ${name}!`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0f172a; color: #f8fafc; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1);">
          <div style="background: linear-gradient(135deg, #00f2fe 0%, #4facfe 100%); padding: 28px; color: #0f172a;">
            <h1 style="margin: 0; font-size: 24px; font-weight: 800;">Thank You for Reaching Out!</h1>
            <p style="margin: 6px 0 0 0; font-size: 15px; opacity: 0.9;">I've received your message and will get back to you soon.</p>
          </div>
          
          <div style="padding: 28px; font-size: 15px; line-height: 1.7; color: #cbd5e1;">
            <p style="margin-top: 0;">Hi <strong>${name}</strong>,</p>
            <p>Thank you for visiting my portfolio and submitting an inquiry regarding <strong>"${subject}"</strong>.</p>
            
            <div style="background: rgba(0, 242, 254, 0.08); border: 1px solid rgba(0, 242, 254, 0.2); padding: 18px; border-radius: 10px; margin: 20px 0;">
              <p style="margin: 0; color: #38bdf8; font-weight: 500;">
                ✨ <strong>Status:</strong> Message Received. I am reviewing your request and will respond directly to <strong>${email}</strong> as soon as possible.
              </p>
            </div>

            <p style="margin-bottom: 24px;">In the meantime, feel free to connect with me or review my work:</p>

            <div style="display: flex; gap: 12px; margin-bottom: 28px;">
              <a href="https://linkedin.com" style="background: #1e293b; color: #38bdf8; text-decoration: none; padding: 10px 18px; border-radius: 8px; font-weight: 600; font-size: 14px; border: 1px solid rgba(56, 189, 248, 0.3);">
                Connect on LinkedIn
              </a>
              <a href="https://github.com" style="background: #1e293b; color: #818cf8; text-decoration: none; padding: 10px 18px; border-radius: 8px; font-weight: 600; font-size: 14px; border: 1px solid rgba(129, 140, 248, 0.3);">
                Explore GitHub Repos
              </a>
            </div>

            <p style="margin-bottom: 0;">Warm regards,<br><strong style="color: #f8fafc; font-size: 16px;">Sarang V</strong><br><span style="color: #94a3b8; font-size: 14px;">Project Delivery Engineer & Software Developer</span></p>
          </div>

          <div style="padding: 16px 24px; background-color: #090d16; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid rgba(255,255,255,0.05);">
            This is an automated acknowledgment sent from sarangsag86@gmail.com
          </div>
        </div>
      `
    };

    // Send both emails concurrently
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userReplyMailOptions)
    ]);

    console.log(`✅ Dual emails sent successfully for inquiry: "${subject}" from ${email}`);
    
    return res.status(200).json({
      success: true,
      message: 'Emails dispatched successfully'
    });

  } catch (error) {
    console.error('❌ Error sending emails via Nodemailer:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to send email. Please try again later.',
      details: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Portfolio Email Backend listening on http://localhost:${PORT}`);
});
