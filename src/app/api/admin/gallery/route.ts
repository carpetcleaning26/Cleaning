import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import GalleryItemModel from '@/models/GalleryItem';
import { verifyAdminSessionOrThrow } from '@/lib/auth';
import { deleteFromR2 } from '@/lib/r2';

export async function GET() {
  try {
    await connectToDatabase();
    const items = await GalleryItemModel.find().sort({ displayOrder: 1, createdAt: -1 });
    return NextResponse.json(items);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await verifyAdminSessionOrThrow();
    await connectToDatabase();
    const body = await req.json();
    const item = await GalleryItemModel.create(body);
    return NextResponse.json(item, { status: 201 });
  } catch (err: any) {
    if (err.message === 'Unauthorized') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
