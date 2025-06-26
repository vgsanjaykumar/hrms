'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-violet-100">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-violet-700">Welcome to  HRMS</h1>
        <p className="text-gray-600">Efficient HR management made easy.</p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => router.push('/login')}
            className="bg-violet-500 text-white px-6 py-2 rounded-full font-medium hover:bg-violet-800"
          >
            Login
          </button>
          <button
            onClick={() => router.push('/signup')}
            className="border border-violet-500 text-violet-600 px-6 py-2 rounded-full font-medium hover:bg-violet-200"
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
}
