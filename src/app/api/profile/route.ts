import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const jwtKey = process.env.JWT_SECRET || 'e7QTfpRylS3XERRdFRnZ7s0zrO79GDsfm4BHkL/Vv1o=';
const secret = new TextEncoder().encode(jwtKey);

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { payload } = await jwtVerify(token, secret);
    const { name, email } = payload as { name: string; email: string };

    return NextResponse.json({ name, email });
  } catch (error) {
    console.error('JWT verification failed:', error);
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
