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

    const name = body.name || body.title;
    const payload = {
      ...body,
      name,
      title: body.title || name,
      navTitle: body.navTitle || name,
    };

    let service = await ServiceModel.findByIdAndUpdate(id, payload, { new: true });
    if (!service) {
      service = await ServiceModel.findOneAndUpdate({ id }, payload, { new: true });
    }
    return NextResponse.json(service);
  } catch (err: any) {
    if (err.message === 'Unauthorized') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    console.error('Service update error:', err);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await verifyAdminSessionOrThrow();
    const { id } = await params;
    await connectToDatabase();
    let res = await ServiceModel.findByIdAndDelete(id);
    if (!res) {
      await ServiceModel.findOneAndDelete({ id });
    }
    return NextResponse.json({ success: true });
  } catch (err: any) {
    if (err.message === 'Unauthorized') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
