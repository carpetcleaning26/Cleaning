import { NextResponse } from 'next/server';
import { z } from 'zod';
import connectToDatabase from '@/lib/mongodb';
import ContactSubmissionModel from '@/models/ContactSubmission';
import { sendMail, generateContactEmail } from '@/lib/mailer';

const ContactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  suburb: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
  websiteHoneypot: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = ContactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid contact input', details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { name, email, phone, suburb, message, websiteHoneypot } = parsed.data;

    // Honeypot spam check
    if (websiteHoneypot && websiteHoneypot.trim() !== '') {
      console.warn('[Spam Rejection] Bot honeypot triggered on contact form');
      return NextResponse.json({ success: true });
    }

    await connectToDatabase();

    const contactDoc = await ContactSubmissionModel.create({
      name,
      email,
      phone,
      suburb,
      message,
      status: 'new',
    });

    const notificationEmail = process.env.NOTIFICATION_EMAIL_TO || 'info@canberracarpetcleaningdeals.com.au';

    sendMail({
      to: notificationEmail,
      subject: `📩 Website Contact Message from ${name}`,
      html: generateContactEmail(contactDoc),
    });

    return NextResponse.json({ success: true, message: 'Message sent successfully' });
  } catch (err: any) {
    console.error('Contact submission error:', err);
    return NextResponse.json({ error: 'Server error sending message' }, { status: 500 });
  }
}
