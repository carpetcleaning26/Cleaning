import { NextResponse } from 'next/server';
import { z } from 'zod';
import connectToDatabase from '@/lib/mongodb';
import NewsletterSubscriberModel from '@/models/NewsletterSubscriber';
import { sendMail } from '@/lib/mailer';

const NewsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = NewsletterSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Please enter a valid email' }, { status: 400 });
    }

    await connectToDatabase();

    const { email } = parsed.data;

    await NewsletterSubscriberModel.findOneAndUpdate(
      { email: email.toLowerCase() },
      { email: email.toLowerCase(), subscribedAt: new Date() },
      { upsert: true, new: true }
    );

    sendMail({
      to: email,
      subject: 'Welcome to Canberra Carpet Cleaning Deals Newsletter!',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 500px;">
          <h2 style="color: #0284c7;">Welcome to Our Newsletter!</h2>
          <p>Thank you for subscribing to Canberra Carpet Cleaning Deals. You'll be the first to receive seasonal carpet care tips and exclusive ACT price drop alerts.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: 'Subscribed successfully' });
  } catch (err: any) {
    console.error('Newsletter error:', err);
    return NextResponse.json({ error: 'Server error subscribing to newsletter' }, { status: 500 });
  }
}
