import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import QuoteSubmissionModel from '@/models/QuoteSubmission';
import { verifyAdminSessionOrThrow } from '@/lib/auth';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await verifyAdminSessionOrThrow();
    const { id } = await params;
    await connectToDatabase();
    const body = await req.json();
    const quote = await QuoteSubmissionModel.findByIdAndUpdate(id, { status: body.status }, { new: true });
    return NextResponse.json(quote);
  } catch (err: any) {
    if (err.message === 'Unauthorized') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await verifyAdminSessionOrThrow();
    const { id } = await params;
    await connectToDatabase();
    await QuoteSubmissionModel.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    if (err.message === 'Unauthorized') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
