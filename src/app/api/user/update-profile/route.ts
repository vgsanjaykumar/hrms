// src/app/api/user/update-profile/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: Request) {
  await connectDB();
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let userId;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    userId = (decoded as any).userId;
  } catch (err) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  const body = await req.json();
  const { education10th, education12th, college, skills, location, photoUrl } = body;

  try {
    const updateData: any = {};
    
    // Handle education data properly
    if (education10th || education12th || college) {
      const education = [];
      
      if (education10th) {
        education.push({
          course: '10th Grade',
          organization: education10th,
          startMonth: 'June',
          startYear: '2018',
          endMonth: 'March',
          endYear: '2019'
        });
      }
      
      if (education12th) {
        education.push({
          course: '12th Grade',
          organization: education12th,
          startMonth: 'June',
          startYear: '2020',
          endMonth: 'March',
          endYear: '2021'
        });
      }
      
      if (college) {
        education.push({
          course: 'College Degree',
          organization: college,
          startMonth: 'August',
          startYear: '2021',
          endMonth: 'May',
          endYear: '2025'
        });
      }
      
      updateData.education = education;
    }
    
    if (skills !== undefined) updateData.skills = skills;
    if (location !== undefined) updateData.location = location;
    if (photoUrl !== undefined) updateData.image = photoUrl;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    );
    
    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
