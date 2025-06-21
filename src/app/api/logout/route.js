import { NextResponse } from 'next/server';

export async function GET() {
    const response = NextResponse.json({ message: 'Logged out successfully' });

    // Clear the cookie by setting it to expire
    response.cookies.set('token', '', {
        httpOnly: true,
        path: '/',
        expires: new Date(0), // Expire immediately
    });

    return response;
}
