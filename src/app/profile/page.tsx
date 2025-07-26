'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/app/profile/components/Sidebar';
import MyProfilePage from '@/app/profile/my-profile/page';

export default function Profile() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Redirect to /profile/my-profile on mount
    router.push('/profile/my-profile');
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <main
        className={`flex-1 p-6 sm:p-10 md:ml-64 transition-all duration-300 ${
          sidebarOpen ? 'blur-sm pointer-events-none select-none' : ''
        }`}
      >
        <MyProfilePage />
      </main>
    </div>
  );
}
