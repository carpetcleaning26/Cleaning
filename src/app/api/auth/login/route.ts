import { NextResponse } from 'next/server';
import { z } from 'zod';
import connectToDatabase from '@/lib/mongodb';
import AdminUserModel from '@/models/AdminUser';
import { verifyPassword, hashPassword, signToken, TOKEN_NAME } from '@/lib/auth';

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

    const { email, password } = parsed.data;
    const inputEmail = email.toLowerCase().trim();

    const envAdminEmail = (process.env.ADMIN_EMAIL || 'admin@canberracarpetcleaningdeals.com.au').toLowerCase().trim();
    const envAdminPass = process.env.ADMIN_PASSWORD || 'AdminPass2026!';

    let authenticated = false;
    let adminUserId = 'admin-fallback-id';

    // 1. First check against environment credentials for instant login
    if (inputEmail === envAdminEmail && password === envAdminPass) {
      authenticated = true;
    }

    // 2. Only query MongoDB if not already authenticated via env credentials
    if (!authenticated) {
      try {
        await connectToDatabase();

        let admin = await AdminUserModel.findOne({ email: inputEmail });

        if (!admin) {
          const totalAdmins = await AdminUserModel.countDocuments();
          if (totalAdmins === 0) {
            const passHash = await hashPassword(envAdminPass);
            admin = await AdminUserModel.create({
              email: envAdminEmail,
              passwordHash: passHash,
              role: 'admin',
              lastLogin: new Date(),
            });
          }
        }

        if (admin) {
          adminUserId = admin._id.toString();
          const isMatch = await verifyPassword(password, admin.passwordHash);
          if (isMatch) {
            authenticated = true;
            admin.lastLogin = new Date();
            admin.save().catch(() => {});
          }
        }
      } catch (dbErr) {
        console.warn('[Admin Auth] MongoDB connection warning during login:', dbErr);
      }
    }

    if (!authenticated) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const token = signToken({
      userId: adminUserId,
      email: inputEmail,
      role: 'admin',
    });

    const response = NextResponse.json({
      success: true,
      user: { email: inputEmail, role: 'admin' },
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
