import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import TestimonialModel from '@/models/Testimonial';
import { verifyAdminSessionOrThrow } from '@/lib/auth';

export async function GET() {
  try {
    await connectToDatabase();
    const testimonials = await TestimonialModel.find().sort({ displayOrder: 1, createdAt: -1 });
    return NextResponse.json(testimonials);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await verifyAdminSessionOrThrow();
    await connectToDatabase();
    const body = await req.json();
    const testimonial = await TestimonialModel.create(body);
    return NextResponse.json(testimonial, { status: 201 });
  } catch (err: any) {
    if (err.message === 'Unauthorized') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
