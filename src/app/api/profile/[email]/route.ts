import { connectDB } from '@/lib/mongodb';
import UserProfile from '@/models/User';

export async function GET(req: Request, context: { params: { email: string } }) {
  await connectDB();
  const params = await context.params;
  const profile = await UserProfile.findOne({ email: params.email });
  return Response.json(profile || {});
}

export async function POST(req: Request, context: { params: { email: string } }) {
  await connectDB();
  const { params } = await context;
  const data = await req.json();
  const profile = await UserProfile.findOneAndUpdate(
    { email: params.email },
    { $set: data },
    { new: true, upsert: true }
  );
  return new Response(JSON.stringify(profile), { status: 200 });
}
