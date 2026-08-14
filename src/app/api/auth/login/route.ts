import { NextResponse } from 'next/server';
import { z } from 'zod';
import connectToDatabase from '@/lib/mongodb';
import AdminUserModel from '@/models/AdminUser';
import { verifyPassword, signToken, TOKEN_NAME } from '@/lib/auth';

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = LoginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid credentials payload' }, { status: 400 });
    }

    await connectToDatabase();

    const { email, password } = parsed.data;
    const admin = await AdminUserModel.findOne({ email: email.toLowerCase() });

    if (!admin) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const isMatch = await verifyPassword(password, admin.passwordHash);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    admin.lastLogin = new Date();
    await admin.save();

    const token = signToken({
      userId: admin._id.toString(),
      email: admin.email,
      role: admin.role,
    });

    const response = NextResponse.json({
      success: true,
      user: { email: admin.email, role: admin.role },
    });

    response.cookies.set({
      name: TOKEN_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (err: any) {
    console.error('Login API error:', err);
    return NextResponse.json({ error: 'Server error during login' }, { status: 500 });
  }
}
