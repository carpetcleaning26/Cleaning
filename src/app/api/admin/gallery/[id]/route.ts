import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import GalleryItemModel from '@/models/GalleryItem';
import { verifyAdminSessionOrThrow } from '@/lib/auth';
import { deleteFromR2 } from '@/lib/r2';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await verifyAdminSessionOrThrow();
    const { id } = await params;
    await connectToDatabase();
    const body = await req.json();
    const item = await GalleryItemModel.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json(item);
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
    const item = await GalleryItemModel.findByIdAndDelete(id);
    if (item && item.url) {
      await deleteFromR2(item.url);
    }
    return NextResponse.json({ success: true });
  } catch (err: any) {
    if (err.message === 'Unauthorized') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
