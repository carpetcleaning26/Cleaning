import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import SuburbModel from '@/models/Suburb';
import { verifyAdminSessionOrThrow } from '@/lib/auth';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await verifyAdminSessionOrThrow();
    const { id } = await params;
    await connectToDatabase();
    const body = await req.json();
    const suburb = await SuburbModel.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json(suburb);
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
    await SuburbModel.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    if (err.message === 'Unauthorized') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
