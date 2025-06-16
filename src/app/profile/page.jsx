'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
    const { user, setUser } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) router.push('/login');
    }, [user]);

    const handleLogout = () => {
        setUser(null);
        router.push('/login');
    };

    return user ? (
        <div className="min-h-screen flex bg-gray-50">

            <aside className="w-64 bg-[#34b6b8] text-white min-h-screen p-6 space-y-6">
                <h2 className="text-2xl font-bold">HRMS</h2>
                <nav className="flex flex-col gap-4">
                    <a href="#" className="hover:bg-white hover:text-[#34b6b8] p-2 rounded">Dashboard</a>
                    <a href="#" className="hover:bg-white hover:text-[#34b6b8] p-2 rounded">Employees</a>
                    <a href="#" className="hover:bg-white hover:text-[#34b6b8] p-2 rounded">Leave Requests</a>
                    <a href="#" className="hover:bg-white hover:text-[#34b6b8] p-2 rounded">Settings</a>
                </nav>
                <button onClick={handleLogout} className="mt-auto bg-white text-[#34b6b8] font-semibold py-2 px-4 rounded hover:bg-gray-100">
                    Logout
                </button>
            </aside>


            <main className="flex-1 p-10">
                <h1 className="text-3xl font-semibold text-[#34b6b8] mb-4">Welcome, {user.email}</h1>
                <p className="text-gray-700">You are now viewing the HRMS dashboard.</p>


                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                    <div className="bg-white shadow-md p-6 rounded-lg">
                        <h3 className="text-xl font-semibold text-[#34b6b8]">Total Employees</h3>
                        <p className="text-3xl mt-2 font-bold">120</p>
                    </div>
                    <div className="bg-white shadow-md p-6 rounded-lg">
                        <h3 className="text-xl font-semibold text-[#34b6b8]">Pending Leave Requests</h3>
                        <p className="text-3xl mt-2 font-bold">6</p>
                    </div>
                    <div className="bg-white shadow-md p-6 rounded-lg">
                        <h3 className="text-xl font-semibold text-[#34b6b8]">New Joinees</h3>
                        <p className="text-3xl mt-2 font-bold">3</p>
                    </div>
                </div>
            </main>
        </div>
    ) : (
        <div className="text-center p-10">Redirecting to login...</div>
    );
}
