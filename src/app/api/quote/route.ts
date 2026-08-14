import { NextResponse } from 'next/server';
import { z } from 'zod';
import connectToDatabase from '@/lib/mongodb';
import QuoteSubmissionModel from '@/models/QuoteSubmission';
import { sendMail, generateAdminQuoteEmail, generateCustomerQuoteEmail } from '@/lib/mailer';

const QuoteSchema = z.object({
  customerName: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(6, 'Valid phone number is required'),
  address: z.string().min(1, 'Address is required'),
  suburb: z.string().min(1, 'Suburb is required'),
  propertyType: z.string().optional(),
  selectedServices: z.array(z.any()).min(1, 'At least one service required'),
  totalAmount: z.number().min(0),
  discountApplied: z.boolean().optional().default(true),
  websiteHoneypot: z.string().optional(), // Spam bot trap field
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = QuoteSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid form input', details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { websiteHoneypot, customerName, email, phone, address, suburb, propertyType, selectedServices, totalAmount, discountApplied } = parsed.data;

    // Honeypot check: If bot filled hidden honeypot field, silently reject
    if (websiteHoneypot && websiteHoneypot.trim() !== '') {
      console.warn('[Spam Rejection] Bot honeypot triggered on quote submission');
      return NextResponse.json({ success: true, referenceId: 'CCCD-SPAM' });
    }

    await connectToDatabase();

    const referenceId = `CCCD-${Math.floor(100000 + Math.random() * 900000)}`;

    const quoteDoc = await QuoteSubmissionModel.create({
      referenceId,
      customerName,
      email,
      phone,
      address,
      suburb,
      propertyType: propertyType || 'Residential',
      selectedServices,
      totalAmount,
      discountApplied,
      status: 'new',
    });

    const notificationEmail = process.env.NOTIFICATION_EMAIL_TO || 'info@canberracarpetcleaningdeals.com.au';

    // Send emails asynchronously
    sendMail({
      to: notificationEmail,
      subject: `⚡ New Quote Request: ${referenceId} - ${customerName}`,
      html: generateAdminQuoteEmail(quoteDoc),
    });

    sendMail({
      to: email,
      subject: `Booking Request Confirmation - Canberra Carpet Cleaning Deals (${referenceId})`,
      html: generateCustomerQuoteEmail(quoteDoc),
    });

    return NextResponse.json({
      success: true,
      referenceId,
      message: 'Quote submitted successfully',
    });
  } catch (err: any) {
    console.error('Quote submission error:', err);
    return NextResponse.json({ error: 'Server error saving quote request' }, { status: 500 });
  }
}
