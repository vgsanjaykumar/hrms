import { NextResponse, NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';

export async function GET(request: NextRequest): Promise<Response> {
  try {
    await connectDB();
    const users = await User.find({});
    return NextResponse.json(users);
  } catch (err) {
    console.error('User API error:', err);
    return new Response('Internal Server Error', { status: 500 });
  }
}
