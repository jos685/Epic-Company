import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

// Initialize Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, phone, service, budget, message } = body;

    // Validate required fields
    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Save to Supabase
    const { data: submission, error: dbError } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name,
          email,
          company: company || null,
          phone: phone || null,
          service,
          budget: budget || null,
          message,
        },
      ])
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Failed to save submission' },
        { status: 500 }
      );
    }

    // Send email notification
    try {
      const mailOptions = {
        from: process.env.SMTP_FROM_EMAIL,
        to: process.env.NOTIFICATION_EMAIL || 'info@epicsoftwares.shop',
        subject: `New Contact Form Submission: ${service}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
                .field { margin-bottom: 15px; }
                .label { font-weight: bold; color: #667eea; }
                .value { color: #666; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>New Project Inquiry</h1>
                  <p>You have received a new contact form submission</p>
                </div>
                <div class="content">
                  <div class="field">
                    <span class="label">Name:</span>
                    <span class="value">${name}</span>
                  </div>
                  <div class="field">
                    <span class="label">Email:</span>
                    <span class="value">${email}</span>
                  </div>
                  <div class="field">
                    <span class="label">Company:</span>
                    <span class="value">${company || 'Not provided'}</span>
                  </div>
                  <div class="field">
                    <span class="label">Phone:</span>
                    <span class="value">${phone || 'Not provided'}</span>
                  </div>
                  <div class="field">
                    <span class="label">Service:</span>
                    <span class="value">${service}</span>
                  </div>
                  <div class="field">
                    <span class="label">Budget:</span>
                    <span class="value">${budget || 'Not specified'}</span>
                  </div>
                  <div class="field">
                    <span class="label">Message:</span>
                    <div class="value" style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #667eea; margin-top: 5px;">
                      ${message.replace(/\n/g, '<br>')}
                    </div>
                  </div>
                  <div class="field" style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd;">
                    <p><small>This message was sent from your website contact form on ${new Date().toLocaleString()}</small></p>
                  </div>
                </div>
              </div>
            </body>
          </html>
        `,
      };

      await transporter.sendMail(mailOptions);

      // Send auto-reply to the user
      const autoReplyOptions = {
        from: process.env.SMTP_FROM_EMAIL,
        to: email,
        subject: 'Thank you for contacting Epic Softwares',
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
                .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Thank You for Reaching Out!</h1>
                </div>
                <div class="content">
                  <p>Hello <strong>${name}</strong>,</p>
                  
                  <p>Thank you for contacting <strong>Epic Softwares</strong>. We have received your inquiry regarding <strong>${service}</strong> and we're excited to learn more about your project.</p>
                  
                  <p><strong>What happens next?</strong></p>
                  <ul>
                    <li>Our team will review your requirements within 24 hours</li>
                    <li>We'll contact you to discuss your project in detail</li>
                    <li>We'll provide a comprehensive proposal and timeline</li>
                  </ul>
                  
                  <p>In the meantime, feel free to explore our services or check out our portfolio.</p>
                  
                  <p><strong>Quick Contact:</strong><br>
                  📧 info@epicsoftwares.shop<br>
                  📞 +254 768 131 905</p>
                  
                  <p>Best regards,<br>
                  <strong>The Epic Softwares Team</strong></p>
                </div>
                <div class="footer">
                  <p>This is an automated response. Please do not reply to this email.</p>
                </div>
              </div>
            </body>
          </html>
        `,
      };

      await transporter.sendMail(autoReplyOptions);

    } catch (emailError) {
      console.error('Email sending error:', emailError);
      // Don't fail the request if email fails - just log it
    }

    return NextResponse.json({
      success: true,
      message: 'Submission received successfully',
      submissionId: submission.id,
    });

  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}