import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import ServiceModel from '@/models/Service';
import { verifyAdminSessionOrThrow } from '@/lib/auth';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await verifyAdminSessionOrThrow();
    const { id } = await params;
    await connectToDatabase();
    const body = await req.json();
    const service = await ServiceModel.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json(service);
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
    await ServiceModel.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    if (err.message === 'Unauthorized') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
