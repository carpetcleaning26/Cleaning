import { NextResponse } from 'next/server';
import { REVIEWS, ReviewItem } from '@/data/cleaningData';

const reviewsList: ReviewItem[] = [...REVIEWS];

export async function GET() {
  return NextResponse.json({
    success: true,
    reviews: reviewsList
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

    const newReview: ReviewItem = {
      id: `r-${Date.now()}`,
      author,
      suburb,
      rating: Number(rating) || 5,
      date: 'Just now',
      service: service || 'Carpet Steam Cleaning',
      comment,
      avatarBg: 'from-teal-500 to-cyan-600'
    };

    reviewsList.unshift(newReview);

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your review has been published.',
      review: newReview
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
