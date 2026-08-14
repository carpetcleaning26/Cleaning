import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import QuoteSubmissionModel from '@/models/QuoteSubmission';
import { verifyAdminSessionOrThrow } from '@/lib/auth';

export async function GET() {
  try {
    await verifyAdminSessionOrThrow();
    await connectToDatabase();
    const quotes = await QuoteSubmissionModel.find().sort({ createdAt: -1 });
    return NextResponse.json(quotes);
  } catch (err: any) {
    if (err.message === 'Unauthorized') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
