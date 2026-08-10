import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, service, message } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: 'Name and phone number are required.' },
        { status: 400 }
      );
    }

    const ticketId = `CALL-${Math.floor(1000 + Math.random() * 9000)}`;

    return NextResponse.json({
      success: true,
      ticketId,
      message: `Thank you ${name}! Our Canberra dispatch team will call you at ${phone} within 15 minutes.`
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
