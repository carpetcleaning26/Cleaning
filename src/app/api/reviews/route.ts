import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import TestimonialModel from '@/models/Testimonial';
import { getPublicTestimonials } from '@/lib/publicData';

export async function GET() {
  const reviews = await getPublicTestimonials();
  return NextResponse.json({
    success: true,
    reviews,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { author, suburb, rating, service, comment } = body;

    if (!author || !comment || !suburb) {
      return NextResponse.json(
        { success: false, error: 'Author name, suburb, and review comment are required.' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const newReview = await TestimonialModel.create({
      id: `r-${Date.now()}`,
      author,
      suburb,
      rating: Number(rating) || 5,
      date: 'Just now',
      service: service || 'Carpet Steam Cleaning',
      comment,
      avatarBg: 'from-[#0284c7] to-sky-600',
      published: true,
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your review has been published.',
      review: newReview,
    });
  } catch (error: any) {
    console.error('Error submitting review:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
