import { NextResponse } from 'next/server';
import { BookingRecord } from '@/data/cleaningData';

// In-memory store for demonstration (persists during server lifetime)
const bookingsDb: Map<string, BookingRecord> = new Map();

// Helper to generate unique reference code e.g. ACT-892410
function generateRefCode(): string {
  const num = Math.floor(100000 + Math.random() * 900000);
  return `ACT-${num}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      customerName,
      email,
      phone,
      address,
      suburb,
      serviceId,
      serviceTitle,
      roomsCount,
      addons = [],
      preferredDate,
      preferredTime,
      estimatedPrice
    } = body;

    // Validation
    if (!customerName || !phone || !suburb) {
      return NextResponse.json(
        { success: false, error: 'Name, phone number, and suburb are required.' },
        { status: 400 }
      );
    }

    const referenceId = generateRefCode();
    const newBooking: BookingRecord = {
      referenceId,
      customerName,
      email: email || 'Not provided',
      phone,
      address: address || `${suburb}, Canberra ACT`,
      suburb,
      serviceId: serviceId || 'carpet-steam',
      serviceTitle: serviceTitle || 'Carpet Steam Cleaning',
      roomsCount: Number(roomsCount) || 3,
      addons: Array.isArray(addons) ? addons : [],
      preferredDate: preferredDate || new Date().toISOString().split('T')[0],
      preferredTime: preferredTime || 'Morning (8am - 12pm)',
      estimatedPrice: Number(estimatedPrice) || 89,
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };

    bookingsDb.set(referenceId, newBooking);

    return NextResponse.json({
      success: true,
      message: 'Booking request confirmed successfully!',
      referenceId,
      booking: newBooking
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ref = searchParams.get('ref');

  if (ref) {
    const booking = bookingsDb.get(ref.toUpperCase());
    if (booking) {
      return NextResponse.json({ success: true, booking });
    }
    return NextResponse.json(
      { success: false, error: `No booking found for reference ${ref}` },
      { status: 404 }
    );
  }

  // Return recent summary
  const recent = Array.from(bookingsDb.values()).slice(-10);
  return NextResponse.json({
    success: true,
    totalBookings: bookingsDb.size,
    recentBookings: recent
  });
}
