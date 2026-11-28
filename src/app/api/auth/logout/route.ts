import { NextResponse } from 'next/server';
import { TOKEN_NAME } from '@/lib/auth';

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL('/', request.url), 303);
  response.cookies.delete(TOKEN_NAME);
  return response;
}
