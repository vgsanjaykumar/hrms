<<<<<<< Updated upstream
 'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserCircleIcon } from '@heroicons/react/24/solid';

interface User {
    name: string;
    email: string;
=======
'use client';
import React, { useState, useEffect } from 'react';
import Sidebar from '@/app/profile/components/Sidebar';
import DashboardStats from '@/app/profile/components/DashboardStats';
import ProfileDetails from '@/app/profile/components/ProfileDetails';
import UserInfoCard from '../components/UserInfoCard';

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    employees: 0,
    leaveRequests: 0,
    notifications: 0,
  });

  // Profile details state
  const [education10th, setEducation10th] = useState('');
  const [education12th, setEducation12th] = useState('');
  const [college, setCollege] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [location, setLocation] = useState('');
  const [isProfileEditing, setIsProfileEditing] = useState(false);

  // User info for UserInfoCard
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    // TODO: Fetch real dashboard stats from API
    // For now, use placeholder data
    setStats({
      employees: 256,
      leaveRequests: 5,
      notifications: 10,
    });
  }, []);

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const res = await fetch('/api/user');
        if (!res.ok) {
          console.error('Failed to fetch user profile');
          return;
        }
        const users = await res.json();
        // Assuming current user is identified by email from AuthContext or similar
        // For now, pick the first user as placeholder
        const currentUser = users[0];

        if (currentUser) {
          // Extract education entries
          const education = currentUser.education || [];
          // Find 10th, 12th, college by course or organization name heuristics
          const edu10th = education.find((e: any) =>
            e.course?.toLowerCase().includes('10th') || e.organization?.toLowerCase().includes('10th')
          );
          const edu12th = education.find((e: any) =>
            e.course?.toLowerCase().includes('12th') || e.organization?.toLowerCase().includes('12th')
          );
          const collegeEdu = education.find((e: any) =>
            !e.course?.toLowerCase().includes('10th') && !e.course?.toLowerCase().includes('12th')
          );

          setEducation10th(edu10th ? edu10th.course || edu10th.organization || '' : '');
          setEducation12th(edu12th ? edu12th.course || edu12th.organization || '' : '');
          setCollege(collegeEdu ? collegeEdu.course || collegeEdu.organization || '' : '');

          setSkills(currentUser.skills || []);
          setLocation(currentUser.location || '');

          setName(currentUser.name || '');
          setEmail(currentUser.email || '');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    }

    fetchUserProfile();
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <main
        className={`flex-1 p-6 sm:p-10 transition-all duration-300 ${
          sidebarOpen ? 'blur-sm pointer-events-none select-none' : ''
        }`}
      >
        <UserInfoCard name={name} email={email} />
        <h1 className="text-3xl font-bold mb-6 text-purple-700">Dashboard</h1>

        <DashboardStats
          employees={stats.employees}
          leaveRequests={stats.leaveRequests}
          notifications={stats.notifications}
        />

        <ProfileDetails
          education10th={education10th}
          education12th={education12th}
          college={college}
          skills={skills}
          location={location}
          isProfileEditing={isProfileEditing}
          setIsProfileEditing={setIsProfileEditing}
        />
      </main>
    </div>
  );
>>>>>>> Stashed changes
}

