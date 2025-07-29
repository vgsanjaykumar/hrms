// src/app/api/user/update-profile/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export async function POST(req: Request) {
  await dbConnect();
  const token = cookies().get('token')?.value;

  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let userId;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    userId = (decoded as any).userId;
  } catch (err) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  const body = await req.json();
  const { education, skills, location } = body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { education, skills, location },
      { new: true }
    );
    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
