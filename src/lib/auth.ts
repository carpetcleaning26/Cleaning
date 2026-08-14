import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'canberra_carpet_cleaning_jwt_secret_key_2026';
export const TOKEN_NAME = 'admin_auth_token';

export interface AdminJwtPayload {
  userId: string;
  email: string;
  role: string;
}

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hashed: string): Promise<boolean> {
  return await bcrypt.compare(password, hashed);
}

export function signToken(payload: AdminJwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): AdminJwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminJwtPayload;
  } catch (err) {
    return null;
  }
}

export async function getAdminSession(): Promise<AdminJwtPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function verifyAdminSessionOrThrow(): Promise<AdminJwtPayload> {
  const session = await getAdminSession();
  if (!session) {
    throw new Error('Unauthorized');
  }
  return session;
}
