import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import NewsletterSubscriberModel from '@/models/NewsletterSubscriber';
import { verifyAdminSessionOrThrow } from '@/lib/auth';

export async function GET() {
  try {
    await verifyAdminSessionOrThrow();
    await connectToDatabase();
    const subscribers = await NewsletterSubscriberModel.find().sort({ subscribedAt: -1 });
    return NextResponse.json(subscribers);
  } catch (err: any) {
    if (err.message === 'Unauthorized') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
