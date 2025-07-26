'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const router = useRouter();

    const validateFields = () => {
        const newErrors: { email?: string; password?: string } = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(email)) {
            newErrors.email = 'Invalid email address';
        }

        if (!password.trim()) {
            newErrors.password = 'Password is required';
        }

        return newErrors;
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validationErrors = validateFields();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;

        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }),
            credentials: 'include'
        });

        if (res.ok) {
            router.push('/profile/dashboard');
        } else {
            setErrors({
                email: 'Invalid email or password',
                password: 'Invalid email or password',
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f9fafb] p-4">
            <div className="max-w-md w-full
             bg-white rounded-2xl p-8 shadow-lg text-center">
                <img
                    src="/assets/Hashtag-Logo.png"
                    alt="Logo"
                    className="mx-auto mb-6 w-65 h-12"
                />
                <h1 className="text-3xl font-semibold mb-2">Login</h1>
                <p className="text-gray-600 mb-6">Login to your account below</p>

                <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 mb-6 hover:bg-gray-100 transition"
                >
                    <img
                        src="https://img.icons8.com/color/24/google-logo.png"
                        alt="Google"
                        className="inline-block"
                    />
                    Continue with Google
                </button>

                <form onSubmit={handleLogin} className="space-y-4 text-left">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter email..."
                            className={`w-full px-4 py-2 border ${
                                errors.email ? 'border-red-500' : 'border-gray-300'
                            } rounded-md focus:outline-none focus:ring-2 ${
                                errors.email ? 'focus:ring-red-500' : 'focus:ring-purple-600'
                            }`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter password..."
                            className={`w-full px-4 py-2 border ${
                                errors.password ? 'border-red-500' : 'border-gray-300'
                            } rounded-md focus:outline-none focus:ring-2 ${
                                errors.password ? 'focus:ring-red-500' : 'focus:ring-purple-600'
                            }`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-purple-700 text-white py-2 rounded-md font-semibold hover:bg-purple-800 transition"
                    >
                        Login
                    </button>
                </form>

                <p className="mt-6 text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link href="/signup" className="text-purple-700 font-medium hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}
