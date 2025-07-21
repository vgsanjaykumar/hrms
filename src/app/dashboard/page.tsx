'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserCircleIcon } from '@heroicons/react/24/solid';



interface User {
  name: string;
  email: string;
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [submittedValue, setSubmittedValue] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isProfileEditing, setIsProfileEditing] = useState<boolean>(false);

  const [profileDetails, setProfileDetails] = useState({
    education10th: '',
    education12th: '',
    college: '',
    skills: [] as string[],
    location: '',
  });

  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch('/api/profile', { credentials: 'include' });
      if (res.ok) {
        const data: User = await res.json();
        setUser(data);
      } else {
        router.push('/login');
      }
    }
    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/logout', { credentials: 'include' });
    router.push('/login');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedValue(inputValue);
    setInputValue('');
  };

  if (!user) return <p className="p-10 text-center">Loading profile...</p>;

  return (
    <section>
     <div className="min-h-screen bg-gray-100 p-6 sm:p-10">
     
      {/* Top Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-purple-600">Dashboard</h1>
        <div className="flex items-center space-x-3 bg-white px-4 py-2 rounded-lg shadow">
          <UserCircleIcon className="w-10 h-10 text-purple-600" />
          <div className="text-sm">
            <p className="text-purple-600 font-semibold">{user.name}</p>
            <p className="text-gray-600 text-xs">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Dashboard Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500">Employees</p>
          <p className="text-2xl font-bold text-purple-600">25</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500">Leave Requests</p>
          <p className="text-2xl font-bold text-purple-600">5</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500">Notifications</p>
          <p className="text-2xl font-bold text-purple-600">3</p>
        </div>
      </section>

    </div>
    </section>
  
  );
}
