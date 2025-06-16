'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSignup = (e) => {
        e.preventDefault();
        if (email && password) {
            alert('Account created! Please login.');
            router.push('/login');
        } else {
            alert('Please fill in all fields');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="w-96 shadow-lg p-10 rounded-xl text-center">
                <h1 className="text-2xl font-bold text-[#34b6b8] mb-4">sign up</h1>
                <div className="flex justify-center gap-4 mb-4">
                    <button className="bg-gray-100 p-2 rounded-full hover:bg-gray-200">
                        <img src="https://img.icons8.com/ios-filled/24/000000/facebook.png" alt="Facebook" />
                    </button>
                    <button className="bg-gray-100 p-2 rounded-full hover:bg-gray-200">
                        <img src="https://img.icons8.com/ios-filled/24/000000/google-logo.png" alt="Google" />
                    </button>
                    <button className="bg-gray-100 p-2 rounded-full hover:bg-gray-200">
                        <img src="https://img.icons8.com/ios-filled/24/000000/linkedin.png" alt="LinkedIn" />
                    </button>
                </div>

                <p className="text-gray-500 text-sm mb-4">or use your email to register:</p>

                <form onSubmit={handleSignup} className="space-y-4 text-left">
                    <input type="email" placeholder="Email" className="w-full px-4 py-2 bg-teal-400 rounded focus:outline-none focus:ring-2 focus:ring-[#34b6b8]" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" placeholder="Password" className="w-full px-4 py-2 bg-teal-400 rounded focus:outline-none focus:ring-2 focus:ring-[#34b6b8]"  value={password} onChange={(e) => setPassword(e.target.value)}/>

                    <button type="submit" className="w-full bg-[#34b6b8] text-white py-2 rounded-full font-semibold hover:bg-[#2aa8a9] transition">
                        SIGN UP
                    </button>
                </form>

                <p className="text-sm mt-4 text-gray-600">
                    Already have an account?{' '}
                    <span onClick={() => router.push('/login')} className="text-[#34b6b8] hover:underline cursor-pointer">
                        Sign In
                    </span>
                </p>
            </div>
        </div>
    );
}
