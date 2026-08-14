import { NextResponse } from 'next/server';
import { verifyAdminSessionOrThrow } from '@/lib/auth';
import { uploadToR2 } from '@/lib/r2';

export async function POST(req: Request) {
  try {
    // Verify admin authentication session
    await verifyAdminSessionOrThrow();

    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const fileUrl = await uploadToR2(buffer, file.name, file.type);

    return NextResponse.json({
      success: true,
      url: fileUrl,
      fileName: file.name,
      size: file.size,
    });
  } catch (err: any) {
    if (err.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Upload error:', err);
    return NextResponse.json({ error: 'Failed to upload file to Cloudflare R2' }, { status: 500 });
  }
}
