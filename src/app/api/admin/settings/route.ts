import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import SiteSettingsModel from '@/models/SiteSettings';
import { verifyAdminSessionOrThrow } from '@/lib/auth';

export async function GET() {
  try {
    await connectToDatabase();
    let settings = await SiteSettingsModel.findOne();
    if (!settings) {
      settings = await SiteSettingsModel.create({});
    }
    return NextResponse.json(settings);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await verifyAdminSessionOrThrow();
    await connectToDatabase();
    const body = await req.json();
    let settings = await SiteSettingsModel.findOne();
    if (settings) {
      settings = await SiteSettingsModel.findByIdAndUpdate(settings._id, body, { new: true });
    } else {
      settings = await SiteSettingsModel.create(body);
    }
    return NextResponse.json(settings);
  } catch (err: any) {
    if (err.message === 'Unauthorized') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
