import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import bcrypt from 'bcryptjs';
import User from '@/models/User';

export async function POST(request: NextRequest): Promise<Response> {
    try {
        await connectDB();
        const { name, phone, email, password, dob, gender }: { name: string; phone: string; email: string; password: string; dob: string; gender: string; } = await request.json();

    if (!name || !phone || !email || !password || !dob || !nationality || !idType) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            phone,
            email,
            password: hashedPassword,
            dob,
            gender,
        });

    await newUser.save();

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    console.error('Registration Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
