'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import dynamic from 'next/dynamic';
import { getNames } from 'country-list';

const Select = dynamic(() => import('react-select'), { ssr: false });

const countryOptions = getNames().map((name: string) => ({
  label: name,
  value: name,
}));

// Password strength function
const getPasswordStrength = (password: string) => {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { label: 'Weak', color: 'bg-red-500', width: 'w-1/3' };
  if (score === 2 || score === 3) return { label: 'Medium', color: 'bg-yellow-500', width: 'w-2/3' };
  return { label: 'Strong', color: 'bg-green-500', width: 'w-full' };
};

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [nationality, setNationality] = useState({ label: 'India', value: 'India' });
  const [idType, setIdType] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<any>({});
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const strength = getPasswordStrength(password);

  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDob(value);
    const year = new Date(value).getFullYear();
    const currentYear = new Date().getFullYear();

    if (year > currentYear) {
      setErrors((prev: any) => ({ ...prev, dob: 'Year cannot be in the future' }));
    } else {
      setErrors((prev: any) => {
        const updated = { ...prev };
        delete updated.dob;
        return updated;
      });
    }
  };

  const validateFields = () => {
    const newErrors: any = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!dob) newErrors.dob = 'Date of birth is required';
    if (dob && new Date(dob).getFullYear() > new Date().getFullYear()) {
      newErrors.dob = 'Year cannot be in the future';
    }

    if (!phone) newErrors.phone = 'Phone number is required';
    if (!nationality) newErrors.nationality = 'Nationality is required';
    if (!idType) newErrors.idType = 'ID type is required';
    if (!password) newErrors.password = 'Password is required';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    return newErrors;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateFields();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        dob,
        phone,
        nationality: nationality.value,
        idType,
        password,
      }),
    });

    const message = await res.text();
    setModalMessage(message);
    setShowModal(true);
  };

  const handleCancel = () => {
    setName('');
    setEmail('');
    setDob('');
    setPhone('');
    setNationality({ label: 'India', value: 'India' });
    setIdType('');
    setPassword('');
    setConfirmPassword('');
    setErrors({});
  };

  const handleModalClose = () => {
    setShowModal(false);
    if (modalMessage.toLowerCase().includes('account created')) {
      router.push('/login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-3xl w-full shadow-lg p-10 rounded-xl text-left">
        <img src="/assets/Hashtag-Logo.png" alt="Hazh Tech Logo" className="mb-6 w-60" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign up</h1>
        <p className="text-gray-600 mb-8">
          Enter your details below to create your account and get started.
        </p>

        <form onSubmit={handleSignup} className="grid grid-cols-2 gap-x-8 gap-y-6">
          {/* Name */}
          <div>
            <label className="block text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-purple-600'
              }`}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="example@gmail.com"
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-purple-600'
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* DOB */}
          <div>
            <label className="block text-gray-700 mb-1">Date of Birth</label>
            <input
              type="date"
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                errors.dob ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-purple-600'
              }`}
              value={dob}
              onChange={handleDobChange}
              max={new Date().toISOString().split('T')[0]}
            />
            {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 mb-1">Phone Number</label>
            <PhoneInput
              country="in"
              value={phone}
              onChange={(value) => setPhone(value)}
              inputStyle={{
                width: '100%',
                height: '40px',
                fontSize: '16px',
                borderColor: errors.phone ? 'red' : '#ccc',
              }}
              containerStyle={{ width: '100%' }}
              buttonStyle={{ borderRight: '1px solid #ccc' }}
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>

          {/* Nationality */}
          <div className="col-span-2">
            <label className="block text-gray-700 mb-1">Nationality</label>
            <Select
              options={countryOptions}
              value={nationality}
              onChange={(selected) =>
                setNationality(selected as { label: string; value: string })
              }
              className="text-black"
              placeholder="Select nationality"
              isSearchable
              styles={{
                control: (base) => ({
                  ...base,
                  borderColor: errors.nationality ? 'red' : '#ccc',
                  boxShadow: 'none',
                  '&:hover': { borderColor: errors.nationality ? 'red' : '#aaa' },
                }),
              }}
            />
            {errors.nationality && <p className="text-red-500 text-sm">{errors.nationality}</p>}
          </div>

          {/* ID Type */}
          <div>
            <label className="block text-gray-700 mb-1">ID Type</label>
            <select
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                errors.idType ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-purple-600'
              }`}
              value={idType}
              onChange={(e) => setIdType(e.target.value)}
            >
              <option value="">Select</option>
              <option value="passport">Passport</option>
              <option value="driver_license">Driver License</option>
              <option value="national_id">National ID</option>
            </select>
            {errors.idType && <p className="text-red-500 text-sm">{errors.idType}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-purple-600'
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            {password && (
              <div className="mt-2">
                <div className="flex justify-between text-sm mb-1 text-gray-600">
                  <span>Password strength:</span>
                  <span className="font-semibold text-gray-800">{strength.label}</span>
                </div>
                <div className="w-full bg-gray-200 rounded h-2">
                  <div className={`h-2 rounded ${strength.color} ${strength.width}`}></div>
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm password"
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                errors.confirmPassword
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-purple-600'
              }`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="col-span-2 flex justify-between mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="w-1/3 py-2 border border-gray-300 rounded text-black font-semibold hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/3 bg-purple-700 text-white py-2 rounded font-semibold hover:bg-purple-800 transition"
            >
              Confirm
            </button>
          </div>
        </form>

        <p className="text-center text-sm mt-6 text-gray-600">
          Already have an account?{' '}
          <span
            onClick={() => router.push('/login')}
            className="text-purple-700 hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-[#0000008f] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md max-w-sm w-full text-center shadow-md">
            <p className="text-gray-800 mb-4">{modalMessage}</p>
            <button
              onClick={handleModalClose}
              className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
