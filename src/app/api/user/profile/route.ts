import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET() {
  try {
    const cookieStore = await cookies(); // ✅ Await cookies
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Not logged in' }, { status: 401 });
    }

    const jwtSecret = process.env.JWT_SECRET || 'e7QTfpRylS3XERRdFRnZ7s0zrO79GDsfm4BHkL/Vv1o=';

    const decoded = jwt.verify(token, jwtSecret) as {
      id: string;
      name: string;
      email: string;
    };

    return NextResponse.json({
      user: {
        name: decoded.name,
        email: decoded.email,
      },
    });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 403 });
  }
}
