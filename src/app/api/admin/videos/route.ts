import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import VideoItemModel from '@/models/VideoItem';
import { verifyAdminSessionOrThrow } from '@/lib/auth';

export async function GET() {
  try {
    await connectToDatabase();
    const videos = await VideoItemModel.find().sort({ displayOrder: 1, createdAt: -1 });
    return NextResponse.json(videos);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await verifyAdminSessionOrThrow();
    await connectToDatabase();
    const body = await req.json();
    const video = await VideoItemModel.create(body);
    return NextResponse.json(video, { status: 201 });
  } catch (err: any) {
    if (err.message === 'Unauthorized') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
