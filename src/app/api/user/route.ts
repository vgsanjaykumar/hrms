// /app/api/user/route.ts
import { NextResponse } from 'next/server';
import {connectDB} from '@/lib/mongodb';
import User from '@/models/User';

export async function PUT(req: Request) {
  await connectDB();
  const body = await req.json();

  try {
    const { email, education, skills, location } = body;

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { education, skills, location },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Profile updated', user: updatedUser });
  } catch (error) {
    return NextResponse.json({ message: 'Server error', error }, { status: 500 });
  }
}

export async function GET(req: Request) {
  await connectDB();
  const url = new URL(req.url);
  const email = url.searchParams.get('email');

  if (!email) {
    return NextResponse.json({ message: 'Email is required' }, { status: 400 });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ message: 'Server error', error }, { status: 500 });
  }
}
