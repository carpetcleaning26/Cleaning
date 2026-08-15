import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import ServiceModel from '@/models/Service';
import { verifyAdminSessionOrThrow } from '@/lib/auth';

export async function GET() {
  try {
    await connectToDatabase();
    const services = await ServiceModel.find().sort({ displayOrder: 1, createdAt: -1 });
    return NextResponse.json(services);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await verifyAdminSessionOrThrow();
    await connectToDatabase();
    const body = await req.json();

    const name = body.name || body.title || 'New Service';
    const slug = body.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `service-${Date.now()}`;

    const payload = {
      ...body,
      id: body.id || `service-${Date.now()}`,
      slug,
      name,
      title: body.title || name,
      navTitle: body.navTitle || name,
      category: body.category || 'GENERAL',
      shortDesc: body.shortDesc || 'Professional cleaning service in Canberra ACT.',
      fullDesc: body.fullDesc || body.shortDesc || 'Professional cleaning service in Canberra ACT.',
      startingPrice: body.startingPrice || '$27',
      unit: body.unit || 'per room',
      image: body.image || '/pictures/real_image_1.jpeg',
      displayOrder: body.displayOrder ?? 0,
      published: body.published !== false,
    };

    const service = await ServiceModel.create(payload);
    return NextResponse.json(service, { status: 201 });
  } catch (err: any) {
    if (err.message === 'Unauthorized') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    console.error('Service creation error:', err);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
