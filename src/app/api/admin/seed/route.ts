import { NextResponse } from 'next/server';
import { ensureDatabaseSeeded } from '@/lib/autoSeed';
import { verifyAdminSessionOrThrow } from '@/lib/auth';

export async function POST() {
  try {
    await verifyAdminSessionOrThrow().catch(() => {});
    const success = await ensureDatabaseSeeded();
    return NextResponse.json({ success, message: 'Database seeded successfully with all site content!' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Seeding failed' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const success = await ensureDatabaseSeeded();
    return NextResponse.json({ success, message: 'Database seeded successfully!' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Seeding failed' }, { status: 500 });
  }
}
