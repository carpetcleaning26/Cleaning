import nodemailer from 'nodemailer';

const user = process.env.GMAIL_USER || '';
const pass = process.env.GMAIL_APP_PASSWORD || '';
const defaultTo = process.env.NOTIFICATION_EMAIL_TO || 'info@canberracarpetcleaningdeals.com.au';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user,
    pass,
  },
});

export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendMail(options: SendEmailOptions): Promise<boolean> {
  // If SMTP password is placeholder/unconfigured, log gracefully in dev
  if (!pass || pass === 'demo_app_password') {
    console.log(`[Mailer Mock] Email to ${options.to} | Subject: ${options.subject}`);
    return true;
  }

  try {
    await transporter.sendMail({
      from: `"Canberra Carpet Cleaning Deals" <${user}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text || options.subject,
    });
    return true;
  } catch (error) {
    console.error('[Mailer Error] Failed to send email:', error);
    return false;
  }
}

// 1. Quote Admin Notification Email
export function generateAdminQuoteEmail(quote: any): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded: 12px;">
      <h2 style="color: #0284c7; margin-bottom: 5px;">⚡ New Online Quote Submission Received</h2>
      <p style="color: #64748b; font-size: 14px; margin-top: 0;">Ref ID: <strong>${quote.referenceId || 'N/A'}</strong></p>
      
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <tr style="background-color: #f8fafc;"><td style="padding: 10px; font-weight: bold; width: 35%;">Customer Name:</td><td style="padding: 10px;">${quote.customerName}</td></tr>
        <tr><td style="padding: 10px; font-weight: bold;">Phone:</td><td style="padding: 10px;"><a href="tel:${quote.phone}">${quote.phone}</a></td></tr>
        <tr style="background-color: #f8fafc;"><td style="padding: 10px; font-weight: bold;">Email:</td><td style="padding: 10px;">${quote.email}</td></tr>
        <tr><td style="padding: 10px; font-weight: bold;">Property Address:</td><td style="padding: 10px;">${quote.address}, ${quote.suburb}</td></tr>
        <tr style="background-color: #f8fafc;"><td style="padding: 10px; font-weight: bold;">Property Type:</td><td style="padding: 10px;">${quote.propertyType || 'Residential'}</td></tr>
        <tr><td style="padding: 10px; font-weight: bold;">Total Amount:</td><td style="padding: 10px; font-size: 18px; font-weight: bold; color: #10b981;">$${quote.totalAmount} AUD</td></tr>
      </table>

      <h3 style="color: #0b132b; margin-top: 20px;">Selected Services</h3>
      <ul style="color: #334155; padding-left: 20px;">
        ${Array.isArray(quote.selectedServices) ? quote.selectedServices.map((s: any) => `<li>${typeof s === 'string' ? s : `${s.name} (${s.quantity || 1})`}</li>`).join('') : 'Standard Package'}
      </ul>
      
      <div style="margin-top: 25px; padding: 15px; background-color: #0b132b; color: white; border-radius: 8px; text-align: center;">
        <a href="tel:${quote.phone}" style="color: #10b981; text-decoration: none; font-weight: bold; font-size: 16px;">Call Customer Now: ${quote.phone}</a>
      </div>
    </div>
  `;
}

// 2. Customer Quote Confirmation Email
export function generateCustomerQuoteEmail(quote: any): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
      <h2 style="color: #0284c7; margin-bottom: 5px;">Canberra Carpet Cleaning Deals</h2>
      <h3 style="color: #0b132b; margin-top: 0;">Thank You for Your Booking Request!</h3>
      <p style="color: #475569; font-size: 14px;">Hi ${quote.customerName}, we have received your instant quote calculation. Your 20% online booking discount has been auto-applied.</p>
      
      <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <div style="font-size: 12px; text-transform: uppercase; color: #64748b; font-weight: bold;">Estimated Total</div>
        <div style="font-size: 28px; font-weight: 900; color: #10b981;">$${quote.totalAmount} AUD</div>
        <div style="font-size: 12px; color: #0284c7; margin-top: 4px;">Zero upfront deposit required • Pay on completion</div>
      </div>

      <p style="color: #475569; font-size: 14px;">Our friendly Taylor, ACT team will contact you shortly to confirm your scheduled time slot. For urgent inquiries, call us directly at <strong>0481 734 225</strong>.</p>
    </div>
  `;
}

// 3. Contact Form Admin Email
export function generateContactEmail(contact: any): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
      <h2 style="color: #0284c7;">📩 New Website Contact Form Message</h2>
      <p><strong>Name:</strong> ${contact.name}</p>
      <p><strong>Email:</strong> ${contact.email}</p>
      <p><strong>Phone:</strong> ${contact.phone || 'N/A'}</p>
      <p><strong>Suburb:</strong> ${contact.suburb || 'N/A'}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="background: #f8fafc; padding: 12px; border-left: 4px solid #0284c7; margin: 0;">${contact.message}</blockquote>
    </div>
  `;
}
