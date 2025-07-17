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
    const [showSidebar, setShowSidebar] = useState<boolean>(false);
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
                <h2 className="text-xl font-bold">HRMS</h2>
                <button onClick={() => setShowSidebar(!showSidebar)}>
                    <img src="https://img.icons8.com/ios-filled/30/ffffff/menu--v1.png" alt="Menu" />
                </button>
            </div>

            <aside className={` bg-purple-600 text-white w-full md:w-64 p-6 space-y-6 ${showSidebar ? 'block' : 'hidden'} md:block`}>
                <h2 className="text-2xl font-bold hidden md:block">HRMS</h2>
                <nav className="flex flex-col gap-4">
                    <a href="#dashboard" className="hover:bg-white hover:text-purple-600 p-2 rounded transition">Dashboard</a>
                    <a href="#employees" className="hover:bg-white hover:text-purple-600 p-2 rounded transition">Employees</a>
                    <a href="#leaves" className="hover:bg-white hover:text-purple-600 p-2 rounded transition">Leave Requests</a>
                    <a href="#settings" className="hover:bg-white hover:text-purple-600 p-2 rounded transition">Settings</a>
                </nav>
                <div className="pt-6">
                    <button onClick={handleLogout} className="w-full bg-white text-purple-600 font-semibold py-2 px-4 rounded hover:bg-gray-100 transition">
                        Logout
                    </button>
                </div>
            </aside>

            <main className="flex-1 p-6 sm:p-10">
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
