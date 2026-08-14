import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import ContactSubmissionModel from '@/models/ContactSubmission';
import { verifyAdminSessionOrThrow } from '@/lib/auth';

export async function GET() {
  try {
    await verifyAdminSessionOrThrow();
    await connectToDatabase();
    const contacts = await ContactSubmissionModel.find().sort({ createdAt: -1 });
    return NextResponse.json(contacts);
  } catch (err: any) {
    if (err.message === 'Unauthorized') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
