'use client';
import React, { useEffect, useState } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/solid';

interface User {
  name: string;
  email: string;
}

export default function UserInfoCard() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/user/profile');
        if (!res.ok) throw new Error('Not authenticated');
        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="flex items-center space-x-3 bg-white px-4 py-2 rounded-lg shadow w-55 ml-auto">
      <UserCircleIcon className="w-10 h-10 text-purple-600" />
      <div className="text-sm truncate">
       <p className="text-purple-600 font-semibold truncate">
  Hello, {user?.name || 'Loading...'}
</p>
        <p className="text-gray-600 text-xs truncate">
          {user?.email || ''}
        </p>
      </div>
    </div>
  );
}
