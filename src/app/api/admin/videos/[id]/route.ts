import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import VideoItemModel from '@/models/VideoItem';
import { verifyAdminSessionOrThrow } from '@/lib/auth';
import { deleteFromR2 } from '@/lib/r2';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await verifyAdminSessionOrThrow();
    const { id } = await params;
    await connectToDatabase();
    const body = await req.json();
    const video = await VideoItemModel.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json(video);
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
    const video = await VideoItemModel.findByIdAndDelete(id);
    if (video && video.videoUrl) {
      await deleteFromR2(video.videoUrl);
    }
    return NextResponse.json({ success: true });
  } catch (err: any) {
    if (err.message === 'Unauthorized') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