export default function Profile() {
    const [user, setUser] = useState<User | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmittedValue(inputValue);
        setInputValue('');
    };

    if (!user) return <p className="p-10 text-center">Loading profile...</p>;

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
            <div className="md:hidden purple-600 text-white flex justify-between items-center p-4">
               <img
                    src="/assets/Hashtag-Logo.png"
                    alt="Logo"
                    className=" mb-2 w-65 h-12"
                />
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    aria-label="Toggle sidebar"
                    className="p-2 rounded bg-purple-700 z-50"
                >
                    {sidebarOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            <aside className={`fixed top-0 left-0 w-64 h-screen bg-purple-700 text-white flex flex-col p-6 space-y-6 md:flex transition-transform transform z-50 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
                <h2 className="text-2xl font-bold hidden md:block">HRMS</h2>
                <nav className="flex flex-col space-y-4 overflow-y-auto">
                    <a href="/profile/dashboard" className="hover:bg-white hover:text-purple-600 p-2 rounded transition">Dashboard</a>
                    <a href="#Projects" className="hover:bg-white hover:text-purple-600 p-2 rounded transition">Projects</a>
                    <a href="#PayRoll" className="hover:bg-white hover:text-purple-600 p-2 rounded transition">PayRoll</a>
                    <a href="#Attendance" className="hover:bg-white hover:text-purple-600 p-2 rounded transition">Attendance</a>
                    <a href="/profile/my-profile" className="hover:bg-white hover:text-purple-600 p-2 rounded transition">My Profile</a>
                </nav>
               <button
          onClick={async () => {
            await fetch('/api/logout', { credentials: 'include' });
            window.location.href = '/login';
          }}
          className="mt-auto bg-white text-purple-700 font-semibold py-2 rounded hover:bg-gray-100 transition"
        >
          Logout
        </button>
            </aside>

            {sidebarOpen && (
        <div
          className="fixed inset-0 backdrop-blur-[1px] z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

            <main className={`flex-1 p-6 sm:p-10 transition-all duration-300 ${sidebarOpen ? 'blur-sm pointer-events-none select-none' : ''}`}>
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-semibold text-purple-600">Dashboard</h1>

                    <div className="flex items-center space-x-3 bg-white px-4 py-2 rounded-lg shadow">
                        <UserCircleIcon className="w-10 h-10 text-purple-600" />
                        <div className="text-sm">
                            <p className="text-purple-600 font-semibold">{user.name}</p>
                            <p className="text-gray-600 text-xs">{user.email}</p>
                        </div>
                    </div>
                </div>

                <section id="dashboard" className="mb-8">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
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
                    </div>
                </section>

                {/* New form section for entering details */}
                <section className="bg-purple-600 text-white rounded-lg p-6 max-w-2xl mx-auto">
                    <h2 className="text-xl font-semibold mb-4">Edit Profile Details</h2>
                    {!isProfileEditing ? (
                        <div className="bg-white text-purple-600 p-4 rounded shadow space-y-4">
                            <div>
                                <h3 className="font-semibold">Education</h3>
                                <p>10th: {profileDetails.education10th || 'Not provided'}</p>
                                <p>12th: {profileDetails.education12th || 'Not provided'}</p>
                                <p>College: {profileDetails.college || 'Not provided'}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Skills</h3>
                                <ul className="list-disc list-inside">
                                    {profileDetails.skills.length > 0 ? (
                                        profileDetails.skills.map((skill, index) => (
                                            <li key={index}>{skill}</li>
                                        ))
                                    ) : (
                                        <li>Not provided</li>
                                    )}
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold">Location</h3>
                                <p>{profileDetails.location || 'Not provided'}</p>
                            </div>
                            <button
                                onClick={() => setIsProfileEditing(true)}
                                className="text-purple-600 hover:text-purple-800 font-semibold"
                            >
                                Edit Details
                            </button>
                        </div>
                    ) : (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                setIsProfileEditing(false);
                            }}
                            className="flex flex-col space-y-4 bg-white text-purple-600 p-4 rounded shadow"
                        >
                            <div>
                                <label htmlFor="education10th" className="block font-semibold mb-1">
                                    10th Education
                                </label>
                                <input
                                    id="education10th"
                                    type="text"
                                    value={profileDetails.education10th}
                                    onChange={(e) =>
                                        setProfileDetails({ ...profileDetails, education10th: e.target.value })
                                    }
                                    className="w-full p-2 rounded border border-gray-300 text-purple-600"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="education12th" className="block font-semibold mb-1">
                                    12th Education
                                </label>
                                <input
                                    id="education12th"
                                    type="text"
                                    value={profileDetails.education12th}
                                    onChange={(e) =>
                                        setProfileDetails({ ...profileDetails, education12th: e.target.value })
                                    }
                                    className="w-full p-2 rounded border border-gray-300 text-purple-600"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="college" className="block font-semibold mb-1">
                                    College
                                </label>
                                <input
                                    id="college"
                                    type="text"
                                    value={profileDetails.college}
                                    onChange={(e) =>
                                        setProfileDetails({ ...profileDetails, college: e.target.value })
                                    }
                                    className="w-full p-2 rounded border border-gray-300 text-purple-600"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="skills" className="block font-semibold mb-1">
                                    Skills (comma separated)
                                </label>
                                <input
                                    id="skills"
                                    type="text"
                                    value={profileDetails.skills.join(', ')}
                                    onChange={(e) =>
                                        setProfileDetails({ ...profileDetails, skills: e.target.value.split(',').map(s => s.trim()) })
                                    }
                                    className="w-full p-2 rounded border border-gray-300 text-purple-600"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="location" className="block font-semibold mb-1">
                                    Location
                                </label>
                                <input
                                    id="location"
                                    type="text"
                                    value={profileDetails.location}
                                    onChange={(e) =>
                                        setProfileDetails({ ...profileDetails, location: e.target.value })
                                    }
                                    className="w-full p-2 rounded border border-gray-300 text-purple-600"
                                    required
                                />
                            </div>
                            <div className="flex space-x-4">
                                <button
                                    type="submit"
                                    className="bg-purple-600 text-white font-semibold py-2 px-4 rounded hover:bg-purple-700 transition"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsProfileEditing(false)}
                                    className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded hover:bg-gray-400 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
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