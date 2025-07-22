'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/app/profile/components/Sidebar';
import UserInfoCard from '@/app/profile/components/UserInfoCard';
import DashboardStats from '@/app/profile/components/DashboardStats';
import ProfileDetails from '@/app/profile/components/ProfileDetails';
import EditProfileForm from '@/app/profile/components/EditProfileForm';

interface User {
  name: string;
  email: string;
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [submittedValue, setSubmittedValue] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // New state for multiple profile details
  const [profileDetails, setProfileDetails] = useState<{
    education10th: string;
    education12th: string;
    college: string;
    skills: string[];
    location: string;
  }>({
    education10th: '',
    education12th: '',
    college: '',
    skills: [],
    location: '',
  });

  const [isProfileEditing, setIsProfileEditing] = useState<boolean>(false);
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

  const handleProfileSave = (updatedDetails: {
    education10th: string;
    education12th: string;
    college: string;
    skills: string[];
    location: string;
  }) => {
    setProfileDetails(updatedDetails);
    setIsProfileEditing(false);
  };

  if (!user) return <p className="p-10 text-center">Loading profile...</p>;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main
        className={`flex-1 p-6 sm:p-10 transition-all duration-300 ${
          sidebarOpen ? 'blur-sm pointer-events-none select-none' : ''
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold text-purple-600">Dashboard</h1>

          <UserInfoCard name={user.name} email={user.email} />
        </div>

        <DashboardStats employees={25} leaveRequests={5} notifications={3} />

        <section className="bg-purple-600 text-white rounded-lg p-6 max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Edit Profile Details</h2>
          {!isProfileEditing ? (
            <ProfileDetails
              education10th={profileDetails.education10th}
              education12th={profileDetails.education12th}
              college={profileDetails.college}
              skills={profileDetails.skills}
              location={profileDetails.location}
              isProfileEditing={isProfileEditing}
              setIsProfileEditing={setIsProfileEditing}
            />
          ) : (
            <EditProfileForm
              education10th={profileDetails.education10th}
              education12th={profileDetails.education12th}
              college={profileDetails.college}
              skills={profileDetails.skills}
              location={profileDetails.location}
              onSave={handleProfileSave}
              onCancel={() => setIsProfileEditing(false)}
            />
          )}

          {submittedValue && !isEditing && (
            <div className="mt-6 bg-white text-purple-600 p-4 rounded shadow flex items-center justify-between">
              <div>
                <p className="font-semibold">You entered:</p>
                <p>{submittedValue}</p>
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="text-purple-600 hover:text-purple-800"
                aria-label="Edit details"
              >
                &#9998;
              </button>
            </div>
          )}
          {isEditing && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsEditing(false);
              }}
              className="mt-6 bg-white text-purple-600 p-4 rounded shadow flex flex-col space-y-4"
            >
              <textarea
                value={submittedValue}
                onChange={(e) => setSubmittedValue(e.target.value)}
                className="p-2 rounded text-purple-600 resize-none"
                rows={4}
                required
              />
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-purple-600 text-white font-semibold py-2 px-4 rounded hover:bg-purple-700 transition"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </section>
      </main>
    </div>
  );
}
