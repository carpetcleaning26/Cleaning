import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import SuburbModel from '@/models/Suburb';
import { verifyAdminSessionOrThrow } from '@/lib/auth';

export async function GET() {
  try {
    await connectToDatabase();
    const suburbs = await SuburbModel.find().sort({ displayOrder: 1, name: 1 });
    return NextResponse.json(suburbs);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await verifyAdminSessionOrThrow();
    await connectToDatabase();
    const body = await req.json();
    const suburb = await SuburbModel.create(body);
    return NextResponse.json(suburb, { status: 201 });
  } catch (err: any) {
    if (err.message === 'Unauthorized') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
